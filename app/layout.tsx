// wagmi.config.ts hoặc trong layout
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';
import { base, zora } from 'wagmi/chains';

const connectors = [
  farcasterMiniApp(), // ← tự động connect nếu mở từ Warpcast
  // các connector khác nếu cần
];