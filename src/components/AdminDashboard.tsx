import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Tag, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  DollarSign,
  Smartphone,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  Search,
  Filter,
  Key,
  Globe,
  Settings,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Check,
  Zap,
  LogIn,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Share2,
  Lock,
  PlusCircle,
  Link as LinkIcon
} from 'lucide-react';
import { 
  Product, 
  Order, 
  DiscountCoupon, 
  CategoryType, 
  CustomerProfile, 
  AdminUser, 
  StoreSettings,
  SocialLinkItem,
  PromoBanner
} from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  coupons: DiscountCoupon[];
  onAddCoupon: (coupon: DiscountCoupon) => void;
  customerProfiles?: CustomerProfile[];
  onToggleAdminRole?: (profile: CustomerProfile, newRole: 'admin' | 'customer' | 'seller' | 'super_admin') => void;
  onAddCustomerProfile?: (profile: CustomerProfile) => void;
  onDeleteCustomerProfile?: (profileId: string) => void;
  onSwitchActiveUser?: (profile: CustomerProfile) => void;
  storeSettings?: StoreSettings;
  onUpdateStoreSettings?: (settings: StoreSettings) => void;
  adminUsers?: AdminUser[];
  onAddAdminUser?: (admin: AdminUser) => void;
  onDeleteAdminUser?: (adminId: string) => void;
  onUpdateAdminPasswordEmail?: (adminId: string, email: string, pass: string) => void;
  promoBanner?: PromoBanner;
  onUpdatePromoBanner?: (banner: PromoBanner) => void;
  currentRole?: 'customer' | 'admin' | 'super_admin' | 'seller';
  userEmail?: string;
}

// Reusable Product Image Upload & Gallery Component
interface ImageUploaderProps {
  images: string[];
  onChangeImages: (newImages: string[]) => void;
  label?: string;
}

const ProductImageUploader: React.FC<ImageUploaderProps> = ({ images, onChangeImages, label = 'Product Photos & Upload' }) => {
  const [urlInput, setUrlInput] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Str = event.target?.result as string;
        if (base64Str) {
          onChangeImages([...images, base64Str]);
        }
      };
      reader.readAsDataURL(file as Blob);
    });
    e.target.value = '';
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    onChangeImages([...images, urlInput.trim()]);
    setUrlInput('');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    onChangeImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetPrimary = (indexToPrimary: number) => {
    if (indexToPrimary === 0) return;
    const copy = [...images];
    const [selected] = copy.splice(indexToPrimary, 1);
    copy.unshift(selected);
    onChangeImages(copy);
  };

  return (
    <div className="space-y-2 p-3 rounded-xl bg-neutral-900 border border-neutral-800">
      <div className="flex items-center justify-between">
        <label className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
          <Upload className="w-4 h-4 text-amber-400" />
          {label} ({images.length} {images.length === 1 ? 'photo' : 'photos'})
        </label>
        <span className="text-[10px] text-neutral-400">File upload (Device) or Image URL</span>
      </div>

      {/* Upload Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Local Device File Upload Button */}
        <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-neutral-950 border border-amber-500/40 border-dashed text-amber-300 font-bold text-xs hover:bg-neutral-800 cursor-pointer transition-colors shadow-sm">
          <Upload className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Upload Image File from Device</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {/* URL Input */}
        <div className="flex items-center gap-1">
          <input
            type="text"
            placeholder="Or paste image URL (https://...)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddUrl(); } }}
            className="flex-1 px-3 py-1.5 bg-neutral-950 rounded-lg border border-neutral-800 text-white text-xs focus:outline-none focus:border-amber-500"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs hover:bg-amber-500 hover:text-black transition-colors"
          >
            Add URL
          </button>
        </div>
      </div>

      {/* Thumbnails Gallery */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800">
          {images.map((imgUrl, idx) => (
            <div key={idx} className="relative group w-20 h-20 rounded-lg overflow-hidden border border-neutral-800 bg-black shrink-0">
              <img src={imgUrl} alt={`Product ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              
              {/* Badge for Main Cover */}
              {idx === 0 ? (
                <span className="absolute top-0.5 left-0.5 px-1.5 py-0.2 rounded bg-amber-500 text-black font-black text-[8px] uppercase shadow">
                  Main
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSetPrimary(idx)}
                  className="absolute top-0.5 left-0.5 px-1 py-0.2 rounded bg-black/80 text-amber-400 font-bold text-[8px] hover:bg-amber-500 hover:text-black transition-colors"
                  title="Make Main Cover Photo"
                >
                  Set Main
                </button>
              )}

              {/* Remove Photo Button */}
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-0.5 right-0.5 p-1 rounded-full bg-red-600/90 text-white hover:bg-red-700 transition-colors shadow"
                title="Remove photo"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
  coupons,
  onAddCoupon,
  customerProfiles = [],
  onToggleAdminRole,
  onAddCustomerProfile,
  onDeleteCustomerProfile,
  onSwitchActiveUser,
  storeSettings,
  onUpdateStoreSettings,
  adminUsers = [],
  onAddAdminUser,
  onDeleteAdminUser,
  onUpdateAdminPasswordEmail,
  promoBanner,
  onUpdatePromoBanner,
  currentRole = 'super_admin',
  userEmail
}) => {
  const [activeRole, setActiveRole] = useState<'super_admin' | 'admin' | 'seller'>(
    currentRole === 'seller' ? 'seller' : 'super_admin'
  );

  const isSeller = activeRole === 'seller';
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'marketing' | 'users' | 'settings' | 'banner' | 'profile'>(
    currentRole === 'seller' ? 'products' : 'users'
  );

  const currentAdminRecord = adminUsers[0] || { id: 'adm-1', email: 'admin@kirumobile.com', password: 'Password123!' };
  const [profileEmail, setProfileEmail] = useState(currentAdminRecord.email);
  const [profilePassword, setProfilePassword] = useState(currentAdminRecord.password || 'Password123!');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState(false);

  useEffect(() => {
    if (adminUsers && adminUsers.length > 0) {
      const match = adminUsers.find(a => a.role === activeRole) || adminUsers[0];
      if (match) {
        setProfileEmail(match.email);
        setProfilePassword(match.password || 'Password123!');
      }
    }
  }, [adminUsers, activeRole]);

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    const match = adminUsers.find(a => a.role === activeRole) || adminUsers[0];
    if (match && onUpdateAdminPasswordEmail) {
      onUpdateAdminPasswordEmail(match.id, profileEmail, profilePassword);
      setProfileSuccessMsg(true);
      setTimeout(() => setProfileSuccessMsg(false), 3000);
    }
  };

  useEffect(() => {
    if (isSeller && activeTab !== 'products' && activeTab !== 'profile') {
      setActiveTab('products');
    }
  }, [isSeller, activeTab]);

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Edit Product Form State
  const [editProdName, setEditProdName] = useState('');
  const [editProdBrand, setEditProdBrand] = useState('Tecno');
  const [editProdCat, setEditProdCat] = useState<CategoryType>('smartphones');
  const [editProdPrice, setEditProdPrice] = useState(15000);
  const [editProdDiscount, setEditProdDiscount] = useState<number | undefined>(undefined);
  const [editProdCoupon, setEditProdCoupon] = useState('');
  const [editProdStock, setEditProdStock] = useState(10);
  const [editProdInStock, setEditProdInStock] = useState(true);
  const [editProdImages, setEditProdImages] = useState<string[]>([]);
  const [editProdDesc, setEditProdDesc] = useState('');
  const [editProdWarranty, setEditProdWarranty] = useState('');

  // New Product Form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('Tecno');
  const [newProdCat, setNewProdCat] = useState<CategoryType>('smartphones');
  const [newProdPrice, setNewProdPrice] = useState(15000);
  const [newProdDiscount, setNewProdDiscount] = useState<number | undefined>(undefined);
  const [newProdCoupon, setNewProdCoupon] = useState('');
  const [newProdStock, setNewProdStock] = useState(10);
  const [newProdImages, setNewProdImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
  ]);
  const [newProdDesc, setNewProdDesc] = useState('');

  // Social Links State
  const [socialLinksList, setSocialLinksList] = useState<SocialLinkItem[]>(() => {
    return storeSettings?.socialLinksList && storeSettings.socialLinksList.length > 0
      ? storeSettings.socialLinksList
      : [
          { id: 'soc-1', platform: 'Telegram Channel', url: 'https://t.me/kirumobile', active: true },
          { id: 'soc-2', platform: 'TikTok Channel', url: 'https://tiktok.com/@kirumobile', active: true },
          { id: 'soc-3', platform: 'Facebook Page', url: 'https://facebook.com/kirumobile', active: true },
          { id: 'soc-4', platform: 'Instagram Page', url: 'https://instagram.com/kirumobile', active: true },
          { id: 'soc-5', platform: 'YouTube Channel', url: 'https://youtube.com/@kirumobile', active: true },
          { id: 'soc-6', platform: 'WhatsApp Support', url: 'https://wa.me/251911234567', active: true }
        ];
  });

  useEffect(() => {
    if (storeSettings?.socialLinksList && storeSettings.socialLinksList.length > 0) {
      setSocialLinksList(storeSettings.socialLinksList);
    }
  }, [storeSettings]);

  const [newSocialPlatform, setNewSocialPlatform] = useState('Telegram Channel');
  const [newSocialUrl, setNewSocialUrl] = useState('https://t.me/kirumobile');
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);
  const [editSocialPlatform, setEditSocialPlatform] = useState('');
  const [editSocialUrl, setEditSocialUrl] = useState('');

  const handleAddSocialLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSocialPlatform.trim() || !newSocialUrl.trim()) return;

    const newLink: SocialLinkItem = {
      id: `soc-${Date.now()}`,
      platform: newSocialPlatform.trim(),
      url: newSocialUrl.trim(),
      active: true
    };

    const updated = [...socialLinksList, newLink];
    setSocialLinksList(updated);
    setNewSocialPlatform('Telegram Channel');
    setNewSocialUrl('https://');

    if (onUpdateStoreSettings && storeSettings) {
      onUpdateStoreSettings({
        ...storeSettings,
        socialLinksList: updated
      });
    }
  };

  const handleDeleteSocialLink = (id: string) => {
    const updated = socialLinksList.filter(s => s.id !== id);
    setSocialLinksList(updated);
    if (onUpdateStoreSettings && storeSettings) {
      onUpdateStoreSettings({
        ...storeSettings,
        socialLinksList: updated
      });
    }
  };

  const handleToggleSocialActive = (id: string) => {
    const updated = socialLinksList.map(s => s.id === id ? { ...s, active: !s.active } : s);
    setSocialLinksList(updated);
    if (onUpdateStoreSettings && storeSettings) {
      onUpdateStoreSettings({
        ...storeSettings,
        socialLinksList: updated
      });
    }
  };

  const handleStartEditSocial = (s: SocialLinkItem) => {
    setEditingSocialId(s.id);
    setEditSocialPlatform(s.platform);
    setEditSocialUrl(s.url);
  };

  const handleSaveEditSocial = (id: string) => {
    const updated = socialLinksList.map(s => s.id === id ? { ...s, platform: editSocialPlatform, url: editSocialUrl } : s);
    setSocialLinksList(updated);
    setEditingSocialId(null);
    if (onUpdateStoreSettings && storeSettings) {
      onUpdateStoreSettings({
        ...storeSettings,
        socialLinksList: updated
      });
    }
  };

  // Promo Banner State
  const [bannerBadge, setBannerBadge] = useState(promoBanner?.badgeText || 'AURORA TECH • LUXURY SERIES IN HOSSANA');
  const [bannerTitle, setBannerTitle] = useState(promoBanner?.title || 'Unveiling The');
  const [bannerHighlight, setBannerHighlight] = useState(promoBanner?.highlightText || 'Aura Series Luxury Tech');
  const [bannerSubtitle, setBannerSubtitle] = useState(promoBanner?.subtitle || 'Experience the pinnacle of luxury tech. Buy 100% original flagship smartphones, gold-edition wireless earbuds, and premium accessories with 1-Year Local Warranty in Hossana.');
  const [bannerImage, setBannerImage] = useState(promoBanner?.bannerImageUrl || '/src/assets/images/luxury_gold_banner_1786555790519.jpg');
  const [bannerCoupon, setBannerCoupon] = useState(promoBanner?.couponCode || 'AURA-LUXURY2026');
  const [bannerDiscountBadge, setBannerDiscountBadge] = useState(promoBanner?.discountBadgeText || 'AURA X | AURA BUDS');
  const [bannerCta, setBannerCta] = useState(promoBanner?.ctaText || 'Explore Collection');
  const [bannerActive, setBannerActive] = useState(promoBanner?.active ?? true);
  const [savedBannerMsg, setSavedBannerMsg] = useState(false);

  useEffect(() => {
    if (promoBanner) {
      setBannerBadge(promoBanner.badgeText);
      setBannerTitle(promoBanner.title);
      setBannerHighlight(promoBanner.highlightText);
      setBannerSubtitle(promoBanner.subtitle);
      setBannerImage(promoBanner.bannerImageUrl);
      setBannerCoupon(promoBanner.couponCode);
      setBannerDiscountBadge(promoBanner.discountBadgeText);
      setBannerCta(promoBanner.ctaText);
      setBannerActive(promoBanner.active);
    }
  }, [promoBanner]);

  // Open Product Edit Modal
  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setEditProdName(p.name);
    setEditProdBrand(p.brand);
    setEditProdCat(p.category);
    setEditProdPrice(p.price);
    setEditProdDiscount(p.discountPrice);
    setEditProdCoupon(p.couponCode || `KIRU-${p.brand.toUpperCase()}`);
    setEditProdStock(p.stockCount);
    setEditProdInStock(p.inStock);
    setEditProdImages(p.images && p.images.length > 0 ? p.images : ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80']);
    setEditProdDesc(p.description || '');
    setEditProdWarranty(p.warrantyInfo || '1 Year Warranty');
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editProdName) return;

    const updated: Product = {
      ...editingProduct,
      name: editProdName,
      brand: editProdBrand,
      category: editProdCat,
      price: Number(editProdPrice),
      discountPrice: editProdDiscount ? Number(editProdDiscount) : undefined,
      couponCode: editProdCoupon.toUpperCase(),
      stockCount: Number(editProdStock),
      inStock: Number(editProdStock) > 0 && editProdInStock,
      images: editProdImages.length > 0 ? editProdImages : editingProduct.images,
      description: editProdDesc,
      warrantyInfo: editProdWarranty
    };

    onUpdateProduct(updated);
    setEditingProduct(null);
  };

  const handleSavePromoBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdatePromoBanner) {
      onUpdatePromoBanner({
        id: promoBanner?.id || 'pb-01',
        badgeText: bannerBadge,
        title: bannerTitle,
        highlightText: bannerHighlight,
        subtitle: bannerSubtitle,
        bannerImageUrl: bannerImage,
        couponCode: bannerCoupon.toUpperCase(),
        discountBadgeText: bannerDiscountBadge,
        ctaText: bannerCta,
        active: bannerActive
      });
      setSavedBannerMsg(true);
      setTimeout(() => setSavedBannerMsg(false), 3000);
    }
  };

  // Users Filter & Add State
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'customer' | 'admin'>('all');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('+251 9');
  const [newUserCity, setNewUserCity] = useState('Hossana');
  const [newUserRole, setNewUserRole] = useState<'customer' | 'admin'>('customer');



  const getProductCouponCode = (p: Product) => {
    if (p.couponCode && p.couponCode.trim()) return p.couponCode.toUpperCase();
    const brandClean = (p.brand || 'KIRU').toUpperCase().replaceAll(/[^A-Z0-9]/g, '');
    const idClean = p.id ? p.id.replaceAll(/[^a-zA-Z0-9]/g, '').slice(-3).toUpperCase() : '01';
    return `KIRU-${brandClean}${idClean}`;
  };

  // Coupon state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponPct, setNewCouponPct] = useState(10);

  // Settings State
  const [telebirrCode, setTelebirrCode] = useState(storeSettings?.telebirrMerchantCode || '554890');
  const [cbeAcc, setCbeAcc] = useState(storeSettings?.cbeAccountNumber || '100049283741');
  const [cbeName, setCbeName] = useState(storeSettings?.cbeAccountName || 'KIRU MOBILE ELECTRONICS');
  const [dashenAcc, setDashenAcc] = useState(storeSettings?.dashenAccountNumber || '5294029102');
  const [boaAcc, setBoaAcc] = useState(storeSettings?.boaAccountNumber || '891029301');
  const [supportPhone1, setSupportPhone1] = useState(storeSettings?.supportPhone1 || '+251 911 234 567');
  const [supportPhone2, setSupportPhone2] = useState(storeSettings?.supportPhone2 || '+251 922 888 999');
  const [storeLocation, setStoreLocation] = useState(storeSettings?.storeLocation || 'Main Street, Near Commercial Bank of Ethiopia, Hossana, SNNPR, Ethiopia');
  const [satelliteMapUrl, setSatelliteMapUrl] = useState(storeSettings?.satelliteMapUrl || 'https://maps.google.com/?q=Hossana+Ethiopia&t=k');
  const [savedSettingsMsg, setSavedSettingsMsg] = useState(false);

  if (!isOpen) return null;

  // Revenue analytics
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalOrdersCount = orders.length;

  // Users calculations
  const totalUsersCount = customerProfiles.length;
  const adminUsersCount = customerProfiles.filter(p => p.role === 'admin' || p.role === 'super_admin').length;
  const customerUsersCount = totalUsersCount - adminUsersCount;

  // Filtered users list
  const filteredUsers = customerProfiles.filter(u => {
    const query = userSearchQuery.trim().toLowerCase();
    const matchesQuery = query === '' || (
      u.fullName.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.phoneNumber.includes(query) ||
      u.city.toLowerCase().includes(query)
    );

    const isUserAdmin = u.role === 'admin' || u.role === 'super_admin';
    const matchesRole = userRoleFilter === 'all' || 
      (userRoleFilter === 'admin' && isUserAdmin) || 
      (userRoleFilter === 'customer' && !isUserAdmin);

    return matchesQuery && matchesRole;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;

    const autoCoupon = newProdCoupon.trim()
      ? newProdCoupon.toUpperCase()
      : `KIRU-${newProdBrand.toUpperCase().replaceAll(/[^A-Z0-9]/g, '')}-${Math.floor(100 + Math.random() * 900)}`;

    const newProduct: Product = {
      id: `km-custom-${Date.now()}`,
      name: newProdName,
      brand: newProdBrand,
      category: newProdCat,
      price: Number(newProdPrice),
      discountPrice: newProdDiscount ? Number(newProdDiscount) : undefined,
      couponCode: autoCoupon,
      inStock: newProdStock > 0,
      stockCount: Number(newProdStock),
      images: newProdImages.length > 0 ? newProdImages : ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'],
      colors: [{ name: 'Black', hex: '#000000' }],
      storageOptions: [{ label: '128GB / 8GB RAM', priceAdjustment: 0 }],
      specs: { warranty: '1-Year Kiru Mobile Warranty' },
      description: newProdDesc || 'High quality original electronics product in Kiru Mobile Hossana.',
      warrantyInfo: '1 Year Kiru Mobile Warranty',
      deliveryInfo: 'Fast local delivery in Hossana',
      rating: 5.0,
      reviewsCount: 1,
      reviews: []
    };

    onAddProduct(newProduct);
    setIsAddProductOpen(false);
    setNewProdName('');
    setNewProdCoupon('');
    setNewProdDesc('');
    setNewProdImages(['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80']);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    onAddCoupon({
      code: newCouponCode.toUpperCase(),
      percentage: Number(newCouponPct),
      description: `${newCouponPct}% Discount Code`,
      minOrderETB: 1000,
      active: true
    });
    setNewCouponCode('');
  };

  const handleCreateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const newUser: CustomerProfile = {
      id: `cust-${Date.now()}`,
      fullName: newUserName,
      email: newUserEmail,
      phoneNumber: newUserPhone,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      city: newUserCity,
      subCityOrZone: 'Central',
      deliveryAddress: 'Hossana, Ethiopia',
      createdAt: new Date().toISOString(),
      role: newUserRole,
      lastActive: 'Just registered'
    };

    if (onAddCustomerProfile) {
      onAddCustomerProfile(newUser);
    }
    if (newUserRole === 'admin' && onToggleAdminRole) {
      onToggleAdminRole(newUser, 'admin');
    }

    setIsAddUserOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('+251 9');
  };

  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateStoreSettings && storeSettings) {
      onUpdateStoreSettings({
        ...storeSettings,
        telebirrMerchantCode: telebirrCode,
        cbeAccountNumber: cbeAcc,
        cbeAccountName: cbeName,
        dashenAccountNumber: dashenAcc,
        boaAccountNumber: boaAcc,
        supportPhone1,
        supportPhone2,
        storeLocation,
        satelliteMapUrl
      });
      setSavedSettingsMsg(true);
      setTimeout(() => setSavedSettingsMsg(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto text-white">
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Admin Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 bg-neutral-950">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-amber-400 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-amber-400 animate-pulse" />
                Kiru Mobile Admin Portal
              </h2>
              {isSeller ? (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold text-xs">
                  🛍️ Seller Role
                </span>
              ) : activeRole === 'admin' ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
                  ⚡ Store Admin
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-xs">
                  👑 Super Admin
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              {isSeller
                ? 'Seller Role: Limited to adding products with device image upload and editing products'
                : 'Super Admin Access: Full permission to manage users, products, social links, orders & settings • Hossana'}
            </p>
          </div>

          {/* Role Switcher Toolbar */}
          <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <span className="text-[10px] text-neutral-400 font-extrabold uppercase px-2">Role Mode:</span>
            <button
              type="button"
              onClick={() => { setActiveRole('super_admin'); setActiveTab('users'); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                activeRole === 'super_admin' ? 'bg-amber-500 text-black shadow-md' : 'text-neutral-400 hover:text-white'
              }`}
            >
              👑 Super Admin
            </button>
            <button
              type="button"
              onClick={() => { setActiveRole('admin'); setActiveTab('users'); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                activeRole === 'admin' ? 'bg-emerald-500 text-black shadow-md' : 'text-neutral-400 hover:text-white'
              }`}
            >
              ⚡ Admin
            </button>
            <button
              type="button"
              onClick={() => { setActiveRole('seller'); setActiveTab('products'); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                activeRole === 'seller' ? 'bg-blue-500 text-white shadow-md' : 'text-neutral-400 hover:text-white'
              }`}
            >
              🛍️ Seller
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white hover:bg-amber-500 hover:text-black transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Analytics Header Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-neutral-950/80 border-b border-neutral-800 text-xs">
          <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
            <div className="text-neutral-500 font-semibold">Total ETB Sales</div>
            <div className="text-lg font-black text-amber-400 mt-1">{totalRevenue.toLocaleString()} ETB</div>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
            <div className="text-neutral-500 font-semibold">Registered Users</div>
            <div className="text-lg font-black text-white mt-1 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              {totalUsersCount} Users
            </div>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
            <div className="text-neutral-500 font-semibold">Active Admins</div>
            <div className="text-lg font-black text-emerald-400 mt-1 flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              {adminUsersCount} Admins
            </div>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
            <div className="text-neutral-500 font-semibold">Total Orders</div>
            <div className="text-lg font-black text-amber-300 mt-1">{totalOrdersCount}</div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-neutral-800 text-xs font-bold px-4 bg-neutral-950 overflow-x-auto">
          {!isSeller && (
            <button
              onClick={() => setActiveTab('users')}
              className={`py-3 px-4 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'users' ? 'border-amber-500 text-amber-400' : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Users className="w-4 h-4" />
              Users & Roles ({customerProfiles.length})
            </button>
          )}
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'products' ? 'border-amber-500 text-amber-400' : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Products Inventory ({products.length})
          </button>
          {!isSeller && (
            <>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-3 px-4 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'orders' ? 'border-amber-500 text-amber-400' : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Clock className="w-4 h-4" />
                Customer Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('banner')}
                className={`py-3 px-4 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'banner' ? 'border-amber-500 text-amber-400' : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-400" />
                Hero Promo Banner
              </button>
              <button
                onClick={() => setActiveTab('marketing')}
                className={`py-3 px-4 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'marketing' ? 'border-amber-500 text-amber-400' : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Tag className="w-4 h-4" />
                Discounts & Promo
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-3 px-4 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'settings' ? 'border-amber-500 text-amber-400' : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Settings className="w-4 h-4" />
                Payment Accounts Settings
              </button>
            </>
          )}
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'profile' ? 'border-amber-500 text-amber-400' : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            Login Password & Gmail (Profile)
          </button>
        </div>

        {/* Main Tab Content */}
        <div className="p-4 sm:p-6 max-h-[65vh] overflow-y-auto space-y-4">

          {/* TAB: PROFILE / LOGIN CREDENTIALS (GMAIL & PASSWORD) */}
          {activeTab === 'profile' && (
            <form onSubmit={handleUpdateCredentials} className="space-y-4 text-xs max-w-xl mx-auto p-6 rounded-2xl bg-neutral-950 border border-amber-500/30 shadow-xl">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
                <Lock className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-black text-amber-400">Change Admin / Seller Login Credentials</h3>
                  <p className="text-[11px] text-neutral-400">Update your login email (Gmail) and secure password for accessing the portal.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-neutral-300 font-semibold flex items-center gap-1.5 mb-1">
                    <Mail className="w-3.5 h-3.5 text-amber-400" /> Login Email (Gmail)
                  </label>
                  <input
                    type="email"
                    required
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-900 rounded-xl border border-neutral-800 text-white font-mono focus:outline-none focus:border-amber-500"
                    placeholder="admin@kirumobile.com"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold flex items-center gap-1.5 mb-1">
                    <Key className="w-3.5 h-3.5 text-amber-400" /> New Login Password
                  </label>
                  <input
                    type="text"
                    required
                    value={profilePassword}
                    onChange={(e) => setProfilePassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-900 rounded-xl border border-neutral-800 text-white font-mono focus:outline-none focus:border-amber-500"
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              {profileSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Login email and password updated successfully!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 text-black font-extrabold text-xs hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Check className="w-4 h-4" />
                Save New Login Credentials
              </button>
            </form>
          )}

          {/* TAB 0: LOGGED-IN USERS & MAKE ADMIN */}
          {activeTab === 'users' && (
            <div className="space-y-4 text-xs">
              
              {/* Header & Controls Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search users by name, gmail, phone, or city..."
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Role Filter & Add User Button */}
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value as any)}
                    className="px-2.5 py-1.5 bg-neutral-900 text-amber-300 font-bold rounded-lg border border-neutral-800 text-xs cursor-pointer"
                  >
                    <option value="all">All Users ({totalUsersCount})</option>
                    <option value="customer">Customers Only ({customerUsersCount})</option>
                    <option value="admin">Admins Only ({adminUsersCount})</option>
                  </select>

                  <button
                    onClick={() => setIsAddUserOpen(!isAddUserOpen)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 text-black font-extrabold text-xs flex items-center gap-1.5 hover:bg-amber-400 transition-colors shrink-0"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Register User
                  </button>
                </div>
              </div>

              {/* Add User Collapsible Form */}
              {isAddUserOpen && (
                <form onSubmit={handleCreateUserSubmit} className="p-4 rounded-xl bg-neutral-950 border border-amber-500/40 space-y-3 text-xs">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4" />
                    Register & Create New User / Admin Account
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-neutral-400 text-[10px]">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alazar Tadesse"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        className="w-full mt-1 px-3 py-2 bg-neutral-900 rounded-lg border border-neutral-800 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-neutral-400 text-[10px]">Gmail / Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="user@gmail.com"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        className="w-full mt-1 px-3 py-2 bg-neutral-900 rounded-lg border border-neutral-800 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-neutral-400 text-[10px]">Phone Number (Stay Phone) *</label>
                      <input
                        type="text"
                        required
                        value={newUserPhone}
                        onChange={(e) => setNewUserPhone(e.target.value)}
                        className="w-full mt-1 px-3 py-2 bg-neutral-900 rounded-lg border border-neutral-800 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-neutral-400 text-[10px]">Assign Initial Role *</label>
                      <select
                        value={newUserRole}
                        onChange={(e) => setNewUserRole(e.target.value as any)}
                        className="w-full mt-1 px-3 py-2 bg-neutral-900 text-amber-300 font-bold rounded-lg border border-neutral-800"
                      >
                        <option value="customer">Standard Customer</option>
                        <option value="admin">Store Admin (Full Admin Privileges)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-500 text-black font-extrabold text-xs hover:bg-amber-400"
                  >
                    Save User Profile
                  </button>
                </form>
              )}

              {/* Users List Table */}
              <div className="overflow-x-auto rounded-xl border border-neutral-800 text-xs">
                <table className="w-full text-left">
                  <thead className="bg-neutral-950 text-neutral-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">User & Avatar</th>
                      <th className="p-3">Contact (Gmail & Stay Phone)</th>
                      <th className="p-3">Location & Registered</th>
                      <th className="p-3">Current Role</th>
                      <th className="p-3">Admin Privilege Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-neutral-500">
                          No users found matching search query or role filter.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => {
                        const isAdmin = u.role === 'admin' || u.role === 'super_admin';
                        const isSuperAdmin = u.role === 'super_admin';

                        return (
                          <tr key={u.id} className="hover:bg-neutral-950/70 transition-colors">
                            <td className="p-3">
                              <div className="flex items-center gap-2.5">
                                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-amber-500/50 shrink-0">
                                  <img src={u.avatarUrl} alt={u.fullName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                </div>
                                <div>
                                  <div className="font-bold text-white flex items-center gap-1.5">
                                    {u.fullName}
                                    {isSuperAdmin && <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-300 font-mono">OWNER</span>}
                                  </div>
                                  <div className="text-[10px] text-neutral-400">ID: {u.id} • Active {u.lastActive || 'recently'}</div>
                                </div>
                              </div>
                            </td>

                            <td className="p-3">
                              <div className="space-y-0.5">
                                <div className="text-amber-300 font-semibold flex items-center gap-1">
                                  <Mail className="w-3 h-3 text-neutral-500" />
                                  {u.email}
                                </div>
                                <div className="text-neutral-400 text-[11px] flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-neutral-500" />
                                  {u.phoneNumber}
                                </div>
                              </div>
                            </td>

                            <td className="p-3">
                              <div className="space-y-0.5">
                                <div className="text-white flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-neutral-500" />
                                  {u.city} ({u.subCityOrZone || 'Hossana'})
                                </div>
                                <div className="text-neutral-500 text-[10px]">
                                  Joined {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                              </div>
                            </td>

                             <td className="p-3">
                              {isSuperAdmin ? (
                                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-[10px] flex items-center gap-1 w-max">
                                  <Zap className="w-3 h-3 text-amber-400" />
                                  Super Admin
                                </span>
                              ) : u.role === 'admin' ? (
                                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-[10px] flex items-center gap-1 w-max">
                                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                  Store Admin
                                </span>
                              ) : u.role === 'seller' ? (
                                <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold text-[10px] flex items-center gap-1 w-max">
                                  <ShoppingBag className="w-3 h-3 text-blue-400" />
                                  Seller Role
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 font-semibold text-[10px] flex items-center gap-1 w-max">
                                  <UserCheck className="w-3 h-3 text-neutral-400" />
                                  Customer
                                </span>
                              )}
                            </td>

                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                {isSuperAdmin ? (
                                  <span className="text-[11px] text-neutral-500 italic">Protected Super Owner</span>
                                ) : (
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <button
                                      type="button"
                                      onClick={() => onToggleAdminRole && onToggleAdminRole(u, 'admin')}
                                      className={`px-2 py-1 rounded-lg font-bold text-[10px] flex items-center gap-1 transition-all ${
                                        u.role === 'admin' ? 'bg-emerald-500 text-black shadow' : 'bg-neutral-900 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/20'
                                      }`}
                                      title="Set role to Store Admin"
                                    >
                                      <Zap className="w-3 h-3" /> Admin
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => onToggleAdminRole && onToggleAdminRole(u, 'seller')}
                                      className={`px-2 py-1 rounded-lg font-bold text-[10px] flex items-center gap-1 transition-all ${
                                        u.role === 'seller' ? 'bg-blue-500 text-white shadow' : 'bg-neutral-900 text-blue-400 border border-blue-500/40 hover:bg-blue-500/20'
                                      }`}
                                      title="Set role to Seller (Products Only)"
                                    >
                                      <ShoppingBag className="w-3 h-3" /> Seller
                                    </button>

                                    {u.role && u.role !== 'customer' && (
                                      <button
                                        type="button"
                                        onClick={() => onToggleAdminRole && onToggleAdminRole(u, 'customer')}
                                        className="px-2 py-1 rounded-lg bg-red-500/10 text-red-300 border border-red-500/30 font-bold hover:bg-red-500 hover:text-white transition-all text-[10px]"
                                        title="Revoke staff role and set to Customer"
                                      >
                                        Revoke
                                      </button>
                                    )}
                                  </div>
                                )}

                                {onSwitchActiveUser && (
                                  <button
                                    onClick={() => onSwitchActiveUser(u)}
                                    className="p-1 rounded bg-neutral-900 text-neutral-400 hover:text-amber-400 hover:bg-neutral-800"
                                    title="Switch / Login store session as this customer"
                                  >
                                    <LogIn className="w-3.5 h-3.5" />
                                  </button>
                                )}

                                {onDeleteCustomerProfile && !isSuperAdmin && (
                                  <button
                                    onClick={() => onDeleteCustomerProfile(u.id)}
                                    className="p-1 text-neutral-600 hover:text-red-400"
                                    title="Delete User"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 1: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Product Inventory</h3>
                <button
                  onClick={() => setIsAddProductOpen(!isAddProductOpen)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 text-black font-extrabold text-xs flex items-center gap-1 hover:bg-amber-400 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add New Product
                </button>
              </div>

              {/* Add Product Form Modal / Collapsible */}
              {isAddProductOpen && (
                <form onSubmit={handleCreateProduct} className="p-4 rounded-xl bg-neutral-950 border border-amber-500/40 space-y-3 text-xs">
                  <div className="font-bold text-amber-400">Add Product to Kiru Mobile Catalog</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Product Name (e.g. Tecno Camon 30)"
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="px-3 py-2 bg-neutral-900 rounded-lg border border-neutral-800 focus:outline-none"
                    />
                    <select
                      value={newProdBrand}
                      onChange={(e) => setNewProdBrand(e.target.value)}
                      className="px-3 py-2 bg-neutral-900 rounded-lg border border-neutral-800 focus:outline-none"
                    >
                      <option value="Tecno">Tecno</option>
                      <option value="Samsung">Samsung</option>
                      <option value="Apple">Apple</option>
                      <option value="Xiaomi">Xiaomi</option>
                      <option value="Infinix">Infinix</option>
                      <option value="Oppo">Oppo</option>
                      <option value="Vivo">Vivo</option>
                      <option value="Realme">Realme</option>
                      <option value="Anker">Anker</option>
                      <option value="JBL">JBL</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-neutral-400 text-[10px]">Price in ETB</label>
                      <input
                        type="number"
                        required
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 text-[10px]">Discount Price (Optional ETB)</label>
                      <input
                        type="number"
                        placeholder="Discount ETB"
                        value={newProdDiscount || ''}
                        onChange={(e) => setNewProdDiscount(e.target.value ? Number(e.target.value) : undefined)}
                        className="w-full px-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 text-[10px]">Coupon Number / Code</label>
                      <input
                        type="text"
                        placeholder="Auto-generated if empty"
                        value={newProdCoupon}
                        onChange={(e) => setNewProdCoupon(e.target.value)}
                        className="w-full px-3 py-1.5 bg-neutral-900 font-mono text-amber-300 font-bold uppercase rounded-lg border border-neutral-800"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 text-[10px]">Stock Quantity</label>
                      <input
                        type="number"
                        required
                        value={newProdStock}
                        onChange={(e) => setNewProdStock(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <ProductImageUploader
                      images={newProdImages}
                      onChangeImages={setNewProdImages}
                      label="Product Photos & Gallery (Device Upload or URL)"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-amber-500 text-black font-extrabold text-xs"
                  >
                    Save Product
                  </button>
                </form>
              )}

              {/* Edit Product Modal Form */}
              {editingProduct && (
                <form onSubmit={handleSaveEditProduct} className="p-4 rounded-xl bg-neutral-950 border border-amber-500 space-y-3 text-xs shadow-2xl">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                    <div className="font-extrabold text-amber-400 text-sm flex items-center gap-1.5">
                      <Edit className="w-4 h-4" />
                      Edit Product: {editingProduct.name} ({editingProduct.id})
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="p-1 text-neutral-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-neutral-400 text-[10px]">Product Name *</label>
                      <input
                        type="text"
                        required
                        value={editProdName}
                        onChange={(e) => setEditProdName(e.target.value)}
                        className="w-full mt-1 px-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-neutral-400 text-[10px]">Brand *</label>
                      <select
                        value={editProdBrand}
                        onChange={(e) => setEditProdBrand(e.target.value)}
                        className="w-full mt-1 px-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800 text-amber-300 font-bold"
                      >
                        <option value="Tecno">Tecno</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Apple">Apple</option>
                        <option value="Xiaomi">Xiaomi</option>
                        <option value="Infinix">Infinix</option>
                        <option value="Oppo">Oppo</option>
                        <option value="Vivo">Vivo</option>
                        <option value="Realme">Realme</option>
                        <option value="Anker">Anker</option>
                        <option value="JBL">JBL</option>
                        <option value="Nokia">Nokia</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-neutral-400 text-[10px]">Category *</label>
                      <select
                        value={editProdCat}
                        onChange={(e) => setEditProdCat(e.target.value as any)}
                        className="w-full mt-1 px-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800 text-white"
                      >
                        <option value="smartphones">Smartphones</option>
                        <option value="accessories">Accessories</option>
                        <option value="electronics">Electronics</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-neutral-400 text-[10px]">Original Price (ETB) *</label>
                      <input
                        type="number"
                        required
                        value={editProdPrice}
                        onChange={(e) => setEditProdPrice(Number(e.target.value))}
                        className="w-full mt-1 px-3 py-1.5 bg-neutral-900 font-mono font-bold text-amber-300 rounded-lg border border-neutral-800"
                      />
                    </div>

                    <div>
                      <label className="text-neutral-400 text-[10px]">Discount Price (Optional ETB)</label>
                      <input
                        type="number"
                        placeholder="e.g. 26000"
                        value={editProdDiscount || ''}
                        onChange={(e) => setEditProdDiscount(e.target.value ? Number(e.target.value) : undefined)}
                        className="w-full mt-1 px-3 py-1.5 bg-neutral-900 font-mono text-emerald-400 rounded-lg border border-neutral-800"
                      />
                    </div>

                    <div>
                      <label className="text-neutral-400 text-[10px]">Product Coupon Number / Code</label>
                      <input
                        type="text"
                        placeholder="e.g. TECNO-CAMON30"
                        value={editProdCoupon}
                        onChange={(e) => setEditProdCoupon(e.target.value)}
                        className="w-full mt-1 px-3 py-1.5 bg-neutral-900 font-mono font-bold text-amber-400 uppercase rounded-lg border border-neutral-800"
                      />
                    </div>

                    <div>
                      <label className="text-neutral-400 text-[10px]">Stock Count *</label>
                      <input
                        type="number"
                        required
                        value={editProdStock}
                        onChange={(e) => setEditProdStock(Number(e.target.value))}
                        className="w-full mt-1 px-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <ProductImageUploader
                      images={editProdImages}
                      onChangeImages={setEditProdImages}
                      label="Edit Product Photos & Gallery"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 text-[10px]">Description & Features</label>
                    <textarea
                      rows={2}
                      value={editProdDesc}
                      onChange={(e) => setEditProdDesc(e.target.value)}
                      className="w-full mt-1 px-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800 text-white"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-amber-300">
                      <input
                        type="checkbox"
                        checked={editProdInStock}
                        onChange={(e) => setEditProdInStock(e.target.checked)}
                        className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
                      />
                      In Stock Available
                    </label>

                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 font-bold hover:bg-neutral-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-amber-500 text-black font-extrabold flex items-center gap-1.5 hover:bg-amber-400"
                      >
                        <Check className="w-4 h-4" />
                        Update Product
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Product Table */}
              <div className="overflow-x-auto rounded-xl border border-neutral-800 text-xs">
                <table className="w-full text-left">
                  <thead className="bg-neutral-950 text-neutral-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price (ETB)</th>
                      <th className="p-3">Coupon Code</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-neutral-950/60">
                        <td className="p-3 flex items-center gap-2">
                          <img src={p.images[0]} alt="" className="w-8 h-8 object-cover rounded bg-black" referrerPolicy="no-referrer" />
                          <div>
                            <div className="font-bold text-white">{p.name}</div>
                            <div className="text-[10px] text-amber-400">{p.brand}</div>
                          </div>
                        </td>
                        <td className="p-3 capitalize">{p.category}</td>
                        <td className="p-3 font-mono font-bold text-amber-300">
                          {(p.discountPrice || p.price).toLocaleString()} ETB
                          {p.discountPrice && (
                            <span className="block text-[10px] text-neutral-500 line-through">
                              {p.price.toLocaleString()} ETB
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded-md bg-amber-500/15 border border-amber-500/40 text-amber-300 font-mono font-extrabold text-[10px] tracking-wider inline-flex items-center gap-1 shadow-sm">
                            <Tag className="w-3 h-3 text-amber-400 shrink-0" />
                            {getProductCouponCode(p)}
                          </span>
                        </td>
                        <td className="p-3 font-semibold">
                          <span className={p.stockCount > 0 ? 'text-emerald-400' : 'text-red-400'}>
                            {p.stockCount} units
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1 text-amber-400 hover:text-amber-300 hover:bg-neutral-800 rounded transition-colors"
                              title="Edit Product Details & Coupon"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDeleteProduct(p.id)}
                              className="p-1 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Customer Order Pipeline</h3>
              {orders.length === 0 ? (
                <div className="text-center py-12 text-neutral-500">No customer orders recorded yet.</div>
              ) : (
                orders.map((o) => (
                  <div key={o.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-2">
                      <div>
                        <span className="font-mono font-bold text-amber-400 text-sm">{o.id}</span>
                        <span className="text-neutral-400 ml-2">by {o.deliveryDetails.customerName} ({o.deliveryDetails.phoneNumber})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-neutral-400 font-semibold">{o.totalAmount.toLocaleString()} ETB</span>
                        <select
                          value={o.status}
                          onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as any)}
                          className="bg-neutral-900 text-amber-300 font-bold px-2 py-1 rounded border border-neutral-700 cursor-pointer"
                        >
                          <option value="pending">Pending</option>
                          <option value="placed">Placed</option>
                          <option value="approved">Approved</option>
                          <option value="preparing">Preparing</option>
                          <option value="delivering">Delivering</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-neutral-300 space-y-1">
                      <div><strong>Address:</strong> {o.deliveryDetails.deliveryAddress}, {o.deliveryDetails.city}</div>
                      <div><strong>Payment:</strong> <span className="uppercase text-amber-400">{o.paymentDetails.method}</span> (Ref: {o.paymentDetails.transactionReference || 'N/A'})</div>
                      {o.paymentDetails.paymentScreenshotUrl && (
                        <div className="mt-1">
                           <a href={o.paymentDetails.paymentScreenshotUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sky-400 hover:text-sky-300 text-[10px]">
                             <ImageIcon className="w-3 h-3" /> View Payment Screenshot
                           </a>
                        </div>
                      )}
                      {o.status !== 'approved' && o.status !== 'delivered' && o.status !== 'cancelled' && (
                        <button
                          onClick={() => onUpdateOrderStatus(o.id, 'approved')}
                          className="px-2 py-1 mt-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold hover:bg-emerald-500 hover:text-black transition-colors"
                        >
                          Check Payment & Approve Order
                        </button>
                      )}
                    </div>

                    <div className="space-y-1 pt-1 border-t border-neutral-800/60 text-[11px] text-neutral-400">
                      {o.items.map((i, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{i.quantity}x {i.product.name} ({i.selectedStorage.label})</span>
                          <span>{((i.product.discountPrice || i.product.price) * i.quantity).toLocaleString()} ETB</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: HERO PROMOTION BANNER EDITOR */}
          {activeTab === 'banner' && (
            <form onSubmit={handleSavePromoBanner} className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    Customize Store Front Promotion Banner
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Update the main home page promotion banner title, description, image, coupon code, and discount text instantly.
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setBannerBadge('AURORA TECH • LUXURY SERIES IN HOSSANA');
                      setBannerTitle('Unveiling The');
                      setBannerHighlight('Aura Series Luxury Tech');
                      setBannerSubtitle('Experience the pinnacle of luxury tech. Buy 100% original flagship smartphones, gold-edition wireless earbuds, and premium accessories with 1-Year Local Warranty in Hossana.');
                      setBannerImage('/src/assets/images/luxury_gold_banner_1786555790519.jpg');
                      setBannerCoupon('AURA-LUXURY2026');
                      setBannerDiscountBadge('AURA X | AURA BUDS');
                      setBannerCta('Explore Collection');
                      setBannerActive(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-extrabold text-[11px] border border-amber-500/30 flex items-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Load Aurora Luxury Gold Preset
                  </button>

                  <label className="flex items-center gap-2 cursor-pointer bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800">
                    <input
                      type="checkbox"
                      checked={bannerActive}
                      onChange={(e) => setBannerActive(e.target.checked)}
                      className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
                    />
                    <span className="font-bold text-amber-300">Banner Enabled</span>
                  </label>
                </div>
              </div>

              {/* Banner Live Preview Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-amber-950/40 border border-amber-500/30 space-y-2">
                <div className="text-[10px] text-amber-500 uppercase font-bold tracking-widest flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Live Storefront Banner Preview
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/30">
                      {bannerBadge}
                    </span>
                    <h4 className="text-lg font-black text-white leading-tight">
                      {bannerTitle} <span className="text-amber-400">{bannerHighlight}</span>
                    </h4>
                    <p className="text-neutral-300 text-[11px] line-clamp-2">
                      {bannerSubtitle}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-black font-extrabold text-[11px]">
                        {bannerCta}
                      </span>
                      {bannerCoupon && (
                        <span className="px-2 py-1 rounded-lg bg-neutral-900 border border-amber-500/50 text-amber-300 font-mono font-bold text-[10px]">
                          CODE: {bannerCoupon}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-amber-500/30 bg-black">
                    <img src={bannerImage} alt="Banner" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute bottom-1 left-1 right-1 px-1 py-0.5 rounded bg-black/80 text-[8px] font-black text-amber-400 text-center uppercase">
                      {bannerDiscountBadge}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div>
                  <label className="text-neutral-300 font-semibold">Badge Tagline / Header Text</label>
                  <input
                    type="text"
                    required
                    value={bannerBadge}
                    onChange={(e) => setBannerBadge(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 text-white rounded-lg border border-neutral-800"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold">Main Title (First Part)</label>
                  <input
                    type="text"
                    required
                    value={bannerTitle}
                    onChange={(e) => setBannerTitle(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 text-white rounded-lg border border-neutral-800"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold">Title Highlight Text (Amber Color)</label>
                  <input
                    type="text"
                    required
                    value={bannerHighlight}
                    onChange={(e) => setBannerHighlight(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 text-amber-300 font-bold rounded-lg border border-neutral-800"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold">Banner Featured Coupon Code</label>
                  <input
                    type="text"
                    required
                    value={bannerCoupon}
                    onChange={(e) => setBannerCoupon(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 font-mono font-bold text-amber-400 uppercase rounded-lg border border-neutral-800"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold">Discount Badge Text (Overlay on Image)</label>
                  <input
                    type="text"
                    required
                    value={bannerDiscountBadge}
                    onChange={(e) => setBannerDiscountBadge(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 text-amber-300 rounded-lg border border-neutral-800"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold">CTA Button Label</label>
                  <input
                    type="text"
                    required
                    value={bannerCta}
                    onChange={(e) => setBannerCta(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 text-white rounded-lg border border-neutral-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-neutral-300 font-semibold">Banner Image URL</label>
                  <input
                    type="text"
                    required
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 text-white rounded-lg border border-neutral-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-neutral-300 font-semibold">Subtitle Description Paragraph</label>
                  <textarea
                    rows={2}
                    required
                    value={bannerSubtitle}
                    onChange={(e) => setBannerSubtitle(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 text-white rounded-lg border border-neutral-800"
                  />
                </div>
              </div>

              {savedBannerMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Hero Promotion Banner settings saved and updated on storefront!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-extrabold text-xs hover:bg-amber-400 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Save & Publish Promotion Banner
              </button>
            </form>
          )}

          {/* TAB 3: MARKETING & DISCOUNTS */}
          {activeTab === 'marketing' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Promo Coupon Manager</h3>

              <form onSubmit={handleCreateCoupon} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-wrap gap-3 items-center">
                <input
                  type="text"
                  required
                  placeholder="Coupon Code (e.g. HOSSANA15)"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="px-3 py-2 bg-neutral-900 rounded-lg border border-neutral-800 text-white uppercase text-xs"
                />

                <input
                  type="number"
                  required
                  placeholder="Discount %"
                  value={newCouponPct}
                  onChange={(e) => setNewCouponPct(Number(e.target.value))}
                  className="w-24 px-3 py-2 bg-neutral-900 rounded-lg border border-neutral-800 text-white text-xs"
                />

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-500 text-black font-extrabold text-xs"
                >
                  Create Coupon
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {coupons.map((c) => (
                  <div key={c.code} className="p-3 rounded-xl bg-neutral-950 border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-amber-400 font-mono text-sm">{c.code}</div>
                      <div className="text-[10px] text-neutral-400">{c.description}</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-bold">
                      {c.percentage}% OFF
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STORE PAYMENT ACCOUNTS SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveStoreSettings} className="space-y-4 text-xs">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Settings className="w-4 h-4" />
                Store Merchant Payment Accounts & Numbers
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div>
                  <label className="text-neutral-300 font-semibold">Telebirr Merchant Code</label>
                  <input
                    type="text"
                    required
                    value={telebirrCode}
                    onChange={(e) => setTelebirrCode(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 font-mono font-bold text-amber-300 rounded-lg border border-neutral-800"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold">CBE Account Number</label>
                  <input
                    type="text"
                    required
                    value={cbeAcc}
                    onChange={(e) => setCbeAcc(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 font-mono font-bold text-amber-300 rounded-lg border border-neutral-800"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold">CBE Account Holder Name</label>
                  <input
                    type="text"
                    required
                    value={cbeName}
                    onChange={(e) => setCbeName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 text-white rounded-lg border border-neutral-800"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold">Dashen Bank Account</label>
                  <input
                    type="text"
                    value={dashenAcc}
                    onChange={(e) => setDashenAcc(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 font-mono text-amber-300 rounded-lg border border-neutral-800"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold">Bank of Abyssinia Account</label>
                  <input
                    type="text"
                    value={boaAcc}
                    onChange={(e) => setBoaAcc(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 font-mono text-amber-300 rounded-lg border border-neutral-800"
                  />
                </div>
              </div>

              {/* Support Phones & Satellite Map Quicklink */}
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 pt-4">
                <MapPin className="w-4 h-4" />
                Store Contact Phones & Satellite Location Map Quicklink
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                <div>
                  <label className="text-neutral-300 font-semibold">Primary Support Phone</label>
                  <input
                    type="text"
                    required
                    value={supportPhone1}
                    onChange={(e) => setSupportPhone1(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 font-mono text-white rounded-lg border border-neutral-800"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold">Secondary Support Phone</label>
                  <input
                    type="text"
                    value={supportPhone2}
                    onChange={(e) => setSupportPhone2(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 font-mono text-white rounded-lg border border-neutral-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-neutral-300 font-semibold">Store Physical Address / Location</label>
                  <input
                    type="text"
                    required
                    value={storeLocation}
                    onChange={(e) => setStoreLocation(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 text-white rounded-lg border border-neutral-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-neutral-300 font-semibold flex items-center justify-between">
                    <span>Satellite Map Quicklink URL (Google Maps Satellite View)</span>
                    <a href={satelliteMapUrl} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline text-[11px]">Test Link ↗</a>
                  </label>
                  <input
                    type="text"
                    required
                    value={satelliteMapUrl}
                    onChange={(e) => setSatelliteMapUrl(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-neutral-900 font-mono text-amber-300 rounded-lg border border-neutral-800 text-xs"
                    placeholder="https://maps.google.com/?q=...&t=k"
                  />
                </div>
              </div>

              {savedSettingsMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Store payment account details updated successfully!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-extrabold text-xs hover:bg-amber-400"
              >
                Save Payment Settings
              </button>

              {/* Social Media Links Manager */}
              <div className="space-y-3 pt-6 border-t border-neutral-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Share2 className="w-4 h-4" />
                    Social Media Links Manager (Add, Edit, Delete, Toggle)
                  </h4>
                  <span className="text-[10px] text-neutral-400">Shown in Footer & Contact Bar</span>
                </div>

                {/* Add new social link form */}
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-wrap gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Platform (e.g. Telegram Channel)"
                    value={newSocialPlatform}
                    onChange={(e) => setNewSocialPlatform(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="URL (https://...)"
                    value={newSocialUrl}
                    onChange={(e) => setNewSocialUrl(e.target.value)}
                    className="flex-2 px-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800 text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddSocialLink}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 text-black font-extrabold text-xs hover:bg-amber-400 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Link
                  </button>
                </div>

                {/* List of social links */}
                <div className="space-y-2">
                  {socialLinksList.map((soc) => (
                    <div key={soc.id} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
                      {editingSocialId === soc.id ? (
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="text"
                            value={editSocialPlatform}
                            onChange={(e) => setEditSocialPlatform(e.target.value)}
                            className="w-1/3 px-2 py-1 bg-neutral-900 rounded border border-neutral-700 text-white text-xs"
                          />
                          <input
                            type="text"
                            value={editSocialUrl}
                            onChange={(e) => setEditSocialUrl(e.target.value)}
                            className="flex-1 px-2 py-1 bg-neutral-900 rounded border border-neutral-700 text-white text-xs font-mono text-amber-300"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveEditSocial(soc.id)}
                            className="px-2.5 py-1 bg-amber-500 text-black rounded font-bold text-xs"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingSocialId(null)}
                            className="px-2 py-1 bg-neutral-800 text-neutral-300 rounded text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`w-2.5 h-2.5 rounded-full ${soc.active ? 'bg-emerald-500' : 'bg-neutral-600'}`} />
                            <div>
                              <div className="font-bold text-white text-xs">{soc.platform}</div>
                              <a href={soc.url} target="_blank" rel="noreferrer" className="text-[11px] text-amber-400 hover:underline truncate block">
                                {soc.url}
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleToggleSocialActive(soc.id)}
                              className={`px-2 py-1 rounded text-[10px] font-bold ${soc.active ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-neutral-800 text-neutral-400'}`}
                            >
                              {soc.active ? 'Active' : 'Hidden'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStartEditSocial(soc)}
                              className="p-1.5 text-neutral-400 hover:text-amber-400 hover:bg-neutral-900 rounded"
                              title="Edit link"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteSocialLink(soc.id)}
                              className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-900 rounded"
                              title="Delete social link"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};

