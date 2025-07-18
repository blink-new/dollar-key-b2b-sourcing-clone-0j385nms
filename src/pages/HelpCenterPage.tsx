import { useState } from 'react';
import { Search, Book, MessageCircle, Phone, Mail, ChevronRight, Star, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
}

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  views: number;
}

const mockFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I request a quote from a supplier?',
    answer: 'To request a quote, navigate to the product page and click the "Request Quote" button. Fill in your requirements including quantity, target price, and any special requirements. The supplier will receive your request and respond within 24-48 hours.',
    category: 'Getting Started',
    helpful: 45,
    notHelpful: 3
  },
  {
    id: 'faq-2',
    question: 'How are suppliers verified on Dollar Key?',
    answer: 'All suppliers go through a comprehensive verification process including business license verification, factory inspection, quality management system assessment, and financial background checks. Verified suppliers display a "Verified" badge on their profiles.',
    category: 'Suppliers',
    helpful: 38,
    notHelpful: 2
  },
  {
    id: 'faq-3',
    question: 'What is Trade Assurance and how does it work?',
    answer: 'Trade Assurance is our buyer protection service that covers your orders from payment to delivery. It protects against product quality issues, shipping delays, and other trade disputes. Coverage is free for all verified transactions.',
    category: 'Payments',
    helpful: 52,
    notHelpful: 1
  },
  {
    id: 'faq-4',
    question: 'How do I track my order status?',
    answer: 'You can track your orders in the Dashboard under "My Orders". Each order shows real-time status updates including production progress, quality inspection, and shipping information. You\'ll also receive email notifications for major updates.',
    category: 'Orders',
    helpful: 29,
    notHelpful: 4
  },
  {
    id: 'faq-5',
    question: 'What payment methods are accepted?',
    answer: 'We accept major credit cards, bank transfers, PayPal, and Letter of Credit (L/C). Payment methods may vary by supplier and order value. All payments are processed securely through our encrypted payment system.',
    category: 'Payments',
    helpful: 33,
    notHelpful: 2
  }
];

const mockArticles: Article[] = [
  {
    id: 'art-1',
    title: 'Complete Guide to B2B Sourcing',
    description: 'Learn the fundamentals of B2B sourcing, from finding suppliers to negotiating contracts.',
    category: 'Getting Started',
    readTime: '8 min read',
    views: 1250
  },
  {
    id: 'art-2',
    title: 'How to Evaluate Supplier Quality',
    description: 'Essential criteria and methods for assessing supplier capabilities and reliability.',
    category: 'Suppliers',
    readTime: '6 min read',
    views: 890
  },
  {
    id: 'art-3',
    title: 'Understanding International Shipping Terms',
    description: 'Comprehensive guide to Incoterms and international shipping arrangements.',
    category: 'Shipping',
    readTime: '10 min read',
    views: 675
  },
  {
    id: 'art-4',
    title: 'Negotiating Better Prices with Suppliers',
    description: 'Proven strategies and tactics for successful price negotiations.',
    category: 'Negotiation',
    readTime: '7 min read',
    views: 1100
  }
];

const categories = [
  'Getting Started',
  'Suppliers',
  'Orders',
  'Payments',
  'Shipping',
  'Quality Control',
  'Account Management'
];

export function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFAQs = mockFAQs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFeedback = (faqId: string, helpful: boolean) => {
    console.log(`FAQ ${faqId} marked as ${helpful ? 'helpful' : 'not helpful'}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Find answers to your questions, browse our guides, or get in touch with our support team
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 text-lg bg-white text-gray-900 border-0 rounded-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Get instant help from our support team</p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Speak directly with our experts</p>
              <Button variant="outline" className="w-full">Call Now</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us a detailed message</p>
              <Button variant="outline" className="w-full">Send Email</Button>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === 'all' ? 'default' : 'secondary'}
              className="cursor-pointer px-4 py-2"
              onClick={() => setSelectedCategory('all')}
            >
              All Topics
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'secondary'}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <Tabs defaultValue="faqs" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="faqs" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Frequently Asked Questions
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <Book className="w-4 h-4" />
              Guides & Articles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faqs">
            <div className="space-y-4">
              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="text-xs">
                            {faq.category}
                          </Badge>
                          <span className="font-medium">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-4">
                          <p className="text-gray-700 mb-4">{faq.answer}</p>
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="text-sm text-gray-500">
                              Was this helpful?
                            </div>
                            <div className="flex items-center gap-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleFeedback(faq.id, true)}
                                className="flex items-center gap-1 text-green-600 hover:text-green-700"
                              >
                                <ThumbsUp className="w-4 h-4" />
                                Yes ({faq.helpful})
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleFeedback(faq.id, false)}
                                className="flex items-center gap-1 text-red-600 hover:text-red-700"
                              >
                                <ThumbsDown className="w-4 h-4" />
                                No ({faq.notHelpful})
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No FAQs found</h3>
                  <p className="text-gray-600">Try adjusting your search or browse all topics</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="guides">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{article.category}</Badge>
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{article.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{article.views} views</span>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          Read More
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600">Try adjusting your search or browse all topics</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Contact Information */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Still need help?</h2>
            <p className="text-gray-600">Our support team is here to assist you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-2">Available 24/7</p>
              <p className="text-sm text-gray-500">Average response: 2 minutes</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Phone Support</h3>
              <p className="text-sm text-gray-600 mb-2">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
              <p className="text-sm text-gray-600 mb-2">support@dollarkey.com</p>
              <p className="text-sm text-gray-500">Response within 4 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}