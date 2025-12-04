// app/api/frame/route.ts
import { NextRequest } from 'next/server';
import { verifyFramePost } from '@farcaster/frame-sdk'; // npm install @farcaster/frame-sdk

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  // Kiểm tra request thật từ Warpcast (rất quan trọng)
  const isValid = await verifyFramePost(body);
  if (!isValid) return new Response('Invalid frame', { status: 400 });

  const { fid } = body.untrustedData; // ID người dùng Farcaster

  // Trả về frame mới sau khi người dùng bấm nút
  return new Response(JSON.stringify({
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://flywheel-bot.vercel.app/frame-connected.jpg',
    'fc:frame:button:1': 'Mint NFT miễn phí (Zora)',
    'fc:frame:button:1:action': 'tx',
    'fc:frame:button:1:target': 'https://flywheel-bot.vercel.app/api/tx/mint',
    'fc:frame:button:2': 'Launch Coin $YOURNAME',
    'fc:frame:button:2:action': 'post',
    'fc:frame:button:2:target': 'https://flywheel-bot.vercel.app/api/frame/launch',
    'fc:frame:post_url': 'https://flywheel-bot.vercel.app/api/frame',
  }), {
    headers: { 'Content-Type': 'text/plain' },
  });
}