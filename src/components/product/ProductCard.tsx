import { useState } from 'react';
import { Star, Heart, ShoppingCart, MessageCircle, Shield, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onQuoteRequest?: (productId: string) => void;
  onSupplierClick?: (supplierId: string) => void;
  layout?: 'grid' | 'list';
}

export function ProductCard({ product, onQuoteRequest, onSupplierClick, layout = 'grid' }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem, openCart } = useCart();

  const handleSupplierClick = () => {
    onSupplierClick?.(product.supplier.id);
  };

  const handleQuoteRequest = () => {
    onQuoteRequest?.(product.id);
  };

  const handleAddToCart = () => {
    // Use the minimum price as default
    addItem(product, product.moq, product.price.min);
    openCart();
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        {/* Product Image */}
        <div 
          className="aspect-square bg-gray-100 overflow-hidden cursor-pointer"
          onMouseEnter={() => setCurrentImageIndex(1)}
          onMouseLeave={() => setCurrentImageIndex(0)}
        >
          <img
            src={product.images[currentImageIndex] || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isVerified && (
            <Badge className="bg-green-500 text-white">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          {product.supplier.isGoldSupplier && (
            <Badge className="bg-yellow-500 text-white">
              <Award className="w-3 h-3 mr-1" />
              Gold
            </Badge>
          )}
        </div>

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </Button>
      </div>

      <CardContent className="p-4">
        {/* Product Info */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-primary cursor-pointer">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-bold text-primary">
              ${product.price.min.toFixed(2)}
            </span>
            {product.price.max !== product.price.min && (
              <>
                <span className="text-gray-500">-</span>
                <span className="text-lg font-bold text-primary">
                  ${product.price.max.toFixed(2)}
                </span>
              </>
            )}
            <span className="text-sm text-gray-500">/ piece</span>
          </div>

          {/* MOQ */}
          <div className="text-sm text-gray-600">
            MOQ: <span className="font-medium">{product.moq} pieces</span>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Supplier Info */}
          <div 
            className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={handleSupplierClick}
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={product.supplier.logo} />
              <AvatarFallback>{product.supplier.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {product.supplier.companyName}
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>{product.supplier.location.city}, {product.supplier.location.country}</span>
                {product.supplier.isVerified && (
                  <Badge variant="outline" className="text-xs">Verified</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleQuoteRequest}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Quote
            </Button>
            <Button size="sm" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}