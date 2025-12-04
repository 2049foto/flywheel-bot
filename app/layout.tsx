import type { Metadata } from "next";
import "./globals.css";

// --- FARCASTER FRAME METADATA (ENGLISH VERSION) ---
export const metadata: Metadata = {
  title: "Flywheel Bot",
  description: "Automated Mint & Launch Coin Bot on Base",
  openGraph: {
    title: "Flywheel Bot - Automate Your Earnings",
    description: "The ultimate tool for creators to automate minting and token launches on Farcaster & Base.",
    images: ["https://placehold.co/600x400/000000/FFFFFF/png?text=Flywheel+Bot+App"], 
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://placehold.co/600x400/1e1e1e/4ade80/png?text=Open+Flywheel+Bot+🚀",
    
    // Nút bấm tiếng Anh
    "fc:frame:button:1": "Open App 🚀",
    "fc:frame:button:1:action": "link",
    
    // --- LINK CỦA BẠN (GIỮ NGUYÊN) ---
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