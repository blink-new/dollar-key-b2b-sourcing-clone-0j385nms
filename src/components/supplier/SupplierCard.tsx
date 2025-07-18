import { MapPin, Star, Clock, MessageCircle, Shield, Award, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Supplier } from '../../types';

interface SupplierCardProps {
  supplier: Supplier;
  onViewProfile?: (supplierId: string) => void;
  onContact?: (supplierId: string) => void;
  layout?: 'grid' | 'list';
}

export function SupplierCard({ supplier, onViewProfile, onContact, layout = 'grid' }: SupplierCardProps) {
  const handleViewProfile = () => {
    onViewProfile?.(supplier.id);
  };

  const handleContact = () => {
    onContact?.(supplier.id);
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-32 bg-gradient-to-r from-primary/10 to-accent/10 overflow-hidden">
        <img
          src={supplier.coverImage}
          alt={`${supplier.companyName} cover`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 right-2 flex space-x-1">
          {supplier.isGoldSupplier && (
            <Badge className="bg-yellow-500 text-white">
              <Award className="w-3 h-3 mr-1" />
              Gold
            </Badge>
          )}
          {supplier.tradeAssurance && (
            <Badge className="bg-blue-500 text-white">
              <Shield className="w-3 h-3 mr-1" />
              Trade Assurance
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Supplier Header */}
        <div className="flex items-start space-x-3 mb-4">
          <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
            <AvatarImage src={supplier.logo} />
            <AvatarFallback>{supplier.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate hover:text-primary cursor-pointer">
              {supplier.companyName}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{supplier.location.city}, {supplier.location.country}</span>
              {supplier.isVerified && (
                <Badge variant="outline" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Business Info */}
        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Established:</span>
              <span className="ml-2 font-medium">{supplier.established}</span>
            </div>
            <div>
              <span className="text-gray-500">Employees:</span>
              <span className="ml-2 font-medium">{supplier.employeeCount}</span>
            </div>
          </div>

          <div className="text-sm">
            <span className="text-gray-500">Business Type:</span>
            <span className="ml-2 font-medium">{supplier.businessType}</span>
          </div>

          {/* Main Products */}
          <div>
            <span className="text-sm text-gray-500">Main Products:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {supplier.mainProducts.slice(0, 3).map((product, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {product}
                </Badge>
              ))}
              {supplier.mainProducts.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{supplier.mainProducts.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-3 mb-4">
          {/* Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(supplier.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{supplier.rating}</span>
              <span className="text-sm text-gray-500">({supplier.reviewCount})</span>
            </div>
          </div>

          {/* Response Rate */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Response Rate</span>
              <span className="font-medium">{supplier.responseRate}%</span>
            </div>
            <Progress value={supplier.responseRate} className="h-2" />
          </div>

          {/* Response Time */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Response Time</span>
            </div>
            <span className="font-medium">{supplier.responseTime}</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div>
              <div className="font-semibold text-primary">{supplier.stats.totalProducts}</div>
              <div className="text-gray-500 text-xs">Products</div>
            </div>
            <div>
              <div className="font-semibold text-primary">{supplier.stats.totalOrders}</div>
              <div className="text-gray-500 text-xs">Orders</div>
            </div>
            <div>
              <div className="font-semibold text-primary">{supplier.stats.repeatBuyerRate}%</div>
              <div className="text-gray-500 text-xs">Repeat Rate</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleContact}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Contact
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={handleViewProfile}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}