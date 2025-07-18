import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Shield, Award, ArrowRight, Globe, Users, Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ProductCard } from '../components/product/ProductCard';
import { SupplierCard } from '../components/supplier/SupplierCard';
import { QuoteRequestModal } from '../components/quote/QuoteRequestModal';
import { SupplierProfile } from '../components/supplier/SupplierProfile';
import { mockProducts, mockSuppliers } from '../data/mockData';
import { Product, Supplier } from '../types';

export function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showSupplierProfile, setShowSupplierProfile] = useState(false);

  const categories = [
    { name: 'Consumer Electronics', count: '2.5M+', icon: '📱' },
    { name: 'Machinery', count: '1.8M+', icon: '⚙️' },
    { name: 'Home & Garden', count: '3.2M+', icon: '🏠' },
    { name: 'Fashion & Apparel', count: '4.1M+', icon: '👕' },
    { name: 'Sports & Entertainment', count: '1.2M+', icon: '⚽' },
    { name: 'Health & Medical', count: '890K+', icon: '🏥' },
    { name: 'Auto & Transportation', count: '1.5M+', icon: '🚗' },
    { name: 'Construction & Real Estate', count: '750K+', icon: '🏗️' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleQuoteRequest = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setShowQuoteModal(true);
    }
  };

  const handleSupplierClick = (supplierId: string) => {
    const supplier = mockSuppliers.find(s => s.id === supplierId);
    if (supplier) {
      setSelectedSupplier(supplier);
      setShowSupplierProfile(true);
    }
  };

  const handleQuoteSubmit = (quoteData: any) => {
    console.log('Quote request submitted:', quoteData);
    // Implement quote submission logic
  };

  const handleBackToHome = () => {
    setShowSupplierProfile(false);
    setSelectedSupplier(null);
  };

  if (showSupplierProfile && selectedSupplier) {
    const supplierProducts = mockProducts.filter(p => p.supplier.id === selectedSupplier.id);
    return (
      <SupplierProfile
        supplier={selectedSupplier}
        products={supplierProducts}
        onBack={handleBackToHome}
        onProductQuote={handleQuoteRequest}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Global B2B <span className="text-primary">Sourcing</span> Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with verified suppliers worldwide. Source quality products, request quotes, 
            and build lasting business relationships with confidence.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search millions of products from verified suppliers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-6 pr-32 text-lg border-2 border-gray-300 rounded-full focus:border-primary shadow-lg"
              />
              <Button
                type="submit"
                size="lg"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-8"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10M+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">200K+</div>
              <div className="text-gray-600">Verified Suppliers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">180+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-gray-600">Discover millions of products across all industries</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{category.count} products</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-gray-600">Trending products from verified suppliers</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/products')}>
              View All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuoteRequest={handleQuoteRequest}
                onSupplierClick={handleSupplierClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Suppliers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Suppliers</h2>
              <p className="text-gray-600">Connect with verified manufacturers and trading companies</p>
            </div>
            <Button variant="outline">
              View All Suppliers
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSuppliers.map((supplier) => (
              <SupplierCard
                key={supplier.id}
                supplier={supplier}
                onViewProfile={handleSupplierClick}
                onContact={(id) => console.log('Contact supplier:', id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Dollar Key?</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              We provide the most comprehensive B2B sourcing platform with advanced features 
              to help you find the right suppliers and products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Suppliers</h3>
              <p className="text-primary-foreground/80">
                All suppliers are thoroughly verified with business licenses, 
                certifications, and quality assessments.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
              <p className="text-primary-foreground/80">
                Connect with suppliers from 180+ countries and access 
                millions of products across all industries.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trade Assurance</h3>
              <p className="text-primary-foreground/80">
                Secure transactions with our trade assurance program 
                protecting your orders and payments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Sourcing?</h2>
          <p className="text-xl mb-8 text-accent-foreground/90">
            Join thousands of businesses already sourcing with confidence on Dollar Key
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-accent">
              <Users className="w-5 h-5 mr-2" />
              Find Suppliers
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent">
              <Package className="w-5 h-5 mr-2" />
              Browse Products
            </Button>
          </div>
        </div>
      </section>

      {/* Quote Request Modal */}
      {selectedProduct && (
        <QuoteRequestModal
          product={selectedProduct}
          isOpen={showQuoteModal}
          onClose={() => {
            setShowQuoteModal(false);
            setSelectedProduct(null);
          }}
          onSubmit={handleQuoteSubmit}
        />
      )}
    </div>
  );
}