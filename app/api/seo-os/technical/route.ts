import { NextResponse } from 'next/server';
import { getTechnicalAudit, resolveTechnicalIssue } from '../../../../lib/seo-os/technical-engine';
import { verifyApiAuth } from '../../../../lib/seo-os/auth';
import { apiLimiter, getIdentifier } from '../../../../lib/seo-os/rate-limit';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const id = getIdentifier(request);
  const { success: withinLimit } = await apiLimiter.limit(id);
  if (!withinLimit) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });

  const auth = verifyApiAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const issues = await getTechnicalAudit();
    return NextResponse.json({ success: true, issues });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const id = getIdentifier(request);
  const { success: withinLimit } = await apiLimiter.limit(id);
  if (!withinLimit) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });

  const auth = verifyApiAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const { id: issueId } = await request.json();
    const success = await resolveTechnicalIssue(issueId);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
