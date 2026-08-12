import React from 'react';
import { 
  PhoneCall, 
  MapPin, 
  Send, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  Smartphone,
  CheckCircle2,
  Lock,
  Headphones
} from 'lucide-react';
import { CategoryType, StoreSettings } from '../types';

interface FooterProps {
  onSelectCategory: (cat: CategoryType | 'all' | 'offers') => void;
  onOpenOrderTracker: () => void;
  onOpenAIChat: () => void;
  storeSettings?: StoreSettings;
  userEmail?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenOrderTracker,
  onOpenAIChat,
  storeSettings,
  userEmail
}) => {
  const socialItems = storeSettings?.socialLinksList && storeSettings.socialLinksList.length > 0
    ? storeSettings.socialLinksList.filter(s => s.active)
    : [
        { id: 'soc-1', platform: 'Telegram', url: storeSettings?.socialLinks?.telegram || 'https://t.me/kirumobile', active: true },
        { id: 'soc-2', platform: 'TikTok', url: storeSettings?.socialLinks?.tiktok || 'https://tiktok.com/@kirumobile', active: true },
        { id: 'soc-3', platform: 'Facebook', url: storeSettings?.socialLinks?.facebook || 'https://facebook.com/kirumobile', active: true },
        { id: 'soc-4', platform: 'Instagram', url: storeSettings?.socialLinks?.instagram || 'https://instagram.com/kirumobile', active: true },
        { id: 'soc-5', platform: 'YouTube', url: storeSettings?.socialLinks?.youtube || 'https://youtube.com/@kirumobile', active: true }
      ];
  return (
    <footer className="bg-neutral-950 text-white border-t border-amber-500/20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Vision & Location */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-500/40 shadow-lg">
                <img 
                  src="/src/assets/images/kiru_logo_badge_1786551187179.jpg" 
                  alt="Kiru Mobile" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                  KIRU MOBILE
                </span>
                <p className="text-[10px] text-neutral-400 tracking-widest">HOSSANA • ETHIOPIA</p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Ethiopias premier marketplace for original smartphones, accessories, and electronics. Fast local delivery in Hossana, official 1-Year warranty, and secure local payment support via Telebirr & CBE Birr.
            </p>

            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span>{storeSettings?.storeLocation || 'Main Street, Near Commercial Bank of Ethiopia, Hossana, SNNPR, Ethiopia'}</span>
                  {userEmail === 'jazzmusicschool65@gmail.com' && (
                    <div className="mt-1">
                      <a 
                        href={storeSettings?.satelliteMapUrl || 'https://maps.google.com/?q=Hossana+Ethiopia&t=k'} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold hover:bg-amber-500 hover:text-black transition-colors shadow-sm"
                      >
                        🛰️ Open Satellite Map Quicklink
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${storeSettings?.supportPhone1 || '+251911234567'}`} className="hover:text-amber-300 transition-colors">
                  {storeSettings?.supportPhone1 || '+251 911 234 567'} {storeSettings?.supportPhone2 ? `/ ${storeSettings.supportPhone2}` : ''}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="https://t.me/kirumobile" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors">Telegram: @kirumobile</a>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Shop Categories</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => onSelectCategory('smartphones')} className="hover:text-amber-300 transition-colors">
                  Smartphones (iPhone, Samsung, Tecno)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('accessories')} className="hover:text-amber-300 transition-colors">
                  Accessories & Power Banks
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('electronics')} className="hover:text-amber-300 transition-colors">
                  Laptops, Smart TVs & Gaming
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('offers')} className="hover:text-amber-300 transition-colors text-amber-400 font-semibold">
                  Hot Offers & Special Discounts
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Customer Services</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={onOpenOrderTracker} className="hover:text-amber-300 transition-colors">
                  Track Delivery Order
                </button>
              </li>
              <li>
                <button onClick={onOpenAIChat} className="hover:text-amber-300 transition-colors">
                  Kiru AI Tech Specialist (24/7)
                </button>
              </li>
              <li>
                <a href="#warranty" className="hover:text-amber-300 transition-colors">
                  1-Year Local Warranty Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Official Payment Partners */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Official Channels</h4>
            <p className="text-[11px] text-neutral-400">Follow Kiru Mobile for new phone arrivals & unboxing videos:</p>
            
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-semibold">
              {socialItems.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-amber-500 hover:text-amber-300 transition-colors"
                >
                  {s.platform}
                </a>
              ))}
            </div>

            {/* Payment Acceptance Badges */}
            <div className="pt-2">
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold mb-1.5">Accepted Payments:</div>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-amber-300">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">Telebirr #554890</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">CBE Birr</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">Bank Transfer</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">Cash on Delivery</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} <strong>Kiru Mobile Electronics E-Commerce Store</strong>. Hossana, Ethiopia. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-amber-400/90">
            <span>Developer:</span>
            <a 
              href="https://smartsolution.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-300 font-bold hover:underline hover:text-amber-200 transition-colors"
            >
              Esuyikber Tadele • smartsolution.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
