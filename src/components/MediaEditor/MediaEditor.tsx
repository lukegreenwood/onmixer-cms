'use client';

import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  CloseIcon,
  Loading,
  ProgressCircle,
} from '@soundwaves/components';
import axios from 'axios';
import clsx from 'clsx';
import { useState, useCallback, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

import { MediaSelectorModal } from '@/components/MediaSelectorModal';
import {
  MediaType,
  DeleteMediaInput,
  SearchMediaQuery,
} from '@/graphql/__generated__/graphql';
import { DELETE_MEDIA } from '@/graphql/mutations';
import { GET_MEDIA } from '@/graphql/queries';
import { formatMediaType } from '@/utils';

import { AddMediaIcon } from '../icons';

export interface MediaEditorProps {
  label?: string;
  multiple?: boolean;
  className?: string;
  type: MediaType;
  value?: string; // Media ID
  onChange?: (mediaId: string | null) => void;
}

export const MediaEditor = forwardRef<HTMLDivElement, MediaEditorProps>(
  (
    {
      label = 'Media',
      multiple = false,
      className = '',
      type,
      value,
      onChange,
    },
    ref,
  ) => {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    // Query for existing media if value is provided
    const { data: mediaData, loading: mediaLoading } = useQuery(GET_MEDIA, {
      variables: { id: value || '' },
      skip: !value,
    });

    // Delete media mutation
    const [deleteMedia] = useMutation(DELETE_MEDIA, {
      onCompleted: () => {
        onChange?.(null);
      },
      onError: (error) => {
        console.error('Error deleting media:', error);
      },
    });

    const uploadFile = useCallback(
      async (file: File) => {
        setUploading(true);
        setUploadProgress(0);
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('type', type);

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_MEDIA_API}/media/upload`,
            formData,
            {
              timeout: 60 * 1000, // 60 seconds
              maxContentLength: Infinity,
              maxBodyLength: Infinity,
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

          if (response.data?.id) {
            onChange?.(response.data.id);
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          toast.error('Failed to upload file');
        } finally {
          setUploading(false);
          setUploadProgress(0);
        }
      },
      [type, onChange],
    );

    const handleDelete = useCallback(() => {
      if (!value) return;

      deleteMedia({
        variables: {
          input: { id: value } as DeleteMediaInput,
        },
      });
    }, [value, deleteMedia]);

    const handleMediaSelect = useCallback(
      (media: SearchMediaQuery['mediaList']['items'][number]) => {
        onChange?.(media.id);
      },
      [onChange],
    );

    // Configure dropzone for image-only uploads
    const { getRootProps, getInputProps, isDragActive, isDragReject } =
      useDropzone({
        accept: {
          'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
        },
        multiple,
        disabled: uploading,
        onDrop: async (acceptedFiles) => {
          if (multiple) {
            // Handle multiple files in parallel
            await Promise.all(acceptedFiles.map((file) => uploadFile(file)));
          } else if (acceptedFiles.length > 0) {
            // Handle single file
            await uploadFile(acceptedFiles[0]);
          }
        },
      });

    const currentMedia = mediaData?.media;

    // Render uploading state - clean progress display without buttons
    const UploadingMarkup = (
      <div className="media-editor__upload-area media-editor__upload-area--uploading">
        <div className="media-editor__upload-progress">
          <ProgressCircle
            size="lg"
            value={uploadProgress}
            max={100}
            getLabelValue={(value, _max) => `${value}% uploaded`}
          />
          <p className="media-editor__upload-progress-text">
            Uploading media...
          </p>
        </div>
      </div>
    );

    // Render existing media state
    const ExistingMediaMarkup = currentMedia ? (
      <div className="media-editor__existing">
        <div className="media-editor__existing-grid">
          {/* Medium image with delete on hover */}
          <div className="media-editor__existing-item media-editor__existing-item--medium">
            <div className="media-editor__existing-preview">
              <img
                src={currentMedia.urls.medium}
                alt={currentMedia.key}
                className="media-editor__existing-image"
              />
              <div className="media-editor__existing-overlay">
                <div className="media-editor__existing-info">
                  <div className="media-editor__existing-key">
                    {currentMedia.key}
                  </div>
                  <div className="media-editor__existing-meta">
                    {currentMedia.mimeType} •{' '}
                    {currentMedia.fileSize?.label || 'Unknown size'} •{' '}
                    {formatMediaType(currentMedia.type)}
                  </div>
                </div>
                <div
                  className="media-editor__existing-delete"
                  onClick={handleDelete}
                >
                  <Button
                    variant="tertiary"
                    size="sm"
                    className="media-editor__delete-button"
                    destructive
                    isIconOnly
                    type="button"
                  >
                    <CloseIcon size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Square image */}
          <div className="media-editor__existing-item media-editor__existing-item--square">
            <div className="media-editor__existing-preview">
              <img
                src={currentMedia.urls.square}
                alt={currentMedia.key}
                className="media-editor__existing-image"
              />
            </div>
          </div>
        </div>
      </div>
    ) : null;

    // Render loading state
    const LoadingMarkup = (
      <div className="media-editor__loading">
        <Loading size="sm" />
        <span>Loading media...</span>
      </div>
    );

    // Render empty upload state
    const EmptyMarkup = (
      <div
        {...getRootProps()}
        className={clsx('media-editor__upload-area', {
          'media-editor__upload-area--drag-active': isDragActive,
          'media-editor__upload-area--drag-reject': isDragReject,
        })}
      >
        <input {...getInputProps()} />
        <div className="media-editor__upload-icon">
          <AddMediaIcon size={72} />
        </div>
        <p className="media-editor__upload-text">
          {isDragActive
            ? isDragReject
              ? 'Only image files are supported'
              : 'Drop image here'
            : 'Drag image here or click to select'}
        </p>
        <p className="media-editor__upload-hint">
          {multiple
            ? 'Images only (JPEG, PNG, GIF, WebP) - Multiple files supported'
            : 'Images only (JPEG, PNG, GIF, WebP) - Single file only'}
        </p>
        <div className="media-editor__upload-actions">
          <Button variant="secondary" size="sm" asChild>
            <div>{multiple ? 'Select images' : 'Select image'}</div>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(event) => {
              event.stopPropagation();
              setModalOpen(true);
            }}
          >
            Browse existing
          </Button>
        </div>
      </div>
    );

    // Main render logic with early returns for clarity
    const renderContent = () => {
      if (uploading) return UploadingMarkup;
      if (currentMedia && !mediaLoading) return ExistingMediaMarkup;
      if (mediaLoading) return LoadingMarkup;
      return EmptyMarkup;
    };

    return (
      <div ref={ref} className={clsx('media-editor', className)}>
        <div className="media-editor__label">{label}</div>
        <div className="media-editor__content">{renderContent()}</div>

        <MediaSelectorModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          onSelect={handleMediaSelect}
          type={type}
          title="Select Media"
          className="media-editor__modal"
        />
      </div>
    );
  },
);

MediaEditor.displayName = 'MediaEditor';
