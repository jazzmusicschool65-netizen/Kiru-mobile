import { Product, DiscountCoupon } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // --- SMARTPHONES ---
  {
    id: 'km-sp-01',
    name: 'iPhone 15 Pro Max',
    category: 'smartphones',
    brand: 'Apple',
    couponCode: 'KIRU-IPHONE15',
    price: 138000,
    discountPrice: 129500,
    inStock: true,
    stockCount: 8,
    featured: true,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1695048065007-1662991669ef?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Natural Titanium', hex: '#BEB8AC' },
      { name: 'Gold Titanium', hex: '#D4AF37' },
      { name: 'Black Titanium', hex: '#232426' }
    ],
    storageOptions: [
      { label: '256GB / 8GB RAM', priceAdjustment: 0 },
      { label: '512GB / 8GB RAM', priceAdjustment: 18000 },
      { label: '1TB / 8GB RAM', priceAdjustment: 35000 }
    ],
    specs: {
      screen: '6.7" Super Retina XDR OLED 120Hz ProMotion',
      processor: 'Apple A17 Pro (3nm)',
      ramStorage: '8GB RAM + 256GB / 512GB / 1TB Storage',
      mainCamera: '48 MP Main + 12 MP 5x Telephoto + 12 MP Ultra Wide',
      selfieCamera: '12 MP TrueDepth Camera with autofocus',
      battery: '4422 mAh, 25W Fast Charging, MagSafe wireless',
      os: 'iOS 17 (Upgradable to iOS 18)',
      connectivity: '5G, Wi-Fi 6E, Bluetooth 5.3, USB-C 3.0',
      warranty: '1-Year Official Kiru Mobile Local Warranty'
    },
    description: 'The ultimate flagship iPhone forged in titanium. Features the revolutionary A17 Pro chip, customizable Action button, and the most powerful 5x optical zoom iPhone camera system ever created.',
    warrantyInfo: '1 Year Kiru Mobile Official Warranty in Hossana. Includes replacement for hardware defect.',
    deliveryInfo: 'Express delivery in Hossana (1-2 Hours). Free delivery across SNNPR for orders over 50,000 ETB.',
    rating: 4.9,
    reviewsCount: 38,
    reviews: [
      {
        id: 'rev-01',
        customerName: 'Abebe Tadesse',
        rating: 5,
        comment: 'Original product! Delivered to my shop in Hossana town within 1 hour. Excellent service from Kiru Mobile.',
        date: '2026-07-28',
        verifiedPurchase: true
      },
      {
        id: 'rev-02',
        customerName: 'Saba Tesfaye',
        rating: 5,
        comment: 'Telebirr payment was smooth and received receipt instantly. Phone camera quality is incredible.',
        date: '2026-08-02',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'km-sp-02',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'smartphones',
    brand: 'Samsung',
    price: 122000,
    discountPrice: 115000,
    inStock: true,
    stockCount: 12,
    featured: true,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1707227188185-e9f5e1f72ef1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Titanium Gold', hex: '#E6CB98' },
      { name: 'Titanium Black', hex: '#2A2B2D' },
      { name: 'Titanium Gray', hex: '#777A7E' }
    ],
    storageOptions: [
      { label: '256GB / 12GB RAM', priceAdjustment: 0 },
      { label: '512GB / 12GB RAM', priceAdjustment: 15000 }
    ],
    specs: {
      screen: '6.8" Dynamic AMOLED 2X 120Hz, 2600 nits',
      processor: 'Snapdragon 8 Gen 3 for Galaxy',
      ramStorage: '12GB RAM + 256GB / 512GB UFS 4.0 Storage',
      mainCamera: '200 MP Main + 50 MP Periscope 5x + 10 MP 3x + 12 MP Ultra Wide',
      selfieCamera: '12 MP Dual Pixel AF',
      battery: '5000 mAh, 45W Fast Charging + S-Pen Included',
      os: 'Android 14, One UI 6.1 with Galaxy AI',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.3, Ultra Wideband',
      warranty: '1-Year Kiru Mobile Official Warranty'
    },
    description: 'Unleash new possibilities with Galaxy AI. 200MP camera, built-in S Pen, Titanium frame, and bright Dynamic AMOLED 2X display optimized for work, gaming, and creative photography.',
    warrantyInfo: '1 Year Kiru Mobile Warranty. Genuine Samsung Global Version.',
    deliveryInfo: 'Fast delivery in Hossana & Hawassa. CBE Birr / Telebirr accepted.',
    rating: 4.8,
    reviewsCount: 29,
    reviews: [
      {
        id: 'rev-03',
        customerName: 'Mulugeta Worku',
        rating: 5,
        comment: 'Galaxy AI live translation and camera zoom are insane. Very fast delivery in Hossana.',
        date: '2026-08-05',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'km-sp-03',
    name: 'Tecno Camon 30 Pro 5G',
    category: 'smartphones',
    brand: 'Tecno',
    price: 28500,
    discountPrice: 26500,
    inStock: true,
    stockCount: 15,
    featured: true,
    specialOffer: true,
    newArrival: true,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Alps Gold', hex: '#D2B48C' },
      { name: 'Basalt Black', hex: '#1C1C1E' }
    ],
    storageOptions: [
      { label: '256GB / 12GB RAM (Expandable 24GB)', priceAdjustment: 0 },
      { label: '512GB / 12GB RAM', priceAdjustment: 4000 }
    ],
    specs: {
      screen: '6.78" AMOLED 144Hz Smooth Display',
      processor: 'MediaTek Dimensity 8200 Ultimate 5G (4nm)',
      ramStorage: '12GB RAM (+12GB Virtual) + 256GB Storage',
      mainCamera: '50 MP Sony IMX890 OIS + 50 MP Ultra-wide + 2 MP Depth',
      selfieCamera: '50 MP Eye-AF Front Camera with Dual Flash',
      battery: '5000 mAh, 70W Ultra Fast Charge (0-100% in 45 mins)',
      os: 'HiOS 14 based on Android 14',
      connectivity: '5G, Wi-Fi 6, NFC, Dual SIM',
      warranty: '13-Month Carlcare / Kiru Mobile Warranty'
    },
    description: 'The master of mobile photography in Ethiopia! Featuring Sony IMX890 50MP OIS lens, 144Hz curved AMOLED display, 70W fast charging, and 50MP selfie camera. Perfect for content creators.',
    warrantyInfo: '13 Months Official Carlcare & Kiru Mobile Warranty.',
    deliveryInfo: 'Same-day delivery in Hossana. Cash on Delivery available.',
    rating: 4.7,
    reviewsCount: 54,
    reviews: [
      {
        id: 'rev-04',
        customerName: 'Kaleb Haile',
        rating: 5,
        comment: 'Best phone for vlogging under 30k ETB! Camera quality in low light is top tier.',
        date: '2026-08-01',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'km-sp-04',
    name: 'Tecno Spark 20 Pro',
    category: 'smartphones',
    brand: 'Tecno',
    price: 15500,
    discountPrice: 14800,
    inStock: true,
    stockCount: 20,
    bestSeller: true,
    specialOffer: true,
    images: [
      'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Sunset Gold', hex: '#FFD700' },
      { name: 'Moonlit Black', hex: '#222222' }
    ],
    storageOptions: [
      { label: '256GB / 8GB RAM (+8GB Extended)', priceAdjustment: 0 }
    ],
    specs: {
      screen: '6.78" FHD+ 120Hz Hole-Punch Display',
      processor: 'MediaTek Helio G99 Gaming Processor',
      ramStorage: '8GB RAM + 256GB Internal Storage',
      mainCamera: '108 MP Ultra Sensing Main Camera',
      selfieCamera: '32 MP Glow Selfie with Dual Flash',
      battery: '5000 mAh, 33W Fast Charge',
      os: 'Android 13 with Dynamic Port',
      connectivity: '4G LTE, Wi-Fi, Bluetooth 5.2, Dual Speakers DTS',
      warranty: '1-Year Kiru Mobile Warranty'
    },
    description: 'Ethiopias #1 budget gaming champion! Powered by Helio G99, 108MP camera, stereo speakers, and huge 256GB storage under 15,000 ETB. Exceptional value.',
    warrantyInfo: '1 Year Local Warranty in Hossana.',
    deliveryInfo: 'Fast local delivery in Hossana town.',
    rating: 4.8,
    reviewsCount: 88,
    reviews: [
      {
        id: 'rev-05',
        customerName: 'Dawit Bekele',
        rating: 5,
        comment: 'Playing PUBG and Free Fire smoothly at 60fps! Helio G99 for 14,800 ETB is unbelievable.',
        date: '2026-07-20',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'km-sp-05',
    name: 'Xiaomi Redmi Note 13 Pro+ 5G',
    category: 'smartphones',
    brand: 'Xiaomi',
    price: 42000,
    discountPrice: 38500,
    inStock: true,
    stockCount: 10,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574944985070-8f30c4397e3c?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Aurora Purple / Gold', hex: '#9B51E0' },
      { name: 'Midnight Black', hex: '#111111' }
    ],
    storageOptions: [
      { label: '256GB / 12GB RAM', priceAdjustment: 0 },
      { label: '512GB / 12GB RAM', priceAdjustment: 4500 }
    ],
    specs: {
      screen: '6.67" 1.5K 120Hz Curved CrystalRes AMOLED, IP68',
      processor: 'MediaTek Dimensity 7200 Ultra (4nm)',
      ramStorage: '12GB RAM + 256GB / 512GB UFS 3.1',
      mainCamera: '200 MP OIS Camera + 8 MP Ultra Wide + 2 MP Macro',
      selfieCamera: '16 MP HDR Selfie',
      battery: '5000 mAh, 120W HyperCharge (100% in 19 mins)',
      os: 'Xiaomi HyperOS (Android 14)',
      connectivity: '5G, Wi-Fi 6, IP68 Water/Dust resistant',
      warranty: '1-Year Kiru Mobile Warranty'
    },
    description: 'Flagship specs at mid-range price. Features a breathtaking 200MP camera with OIS, 120W hypercharging that fills the battery in 19 minutes, and IP68 water resistance.',
    warrantyInfo: '1 Year Kiru Mobile Official Warranty.',
    deliveryInfo: 'Fast delivery to Hossana, Hawassa, Wolkite, and Addis Ababa.',
    rating: 4.9,
    reviewsCount: 42,
    reviews: [
      {
        id: 'rev-06',
        customerName: 'Yared Assefa',
        rating: 5,
        comment: '120W charging is magic! Battery goes from 0% to full in less than 20 minutes.',
        date: '2026-07-25',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'km-sp-06',
    name: 'Infinix Note 40 Pro 5G',
    category: 'smartphones',
    brand: 'Infinix',
    price: 24500,
    discountPrice: 22800,
    inStock: true,
    stockCount: 14,
    newArrival: true,
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Vintage Green / Gold', hex: '#2D5A27' },
      { name: 'Titan Gold', hex: '#E5C158' }
    ],
    storageOptions: [
      { label: '256GB / 8GB RAM (+8GB Extended)', priceAdjustment: 0 }
    ],
    specs: {
      screen: '6.78" 3D Curved AMOLED 120Hz Corning Gorilla Glass',
      processor: 'MediaTek Dimensity 7020 5G',
      ramStorage: '8GB RAM + 256GB Storage',
      mainCamera: '108 MP OIS Super-Zoom Camera',
      selfieCamera: '32 MP Dual Flash Camera',
      battery: '5000 mAh, 45W All-Round FastCharge + 20W Wireless MagCharge',
      os: 'XOS 14 based on Android 14',
      connectivity: '5G, Wireless MagCharge, JBL Dual Speakers',
      warranty: '1-Year Kiru Mobile Warranty'
    },
    description: 'Revolutionary magnetic wireless charging in an affordable smartphone! Curved AMOLED display, 108MP OIS camera, JBL stereo sound, and luxury vegan leather design.',
    warrantyInfo: '1 Year Carlcare & Kiru Mobile Warranty.',
    deliveryInfo: 'Express delivery in Hossana city.',
    rating: 4.6,
    reviewsCount: 31,
    reviews: [
      {
        id: 'rev-07',
        customerName: 'Bethlehem Girma',
        rating: 5,
        comment: 'The magnetic power bank included in the box works like MagSafe. Very elegant phone!',
        date: '2026-08-03',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'km-sp-07',
    name: 'Oppo Reno 11 5G',
    category: 'smartphones',
    brand: 'Oppo',
    price: 36000,
    discountPrice: 33800,
    inStock: true,
    stockCount: 7,
    images: [
      'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Wave Green', hex: '#A8E6CF' },
      { name: 'Rock Grey', hex: '#4A4A4A' }
    ],
    storageOptions: [
      { label: '256GB / 12GB RAM', priceAdjustment: 0 }
    ],
    specs: {
      screen: '6.7" OLED 120Hz 3D Flexible Screen',
      processor: 'MediaTek Dimensity 7050',
      ramStorage: '12GB RAM + 256GB Storage',
      mainCamera: '32 MP Telephoto Portrait + 50 MP Main OIS + 8 MP Ultra Wide',
      selfieCamera: '32 MP Sony IMX709 Selfie',
      battery: '5000 mAh, 67W SUPERVOOC Charge',
      os: 'ColorOS 14',
      warranty: '1-Year Kiru Mobile Warranty'
    },
    description: 'The portrait expert! Built with a dedicated 32MP Telephoto Portrait lens, ColorOS fluid animation, and 67W SUPERVOOC fast charging.',
    warrantyInfo: '1 Year Kiru Mobile Warranty.',
    deliveryInfo: 'Regional SNNPR delivery in 24 hours.',
    rating: 4.7,
    reviewsCount: 18,
    reviews: []
  },
  {
    id: 'km-sp-08',
    name: 'Vivo V30 5G',
    category: 'smartphones',
    brand: 'Vivo',
    price: 33000,
    discountPrice: 31000,
    inStock: true,
    stockCount: 9,
    images: [
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Bloom White / Gold', hex: '#FDFBF7' },
      { name: 'Lush Green', hex: '#1B4D3E' }
    ],
    storageOptions: [
      { label: '256GB / 12GB RAM', priceAdjustment: 0 }
    ],
    specs: {
      screen: '6.78" 1.5K 120Hz Curved AMOLED',
      processor: 'Qualcomm Snapdragon 7 Gen 3',
      ramStorage: '12GB RAM + 256GB Storage',
      mainCamera: '50 MP VCS True Color OIS + 50 MP Ultra Wide + Smart Aura Light',
      selfieCamera: '50 MP Group Selfie Camera',
      battery: '5000 mAh, 80W FlashCharge',
      os: 'Funtouch OS 14',
      warranty: '1-Year Kiru Mobile Warranty'
    },
    description: 'Superb studio portrait light technology! Smart Aura Light automatically adjusts color temperature for flawless studio lighting portraits day or night.',
    warrantyInfo: '1 Year Official Warranty.',
    deliveryInfo: 'Local delivery in Hossana.',
    rating: 4.8,
    reviewsCount: 15,
    reviews: []
  },
  {
    id: 'km-sp-09',
    name: 'Realme 12 Pro+ 5G',
    category: 'smartphones',
    brand: 'Realme',
    price: 29500,
    discountPrice: 27500,
    inStock: true,
    stockCount: 11,
    images: [
      'https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Submarine Blue / Gold', hex: '#0F2C59' },
      { name: 'Navigator Beige', hex: '#F5E6CA' }
    ],
    storageOptions: [
      { label: '256GB / 8GB RAM', priceAdjustment: 0 },
      { label: '512GB / 12GB RAM', priceAdjustment: 4000 }
    ],
    specs: {
      screen: '6.7" OLED 120Hz Curved Display',
      processor: 'Snapdragon 7s Gen 2 (4nm)',
      ramStorage: '8GB / 12GB RAM + 256GB / 512GB Storage',
      mainCamera: '64 MP Periscope Telephoto (3x Optical, 120x Zoom) + 50 MP Sony IMX890 OIS',
      selfieCamera: '32 MP Sony Selfie',
      battery: '5000 mAh, 67W SUPERVOOC Charge',
      os: 'realme UI 5.0 (Android 14)',
      warranty: '1-Year Kiru Mobile Warranty'
    },
    description: 'Luxury watch design mastercrafted by Ollivier Savéo. Features 64MP periscope telephoto camera with 120x SuperZoom.',
    warrantyInfo: '1 Year Kiru Mobile Warranty.',
    deliveryInfo: 'Delivery available to all Ethiopian regional centers.',
    rating: 4.7,
    reviewsCount: 22,
    reviews: []
  },
  {
    id: 'km-sp-10',
    name: 'Nokia G60 5G',
    category: 'smartphones',
    brand: 'Nokia',
    price: 18000,
    discountPrice: 16200,
    inStock: true,
    stockCount: 16,
    images: [
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Ice Grey', hex: '#808080' },
      { name: 'Pure Black', hex: '#1A1A1A' }
    ],
    storageOptions: [
      { label: '128GB / 6GB RAM', priceAdjustment: 0 }
    ],
    specs: {
      screen: '6.58" FHD+ 120Hz Gorilla Glass 5',
      processor: 'Snapdragon 695 5G',
      ramStorage: '6GB RAM + 128GB Storage',
      mainCamera: '50 MP AI Camera + 5 MP Ultra Wide + 2 MP Depth',
      selfieCamera: '8 MP Front Camera',
      battery: '4500 mAh, 20W Fast Charge',
      os: 'Android 13 (3 years OS updates guarantee)',
      warranty: '2-Year Official Nokia Warranty'
    },
    description: 'Durable, sustainable, and built to last. 100% recycled plastic frame, 3 years of monthly security updates, and 2-year manufacturer warranty.',
    warrantyInfo: '2 Years Manufacturer Warranty.',
    deliveryInfo: 'Local Hossana delivery.',
    rating: 4.5,
    reviewsCount: 14,
    reviews: []
  },

  // --- ACCESSORIES ---
  {
    id: 'km-acc-01',
    name: 'Anker PowerCore 20,000mAh 65W Fast Charge Power Bank',
    category: 'accessories',
    brand: 'Anker',
    price: 5200,
    discountPrice: 4600,
    inStock: true,
    stockCount: 30,
    featured: true,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Matte Black', hex: '#1C1C1C' }
    ],
    storageOptions: [
      { label: '20,000 mAh Capacity', priceAdjustment: 0 }
    ],
    specs: {
      battery: '20,000 mAh High Capacity Lithium Polymer',
      connectivity: '2x USB-C (65W Input/Output) + 1x USB-A (22.5W)',
      warranty: '18-Month Anker Warranty',
      compatibility: 'Charge Smartphones 4-5 times, Laptops & MacBooks'
    },
    description: 'Keep your phones and laptops charged during power cuts in Hossana! 65W Power Delivery can charge an iPhone 15 to 50% in 25 minutes or power a MacBook Air.',
    warrantyInfo: '18 Month Warranty with full replacement guarantee.',
    deliveryInfo: 'Instant Hossana town delivery.',
    rating: 4.9,
    reviewsCount: 65,
    reviews: []
  },
  {
    id: 'km-acc-02',
    name: 'Apple AirPods Pro (2nd Gen) USB-C',
    category: 'accessories',
    brand: 'Apple',
    price: 16500,
    discountPrice: 14800,
    inStock: true,
    stockCount: 10,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Glossy White', hex: '#FFFFFF' }
    ],
    storageOptions: [
      { label: 'USB-C MagSafe Case', priceAdjustment: 0 }
    ],
    specs: {
      processor: 'Apple H2 Headphone Chip',
      connectivity: 'Bluetooth 5.3 + MagSafe USB-C',
      battery: '6 hours playback (30 hours with charging case)',
      warranty: '1-Year Kiru Mobile Warranty'
    },
    description: 'Active Noise Cancellation up to 2x more effective, Transparency mode, Personalized Spatial Audio, and precision finding speaker case.',
    warrantyInfo: '1 Year Kiru Mobile Warranty.',
    deliveryInfo: 'Hossana & Regional Ethiopian delivery.',
    rating: 4.9,
    reviewsCount: 23,
    reviews: []
  },
  {
    id: 'km-acc-03',
    name: 'JBL Charge 5 Portable Bluetooth Speaker',
    category: 'accessories',
    brand: 'JBL',
    price: 9800,
    discountPrice: 8800,
    inStock: true,
    stockCount: 15,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Squad Black/Gold', hex: '#2B2B2B' },
      { name: 'Ocean Blue', hex: '#0F4C81' }
    ],
    storageOptions: [
      { label: 'Standard Edition', priceAdjustment: 0 }
    ],
    specs: {
      screen: 'IP67 Waterproof & Dustproof',
      battery: '20 Hours Playtime + Built-in Power Bank',
      connectivity: 'Bluetooth 5.1 + PartyBoost',
      warranty: '1-Year Warranty'
    },
    description: 'Delivers bold JBL Original Pro Sound with an optimized long excursion driver, separate tweeter and dual JBL bass radiators. IP67 waterproof with built-in power bank.',
    warrantyInfo: '1 Year Warranty.',
    deliveryInfo: 'Fast local delivery.',
    rating: 4.8,
    reviewsCount: 40,
    reviews: []
  },
  {
    id: 'km-acc-04',
    name: '67W GaN Super Fast Wall Charger + 100W Type-C Cable',
    category: 'accessories',
    brand: 'Tecno',
    price: 2100,
    discountPrice: 1850,
    inStock: true,
    stockCount: 50,
    specialOffer: true,
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Pure White', hex: '#FAFAFA' }
    ],
    storageOptions: [
      { label: '67W GaN + Cable Included', priceAdjustment: 0 }
    ],
    specs: {
      connectivity: 'Dual Port (USB-C Power Delivery + USB-A QuickCharge)',
      warranty: '6 Months Warranty'
    },
    description: 'Compact GaN technology charger for iPhone, Samsung, Tecno, Xiaomi, and laptops. Charge smartphones up to 70% in just 25 minutes safe from voltage surge.',
    warrantyInfo: '6 Month Replacement Warranty.',
    deliveryInfo: 'Available in Hossana shop.',
    rating: 4.8,
    reviewsCount: 92,
    reviews: []
  },
  {
    id: 'km-acc-05',
    name: 'Anti-Spy 9D Curved Ceramic Screen Protector',
    category: 'accessories',
    brand: 'Other',
    price: 600,
    discountPrice: 450,
    inStock: true,
    stockCount: 200,
    images: [
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Privacy Dark Edge', hex: '#000000' }
    ],
    storageOptions: [
      { label: 'For All iPhone / Samsung / Tecno Models', priceAdjustment: 0 }
    ],
    specs: {
      screen: '9D Unbreakable Flexible Ceramic Membrane, 28-degree Privacy Guard',
      warranty: 'Free installation at Kiru Mobile Hossana Store'
    },
    description: 'Keep your personal screen contents safe from bystanders! Ultra privacy glass with shatterproof flexible ceramic protection.',
    warrantyInfo: 'Guaranteed bubble-free installation.',
    deliveryInfo: 'In-store installation or local delivery.',
    rating: 4.7,
    reviewsCount: 110,
    reviews: []
  },
  {
    id: 'km-acc-06',
    name: 'Samsung Galaxy Watch 6 Classic (47mm)',
    category: 'accessories',
    brand: 'Samsung',
    price: 21000,
    discountPrice: 18900,
    inStock: true,
    stockCount: 6,
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Black Stainless', hex: '#1C1C1C' },
      { name: 'Silver Stainless', hex: '#C0C0C0' }
    ],
    storageOptions: [
      { label: '47mm Bluetooth / GPS', priceAdjustment: 0 }
    ],
    specs: {
      screen: '1.5" Sapphire Crystal Super AMOLED',
      battery: '425 mAh, WPC Wireless Charging',
      connectivity: 'Rotating Bezel, ECG, Heart Rate, Sleep Tracking',
      warranty: '1-Year Warranty'
    },
    description: 'Timeless luxury design featuring the physical rotating bezel, health tracking, sleep coaching, ECG, and AMOLED display.',
    warrantyInfo: '1 Year Warranty.',
    deliveryInfo: 'Hossana fast delivery.',
    rating: 4.8,
    reviewsCount: 19,
    reviews: []
  },

  // --- ELECTRONICS ---
  {
    id: 'km-ele-01',
    name: 'Apple MacBook Air M3 (13.6-inch, 16GB / 512GB)',
    category: 'electronics',
    brand: 'Apple',
    price: 125000,
    discountPrice: 118000,
    inStock: true,
    stockCount: 5,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Midnight Gold / Black', hex: '#1E2530' },
      { name: 'Space Grey', hex: '#53555B' },
      { name: 'Starlight', hex: '#E2D8C9' }
    ],
    storageOptions: [
      { label: '16GB RAM / 512GB SSD', priceAdjustment: 0 },
      { label: '16GB RAM / 1TB SSD', priceAdjustment: 22000 }
    ],
    specs: {
      screen: '13.6" Liquid Retina Display with True Tone, 500 nits',
      processor: 'Apple M3 Chip (8-Core CPU, 10-Core GPU)',
      ramStorage: '16GB Unified Memory + 512GB High-Speed SSD',
      battery: 'Up to 18 Hours Battery Life, MagSafe 3 Charging',
      os: 'macOS Sonoma',
      connectivity: '2x Thunderbolt / USB 4, Wi-Fi 6E, MagSafe',
      warranty: '1-Year Kiru Mobile Warranty'
    },
    description: 'Lean. Mean. M3 machine. The world’s best 13-inch laptop features supercharged performance, up to 18 hours of battery life, and a strikingly thin aluminum enclosure.',
    warrantyInfo: '1 Year Official Warranty.',
    deliveryInfo: 'Insured express delivery to Hossana and regional capitals.',
    rating: 5.0,
    reviewsCount: 16,
    reviews: []
  },
  {
    id: 'km-ele-02',
    name: 'Lenovo Legion 5 Pro Gaming Laptop',
    category: 'electronics',
    brand: 'Other',
    price: 112000,
    discountPrice: 104500,
    inStock: true,
    stockCount: 4,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#1A1A1A' }
    ],
    storageOptions: [
      { label: 'Intel i7-14700HX / RTX 4060 / 16GB / 1TB', priceAdjustment: 0 }
    ],
    specs: {
      screen: '16" WQXGA (2560x1600) 240Hz IPS Display, 500 nits G-Sync',
      processor: 'Intel Core i7-14700HX (20-Cores, up to 5.5GHz)',
      ramStorage: '16GB DDR5 5600MHz RAM + 1TB PCIe 4.0 NVMe SSD',
      mainCamera: 'NVIDIA GeForce RTX 4060 8GB GDDR6 (140W TGP)',
      battery: '80Wh Battery, 300W Adapter',
      os: 'Windows 11 Pro Genuine',
      warranty: '1-Year Kiru Mobile Warranty'
    },
    description: 'Conquer modern gaming and heavy 3D rendering with Lenovo Legion Coldfront 5.0 cooling, 240Hz WQXGA display, and RTX 4060 8GB graphics.',
    warrantyInfo: '1 Year Kiru Mobile Tech Warranty.',
    deliveryInfo: 'Fast insured delivery.',
    rating: 4.9,
    reviewsCount: 12,
    reviews: []
  },
  {
    id: 'km-ele-03',
    name: 'Samsung 55" Crystal 4K UHD Smart TV (CU8000)',
    category: 'electronics',
    brand: 'Samsung',
    price: 56000,
    discountPrice: 51800,
    inStock: true,
    stockCount: 6,
    bestSeller: true,
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Titan Slim Black', hex: '#0E0E0E' }
    ],
    storageOptions: [
      { label: '55-Inch 4K UHD', priceAdjustment: 0 }
    ],
    specs: {
      screen: '55" 4K UHD (3840 x 2160) Dynamic Crystal Color, HDR10+',
      processor: 'Crystal Processor 4K',
      connectivity: '3x HDMI, 2x USB, Wi-Fi 5, Bluetooth, SolarCell Remote',
      os: 'Tizen Smart OS with YouTube, Netflix, Prime',
      warranty: '1-Year Samsung Official Warranty'
    },
    description: 'Bring cinema quality into your home! AirSlim design with vibrant Dynamic Crystal Color, SolarCell remote that charges from indoor light, and Smart TV app ecosystem.',
    warrantyInfo: '1 Year Official Warranty.',
    deliveryInfo: 'Free home delivery & setup assistance in Hossana town.',
    rating: 4.8,
    reviewsCount: 27,
    reviews: []
  },
  {
    id: 'km-ele-04',
    name: 'Sony PlayStation 5 Slim Digital / Disc Console',
    category: 'electronics',
    brand: 'Other',
    price: 76000,
    discountPrice: 71500,
    inStock: true,
    stockCount: 8,
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Matte White & Black', hex: '#EEEEEE' }
    ],
    storageOptions: [
      { label: 'PS5 Slim Disc Edition + 1TB SSD', priceAdjustment: 0 }
    ],
    specs: {
      processor: 'Custom AMD Zen 2 CPU / RDNA 2 GPU 10.3 TFLOPS',
      ramStorage: '16GB GDDR6 + 1TB Custom Ultra-High Speed SSD',
      connectivity: 'DualSense Wireless Controller with Haptic Feedback',
      warranty: '1-Year Warranty'
    },
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio.',
    warrantyInfo: '1 Year Local Kiru Mobile Warranty.',
    deliveryInfo: 'Same day delivery in Hossana.',
    rating: 4.9,
    reviewsCount: 35,
    reviews: []
  }
];

export const PROMO_COUPONS: DiscountCoupon[] = [
  {
    code: 'KIRU10',
    percentage: 10,
    description: '10% OFF on all accessories and power banks',
    minOrderETB: 2000,
    active: true
  },
  {
    code: 'HOSSANA500',
    percentage: 5,
    description: '5% OFF on smartphone purchases for Hossana residents',
    minOrderETB: 10000,
    active: true
  },
  {
    code: 'GRANDOPEN',
    percentage: 7,
    description: 'Grand opening celebratory discount',
    minOrderETB: 5000,
    active: true
  }
];
