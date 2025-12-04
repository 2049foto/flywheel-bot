import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Luôn lấy dữ liệu mới nhất

export async function GET() {
  try {
    const apiKey = process.env.NEYNAR_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Chưa cấu hình API Key' }, { status: 500 });
    }

    // Gọi API lấy các bài cast mới nhất trên kênh Base
    const response = await fetch(
      'https://api.neynar.com/v2/farcaster/feed/channels?channel_ids=base&with_recasts=true&with_replies=false&limit=10',
      {
        headers: {
          accept: 'application/json',
          api_key: apiKey,
        },
        cache: 'no-store'
      }
    );

    const data = await response.json();
    return NextResponse.json({ casts: data.casts });
  } catch (error) {
    console.error('Lỗi gọi Neynar:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}