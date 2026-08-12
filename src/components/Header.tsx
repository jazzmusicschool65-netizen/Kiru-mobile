import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Bot, 
  Truck, 
  PhoneCall, 
  ShieldCheck, 
  SlidersHorizontal,
  LayoutDashboard,
  X,
  Smartphone,
  Headphones,
  Laptop,
  Percent,
  User
} from 'lucide-react';
import { Product, CategoryType, CustomerProfile } from '../types';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAIChat: () => void;
  onOpenOrderTracker: () => void;
  onOpenProfile: () => void;
  customerProfile: CustomerProfile;
  selectedCategory: CategoryType | 'all' | 'offers';
  onSelectCategory: (cat: CategoryType | 'all' | 'offers') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAIChat,
  onOpenOrderTracker,
  onOpenProfile,
  customerProfile,
  onSelectCategory
}) => {
  return (
    <header className="w-full bg-black/95 border-b border-amber-500/20 text-white shadow-xl relative z-40">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-neutral-900 via-amber-950/80 to-neutral-900 text-amber-200/90 text-xs py-1.5 px-4 border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 font-medium text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              100% Original Tech in Hossana, Ethiopia
            </span>
            <span className="hidden md:inline-block text-neutral-500">•</span>
            <span className="hidden md:flex items-center gap-1 text-neutral-300">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              Express City Delivery in 1-2 Hours
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenOrderTracker}
              className="hover:text-amber-300 flex items-center gap-1 transition-colors text-xs text-amber-200 cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5" />
              Track Order
            </button>
            <span className="text-neutral-600">|</span>
            <a 
              href="tel:+251911234567" 
              className="flex items-center gap-1 text-amber-400 font-semibold hover:text-amber-300 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              +251 911 234 567
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Header Container */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => onSelectCategory('all')}>
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-amber-500/40 shadow-lg shadow-amber-500/10 group">
              <img 
                src="/src/assets/images/kiru_logo_badge_1786551187179.jpg" 
                alt="Kiru Mobile" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                  KIRU
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  MOBILE
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 tracking-wider">HOSSANA • ETHIOPIA</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Assistant Toggle */}
            <button
              onClick={onOpenAIChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border border-amber-500/40 text-amber-300 hover:text-amber-200 hover:border-amber-400 transition-all text-xs font-semibold shadow-lg shadow-amber-500/5 group cursor-pointer"
              title="Kiru AI Tech Specialist"
            >
              <Bot className="w-4 h-4 text-amber-400 animate-pulse group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">Ask AI Specialist</span>
            </button>

            {/* User Profile & Shopping History */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-400 hover:border-amber-500/40 transition-all text-xs cursor-pointer"
              title="Customer Profile & Shopping History"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden border border-amber-500/50 shrink-0">
                <img src={customerProfile.avatarUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <span className="hidden sm:inline font-bold text-amber-300">{customerProfile.fullName.split(' ')[0] || 'Profile'}</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-400 hover:border-amber-500/40 transition-all cursor-pointer"
              title="Saved Favorites"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xs hover:from-amber-400 hover:to-amber-500 transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <div className="hidden lg:flex flex-col items-start leading-tight">
                <span className="text-[10px] uppercase opacity-80">Cart</span>
                <span className="text-xs">{cartTotal.toLocaleString()} ETB</span>
              </div>
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-black text-amber-400 text-[10px] font-bold rounded-full flex items-center justify-center border border-amber-400">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};

export const SearchAndNav: React.FC<{
  selectedCategory: CategoryType | 'all' | 'offers';
  onSelectCategory: (cat: CategoryType | 'all' | 'offers') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  products,
  onSelectProduct
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchResults = searchQuery.trim() 
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div className="sticky top-0 z-30 w-full bg-black/95 backdrop-blur-md border-y border-amber-500/30 py-3 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Navigation Categories Tabs */}
        <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto text-xs font-medium">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-black font-extrabold shadow-md shadow-amber-500/20'
                : 'text-neutral-300 hover:text-amber-300 hover:bg-neutral-900 border border-neutral-800'
            }`}
          >
            All Products
          </button>

          <button
            onClick={() => onSelectCategory('smartphones')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'smartphones'
                ? 'bg-amber-500 text-black font-extrabold shadow-md shadow-amber-500/20'
                : 'text-neutral-300 hover:text-amber-300 hover:bg-neutral-900 border border-neutral-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Smartphones
          </button>

          <button
            onClick={() => onSelectCategory('accessories')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'accessories'
                ? 'bg-amber-500 text-black font-extrabold shadow-md shadow-amber-500/20'
                : 'text-neutral-300 hover:text-amber-300 hover:bg-neutral-900 border border-neutral-800'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            Accessories
          </button>

          <button
            onClick={() => onSelectCategory('electronics')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'electronics'
                ? 'bg-amber-500 text-black font-extrabold shadow-md shadow-amber-500/20'
                : 'text-neutral-300 hover:text-amber-300 hover:bg-neutral-900 border border-neutral-800'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            Electronics & Laptops
          </button>

          <button
            onClick={() => onSelectCategory('offers')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'offers'
                ? 'bg-gradient-to-r from-red-500 to-amber-500 text-white font-extrabold shadow-md'
                : 'text-amber-400 hover:bg-amber-500/10 border border-amber-500/30'
            }`}
          >
            <Percent className="w-3.5 h-3.5 text-amber-300" />
            Special Deals
          </button>
        </nav>

        {/* Search Bar with Autocomplete */}
        <div className="relative w-full md:w-80 lg:w-96">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
            <input
              type="text"
              placeholder="Search iPhone, Tecno, Samsung, Power Bank..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full pl-10 pr-9 py-2 bg-neutral-900 text-xs md:text-sm text-neutral-100 placeholder-neutral-500 rounded-xl border border-amber-500/30 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-amber-500/40 rounded-xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
              <div className="p-2.5 text-xs font-extrabold text-amber-400 border-b border-neutral-800 flex justify-between items-center">
                <span>Matching Products ({searchResults.length})</span>
                <span className="text-[10px] text-neutral-500">Click to view detail</span>
              </div>
              <div className="divide-y divide-neutral-800">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onSearchChange('');
                    }}
                    className="flex items-center gap-3 p-2.5 hover:bg-amber-500/10 cursor-pointer transition-colors"
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-10 h-10 object-cover rounded-lg bg-black border border-neutral-800 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-neutral-200 truncate">{product.name}</div>
                      <div className="text-xs text-amber-400 font-extrabold">
                        {(product.discountPrice || product.price).toLocaleString()} ETB
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-amber-300 font-semibold shrink-0">
                      {product.brand}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
