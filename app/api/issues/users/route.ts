import { prisma } from '@/prisma/client';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const usersWithIssues = await prisma.user.findMany({
      select: {
        name: true,
        image: true,
        id: true,
        issues: {
          select: {
            id: true,
          },
        },
      },
    });

    return NextResponse.json(usersWithIssues, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 400 }
    );
  }
};
