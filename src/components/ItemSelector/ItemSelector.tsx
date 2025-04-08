'use client';

import { Popover } from '@soundwaves/components';

import { ChevronDownIcon } from '../icons';

type ItemSelectorProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  content: React.ReactNode;
  icon?: React.ReactNode;
} & (
  | {
      primaryText: string;
      secondaryText: string;
    }
  | {
      trigger: React.ReactNode;
    }
);

export const ItemSelector = ({
  content,
  icon,
  onOpenChange,
  open,
  ...restProps
}: ItemSelectorProps) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>
        <button className="item-selector">
          <span className="item-selector__text">
            {'primaryText' in restProps && (
              <>
                <span className="item-selector__secondary-text">
                  {restProps.secondaryText}
                </span>
                <span className="item-selector__primary-text">
                  {restProps.primaryText}
                </span>
              </>
            )}
            {'trigger' in restProps && restProps.trigger}
          </span>
          <span
            className={`item-selector__icon ${
              icon ? 'item-selector__icon--no-rotate' : ''
            }`}
          >
            {icon ?? <ChevronDownIcon />}
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Content
        side="bottom"
        sideOffset={2}
        align="start"
        className="item-selector-content"
      >
        {content}
      </Popover.Content>
    </Popover>
  );
};
