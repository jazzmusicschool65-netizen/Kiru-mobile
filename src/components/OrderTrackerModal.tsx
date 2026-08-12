import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, PackageCheck, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { Order, OrderStatusType } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  orders
}) => {
  const [searchKey, setSearchKey] = useState('');
  const [foundOrders, setFoundOrders] = useState<Order[] | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchKey.trim().toLowerCase();
    if (!query) return;

    const matches = orders.filter(
      o => o.id.toLowerCase().includes(query) || 
           o.trackingNumber.toLowerCase().includes(query) ||
           o.deliveryDetails.phoneNumber.toLowerCase().includes(query)
    );
    setFoundOrders(matches);
  };

  const getStepStatus = (orderStatus: OrderStatusType, stepIndex: number) => {
    const statusMap: Record<OrderStatusType, number> = {
      'pending': 1,
      'placed': 1,
      'approved': 2,
      'preparing': 2,
      'delivering': 3,
      'delivered': 4,
      'cancelled': 0
    };
    const currentStep = statusMap[orderStatus] || 1;
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto text-white">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div>
            <h2 className="text-lg font-extrabold text-neutral-100 flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-400" />
              Live Order & Delivery Tracker
            </h2>
            <p className="text-xs text-neutral-400">Track your smartphones and electronics delivery in Hossana</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white hover:bg-amber-500 hover:text-black transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          
          {/* Lookup Input Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. KM-89231) or Phone (+251 9...)"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-neutral-950 text-xs text-white rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-black font-extrabold text-xs hover:bg-amber-400 transition-colors shadow-md"
            >
              Track Order
            </button>
          </form>

          {/* Search Results Display */}
          {foundOrders !== null && (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {foundOrders.length === 0 ? (
                <div className="text-center py-8 text-neutral-400 text-xs">
                  No active orders found for "<strong>{searchKey}</strong>". Please verify your Order ID or phone number.
                </div>
              ) : (
                foundOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-neutral-950 border border-amber-500/30 space-y-4 text-xs"
                  >
                    {/* Order Meta Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                      <div>
                        <div className="font-extrabold text-amber-400 text-sm">Order {order.id}</div>
                        <div className="text-[10px] text-neutral-400">Placed on {new Date(order.createdAt).toLocaleDateString()}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300 font-bold uppercase tracking-wider text-[10px]">
                          {order.status}
                        </span>
                        <span className="font-extrabold text-white text-sm">
                          {order.totalAmount.toLocaleString()} ETB
                        </span>
                      </div>
                    </div>

                    {/* Step Tracker Visual */}
                    <div className="py-2">
                      <div className="grid grid-cols-4 gap-2 text-center">
                        
                        {/* Step 1: Placed */}
                        <div className="flex flex-col items-center gap-1.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border ${
                            getStepStatus(order.status, 1) === 'completed' || getStepStatus(order.status, 1) === 'current'
                              ? 'bg-amber-500 text-black border-amber-400'
                              : 'bg-neutral-900 text-neutral-600 border-neutral-800'
                          }`}>
                            1
                          </div>
                          <span className="text-[10px] font-semibold text-neutral-300">Order Placed</span>
                        </div>

                        {/* Step 2: Confirmed / Preparing */}
                        <div className="flex flex-col items-center gap-1.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border ${
                            getStepStatus(order.status, 2) === 'completed' || getStepStatus(order.status, 2) === 'current'
                              ? 'bg-amber-500 text-black border-amber-400'
                              : 'bg-neutral-900 text-neutral-600 border-neutral-800'
                          }`}>
                            2
                          </div>
                          <span className="text-[10px] font-semibold text-neutral-300">Hub Verified</span>
                        </div>

                        {/* Step 3: Out for Delivery */}
                        <div className="flex flex-col items-center gap-1.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border ${
                            getStepStatus(order.status, 3) === 'completed' || getStepStatus(order.status, 3) === 'current'
                              ? 'bg-amber-500 text-black border-amber-400'
                              : 'bg-neutral-900 text-neutral-600 border-neutral-800'
                          }`}>
                            3
                          </div>
                          <span className="text-[10px] font-semibold text-neutral-300">On Delivery</span>
                        </div>

                        {/* Step 4: Delivered */}
                        <div className="flex flex-col items-center gap-1.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border ${
                            getStepStatus(order.status, 4) === 'completed' || getStepStatus(order.status, 4) === 'current'
                              ? 'bg-emerald-500 text-black border-emerald-400'
                              : 'bg-neutral-900 text-neutral-600 border-neutral-800'
                          }`}>
                            4
                          </div>
                          <span className="text-[10px] font-semibold text-neutral-300">Delivered</span>
                        </div>

                      </div>
                    </div>

                    {/* Delivery Destination & Phone */}
                    <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] space-y-1">
                      <div className="flex items-center gap-1.5 text-neutral-300">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>Address: <strong className="text-white">{order.deliveryDetails.deliveryAddress}, {order.deliveryDetails.city}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-300">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Customer Contact: <strong className="text-white">{order.deliveryDetails.customerName} ({order.deliveryDetails.phoneNumber})</strong></span>
                      </div>
                    </div>

                    {/* Order Items List */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase text-neutral-500 font-bold">Items in Order:</span>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-neutral-300 text-[11px]">
                          <span>{item.quantity}x {item.product.name} ({item.selectedStorage.label})</span>
                          <span className="font-mono text-amber-300">
                            {((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString()} ETB
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
