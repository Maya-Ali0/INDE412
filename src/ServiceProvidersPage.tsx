import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Clock, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Star, Award, ChevronRight,Search,Filter, X } from "lucide-react";

// Provider type definition
interface Provider {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  specialty: string;
  location: string;
  region?:string;
  price: number; // Base price for services
  services: string[]; // List of services offered
  availability: string[]; // Available days
}

interface ServiceDetail {
  id: string;
  name: string;
}

export const ServiceProvidersPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Service catalog mapping
  const serviceMapping: Record<string, ServiceDetail> = {
    "hair": { id: "hair", name: "Hair & Styling" },
    "nails": { id: "nails", name: "Nails & Waxing" },
    "massage": { id: "massage", name: "Massages & Wellness" },
    "barbers": { id: "barbers", name: "Barber Services" },
    "tattoos": { id: "tattoos", name: "Tattoos & Body Art" }
  };

  // Mock providers data - in a real app, you would fetch this from your API
  const mockProviders: Record<string, Provider[]> = {
    "hair": [
      {
        id: "h1",
        name: "Nadine Mcheik",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
        rating: 4.9,
        reviewCount: 124,
        specialty: "Color Specialist & Bridal Stylist",
        location: "Beirut Central",
        region: "Beirut",
        price: 75,
        services: ["Women's Haircut", "Blowout", "Color", "Bridal Styling", "Hair Treatment"],
        availability: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"]
      },
      {
        id: "h2",
        name: "Hashem Khodor",
        image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80",
        rating: 4.8,
        reviewCount: 98,
        specialty: "Precision Cuts & Styling",
        location: "West Side",
        price: 80,
        services: ["Men's Haircut", "Women's Haircut", "Blowout", "Hair Treatment"],
        availability: ["Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"]
      },
      {
        id: "h3",
        name: "Nour El-Haj",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
        rating: 4.9,
        reviewCount: 112,
        specialty: "Extensions & Textured Hair",
        location: "North District",
        price: 90,
        services: ["Women's Haircut", "Extensions", "Braiding", "Natural Hair Styling"],
        availability: ["Monday", "Thursday", "Friday", "Saturday"]
      },
      {
        id: "h4",
        name: "Jacques Abboud",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
        rating: 4.7,
        reviewCount: 87,
        specialty: "Men's Styling & Fades",
        location: "Downtown",
        price: 65,
        services: ["Men's Haircut", "Beard Trim", "Hot Towel Shave"],
        availability: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      },
      {
        id: "h5",
        name: "Amira El-Khoury",
        image: "https://images.unsplash.com/photo-1592621385612-4d7129426394?auto=format&fit=crop&q=80",
        rating: 4.9,
        reviewCount: 156,
        specialty: "Creative Color & Balayage",
        location: "East Side",
        price: 95,
        services: ["Color", "Balayage", "Highlights", "Women's Haircut", "Blowout"],
        availability: ["Monday", "Wednesday", "Friday", "Saturday"]
      },
      {
        id: "h6",
        name: "Malik Assaleh",
        image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80",
        rating: 4.6,
        reviewCount: 76,
        specialty: "Curl Specialist & Natural Hair",
        location: "South District",
        price: 85,
        services: ["Natural Hair Styling", "Curly Cuts", "Women's Haircut", "Hair Treatment"],
        availability: ["Monday", "Tuesday", "Thursday", "Saturday"]
      }
    ],
    "nails": [
      {
        id: "n1",
        name: "Mariam Farhat",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80",
        rating: 4.9,
        reviewCount: 156,
        specialty: "Nail Art & Gel Extensions",
        location: "East Side",
        price: 45,
        services: ["Gel Manicure", "Nail Art", "Acrylic Extensions", "Nail Repair"],
        availability: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"]
      },
      {
        id: "n2",
        name: "Nadim Mouawwad",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80",
        rating: 4.7,
        reviewCount: 89,
        specialty: "Precision Waxing & Manicures",
        location: "South District",
        price: 50,
        services: ["Classic Manicure", "Brow Waxing", "Full Body Waxing", "Men's Grooming"],
        availability: ["Tuesday", "Wednesday", "Thursday", "Saturday"]
      },
      {
        id: "n3",
        name: "Zara Malik",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80",
        rating: 4.8,
        reviewCount: 134,
        specialty: "Acrylics & 3D Nail Art",
        location: "Central",
        price: 55,
        services: ["Acrylic Full Set", "3D Nail Art", "Gel Manicure", "Nail Repair"],
        availability: ["Monday", "Thursday", "Friday", "Saturday", "Sunday"]
      },
      {
        id: "n4",
        name: "Tina El-Amine",
        image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80",
        rating: 4.9,
        reviewCount: 167,
        specialty: "Luxury Pedicures & Reflexology",
        location: "North District",
        price: 65,
        services: ["Luxury Pedicure", "Reflexology", "Classic Manicure", "Spa Treatment"],
        availability: ["Tuesday", "Wednesday", "Friday", "Saturday"]
      }
    ],
    "massage": [
      {
        id: "m1",
        name: "Joe Khoury",
        image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80",
        rating: 4.9,
        reviewCount: 203,
        specialty: "Deep Tissue & Sports Therapy",
        location: "All Areas",
        price: 100,
        services: ["Deep Tissue Massage", "Sports Massage", "Swedish Massage", "Trigger Point Therapy"],
        availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"]
      },
      {
        id: "m2",
        name: "Elena Hlayhel",
        image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80",
        rating: 5.0,
        reviewCount: 178,
        specialty: "Swedish & Hot Stone Therapy",
        location: "Central & North",
        price: 110,
        services: ["Swedish Massage", "Hot Stone Massage", "Aromatherapy", "Relaxation Massage"],
        availability: ["Tuesday", "Thursday", "Friday", "Saturday", "Sunday"]
      },
      {
        id: "m3",
        name: "Omar Ibrahim",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
        rating: 4.8,
        reviewCount: 156,
        specialty: "Therapeutic & Prenatal Massage",
        location: "South & East",
        price: 95,
        services: ["Therapeutic Massage", "Prenatal Massage", "Swedish Massage", "Lymphatic Drainage"],
        availability: ["Monday", "Wednesday", "Friday", "Saturday"]
      }
    ],
    "barbers": [
      {
        id: "b1",
        name: "Hassan Hamdar",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
        rating: 4.9,
        reviewCount: 187,
        specialty: "Classic Cuts & Fades",
        location: "All Areas",
        price: 55,
        services: ["Haircut", "Fade", "Beard Trim", "Hot Towel Shave"],
        availability: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"]
      },
      {
        id: "b2",
        name: "Miguel Boulos",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
        rating: 4.8,
        reviewCount: 154,
        specialty: "Beard Styling & Hot Towel Shaves",
        location: "Downtown & West",
        price: 50,
        services: ["Beard Trim", "Beard Styling", "Hot Towel Shave", "Haircut"],
        availability: ["Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"]
      },
      {
        id: "b3",
        name: "Alex Mabsout",
        image: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?auto=format&fit=crop&q=80",
        rating: 4.7,
        reviewCount: 129,
        specialty: "Modern Styles & Texture Work",
        location: "North & East",
        price: 60,
        services: ["Modern Haircut", "Texture Cut", "Color", "Beard Trim"],
        availability: ["Monday", "Thursday", "Friday", "Saturday"]
      }
    ],
    "tattoos": [
      {
        id: "t1",
        name: "Luna Mcheik",
        image: "https://images.unsplash.com/photo-1542740348-39501cd6e2b4?auto=format&fit=crop&q=80",
        rating: 4.9,
        reviewCount: 213,
        specialty: "Fine Line & Minimalist Designs",
        location: "All Areas",
        price: 120,
        services: ["Small Tattoo", "Minimalist Design", "Fine Line", "Touch-up"],
        availability: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"]
      },
      {
        id: "t2",
        name: "Ahmad El-Hajj ",
        image: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&q=80",
        rating: 4.8,
        reviewCount: 189,
        specialty: "Neo-Traditional & Color Work",
        location: "Central & West",
        price: 150,
        services: ["Medium Tattoo", "Color Work", "Neo-Traditional", "Custom Design"],
        availability: ["Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"]
      },
      {
        id: "t3",
        name: "Jade Eid",
        image: "https://images.unsplash.com/photo-1606122017369-d782bbb78f32?auto=format&fit=crop&q=80",
        rating: 4.9,
        reviewCount: 176,
        specialty: "Blackwork & Geometric Designs",
        location: "East & North",
        price: 140,
        services: ["Geometric Designs", "Blackwork", "Medium Tattoo", "Large Tattoo"],
        availability: ["Monday", "Thursday", "Friday", "Saturday"]
      }
    ]
  };

  // Get unique locations from the providers
  const getUniqueLocations = () => {
    if (!providers.length) return [];
    
    const locations = providers.map(provider => provider.location);
    return [...new Set(locations)];
  };

  useEffect(() => {
    // Find the selected service based on the URL parameter
    if (serviceId && serviceMapping[serviceId]) {
      setSelectedService(serviceMapping[serviceId]);
      
      // Set providers for the selected service
      if (mockProviders[serviceId]) {
        setProviders(mockProviders[serviceId]);
        setFilteredProviders(mockProviders[serviceId]);
        
        // Initialize price range based on the providers for this service
        const prices = mockProviders[serviceId].map(p => p.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange([minPrice, maxPrice]);
      }
    }

    // Handle scroll for the navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [serviceId]);

  // Apply filters when any filter changes
  useEffect(() => {
    let results = [...providers];
    
    // Apply search term filter
    if (searchTerm) {
      results = results.filter(provider => 
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply price range filter
    results = results.filter(provider => 
      provider.price >= priceRange[0] && provider.price <= priceRange[1]
    );
    
    // Apply location filter
    if (selectedLocations.length > 0) {
      results = results.filter(provider => 
        selectedLocations.some(loc => provider.location.includes(loc))
      );
    }
    
    // Apply rating filter
    if (minRating > 0) {
      results = results.filter(provider => provider.rating >= minRating);
    }
    
    setFilteredProviders(results);
  }, [searchTerm, priceRange, selectedLocations, minRating, providers]);

  // Toggle a location filter
  const toggleLocation = (location: string) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter(loc => loc !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange([
      Math.min(...providers.map(p => p.price)),
      Math.max(...providers.map(p => p.price))
    ]);
    setSelectedLocations([]);
    setMinRating(0);
  };

  if (!selectedService) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-serif mb-4">Service not found</h2>
          <Link to="/" className="text-primary hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "nav-scrolled" : "nav-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-serif font-medium">
              <Link to="/" className={isScrolled ? "text-white" : "text-white"}>
                GlamGo
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`${
                  isScrolled ? "text-white" : "text-white"
                } hover:text-secondary transition-colors`}
              >
                Home
              </Link>
              <Link
                to="/#services"
                className={`${
                  isScrolled ? "text-white" : "text-white"
                } hover:text-secondary transition-colors`}
              >
                Services
              </Link>
              <Link
                to="/#about"
                className={`${
                  isScrolled ? "text-white" : "text-white"
                } hover:text-secondary transition-colors`}
              >
                About
              </Link>
              <Link
                to="/#gallery"
                className={`${
                  isScrolled ? "text-white" : "text-white"
                } hover:text-secondary transition-colors`}
              >
                Gallery
              </Link>
              <Link
                to="/#contact"
                className={`${
                  isScrolled ? "text-white" : "text-white"
                } hover:text-secondary transition-colors`}
              >
                Contact
              </Link>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all duration-300">
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="pt-32 pb-10 bg-accent">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link 
              to={`/services/${serviceId}`} 
              className="inline-flex items-center text-primary hover:underline"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to {selectedService.name}
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-secondary mb-4">
            Find {selectedService.name} Providers
          </h1>
          <p className="text-lg text-text-light max-w-2xl">
            Browse our vetted professionals and book appointments that come to you — wherever you are.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter Sidebar - Mobile Toggle */}
            <button 
              className="md:hidden flex items-center justify-center gap-2 bg-accent py-3 px-4 rounded-lg mb-4 w-full"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="w-5 h-5" />
              <span>{isFilterOpen ? "Hide Filters" : "Show Filters"}</span>
            </button>

            {/* Filter Sidebar */}
            <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block md:w-1/4 bg-accent p-6 rounded-xl h-fit sticky top-24`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif font-medium text-secondary">Filters</h2>
                <button 
                  className="text-primary text-sm hover:underline"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-8">
                <label className="block text-secondary font-medium mb-2">Search</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search by name or service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <label className="block text-secondary font-medium mb-2">Price Range</label>
                <div className="px-2">
                  <div className="flex justify-between mb-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input 
                    type="range" 
                    min={Math.min(...providers.map(p => p.price))}
                    max={Math.max(...providers.map(p => p.price))}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full mb-4"
                  />
                  <input 
                    type="range" 
                    min={Math.min(...providers.map(p => p.price))}
                    max={Math.max(...providers.map(p => p.price))}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-8">
                <label className="block text-secondary font-medium mb-2">Location</label>
                <div className="space-y-2">
                  {getUniqueLocations().map((location) => (
                    <label key={location} className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={selectedLocations.includes(location)}
                        onChange={() => toggleLocation(location)}
                        className="mr-2 h-4 w-4 text-primary"
                      />
                      <span>{location}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="mb-4">
                <label className="block text-secondary font-medium mb-2">Minimum Rating</label>
                <div className="flex items-center space-x-2">
                  {[0, 3, 3.5, 4, 4.5, 5].map((rating) => (
                    <button 
                      key={rating}
                      className={`px-3 py-1 rounded-full text-sm ${
                        minRating === rating 
                          ? 'bg-primary text-white' 
                          : 'bg-white text-secondary'
                      }`}
                      onClick={() => setMinRating(rating)}
                    >
                      {rating > 0 ? rating.toString() : 'Any'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Providers Listing */}
            <div className="md:w-3/4">
              {/* Results Summary */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-text-light">
                  {filteredProviders.length} {filteredProviders.length === 1 ? 'provider' : 'providers'} available
                </p>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-text-light">Sort by:</span>
                  <select className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Highest Rated</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Most Reviews</option>
                  </select>
                </div>
              </div>

              {/* Applied Filters */}
              {(searchTerm || selectedLocations.length > 0 || minRating > 0) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {searchTerm && (
                    <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                      <span className="mr-2">"{searchTerm}"</span>
                      <button onClick={() => setSearchTerm("")}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  {selectedLocations.map(location => (
                    <div key={location} className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                      <span className="mr-2">{location}</span>
                      <button onClick={() => toggleLocation(location)}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {minRating > 0 && (
                    <div className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
                      <span className="mr-2">Rating: {minRating}+</span>
                      <button onClick={() => setMinRating(0)}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Providers Grid */}
              {filteredProviders.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredProviders.map((provider) => (
                    <div 
                      key={provider.id} 
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/3 h-48 sm:h-auto">
                          <img 
                            src={provider.image} 
                            alt={provider.name} 
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="sm:w-2/3 p-5">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-serif font-medium text-secondary">{provider.name}</h3>
                            <div className="flex items-center bg-accent px-2 py-1 rounded-full">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="ml-1 font-medium">{provider.rating}</span>
                              <span className="ml-1 text-text-light text-xs">({provider.reviewCount})</span>
                            </div>
                          </div>
                          <p className="text-primary font-medium text-sm mb-2">{provider.specialty}</p>
                          <div className="flex items-center text-text-light text-sm mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{provider.location}</span>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-xs text-text-light mb-1">Services:</p>
                            <div className="flex flex-wrap gap-1">
                              {provider.services.slice(0, 3).map((service, idx) => (
                                <span 
                                  key={idx} 
                                  className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                                >
                                  {service}
                                </span>
                              ))}
                              {provider.services.length > 3 && (
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                  +{provider.services.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-medium">
                              From ${provider.price}
                            </div>
                            <Link to={`/services/${serviceId}/providers/${provider.id}`} className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition-all duration-300">
  Book Now
</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <p className="text-lg mb-3">No providers found matching your filters</p>
                  <button 
                    className="text-primary hover:underline"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Load More Button */}
              {filteredProviders.length > 0 && (
                <div className="text-center mt-10">
                  <button className="bg-white text-primary border border-primary px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-all duration-300">
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-serif font-medium mb-6">GlamGo</h3>
              <p className="text-gray-400 text-lg">
                Your go-to platform for effortless beauty and wellness —
                wherever you are.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-medium mb-6">Hours</h3>
              <p className="text-gray-400 text-lg">Mon-Fri: 9am - 8pm</p>
              <p className="text-gray-400 text-lg">Sat: 9am - 6pm</p>
              <p className="text-gray-400 text-lg">Sun: 10am - 5pm</p>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-medium mb-6">Contact</h3>
              <p className="text-gray-400 text-lg">(+961) 01 123 456</p>
              <p className="text-gray-400 text-lg">info@glamgo.com</p>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-medium mb-6">
                Follow Us
              </h3>
              <div className="flex gap-6">
                <Instagram className="w-8 h-8 cursor-pointer hover:text-primary transition-colors duration-300" />
                <Facebook className="w-8 h-8 cursor-pointer hover:text-primary transition-colors duration-300" />
                <Twitter className="w-8 h-8 cursor-pointer hover:text-primary transition-colors duration-300" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 GlamGo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServiceProvidersPage;