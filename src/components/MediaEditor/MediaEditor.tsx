'use client';

import { Button } from '@soundwaves/components';
import clsx from 'clsx';

export interface MediaEditorProps {
  label?: string;
  multiple?: boolean;
  className?: string;
}

export const MediaEditor = ({
  label = 'Media',
  multiple = false,
  className = '',
}: MediaEditorProps) => {
  return (
    <div className={clsx('media-editor', className)}>
      <label className="media-editor__label">{label}</label>
      <div className="media-editor__content">
        <div className="media-editor__upload-area">
          <div className="media-editor__upload-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </div>
          <p className="media-editor__upload-text">
            Drop images here or click to select
          </p>
          <p className="media-editor__upload-hint">
            {multiple ? 'Multiple files supported' : 'Single file only'}
          </p>
          <Button variant="secondary" size="sm">
            Select media
          </Button>
        </div>

        {/* Placeholder for existing media */}
        {/* <div className="media-editor__existing">
          <div className="media-editor__existing-item">
            <div className="media-editor__existing-preview">
              <div className="media-editor__existing-placeholder">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21,15 16,10 5,21" />
                </svg>
              </div>
            </div>
            <div className="media-editor__existing-info">
              <span className="media-editor__existing-name">
                example-image.jpg
              </span>
              <span className="media-editor__existing-size">1024x768</span>
            </div>
            <Button variant="tertiary" size="sm" color="error">
              Remove
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  );
};
