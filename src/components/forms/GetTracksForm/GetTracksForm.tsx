'use client';

import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Tabs,
  Input,
  Textarea,
  Switch,
  Autocomplete,
} from '@soundwaves/components';
import React, { useState, useMemo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

import {
  CREATE_DOWNLOAD_JOB,
  CREATE_BULK_DOWNLOAD_JOBS,
} from '@/graphql/mutations/downloadJobs';
import { GET_CATEGORIES } from '@/graphql/queries/categories';
import { SEARCH_YOUTUBE, BULK_SEARCH_YOUTUBE } from '@/graphql/queries/tracks';
import { toast } from '@/lib';

const singleSearchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  autoEnrich: z.boolean(),
  subCategory: z.string().min(1, 'Please select a subcategory'),
});

const bulkSearchSchema = z.object({
  queries: z.string().min(1, 'At least one search query is required'),
  autoEnrich: z.boolean(),
  subCategory: z.string().min(1, 'Please select a subcategory'),
});

type SingleSearchForm = z.infer<typeof singleSearchSchema>;
type BulkSearchForm = z.infer<typeof bulkSearchSchema>;

interface SearchResult {
  __typename?: 'YouTubeSearchResult';
  url: string;
  title: string;
  artist: string;
  duration: number;
  thumbnail?: string | null;
  description?: string | null;
}

interface BulkSearchResult {
  query: string;
  error?: string | null;
  results: SearchResult[];
}

// Custom component to render category and subcategory
interface PrimarySecondaryProps {
  primary: string;
  secondary: string;
}

function PrimarySecondary({ primary, secondary }: PrimarySecondaryProps) {
  return (
    <div className="primary-secondary">
      <div className="primary-secondary__primary">{primary}</div>
      <div className="primary-secondary__secondary">{secondary}</div>
    </div>
  );
}

export function GetTracksForm() {
  const [activeTab, setActiveTab] = useState('single');
  const [singleResults, setSingleResults] = useState<SearchResult[]>([]);
  const [bulkResults, setBulkResults] = useState<BulkSearchResult[]>([]);
  const [selectedResults, setSelectedResults] = useState<string[]>([]);
  const [categorySearchTerm, setCategorySearchTerm] = useState<string>('');

  // Fetch categories and subcategories
  const { data: categoriesData, loading: categoriesLoading } =
    useQuery(GET_CATEGORIES);

  const singleForm = useForm<SingleSearchForm>({
    resolver: zodResolver(singleSearchSchema),
    defaultValues: {
      autoEnrich: false,
      subCategory: '',
    },
  });

  const bulkForm = useForm<BulkSearchForm>({
    resolver: zodResolver(bulkSearchSchema),
    defaultValues: {
      autoEnrich: false,
      subCategory: '',
    },
  });

  // Create autocomplete options from subcategories
  const subcategoryOptions = useMemo(() => {
    if (!categoriesData?.categories) return [];

    return categoriesData.categories.flatMap((category) =>
      category.subcategories.map((subcategory) => ({
        value: subcategory.id,
        label: subcategory.name,
        category: category.name,
      })),
    );
  }, [categoriesData?.categories]);

  // Filter subcategory options based on search term
  const filteredSubcategoryOptions = useMemo(() => {
    if (!categorySearchTerm.trim()) return subcategoryOptions;

    const searchTerm = categorySearchTerm.toLowerCase();
    return subcategoryOptions.filter((option) => {
      return (
        option.label.toLowerCase().includes(searchTerm) ||
        option.category.toLowerCase().includes(searchTerm)
      );
    });
  }, [subcategoryOptions, categorySearchTerm]);

  // Handle category search
  const handleCategorySearch = useCallback((searchTerm: string) => {
    setCategorySearchTerm(searchTerm);
  }, []);

  const [searchYouTube, { loading: singleSearchLoading }] =
    useMutation(SEARCH_YOUTUBE);
  const [bulkSearchYouTube, { loading: bulkSearchLoading }] =
    useMutation(BULK_SEARCH_YOUTUBE);
  const [createDownloadJob] = useMutation(CREATE_DOWNLOAD_JOB);
  const [createBulkDownloadJobs] = useMutation(CREATE_BULK_DOWNLOAD_JOBS);

  const handleSingleSearch = async (data: SingleSearchForm) => {
    try {
      const result = await searchYouTube({
        variables: {
          query: data.query,
        },
      });

      if (result.data?.searchYouTube) {
        const searchResults = result.data.searchYouTube as SearchResult[];
        console.log('Search results:', searchResults);
        setSingleResults(searchResults);
      } else {
        console.log('No search results found');
      }
    } catch (error) {
      toast('Failed to search YouTube', 'error');
      console.error('Search error:', error);
    }
  };

  const handleBulkSearch = async (data: BulkSearchForm) => {
    const queries = data.queries
      .split('\n')
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    try {
      const result = await bulkSearchYouTube({
        variables: {
          input: {
            queries,
          },
        },
      });

      if (result.data?.bulkSearchYouTube) {
        const searchResults = result.data.bulkSearchYouTube
          .results as BulkSearchResult[];
        console.log('Bulk search results:', searchResults);
        setBulkResults(searchResults);
        toast(
          `Processed ${result.data.bulkSearchYouTube.totalQueries} queries. ` +
            `${result.data.bulkSearchYouTube.successfulQueries} successful, ` +
            `${result.data.bulkSearchYouTube.failedQueries} failed.`,
          'success',
        );
      } else {
        console.log('No bulk search results found');
      }
    } catch (error) {
      toast('Failed to perform bulk search', 'error');
      console.error('Bulk search error:', error);
    }
  };

  const handleDownload = async (
    result: SearchResult,
    formData: SingleSearchForm | BulkSearchForm,
  ) => {
    try {
      await createDownloadJob({
        variables: {
          input: {
            url: result.url,
            autoEnrich: formData.autoEnrich,
            subCategory: parseInt(formData.subCategory),
          },
        },
      });

      toast('Download job created successfully', 'success');
    } catch (error) {
      toast('Failed to create download job', 'error');
      console.error('Download job error:', error);
    }
  };

  const handleBulkDownload = async () => {
    const urls = selectedResults;
    const formData = bulkForm.getValues();

    if (urls.length === 0) {
      toast('Please select at least one track to download', 'error');
      return;
    }

    try {
      const downloads = urls.map((url) => ({
        url,
        autoEnrich: formData.autoEnrich,
        subCategory: parseInt(formData.subCategory),
      }));

      const result = await createBulkDownloadJobs({
        variables: {
          input: {
            downloads,
          },
        },
      });

      if (result.data?.createBulkDownloadJobs) {
        const response = result.data.createBulkDownloadJobs;
        toast(
          `Created ${response.totalJobs} download jobs. ` +
            `${response.successfulJobs} successful, ${response.failedJobs} failed.`,
          'success',
        );
        setSelectedResults([]);
      }
    } catch (error) {
      toast('Failed to create bulk download jobs', 'error');
      console.error('Bulk download error:', error);
    }
  };

  const toggleResultSelection = (url: string) => {
    setSelectedResults((prev) =>
      prev.includes(url) ? prev.filter((id) => id !== url) : [...prev, url],
    );
  };

  const renderSearchResults = (results: SearchResult[], isBulk = false) => {
    if (results.length === 0) return null;

    return (
      <div className="get-tracks-form__search-results">
        <h3>Search Results</h3>
        {isBulk && (
          <div className="get-tracks-form__bulk-actions">
            <Button
              onClick={handleBulkDownload}
              disabled={selectedResults.length === 0}
            >
              Download Selected ({selectedResults.length})
            </Button>
            <Button
              variant="secondary"
              onClick={() => setSelectedResults([])}
              disabled={selectedResults.length === 0}
            >
              Clear Selection
            </Button>
          </div>
        )}

        <div className="get-tracks-form__results-list">
          {results.map((result, index) => (
            <div
              key={`${result.url}-${index}`}
              className="get-tracks-form__result-item"
            >
              {isBulk && (
                <input
                  type="checkbox"
                  checked={selectedResults.includes(result.url)}
                  onChange={() => toggleResultSelection(result.url)}
                />
              )}

              <div className="get-tracks-form__result-content">
                {result.thumbnail && (
                  <img
                    src={result.thumbnail}
                    alt="Thumbnail"
                    className="get-tracks-form__result-thumbnail"
                  />
                )}
                <div className="get-tracks-form__result-info">
                  <div className="get-tracks-form__result-title">
                    {result.title}
                  </div>
                  <div className="get-tracks-form__result-artist">
                    {result.artist}
                  </div>
                  {result.description && (
                    <div className="get-tracks-form__result-description">
                      {result.description}
                    </div>
                  )}
                  <div className="get-tracks-form__result-duration">
                    {Math.floor(result.duration / 60)}:
                    {(result.duration % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              </div>

              {!isBulk && (
                <Button
                  size="sm"
                  onClick={() => handleDownload(result, singleForm.getValues())}
                >
                  Download
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBulkResults = () => {
    if (bulkResults.length === 0) return null;

    return (
      <div className="get-tracks-form__bulk-results">
        <h3>Bulk Search Results</h3>
        {bulkResults.map((queryResult, index) => (
          <div key={index} className="get-tracks-form__bulk-result-group">
            <h4>Query: &ldquo;{queryResult.query}&rdquo;</h4>
            {queryResult.error ? (
              <div className="get-tracks-form__error-message">
                {queryResult.error}
              </div>
            ) : (
              renderSearchResults(queryResult.results, true)
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="get-tracks-form__container">
      <Tabs value={activeTab} onValueChange={setActiveTab} variant="fill">
        <Tabs.List>
          <Tabs.Trigger value="single">Single Search</Tabs.Trigger>
          <Tabs.Trigger value="bulk">Bulk Search</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="single">
          <form
            onSubmit={singleForm.handleSubmit(handleSingleSearch)}
            className="get-tracks-form__search-form"
          >
            <div className="get-tracks-form__form-fields">
              <Input
                label="Search Query"
                placeholder="Enter search query..."
                {...singleForm.register('query')}
                helperText={singleForm.formState.errors.query?.message}
              />
            </div>

            <div className="get-tracks-form__form-options">
              <Controller
                name="autoEnrich"
                control={singleForm.control}
                render={({ field }) => (
                  <Switch
                    ref={field.ref}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                    label="Auto Enrich"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />

              <Controller
                name="subCategory"
                control={singleForm.control}
                render={({ field, fieldState }) => (
                  <Autocomplete
                    label="Category"
                    options={filteredSubcategoryOptions}
                    value={field.value}
                    onChange={field.onChange}
                    onSearch={handleCategorySearch}
                    renderOption={(option) => {
                      const subcategory = subcategoryOptions.find(
                        (s) => s.value === option.value,
                      );
                      return subcategory ? (
                        <PrimarySecondary
                          primary={subcategory.label}
                          secondary={subcategory.category}
                        />
                      ) : (
                        option.label
                      );
                    }}
                    helperText={fieldState.error?.message}
                    destructive={!!fieldState.error}
                    disabled={categoriesLoading}
                    onOpenChange={(open) => {
                      if (!open) {
                        setCategorySearchTerm('');
                      }
                    }}
                  />
                )}
              />
            </div>

            <Button type="submit" disabled={singleSearchLoading}>
              Search
            </Button>
          </form>

          {renderSearchResults(singleResults)}
        </Tabs.Content>

        <Tabs.Content value="bulk">
          <form
            onSubmit={bulkForm.handleSubmit(handleBulkSearch)}
            className="get-tracks-form__search-form"
          >
            <div className="get-tracks-form__form-fields">
              <Textarea
                label="Search Queries"
                placeholder="Enter one search query per line..."
                {...bulkForm.register('queries')}
                helperText={bulkForm.formState.errors.queries?.message}
              />
            </div>

            <div className="get-tracks-form__form-options">
              <Controller
                name="autoEnrich"
                control={bulkForm.control}
                render={({ field }) => (
                  <Switch
                    ref={field.ref}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                    label="Auto Enrich"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="subCategory"
                control={bulkForm.control}
                render={({ field, fieldState }) => (
                  <Autocomplete
                    label="Category"
                    options={filteredSubcategoryOptions}
                    value={field.value}
                    onChange={field.onChange}
                    onSearch={handleCategorySearch}
                    renderOption={(option) => {
                      const subcategory = subcategoryOptions.find(
                        (s) => s.value === option.value,
                      );
                      return subcategory ? (
                        <PrimarySecondary
                          primary={subcategory.label}
                          secondary={subcategory.category}
                        />
                      ) : (
                        option.label
                      );
                    }}
                    helperText={fieldState.error?.message}
                    destructive={!!fieldState.error}
                    disabled={categoriesLoading}
                    onOpenChange={(open) => {
                      if (!open) {
                        setCategorySearchTerm('');
                      }
                    }}
                  />
                )}
              />
            </div>

            <Button type="submit" disabled={bulkSearchLoading}>
              Search
            </Button>
          </form>

          {renderBulkResults()}
        </Tabs.Content>
      </Tabs>
    </div>
  );
}
