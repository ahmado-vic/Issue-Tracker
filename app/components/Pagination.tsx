import { prisma } from '@/prisma/client';
import { Button } from '@radix-ui/themes';
import { Dispatch, SetStateAction } from 'react';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';

type pagePaginationProps = {
  page: number;
  pageCount: number;
  isFetched: boolean;
  setPage: Dispatch<SetStateAction<number>>;
};

async function Pagination({
  page,
  setPage,
  pageCount,
  isFetched,
}: pagePaginationProps) {
  return (
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
  );
}

export default Pagination;
