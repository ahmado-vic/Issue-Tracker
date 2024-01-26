'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Statuses = { label: string; value?: Status | 'All' }[];

const statuses: Statuses = [
  { label: 'All', value: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

function IssueStatusFilter() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status') as string;
  const filteredBy = searchParams.get('orderBy') as string;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div>
      <Select.Root
        defaultValue={status || 'All'}
        onValueChange={value =>
          value && !filteredBy
            ? router.replace(`${pathname}?status=${value}&page=1`)
            : value && filteredBy
            ? router.replace(
                `${pathname}?status=${value}&orderBy=${filteredBy}`
              )
            : router.replace('/issues')
        }
      >
        <Select.Trigger />
        <Select.Content>
          {statuses.map(status => (
            <Select.Group key={status.value}>
              <Select.Item value={status.value!}>{status.label}</Select.Item>
            </Select.Group>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  );
}

export default IssueStatusFilter;
