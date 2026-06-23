import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://fourmc-market-api.onrender.com/api/public/produtos', {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 0 } // no cache
    });

    if (!res.ok) {
      return NextResponse.json({ success: false, error: 'Failed to fetch from API' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error syncing products:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
