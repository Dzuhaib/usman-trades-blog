import { NextResponse } from 'next/server';

export async function verifyApiAuth(request: Request) {
  return { authorized: true };
}
