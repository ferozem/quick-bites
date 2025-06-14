import { useState } from "react";
import { Search, MapPin, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";

interface HeaderProps {
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ onCartClick, searchQuery, onSearchChange }: HeaderProps) {
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">QuickEats</h1>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium text-charcoal">Delivering to:</span>
              <span className="text-gray-600">Downtown, San Francisco</span>
              <Button variant="ghost" size="sm" className="text-primary hover:text-orange-600 p-0 h-auto">
                Change
              </Button>
            </div>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for restaurants, cuisines, or dishes"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-4 pr-10 py-2 border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <Button variant="ghost" className="hidden md:flex items-center space-x-2 text-charcoal hover:text-primary">
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Button>
            <Button
              onClick={onCartClick}
              className="relative flex items-center space-x-2 bg-primary text-white hover:bg-orange-600 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center cart-count">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
