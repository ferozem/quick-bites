import { Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Restaurant } from "@shared/schema";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <Card className="restaurant-card cursor-pointer overflow-hidden" onClick={onClick}>
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-success text-white hover:bg-success/90">
            {Math.floor(Math.random() * 40) + 20}% OFF
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h4 className="font-semibold text-lg text-charcoal mb-1 line-clamp-1">
          {restaurant.name}
        </h4>
        <p className="text-gray-600 text-sm mb-2 line-clamp-1">
          {restaurant.cuisine}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-success fill-current mr-1" />
              <span className="font-medium text-sm">{restaurant.rating}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-gray-500 mr-1" />
              <span className="text-gray-600 text-sm">{restaurant.deliveryTime}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-600 text-sm">₹{restaurant.priceForTwo} for two</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
