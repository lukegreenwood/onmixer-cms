'use client';

import { useQuery } from '@apollo/client';
import { Button, Dialog, Input, Loading } from '@soundwaves/components';
import { useState, useCallback, useRef } from 'react';

import { SearchIcon } from '@/components/icons';
import {
  MediaType,
  OperatorType,
  MediaFilterType,
  MediaOptionFilterField,
  OptionFilterOperator,
  MediaTextFilterField,
  TextFilterOperator,
  SearchMediaQuery,
  MediaOrderField,
  OrderDirection,
} from '@/graphql/__generated__/graphql';
import { SEARCH_MEDIA } from '@/graphql/queries';

export interface MediaSelectorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (media: SearchMediaQuery['mediaList']['items'][number]) => void;
  type: MediaType;
  title?: string;
  searchPlaceholder?: string;
  className?: string;
}

export const MediaSelectorModal = ({
  open,
  onOpenChange,
  onSelect,
  type,
  title = 'Select Media',
  searchPlaceholder = 'Search media by filename...',
  className = '',
}: MediaSelectorModalProps) => {
  const [searchKey, setSearchKey] = useState('');
  
  const ITEMS_PER_PAGE = 20;

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
          {
            type: MediaFilterType.Option,
            optionFilter: {
              field: MediaOptionFilterField.Type,
              operator: OptionFilterOperator.Is,
              value: type,
            },
          },
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
    [type, searchKey],
  );

  const {
    data: searchData,
    loading: searchLoading,
    fetchMore,
    refetch: refetchSearch,
  } = useQuery(SEARCH_MEDIA, {
    variables: {
      filters: getFilters(0),
    },
    skip: !open,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const allMedia = searchData?.mediaList?.items || [];

  const handleMediaSelect = useCallback(
    (media: SearchMediaQuery['mediaList']['items'][number]) => {
      onSelect(media);
      onOpenChange(false);
    },
    [onSelect, onOpenChange],
  );


  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const loadMoreRef = useCallback((node: HTMLDivElement | null) => {
    if (searchLoading) return;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    if (node) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            const currentItems = searchData?.mediaList?.items || [];
            const hasMore = currentItems.length > 0 && currentItems.length % ITEMS_PER_PAGE === 0;
            
            if (hasMore && !searchLoading) {
              fetchMore({
                variables: {
                  filters: getFilters(currentItems.length),
                },
              });
            }
          }
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
        }
      );
      
      observerRef.current.observe(node);
    }
  }, [searchLoading, searchData, fetchMore, getFilters, ITEMS_PER_PAGE]);

  const handleSearchChange = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.FormEvent<HTMLLabelElement>,
    ) => {
      const target = event.target as HTMLInputElement;
      const newSearchKey = target.value;
      setSearchKey(newSearchKey);

      refetchSearch({
        filters: getFilters(0),
      });
    },
    [refetchSearch, getFilters],
  );

  const handleClose = useCallback(() => {
    onOpenChange(false);
    setSearchKey('');
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay />
      <Dialog.Content className={`media-selector-modal ${className}`}>
        <Dialog.Title>{title}</Dialog.Title>
        <div className="media-selector-modal__content">
          <div className="media-selector-modal__search">
            <Input
              placeholder={searchPlaceholder}
              value={searchKey}
              onChange={handleSearchChange}
              before={<SearchIcon />}
              after={searchLoading ? <Loading size="xs" /> : undefined}
            />
          </div>

          <div className="media-selector-modal__results">
            {allMedia.length === 0 && !searchLoading ? (
              <div className="media-selector-modal__empty">
                <p>No media found</p>
              </div>
            ) : (
              <div className="media-selector-modal__grid">
                {allMedia.map((media) => (
                  <button
                    key={media.id}
                    className="media-selector-modal__item"
                    onClick={() => handleMediaSelect(media)}
                  >
                    <div className="media-selector-modal__item-preview">
                      <img
                        src={media.urls.square}
                        alt={media.key}
                        className="media-selector-modal__item-image"
                      />
                    </div>
                    <div className="media-selector-modal__item-info">
                      <span className="media-selector-modal__item-name">
                        {media.key}
                      </span>
                      <span className="media-selector-modal__item-size">
                        {media.fileSize?.label || 'Unknown size'}
                      </span>
                    </div>
                  </button>
                ))}
                <div 
                  ref={loadMoreRef}
                  className="media-selector-modal__load-more-trigger"
                  style={{ height: '1px' }}
                />
                {searchLoading && allMedia.length > 0 && (
                  <div className="media-selector-modal__loading-more">
                    <Loading size="sm" />
                    <p>Loading more media...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="media-selector-modal__actions">
          <Button variant="tertiary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
