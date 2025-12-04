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
```

Nhớ ấn **`Ctrl + S`** để lưu lại nhé.

---

### Việc 2: Cài đặt công cụ Web3 (Để kết nối Ví)

Để người dùng kết nối được ví MetaMask/Coinbase, chúng ta cần cài bộ công cụ chuẩn của Base.

1.  Mở **Terminal** (Bảng màu đen bên dưới).
2.  Dán lệnh này vào và ấn **Enter**:

```bash
npm install @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query