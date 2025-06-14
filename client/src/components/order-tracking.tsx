import { ArrowLeft, Check, UtensilsCrossed, Bike, Home, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import type { Order } from "@shared/schema";

interface OrderTrackingProps {
  orderNumber: string;
  onBack: () => void;
}

export function OrderTracking({ orderNumber, onBack }: OrderTrackingProps) {
  const [currentStatus, setCurrentStatus] = useState(0);

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: [`/api/orders/number/${orderNumber}`],
  });

  const orderStatuses = [
    {
      title: "Order Confirmed",
      description: "Your order has been confirmed by the restaurant",
      icon: Check,
      time: "2:15 PM"
    },
    {
      title: "Food Being Prepared",
      description: "The chef is preparing your delicious meal",
      icon: UtensilsCrossed,
      time: "2:18 PM"
    },
    {
      title: "Out for Delivery",
      description: "Your order is on the way",
      icon: Bike,
      time: "2:35 PM"
    },
    {
      title: "Delivered",
      description: "Enjoy your meal!",
      icon: Home,
      time: "Expected"
    }
  ];

  // Simulate order status progression
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus(prev => {
        if (prev < orderStatuses.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 10000); // Progress every 10 seconds for demo

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-start">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-charcoal mb-2">Order Not Found</h2>
        <p className="text-gray-600 mb-4">The order number you're looking for doesn't exist.</p>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    );
  }

  const items = JSON.parse(order.items);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-charcoal">Order Tracking</h2>
          <Button variant="ghost" onClick={onBack} className="text-primary hover:text-orange-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to restaurants
          </Button>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-charcoal">Order #{order.orderNumber}</span>
            <Badge className="bg-success text-white">
              {currentStatus === orderStatuses.length - 1 ? 'Delivered' : `Expected in ${25 - (currentStatus * 5)} mins`}
            </Badge>
          </div>
          <p className="text-gray-600 text-sm">
            {order.customerName} • {items.length} items • ₹{order.total}
          </p>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h4 className="font-medium text-charcoal mb-3">Items Ordered</h4>
          <div className="space-y-2">
            {items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-8 h-8 object-cover rounded mr-3" 
                  />
                  <span className="text-sm">{item.name}</span>
                  <span className="text-xs text-gray-500 ml-2">x{item.quantity}</span>
                </div>
                <span className="text-sm font-medium">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {orderStatuses.map((status, index) => {
            const Icon = status.icon;
            const isCompleted = index <= currentStatus;
            const isCurrent = index === currentStatus;
            
            return (
              <div key={index} className="relative flex items-start mb-6 last:mb-0">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                  isCompleted 
                    ? 'bg-success' 
                    : isCurrent 
                    ? 'bg-primary animate-pulse' 
                    : 'bg-gray-300'
                }`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="ml-4 min-w-0 flex-1">
                  <h4 className={`font-medium ${isCompleted || isCurrent ? 'text-charcoal' : 'text-gray-500'}`}>
                    {status.title}
                  </h4>
                  <p className={`text-sm ${isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-500'}`}>
                    {status.description}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {index <= currentStatus ? status.time : ''}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery Person Info */}
        {currentStatus >= 2 && (
          <div className="bg-gray-50 rounded-xl p-4 mt-6">
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                alt="Delivery person" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 ml-3">
                <h5 className="font-medium text-charcoal">Raj Kumar</h5>
                <p className="text-gray-600 text-sm">Your delivery partner</p>
              </div>
              <Button 
                size="icon"
                className="bg-primary text-white hover:bg-orange-600"
              >
                <Phone className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
