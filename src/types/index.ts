export interface Product {
  id: string;
  name: string;
  description: string;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  moq: number; // Minimum Order Quantity
  category: string;
  images: string[];
  supplier: Supplier;
  specifications: Record<string, string>;
  tags: string[];
  rating: number;
  reviewCount: number;
  isVerified: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  companyName: string;
  logo: string;
  coverImage: string;
  location: {
    country: string;
    city: string;
    address: string;
  };
  established: number;
  employeeCount: string;
  businessType: string;
  mainProducts: string[];
  certifications: string[];
  rating: number;
  reviewCount: number;
  responseRate: number;
  responseTime: string;
  isGoldSupplier: boolean;
  isVerified: boolean;
  tradeAssurance: boolean;
  contact: {
    email: string;
    phone: string;
    whatsapp?: string;
    website?: string;
  };
  stats: {
    totalProducts: number;
    totalOrders: number;
    repeatBuyerRate: number;
  };
}

export interface QuoteRequest {
  id: string;
  productId: string;
  supplierId: string;
  buyerId: string;
  quantity: number;
  targetPrice?: number;
  requirements: string;
  deadline: string;
  status: 'pending' | 'quoted' | 'negotiating' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Quote {
  id: string;
  requestId: string;
  supplierId: string;
  price: number;
  moq: number;
  leadTime: string;
  paymentTerms: string;
  shippingTerms: string;
  validUntil: string;
  notes: string;
  status: 'active' | 'expired' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: 'buyer' | 'supplier';
  avatar?: string;
  verified: boolean;
}