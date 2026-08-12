import React, { useState, useEffect } from 'react';
import { Header, SearchAndNav } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryBar } from './components/CategoryBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AIAssistantChat } from './components/AIAssistantChat';
import { AdminDashboard } from './components/AdminDashboard';
import { UserProfileModal } from './components/UserProfileModal';
import { Footer } from './components/Footer';

import { INITIAL_PRODUCTS, PROMO_COUPONS } from './data/products';
import { 
  Product, 
  CartItem, 
  Order, 
  CategoryType, 
  ProductColor, 
  ProductStorageOption, 
  ProductReview, 
  DiscountCoupon,
  StoreSettings,
  AdminUser,
  CustomerProfile,
  PromoBanner
} from './types';
import { Sparkles, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

const DEFAULT_STORE_SETTINGS: StoreSettings = {
  telebirrMerchantCode: '554890',
  telebirrMerchantName: 'Kiru Mobile Store',
  cbeAccountNumber: '100049283741',
  cbeAccountName: 'KIRU MOBILE ELECTRONICS',
  dashenAccountNumber: '5294029102',
  dashenAccountName: 'Kiru Mobile Dashen',
  boaAccountNumber: '891029301',
  boaAccountName: 'Kiru Mobile BOA',
  socialLinks: {
    tiktok: 'https://tiktok.com/@kirumobile',
    facebook: 'https://facebook.com/kirumobile',
    instagram: 'https://instagram.com/kirumobile',
    telegram: 'https://t.me/kirumobile',
    youtube: 'https://youtube.com/@kirumobile'
  },
  socialLinksList: [
    { id: 'soc-1', platform: 'Telegram Channel', url: 'https://t.me/kirumobile', active: true },
    { id: 'soc-2', platform: 'TikTok Channel', url: 'https://tiktok.com/@kirumobile', active: true },
    { id: 'soc-3', platform: 'Facebook Page', url: 'https://facebook.com/kirumobile', active: true },
    { id: 'soc-4', platform: 'Instagram Page', url: 'https://instagram.com/kirumobile', active: true },
    { id: 'soc-5', platform: 'YouTube Channel', url: 'https://youtube.com/@kirumobile', active: true },
    { id: 'soc-6', platform: 'WhatsApp Support', url: 'https://wa.me/251911234567', active: true }
  ],
  supportPhone1: '+251 911 234 567',
  supportPhone2: '+251 922 888 999',
  supportEmail: 'jazzmusicschool65@gmail.com',
  storeLocation: 'Main Street, Near Commercial Bank of Ethiopia, Hossana, SNNPR, Ethiopia',
  satelliteMapUrl: 'https://maps.google.com/?q=Hossana+Ethiopia&t=k'
};

const DEFAULT_ADMIN_USERS: AdminUser[] = [
  {
    id: 'adm-01',
    fullName: 'Kiru Mobile Super Admin',
    email: 'jazzmusicschool65@gmail.com',
    password: 'Password123!',
    role: 'super_admin',
    lastLogin: new Date().toISOString()
  }
];

const DEFAULT_CUSTOMER_PROFILE: CustomerProfile = {
  id: 'cust-101',
  fullName: 'Abebe Balcha',
  email: 'jazzmusicschool65@gmail.com',
  phoneNumber: '+251911234567',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  city: 'Hossana',
  subCityOrZone: 'Central Hossana',
  deliveryAddress: 'Near Bus Terminal, Main Street, Hossana',
  createdAt: new Date().toISOString(),
  role: 'super_admin',
  lastActive: 'Active now'
};

const DEFAULT_CUSTOMER_PROFILES: CustomerProfile[] = [
  DEFAULT_CUSTOMER_PROFILE,
  {
    id: 'cust-102',
    fullName: 'Bethi Kebede',
    email: 'bethi.kebede@gmail.com',
    phoneNumber: '+251922334455',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    city: 'Hossana',
    subCityOrZone: 'Shed 04',
    deliveryAddress: 'High School Road, Hossana',
    createdAt: '2026-08-05T14:20:00.000Z',
    role: 'customer',
    lastActive: '12 mins ago'
  },
  {
    id: 'cust-103',
    fullName: 'Dawit Yonas',
    email: 'dawit.yonas@gmail.com',
    phoneNumber: '+251933445566',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    city: 'Hossana',
    subCityOrZone: 'Sech Dula',
    deliveryAddress: 'Near Wachemo University Gate, Hossana',
    createdAt: '2026-08-08T09:15:00.000Z',
    role: 'customer',
    lastActive: '1 hour ago'
  },
  {
    id: 'cust-104',
    fullName: 'Sara Tesfaye',
    email: 'sara.tesfaye@gmail.com',
    phoneNumber: '+251944556677',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    city: 'Hossana',
    subCityOrZone: 'Commercial Center',
    deliveryAddress: 'Shop 12, Commercial Plaza, Hossana',
    createdAt: '2026-08-10T16:45:00.000Z',
    role: 'customer',
    lastActive: 'Yesterday'
  },
  {
    id: 'cust-105',
    fullName: 'Kebede Alemu',
    email: 'kebede.alemu@gmail.com',
    phoneNumber: '+251955667788',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    city: 'Hossana',
    subCityOrZone: 'Bus Station Zone',
    deliveryAddress: 'Opposite Shell Gas Station, Hossana',
    createdAt: '2026-08-11T11:30:00.000Z',
    role: 'customer',
    lastActive: '2 days ago'
  }
];

const DEFAULT_PROMO_BANNER: PromoBanner = {
  id: 'pb-01',
  badgeText: 'AURORA TECH • LUXURY SERIES IN HOSSANA',
  title: 'Unveiling The',
  highlightText: 'Aura Series Luxury Tech',
  subtitle: 'Experience the pinnacle of luxury tech. Buy 100% original flagship smartphones, gold-edition wireless earbuds, and premium accessories with 1-Year Local Warranty in Hossana.',
  bannerImageUrl: '/src/assets/images/luxury_gold_banner_1786555790519.jpg',
  couponCode: 'AURA-LUXURY2026',
  discountBadgeText: 'AURA X | AURA BUDS',
  ctaText: 'Explore Collection',
  active: true
};

export default function App() {
  // Storefront Promotion Banner State
  const [promoBanner, setPromoBanner] = useState<PromoBanner>(() => {
    const saved = localStorage.getItem('kiru_promo_banner');
    return saved ? JSON.parse(saved) : DEFAULT_PROMO_BANNER;
  });

  useEffect(() => {
    localStorage.setItem('kiru_promo_banner', JSON.stringify(promoBanner));
  }, [promoBanner]);
  // Store Settings & Admins State
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('kiru_store_settings');
    return saved ? JSON.parse(saved) : DEFAULT_STORE_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('kiru_store_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem('kiru_admin_users');
    return saved ? JSON.parse(saved) : DEFAULT_ADMIN_USERS;
  });

  useEffect(() => {
    localStorage.setItem('kiru_admin_users', JSON.stringify(adminUsers));
  }, [adminUsers]);

  // Customer Profile State (Active User Session)
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile>(() => {
    const saved = localStorage.getItem('kiru_customer_profile');
    return saved ? JSON.parse(saved) : DEFAULT_CUSTOMER_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('kiru_customer_profile', JSON.stringify(customerProfile));
  }, [customerProfile]);

  // All Registered Customer Profiles State (For Admin User Management)
  const [customerProfiles, setCustomerProfiles] = useState<CustomerProfile[]>(() => {
    const saved = localStorage.getItem('kiru_customer_profiles');
    return saved ? JSON.parse(saved) : DEFAULT_CUSTOMER_PROFILES;
  });

  useEffect(() => {
    localStorage.setItem('kiru_customer_profiles', JSON.stringify(customerProfiles));
  }, [customerProfiles]);

  // Toggle Admin / Seller Role Handler
  const handleToggleAdminRole = (targetProfile: CustomerProfile, newRole: 'admin' | 'customer' | 'seller' | 'super_admin') => {
    setCustomerProfiles(prev => prev.map(p => {
      if (p.id === targetProfile.id || p.email.toLowerCase() === targetProfile.email.toLowerCase()) {
        return { ...p, role: newRole };
      }
      return p;
    }));

    if (customerProfile.id === targetProfile.id || customerProfile.email.toLowerCase() === targetProfile.email.toLowerCase()) {
      setCustomerProfile(prev => ({ ...prev, role: newRole }));
    }

    if (newRole === 'admin' || newRole === 'seller' || newRole === 'super_admin') {
      setAdminUsers(prev => {
        const exists = prev.some(a => a.email.toLowerCase() === targetProfile.email.toLowerCase());
        if (!exists) {
          return [
            ...prev,
            {
              id: `adm-${Date.now()}`,
              fullName: targetProfile.fullName,
              email: targetProfile.email,
              password: 'Password123!',
              role: newRole,
              lastLogin: new Date().toISOString()
            }
          ];
        } else {
          return prev.map(a => a.email.toLowerCase() === targetProfile.email.toLowerCase() ? { ...a, role: newRole } : a);
        }
      });
      if (newRole === 'super_admin') showToast(`👑 ${targetProfile.fullName} is now a Super Admin!`);
      else if (newRole === 'admin') showToast(`⚡ ${targetProfile.fullName} is now a Store Admin!`);
      else if (newRole === 'seller') showToast(`🛍️ ${targetProfile.fullName} assigned Seller Role (Products Only)!`);
    } else {
      setAdminUsers(prev => prev.filter(a => a.email.toLowerCase() !== targetProfile.email.toLowerCase() || a.role === 'super_admin'));
      showToast(`${targetProfile.fullName} set to Customer.`);
    }
  };

  const handleAddCustomerProfile = (newProfile: CustomerProfile) => {
    setCustomerProfiles(prev => [newProfile, ...prev]);
    showToast(`Registered user ${newProfile.fullName}!`);
  };

  const handleDeleteCustomerProfile = (profileId: string) => {
    setCustomerProfiles(prev => prev.filter(p => p.id !== profileId));
    showToast('User account deleted.');
  };

  const handleSwitchActiveUser = (selectedUser: CustomerProfile) => {
    setCustomerProfile(selectedUser);
    showToast(`Logged in as ${selectedUser.fullName}!`);
  };

  // Store Products State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('kiru_products');
    const rawList: Product[] = saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    return rawList.map(p => {
      if (!p.couponCode || !p.couponCode.trim()) {
        const brandClean = (p.brand || 'KIRU').toUpperCase().replaceAll(/[^A-Z0-9]/g, '');
        const namePart = p.name ? p.name.replaceAll(/[^a-zA-Z0-9]/g, '').slice(-4).toUpperCase() : '01';
        return { ...p, couponCode: `KIRU-${brandClean}-${namePart}` };
      }
      return p;
    });
  });

  useEffect(() => {
    localStorage.setItem('kiru_products', JSON.stringify(products));
  }, [products]);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('kiru_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('kiru_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('kiru_wishlist');
    return saved ? JSON.parse(saved) : ['km-sp-01', 'km-sp-03'];
  });

  useEffect(() => {
    localStorage.setItem('kiru_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('kiru_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'KM-89231',
        items: [
          {
            id: 'demo-1',
            product: INITIAL_PRODUCTS[3], // Tecno Spark 20 Pro
            selectedColor: INITIAL_PRODUCTS[3].colors[0],
            selectedStorage: INITIAL_PRODUCTS[3].storageOptions[0],
            quantity: 1
          }
        ],
        subtotal: 14800,
        deliveryFee: 100,
        discountAmount: 0,
        totalAmount: 14900,
        deliveryDetails: {
          customerName: 'Kaleb Haile',
          phoneNumber: '+251 911 888 777',
          city: 'Hossana',
          subCityOrZone: 'Central Market',
          deliveryAddress: 'Near Commercial Bank, Main Street',
          deliveryMethod: 'same_city',
          deliveryFee: 100,
          gpsLocation: {
            latitude: 7.5531,
            longitude: 37.8522,
            accuracy: 8,
            googleMapsUrl: 'https://www.google.com/maps?q=7.5531,37.8522'
          }
        },
        paymentDetails: {
          method: 'telebirr',
          transactionReference: 'TB9210839',
          isPaid: true
        },
        status: 'preparing',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        trackingNumber: 'TRK-981203',
        customerGmail: 'jazzmusicschool65@gmail.com'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('kiru_orders', JSON.stringify(orders));
  }, [orders]);

  // Coupons State
  const [coupons, setCoupons] = useState<DiscountCoupon[]>(PROMO_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<DiscountCoupon | null>(null);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all' | 'offers'>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(150000);
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating' | 'newest'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Modal Visibility Controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart Operations
  const handleAddToCart = (
    product: Product, 
    color?: ProductColor, 
    storage?: ProductStorageOption, 
    qty = 1
  ) => {
    const selectedColor = color || product.colors[0] || { name: 'Standard', hex: '#000000' };
    const selectedStorage = storage || product.storageOptions[0] || { label: 'Standard', priceAdjustment: 0 };
    const itemId = `${product.id}-${selectedColor.name}-${selectedStorage.label}`;

    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === itemId);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].quantity += qty;
        return copy;
      } else {
        return [...prev, { id: itemId, product, selectedColor, selectedStorage, quantity: qty }];
      }
    });

    showToast(`Added ${product.name} to cart!`);
  };

  const handleQuickBuy = (product: Product) => {
    handleAddToCart(product);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
    } else {
      setCartItems(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  // Wishlist Toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev => {
      if (prev.includes(product.id)) {
        showToast(`Removed ${product.name} from wishlist.`);
        return prev.filter(id => id !== product.id);
      } else {
        showToast(`Saved ${product.name} to wishlist!`);
        return [...prev, product.id];
      }
    });
  };

  // Add Product Review
  const handleAddReview = (productId: string, reviewData: Omit<ProductReview, 'id' | 'date'>) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newRev: ProductReview = {
          id: `rev-${Date.now()}`,
          ...reviewData,
          date: new Date().toISOString().split('T')[0]
        };
        const updatedReviews = [newRev, ...p.reviews];
        const avgRating = Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1));
        return {
          ...p,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: avgRating
        };
      }
      return p;
    }));
  };

  // Handle New Order Placed
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]); // Clear cart
    setAppliedCoupon(null);
    showToast(`Order ${newOrder.id} placed successfully!`);
    
    // Also post to backend if available
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    }).catch(() => {});
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter(p => {
    // Category filter
    if (selectedCategory === 'offers' && !p.discountPrice) return false;
    if (selectedCategory !== 'all' && selectedCategory !== 'offers' && p.category !== selectedCategory) return false;

    // Brand filter
    if (selectedBrand !== 'all' && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchCategory) return false;
    }

    // Price range filter
    const effectivePrice = p.discountPrice || p.price;
    if (effectivePrice > priceRange) return false;

    // Stock filter
    if (inStockOnly && !p.inStock) return false;

    return true;
  }).sort((a, b) => {
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;

    if (sortBy === 'price_low') return priceA - priceB;
    if (sortBy === 'price_high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const cartTotal = cartItems.reduce((sum, item) => {
    const itemPrice = (item.product.discountPrice || item.product.price) + item.selectedStorage.priceAdjustment;
    return sum + itemPrice * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500 text-black font-extrabold text-xs shadow-2xl animate-bounce border border-amber-300">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        cartTotal={cartTotal}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          setSelectedCategory('all');
          setSelectedBrand('all');
          showToast(`Showing ${wishlistIds.length} saved products`);
        }}
        onOpenAIChat={() => setIsAIChatOpen(true)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        customerProfile={customerProfile}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        products={products}
        onSelectProduct={(p) => setSelectedProductForDetail(p)}
      />

      {/* Hero Promo Banner (Displayed Prominently At The Top) */}
      <Hero
        promoBanner={promoBanner}
        onShopNow={() => {
          const catalogEl = document.getElementById('catalog-section');
          catalogEl?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAIChat={() => setIsAIChatOpen(true)}
      />

      {/* Searching & Category Navigation Bar (Positioned UNDER Promo Banner) */}
      <SearchAndNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        products={products}
        onSelectProduct={(p) => setSelectedProductForDetail(p)}
      />

      {/* Interactive Category & Filter Bar */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedBrand={selectedBrand}
        onSelectBrand={setSelectedBrand}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        sortBy={sortBy}
        onSortChange={setSortBy}
        inStockOnly={inStockOnly}
        onInStockToggle={setInStockOnly}
        totalResultsCount={filteredProducts.length}
      />

      {/* Main Catalog Grid Section */}
      <main id="catalog-section" className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              {selectedCategory === 'all' && 'Featured Mobile & Electronics Catalog'}
              {selectedCategory === 'smartphones' && 'Original Smartphones in Hossana'}
              {selectedCategory === 'accessories' && 'Phone Accessories & Chargers'}
              {selectedCategory === 'electronics' && 'Laptops, TVs & Gaming Gear'}
              {selectedCategory === 'offers' && 'Special Discounted Technology Deals'}
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Original products with official 1-Year warranty & express delivery in Hossana, Ethiopia.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Telebirr & CBE Birr Accepted</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/50 rounded-2xl border border-neutral-800 space-y-3">
            <Zap className="w-12 h-12 text-neutral-600 mx-auto" />
            <h3 className="text-base font-bold text-neutral-200">No products match your active search or filters.</h3>
            <p className="text-xs text-neutral-400">Try adjusting your price range or brand filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
                setSearchQuery('');
                setPriceRange(150000);
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={(p) => handleAddToCart(p)}
                onQuickBuy={handleQuickBuy}
                onViewDetails={(p) => setSelectedProductForDetail(p)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Modals & Slide-overs */}
      
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={(p, color, storage, qty) => {
          handleAddToCart(p, color, storage, qty);
          setSelectedProductForDetail(null);
        }}
        onBuyNow={(p, color, storage, qty) => {
          handleAddToCart(p, color, storage, qty);
          setSelectedProductForDetail(null);
          setIsCartOpen(true);
        }}
        isWishlisted={selectedProductForDetail ? wishlistIds.includes(selectedProductForDetail.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddReview={handleAddReview}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        coupons={coupons}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={setAppliedCoupon}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        appliedCoupon={appliedCoupon}
        onOrderPlaced={handleOrderPlaced}
        storeSettings={storeSettings}
        customerProfile={customerProfile}
      />

      {/* User Profile & Shopping History Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={customerProfile}
        onSaveProfile={(updated) => {
          setCustomerProfile(updated);
          setCustomerProfiles(prev => {
            const exists = prev.some(p => p.id === updated.id || p.email.toLowerCase() === updated.email.toLowerCase());
            if (exists) {
              return prev.map(p => (p.id === updated.id || p.email.toLowerCase() === updated.email.toLowerCase()) ? { ...p, ...updated } : p);
            } else {
              return [updated, ...prev];
            }
          });
          setAdminUsers(prev => prev.map(a => 
            (a.email.toLowerCase() === updated.email.toLowerCase()) 
              ? { ...a, fullName: updated.fullName, email: updated.email }
              : a
          ));
          showToast('Customer profile updated & automatically synced to Admin page!');
        }}
        orders={orders}
        onOpenOrderTracker={() => {
          setIsProfileOpen(false);
          setIsOrderTrackerOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        orders={orders}
      />

      {/* Kiru AI Assistant Chat Window */}
      <AIAssistantChat
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        products={products}
        onSelectProduct={(p) => {
          setSelectedProductForDetail(p);
          setIsAIChatOpen(false);
        }}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      {/* Store Admin Owner Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={(newP) => {
          setProducts(prev => [newP, ...prev]);
          showToast(`Added ${newP.name} to catalog!`);
        }}
        onUpdateProduct={(updatedP) => {
          setProducts(prev => prev.map(p => p.id === updatedP.id ? updatedP : p));
          showToast(`Updated product "${updatedP.name}" details & coupon!`);
        }}
        onDeleteProduct={(pId) => {
          setProducts(prev => prev.filter(p => p.id !== pId));
          showToast('Product removed from catalog.');
        }}
        promoBanner={promoBanner}
        onUpdatePromoBanner={(updatedBanner) => {
          setPromoBanner(updatedBanner);
          showToast('Storefront promotion banner updated successfully!');
        }}
        orders={orders}
        onUpdateOrderStatus={(oId, status) => {
          setOrders(prev => prev.map(o => o.id === oId ? { ...o, status } : o));
          showToast(`Updated order ${oId} status to ${status}`);
        }}
        coupons={coupons}
        onAddCoupon={(newC) => {
          setCoupons(prev => [newC, ...prev]);
          showToast(`Coupon ${newC.code} created!`);
        }}
        storeSettings={storeSettings}
        onUpdateStoreSettings={(updated) => {
          setStoreSettings(updated);
          showToast('Payment accounts & social links updated!');
        }}
        adminUsers={adminUsers}
        onAddAdminUser={(newAdmin) => {
          setAdminUsers(prev => [newAdmin, ...prev]);
          showToast(`Added admin ${newAdmin.fullName}!`);
        }}
        onDeleteAdminUser={(adminId) => {
          setAdminUsers(prev => prev.filter(a => a.id !== adminId));
          showToast('Admin user deleted.');
        }}
        onUpdateAdminPasswordEmail={(adminId, newEmail, newPassword) => {
          setAdminUsers(prev => prev.map(a => a.id === adminId ? { ...a, email: newEmail, password: newPassword } : a));
          showToast('Admin login email & password updated successfully!');
        }}
        currentRole={customerProfile.role || 'super_admin'}
        customerProfiles={customerProfiles}
        onToggleAdminRole={handleToggleAdminRole}
        onAddCustomerProfile={handleAddCustomerProfile}
        onDeleteCustomerProfile={handleDeleteCustomerProfile}
        onSwitchActiveUser={handleSwitchActiveUser}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        onOpenAIChat={() => setIsAIChatOpen(true)}
        storeSettings={storeSettings}
        userEmail={customerProfile?.email}
      />

    </div>
  );
}
