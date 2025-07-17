'use client';

import { useQuery, useMutation } from '@apollo/client';
import {
  Button,
  Input,
  Loading,
  Dialog,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import axios from 'axios';
import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { Fragment } from 'react';
import { toast } from 'sonner';

import { PageHeader } from '@/components/blocks';
import { SearchIcon, DeleteIcon, ReplaceIcon } from '@/components/icons';
import { MediaEditor } from '@/components/MediaEditor';
import {
  MediaType,
  OperatorType,
  MediaFilterType,
  MediaTextFilterField,
  TextFilterOperator,
  MediaOptionFilterField,
  OptionFilterOperator,
  MediaOrderField,
  OrderDirection,
} from '@/graphql/__generated__/graphql';
import { DELETE_MEDIA } from '@/graphql/mutations';
import { SEARCH_MEDIA } from '@/graphql/queries';

export const MediaManagementPage = () => {
  const [searchKey, setSearchKey] = useState('');
  const [selectedType, setSelectedType] = useState<MediaType | 'ALL'>('ALL');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [replaceModalOpen, setReplaceModalOpen] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType>(
    MediaType.General,
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const ITEMS_PER_PAGE = 24;

  const getFilters = useCallback(
    (offset = 0) => ({
      order: [
        {
          field: MediaOrderField.CreatedAt,
          direction: OrderDirection.Descending,
        },
      ],
      limit: ITEMS_PER_PAGE,
      offset,
      filterGroup: {
        operator: OperatorType.And,
        filters: [
          ...(selectedType !== 'ALL'
            ? [
                {
                  type: MediaFilterType.Option,
                  optionFilter: {
                    field: MediaOptionFilterField.Type,
                    operator: OptionFilterOperator.Is,
                    value: selectedType,
                  },
                },
              ]
            : []),
          ...(searchKey
            ? [
                {
                  type: MediaFilterType.Text,
                  textFilter: {
                    field: MediaTextFilterField.Key,
                    operator: TextFilterOperator.Contains,
                    value: searchKey,
                  },
                },
              ]
            : []),
        ],
      },
    }),
    [selectedType, searchKey],
  );

  const {
    data: mediaData,
    loading: mediaLoading,
    fetchMore,
    refetch,
  } = useQuery(SEARCH_MEDIA, {
    variables: {
      filters: getFilters(0),
    },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteMedia] = useMutation(DELETE_MEDIA, {
    onCompleted: (data) => {
      if (data.deleteMedia.success) {
        toast.success('Media deleted successfully');
        refetch();
      } else {
        toast.error(data.deleteMedia.message || 'Failed to delete media');
      }
    },
    onError: (error) => {
      console.error('Error deleting media:', error);
      toast.error('Failed to delete media');
    },
  });

  const allMedia = mediaData?.mediaList?.items || [];

  const hasMore = useMemo(() => {
    const currentItems = mediaData?.mediaList?.items || [];
    const totalItems = mediaData?.mediaList?.total || 0;
    return currentItems.length < totalItems;
  }, [mediaData?.mediaList?.items, mediaData?.mediaList?.total]);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || mediaLoading || !hasMore) return;

    setIsLoadingMore(true);

    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    const currentItems = mediaData?.mediaList?.items || [];

    fetchMore({
      variables: {
        filters: getFilters(currentItems.length),
      },
    }).finally(() => {
      setIsLoadingMore(false);
    });
  }, [
    isLoadingMore,
    mediaLoading,
    hasMore,
    mediaData?.mediaList?.items,
    fetchMore,
    getFilters,
  ]);

  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (node && hasMore) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !isLoadingMore && !mediaLoading) {
              handleLoadMore();
            }
          },
          {
            threshold: 0.1,
            rootMargin: '200px',
          },
        );

        observerRef.current.observe(node);
      }
    },
    [handleLoadMore, hasMore, isLoadingMore, mediaLoading],
  );

  const handleSearchChange = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.FormEvent<HTMLLabelElement>,
    ) => {
      const target = event.target as HTMLInputElement;
      setSearchKey(target.value);
    },
    [],
  );

  const debouncedSearch = useDebouncer(
    useCallback(() => {
      setIsLoadingMore(false);
      refetch({
        filters: getFilters(0),
      });
    }, [refetch, getFilters]),
    { wait: 500 },
  );

  const handleTypeChange = useCallback(
    (value: string) => {
      setSelectedType(value as MediaType | 'ALL');
      setIsLoadingMore(false);
      // Clear any pending timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
      // Refetch with new filters
      refetch({
        filters: getFilters(0),
      });
    },
    [refetch, getFilters],
  );

  const handleDeleteMedia = useCallback(
    (mediaId: string) => {
      deleteMedia({
        variables: {
          input: { id: mediaId },
        },
      });
    },
    [deleteMedia],
  );

  const handleReplaceMedia = useCallback(
    (mediaId: string, mediaType: MediaType) => {
      setSelectedMediaId(mediaId);
      setSelectedMediaType(mediaType);
      setReplaceModalOpen(true);
    },
    [],
  );

  const handleReplaceComplete = useCallback(() => {
    setReplaceModalOpen(false);
    setSelectedMediaId(null);
    setIsLoadingMore(false);
    refetch();
  }, [refetch]);

  const handleUploadComplete = useCallback(() => {
    setUploadModalOpen(false);
    setIsLoadingMore(false);
    refetch();
  }, [refetch]);

  // Trigger search when searchKey changes
  debouncedSearch.maybeExecute();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      const timeout = loadingTimeoutRef.current;
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  const mediaTypeOptions = [
    { value: 'ALL', label: 'All Types' },
    { value: MediaType.General, label: 'General' },
    { value: MediaType.FeaturedImage, label: 'Featured Image' },
    { value: MediaType.ArticleImage, label: 'Article Image' },
    { value: MediaType.Presenter, label: 'Presenter' },
    { value: MediaType.PresenterHero, label: 'Presenter Hero' },
    { value: MediaType.TrackArt, label: 'Track Art' },
  ];

  return (
    <Fragment>
      <PageHeader
        heading="Media Management"
        subheading="Manage, upload, and organize media files"
        actions={
          <Button onClick={() => setUploadModalOpen(true)}>Upload Media</Button>
        }
      />

      <div className="page-content">
        <div className="media-management">
          <div className="media-management__filters">
            <div className="media-management__search">
              <Input
                placeholder="Search media by filename..."
                value={searchKey}
                onChange={handleSearchChange}
                before={<SearchIcon />}
                after={mediaLoading ? <Loading size="xs" /> : undefined}
              />
            </div>

            <div className="media-management__type-filter">
              <Select value={selectedType} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mediaTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="media-management__grid">
            {allMedia.length === 0 && !mediaLoading ? (
              <div className="media-management__empty">
                <p>No media found</p>
              </div>
            ) : (
              <>
                {allMedia.map((media) => (
                  <div key={media.id} className="media-management__item">
                    <div className="media-management__item-preview">
                      <img
                        src={media.urls.square}
                        alt={media.key}
                        className="media-management__item-image"
                      />
                      <div className="media-management__item-overlay">
                        <div className="media-management__item-actions">
                          <Button
                            variant="secondary"
                            size="sm"
                            isIconOnly
                            onClick={() =>
                              handleReplaceMedia(media.id, media.type)
                            }
                          >
                            <ReplaceIcon />
                          </Button>
                          <Button
                            variant="tertiary"
                            size="sm"
                            isIconOnly
                            destructive
                            onClick={() => handleDeleteMedia(media.id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="media-management__item-info">
                      <span className="media-management__item-name">
                        {media.key}
                      </span>
                      <span className="media-management__item-meta">
                        {media.type} • {media.fileSize?.label || 'Unknown size'}
                      </span>
                    </div>
                  </div>
                ))}

                {hasMore && (
                  <div
                    ref={loadMoreRef}
                    className="media-management__load-more-trigger"
                    style={{ height: '1px' }}
                  />
                )}

                {(mediaLoading || isLoadingMore) && allMedia.length > 0 && (
                  <div className="media-management__loading-more">
                    <Loading size="sm" />
                    <p>Loading more media...</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <Dialog.Overlay />
        <Dialog.Content className="media-management__upload-modal">
          <Dialog.Title>Upload Media</Dialog.Title>
          <div className="media-management__upload-content">
            <MediaEditor
              type={MediaType.General}
              onChange={(mediaId) => {
                if (mediaId) {
                  handleUploadComplete();
                }
              }}
            />
          </div>
          <div className="media-management__upload-actions">
            <Button
              variant="tertiary"
              onClick={() => setUploadModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Dialog.Content>
      </Dialog>

      {/* Replace Modal */}
      <Dialog open={replaceModalOpen} onOpenChange={setReplaceModalOpen}>
        <Dialog.Overlay />
        <Dialog.Content className="media-management__replace-modal">
          <Dialog.Title>Replace Media</Dialog.Title>
          <div className="media-management__replace-content">
            <ReplaceMediaForm
              mediaId={selectedMediaId}
              mediaType={selectedMediaType}
              onComplete={handleReplaceComplete}
              onCancel={() => setReplaceModalOpen(false)}
            />
          </div>
        </Dialog.Content>
      </Dialog>
    </Fragment>
  );
};

interface ReplaceMediaFormProps {
  mediaId: string | null;
  mediaType: MediaType;
  onComplete: () => void;
  onCancel: () => void;
}

const ReplaceMediaForm = ({
  mediaId,
  mediaType,
  onComplete,
  onCancel,
}: ReplaceMediaFormProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    async (file: File, mediaType: MediaType) => {
      if (!mediaId) return;

      setUploading(true);
      setUploadProgress(0);

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('mediaId', mediaId);
        formData.append('type', mediaType);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_MEDIA_API}/media/replace`,
          formData,
          {
            timeout: 60 * 1000,
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total,
                );
                setUploadProgress(percentCompleted);
              }
            },
          },
        );

        // Check for successful response (200 status or success field)
        if (response.status === 200 || response.data?.success) {
          toast.success('Media replaced successfully');
          onComplete();
        } else {
          toast.error('Failed to replace media');
        }
      } catch (error) {
        console.error('Error replacing media:', error);
        toast.error('Failed to replace media');
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    },
    [mediaId, onComplete],
  );

  const handleFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        handleFileSelect(file, mediaType);
      }
    },
    [handleFileSelect, mediaType],
  );

  if (uploading) {
    return (
      <div className="media-management__replace-uploading">
        <div className="media-management__replace-progress">
          <Loading size="lg" />
          <p>Replacing media... {uploadProgress}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="media-management__replace-form">
      <p>Select a new file to replace the existing media:</p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
      <div className="media-management__replace-actions">
        <Button onClick={() => fileInputRef.current?.click()}>
          Select File
        </Button>
        <Button variant="tertiary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
