import { restaurants, menuItems, orders, type Restaurant, type InsertRestaurant, type MenuItem, type InsertMenuItem, type Order, type InsertOrder } from "@shared/schema";

export interface IStorage {
  // Restaurants
  getRestaurants(): Promise<Restaurant[]>;
  getRestaurant(id: number): Promise<Restaurant | undefined>;
  createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant>;
  
  // Menu Items
  getMenuItemsByRestaurant(restaurantId: number): Promise<MenuItem[]>;
  getMenuItem(id: number): Promise<MenuItem | undefined>;
  createMenuItem(menuItem: InsertMenuItem): Promise<MenuItem>;
  
  // Orders
  getOrder(id: number): Promise<Order | undefined>;
  getOrderByNumber(orderNumber: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private restaurants: Map<number, Restaurant>;
  private menuItems: Map<number, MenuItem>;
  private orders: Map<number, Order>;
  private currentRestaurantId: number;
  private currentMenuItemId: number;
  private currentOrderId: number;

  constructor() {
    this.restaurants = new Map();
    this.menuItems = new Map();
    this.orders = new Map();
    this.currentRestaurantId = 1;
    this.currentMenuItemId = 1;
    this.currentOrderId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed restaurants
    const restaurantData: InsertRestaurant[] = [
      {
        name: "Spice Garden",
        cuisine: "Indian, North Indian, Biryani",
        rating: "4.3",
        deliveryTime: "25-30 mins",
        priceForTwo: 300,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240",
        address: "Downtown, San Francisco"
      },
      {
        name: "Pizza Palace",
        cuisine: "Pizza, Italian, Fast Food",
        rating: "4.5",
        deliveryTime: "20-25 mins",
        priceForTwo: 400,
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240",
        address: "Downtown, San Francisco"
      },
      {
        name: "Burger Hub",
        cuisine: "Burgers, American, Fast Food",
        rating: "4.2",
        deliveryTime: "15-20 mins",
        priceForTwo: 350,
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240",
        address: "Downtown, San Francisco"
      },
      {
        name: "Sushi Zen",
        cuisine: "Japanese, Sushi, Asian",
        rating: "4.6",
        deliveryTime: "30-35 mins",
        priceForTwo: 800,
        image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=240",
        address: "Downtown, San Francisco"
      }
    ];

    restaurantData.forEach(restaurant => {
      const id = this.currentRestaurantId++;
      this.restaurants.set(id, { ...restaurant, id, isActive: true });
    });

    // Seed menu items for Spice Garden (id: 1)
    const menuItemsData: InsertMenuItem[] = [
      {
        restaurantId: 1,
        name: "Paneer Tikka",
        description: "Grilled cottage cheese marinated in aromatic spices",
        price: 280,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=80",
        isVeg: true
      },
      {
        restaurantId: 1,
        name: "Chicken Tikka",
        description: "Tender chicken marinated in yogurt and spices",
        price: 320,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=80",
        isVeg: false
      },
      {
        restaurantId: 1,
        name: "Butter Chicken",
        description: "Tender chicken in rich tomato and butter gravy",
        price: 380,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=80",
        isVeg: false
      },
      {
        restaurantId: 1,
        name: "Chicken Biryani",
        description: "Aromatic basmati rice with spiced chicken and saffron",
        price: 420,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=80",
        isVeg: false
      },
      {
        restaurantId: 1,
        name: "Dal Tadka",
        description: "Yellow lentils tempered with cumin and spices",
        price: 220,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=80",
        isVeg: true
      },
      {
        restaurantId: 1,
        name: "Gulab Jamun",
        description: "Soft milk dumplings in sweet cardamom syrup",
        price: 120,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=80",
        isVeg: true
      }
    ];

    menuItemsData.forEach(menuItem => {
      const id = this.currentMenuItemId++;
      this.menuItems.set(id, { ...menuItem, id, isAvailable: true });
    });
  }

  async getRestaurants(): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values()).filter(r => r.isActive);
  }

  async getRestaurant(id: number): Promise<Restaurant | undefined> {
    return this.restaurants.get(id);
  }

  async createRestaurant(insertRestaurant: InsertRestaurant): Promise<Restaurant> {
    const id = this.currentRestaurantId++;
    const restaurant: Restaurant = { ...insertRestaurant, id, isActive: true };
    this.restaurants.set(id, restaurant);
    return restaurant;
  }

  async getMenuItemsByRestaurant(restaurantId: number): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values())
      .filter(item => item.restaurantId === restaurantId && item.isAvailable);
  }

  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async createMenuItem(insertMenuItem: InsertMenuItem): Promise<MenuItem> {
    const id = this.currentMenuItemId++;
    const menuItem: MenuItem = { ...insertMenuItem, id, isAvailable: true };
    this.menuItems.set(id, menuItem);
    return menuItem;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    return Array.from(this.orders.values()).find(order => order.orderNumber === orderNumber);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const orderNumber = `QE${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const order: Order = {
      ...insertOrder,
      id,
      orderNumber,
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (order) {
      order.status = status;
      this.orders.set(id, order);
      return order;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
