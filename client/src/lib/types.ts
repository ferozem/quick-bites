export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: number;
}

export interface DeliveryDetails {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
}

export interface OrderStatus {
  status: string;
  timestamp: string;
  message: string;
  icon: string;
}
