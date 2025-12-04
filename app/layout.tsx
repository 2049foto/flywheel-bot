"use client";

import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// 1. Cấu hình mạng Base cho Ví
const config = getDefaultConfig({
  appName: 'Flywheel Bot',
  // Project ID công cộng (dùng tạm để test)
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || '3a8170812b534d0ff9d794f19a901d64',
  chains: [base],
  ssr: true, 
});

const queryClient = new QueryClient();

// 2. Cấu hình Meta Tags cho Farcaster Frame (Quan trọng để hiện App trên feed)
// Lưu ý: Next.js App Router yêu cầu export metadata từ Server Component hoặc dùng layout tĩnh.
// Nhưng vì ta đang dùng "use client" cho Context, ta sẽ giữ cấu trúc đơn giản này.
// Farcaster vẫn sẽ đọc được thẻ meta nếu Vercel render đúng.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Flywheel Bot</title>
        <meta name="description" content="Automated Mint & Launch Coin Bot on Base" />
        <meta property="og:title" content="Flywheel Bot - Automate Your Earnings" />
        <meta property="og:image" content="https://placehold.co/600x400/1e1e1e/4ade80/png?text=Flywheel+Bot+App" />
        
        {/* Frame Tags */}
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://placehold.co/600x400/1e1e1e/4ade80/png?text=Open+Flywheel+Bot+🚀" />
        <meta name="fc:frame:button:1" content="Open App 🚀" />
        <meta name="fc:frame:button:1:action" content="link" />
        <meta name="fc:frame:button:1:target" content="https://flywheel-bot.vercel.app" />
      </head>
      <body className="bg-black text-white">
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()} coolMode>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}