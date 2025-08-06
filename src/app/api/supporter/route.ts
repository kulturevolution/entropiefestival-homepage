import { NextRequest, NextResponse } from 'next/server';
import { SupporterSchema } from '@/lib/validation';
import { saveSupporter, getRateLimit } from '@/lib/supporter';
import { sendSupporterEmail } from '@/lib/email';
import { initializeDatabase } from '@/lib/db';

let dbInitialized = false;

export async function POST(request: NextRequest) {
  return NextResponse.json({ error: 'registration closed' }, { status: 400 });

  /*if (!dbInitialized) {
    dbInitialized = await initializeDatabase();
    if (!dbInitialized) {
      return NextResponse.json(
        { error: 'Database initialization failed' },
        { status: 500 }
      );
    }
  }

  try {
    const ipAddress =
      request.headers.get('x-forwarded-for') || request.ip || 'unknown';

    const body = await request.json();
    const result = SupporterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const validatedData = result.data;

    const submissionCount = await getRateLimit(ipAddress);
    if (ipAddress && submissionCount > 5) {
      return NextResponse.json(
        { error: 'Too many submissions from this ip address' },
        { status: 429 }
      );
    }

    await saveSupporter(validatedData, ipAddress);
    await sendSupporterEmail(validatedData);

    return NextResponse.json(
      { success: true, message: 'Submission received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: 'Server error processing your request' },
      { status: 500 }
    );
  }*/
}
