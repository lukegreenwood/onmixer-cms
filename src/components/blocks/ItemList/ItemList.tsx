'use client';

import { Button, CloseIcon } from '@soundwaves/components';
import clsx from 'clsx';

import { PrimarySecondary } from '@/components';
import { AddIcon } from '@/icons';

export type ItemListProps = {
  items: Array<{
    id: string;
    primary: React.ReactNode;
    secondary?: React.ReactNode;
    image?: React.ReactNode;
  }>;
  selectedId?: string;
  onSelect?: (itemId: string) => void;
  onRemove?: (itemId: string) => void;
  onAdd?: () => void;
};

export const ItemList = ({
  items,
  selectedId,
  onSelect,
  onRemove,
  onAdd,
}: ItemListProps) => {
  return (
    <div>
      <div className="item-list">
        <div className="item-list__items">
          {items.map((item) => (
            <div
              key={item.id}
              className={clsx(
                'item-list__item',
                onSelect && 'item-list__item--selectable',
                onSelect &&
                  item.id === selectedId &&
                  'item-list__item--selected',
              )}
              {...(onSelect
                ? {
                    onClick: () => onSelect?.(item.id),
                    role: 'button',
                    tabIndex: 0,
                    onKeyDown: (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onSelect?.(item.id);
                      }
                    },
                  }
                : {})}
            >
              {item.image && (
                <div className="item-list__image">{item.image}</div>
              )}
              <div className="item-list__content">
                <PrimarySecondary
                  primary={item.primary}
                  secondary={item.secondary}
                  reverse={false}
                />
              </div>
              {onRemove && (
                <div className="item-list__actions">
                  <Button
                    variant="outline"
                    className="item-list__remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(item.id);
                    }}
                    isIconOnly
                    size="sm"
                  >
                    <CloseIcon />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        {onAdd && (
          <button className="item-list__add" onClick={onAdd}>
            <AddIcon />
            <span>Add another</span>
          </button>
        )}
      </div>
    </div>
  );
};
