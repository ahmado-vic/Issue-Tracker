'use client';
import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import useSummery from '../hooks/useSummery';

type IssuesContainer = {
  label: string;
  status: Status;
  value: Awaited<Promise<number>>;
}[];

function IssuesSummery() {
  const { open, inProgress, closed } = useSummery();
  const issuesContainer: IssuesContainer = [
    {
      label: 'Open Issues',
      status: 'OPEN',
      value: open,
    },
    {
      label: 'In-Progress Issues',
      status: 'IN_PROGRESS',
      value: inProgress,
    },
    {
      label: 'Closed Issues',
      status: 'CLOSED',
      value: closed,
    },
  ];

  const content = issuesContainer.map((container, index) => (
    <Card key={index}>
      <Flex direction='column'>
        <Link href={`/issues?status=${container.status}`}>
          {container.label}
        </Link>
        <Text as='p'>{container.value}</Text>
      </Flex>
    </Card>
  ));

  return <Flex gap='4'>{content}</Flex>;
}

export default IssuesSummery;
