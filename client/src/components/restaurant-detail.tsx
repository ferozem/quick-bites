import { ArrowLeft, Star, Clock, Circle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import type { Restaurant, MenuItem } from "@shared/schema";

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onBack: () => void;
}

export function RestaurantDetail({ restaurant, onBack }: RestaurantDetailProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: menuItems, isLoading } = useQuery<MenuItem[]>({
    queryKey: [`/api/restaurants/${restaurant.id}/menu`],
  });

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId: item.restaurantId
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  // Group menu items by category
  const groupedItems = menuItems?.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="space-y-6">
      {/* Restaurant Header */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="relative">
          <img
            src={restaurant.image}
            alt={`${restaurant.name} interior`}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{restaurant.name}</h2>
            <p className="text-lg mb-2">{restaurant.cuisine}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-current mr-1" />
                <span className="font-medium">{restaurant.rating} (1,250+ ratings)</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <span>₹{restaurant.priceForTwo} for two</span>
            </div>
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 text-white"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-2xl font-semibold text-charcoal mb-6">Menu</h3>
        
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="space-y-4">
                  {[1, 2].map(j => (
                    <div key={j} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded w-40 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-64 mb-2"></div>
                        <div className="h-5 bg-gray-200 rounded w-16"></div>
                      </div>
                      <div className="ml-4">
                        <div className="w-20 h-16 bg-gray-200 rounded-lg"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedItems || {}).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-xl font-medium text-charcoal mb-4 border-b border-gray-200 pb-2">
                  {category}
                </h4>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="menu-item-card flex items-center justify-between p-4 border border-gray-100 rounded-xl"
                    >
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Circle className={`w-3 h-3 mr-2 ${item.isVeg ? 'text-success fill-current' : 'text-red-500 fill-current'}`} />
                          <h5 className="font-medium text-charcoal">{item.name}</h5>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <p className="font-semibold text-charcoal">₹{item.price}</p>
                      </div>
                      <div className="flex items-center ml-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-16 object-cover rounded-lg mr-4"
                        />
                        <Button
                          className="add-button bg-primary text-white hover:bg-orange-600 transition-colors"
                          onClick={() => handleAddToCart(item)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          ADD
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
