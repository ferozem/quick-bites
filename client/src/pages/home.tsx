import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { RestaurantCard } from "@/components/restaurant-card";
import { RestaurantDetail } from "@/components/restaurant-detail";
import { OrderTracking } from "@/components/order-tracking";
import { CartSidebar } from "@/components/cart-sidebar";
import { Button } from "@/components/ui/button";
import { Filter, Star } from "lucide-react";
import type { Restaurant } from "@shared/schema";

type Section = "home" | "restaurant" | "tracking";

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("home");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: restaurants, isLoading } = useQuery<Restaurant[]>({
    queryKey: ["/api/restaurants"],
  });

  const cuisineCategories = [
    {
      name: "Indian",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
    },
    {
      name: "Pizza",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
    },
    {
      name: "Burgers",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
    },
    {
      name: "Sushi",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
    },
    {
      name: "Chinese",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
    },
    {
      name: "Mexican",
      image: "https://images.unsplash.com/photo-1555628060-b5529cb0ec5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
    }
  ];

  const filteredRestaurants = restaurants?.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentSection("restaurant");
  };

  const handleOrderPlaced = (orderNum: string) => {
    setOrderNumber(orderNum);
    setCurrentSection("tracking");
  };

  const handleBackToHome = () => {
    setCurrentSection("home");
    setSelectedRestaurant(null);
    setOrderNumber("");
  };

  if (currentSection === "restaurant" && selectedRestaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          onCartClick={() => setIsCartOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <RestaurantDetail
            restaurant={selectedRestaurant}
            onBack={handleBackToHome}
          />
        </main>
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onOrderPlaced={handleOrderPlaced}
        />
      </div>
    );
  }

  if (currentSection === "tracking" && orderNumber) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          onCartClick={() => setIsCartOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <OrderTracking
            orderNumber={orderNumber}
            onBack={handleBackToHome}
          />
        </main>
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onOrderPlaced={handleOrderPlaced}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Banner */}
        <div className="mb-8">
          <div className="relative h-64 bg-gradient-to-r from-primary to-orange-600 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="relative z-10 flex flex-col justify-center h-full px-8 text-white">
              <h2 className="text-4xl font-bold mb-2">Hungry? We've got you covered!</h2>
              <p className="text-xl mb-4">Order from your favorite restaurants in minutes</p>
              <div className="flex space-x-4">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Fast delivery</span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">1000+ restaurants</span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Live tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cuisine Categories */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-charcoal mb-6">What's on your mind?</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-4">
            {cuisineCategories.map((category) => (
              <div
                key={category.name}
                className="category-item text-center cursor-pointer"
                onClick={() => setSearchQuery(category.name)}
              >
                <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-charcoal">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="filter-button">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" className="filter-button">Sort By</Button>
            <Button variant="outline" className="filter-button">Fast Delivery</Button>
            <Button variant="outline" className="filter-button">New on QuickEats</Button>
            <Button variant="outline" className="filter-button">
              <Star className="w-4 h-4 mr-1" />
              Ratings 4.0+
            </Button>
            <Button variant="outline" className="filter-button">Pure Veg</Button>
          </div>
        </div>

        {/* Restaurant Listings */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-charcoal">
              {searchQuery ? `Restaurants matching "${searchQuery}"` : "Restaurants delivering to you"}
            </h3>
            {searchQuery && (
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery("")}
                className="text-primary hover:text-orange-600 hover:border-primary"
              >
                Clear search
              </Button>
            )}
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-48 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : filteredRestaurants && filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => handleRestaurantClick(restaurant)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No restaurants found</div>
              <div className="text-gray-500">Try searching for something else</div>
            </div>
          )}
        </div>
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOrderPlaced={handleOrderPlaced}
      />
    </div>
  );
}
