'use client';

import { Button } from '@soundwaves/components';
import clsx from 'clsx';

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';

interface PaginationProps {
  currentPage: number;
  amount: number;
  total: number;
  entity?: string;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  amount,
  total,
  entity = 'items',
  onPageChange,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(total / amount);
  const startItem = (currentPage - 1) * amount + 1;
  const endItem = Math.min(currentPage * amount, total);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handlePrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={clsx('pagination', className)}>
      <Button
        variant="tertiary"
        size="sm"
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        aria-label="Go to previous page"
        isIconOnly
      >
        <ChevronLeftIcon className="pagination__nav-icon" />
      </Button>

      <div className="pagination__info">
        {startItem}-{endItem} of {total.toLocaleString()} {entity}
      </div>

      <Button
        variant="tertiary"
        size="sm"
        onClick={handleNext}
        disabled={!canGoNext}
        aria-label="Go to next page"
        isIconOnly
      >
        <ChevronRightIcon className="pagination__nav-icon" />
      </Button>
    </div>
  );
}
