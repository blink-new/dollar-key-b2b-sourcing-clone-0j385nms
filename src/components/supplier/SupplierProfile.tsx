import { useState } from 'react';
import { 
  MapPin, Star, Clock, MessageCircle, Shield, Award, TrendingUp, 
  Phone, Mail, Globe, Users, Calendar, Building, Package, 
  CheckCircle, ExternalLink, ArrowLeft
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { Supplier, Product } from '../../types';
import { ProductCard } from '../product/ProductCard';

interface SupplierProfileProps {
  supplier: Supplier;
  products: Product[];
  onBack?: () => void;
  onContact?: (supplierId: string) => void;
  onProductQuote?: (productId: string) => void;
}

export function SupplierProfile({ 
  supplier, 
  products, 
  onBack, 
  onContact, 
  onProductQuote 
}: SupplierProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const handleContact = () => {
    onContact?.(supplier.id);
  };

  const handleExternalLink = (url: string) => {
    window.open(url.startsWith('http') ? url : `https://${url}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Back Button */}
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Suppliers
        </Button>
      )}

      {/* Cover Section */}
      <div className="relative h-64 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg overflow-hidden mb-6">
        <img
          src={supplier.coverImage}
          alt={`${supplier.companyName} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Supplier Header Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end space-x-4">
            <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
              <AvatarImage src={supplier.logo} />
              <AvatarFallback className="text-2xl">{supplier.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{supplier.companyName}</h1>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{supplier.location.city}, {supplier.location.country}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Building className="w-4 h-4" />
                  <span>{supplier.businessType}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Est. {supplier.established}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              {supplier.isGoldSupplier && (
                <Badge className="bg-yellow-500 text-white">
                  <Award className="w-4 h-4 mr-1" />
                  Gold Supplier
                </Badge>
              )}
              {supplier.isVerified && (
                <Badge className="bg-green-500 text-white">
                  <Shield className="w-4 h-4 mr-1" />
                  Verified
                </Badge>
              )}
              {supplier.tradeAssurance && (
                <Badge className="bg-blue-500 text-white">
                  <Shield className="w-4 h-4 mr-1" />
                  Trade Assurance
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Company Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Business Type</span>
                      <p className="font-medium">{supplier.businessType}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Established</span>
                      <p className="font-medium">{supplier.established}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Employees</span>
                      <p className="font-medium">{supplier.employeeCount}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Location</span>
                      <p className="font-medium">{supplier.location.address}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <span className="text-sm text-gray-500">Main Products</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {supplier.mainProducts.map((product, index) => (
                        <Badge key={index} variant="secondary">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{supplier.stats.totalProducts}</div>
                      <div className="text-sm text-gray-500">Total Products</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{supplier.stats.totalOrders}</div>
                      <div className="text-sm text-gray-500">Total Orders</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{supplier.stats.repeatBuyerRate}%</div>
                      <div className="text-sm text-gray-500">Repeat Buyer Rate</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Response Rate</span>
                      <span className="font-medium">{supplier.responseRate}%</span>
                    </div>
                    <Progress value={supplier.responseRate} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Average Response Time</span>
                    </div>
                    <span className="font-medium">{supplier.responseTime}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuoteRequest={onProductQuote}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="certifications">
              <Card>
                <CardHeader>
                  <CardTitle>Certifications & Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {supplier.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Customer reviews will be displayed here</p>
                    <p className="text-sm">Feature coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Supplier</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleContact} className="w-full" size="lg">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Message
              </Button>

              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{supplier.contact.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{supplier.contact.phone}</span>
                </div>
                {supplier.contact.whatsapp && (
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-gray-500" />
                    <span>WhatsApp: {supplier.contact.whatsapp}</span>
                  </div>
                )}
                {supplier.contact.website && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start p-0 h-auto"
                    onClick={() => handleExternalLink(supplier.contact.website!)}
                  >
                    <Globe className="w-4 h-4 text-gray-500 mr-2" />
                    <span>{supplier.contact.website}</span>
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Rating Card */}
          <Card>
            <CardHeader>
              <CardTitle>Supplier Rating</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{supplier.rating}</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(supplier.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Based on {supplier.reviewCount} reviews
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Response Rate</span>
                <span className="font-medium">{supplier.responseRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="font-medium">{supplier.responseTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Products</span>
                <span className="font-medium">{supplier.stats.totalProducts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Orders</span>
                <span className="font-medium">{supplier.stats.totalOrders}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}