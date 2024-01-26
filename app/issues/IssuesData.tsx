'use client';

import { Issue, Status } from '@prisma/client';
import { Button, Table, Text } from '@radix-ui/themes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { sort } from 'fast-sort';
import NextLink from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowDownWideShort, FaArrowUpShortWide } from 'react-icons/fa6';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { IssueStatusBadge } from '../components';
import CustomLink from '../components/Link';
import { getIssues } from './_actions/getIssues';
import { dateToString } from './_lib/dateToString';

type ColumnsType = {
  label: string;
  value: keyof Issue;
  className: string;
}[];

type IssueKeys = keyof Issue | null;

function IssuesData() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'All';
  const orderedBy = searchParams.get('orderBy') as IssueKeys;
  const statusArray = Object.keys(Status);
  const [filter, setFilter] = useState({
    asc: false,
    desc: true,
    by: '',
  });

  const tabelComuns: ColumnsType = [
    { label: 'Issue', value: 'title', className: '' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

  const { data, isFetched } = useQuery({
    queryKey: ['issues', page, status],
    queryFn: async () => await getIssues(page, status),
    placeholderData: keepPreviousData,
  });

  const filteredIssues = data?.issues?.filter((issue: Issue) => {
    if (status && statusArray.includes(status)) {
      return issue.status === status;
    }

    if ((status && !statusArray.includes(status)) || !status) {
      return data.issues;
    }
  });

  const pageCount = Math.ceil(
    (data?.issuesCount as number) / (data?.pageSize as number)
  );

  useEffect(() => {
    setFilter(prev => ({
      ...prev,
      by: orderedBy as string,
    }));
  }, [orderedBy]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  }, [page]);

  const handleClick = () => {
    if (filter.by && filter.by === orderedBy) {
      setFilter(prev => ({
        ...prev,
        asc: !prev.asc,
        desc: !prev.desc,
      }));
    } else {
      setFilter({
        by: '',
        asc: false,
        desc: true,
      });
    }
  };

  const issuesArray = filter.asc
    ? sort(filteredIssues!).asc(orderedBy!)
    : sort(filteredIssues!).desc(orderedBy!);

  return (
    <>
      {/* issues table */}
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {tabelComuns.map(column => (
              <Table.ColumnHeaderCell
                key={column.label}
                className={column.className}
                onClick={() => handleClick()}
              >
                <NextLink
                  href={{
                    query: {
                      status,
                      orderBy: column.value,
                    },
                  }}
                  className='flex items-center gap-1'
                >
                  <span>{column.label}</span>
                  {column.value === orderedBy && filter.asc && (
                    <FaArrowUpShortWide />
                  )}
                  {column.value === orderedBy && filter.desc && (
                    <FaArrowDownWideShort />
                  )}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issuesArray?.map(issue => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <CustomLink href={`/issues/${issue.id}`}>
                  {issue.title}
                </CustomLink>
                <Text as='p' className='mt-4 md:hidden '>
                  <IssueStatusBadge status={issue.status} />
                </Text>
              </Table.RowHeaderCell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {dateToString(issue.createdAt as Date)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/* pagination */}
      {pageCount > 1 ? (
        <div className='flex mt-10 items-center gap-5'>
          <section className='flex gap-4 items-center'>
            <Button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              <GrCaretPrevious />
            </Button>
            <Button
              onClick={() => setPage(prev => prev + 1)}
              disabled={page === pageCount}
            >
              <GrCaretNext />
            </Button>
            {isFetched && (
              <span className='text-sm'>
                Page: {page} of {pageCount}
              </span>
            )}
          </section>
        </div>
      ) : null}
    </>
  );
}

export default IssuesData;
