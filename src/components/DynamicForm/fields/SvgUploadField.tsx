'use client';

import { Button } from '@soundwaves/components';
import { useState, useCallback } from 'react';
import { useController, type FieldValues, type Path } from 'react-hook-form';


interface SvgUploadFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  required?: boolean;
  helperText?: string;
  className?: string;
}

export const SvgUploadField = <T extends FieldValues>({
  name,
  label,
  required = false,
  helperText,
  className,
}: SvgUploadFieldProps<T>) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string>('');

  const {
    field: { onChange, value, ...rest },
    fieldState: { error },
  } = useController({
    name,
  });

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.includes('svg')) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const svgContent = e.target?.result as string;
        onChange(svgContent);
        setPreview(svgContent);
      };
      reader.readAsText(file);
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      const svgFile = files.find((file) => file.type.includes('svg'));

      if (svgFile) {
        handleFile(svgFile);
      }
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const handleClear = useCallback(() => {
    onChange('');
    setPreview('');
  }, [onChange]);

  // Set initial preview from value
  useState(() => {
    if (value && typeof value === 'string') {
      setPreview(value);
    }
  });

  return (
    <div className={`svg-upload-field ${className || ''}`}>
      <label className="svg-upload-field__label">
        {label}
        {required && <span className="svg-upload-field__required">*</span>}
      </label>

      <div
        className={`svg-upload-field__dropzone ${
          isDragOver ? 'svg-upload-field__dropzone--drag-over' : ''
        } ${error ? 'svg-upload-field__dropzone--error' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        {...rest}
      >
        {preview ? (
          <div className="svg-upload-field__preview">
            <div
              className="svg-upload-field__preview-content"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
            <div className="svg-upload-field__preview-actions">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById(`${name}-file-input`)?.click()}
              >
                Replace
              </Button>
            </div>
          </div>
        ) : (
          <div className="svg-upload-field__placeholder">
            <div className="svg-upload-field__placeholder-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <p className="svg-upload-field__placeholder-text">
              Drag and drop an SVG file here, or{' '}
              <button
                type="button"
                className="svg-upload-field__placeholder-button"
                onClick={() => document.getElementById(`${name}-file-input`)?.click()}
              >
                browse
              </button>
            </p>
            <p className="svg-upload-field__placeholder-hint">SVG files only</p>
          </div>
        )}

        <input
          id={`${name}-file-input`}
          type="file"
          accept=".svg,image/svg+xml"
          onChange={handleFileInput}
          className="svg-upload-field__file-input"
          style={{ display: 'none' }}
        />
      </div>

      {helperText && (
        <p className="svg-upload-field__helper-text">{helperText}</p>
      )}

      {error && (
        <p className="svg-upload-field__error-text">{error.message}</p>
      )}
    </div>
  );
};