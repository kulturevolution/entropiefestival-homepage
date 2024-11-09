import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return new NextResponse(JSON.stringify({ message: 'Email is required' }), {
      status: 400,
    });
  }

  const url = process.env.NEXT_NEWSLETTER_API_URL;
  const username = process.env.NEXT_NEWSLETTER_API_USER;
  const password = process.env.NEXT_NEWSLETTER_API_PASSWORD;

  if (!url || !username || !password) {
    return NextResponse.json(
      { message: 'Server configuration error' },
      { status: 500 }
    );
  }

  const auth = Buffer.from(`${username}:${password}`).toString('base64');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${auth}`,
  };

  const body = JSON.stringify({
    email,
    name: email,
    status: 'enabled',
    lists: [parseInt(process.env.NEXT_NEWSLETTER_API_LIST_ID ?? '1')],
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    const answer = await response.json();
    if (answer.message === 'E-Mail existiert bereits.') {
      return NextResponse.json(null, { status: 200 });
    }

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { message: errorText },
        { status: response.status }
      );
    }

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
