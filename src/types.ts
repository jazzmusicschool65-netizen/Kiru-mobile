export type CategoryType = 
  | 'smartphones' 
  | 'accessories' 
  | 'electronics';

export type SmartphoneBrand = 
  | 'Apple' 
  | 'Samsung' 
  | 'Xiaomi' 
  | 'Tecno' 
  | 'Infinix' 
  | 'Oppo' 
  | 'Vivo' 
  | 'Realme' 
  | 'Nokia' 
  | 'Other';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductStorageOption {
  label: string; // e.g. "128GB / 8GB RAM"
  priceAdjustment: number; // ETB difference from base
}

export interface ProductSpecs {
  screen?: string;
  processor?: string;
  ramStorage?: string;
  mainCamera?: string;
  selfieCamera?: string;
  battery?: string;
  os?: string;
  connectivity?: string;
  warranty?: string;
  [key: string]: string | undefined;
}

export interface ProductReview {
  id: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  brand: string;
  price: number; // in ETB
  discountPrice?: number; // in ETB
  couponCode?: string; // Product specific coupon code (e.g. "KIRU-10")
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  specialOffer?: boolean;
  images: string[];
  colors: ProductColor[];
  storageOptions: ProductStorageOption[];
  specs: ProductSpecs;
  description: string;
  warrantyInfo: string;
  deliveryInfo: string;
  rating: number;
  reviewsCount: number;
  reviews: ProductReview[];
}

export interface CartItem {
  id: string; // unique item id (product.id + color + storage)
  product: Product;
  selectedColor: ProductColor;
  selectedStorage: ProductStorageOption;
  quantity: number;
}

export type DeliveryOptionType = 'same_city' | 'regional' | 'nationwide';

export interface DeliveryDetails {
  customerName: string;
  phoneNumber: string;
  city: string; // e.g. Hossana, Hawassa, Addis Ababa
  subCityOrZone: string;
  deliveryAddress: string;
  deliveryMethod: DeliveryOptionType;
  deliveryFee: number;
  specialInstructions?: string;
  gpsLocation?: {
    latitude: number;
    longitude: number;
    accuracy: number;
    googleMapsUrl: string;
    satelliteInfo?: string;
  };
}

export type PaymentMethodType = 'telebirr' | 'cbe_birr' | 'bank_transfer' | 'cash_on_delivery';

export interface PaymentDetails {
  method: PaymentMethodType;
  transactionReference?: string; // for Telebirr / CBE / Bank transfer
  paymentScreenshotUrl?: string; // for proof of payment
  senderNameOrPhone?: string;
  isPaid: boolean;
}

export type OrderStatusType = 'pending' | 'approved' | 'preparing' | 'delivering' | 'delivered' | 'cancelled' | 'placed';

export interface Order {
  id: string; // e.g. KM-89231
  items: CartItem[];
  subtotal: number; // ETB
  deliveryFee: number; // ETB
  discountAmount: number; // ETB
  totalAmount: number; // ETB
  deliveryDetails: DeliveryDetails;
  paymentDetails: PaymentDetails;
  status: OrderStatusType;
  createdAt: string;
  updatedAt: string;
  trackingNumber: string;
  customerGmail?: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  recommendedProducts?: Product[];
  timestamp: string;
}

export interface DiscountCoupon {
  code: string;
  percentage: number;
  description: string;
  minOrderETB: number;
  active: boolean;
}

export interface SocialLinkItem {
  id: string;
  platform: string;
  url: string;
  active: boolean;
}

export interface StoreSettings {
  telebirrMerchantCode: string;
  telebirrMerchantName: string;
  cbeAccountNumber: string;
  cbeAccountName: string;
  dashenAccountNumber: string;
  dashenAccountName: string;
  boaAccountNumber: string;
  boaAccountName: string;
  socialLinks: {
    tiktok: string;
    facebook: string;
    instagram: string;
    telegram: string;
    youtube: string;
  };
  socialLinksList?: SocialLinkItem[];
  supportPhone1: string;
  supportPhone2: string;
  supportEmail: string;
  storeLocation: string;
  satelliteMapUrl: string;
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: 'super_admin' | 'admin' | 'seller' | 'delivery_manager';
  lastLogin?: string;
}

export interface CustomerProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string;
  city: string;
  subCityOrZone: string;
  deliveryAddress: string;
  gpsLocation?: {
    latitude: number;
    longitude: number;
    accuracy: number;
    googleMapsUrl: string;
  };
  createdAt: string;
  role?: 'customer' | 'admin' | 'super_admin' | 'seller';
  lastActive?: string;
}

export interface PromoBanner {
  id: string;
  badgeText: string;
  title: string;
  highlightText: string;
  subtitle: string;
  bannerImageUrl: string;
  couponCode: string;
  discountBadgeText: string;
  ctaText: string;
  active: boolean;
}
