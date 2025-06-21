'use client';

import { Button } from '@soundwaves/components';
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
  return hasFilters ? (
    <Button
      className="filter-actions__clear-button"
      variant="primary"
      destructive
      size="sm"
      onClick={actions?.removeAllFilters}
      before={<FilterClearIcon />}
    >
      <span className="filter-actions__clear-button-text">
        {t('clear', locale)}
      </span>
    </Button>
  ) : null;
}
