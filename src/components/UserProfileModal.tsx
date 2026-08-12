import React, { useState, useRef } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Camera, 
  Upload, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Navigation, 
  Globe, 
  Search,
  Filter,
  Check,
  AlertCircle,
  LayoutDashboard
} from 'lucide-react';
import { CustomerProfile, Order, OrderStatusType } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CustomerProfile;
  onSaveProfile: (updatedProfile: CustomerProfile) => void;
  orders: Order[];
  onOpenOrderTracker: () => void;
  onOpenAdmin?: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80'
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  orders,
  onOpenOrderTracker,
  onOpenAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');
  
  // Profile Form State
  const [fullName, setFullName] = useState(profile.fullName);
  const [email, setEmail] = useState(profile.email);
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [city, setCity] = useState(profile.city || 'Hossana');
  const [subCityOrZone, setSubCityOrZone] = useState(profile.subCityOrZone || '');
  const [deliveryAddress, setDeliveryAddress] = useState(profile.deliveryAddress || '');
  const [savedGps, setSavedGps] = useState(profile.gpsLocation);
  const [isLocating, setIsLocating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // History Filter State
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Secure Admin Auth Modal State
  const [showAdminAuthModal, setShowAdminAuthModal] = useState(false);
  const [adminAuthEmail, setAdminAuthEmail] = useState('kiru26@gmail.com');
  const [adminAuthPassword, setAdminAuthPassword] = useState('');
  const [adminAuthError, setAdminAuthError] = useState('');

  const handleOpenPortalClick = () => {
    const isVerified = sessionStorage.getItem('admin_verified') === 'true';
    if (isVerified) {
      onClose();
      if (onOpenAdmin) onOpenAdmin();
    } else {
      setShowAdminAuthModal(true);
      setAdminAuthEmail(profile.email || 'kiru26@gmail.com');
      setAdminAuthPassword('');
      setAdminAuthError('');
    }
  };

  const handleVerifyAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = adminAuthEmail.trim().toLowerCase();
    const cleanPass = adminAuthPassword.trim();

    const isEmailValid = cleanEmail === 'kiru26@gmail.com' || cleanEmail === 'jazzmusicschool65@gmail.com' || cleanEmail.includes('kiru');
    const isPassValid = cleanPass === 'riku9120..';

    if (isEmailValid && isPassValid) {
      sessionStorage.setItem('admin_verified', 'true');
      setShowAdminAuthModal(false);
      onClose();
      if (onOpenAdmin) onOpenAdmin();
    } else {
      setAdminAuthError('Invalid credentials. Required: kiru26@gmail.com / riku9120..');
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Filter orders matching customer phone or email or search string
  const customerOrders = orders.filter(o => {
    const phoneMatch = phoneNumber.trim() && o.deliveryDetails.phoneNumber.includes(phoneNumber.trim());
    const emailMatch = email.trim() && o.customerGmail && o.customerGmail.toLowerCase().includes(email.trim().toLowerCase());
    const filterQueryMatch = searchFilter.trim() ? (
      o.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      o.deliveryDetails.phoneNumber.includes(searchFilter) ||
      (o.customerGmail && o.customerGmail.toLowerCase().includes(searchFilter.toLowerCase())) ||
      o.items.some(i => i.product.name.toLowerCase().includes(searchFilter.toLowerCase()))
    ) : true;

    const statusMatch = statusFilter === 'all' || o.status === statusFilter;

    // Show orders if phone/email matches or if user searches directly
    const isUserOrder = phoneMatch || emailMatch || (profile.phoneNumber === o.deliveryDetails.phoneNumber);
    return (isUserOrder || searchFilter.trim().length > 0) && filterQueryMatch && statusMatch;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
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

        const gpsData = {
          latitude: lat,
          longitude: lng,
          accuracy: acc,
          googleMapsUrl: mapUrl
        };

        setSavedGps(gpsData);
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        // Default to Hossana center coordinates if satellite GPS permission is rejected or times out
        const defaultHossanaGps = {
          latitude: 7.5531,
          longitude: 37.8522,
          accuracy: 10,
          googleMapsUrl: 'https://www.google.com/maps?q=7.5531,37.8522'
        };
        setSavedGps(defaultHossanaGps);
        alert(`Location lock notice: ${err.message}. Defaulted satellite pin to Hossana Central Hub.`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSaveProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check for protected accounts
    const isProtectedName = fullName.toLowerCase().includes('kiru') || fullName.toLowerCase().includes('jazzmusic');
    const isProtectedEmail = email.toLowerCase().includes('kiru') || email.toLowerCase().includes('jazzmusicschool');
    
    // Allow only if the logged in user is the owner of these sensitive accounts
    const isAuthorized = profile.email === 'kiru26@gmail.com' || profile.email === 'jazzmusicschool65@gmail.com';

    if ((isProtectedName || isProtectedEmail) && !isAuthorized) {
      alert("This account name/email is protected and cannot be used.");
      return;
    }

    const updated: CustomerProfile = {
      ...profile,
      fullName,
      email,
      phoneNumber,
      avatarUrl,
      city,
      subCityOrZone,
      deliveryAddress,
      gpsLocation: savedGps
    };

    onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const getStatusBadge = (status: OrderStatusType) => {
    switch (status) {
      case 'pending':
      case 'placed':
        return <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold text-[10px] flex items-center gap-1"><Clock className="w-3 h-3" /> Pending Order</span>;
      case 'approved':
        return <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold text-[10px] flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Approved by Admin</span>;
      case 'preparing':
        return <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold text-[10px] flex items-center gap-1"><Clock className="w-3 h-3 animate-spin" /> Preparing Package</span>;
      case 'delivering':
        return <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold text-[10px] flex items-center gap-1"><Truck className="w-3 h-3 animate-bounce" /> On the Way / Delivering</span>;
      case 'delivered':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-[10px] flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Successfully Delivered</span>;
      case 'cancelled':
        return <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 font-semibold text-[10px] flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Order Cancelled</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 text-[10px]">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto text-white">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500 shadow-md">
              <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h2 className="text-lg font-black text-amber-400 flex items-center gap-2">
                {fullName || 'Kiru Mobile Customer'}
              </h2>
              <p className="text-xs text-neutral-400 flex items-center gap-2">
                <span>{phoneNumber || '+251 9XX XXX XXX'}</span>
                <span>•</span>
                <span>{email || 'Customer Profile'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white hover:bg-amber-500 hover:text-black transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 bg-neutral-950 text-xs font-bold px-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-5 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'profile' ? 'border-amber-500 text-amber-400' : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <User className="w-4 h-4" />
            Customer Profile & Details
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 px-5 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'history' ? 'border-amber-500 text-amber-400' : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Shopping History & Orders ({orders.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: PROFILE FORM */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfileSubmit} className="space-y-6">

              {((profile.email && profile.email.toLowerCase() === 'jazzmusicschool65@gmail.com') || (profile.fullName && profile.fullName.toLowerCase().includes('kiru')) || (profile.email && profile.email.toLowerCase().includes('kiru'))) && onOpenAdmin && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/25 via-amber-400/10 to-amber-500/25 border border-amber-500/50 flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500 text-black font-bold shrink-0">
                      <LayoutDashboard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-amber-300">
                        {profile.role === 'super_admin' ? '👑 Super Admin Control Center' : profile.role === 'seller' ? '🛍️ Seller Products Portal' : '⚡ Store Admin Management'}
                      </h4>
                      <p className="text-[11px] text-neutral-300">Authorized staff portal for products, orders, and store settings.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenPortalClick}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 text-black font-extrabold text-xs hover:bg-amber-400 transition-all shadow-lg flex items-center gap-1.5 shrink-0"
                  >
                    Open Portal ↗
                  </button>
                </div>
              )}
              
              {/* Avatar Selection / Upload */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                <label className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Camera className="w-4 h-4" />
                  Profile Photo / Avatar Upload
                </label>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500 shrink-0">
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  <div className="space-y-2 flex-1 text-center sm:text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-500 hover:text-black transition-all"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Upload Custom Photo
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                    
                    <div className="text-[11px] text-neutral-400">Or select from tech avatars below:</div>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_AVATARS.map((url, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatarUrl(url)}
                          className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${
                            avatarUrl === url ? 'border-amber-400 scale-110' : 'border-neutral-800 hover:border-neutral-600'
                          }`}
                        >
                          <img src={url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-neutral-300">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Abebe Balcha"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-950 text-white rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-300">Phone Number (Stay Phone) *</label>
                  <input
                    type="text"
                    required
                    placeholder="+251 9XX XXX XXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-950 text-white rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-300">Gmail / Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. customer@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-950 text-white rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-300">City / Region *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hossana Town"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-950 text-white rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery Address & Satellite Location */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
                <div className="font-bold text-amber-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    Delivery Address & Satellite Location
                  </span>
                  <button
                    type="button"
                    onClick={handleAcquireSatelliteGps}
                    disabled={isLocating}
                    className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold hover:bg-amber-500 hover:text-black transition-all flex items-center gap-1"
                  >
                    <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                    {isLocating ? 'Acquiring Satellite GPS...' : '📍 Pin Direct Satellite Location'}
                  </button>
                </div>

                <div>
                  <label className="text-neutral-400 text-[11px]">Sub-city / Landmark / Shop Address</label>
                  <textarea
                    rows={2}
                    placeholder="Specify main shop name, building, or landmark in Hossana..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 text-white rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {savedGps && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-1">
                    <div className="font-bold text-xs flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-amber-400" />
                      Satellite GPS Position Pinned
                    </div>
                    <div className="text-[11px] font-mono">
                      Lat: {savedGps.latitude}°, Lng: {savedGps.longitude}° (Accuracy ±{savedGps.accuracy}m)
                    </div>
                    <a
                      href={savedGps.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-amber-400 underline hover:text-amber-300 font-semibold inline-block pt-0.5"
                    >
                      View on Google Maps
                    </a>
                  </div>
                )}
              </div>

              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Profile details updated successfully!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-amber-500 text-black font-extrabold text-xs hover:bg-amber-400 transition-colors shadow-lg"
              >
                Save Customer Profile
              </button>

            </form>
          )}

          {/* TAB 2: SHOPPING HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-2 items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search by phone, gmail, order ID..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-3.5 h-3.5 text-amber-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-2 py-1.5 bg-neutral-900 text-amber-300 font-bold rounded-lg border border-neutral-800 text-xs cursor-pointer"
                  >
                    <option value="all">All Order Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="preparing">Preparing</option>
                    <option value="delivering">Delivering</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Order Cards List */}
              {customerOrders.length === 0 ? (
                <div className="text-center py-12 bg-neutral-950/60 rounded-2xl border border-neutral-800 space-y-3">
                  <ShoppingBag className="w-10 h-10 text-neutral-600 mx-auto" />
                  <div className="text-sm font-bold text-neutral-300">No shopping history found matching this filter.</div>
                  <p className="text-xs text-neutral-500">Search with your phone number ({phoneNumber || '+2519...'}) or Gmail address ({email || 'user@gmail.com'})</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {customerOrders.map((o) => (
                    <div key={o.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                      
                      {/* Top Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-2">
                        <div>
                          <span className="font-mono font-bold text-amber-400 text-sm">{o.id}</span>
                          <span className="text-xs text-neutral-400 ml-2">
                            • {new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(o.status)}
                          <span className="font-black text-amber-400 text-sm">{o.totalAmount.toLocaleString()} ETB</span>
                        </div>
                      </div>

                      {/* Items breakdown */}
                      <div className="divide-y divide-neutral-800/60 text-xs">
                        {o.items.map((item, idx) => (
                          <div key={idx} className="py-2 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 min-w-0">
                              <img src={item.product.images[0]} alt="" className="w-8 h-8 object-cover rounded bg-black shrink-0" referrerPolicy="no-referrer" />
                              <div className="truncate">
                                <span className="font-bold text-white">{item.quantity}x {item.product.name}</span>
                                <span className="text-[10px] text-neutral-400 block">{item.selectedColor.name} • {item.selectedStorage.label}</span>
                              </div>
                            </div>
                            <span className="font-mono text-amber-300 font-bold shrink-0">
                              {((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString()} ETB
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Info & Satellite GPS Link */}
                      <div className="pt-2 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-400">
                        <div>
                          <strong>Deliver to:</strong> {o.deliveryDetails.customerName} ({o.deliveryDetails.phoneNumber}) • {o.deliveryDetails.deliveryAddress}, {o.deliveryDetails.city}
                        </div>

                        {o.deliveryDetails.gpsLocation && (
                          <a
                            href={o.deliveryDetails.gpsLocation.googleMapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold hover:bg-amber-500 hover:text-black transition-all flex items-center gap-1"
                          >
                            <Navigation className="w-3 h-3" />
                            Satellite GPS Pin
                          </a>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {showAdminAuthModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-amber-500/50 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500 text-black font-bold">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-amber-400">Secure Admin Login</h3>
                  <p className="text-xs text-neutral-400">Enter authorized Gmail & password</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAdminAuthModal(false)}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleVerifyAdminAuth} className="space-y-4">
              {adminAuthError && (
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{adminAuthError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">Authorized Gmail</label>
                <input
                  type="email"
                  value={adminAuthEmail}
                  onChange={(e) => setAdminAuthEmail(e.target.value)}
                  placeholder="kiru26@gmail.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">Security Password</label>
                <input
                  type="password"
                  value={adminAuthPassword}
                  onChange={(e) => setAdminAuthPassword(e.target.value)}
                  placeholder="riku9120.."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-500 font-mono"
                />
                <p className="text-[11px] text-neutral-500">Hint: Password is riku9120..</p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAdminAuthModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-bold hover:bg-neutral-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-black text-xs font-black hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
                >
                  Authenticate & Open Portal ↗
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
