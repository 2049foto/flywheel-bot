"use client";

import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract } from 'wagmi';
import { Rocket, Zap, RefreshCw, AlertCircle, ExternalLink } from 'lucide-react';

export default function FlywheelApp() {
  const { address, isConnected } = useAccount();
  const [casts, setCasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Hàm gọi API lấy dữ liệu thật từ Farcaster (thông qua file route.ts bạn đã tạo)
  const fetchCasts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/casts');
      const data = await res.json();
      if (data.casts) setCasts(data.casts);
    } catch (e) {
      console.error("Lỗi lấy dữ liệu:", e);
    } finally {
      setLoading(false);
    }
  };

  // Tự động gọi khi mở App
  useEffect(() => {
    fetchCasts();
  }, []);

  // 2. Hàm xử lý Mint (Khi bấm nút)
  const handleMint = () => {
    if (!isConnected) return alert("Please Connect Wallet First! (Vui lòng kết nối ví)");
    alert("🚀 Coming Soon! (Tính năng này sẽ mở ví MetaMask của bạn để ký giao dịch)");
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans max-w-md mx-auto border-x border-gray-800 relative">
      
      {/* HEADER: Có nút Connect Wallet thật */}
      <div className="p-4 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center sticky top-0 z-20 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg"><Rocket size={20} /></div>
          <div>
            <h1 className="font-bold">Flywheel</h1>
            <span className="text-[10px] text-green-400 flex items-center gap-1">● Live Data</span>
          </div>
        </div>
        {/* Nút Connect Ví Cầu Vồng */}
        <div className="scale-75 origin-right">
            <ConnectButton showBalance={false} chainStatus="icon" accountStatus="avatar" />
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-4">
        
        {/* Trạng thái kết nối */}
        {!isConnected && (
            <div className="bg-yellow-900/20 border border-yellow-600/30 p-3 rounded-xl flex items-center gap-3">
                <AlertCircle className="text-yellow-500" size={20} />
                <p className="text-xs text-yellow-200">Connect wallet to start earning rewards.</p>
            </div>
        )}

        {/* Danh sách bài đăng THẬT */}
        <div className="flex justify-between items-center mt-2">
            <h3 className="text-gray-500 text-xs uppercase font-bold tracking-widest">Trending on /base</h3>
            <button onClick={fetchCasts} className="text-blue-500 hover:text-blue-400"><RefreshCw size={14}/></button>
        </div>

        {loading ? (
            // Hiệu ứng đang tải
            <div className="space-y-4 animate-pulse">
                {[1,2,3].map(i => (
                    <div key={i} className="h-32 bg-gray-900 rounded-xl"></div>
                ))}
            </div>
        ) : (
            <div className="space-y-4">
                {casts.map((cast: any) => (
                    <div key={cast.hash} className="bg-gray-900 border border-gray-800 p-4 rounded-xl hover:border-blue-500/30 transition-all">
                        {/* Thông tin tác giả */}
                        <div className="flex items-center gap-2 mb-3">
                            <img src={cast.author.pfp_url} alt="pfp" className="w-8 h-8 rounded-full border border-gray-700 object-cover"/>
                            <div>
                                <p className="text-xs font-bold text-white">{cast.author.display_name}</p>
                                <p className="text-[10px] text-gray-500">@{cast.author.username}</p>
                            </div>
                        </div>
                        
                        {/* Nội dung bài đăng */}
                        <p className="text-sm text-gray-300 mb-3 line-clamp-4 leading-relaxed">
                            {cast.text}
                        </p>

                        {/* Nút Mint */}
                        <button 
                            onClick={handleMint}
                            className="w-full bg-white text-black font-bold py-2.5 rounded-lg text-sm hover:bg-gray-200 active:scale-95 transition-all flex justify-center items-center gap-2"
                        >
                            <Zap size={16} className="fill-black"/> Mint this Cast
                        </button>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}