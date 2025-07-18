import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export interface SearchFilters {
  category: string;
  priceRange: [number, number];
  minOrderQuantity: number;
  location: string;
  certifications: string[];
  supplierType: string;
  paymentTerms: string;
  leadTime: string;
}

const categories = [
  'Consumer Electronics',
  'Machinery',
  'Home & Garden',
  'Fashion & Apparel',
  'Sports & Entertainment',
  'Health & Medical',
  'Auto & Transportation',
  'Construction & Real Estate'
];

const certifications = [
  'ISO 9001',
  'ISO 14001',
  'CE',
  'FDA',
  'FCC',
  'RoHS',
  'REACH',
  'UL'
];

const countries = [
  'China',
  'United States',
  'Germany',
  'India',
  'Japan',
  'United Kingdom',
  'Italy',
  'South Korea',
  'Turkey',
  'Vietnam'
];

export function SearchFilters({ onFiltersChange, isOpen, onToggle }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    priceRange: [0, 10000],
    minOrderQuantity: 1,
    location: '',
    certifications: [],
    supplierType: '',
    paymentTerms: '',
    leadTime: ''
  });

  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    location: true,
    certifications: false,
    supplier: false,
    terms: false
  });

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCertificationChange = (cert: string, checked: boolean) => {
    const newCertifications = checked
      ? [...filters.certifications, cert]
      : filters.certifications.filter(c => c !== cert);
    updateFilters({ certifications: newCertifications });
  };

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      category: '',
      priceRange: [0, 10000],
      minOrderQuantity: 1,
      location: '',
      certifications: [],
      supplierType: '',
      paymentTerms: '',
      leadTime: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={onToggle}
        className="flex items-center gap-2"
      >
        <Filter className="w-4 h-4" />
        Filters
      </Button>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search Filters
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category */}
        <Collapsible open={openSections.category} onOpenChange={() => toggleSection('category')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
            <Label className="font-medium">Category</Label>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.category ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <Select value={filters.category} onValueChange={(value) => updateFilters({ category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CollapsibleContent>
        </Collapsible>

        {/* Price Range */}
        <Collapsible open={openSections.price} onOpenChange={() => toggleSection('price')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
            <Label className="font-medium">Price Range (USD)</Label>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.price ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-4">
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                max={10000}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Min Price</Label>
                <Input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => updateFilters({ priceRange: [Number(e.target.value), filters.priceRange[1]] })}
                  className="h-8"
                />
              </div>
              <div>
                <Label className="text-xs">Max Price</Label>
                <Input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => updateFilters({ priceRange: [filters.priceRange[0], Number(e.target.value)] })}
                  className="h-8"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Location */}
        <Collapsible open={openSections.location} onOpenChange={() => toggleSection('location')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
            <Label className="font-medium">Supplier Location</Label>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.location ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <Select value={filters.location} onValueChange={(value) => updateFilters({ location: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CollapsibleContent>
        </Collapsible>

        {/* Certifications */}
        <Collapsible open={openSections.certifications} onOpenChange={() => toggleSection('certifications')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
            <Label className="font-medium">Certifications</Label>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.certifications ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center space-x-2">
                <Checkbox
                  id={cert}
                  checked={filters.certifications.includes(cert)}
                  onCheckedChange={(checked) => handleCertificationChange(cert, checked as boolean)}
                />
                <Label htmlFor={cert} className="text-sm">{cert}</Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Supplier Type */}
        <Collapsible open={openSections.supplier} onOpenChange={() => toggleSection('supplier')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
            <Label className="font-medium">Supplier Type</Label>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.supplier ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <Select value={filters.supplierType} onValueChange={(value) => updateFilters({ supplierType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="manufacturer">Manufacturer</SelectItem>
                <SelectItem value="trading_company">Trading Company</SelectItem>
                <SelectItem value="distributor">Distributor</SelectItem>
                <SelectItem value="wholesaler">Wholesaler</SelectItem>
              </SelectContent>
            </Select>
          </CollapsibleContent>
        </Collapsible>

        {/* Terms */}
        <Collapsible open={openSections.terms} onOpenChange={() => toggleSection('terms')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
            <Label className="font-medium">Terms & Conditions</Label>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSections.terms ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-4">
            <div>
              <Label className="text-sm">Payment Terms</Label>
              <Select value={filters.paymentTerms} onValueChange={(value) => updateFilters({ paymentTerms: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="tt">T/T (Telegraphic Transfer)</SelectItem>
                  <SelectItem value="lc">L/C (Letter of Credit)</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="western_union">Western Union</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Lead Time</Label>
              <Select value={filters.leadTime} onValueChange={(value) => updateFilters({ leadTime: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select lead time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="1-7">1-7 days</SelectItem>
                  <SelectItem value="8-15">8-15 days</SelectItem>
                  <SelectItem value="16-30">16-30 days</SelectItem>
                  <SelectItem value="31-60">31-60 days</SelectItem>
                  <SelectItem value="60+">60+ days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Min Order Quantity */}
        <div>
          <Label className="font-medium">Min Order Quantity</Label>
          <Input
            type="number"
            value={filters.minOrderQuantity}
            onChange={(e) => updateFilters({ minOrderQuantity: Number(e.target.value) })}
            min={1}
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}