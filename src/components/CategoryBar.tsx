import React from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, Tag, Sparkles } from 'lucide-react';
import { CategoryType, SmartphoneBrand } from '../types';

interface CategoryBarProps {
  selectedCategory: CategoryType | 'all' | 'offers';
  onSelectCategory: (cat: CategoryType | 'all' | 'offers') => void;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  priceRange: number; // max ETB
  onPriceChange: (val: number) => void;
  sortBy: 'featured' | 'price_low' | 'price_high' | 'rating' | 'newest';
  onSortChange: (sort: 'featured' | 'price_low' | 'price_high' | 'rating' | 'newest') => void;
  inStockOnly: boolean;
  onInStockToggle: (val: boolean) => void;
  totalResultsCount: number;
}

const BRANDS: (SmartphoneBrand | 'All Brands')[] = [
  'All Brands',
  'Apple',
  'Samsung',
  'Xiaomi',
  'Tecno',
  'Infinix',
  'Oppo',
  'Vivo',
  'Realme',
  'Nokia'
];

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  inStockOnly,
  onInStockToggle,
  totalResultsCount
}) => {
  return (
    <div className="bg-neutral-900/90 border-b border-neutral-800 text-white py-4 px-4 sticky top-[108px] z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto space-y-3">
        
        {/* Brand Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <span className="text-xs font-semibold text-neutral-400 shrink-0 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            Brand:
          </span>
          {BRANDS.map((brand) => (
            <button
              key={brand}
              onClick={() => onSelectBrand(brand === 'All Brands' ? 'all' : brand)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                (selectedBrand === 'all' && brand === 'All Brands') || selectedBrand === brand
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-neutral-200 hover:border-neutral-700'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-800/60 text-xs">
          
          <div className="flex items-center gap-2 text-neutral-300 font-medium">
            <span className="text-amber-400 font-bold">{totalResultsCount}</span> Products Found
          </div>

          <div className="flex flex-wrap items-center gap-4">
            
            {/* Price Filter Slider */}
            <div className="flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800">
              <span className="text-neutral-400">Max Price:</span>
              <span className="font-bold text-amber-400">{priceRange.toLocaleString()} ETB</span>
              <input
                type="range"
                min="1000"
                max="150000"
                step="2000"
                value={priceRange}
                onChange={(e) => onPriceChange(Number(e.target.value))}
                className="w-24 accent-amber-500 cursor-pointer"
              />
            </div>

            {/* In Stock Only Checkbox */}
            <label className="flex items-center gap-1.5 cursor-pointer select-none bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800 text-neutral-300 hover:text-white">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => onInStockToggle(e.target.checked)}
                className="accent-amber-500 rounded cursor-pointer"
              />
              In Stock Only
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-neutral-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as any)}
                className="bg-transparent text-amber-300 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-neutral-900 text-white">Featured</option>
                <option value="price_low" className="bg-neutral-900 text-white">Price: Low to High</option>
                <option value="price_high" className="bg-neutral-900 text-white">Price: High to Low</option>
                <option value="rating" className="bg-neutral-900 text-white">Highest Rated</option>
                <option value="newest" className="bg-neutral-900 text-white">New Arrivals</option>
              </select>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
