import { useState, useMemo } from 'react';
import { Search, MapPin, Star, Users, Package, Filter, Grid, List } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { SupplierCard } from '../components/supplier/SupplierCard';
import { mockSuppliers } from '../data/mockData';
import { Supplier } from '../types';

export function SupplierDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedBusinessType, setSelectedBusinessType] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const countries = ['China', 'India', 'United States', 'Germany', 'Turkey', 'Italy'];
  const businessTypes = ['Manufacturer', 'Trading Company', 'Distributor'];

  const filteredSuppliers = useMemo(() => {
    let filtered = mockSuppliers;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(supplier =>
        supplier.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.mainProducts.some(product => 
          product.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Country filter
    if (selectedCountry !== 'all') {
      filtered = filtered.filter(supplier => supplier.location.country === selectedCountry);
    }

    // Business type filter
    if (selectedBusinessType !== 'all') {
      filtered = filtered.filter(supplier => supplier.businessType === selectedBusinessType);
    }

    // Rating filter
    filtered = filtered.filter(supplier => supplier.rating >= minRating);

    // Sort
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'response-rate':
        filtered.sort((a, b) => b.responseRate - a.responseRate);
        break;
      case 'established':
        filtered.sort((a, b) => a.established - b.established);
        break;
      case 'products':
        filtered.sort((a, b) => b.stats.totalProducts - a.stats.totalProducts);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCountry, selectedBusinessType, minRating, sortBy]);

  const handleSupplierClick = (supplierId: string) => {
    console.log('Navigate to supplier profile:', supplierId);
  };

  const handleContactSupplier = (supplierId: string) => {
    console.log('Contact supplier:', supplierId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Supplier Directory</h1>
          <p className="text-gray-600 mb-6">Connect with verified suppliers from around the world</p>
          
          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search suppliers, companies, or products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">200K+</div>
              <div className="text-sm text-gray-600">Verified Suppliers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">180+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">95%</div>
              <div className="text-sm text-gray-600">Response Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className={`w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Location</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="all-countries"
                      checked={selectedCountry === 'all'}
                      onCheckedChange={() => setSelectedCountry('all')}
                    />
                    <label htmlFor="all-countries" className="text-sm">All Countries</label>
                  </div>
                  {countries.map((country) => (
                    <div key={country} className="flex items-center space-x-2">
                      <Checkbox
                        id={country}
                        checked={selectedCountry === country}
                        onCheckedChange={() => setSelectedCountry(country)}
                      />
                      <label htmlFor={country} className="text-sm">{country}</label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Business Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="all-types"
                      checked={selectedBusinessType === 'all'}
                      onCheckedChange={() => setSelectedBusinessType('all')}
                    />
                    <label htmlFor="all-types" className="text-sm">All Types</label>
                  </div>
                  {businessTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={selectedBusinessType === type}
                        onCheckedChange={() => setSelectedBusinessType(type)}
                      />
                      <label htmlFor={type} className="text-sm">{type}</label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Minimum Rating</h3>
                <div className="space-y-2">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={minRating === rating}
                        onCheckedChange={() => setMinRating(rating)}
                      />
                      <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                        {rating === 0 ? 'Any Rating' : (
                          <>
                            {rating}+ <Star className="w-3 h-3 ml-1 fill-yellow-400 text-yellow-400" />
                          </>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Certifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="iso9001" />
                    <label htmlFor="iso9001" className="text-sm">ISO 9001</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ce" />
                    <label htmlFor="ce" className="text-sm">CE</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fcc" />
                    <label htmlFor="fcc" className="text-sm">FCC</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rohs" />
                    <label htmlFor="rohs" className="text-sm">RoHS</label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                Showing {filteredSuppliers.length} suppliers
              </div>
              
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="response-rate">Response Rate</SelectItem>
                    <SelectItem value="established">Established Date</SelectItem>
                    <SelectItem value="products">Product Count</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Suppliers Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 lg:grid-cols-2' 
                : 'grid-cols-1'
            }`}>
              {filteredSuppliers.map((supplier) => (
                <SupplierCard
                  key={supplier.id}
                  supplier={supplier}
                  onViewProfile={handleSupplierClick}
                  onContact={handleContactSupplier}
                  layout={viewMode}
                />
              ))}
            </div>

            {filteredSuppliers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Users className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No suppliers found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}