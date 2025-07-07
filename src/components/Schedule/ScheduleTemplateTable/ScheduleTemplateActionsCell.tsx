'use client';

import { Button, DropdownMenu } from '@soundwaves/components';

import type { GetScheduleTemplatesQuery } from '@/graphql/__generated__/graphql';
import { EllipsisVerticalIcon } from '@/icons';

type TemplateRow =
  GetScheduleTemplatesQuery['defaultSchedules']['items'][number];

interface ScheduleTemplateActionsCellProps {
  template: TemplateRow;
  onEdit: (templateId: string) => void;
  onDuplicate: (template: TemplateRow) => void;
  onDelete: (templateId: string) => void;
}

export const ScheduleTemplateActionsCell = ({
  template,
  onEdit,
  onDuplicate,
  onDelete,
}: ScheduleTemplateActionsCellProps) => {
  return (
    <div onClick={(event) => event.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button size="xs-icon" isIconOnly variant="outline">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item
            onSelect={(event) => {
              event.stopPropagation();
              onEdit(template.id);
            }}
          >
            Edit
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={(event) => {
              event.stopPropagation();
              onDuplicate(template);
            }}
          >
            Duplicate
          </DropdownMenu.Item>
          <DropdownMenu.Item
            destructive
            onSelect={() => {
              onDelete(template.id);
            }}
          >
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
};
