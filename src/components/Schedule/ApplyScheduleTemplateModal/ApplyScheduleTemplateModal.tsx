'use client';

import { Dialog, Tabs } from '@soundwaves/components';

import { ApplyAssignedTab } from './ApplyAssignedTab';
import { ApplyTemplateTab } from './ApplyTemplateTab';

export type ApplyScheduleTemplateModalProps = {
  scheduleDate: Date;
  networkId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ApplyScheduleTemplateModal = ({
  scheduleDate,
  networkId,
  open,
  onOpenChange,
}: ApplyScheduleTemplateModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay />
      <Dialog.Content dismissable>
        <Dialog.Title>Apply Schedule Template</Dialog.Title>
        <Tabs
          defaultValue="apply-assigned-template"
          orientation="horizontal"
          variant="underlined"
        >
          <Tabs.List>
            <Tabs.Trigger value="apply-assigned-template">
              Apply assigned template
            </Tabs.Trigger>
            <Tabs.Trigger value="apply-custom-template">
              Apply custom template
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="apply-assigned-template">
            <ApplyAssignedTab
              scheduleDate={scheduleDate}
              networkId={networkId}
              onOpenChange={onOpenChange}
            />
          </Tabs.Content>
          <Tabs.Content value="apply-custom-template">
            <ApplyTemplateTab
              scheduleDate={scheduleDate}
              onOpenChange={onOpenChange}
            />
          </Tabs.Content>
        </Tabs>
      </Dialog.Content>
    </Dialog>
  );
};
