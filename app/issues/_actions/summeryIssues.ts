'use server';
import { prisma } from '@/prisma/client';
import { Status } from '@prisma/client';

export const summeryIssues = async (issueStatus: Status) => {
  const issuesCount = await prisma.issue.count({
    where: {
      status: issueStatus,
    },
  });

  return issuesCount;
};
