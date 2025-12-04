import type { Metadata } from "next";
import "./globals.css";

// --- KHAI BÁO CĂN CƯỚC CHO FARCASTER (META TAGS) ---
export const metadata: Metadata = {
  title: "Flywheel Bot",
  description: "Bot tự động Mint & Launch Coin trên Base",
  openGraph: {
    title: "Flywheel Bot - Kiếm tiền tự động",
    description: "Công cụ tối ưu hóa lợi nhuận cho Creator trên Farcaster & Base.",
    images: ["https://placehold.co/600x400/000000/FFFFFF/png?text=Flywheel+Bot+App"], 
  },
  other: {
    // Phiên bản Frame
    "fc:frame": "vNext",
    
    // Ảnh hiện ra trên Feed Farcaster
    "fc:frame:image": "https://placehold.co/600x400/1e1e1e/4ade80/png?text=Open+Flywheel+Bot+🚀",
    
    // Nút bấm số 1: Mở App
    "fc:frame:button:1": "Mở App Ngay 🚀",
    "fc:frame:button:1:action": "link",
    
    // --- QUAN TRỌNG: SỬA DÒNG DƯỚI THÀNH LINK CỦA BẠN ---
    "fc:frame:button:1:target": "https://flywheel-bot.vercel.app", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
