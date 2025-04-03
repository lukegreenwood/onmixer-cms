import { Popover } from '@soundwaves/components';

import { ChevronDownIcon } from '../icons';

type ItemSelectorProps =
  | {
      primaryText: string;
      secondaryText: string;
      content: React.ReactNode;
      icon?: React.ReactNode;
    }
  | {
      trigger: React.ReactNode;
      content: React.ReactNode;
      icon?: React.ReactNode;
    };

export const ItemSelector = ({
  content,
  icon,
  ...restProps
}: ItemSelectorProps) => {
  return (
    <Popover>
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
        asChild
        className="item-selector-content"
      >
        {content}
      </Popover.Content>
    </Popover>
  );
};
