"use client";

import React, { useState } from 'react';
import { Rocket, Zap, Settings, Activity, CheckCircle2, RefreshCw } from 'lucide-react';

// --- MOCK DATA (ENGLISH VERSION) ---
const RECENT_CASTS = [
  { id: 'cast_1', text: "Just found this gem on Base, you guys should check it out! 🚀 #BaseBuild", timestamp: "10m ago", likes: 45, status: 'pending' },
  { id: 'cast_2', text: "Pulling an all-nighter to finish this Mini-app. Anyone building on Frames v2?", timestamp: "2h ago", likes: 89, status: 'minted' },
  { id: 'cast_3', text: "GM Farcaster! Let's make some on-chain magic today.", timestamp: "5h ago", likes: 120, status: 'coined' }
];

export default function FlywheelApp() {
  const [casts, setCasts] = useState(RECENT_CASTS);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [balance, setBalance] = useState(0.045);
  const [notification, setNotification] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleMint = (id: string) => {
    setProcessing(id);
    showNotification("Minting NFT on Base Network...");
    
    // Simulate blockchain delay
    setTimeout(() => {
        setCasts(prev => prev.map(c => c.id === id ? { ...c, status: 'minted' } : c));
        setBalance(prev => prev + 0.000111);
        setProcessing(null);
        showNotification("✅ Minted Successfully! +0.000111 ETH Reward");
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans max-w-md mx-auto border-x border-gray-800 relative">
      
      {/* HEADER */}
      <div className="p-4 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg"><Rocket size={20} /></div>
          <div>
            <h1 className="font-bold">Flywheel Bot</h1>
            <span className="text-xs text-green-400 flex items-center gap-1">● Online</span>
          </div>
        </div>
        <div className="text-right">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Balance</div>
            <div className="font-mono text-green-400 font-bold">{balance.toFixed(6)} ETH</div>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-6">
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                <div className="text-gray-400 text-xs flex gap-1 mb-1"><Activity size={12}/> 24h Volume</div>
                <div className="text-2xl font-bold">1.2 ETH</div>
            </div>
            <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                 <div className="text-gray-400 text-xs flex gap-1 mb-1"><Zap size={12}/> Auto-Actions</div>
                 <div className="text-2xl font-bold">142</div>
            </div>
        </div>

        {/* Auto Mode Toggle */}
        <div className={`p-4 rounded-xl border flex justify-between items-center transition-all duration-300 ${isAutoMode ? 'bg-green-900/20 border-green-500/50' : 'bg-gray-900 border-gray-800'}`}>
            <div>
                <h3 className="font-bold flex items-center gap-2">
                    Auto-Flywheel <Zap size={16} className={isAutoMode ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}/>
                </h3>
                <p className="text-xs text-gray-400 mt-1">Auto Mint & Launch Coin on new casts</p>
            </div>
            <button onClick={() => setIsAutoMode(!isAutoMode)} className={`w-12 h-6 rounded-full relative transition-colors ${isAutoMode ? 'bg-green-500' : 'bg-gray-600'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isAutoMode ? 'left-7' : 'left-1'}`}></div>
            </button>
        </div>

        {/* Recent Casts List */}
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-gray-500 text-xs uppercase font-bold tracking-widest">Recent Casts</h3>
                <RefreshCw size={12} className="text-gray-500"/>
            </div>
            <div className="space-y-3">
                {casts.map((cast) => (
                    <div key={cast.id} className="bg-gray-900 border border-gray-800 p-4 rounded-xl hover:border-blue-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                             <span className="text-xs text-gray-500">{cast.timestamp}</span>
                             <div className="flex gap-2 text-xs text-gray-500">
                                <span>❤️ {cast.likes}</span>
                             </div>
                        </div>
                        <p className="text-sm mb-4 leading-relaxed text-gray-300">{cast.text}</p>
                        
                        {cast.status === 'pending' ? (
                            <button 
                                onClick={() => handleMint(cast.id)} 
                                disabled={!!processing}
                                className="w-full bg-white text-black font-bold py-2.5 rounded-lg text-sm hover:bg-gray-200 disabled:opacity-50 transition-all flex justify-center items-center gap-2"
                            >
                                {processing === cast.id ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"/> : <Rocket size={16}/>}
                                {processing === cast.id ? "Processing..." : "Mint as NFT"}
                            </button>
                        ) : (
                            <div className="w-full bg-green-900/20 text-green-400 border border-green-500/20 py-2 rounded-lg text-xs font-bold text-center flex justify-center items-center gap-1">
                                <CheckCircle2 size={14}/> {cast.status === 'minted' ? 'Minted on Zora' : 'Coin Launched'}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* NOTIFICATION TOAST */}
      {notification && (
        <div className="absolute top-24 left-4 right-4 bg-gray-800/90 border border-gray-700 p-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-top-2 z-50">
            <div className="bg-green-500/20 p-2 rounded-full"><CheckCircle2 className="text-green-500" size={18} /></div>
            <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black border-t border-gray-800 flex justify-around items-center z-40">
        <button className="text-blue-500 flex flex-col items-center gap-1">
            <Activity size={20}/>
            <span className="text-[10px] font-bold">Dashboard</span>
        </button>
        <button className="text-gray-600 flex flex-col items-center gap-1 hover:text-gray-400">
            <Settings size={20}/>
            <span className="text-[10px] font-bold">Config</span>
        </button>
      </div>
    </div>
  );
}