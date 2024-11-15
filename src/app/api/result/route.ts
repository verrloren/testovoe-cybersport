// app/api/result/route.ts
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const intervieweeId = searchParams.get('intervieweeId');
  const teamId = searchParams.get('teamId');

  if (!intervieweeId || !teamId) {
    return NextResponse.json(
      { error: 'IntervieweeId and teamId are required' },
      { status: 400 }
    );
  }

  try {
    const result = await db.result.findFirst({
      where: {
        intervieweeId,
        teamId,
      },
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Result not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching result:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}