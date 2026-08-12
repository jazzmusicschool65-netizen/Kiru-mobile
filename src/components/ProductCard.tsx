import React from 'react';
import { Star, Heart, ShoppingBag, Eye, ShieldCheck, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickBuy: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onCopyCoupon?: (code: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickBuy,
  onViewDetails
}) => {
  const currentPrice = product.discountPrice || product.price;
  const hasDiscount = !!product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  return (
    <div className="group relative bg-neutral-900/90 rounded-2xl border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-amber-500/10">
      
      {/* Top Media Image Header */}
      <div className="relative aspect-square bg-black overflow-hidden cursor-pointer" onClick={() => onViewDetails(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Overlay Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badges Top Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-md bg-red-600 text-white font-black text-[10px] tracking-wide uppercase shadow">
              {discountPercent}% OFF
            </span>
          )}
          {product.featured && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-black font-extrabold text-[10px] uppercase tracking-wide shadow">
              FEATURED
            </span>
          )}
          {product.bestSeller && (
            <span className="px-2 py-0.5 rounded-md bg-amber-400/90 text-black font-extrabold text-[10px] uppercase tracking-wide shadow">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Button Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? 'bg-amber-500 text-black shadow-md'
              : 'bg-black/60 text-neutral-300 hover:text-amber-400 hover:bg-black/80'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-black' : ''}`} />
        </button>

        {/* Quick View Floating Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="w-full py-2 px-3 rounded-xl bg-black/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-amber-500 hover:text-black transition-all shadow-xl"
          >
            <Eye className="w-3.5 h-3.5" />
            View Specifications
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Stock Status */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-400 mb-1">
            <span className="uppercase text-amber-400/90 tracking-wider font-bold">{product.brand}</span>
            <span className={product.inStock ? 'text-emerald-400 font-medium' : 'text-red-400 font-medium'}>
              {product.inStock ? `In Stock (${product.stockCount})` : 'Out of Stock'}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onViewDetails(product)}
            className="text-sm font-bold text-neutral-100 hover:text-amber-300 cursor-pointer line-clamp-1 transition-colors"
          >
            {product.name}
          </h3>

          {/* Color Preview Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 my-2">
              <span className="text-[10px] text-neutral-500">Colors:</span>
              <div className="flex items-center gap-1">
                {product.colors.map((c, idx) => (
                  <span
                    key={idx}
                    className="w-2.5 h-2.5 rounded-full border border-neutral-700 inline-block"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Key Spec Snippet */}
          <div className="text-[11px] text-neutral-400 line-clamp-1 my-1">
            {product.specs.screen || product.specs.processor || product.specs.ramStorage || product.description}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 my-1.5 text-xs">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="ml-1 font-bold text-amber-300">{product.rating}</span>
            </div>
            <span className="text-[10px] text-neutral-500">({product.reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Pricing & Call to Action */}
        <div className="pt-2 border-t border-neutral-800/80 space-y-2">
          
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-base font-extrabold text-amber-400">
                {currentPrice.toLocaleString()} ETB
              </div>
              {hasDiscount && (
                <div className="text-xs text-neutral-500 line-through">
                  {product.price.toLocaleString()} ETB
                </div>
              )}
            </div>

            <span className="text-[10px] text-neutral-400 flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              Warranty
            </span>
          </div>

          {/* Action Button Pair */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className="py-2 px-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-bold flex items-center justify-center gap-1 border border-neutral-700 hover:border-amber-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add Cart
            </button>

            <button
              onClick={() => onQuickBuy(product)}
              disabled={!product.inStock}
              className="py-2 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-extrabold flex items-center justify-center gap-1 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5" />
              Buy Now
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
