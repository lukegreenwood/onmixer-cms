import { useController, type FieldValues, type Path } from 'react-hook-form';

import { MediaEditor, type MediaEditorProps } from '@/components/MediaEditor';

interface MediaEditorFieldProps<T extends FieldValues>
  extends Omit<MediaEditorProps, 'label'> {
  name: Path<T>;
  label: string;
}

export const MediaEditorField = <T extends FieldValues>({
  name,
  label,
  multiple = false,
  className = '',
}: MediaEditorFieldProps<T>) => {
  const {
    fieldState: { error },
  } = useController({
    name,
  });

  // For now, MediaEditor is a placeholder component
  // When fully implemented, it will handle file uploads and manage media state
  // The field.value would be file objects or media IDs, and field.onChange would update them

  return (
    <div>
      <MediaEditor label={label} multiple={multiple} className={className} />
      {error && (
        <div className="text-red-500 text-sm mt-1">{error.message}</div>
      )}
    </div>
  );
};
