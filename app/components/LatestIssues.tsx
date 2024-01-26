import { prisma } from '@/prisma/client';
import { Avatar, Card, Separator } from '@radix-ui/themes';
import Link from 'next/link';
import { IssueStatusBadge } from '.';

export const dynamic = 'force-dynamic';

async function LatestIssues() {
  const latestIssues = await prisma?.issue.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
    include: {
      user: true,
    },
  });
  const content = latestIssues?.map((issue, index) => (
    <article key={issue.id} className='flex flex-col items-start gap-2 w-full'>
      <section className='flex flex-row justify-between align-middle w-full'>
        <div>
          <Link href={`/issues/${issue.id}`} className='block'>
            {issue.title}
          </Link>
          <IssueStatusBadge status={issue.status} />
        </div>
        {issue.userId ? (
          <Avatar src={issue.user?.image!} fallback='?' radius='full' />
        ) : null}
      </section>
      {index + 1 === latestIssues.length ? null : (
        <Separator orientation='horizontal' size='4' />
      )}
    </article>
  ));
  return (
    <Card className='h-full'>
      <h2 className='text-2xl font-semibold mb-6'>Latest Issues</h2>
      <section className='flex flex-col gap-4'>{content}</section>
    </Card>
  );
}

export default LatestIssues;
