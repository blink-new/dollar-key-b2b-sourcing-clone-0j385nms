import { useState } from 'react';
import { Search, Package, Truck, MapPin, CheckCircle, Clock, AlertCircle, Copy, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { useToast } from '../../hooks/use-toast';

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: Date;
  isCompleted: boolean;
}

interface TrackingInfo {
  trackingNumber: string;
  carrier: string;
  status: 'in_transit' | 'delivered' | 'pending' | 'exception' | 'unknown';
  estimatedDelivery?: Date;
  currentLocation?: string;
  events: TrackingEvent[];
  orderNumber?: string;
  recipient?: string;
  shippingAddress?: string;
}

const mockTrackingData: { [key: string]: TrackingInfo } = {
  'TRK123456789': {
    trackingNumber: 'TRK123456789',
    carrier: 'DHL Express',
    status: 'in_transit',
    estimatedDelivery: new Date('2024-01-25'),
    currentLocation: 'Los Angeles, CA',
    orderNumber: 'ORD-2024-001',
    recipient: 'John Smith',
    shippingAddress: '123 Business St, New York, NY 10001',
    events: [
      {
        id: '1',
        status: 'Package picked up',
        description: 'Package has been picked up from sender',
        location: 'Shenzhen, China',
        timestamp: new Date('2024-01-20T08:00:00'),
        isCompleted: true
      },
      {
        id: '2',
        status: 'In transit',
        description: 'Package is in transit to destination country',
        location: 'Hong Kong Hub',
        timestamp: new Date('2024-01-21T14:30:00'),
        isCompleted: true
      },
      {
        id: '3',
        status: 'Customs clearance',
        description: 'Package cleared customs',
        location: 'Los Angeles, CA',
        timestamp: new Date('2024-01-22T10:15:00'),
        isCompleted: true
      },
      {
        id: '4',
        status: 'Out for delivery',
        description: 'Package is out for delivery',
        location: 'Los Angeles, CA',
        timestamp: new Date('2024-01-23T09:00:00'),
        isCompleted: false
      }
    ]
  },
  'TRK987654321': {
    trackingNumber: 'TRK987654321',
    carrier: 'FedEx',
    status: 'delivered',
    currentLocation: 'New York, NY',
    orderNumber: 'ORD-2024-003',
    recipient: 'Jane Doe',
    shippingAddress: '456 Commerce Ave, New York, NY 10001',
    events: [
      {
        id: '1',
        status: 'Package shipped',
        description: 'Package has been shipped',
        location: 'Shanghai, China',
        timestamp: new Date('2024-01-15T10:00:00'),
        isCompleted: true
      },
      {
        id: '2',
        status: 'Delivered',
        description: 'Package delivered successfully',
        location: 'New York, NY',
        timestamp: new Date('2024-01-18T15:30:00'),
        isCompleted: true
      }
    ]
  }
};

const statusConfig = {
  in_transit: { color: 'bg-blue-100 text-blue-800', icon: Truck, label: 'In Transit' },
  delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Delivered' },
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
  exception: { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Exception' },
  unknown: { color: 'bg-gray-100 text-gray-800', icon: Package, label: 'Unknown' }
};

export function OrderTracking() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleTrackPackage = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      const info = mockTrackingData[trackingNumber.trim()];
      if (info) {
        setTrackingInfo(info);
        setError(null);
      } else {
        setError('Tracking number not found. Please check and try again.');
        setTrackingInfo(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleCopyTracking = () => {
    if (trackingInfo) {
      navigator.clipboard.writeText(trackingInfo.trackingNumber);
      toast({
        title: 'Copied!',
        description: 'Tracking number copied to clipboard',
      });
    }
  };

  const handleOpenCarrierSite = () => {
    if (trackingInfo) {
      const carrierUrls: { [key: string]: string } = {
        'DHL Express': `https://www.dhl.com/track?tracking-id=${trackingInfo.trackingNumber}`,
        'FedEx': `https://www.fedex.com/fedextrack/?trknbr=${trackingInfo.trackingNumber}`,
        'UPS': `https://www.ups.com/track?tracknum=${trackingInfo.trackingNumber}`,
        'USPS': `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${trackingInfo.trackingNumber}`
      };
      
      const url = carrierUrls[trackingInfo.carrier] || `https://google.com/search?q=track+${trackingInfo.trackingNumber}`;
      window.open(url, '_blank');
    }
  };

  const getStatusBadge = (status: TrackingInfo['status']) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Package Tracking</h2>
      </div>

      {/* Tracking Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Track Your Package
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter tracking number (e.g., TRK123456789)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTrackPackage()}
              />
            </div>
            <Button onClick={handleTrackPackage} disabled={isLoading}>
              <Search className="w-4 h-4 mr-2" />
              {isLoading ? 'Tracking...' : 'Track Package'}
            </Button>
          </div>
          
          {error && (
            <Alert className="mt-4" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Quick Track Examples */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Try these sample tracking numbers:</p>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTrackingNumber('TRK123456789')}
              >
                TRK123456789
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTrackingNumber('TRK987654321')}
              >
                TRK987654321
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tracking Results */}
      {trackingInfo && (
        <div className="space-y-6">
          {/* Package Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Package Summary
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyTracking}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleOpenCarrierSite}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on {trackingInfo.carrier}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tracking Number</h4>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                    {trackingInfo.trackingNumber}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                  {getStatusBadge(trackingInfo.status)}
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Carrier</h4>
                  <p className="text-sm">{trackingInfo.carrier}</p>
                </div>
                
                {trackingInfo.estimatedDelivery && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Estimated Delivery</h4>
                    <p className="text-sm">{trackingInfo.estimatedDelivery.toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              {trackingInfo.currentLocation && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Current Location:</span>
                    <span className="text-blue-800">{trackingInfo.currentLocation}</span>
                  </div>
                </div>
              )}

              {trackingInfo.orderNumber && (
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Order Number:</span> {trackingInfo.orderNumber}
                    </div>
                    {trackingInfo.recipient && (
                      <div>
                        <span className="font-medium">Recipient:</span> {trackingInfo.recipient}
                      </div>
                    )}
                  </div>
                  {trackingInfo.shippingAddress && (
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Shipping Address:</span> {trackingInfo.shippingAddress}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tracking Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Tracking History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackingInfo.events.map((event, index) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        event.isCompleted ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {event.isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      {index < trackingInfo.events.length - 1 && (
                        <div className={`w-0.5 h-12 ${
                          event.isCompleted ? 'bg-green-200' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                    
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium ${
                          event.isCompleted ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {event.status}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {formatDate(event.timestamp)}
                        </span>
                      </div>
                      <p className={`text-sm ${
                        event.isCompleted ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {event.description}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className={`text-xs ${
                          event.isCompleted ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}