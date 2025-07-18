import { useState } from 'react';
import { Plus, Search, Filter, Clock, CheckCircle, XCircle, MessageSquare, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';

interface QuoteRequest {
  id: string;
  productName: string;
  productImage: string;
  supplier: {
    name: string;
    company: string;
    avatar: string;
  };
  quantity: number;
  targetPrice: number;
  status: 'pending' | 'quoted' | 'negotiating' | 'accepted' | 'rejected';
  createdAt: string;
  deadline: string;
  requirements: string;
  quotes?: {
    price: number;
    moq: number;
    leadTime: string;
    validUntil: string;
  }[];
}

const mockQuoteRequests: QuoteRequest[] = [
  {
    id: 'req-001',
    productName: 'Wireless Bluetooth Earbuds Pro',
    productImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop',
    supplier: {
      name: 'Zhang Wei',
      company: 'Guangzhou Electronics Manufacturing Co., Ltd.',
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop'
    },
    quantity: 1000,
    targetPrice: 15.00,
    status: 'quoted',
    createdAt: '2024-01-15',
    deadline: '2024-01-25',
    requirements: 'Need custom packaging with our logo. Prefer black color variant.',
    quotes: [
      {
        price: 14.50,
        moq: 500,
        leadTime: '15-20 days',
        validUntil: '2024-01-30'
      }
    ]
  },
  {
    id: 'req-002',
    productName: 'Smart LED Strip Lights RGB',
    productImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
    supplier: {
      name: 'Li Ming',
      company: 'Shenzhen Tech Innovation Ltd.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop'
    },
    quantity: 500,
    targetPrice: 12.00,
    status: 'pending',
    createdAt: '2024-01-16',
    deadline: '2024-01-28',
    requirements: 'Need 5-meter length with WiFi control. CE certification required.'
  },
  {
    id: 'req-003',
    productName: 'Portable Solar Power Bank',
    productImage: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=100&h=100&fit=crop',
    supplier: {
      name: 'Li Ming',
      company: 'Shenzhen Tech Innovation Ltd.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop'
    },
    quantity: 200,
    targetPrice: 20.00,
    status: 'negotiating',
    createdAt: '2024-01-14',
    deadline: '2024-01-24',
    requirements: 'Need waterproof rating IPX6 or higher. Custom logo engraving.',
    quotes: [
      {
        price: 22.00,
        moq: 100,
        leadTime: '12-15 days',
        validUntil: '2024-01-28'
      }
    ]
  }
];

export function QuoteRequestsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'quoted':
        return 'bg-blue-100 text-blue-800';
      case 'negotiating':
        return 'bg-purple-100 text-purple-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'quoted':
        return <MessageSquare className="w-4 h-4" />;
      case 'negotiating':
        return <MessageSquare className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredRequests = mockQuoteRequests.filter(request => {
    const matchesSearch = request.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.supplier.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const requestsByStatus = {
    all: mockQuoteRequests.length,
    pending: mockQuoteRequests.filter(r => r.status === 'pending').length,
    quoted: mockQuoteRequests.filter(r => r.status === 'quoted').length,
    negotiating: mockQuoteRequests.filter(r => r.status === 'negotiating').length,
    accepted: mockQuoteRequests.filter(r => r.status === 'accepted').length,
    rejected: mockQuoteRequests.filter(r => r.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quote Requests</h1>
              <p className="text-gray-600">Manage your product quote requests and supplier responses</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Quote Request
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search quote requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status ({requestsByStatus.all})</SelectItem>
                <SelectItem value="pending">Pending ({requestsByStatus.pending})</SelectItem>
                <SelectItem value="quoted">Quoted ({requestsByStatus.quoted})</SelectItem>
                <SelectItem value="negotiating">Negotiating ({requestsByStatus.negotiating})</SelectItem>
                <SelectItem value="accepted">Accepted ({requestsByStatus.accepted})</SelectItem>
                <SelectItem value="rejected">Rejected ({requestsByStatus.rejected})</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{requestsByStatus.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{requestsByStatus.quoted}</div>
                <div className="text-sm text-gray-600">Quoted</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{requestsByStatus.negotiating}</div>
                <div className="text-sm text-gray-600">Negotiating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{requestsByStatus.accepted}</div>
                <div className="text-sm text-gray-600">Accepted</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{requestsByStatus.rejected}</div>
                <div className="text-sm text-gray-600">Rejected</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Quote Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Product Image */}
                  <img
                    src={request.productImage}
                    alt={request.productName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {request.productName}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={request.supplier.avatar} />
                            <AvatarFallback>{request.supplier.name[0]}</AvatarFallback>
                          </Avatar>
                          <span>{request.supplier.company}</span>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(request.status)} flex items-center gap-1`}>
                        {getStatusIcon(request.status)}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-500">Quantity</div>
                        <div className="font-medium">{request.quantity.toLocaleString()} pcs</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Target Price</div>
                        <div className="font-medium">${request.targetPrice}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Created</div>
                        <div className="font-medium">{new Date(request.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Deadline</div>
                        <div className="font-medium">{new Date(request.deadline).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">Requirements</div>
                      <p className="text-sm text-gray-700">{request.requirements}</p>
                    </div>

                    {/* Quotes */}
                    {request.quotes && request.quotes.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-gray-900 mb-3">Supplier Quote</h4>
                        {request.quotes.map((quote, index) => (
                          <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500">Price</div>
                              <div className="font-medium text-green-600">${quote.price}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">MOQ</div>
                              <div className="font-medium">{quote.moq} pcs</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Lead Time</div>
                              <div className="font-medium">{quote.leadTime}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Valid Until</div>
                              <div className="font-medium">{new Date(quote.validUntil).toLocaleDateString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        Message Supplier
                      </Button>
                      {request.status === 'quoted' && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Accept Quote
                          </Button>
                          <Button variant="outline" size="sm">
                            Negotiate
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MessageSquare className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No quote requests found</h3>
            <p className="text-gray-600 mb-4">Start by requesting quotes from suppliers</p>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Quote Request
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}