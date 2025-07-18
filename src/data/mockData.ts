import { Product, Supplier, User } from '../types';

export const mockSuppliers: Supplier[] = [
  {
    id: 'sup-001',
    name: 'Zhang Wei',
    companyName: 'Guangzhou Electronics Manufacturing Co., Ltd.',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=300&fit=crop',
    location: {
      country: 'China',
      city: 'Guangzhou',
      address: 'No. 123 Tianhe District, Guangzhou, Guangdong'
    },
    established: 2008,
    employeeCount: '201-500',
    businessType: 'Manufacturer',
    mainProducts: ['Consumer Electronics', 'Mobile Accessories', 'Smart Devices'],
    certifications: ['ISO 9001', 'CE', 'FCC', 'RoHS'],
    rating: 4.8,
    reviewCount: 1247,
    responseRate: 98,
    responseTime: '< 2 hours',
    isGoldSupplier: true,
    isVerified: true,
    tradeAssurance: true,
    contact: {
      email: 'zhang.wei@gzelectronics.com',
      phone: '+86 20 8888 9999',
      whatsapp: '+86 138 0013 8888',
      website: 'www.gzelectronics.com'
    },
    stats: {
      totalProducts: 156,
      totalOrders: 3420,
      repeatBuyerRate: 85
    }
  },
  {
    id: 'sup-002',
    name: 'Li Ming',
    companyName: 'Shenzhen Tech Innovation Ltd.',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center',
    coverImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=300&fit=crop',
    location: {
      country: 'China',
      city: 'Shenzhen',
      address: 'Futian District, Shenzhen, Guangdong'
    },
    established: 2012,
    employeeCount: '51-100',
    businessType: 'Trading Company',
    mainProducts: ['LED Lighting', 'Solar Products', 'Electronic Components'],
    certifications: ['ISO 14001', 'CE', 'UL'],
    rating: 4.6,
    reviewCount: 892,
    responseRate: 95,
    responseTime: '< 4 hours',
    isGoldSupplier: true,
    isVerified: true,
    tradeAssurance: true,
    contact: {
      email: 'li.ming@sztech.com',
      phone: '+86 755 2222 3333',
      whatsapp: '+86 139 0139 9999'
    },
    stats: {
      totalProducts: 89,
      totalOrders: 1850,
      repeatBuyerRate: 78
    }
  },
  {
    id: 'sup-003',
    name: 'Wang Fang',
    companyName: 'Yiwu Global Trading Co.',
    logo: 'https://images.unsplash.com/photo-1494790108755-2616b332c1c2?w=100&h=100&fit=crop&crop=center',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop',
    location: {
      country: 'China',
      city: 'Yiwu',
      address: 'International Trade City, Yiwu, Zhejiang'
    },
    established: 2015,
    employeeCount: '11-50',
    businessType: 'Trading Company',
    mainProducts: ['Home & Garden', 'Toys & Games', 'Fashion Accessories'],
    certifications: ['BSCI', 'Sedex'],
    rating: 4.4,
    reviewCount: 567,
    responseRate: 92,
    responseTime: '< 6 hours',
    isGoldSupplier: false,
    isVerified: true,
    tradeAssurance: true,
    contact: {
      email: 'wang.fang@yiwuglobal.com',
      phone: '+86 579 8888 7777'
    },
    stats: {
      totalProducts: 234,
      totalOrders: 980,
      repeatBuyerRate: 72
    }
  }
];

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Wireless Bluetooth Earbuds Pro',
    description: 'Premium wireless earbuds with active noise cancellation, 30-hour battery life, and IPX7 waterproof rating. Perfect for sports and daily use.',
    price: {
      min: 12.50,
      max: 18.90,
      currency: 'USD'
    },
    moq: 100,
    category: 'Consumer Electronics',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop'
    ],
    supplier: mockSuppliers[0],
    specifications: {
      'Bluetooth Version': '5.3',
      'Battery Life': '30 hours (with case)',
      'Charging Time': '1.5 hours',
      'Water Resistance': 'IPX7',
      'Driver Size': '10mm',
      'Frequency Response': '20Hz-20kHz'
    },
    tags: ['wireless', 'bluetooth', 'earbuds', 'noise-cancellation', 'waterproof'],
    rating: 4.7,
    reviewCount: 324,
    isVerified: true
  },
  {
    id: 'prod-002',
    name: 'Smart LED Strip Lights RGB',
    description: 'WiFi-enabled RGB LED strip lights with app control, music sync, and voice control compatibility. 16 million colors and various lighting effects.',
    price: {
      min: 8.90,
      max: 15.60,
      currency: 'USD'
    },
    moq: 50,
    category: 'LED Lighting',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop'
    ],
    supplier: mockSuppliers[1],
    specifications: {
      'Length': '5 meters',
      'LED Count': '300 LEDs',
      'Power': '24W',
      'Voltage': '12V DC',
      'Control': 'WiFi + App',
      'Compatibility': 'Alexa, Google Assistant'
    },
    tags: ['led', 'smart', 'rgb', 'wifi', 'app-control', 'voice-control'],
    rating: 4.5,
    reviewCount: 189,
    isVerified: true
  },
  {
    id: 'prod-003',
    name: 'Portable Solar Power Bank 20000mAh',
    description: 'High-capacity solar power bank with dual USB outputs, LED flashlight, and rugged design. Perfect for outdoor activities and emergency use.',
    price: {
      min: 15.80,
      max: 22.50,
      currency: 'USD'
    },
    moq: 30,
    category: 'Solar Products',
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'
    ],
    supplier: mockSuppliers[1],
    specifications: {
      'Capacity': '20000mAh',
      'Solar Panel': '5W Monocrystalline',
      'Output': 'Dual USB 2.1A',
      'Input': 'Micro USB + Type-C',
      'Features': 'LED Flashlight, Waterproof',
      'Size': '160 x 85 x 20mm'
    },
    tags: ['solar', 'power-bank', 'portable', 'outdoor', 'emergency', 'waterproof'],
    rating: 4.3,
    reviewCount: 156,
    isVerified: true
  },
  {
    id: 'prod-004',
    name: 'Ceramic Garden Planters Set',
    description: 'Beautiful set of 3 ceramic planters with drainage holes and saucers. Modern minimalist design perfect for indoor and outdoor plants.',
    price: {
      min: 25.90,
      max: 35.50,
      currency: 'USD'
    },
    moq: 20,
    category: 'Home & Garden',
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop'
    ],
    supplier: mockSuppliers[2],
    specifications: {
      'Material': 'High-quality Ceramic',
      'Set Size': '3 pieces (Small, Medium, Large)',
      'Dimensions': '15cm, 20cm, 25cm diameter',
      'Features': 'Drainage holes, Matching saucers',
      'Style': 'Modern Minimalist',
      'Colors': 'White, Grey, Terracotta'
    },
    tags: ['ceramic', 'planters', 'garden', 'home-decor', 'minimalist', 'drainage'],
    rating: 4.6,
    reviewCount: 89,
    isVerified: true
  }
];

export const mockUser: User = {
  id: 'user-001',
  name: 'John Smith',
  email: 'john.smith@company.com',
  company: 'Global Import Solutions',
  role: 'buyer',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=center',
  verified: true
};