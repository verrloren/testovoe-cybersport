import { sendProjectFiles } from '@/features/projects/actions/send-project-files';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await sendProjectFiles(formData);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      success: false,
      response: error instanceof Error ? error.message : "An unknown error occurred"
    });
  }
}