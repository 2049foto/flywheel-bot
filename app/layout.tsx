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

// 2. Cấu hình Meta Tags cho Farcaster Frame
export const metadata = {
  title: "Flywheel Bot",
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://placehold.co/600x400/1e1e1e/4ade80/png?text=Open+Flywheel+Bot+🚀",
    "fc:frame:button:1": "Open App 🚀",
    "fc:frame:button:1:action": "link",
    // Lưu ý: Farcaster sẽ tự dùng link hiện tại làm target, không cần hardcode
    "fc:frame:button:1:target": "https://flywheel-bot.vercel.app", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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