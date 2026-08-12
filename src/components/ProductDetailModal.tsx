import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  ShoppingBag, 
  Zap, 
  Heart, 
  ChevronRight, 
  MessageSquare, 
  CreditCard,
  Share2,
  Tag,
  Copy,
  Check
} from 'lucide-react';
import { Product, ProductColor, ProductStorageOption, ProductReview } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, storage: ProductStorageOption, qty: number) => void;
  onBuyNow: (product: Product, color: ProductColor, storage: ProductStorageOption, qty: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddReview: (productId: string, review: Omit<ProductReview, 'id' | 'date'>) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  onAddReview
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.images[0] || '');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Standard', hex: '#000000' });
  const [selectedStorage, setSelectedStorage] = useState<ProductStorageOption>(product.storageOptions[0] || { label: 'Standard', priceAdjustment: 0 });
  const [quantity, setQuantity] = useState(1);

  // Review Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Price Calculation with Storage Option Adjustment
  const basePrice = product.discountPrice || product.price;
  const finalPrice = basePrice + (selectedStorage.priceAdjustment || 0);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    onAddReview(product.id, {
      customerName: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      verifiedPurchase: true
    });
    setReviewName('');
    setReviewComment('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-neutral-400 hover:text-white hover:bg-amber-500 hover:text-black transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          
          {/* Image Gallery Column */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Image Frame */}
            <div className="relative aspect-square rounded-2xl bg-black border border-neutral-800 overflow-hidden group">
              <img
                src={selectedImage || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-amber-500/40 text-amber-300 font-bold text-xs uppercase">
                {product.brand}
              </span>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img
                        ? 'border-amber-500 shadow-md scale-105'
                        : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Perks */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{product.warrantyInfo}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{product.deliveryInfo}</span>
              </div>
            </div>
          </div>

          {/* Details & Specs Column */}
          <div className="lg:col-span-6 space-y-5">
            
            <div>
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                <span>{product.category.toUpperCase()} • {product.brand}</span>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="flex items-center gap-1 text-neutral-400 hover:text-amber-400"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-amber-400 text-amber-400' : ''}`} />
                  <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-neutral-100 leading-snug">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mt-2 text-sm">
                <div className="flex items-center text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 mr-1" />
                  {product.rating}
                </div>
                <span className="text-neutral-500">•</span>
                <span className="text-neutral-400">{product.reviewsCount} customer reviews</span>
                <span className="text-neutral-500">•</span>
                <span className={product.inStock ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                  {product.inStock ? 'In Stock in Hossana' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-amber-400">
                  {finalPrice.toLocaleString()} ETB
                </span>
                {product.discountPrice && (
                  <span className="text-sm text-neutral-500 line-through">
                    {(product.price + (selectedStorage.priceAdjustment || 0)).toLocaleString()} ETB
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                Local ETB Price
              </span>
            </div>

            {/* Color Swatch Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-300">
                  Select Color: <span className="text-amber-400">{selectedColor.name}</span>
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {product.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        selectedColor.name === c.name
                          ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-neutral-600" style={{ backgroundColor: c.hex }} />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage / RAM Selection */}
            {product.storageOptions && product.storageOptions.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-300">
                  Select Storage & RAM:
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {product.storageOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedStorage(opt)}
                      className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                        selectedStorage.label === opt.label
                          ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      {opt.label}
                      {opt.priceAdjustment > 0 && ` (+${opt.priceAdjustment.toLocaleString()} ETB)`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 py-1">
              <span className="text-xs font-bold text-neutral-300">Quantity:</span>
              <div className="flex items-center border border-neutral-800 rounded-xl bg-neutral-950 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-extrabold text-amber-400">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => onAddToCart(product, selectedColor, selectedStorage, quantity)}
                className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-neutral-700 hover:border-amber-500/50 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>

              <button
                onClick={() => onBuyNow(product, selectedColor, selectedStorage, quantity)}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
              >
                <Zap className="w-4 h-4" />
                Buy Now
              </button>
            </div>

          </div>

        </div>

        {/* Full Specifications Section */}
        <div className="p-4 sm:p-6 md:p-8 bg-neutral-950/80 border-t border-neutral-800 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {Object.entries(product.specs).map(([key, val]) => (
                val ? (
                  <div key={key} className="p-3 rounded-xl bg-neutral-900 border border-neutral-800/80 flex flex-col justify-between">
                    <span className="text-neutral-500 uppercase text-[10px] tracking-wider font-semibold">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-neutral-200 font-medium mt-1">{val}</span>
                  </div>
                ) : null
              ))}
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="pt-4 border-t border-neutral-800/60">
            <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Customer Reviews ({product.reviews.length})
            </h3>

            {/* Add Review Form */}
            <form onSubmit={handleReviewSubmit} className="mb-6 p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="text-xs font-bold text-neutral-300">Write a Customer Review</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name (e.g., Abebe, Hossana)"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  required
                  className="px-3 py-2 bg-neutral-950 text-xs text-white rounded-lg border border-neutral-800 focus:border-amber-500 focus:outline-none"
                />

                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className={`w-4 h-4 cursor-pointer ${
                          star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-neutral-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <textarea
                placeholder="Share your experience with this phone or accessory..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                required
                rows={2}
                className="w-full px-3 py-2 bg-neutral-950 text-xs text-white rounded-lg border border-neutral-800 focus:border-amber-500 focus:outline-none"
              />

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-colors"
                >
                  Submit Review
                </button>
                {reviewSuccess && (
                  <span className="text-xs text-emerald-400 font-semibold">Thank you! Your review has been published.</span>
                )}
              </div>
            </form>

            {/* Existing Reviews List */}
            <div className="space-y-3">
              {product.reviews.length === 0 ? (
                <p className="text-xs text-neutral-500 italic">No reviews yet. Be the first customer in Hossana to review!</p>
              ) : (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-200">{rev.customerName}</span>
                        {rev.verifiedPurchase && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-neutral-500 text-[10px]">{rev.date}</span>
                    </div>

                    <div className="flex items-center text-amber-400 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400' : 'text-neutral-700'}`}
                        />
                      ))}
                    </div>

                    <p className="text-neutral-300 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
