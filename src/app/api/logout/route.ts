import { NextResponse } from 'next/server';
import { logout } from '@/action/logout'; // Adjust the import path as needed

export async function POST() {
  const result = await logout();
  return NextResponse.json(result);
}