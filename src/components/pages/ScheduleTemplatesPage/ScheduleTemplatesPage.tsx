'use client';

import { Button } from '@soundwaves/components';
import Link from 'next/link';
import React from 'react';

import { PageHeader } from '@/blocks/PageHeader/PageHeader';
import { ScheduleTemplateTable } from '@/components';
import { useNavigation } from '@/hooks/useNavigation';

export function ScheduleTemplatesPage() {
  const { getNetworkRoutePath } = useNavigation();

  return (
    <div>
      <PageHeader
        heading="Schedule Templates"
        subheading="Pre-defined defaults to used to quickly build schedules"
        actions={
          <Button asChild>
            <Link href={getNetworkRoutePath('scheduleTemplateCreate')}>
              Create template
            </Link>
          </Button>
        }
      />

      <div className="page-content">
        <ScheduleTemplateTable />
      </div>
    </div>
  );
}
