import { validationSchema } from '@/app/validationSchema';
import { prisma } from '@/prisma/client';
import { Issue } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/authOptions';

type Params = {
  params: {
    issueId: string;
  };
};

//@DESC Get Single Issue
//@PATH GET /issues/id
//@ACCESS Private
export const GET = async (
  req: NextRequest,
  { params: { issueId } }: Params
) => {
  const session = getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: issueId },
      include: { user: true },
    });

    return NextResponse.json(issue, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'There is something wrong' },
      { status: 400 }
    );
  }
};

//@DESC Get Single Issue
//@PATH PUT /issues/id
//@ACCESS Private
export const PUT = async (
  req: NextRequest,
  { params: { issueId } }: Params
) => {
  const session = getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const data: Partial<Issue> = await req.json();

  try {
    const validation = validationSchema.safeParse(data);
    if (!validation.success)
      return NextResponse.json(validation.error.flatten(), {
        status: 400,
      });

    //check issue existence
    const issue = await prisma.issue.findUnique({ where: { id: issueId } });
    if (!issue)
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

    const updatedIssue = await prisma.issue.update({
      where: {
        id: issueId,
      },
      data: {
        title: data.title,
        body: data.body,
      },
    });

    return NextResponse.json(updatedIssue, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'There is something wrong' },
      { status: 400 }
    );
  }
};

//@DESC Delete Single Issue
//@PATH DELETE /issues/id
//@ACCESS Private
export const DELETE = async (
  req: NextRequest,
  { params: { issueId } }: Params
) => {
  try {
    //check issue existence
    const issue = await prisma.issue.findUnique({ where: { id: issueId } });
    if (!issue)
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

    //delete issue
    const deletedIssue = await prisma.issue.delete({ where: { id: issueId } });

    return NextResponse.json(deletedIssue, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'There is something wrong' },
      { status: 400 }
    );
  }
};

//@DESC Assign user to single issue
//@PATH POST /issues/id?userId=userId
//@ACCESS Private
export const POST = async (
  req: NextRequest,
  { params: { issueId } }: Params
) => {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId') as string;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user)
      return NextResponse.json(
        { message: 'user is not found!' },
        { status: 404 }
      );

    const userToIssue = await prisma.issue.update({
      where: {
        id: issueId,
      },
      data: {
        userId,
      },
    });

    return NextResponse.json(userToIssue, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 400 }
    );
  }
};
