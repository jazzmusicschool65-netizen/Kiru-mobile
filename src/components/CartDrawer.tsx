import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { CartItem, DiscountCoupon } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  coupons: DiscountCoupon[];
  appliedCoupon: DiscountCoupon | null;
  onApplyCoupon: (coupon: DiscountCoupon | null) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  coupons,
  appliedCoupon,
  onApplyCoupon
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = (item.product.discountPrice || item.product.price) + item.selectedStorage.priceAdjustment;
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountAmount = appliedCoupon 
    ? Math.round((subtotal * appliedCoupon.percentage) / 100) 
    : 0;

  const grandTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    const found = coupons.find(c => c.code === code && c.active);
    if (!found) {
      setCouponError('Invalid coupon code. Try KIRU10 or HOSSANA500');
      return;
    }
    if (subtotal < found.minOrderETB) {
      setCouponError(`Minimum order for ${code} is ${found.minOrderETB.toLocaleString()} ETB`);
      return;
    }
    onApplyCoupon(found);
    setCouponInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-amber-500/30 text-white flex flex-col shadow-2xl">
          
          {/* Cart Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-neutral-100">Your Shopping Cart</h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white hover:bg-amber-500 hover:text-black transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
                <p className="text-neutral-400 text-sm font-medium">Your cart is currently empty.</p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-colors"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemPrice = (item.product.discountPrice || item.product.price) + item.selectedStorage.priceAdjustment;
                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 flex gap-3 items-center group hover:border-amber-500/40 transition-all"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-xl bg-black border border-neutral-800 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className="text-xs font-bold text-neutral-100 truncate">{item.product.name}</h4>
                      <div className="text-[10px] text-neutral-400 flex flex-wrap gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-amber-300">
                          {item.selectedColor.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                          {item.selectedStorage.label}
                        </span>
                      </div>
                      <div className="text-xs font-black text-amber-400">
                        {itemPrice.toLocaleString()} ETB
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center border border-neutral-800 rounded-lg bg-neutral-900 overflow-hidden text-xs font-bold">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-neutral-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 text-amber-400">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-neutral-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Coupon & Summary Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 bg-neutral-950 border-t border-neutral-800 space-y-4">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-400" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. KIRU10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-neutral-900 text-xs text-white uppercase placeholder-neutral-500 rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-bold text-xs border border-neutral-700"
                  >
                    Apply
                  </button>
                </div>

                {couponError && (
                  <p className="text-[11px] text-red-400 font-medium">{couponError}</p>
                )}

                {appliedCoupon && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
                    <span>Code <strong className="text-amber-400">{appliedCoupon.code}</strong> applied ({appliedCoupon.percentage}% OFF)</span>
                    <button
                      type="button"
                      onClick={() => onApplyCoupon(null)}
                      className="text-neutral-400 hover:text-white text-[10px] underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Subtotal & Discount Calculation */}
              <div className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">{subtotal.toLocaleString()} ETB</span>
                </div>
                
                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-400 font-semibold">
                    <span>Discount</span>
                    <span>-{discountAmount.toLocaleString()} ETB</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-black text-amber-400 pt-2 border-t border-neutral-800">
                  <span>Total (Excl. Shipping)</span>
                  <span>{grandTotal.toLocaleString()} ETB</span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 hover:from-amber-400 hover:to-amber-300 transition-all shadow-xl shadow-amber-500/20 active:scale-95"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
