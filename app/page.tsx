"use client";

import React, { useState } from 'react';
import { Rocket, Zap, Settings, Activity, CheckCircle2, AlertCircle, DollarSign } from 'lucide-react';

// --- DỮ LIỆU GIẢ LẬP ---
const RECENT_CASTS = [
  { id: 'cast_1', text: "Mới tìm ra gem này trên Base, anh em check thử xem sao! 🚀 #BaseBuild", timestamp: "10 phút trước", likes: 45, status: 'pending' },
  { id: 'cast_2', text: "Cuối tuần này code xuyên đêm để xong cái Mini-app. Ai join không?", timestamp: "2 giờ trước", likes: 89, status: 'minted' },
  { id: 'cast_3', text: "GM Farcaster! Chúc mọi người ngày mới nhiều năng lượng.", timestamp: "5 giờ trước", likes: 120, status: 'coined' }
];

export default function FlywheelApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [casts, setCasts] = useState(RECENT_CASTS);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [balance, setBalance] = useState(0.045);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleMint = (id: string) => {
    showNotification("Đang mint NFT trên Base...");
    setTimeout(() => {
        setCasts(prev => prev.map(c => c.id === id ? { ...c, status: 'minted' } : c));
        setBalance(prev => prev + 0.000111);
        showNotification("✅ Mint thành công! +0.000111 ETH");
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans max-w-md mx-auto border-x border-gray-800 relative">
      {/* HEADER */}
      <div className="p-4 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg"><Rocket size={20} /></div>
          <div><h1 className="font-bold">Flywheel Bot</h1><span className="text-xs text-green-400">Online</span></div>
        </div>
        <div className="text-right"><div className="text-xs text-gray-400">Balance</div><div className="font-mono text-green-400 font-bold">{balance.toFixed(6)} ETH</div></div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                <div className="text-gray-400 text-xs flex gap-1"><Activity size={12}/> Volume 24h</div>
                <div className="text-xl font-bold">1.2 ETH</div>
            </div>
            <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                 <div className="text-gray-400 text-xs flex gap-1"><Zap size={12}/> Auto-Actions</div>
                 <div className="text-xl font-bold">142</div>
            </div>
        </div>

        {/* Auto Toggle */}
        <div className={`p-4 rounded-xl border flex justify-between items-center ${isAutoMode ? 'bg-green-900/20 border-green-500/50' : 'bg-gray-900 border-gray-800'}`}>
            <div>
                <h3 className="font-bold">Auto-Flywheel</h3>
                <p className="text-xs text-gray-400">Tự động Mint & Launch Coin</p>
            </div>
            <button onClick={() => setIsAutoMode(!isAutoMode)} className={`w-10 h-6 rounded-full relative transition-colors ${isAutoMode ? 'bg-green-500' : 'bg-gray-600'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isAutoMode ? 'left-5' : 'left-1'}`}></div>
            </button>
        </div>

        {/* List Casts */}
        <div>
            <h3 className="text-gray-400 text-xs uppercase font-bold mb-3">Cast Gần Đây</h3>
            <div className="space-y-3">
                {casts.map((cast) => (
                    <div key={cast.id} className="bg-gray-900 border border-gray-800 p-3 rounded-xl">
                        <p className="text-sm mb-3 line-clamp-2">{cast.text}</p>
                        {cast.status === 'pending' ? (
                            <button onClick={() => handleMint(cast.id)} className="w-full bg-white text-black font-bold py-2 rounded-lg text-xs hover:bg-gray-200">Mint NFT</button>
                        ) : (
                            <div className="w-full bg-green-900/30 text-green-400 border border-green-500/30 py-2 rounded-lg text-xs font-bold text-center flex justify-center gap-1"><CheckCircle2 size={14}/> Đã xử lý</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* NOTIFICATION */}
      {notification && (
        <div className="absolute top-20 left-4 right-4 bg-gray-800 border border-gray-700 p-3 rounded-xl shadow-xl flex items-center gap-3 animate-bounce">
            <AlertCircle className="text-blue-400" /> <span className="text-sm">{notification}</span>
        </div>
      )}

      {/* FOOTER NAV */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black border-t border-gray-800 flex justify-around items-center">
        <button className="text-blue-500 flex flex-col items-center"><Activity size={20}/><span className="text-[10px]">Home</span></button>
        <button className="text-gray-600 flex flex-col items-center"><Settings size={20}/><span className="text-[10px]">Settings</span></button>
      </div>
    </div>
  );
}