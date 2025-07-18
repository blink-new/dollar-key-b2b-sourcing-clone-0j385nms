import { useState, useEffect } from 'react';
import { Search, TrendingUp, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface SearchSuggestionsProps {
  query: string;
  onSuggestionClick: (suggestion: string) => void;
  onClose: () => void;
  isVisible: boolean;
}

const trendingSearches = [
  'Wireless earbuds',
  'LED strip lights',
  'Solar power bank',
  'Bluetooth speakers',
  'Phone accessories',
  'Smart home devices',
  'Garden planters',
  'Kitchen gadgets'
];

const recentSearches = [
  'Ceramic planters',
  'RGB LED lights',
  'Portable charger'
];

const categories = [
  'Consumer Electronics',
  'LED Lighting',
  'Solar Products',
  'Home & Garden',
  'Fashion & Apparel',
  'Sports & Entertainment',
  'Health & Medical',
  'Auto & Transportation'
];

export function SearchSuggestions({ query, onSuggestionClick, onClose, isVisible }: SearchSuggestionsProps) {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  useEffect(() => {
    if (query.length > 0) {
      // Filter trending searches based on query
      const filtered = trendingSearches.filter(search =>
        search.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 5));

      // Filter categories based on query
      const filteredCats = categories.filter(category =>
        category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(filteredCats.slice(0, 3));
    } else {
      setFilteredSuggestions([]);
      setFilteredCategories([]);
    }
  }, [query]);

  if (!isVisible) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1">
      <div className="max-h-96 overflow-y-auto">
        {query.length === 0 ? (
          // Show trending and recent searches when no query
          <div className="p-4">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Recent Searches</span>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-2"
                      onClick={() => onSuggestionClick(search)}
                    >
                      <Search className="w-4 h-4 mr-2 text-gray-400" />
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Trending Searches</span>
              </div>
              <div className="space-y-1">
                {trendingSearches.slice(0, 6).map((search, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-2"
                    onClick={() => onSuggestionClick(search)}
                  >
                    <TrendingUp className="w-4 h-4 mr-2 text-orange-500" />
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Show filtered suggestions when there's a query
          <div className="p-4">
            {/* Search Suggestions */}
            {filteredSuggestions.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Suggestions</div>
                <div className="space-y-1">
                  {filteredSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-2"
                      onClick={() => onSuggestionClick(suggestion)}
                    >
                      <Search className="w-4 h-4 mr-2 text-gray-400" />
                      <span>
                        {suggestion.split(new RegExp(`(${query})`, 'gi')).map((part, i) => 
                          part.toLowerCase() === query.toLowerCase() ? (
                            <mark key={i} className="bg-yellow-200">{part}</mark>
                          ) : (
                            part
                          )
                        )}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Category Suggestions */}
            {filteredCategories.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Categories</div>
                <div className="space-y-1">
                  {filteredCategories.map((category, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-2"
                      onClick={() => onSuggestionClick(category)}
                    >
                      <Badge variant="outline" className="mr-2">
                        Category
                      </Badge>
                      <span>
                        {category.split(new RegExp(`(${query})`, 'gi')).map((part, i) => 
                          part.toLowerCase() === query.toLowerCase() ? (
                            <mark key={i} className="bg-yellow-200">{part}</mark>
                          ) : (
                            part
                          )
                        )}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {filteredSuggestions.length === 0 && filteredCategories.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No suggestions found for "{query}"</p>
                <p className="text-sm">Try searching for products or categories</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}