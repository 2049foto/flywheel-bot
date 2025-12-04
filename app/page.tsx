"use client";

import React, { useState, useEffect } from 'react';
// Import thư viện ví thật (Đã bật sẵn)
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract } from 'wagmi';
import { Rocket, Zap, RefreshCw, AlertCircle } from 'lucide-react';

export default function FlywheelApp() {
  // Hook của Wagmi để kiểm tra trạng thái ví thật
  const { isConnected } = useAccount();
  const [casts, setCasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Hàm gọi API lấy dữ liệu thật từ Farcaster
  const fetchCasts = async () => {
    setLoading(true);
    try {
      // Thêm tham số time để tránh cache trình duyệt
      const res = await fetch(`/api/casts?t=${new Date().getTime()}`);
      const data = await res.json();
      if (data.casts) setCasts(data.casts);
    } catch (e) {
      console.error("Lỗi lấy dữ liệu:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("App đang chạy phiên bản Web3 Real Wallet");
    fetchCasts();
  }, []);

  // 2. Hàm xử lý Mint (Chờ tích hợp Contract thật)
  const handleMint = () => {
    if (!isConnected) return alert("Please Connect Wallet First! (Vui lòng kết nối ví)");
    alert("🚀 Coming Soon! (Tính năng này sẽ mở ví MetaMask của bạn để ký giao dịch)");
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans max-w-md mx-auto border-x border-gray-800 relative shadow-2xl">
      
      {/* HEADER: Nút Connect Wallet nằm ở đây */}
      <div className="p-4 border-b border-gray-800 bg-gray-900/80 flex justify-between items-center sticky top-0 z-20 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
            <Rocket size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">Flywheel</h1>
            <span className="text-[10px] text-green-400 flex items-center gap-1 font-medium bg-green-400/10 px-1.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Live Data v2.0
            </span>
          </div>
        </div>
        
        {/* NÚT KẾT NỐI VÍ THẬT */}
        <div className="scale-90 origin-right">
            <ConnectButton showBalance={false} chainStatus="icon" accountStatus="avatar" />
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-4 no-scrollbar">
        
        {/* Cảnh báo nếu chưa nối ví */}
        {!isConnected && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="text-yellow-500" size={20} />
                <p className="text-xs text-yellow-200 font-medium">Connect wallet to start earning rewards.</p>
            </div>
        )}

        {/* Danh sách bài đăng */}
        <div className="flex justify-between items-center mt-2 px-1">
            <h3 className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">Trending on /base</h3>
            <button onClick={fetchCasts} className="text-blue-500 hover:text-blue-400 transition-colors p-1 hover:bg-blue-500/10 rounded-md">
              <RefreshCw size={14}/>
            </button>
        </div>

        {loading ? (
            <div className="space-y-4 animate-pulse">
                {[1,2,3].map(i => (
                    <div key={i} className="h-32 bg-gray-900/50 rounded-xl border border-gray-800"></div>
                ))}
            </div>
        ) : (
            <div className="space-y-4">
                {casts.map((cast: any) => (
                    <div key={cast.hash} className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl hover:border-blue-500/30 transition-all group hover:bg-gray-900/80">
                        <div className="flex items-center gap-3 mb-3">
                            <img src={cast.author.pfp_url} alt="pfp" className="w-9 h-9 rounded-full border border-gray-700 object-cover group-hover:scale-105 transition-transform"/>
                            <div>
                                <p className="text-sm font-bold text-white leading-none mb-1">{cast.author.display_name}</p>
                                <p className="text-[10px] text-gray-500 font-mono">@{cast.author.username}</p>
                            </div>
                        </div>
                        
                        <p className="text-sm text-gray-300 mb-4 line-clamp-4 leading-relaxed font-light">
                            {cast.text}
                        </p>

                        <button 
                            onClick={handleMint}
                            className="w-full bg-white hover:bg-gray-200 text-black font-bold py-2.5 rounded-lg text-sm active:scale-95 transition-all flex justify-center items-center gap-2 shadow-lg shadow-white/5"
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