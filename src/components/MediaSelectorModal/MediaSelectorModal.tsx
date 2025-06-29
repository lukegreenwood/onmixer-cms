'use client';

import { useQuery } from '@apollo/client';
import { Button, Dialog, Input, Loading } from '@soundwaves/components';
import { useState, useCallback } from 'react';

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

  // Search media for modal
  const {
    data: searchData,
    loading: searchLoading,
    refetch: refetchSearch,
  } = useQuery(SEARCH_MEDIA, {
    variables: {
      filters: {
        limit: 20,
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
      },
    },
    skip: !open,
  });

  const handleMediaSelect = useCallback(
    (media: SearchMediaQuery['mediaList']['items'][number]) => {
      onSelect(media);
      onOpenChange(false);
    },
    [onSelect, onOpenChange],
  );

  const handleSearchChange = useCallback(
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.FormEvent<HTMLLabelElement>,
    ) => {
      const target = event.target as HTMLInputElement;
      const newSearchKey = target.value;
      setSearchKey(newSearchKey);

      // Refetch with new search term
      refetchSearch({
        filters: {
          limit: 20,
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
              ...(newSearchKey
                ? [
                    {
                      type: MediaFilterType.Text,
                      textFilter: {
                        field: MediaTextFilterField.Key,
                        operator: TextFilterOperator.Contains,
                        value: newSearchKey,
                      },
                    },
                  ]
                : []),
            ],
          },
        },
      });
    },
    [type, refetchSearch],
  );

  const handleClose = useCallback(() => {
    onOpenChange(false);
    setSearchKey(''); // Reset search when closing
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
            {searchData?.mediaList.items.length === 0 ? (
              <div className="media-selector-modal__empty">
                <p>No media found</p>
              </div>
            ) : (
              <div className="media-selector-modal__grid">
                {searchData?.mediaList.items.map((media) => (
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
