import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, AlertCircle, Eye, Download, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { useAuth } from '../../hooks/useAuth';
import { OrderTracking } from './OrderTracking';

interface Order {
  id: string;
  orderNumber: string;
  supplierId: string;
  supplierName: string;
  supplierCompany: string;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'paid' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
  shippingAddress: string;
  trackingNumber?: string;
  notes?: string;
}

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specifications?: string;
}

const mockOrders: Order[] = [
  {
    id: 'order_1',
    orderNumber: 'ORD-2024-001',
    supplierId: 'supplier_1',
    supplierName: 'Zhang Wei',
    supplierCompany: 'Shenzhen Electronics Co.',
    items: [
      {
        id: 'item_1',
        productId: 'prod_1',
        productName: 'Wireless Bluetooth Headphones',
        quantity: 500,
        unitPrice: 25.00,
        totalPrice: 12500.00
      }
    ],
    totalAmount: 12500.00,
    currency: 'USD',
    status: 'shipped',
    paymentStatus: 'paid',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    shippingAddress: '123 Business St, New York, NY 10001',
    trackingNumber: 'TRK123456789',
    notes: 'Rush order - needed for trade show'
  },
  {
    id: 'order_2',
    orderNumber: 'ORD-2024-002',
    supplierId: 'supplier_2',
    supplierName: 'Maria Rodriguez',
    supplierCompany: 'Global Trading Solutions',
    items: [
      {
        id: 'item_2',
        productId: 'prod_2',
        productName: 'Smart Watch Series X',
        quantity: 200,
        unitPrice: 89.50,
        totalPrice: 17900.00
      }
    ],
    totalAmount: 17900.00,
    currency: 'USD',
    status: 'confirmed',
    paymentStatus: 'pending',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    shippingAddress: '456 Commerce Ave, Los Angeles, CA 90210'
  }
];

const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  paid: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
  shipped: { color: 'bg-purple-100 text-purple-800', icon: Truck },
  delivered: { color: 'bg-green-100 text-green-800', icon: Package },
  completed: { color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
  cancelled: { color: 'bg-red-100 text-red-800', icon: AlertCircle }
};

const paymentStatusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-800' },
  paid: { color: 'bg-green-100 text-green-800' },
  failed: { color: 'bg-red-100 text-red-800' },
  refunded: { color: 'bg-gray-100 text-gray-800' }
};

export function OrderManagement() {
  const { user } = useAuth();
  const [orders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  const getStatusBadge = (status: Order['status']) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: Order['paymentStatus']) => {
    const config = paymentStatusConfig[status];
    return (
      <Badge className={config.color}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleTrackOrder = (trackingNumber: string) => {
    window.open(`https://tracking.example.com/${trackingNumber}`, '_blank');
  };

  const handleDownloadInvoice = (orderNumber: string) => {
    console.log('Downloading invoice for order:', orderNumber);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shipped</p>
                <p className="text-2xl font-bold text-purple-600">
                  {orders.filter(o => o.status === 'shipped').length}
                </p>
              </div>
              <Truck className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="tracking">
                <Search className="w-4 h-4 mr-2" />
                Tracking
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              {activeTab === 'tracking' ? (
                <OrderTracking />
              ) : (
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.supplierName}</div>
                          <div className="text-sm text-gray-600">{order.supplierCompany}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </TableCell>
                      <TableCell>
                        ${order.totalAmount.toLocaleString()} {order.currency}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(order.status)}
                      </TableCell>
                      <TableCell>
                        {getPaymentStatusBadge(order.paymentStatus)}
                      </TableCell>
                      <TableCell>
                        {order.createdAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
                              </DialogHeader>
                              {selectedOrder && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Order Information</h4>
                                      <div className="space-y-1 text-sm">
                                        <div>Order Number: {selectedOrder.orderNumber}</div>
                                        <div>Status: {getStatusBadge(selectedOrder.status)}</div>
                                        <div>Payment: {getPaymentStatusBadge(selectedOrder.paymentStatus)}</div>
                                        <div>Created: {selectedOrder.createdAt.toLocaleDateString()}</div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Supplier Information</h4>
                                      <div className="space-y-1 text-sm">
                                        <div>{selectedOrder.supplierName}</div>
                                        <div>{selectedOrder.supplierCompany}</div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div>
                                    <h4 className="font-medium mb-2">Order Items</h4>
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Product</TableHead>
                                          <TableHead>Quantity</TableHead>
                                          <TableHead>Unit Price</TableHead>
                                          <TableHead>Total</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {selectedOrder.items.map((item) => (
                                          <TableRow key={item.id}>
                                            <TableCell>{item.productName}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>${item.unitPrice}</TableCell>
                                            <TableCell>${item.totalPrice}</TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <strong>Total: ${selectedOrder.totalAmount.toLocaleString()} {selectedOrder.currency}</strong>
                                    </div>
                                    <div className="flex gap-2">
                                      {selectedOrder.trackingNumber && (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleTrackOrder(selectedOrder.trackingNumber!)}
                                        >
                                          <Truck className="w-4 h-4 mr-2" />
                                          Track Order
                                        </Button>
                                      )}
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDownloadInvoice(selectedOrder.orderNumber)}
                                      >
                                        <Download className="w-4 h-4 mr-2" />
                                        Invoice
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          {order.trackingNumber && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTrackOrder(order.trackingNumber!)}
                            >
                              <Truck className="w-4 h-4" />
                            </Button>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadInvoice(order.orderNumber)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}