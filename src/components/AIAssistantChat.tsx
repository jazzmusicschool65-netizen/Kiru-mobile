import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ShoppingBag, 
  Eye, 
  MessageSquare,
  HelpCircle,
  Smartphone,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { AIChatMessage, Product } from '../types';

interface AIAssistantChatProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const AIAssistantChat: React.FC<AIAssistantChatProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome-01',
      sender: 'ai',
      text: "Selam! 👋 I am Kiru AI, your 24/7 Ethiopian Tech Guide & Sales Specialist for Kiru Mobile in Hossana. How can I help you today? Ask me about gaming phones, camera quality, battery specs, or delivery in Hossana!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const promptText = textToSend || inputPrompt;
    if (!promptText.trim() || isLoading) return;

    const userMessage: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          currentProducts: products
        })
      });

      const data = await response.json();

      let recommendedProducts: Product[] = [];
      if (data.recommendedIds && Array.isArray(data.recommendedIds)) {
        recommendedProducts = products.filter(p => data.recommendedIds.includes(p.id));
      }

      const aiMessage: AIChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || "I recommend checking out our top smartphones and power banks in the catalog!",
        recommendedProducts,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage: AIChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: "I am having trouble connecting right now, but feel free to browse our smartphones or contact Kiru Mobile support at +251 911 234 567!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const QUICK_PROMPTS = [
    "Gaming phone under 15,000 ETB",
    "Best camera phone for vlogging",
    "Compare Tecno Camon 30 vs Redmi Note 13",
    "Delivery & Telebirr options in Hossana"
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-neutral-900 border-l border-amber-500/30 text-white flex flex-col shadow-2xl backdrop-blur-md">
      
      {/* Header */}
      <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-neutral-100 flex items-center gap-1.5">
              Kiru AI Tech Specialist
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h3>
            <p className="text-[10px] text-amber-400/90 font-medium">24/7 Smart Customer Guide • Hossana</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white hover:bg-amber-500 hover:text-black transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-black font-medium rounded-tr-none shadow-md'
                  : 'bg-neutral-950 text-neutral-200 border border-neutral-800 rounded-tl-none shadow-lg'
              }`}
            >
              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              
              <div className={`text-[9px] ${msg.sender === 'user' ? 'text-neutral-900' : 'text-neutral-500'} text-right`}>
                {msg.timestamp}
              </div>
            </div>

            {/* Recommended Products Cards inside AI Response */}
            {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
              <div className="w-full mt-2 space-y-2">
                <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Recommended Products:
                </div>
                {msg.recommendedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-2.5 rounded-xl bg-neutral-950 border border-amber-500/30 flex items-center justify-between gap-2 hover:border-amber-400 transition-all cursor-pointer"
                    onClick={() => onSelectProduct(p)}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded-lg bg-black border border-neutral-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate text-xs">{p.name}</div>
                        <div className="text-amber-400 font-black text-xs">
                          {(p.discountPrice || p.price).toLocaleString()} ETB
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(p);
                        }}
                        className="p-1.5 rounded-lg bg-amber-500 text-black hover:bg-amber-400 font-bold"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-amber-400 text-xs italic">
            <Bot className="w-4 h-4 animate-spin" />
            <span>Kiru AI is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="px-3 py-2 bg-neutral-950 border-t border-neutral-800 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] text-amber-300 whitespace-nowrap hover:border-amber-500 hover:bg-amber-500/10 transition-all shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-neutral-950 border-t border-neutral-800 flex gap-2"
      >
        <input
          type="text"
          placeholder="Ask Kiru AI (e.g. gaming phone, camera, price in ETB)..."
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          className="flex-1 px-3 py-2 bg-neutral-900 text-xs text-white placeholder-neutral-500 rounded-xl border border-neutral-800 focus:border-amber-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading || !inputPrompt.trim()}
          className="p-2.5 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
