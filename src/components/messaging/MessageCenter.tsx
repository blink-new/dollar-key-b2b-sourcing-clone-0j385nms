import { useState, useRef, useEffect, useMemo } from 'react';
import { 
  MessageSquare, 
  Send, 
  Search, 
  MoreVertical, 
  Paperclip, 
  Phone, 
  Video,
  User,
  Building2,
  Clock,
  Check,
  CheckCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useAuth } from '../../hooks/useAuth';

interface Conversation {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierCompany: string;
  supplierAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'active' | 'archived';
  isOnline: boolean;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderType: 'buyer' | 'supplier';
  content: string;
  messageType: 'text' | 'image' | 'file' | 'quote';
  attachmentUrl?: string;
  isRead: boolean;
  timestamp: string;
}

const mockConversations: Conversation[] = [
  {
    id: 'conv_1',
    supplierId: 'supplier_1',
    supplierName: 'Zhang Wei',
    supplierCompany: 'Shenzhen Electronics Co.',
    supplierAvatar: '/api/placeholder/40/40',
    lastMessage: 'Thank you for your inquiry about the wireless headphones. I can offer you a competitive price.',
    lastMessageTime: '2 min ago',
    unreadCount: 2,
    status: 'active',
    isOnline: true
  },
  {
    id: 'conv_2',
    supplierId: 'supplier_2',
    supplierName: 'Maria Rodriguez',
    supplierCompany: 'Global Trading Solutions',
    supplierAvatar: '/api/placeholder/40/40',
    lastMessage: 'The smart watches are available in stock. When do you need them delivered?',
    lastMessageTime: '1 hour ago',
    unreadCount: 1,
    status: 'active',
    isOnline: false
  },
  {
    id: 'conv_3',
    supplierId: 'supplier_3',
    supplierName: 'Li Ming',
    supplierCompany: 'Guangzhou Tech Manufacturing',
    supplierAvatar: '/api/placeholder/40/40',
    lastMessage: 'I have received your quote request and will get back to you within 24 hours.',
    lastMessageTime: '3 hours ago',
    unreadCount: 0,
    status: 'active',
    isOnline: true
  },
  {
    id: 'conv_4',
    supplierId: 'supplier_4',
    supplierName: 'Sarah Johnson',
    supplierCompany: 'American Import Co.',
    supplierAvatar: '/api/placeholder/40/40',
    lastMessage: 'Perfect! I will prepare the samples and send them to you by tomorrow.',
    lastMessageTime: '1 day ago',
    unreadCount: 0,
    status: 'active',
    isOnline: false
  }
];

const mockMessages: { [key: string]: Message[] } = {
  conv_1: [
    {
      id: 'msg_1',
      conversationId: 'conv_1',
      senderId: 'user_123',
      senderName: 'John Buyer',
      senderType: 'buyer',
      content: 'Hi, I am interested in your wireless bluetooth headphones. Can you provide a quote for 500 units?',
      messageType: 'text',
      isRead: true,
      timestamp: '2024-01-23T10:30:00Z'
    },
    {
      id: 'msg_2',
      conversationId: 'conv_1',
      senderId: 'supplier_1',
      senderName: 'Zhang Wei',
      senderType: 'supplier',
      content: 'Hello! Thank you for your interest. For 500 units of our premium wireless headphones, I can offer $25 per unit. MOQ is 100 units.',
      messageType: 'text',
      isRead: true,
      timestamp: '2024-01-23T10:45:00Z'
    },
    {
      id: 'msg_3',
      conversationId: 'conv_1',
      senderId: 'user_123',
      senderName: 'John Buyer',
      senderType: 'buyer',
      content: 'That sounds good. What about the lead time and shipping terms?',
      messageType: 'text',
      isRead: true,
      timestamp: '2024-01-23T11:00:00Z'
    },
    {
      id: 'msg_4',
      conversationId: 'conv_1',
      senderId: 'supplier_1',
      senderName: 'Zhang Wei',
      senderType: 'supplier',
      content: 'Lead time is 15-20 days after payment confirmation. We can ship FOB Shenzhen or arrange door-to-door delivery.',
      messageType: 'text',
      isRead: false,
      timestamp: '2024-01-23T11:15:00Z'
    },
    {
      id: 'msg_5',
      conversationId: 'conv_1',
      senderId: 'supplier_1',
      senderName: 'Zhang Wei',
      senderType: 'supplier',
      content: 'Thank you for your inquiry about the wireless headphones. I can offer you a competitive price.',
      messageType: 'text',
      isRead: false,
      timestamp: '2024-01-23T11:30:00Z'
    }
  ],
  conv_2: [
    {
      id: 'msg_6',
      conversationId: 'conv_2',
      senderId: 'user_123',
      senderName: 'John Buyer',
      senderType: 'buyer',
      content: 'I need 200 smart watches for my retail store. What is your best price?',
      messageType: 'text',
      isRead: true,
      timestamp: '2024-01-23T09:00:00Z'
    },
    {
      id: 'msg_7',
      conversationId: 'conv_2',
      senderId: 'supplier_2',
      senderName: 'Maria Rodriguez',
      senderType: 'supplier',
      content: 'The smart watches are available in stock. When do you need them delivered?',
      messageType: 'text',
      isRead: false,
      timestamp: '2024-01-23T09:30:00Z'
    }
  ],
  conv_3: [
    {
      id: 'msg_8',
      conversationId: 'conv_3',
      senderId: 'user_123',
      senderName: 'John Buyer',
      senderType: 'buyer',
      content: 'Can you provide samples of your solar power banks before I place a bulk order?',
      messageType: 'text',
      isRead: true,
      timestamp: '2024-01-23T08:00:00Z'
    },
    {
      id: 'msg_9',
      conversationId: 'conv_3',
      senderId: 'supplier_3',
      senderName: 'Li Ming',
      senderType: 'supplier',
      content: 'I have received your quote request and will get back to you within 24 hours.',
      messageType: 'text',
      isRead: true,
      timestamp: '2024-01-23T08:15:00Z'
    }
  ]
};

interface MessageCenterProps {
  selectedConversationId?: string;
  onConversationSelect: (conversationId: string) => void;
}

export function MessageCenter({ selectedConversationId, onConversationSelect }: MessageCenterProps) {
  const { user } = useAuth();
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>(mockMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);
  const conversationMessages = useMemo(() => {
    return selectedConversationId ? messages[selectedConversationId] || [] : [];
  }, [selectedConversationId, messages]);

  const filteredConversations = conversations.filter(conv =>
    conv.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.supplierCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversationId || !user) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      conversationId: selectedConversationId,
      senderId: user.id,
      senderName: user.name || 'You',
      senderType: 'buyer',
      content: newMessage.trim(),
      messageType: 'text',
      isRead: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), message]
    }));

    setNewMessage('');

    // Simulate supplier response after 2 seconds
    setTimeout(() => {
      const supplierResponse: Message = {
        id: `msg_${Date.now() + 1}`,
        conversationId: selectedConversationId,
        senderId: selectedConversation?.supplierId || 'supplier',
        senderName: selectedConversation?.supplierName || 'Supplier',
        senderType: 'supplier',
        content: 'Thank you for your message. I will review your request and get back to you shortly.',
        messageType: 'text',
        isRead: false,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => ({
        ...prev,
        [selectedConversationId]: [...(prev[selectedConversationId] || []), supplierResponse]
      }));
    }, 2000);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatLastMessageTime = (timeStr: string) => {
    return timeStr;
  };

  return (
    <div className="h-[600px] flex bg-white rounded-lg border overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Messages</h3>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onConversationSelect(conversation.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors mb-1 ${
                  selectedConversationId === conversation.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={conversation.supplierAvatar} />
                      <AvatarFallback>
                        {conversation.supplierName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm text-gray-900 truncate">
                        {conversation.supplierName}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {formatLastMessageTime(conversation.lastMessageTime)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-1">
                      <Building2 className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600 truncate">
                        {conversation.supplierCompany}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate flex-1">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-blue-600 text-white text-xs ml-2">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedConversation.supplierAvatar} />
                      <AvatarFallback>
                        {selectedConversation.supplierName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedConversation.supplierName}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {selectedConversation.supplierCompany}
                      </span>
                      {selectedConversation.isOnline && (
                        <span className="text-xs text-green-600 ml-2">Online</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
                      <DropdownMenuItem>Block Supplier</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {conversationMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderType === 'buyer' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.senderType === 'buyer'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 ${
                        message.senderType === 'buyer' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{formatTime(message.timestamp)}</span>
                        {message.senderType === 'buyer' && (
                          message.isRead ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-[40px] max-h-[120px] resize-none"
                  />
                </div>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-600">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}