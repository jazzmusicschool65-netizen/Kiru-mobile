import React, { useState } from 'react';
import { ShoppingCart, Bot, ShieldCheck, Truck, CreditCard, Sparkles, PhoneCall, Tag, Copy, Check } from 'lucide-react';
import { PromoBanner } from '../types';

interface HeroProps {
  onShopNow: () => void;
  onOpenAIChat: () => void;
  promoBanner?: PromoBanner;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, onOpenAIChat, promoBanner }) => {
  const [copiedBannerCoupon, setCopiedBannerCoupon] = useState(false);

  // Fallback defaults if promoBanner not supplied
  const badgeText = promoBanner?.badgeText || 'Official Electronics Marketplace in Hossana, Ethiopia';
  const title = promoBanner?.title || 'Your Trusted';
  const highlightText = promoBanner?.highlightText || 'Mobile & Electronics';
  const subtitle = promoBanner?.subtitle || 'Buy 100% original smartphones, accessories, and electronics online with fast city delivery, local ETB prices, and 1-Year Local Warranty in Hossana.';
  const bannerImageUrl = promoBanner?.bannerImageUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80';
  const discountBadgeText = promoBanner?.discountBadgeText || 'PROMO OFFER';
  const ctaText = promoBanner?.ctaText || 'Shop Now';
  const couponCode = promoBanner?.couponCode || 'KIRU-HERO2026';

  const handleCopyBannerCoupon = () => {
    navigator.clipboard.writeText(couponCode);
    setCopiedBannerCoupon(true);
    setTimeout(() => setCopiedBannerCoupon(false), 2000);
  };

  if (promoBanner && !promoBanner.active) {
    // If explicitly toggled off by admin
    return null;
  }

  return (
    <div className="relative overflow-hidden bg-neutral-950 text-white border-b border-amber-500/20">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{badgeText}</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-neutral-100 leading-tight">
              {title} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                {highlightText}
              </span>
            </h1>

            <p className="text-sm md:text-base text-neutral-300 max-w-2xl leading-relaxed">
              {subtitle}
            </p>



            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-extrabold text-sm hover:from-amber-400 hover:to-amber-300 transition-all shadow-xl shadow-amber-500/20 active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                {ctaText}
              </button>

              <button
                onClick={onOpenAIChat}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-neutral-900 border border-amber-500/40 text-amber-300 font-bold text-sm hover:bg-neutral-800 hover:border-amber-400 transition-all shadow-lg active:scale-95"
              >
                <Bot className="w-4 h-4 text-amber-400" />
                Ask Kiru AI Specialist
              </button>

              <a
                href="https://t.me/kirumobile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl text-neutral-400 hover:text-white text-xs font-semibold transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                Telegram Support
              </a>
            </div>

            {/* Guarantees Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-neutral-800/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-200">100% Original</div>
                  <div className="text-[10px] text-neutral-400">Authentic Tech</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-200">Fast Delivery</div>
                  <div className="text-[10px] text-neutral-400">Hossana 1-2 Hrs</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-200">Telebirr & CBE</div>
                  <div className="text-[10px] text-neutral-400">Local Payments</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-200">1-Year Warranty</div>
                  <div className="text-[10px] text-neutral-400">Hossana Hub</div>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Image Banner Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-500/10 group">
              <img 
                src={bannerImageUrl} 
                alt="Kiru Mobile Promotion Banner" 
                className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-amber-500/30 text-white flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-300">{discountBadgeText}</div>
                  <div className="text-[10px] text-neutral-400">Official Warranty • Same Day Delivery</div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-black font-extrabold text-[10px] uppercase tracking-wider">
                  Active
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
