import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Smartphone, 
  MapPin, 
  Phone, 
  User, 
  ShieldCheck, 
  QrCode,
  Download,
  Copy,
  Check,
  Navigation,
  Globe,
  Mail
} from 'lucide-react';
import { 
  CartItem, 
  DeliveryOptionType, 
  PaymentMethodType, 
  Order, 
  DiscountCoupon,
  StoreSettings,
  CustomerProfile
} from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedCoupon: DiscountCoupon | null;
  onOrderPlaced: (order: Order) => void;
  storeSettings?: StoreSettings;
  customerProfile?: CustomerProfile;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedCoupon,
  onOrderPlaced,
  storeSettings,
  customerProfile
}) => {
  if (!isOpen) return null;

  // Form State
  const [customerName, setCustomerName] = useState(customerProfile?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(customerProfile?.phoneNumber || '+251 9');
  const [customerGmail, setCustomerGmail] = useState(customerProfile?.email || 'jazzmusicschool65@gmail.com');
  const [city, setCity] = useState(customerProfile?.city || 'Hossana');
  const [subCityOrZone, setSubCityOrZone] = useState(customerProfile?.subCityOrZone || 'Central Hossana');
  const [deliveryAddress, setDeliveryAddress] = useState(customerProfile?.deliveryAddress || '');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryOptionType>('same_city');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('telebirr');
  const [transactionRef, setTransactionRef] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // GPS Satellite State
  const [gpsLocation, setGpsLocation] = useState<{ latitude: number; longitude: number; accuracy: number; googleMapsUrl: string; satelliteInfo?: string } | undefined>(customerProfile?.gpsLocation);
  const [isLocating, setIsLocating] = useState(false);

  // UI state for order success screen
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Fee calculation
  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = (item.product.discountPrice || item.product.price) + item.selectedStorage.priceAdjustment;
    return sum + itemPrice * item.quantity;
  }, 0);

  const discountAmount = appliedCoupon 
    ? Math.round((subtotal * appliedCoupon.percentage) / 100) 
    : 0;

  const deliveryFee = deliveryMethod === 'same_city' ? 100 : deliveryMethod === 'regional' ? 250 : 350;
  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee);

  const telebirrCode = storeSettings?.telebirrMerchantCode || '554890';
  const cbeAcc = storeSettings?.cbeAccountNumber || '100049283741';
  const cbeName = storeSettings?.cbeAccountName || 'KIRU MOBILE ELECTRONICS';
  const dashenAcc = storeSettings?.dashenAccountNumber || '5294029102';
  const boaAcc = storeSettings?.boaAccountNumber || '891029301';

  const handleCopyAccount = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleAcquireSatelliteGps = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(6));
        const lng = Number(pos.coords.longitude.toFixed(6));
        const acc = Math.round(pos.coords.accuracy);
        const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;

        setGpsLocation({
          latitude: lat,
          longitude: lng,
          accuracy: acc,
          googleMapsUrl: mapUrl,
          satelliteInfo: `Direct Satellite Lock (Lat: ${lat}, Lng: ${lng}, ±${acc}m accuracy)`
        });
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        const defaultHossana = {
          latitude: 7.5531,
          longitude: 37.8522,
          accuracy: 10,
          googleMapsUrl: 'https://www.google.com/maps?q=7.5531,37.8522',
          satelliteInfo: 'Hossana Central Station Satellite Pin'
        };
        setGpsLocation(defaultHossana);
        alert(`Satellite GPS lock notice: ${err.message}. Defaulted position pin to Hossana Central Hub.`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !phoneNumber || !deliveryAddress) {
      alert('Please complete all required contact & delivery fields.');
      return;
    }

    if ((paymentMethod === 'telebirr' || paymentMethod === 'cbe_birr' || paymentMethod === 'bank_transfer') && !transactionRef.trim()) {
      alert('Please enter your payment transaction reference / receipt number.');
      return;
    }

    const orderId = `KM-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: orderId,
      items: cartItems,
      subtotal,
      deliveryFee,
      discountAmount,
      totalAmount,
      deliveryDetails: {
        customerName,
        phoneNumber,
        city,
        subCityOrZone,
        deliveryAddress,
        deliveryMethod,
        deliveryFee,
        specialInstructions,
        gpsLocation
      },
      paymentDetails: {
        method: paymentMethod,
        transactionReference: transactionRef,
        isPaid: paymentMethod !== 'cash_on_delivery'
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      trackingNumber,
      customerGmail
    };

    setCompletedOrder(newOrder);
    onOrderPlaced(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto text-white">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div>
            <h2 className="text-lg font-extrabold text-neutral-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              Kiru Mobile Checkout
            </h2>
            <p className="text-xs text-neutral-400">Complete your order details for fast delivery in Ethiopia</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white hover:bg-amber-500 hover:text-black transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedOrder ? (
          /* Order Success Receipt Screen */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-amber-400">Order Placed Successfully!</h3>
              <p className="text-xs text-neutral-300">
                Thank you, <strong className="text-white">{completedOrder.deliveryDetails.customerName}</strong>! Your order has been registered at Kiru Mobile Hossana.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-left text-xs max-w-md mx-auto">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Order ID:</span>
                <span className="font-mono font-bold text-amber-400">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Tracking Number:</span>
                <span className="font-mono text-emerald-400">{completedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Delivery Address:</span>
                <span className="text-neutral-200 font-medium">{completedOrder.deliveryDetails.deliveryAddress}, {completedOrder.deliveryDetails.city}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Payment Method:</span>
                <span className="text-amber-300 font-bold uppercase">{completedOrder.paymentDetails.method.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-amber-400 pt-1">
                <span>Total Amount:</span>
                <span>{completedOrder.totalAmount.toLocaleString()} ETB</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 max-w-md mx-auto">
               Our team in Hossana will contact you at <strong>{completedOrder.deliveryDetails.phoneNumber}</strong> to confirm dispatch!
            </div>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-amber-500 text-black font-extrabold text-xs hover:bg-amber-400 transition-colors shadow-lg"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-4 sm:p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Step 1: Customer Contact & Delivery Address */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4" />
                1. Delivery & Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-neutral-300">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Abebe Balcha"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-950 text-xs text-white rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-neutral-300">Phone Number (Stay Phone) *</label>
                  <input
                    type="text"
                    required
                    placeholder="+251 9XX XXX XXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-950 text-xs text-white rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-neutral-300">Gmail / Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. customer@gmail.com"
                    value={customerGmail}
                    onChange={(e) => setCustomerGmail(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-950 text-xs text-white rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-neutral-300">City / Region *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-950 text-xs text-white rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Hossana">Hossana Town</option>
                    <option value="Hawassa">Hawassa</option>
                    <option value="Addis Ababa">Addis Ababa</option>
                    <option value="Wolkite">Wolkite</option>
                    <option value="Dilla">Dilla</option>
                    <option value="SNNPR Region">Other SNNPR City</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-neutral-300">Sub-city / Zone</label>
                  <input
                    type="text"
                    placeholder="e.g. Sech Duna / Near Bus Station"
                    value={subCityOrZone}
                    onChange={(e) => setSubCityOrZone(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-950 text-xs text-white rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Satellite Location Pin Control */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-amber-400" />
                    Direct Satellite GPS Location
                  </span>
                  <button
                    type="button"
                    onClick={handleAcquireSatelliteGps}
                    disabled={isLocating}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500 hover:text-black transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                    {isLocating ? 'Locking Satellite...' : '📍 Pin Direct Satellite Location'}
                  </button>
                </div>

                {gpsLocation ? (
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
                    <div className="font-bold flex items-center justify-between">
                      <span>GPS Coordinates Pinned:</span>
                      <a href={gpsLocation.googleMapsUrl} target="_blank" rel="noreferrer" className="underline font-semibold text-amber-400">
                        Open Map Pin
                      </a>
                    </div>
                    <div className="font-mono text-[11px]">
                      Lat: {gpsLocation.latitude}°, Lng: {gpsLocation.longitude}° (Accuracy ±{gpsLocation.accuracy}m)
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-neutral-400">
                    Click the satellite button above to automatically send your exact GPS location to the Kiru Mobile delivery team in Hossana.
                  </p>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-300">Full Delivery Address / Landmark *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Specify prominent landmark, building name, shop number in Hossana..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-neutral-950 text-xs text-white rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Step 2: Delivery Option */}
            <div className="space-y-3 pt-4 border-t border-neutral-800">
              <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                2. Select Delivery Speed
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div
                  onClick={() => setDeliveryMethod('same_city')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    deliveryMethod === 'same_city'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="font-bold text-white">Same City Express</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Hossana (1-2 Hours)</div>
                  <div className="text-amber-400 font-extrabold mt-1">100 ETB</div>
                </div>

                <div
                  onClick={() => setDeliveryMethod('regional')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    deliveryMethod === 'regional'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="font-bold text-white">Regional Delivery</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">SNNPR / Sidama (1-2 Days)</div>
                  <div className="text-amber-400 font-extrabold mt-1">250 ETB</div>
                </div>

                <div
                  onClick={() => setDeliveryMethod('nationwide')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    deliveryMethod === 'nationwide'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="font-bold text-white">Nationwide EMS</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Ethiopia Post (2-4 Days)</div>
                  <div className="text-amber-400 font-extrabold mt-1">350 ETB</div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Options */}
            <div className="space-y-3 pt-4 border-t border-neutral-800">
              <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" />
                3. Payment Method
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('telebirr')}
                  className={`p-2.5 rounded-xl border transition-all ${
                    paymentMethod === 'telebirr'
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                  }`}
                >
                  Telebirr
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cbe_birr')}
                  className={`p-2.5 rounded-xl border transition-all ${
                    paymentMethod === 'cbe_birr'
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                  }`}
                >
                  CBE Birr
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-2.5 rounded-xl border transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                  }`}
                >
                  Bank Transfer
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash_on_delivery')}
                  className={`p-2.5 rounded-xl border transition-all ${
                    paymentMethod === 'cash_on_delivery'
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                  }`}
                >
                  Cash on Delivery
                </button>
              </div>

              {/* Payment Info Card */}
              {paymentMethod === 'telebirr' && (
                <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold">Telebirr Merchant Code:</span>
                    <button
                      type="button"
                      onClick={() => handleCopyAccount(telebirrCode)}
                      className="flex items-center gap-1 px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-amber-300 font-mono font-bold"
                    >
                      {telebirrCode}
                      {copiedAccount ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <p className="text-neutral-400">
                    Open your Telebirr App or dial <strong className="text-white">*127#</strong> &gt; Pay Merchant &gt; Enter Code <strong className="text-amber-400">{telebirrCode}</strong> (Kiru Mobile Store).
                  </p>
                  <div>
                    <label className="text-[11px] text-neutral-300">Enter Telebirr Transaction / Receipt Ref ID *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. TB921048293"
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-neutral-900 text-xs text-white uppercase rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'cbe_birr' && (
                <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold">CBE Account Number:</span>
                    <button
                      type="button"
                      onClick={() => handleCopyAccount(cbeAcc)}
                      className="flex items-center gap-1 px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-amber-300 font-mono font-bold"
                    >
                      {cbeAcc}
                      {copiedAccount ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <p className="text-neutral-400">
                    Transfer to Commercial Bank of Ethiopia Account Name: <strong className="text-white">{cbeName}</strong>.
                  </p>
                  <div>
                    <label className="text-[11px] text-neutral-300">Enter Bank Transaction Reference ID *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. FT241839210"
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-neutral-900 text-xs text-white uppercase rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'bank_transfer' && (
                <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-2 text-xs">
                  <div className="text-amber-400 font-bold">Bank Transfer Accounts (Kiru Mobile):</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-neutral-300">
                    <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                      <div className="font-bold text-white">Commercial Bank (CBE)</div>
                      <div className="font-mono text-amber-300">{cbeAcc}</div>
                    </div>
                    <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                      <div className="font-bold text-white">Dashen Bank</div>
                      <div className="font-mono text-amber-300">{dashenAcc}</div>
                    </div>
                    <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                      <div className="font-bold text-white">Bank of Abyssinia (BOA)</div>
                      <div className="font-mono text-amber-300">{boaAcc}</div>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-300">Enter Transfer Reference Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. TXN-8921038"
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-neutral-900 text-xs text-white uppercase rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}
              {paymentMethod === 'cash_on_delivery' && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                   Pay in cash to the delivery rider upon inspecting your phone/electronics in Hossana.
                </div>
              )}
            </div>

            {/* Order Summary Breakdown */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Items Subtotal:</span>
                <span className="text-white font-medium">{subtotal.toLocaleString()} ETB</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>Promo Discount:</span>
                  <span>-{discountAmount.toLocaleString()} ETB</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-400">
                <span>Delivery Fee:</span>
                <span className="text-white font-medium">{deliveryFee.toLocaleString()} ETB</span>
              </div>

              <div className="flex justify-between text-base font-black text-amber-400 pt-2 border-t border-neutral-800">
                <span>Total Amount to Pay:</span>
                <span>{totalAmount.toLocaleString()} ETB</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 hover:from-amber-400 hover:to-amber-300 transition-all shadow-xl shadow-amber-500/20 active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              Confirm & Place Order ({totalAmount.toLocaleString()} ETB)
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
