import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  Users, 
  MessageSquare, 
  ShoppingCart,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Eye,
  Plus
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { MessageCenter } from '../components/messaging/MessageCenter';
import { OrderManagement } from '../components/orders/OrderManagement';
import { useAuth } from '../hooks/useAuth';

interface DashboardStats {
  totalQuotes: number;
  activeSuppliers: number;
  pendingOrders: number;
  totalSpent: number;
}

interface RecentActivity {
  id: string;
  type: 'quote' | 'order' | 'message' | 'supplier';
  title: string;
  description: string;
  timestamp: string;
  status?: string;
}

interface QuoteSummary {
  id: string;
  productName: string;
  supplier: string;
  status: 'pending' | 'quoted' | 'accepted' | 'rejected';
  amount: number;
  deadline: string;
}

const mockStats: DashboardStats = {
  totalQuotes: 24,
  activeSuppliers: 12,
  pendingOrders: 8,
  totalSpent: 45600
};

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'quote',
    title: 'New quote received',
    description: 'Wireless Bluetooth Earbuds Pro from Guangzhou Electronics',
    timestamp: '2 hours ago',
    status: 'quoted'
  },
  {
    id: '2',
    type: 'order',
    title: 'Order confirmed',
    description: 'Smart LED Strip Lights RGB - 500 units',
    timestamp: '4 hours ago',
    status: 'confirmed'
  },
  {
    id: '3',
    type: 'message',
    title: 'New message',
    description: 'Li Ming replied to your inquiry about solar power banks',
    timestamp: '6 hours ago'
  },
  {
    id: '4',
    type: 'supplier',
    title: 'Supplier verified',
    description: 'Yiwu Global Trading Co. completed verification process',
    timestamp: '1 day ago',
    status: 'verified'
  }
];

const mockQuoteSummary: QuoteSummary[] = [
  {
    id: 'q1',
    productName: 'Wireless Bluetooth Earbuds Pro',
    supplier: 'Guangzhou Electronics Manufacturing Co.',
    status: 'quoted',
    amount: 14500,
    deadline: '2024-01-25'
  },
  {
    id: 'q2',
    productName: 'Smart LED Strip Lights RGB',
    supplier: 'Shenzhen Tech Innovation Ltd.',
    status: 'pending',
    amount: 6000,
    deadline: '2024-01-28'
  },
  {
    id: 'q3',
    productName: 'Portable Solar Power Bank',
    supplier: 'Shenzhen Tech Innovation Ltd.',
    status: 'accepted',
    amount: 4400,
    deadline: '2024-01-24'
  }
];

export function DashboardPage() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedConversationId, setSelectedConversationId] = useState<string>();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quote':
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      case 'order':
        return <Package className="w-4 h-4 text-green-600" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-purple-600" />;
      case 'supplier':
        return <Users className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'quoted':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your sourcing overview.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Last 30 days
              </Button>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Quote Request
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Quotes</p>
                  <p className="text-3xl font-bold text-gray-900">{mockStats.totalQuotes}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Suppliers</p>
                  <p className="text-3xl font-bold text-gray-900">{mockStats.activeSuppliers}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3 new this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                  <p className="text-3xl font-bold text-gray-900">{mockStats.pendingOrders}</p>
                  <p className="text-sm text-yellow-600 flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    2 due this week
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-3xl font-bold text-gray-900">${mockStats.totalSpent.toLocaleString()}</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <span className="text-sm text-gray-500">{activity.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        {activity.status && (
                          <Badge className={`${getStatusColor(activity.status)} mt-2`}>
                            {activity.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quote Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Active Quotes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockQuoteSummary.map((quote) => (
                    <div key={quote.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm text-gray-900 truncate">
                          {quote.productName}
                        </h4>
                        <Badge className={`${getStatusColor(quote.status)} text-xs`}>
                          {quote.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{quote.supplier}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-green-600">
                          ${quote.amount.toLocaleString()}
                        </span>
                        <span className="text-gray-500">
                          Due: {new Date(quote.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full" size="sm">
                    View All Quotes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Request New Quote
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Find Suppliers
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Package className="w-4 h-4 mr-2" />
                    Browse Products
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Sourcing Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Quote Success Rate</span>
                    <span className="text-sm font-bold text-gray-900">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">18 of 23 quotes accepted</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Avg Response Time</span>
                    <span className="text-sm font-bold text-gray-900">4.2h</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">15% faster than average</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Supplier Satisfaction</span>
                    <span className="text-sm font-bold text-gray-900">4.6/5</span>
                  </div>
                  <Progress value={92} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Based on 12 supplier reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="orders">
        <OrderManagement />
      </TabsContent>

      <TabsContent value="messages">
        <MessageCenter
          selectedConversationId={selectedConversationId}
          onConversationSelect={setSelectedConversationId}
        />
      </TabsContent>

      <TabsContent value="analytics">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sourcing Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500">
                Analytics charts will be implemented here
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Supplier Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500">
                Supplier analytics will be implemented here
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
      </div>
    </div>
  );
}