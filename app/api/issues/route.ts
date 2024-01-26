import { validationSchema } from '@/app/validationSchema';
import { prisma } from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/authOptions';

//@DESC Get all issues
//@PATH GET /issues
//@ACCESS Private
export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get('page'));
  const status = url.searchParams.get('status') as Status;
  let pageSize = 10;
  const skip = (page - 1) * pageSize;

  try {
    const issuesArray: Promise<Issue[]> = !status
      ? prisma.issue.findMany({
          skip,
          take: pageSize,
        })
      : prisma.issue.findMany({
          skip,
          take: pageSize,
          where: {
            status,
          },
        });

    const issuesCountNumber: Promise<number> = status
      ? prisma.issue.count({ where: { status } })
      : prisma.issue.count();

    const [issues, issuesCount] = await Promise.all([
      issuesArray,
      issuesCountNumber,
    ]);

    return NextResponse.json(
      { issues, issuesCount, pageSize },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 400 }
    );
  }
};

//@DESC Create issue
//@PATH POST /issues
//@ACCESS Private
export const POST = async (req: NextRequest) => {
  const session = getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const data: Issue = await req.json();

  const validation = validationSchema.safeParse(data);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  const issue = await prisma.issue.create({
    data: {
      title: data.title,
      body: data.body,
    },
  });

  return NextResponse.json(issue, { status: 201 });
};
