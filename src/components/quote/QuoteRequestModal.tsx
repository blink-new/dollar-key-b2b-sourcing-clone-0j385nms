import { useState } from 'react';
import { X, Calendar, Package, DollarSign, FileText, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Product } from '../../types';

interface QuoteRequestModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (quoteData: any) => void;
}

export function QuoteRequestModal({ product, isOpen, onClose, onSubmit }: QuoteRequestModalProps) {
  const [formData, setFormData] = useState({
    quantity: product.moq,
    targetPrice: '',
    deadline: '',
    paymentTerms: '',
    shippingTerms: '',
    requirements: '',
    urgency: 'normal'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      productId: product.id,
      supplierId: product.supplier.id,
      ...formData
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Request Quote</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="secondary">{product.category}</Badge>
                      {product.isVerified && (
                        <Badge className="bg-green-500">Verified</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Price Range:</span>
                    <div className="font-semibold text-primary">
                      ${product.price.min} - ${product.price.max}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">MOQ:</span>
                    <div className="font-semibold">{product.moq} pieces</div>
                  </div>
                </div>

                {/* Supplier Info */}
                <div className="border-t pt-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={product.supplier.logo} />
                      <AvatarFallback>{product.supplier.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{product.supplier.companyName}</p>
                      <p className="text-sm text-gray-600">
                        {product.supplier.location.city}, {product.supplier.location.country}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                    <div>
                      <span className="text-gray-500">Response Rate:</span>
                      <span className="ml-2 font-medium">{product.supplier.responseRate}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Response Time:</span>
                      <span className="ml-2 font-medium">{product.supplier.responseTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quote Request Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quote Request Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Quantity */}
                  <div>
                    <Label htmlFor="quantity" className="flex items-center space-x-2">
                      <Package className="w-4 h-4" />
                      <span>Quantity *</span>
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      min={product.moq}
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
                      placeholder={`Minimum ${product.moq} pieces`}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum order quantity: {product.moq} pieces
                    </p>
                  </div>

                  {/* Target Price */}
                  <div>
                    <Label htmlFor="targetPrice" className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <span>Target Price (per piece)</span>
                    </Label>
                    <Input
                      id="targetPrice"
                      type="number"
                      step="0.01"
                      value={formData.targetPrice}
                      onChange={(e) => handleInputChange('targetPrice', e.target.value)}
                      placeholder="Your target price in USD"
                    />
                  </div>

                  {/* Deadline */}
                  <div>
                    <Label htmlFor="deadline" className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Required Delivery Date *</span>
                    </Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => handleInputChange('deadline', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  {/* Urgency */}
                  <div>
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Standard processing</SelectItem>
                        <SelectItem value="normal">Normal - Within 3 days</SelectItem>
                        <SelectItem value="high">High - Within 24 hours</SelectItem>
                        <SelectItem value="urgent">Urgent - ASAP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Payment Terms */}
                  <div>
                    <Label htmlFor="paymentTerms">Preferred Payment Terms</Label>
                    <Select value={formData.paymentTerms} onValueChange={(value) => handleInputChange('paymentTerms', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tt">T/T (Telegraphic Transfer)</SelectItem>
                        <SelectItem value="lc">L/C (Letter of Credit)</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="western-union">Western Union</SelectItem>
                        <SelectItem value="trade-assurance">Trade Assurance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Shipping Terms */}
                  <div>
                    <Label htmlFor="shippingTerms">Shipping Terms</Label>
                    <Select value={formData.shippingTerms} onValueChange={(value) => handleInputChange('shippingTerms', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select shipping terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fob">FOB (Free on Board)</SelectItem>
                        <SelectItem value="cif">CIF (Cost, Insurance, Freight)</SelectItem>
                        <SelectItem value="exw">EXW (Ex Works)</SelectItem>
                        <SelectItem value="ddu">DDU (Delivered Duty Unpaid)</SelectItem>
                        <SelectItem value="ddp">DDP (Delivered Duty Paid)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Requirements */}
                  <div>
                    <Label htmlFor="requirements" className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>Additional Requirements</span>
                    </Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => handleInputChange('requirements', e.target.value)}
                      placeholder="Please specify any additional requirements, customization needs, packaging preferences, quality standards, certifications needed, etc."
                      rows={4}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Send Quote Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}