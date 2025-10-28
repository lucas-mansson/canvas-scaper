import { NextResponse } from 'next/server';

export async function GET() {
  const CANVAS_API_URL = process.env.CANVAS_API_URL;
  const CANVAS_ACCESS_TOKEN = process.env.CANVAS_ACCESS_TOKEN;

  if (!CANVAS_API_URL || !CANVAS_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'Missing Canvas API credentials' },
      { status: 500 }
    );
  }

  const endpoint = `${CANVAS_API_URL}/courses`;
  
  try {
    const url = new URL(endpoint);
    url.searchParams.append('enrollment_state', 'active');
    url.searchParams.append('include[]', 'students');
    url.searchParams.append('include[]', 'term');
    //url.searchParams.append('per_page', '10');

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${CANVAS_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Canvas API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
