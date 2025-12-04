"use client";

import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Cấu hình mạng Base cho Ví
const config = getDefaultConfig({
  appName: 'Flywheel Bot',
  // Project ID công cộng để test (sau này có thể tạo riêng tại cloud.walletconnect.com)
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || '3a8170812b534d0ff9d794f19a901d64',
  chains: [base],
  ssr: true, 
});

const queryClient = new QueryClient();

// Giữ nguyên Meta Tags để Farcaster nhận diện Frame
export const metadata = {
  title: "Flywheel Bot",
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://placehold.co/600x400/1e1e1e/4ade80/png?text=Open+Flywheel+Bot+🚀",
    "fc:frame:button:1": "Open App 🚀",
    "fc:frame:button:1:action": "link",
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