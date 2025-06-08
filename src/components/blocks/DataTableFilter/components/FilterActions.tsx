import { Button } from '@soundwaves/components';
import clsx from 'clsx';
import { memo } from 'react';

import { FilterClearIcon } from '@/components/icons';

import { type Locale, t } from '../lib/i18n';

import type { DataTableFilterActions } from '../core/types';

interface FilterActionsProps {
  hasFilters: boolean;
  actions?: DataTableFilterActions;
  locale?: Locale;
}

export const FilterActions = memo(__FilterActions);
function __FilterActions({
  hasFilters,
  actions,
  locale = 'en',
}: FilterActionsProps) {
  return (
    <Button
      className={clsx('h-7 !px-2', !hasFilters && 'hidden')}
      variant="primary"
      destructive
      onClick={actions?.removeAllFilters}
    >
      <FilterClearIcon />
      <span className="hidden md:block">{t('clear', locale)}</span>
    </Button>
  );
}
