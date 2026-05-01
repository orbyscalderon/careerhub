'use client';

import { Megaphone } from 'lucide-react';
import { ADSENSE_CLIENT_ID } from '@/lib/helpers';

interface AdSlotProps {
  position: 'list' | 'sidebar' | 'footer';
  size?: 'leaderboard' | 'rectangle' | 'banner';
}

const sizeClasses: Record<string, string> = {
  leaderboard: 'w-full h-[90px] md:h-[90px]',
  rectangle: 'w-full h-[250px]',
  banner: 'w-full h-[60px]',
};

export default function AdSlot({ position, size = 'rectangle' }: AdSlotProps) {
  const sizeKey = position === 'footer' ? 'leaderboard' : position === 'sidebar' ? 'rectangle' : size;

  // If AdSense client ID is configured, render the real ad slot
  if (ADSENSE_CLIENT_ID) {
    return (
      <div className={sizeClasses[sizeKey]}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot=""
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Placeholder when AdSense is not configured
  return (
    <div className="relative overflow-hidden rounded-lg border border-dashed border-muted-foreground/20 bg-muted/30">
      <div className={`flex flex-col items-center justify-center gap-2 ${sizeClasses[sizeKey]}`}>
        <Megaphone className="h-5 w-5 text-muted-foreground/40" />
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/50">
          Advertisement
        </span>
      </div>
    </div>
  );
}
