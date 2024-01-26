'use client';

import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { Issue, User } from '@prisma/client';
import { Card, Flex, Heading } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { useErrorStore } from '../UseErrorStore';
import { getSingleIssue } from '../_actions/getIssues';
import { dateToString } from '../_lib/dateToString';
import AlertDialogBox from './AlertDialogBox';
import AsigneeSelect from './AsigneeSelect';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { getUsers } from './getUsers';

type Props = {
  id: string;
};

export const dynamic = 'force-dynamic';

function SingleIssuePage({ id }: Props) {
  const error = useErrorStore(state => state.isErr);
  const { status } = useSession();

  const { data: issue, isFetched } = useQuery<Issue>({
    queryKey: ['issue', { id }],
    queryFn: async () => await getSingleIssue(id),
    throwOnError: () => notFound(),
  });

  const { data: users } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => await getUsers(),
    enabled: !!issue,
  });

  return (
    <article className='flex flex-col-reverse gap-3 max-w-4xl md:flex-col md:relative'>
      <div className='flex flex-col gap-4 md:absolute md:right-0'>
        {status === 'authenticated' ? (
          <>
            <EditButton id={id} />
            <DeleteButton id={id} />
          </>
        ) : null}
        <AsigneeSelect users={users as User[]} issueId={id} />
      </div>
      <Card variant='surface' className='prose'>
        <Flex justify='between'>
          <Heading>{issue?.title}</Heading>
        </Flex>
        <Flex gap='4' my='4'>
          <IssueStatusBadge status={issue?.status!} />
          <div>{isFetched && dateToString(issue?.createdAt as Date)}</div>
        </Flex>
        <Markdown>{issue?.body}</Markdown>
      </Card>

      <AlertDialogBox error={error} />
    </article>
  );
}

export default SingleIssuePage;
