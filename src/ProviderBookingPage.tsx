import { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar, Clock, MapPin, Phone, Mail, CreditCard, CheckCircle, X, Send } from "lucide-react";

// Provider type definition (same as in ServiceProvidersPage)
interface Provider {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  specialty: string;
  location: string;
  region?: string;
  price: number;
  services: string[];
  availability: string[];
}

// Service option type
interface ServiceOption {
  name: string;
  price: number;
  duration: number; // in minutes
}

// Booking date/time types
interface TimeSlot {
  time: string;
  available: boolean;
}

export const ProviderBookingPage = () => {
  const { serviceId, providerId } = useParams<{ serviceId: string; providerId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [bookingComplete, setBookingComplete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Array<{sender: string; message: string; timestamp: Date}>>([]);

  // Mock service options based on provider services
  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);
  
  // Mock available dates (next 14 days)
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  });

  // Mock time slots
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    
    // Generate time slots from 9 AM to 7 PM
    for (let hour = 9; hour < 19; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
        // Randomly make some slots unavailable
        slots.push({
          time,
          available: Math.random() > 0.3
        });
      }
    }
    
    return slots;
  };
  
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  // Mock provider data retrieval
  useEffect(() => {
    // In a real app, you would fetch the provider data from your API
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
      }]
    };

    if (serviceId && providerId) {
      // Find the provider in the mock data
      const providerData = mockProviders[serviceId]?.find(p => p.id === providerId);
      
      if (providerData) {
        setProvider(providerData);
        
        // Generate service options with mock prices and durations
        const options: ServiceOption[] = providerData.services.map(service => ({
          name: service,
          price: providerData.price + Math.floor(Math.random() * 50), // Base price + random addition
          duration: [30, 45, 60, 90, 120][Math.floor(Math.random() * 5)] // Random duration
        }));
        
        setServiceOptions(options);
      }
      
      setTimeSlots(generateTimeSlots());
      setLoading(false);
    }

    // Handle scroll for the navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [serviceId, providerId]);

  // Format the date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle booking submission
  const handleBookingSubmit = () => {
    // In a real app, you would send the booking data to your API
    setTimeout(() => {
      setBookingComplete(true);
      setBookingStep(3);
    }, 1500);
  };
  
  // Handle sending chat messages
  const handleSendMessage = () => {
    if (chatMessage.trim() === "") return;
    
    // Add user message to chat history
    const newMessage = {
      sender: "You",
      message: chatMessage,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, newMessage]);
    setChatMessage("");
    
    // Simulate provider response after a short delay
    setTimeout(() => {
      const providerResponse = {
        sender: provider?.name || "Provider",
        message: getRandomResponse(),
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, providerResponse]);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };
  
  // Generate random response messages for demo
  const getRandomResponse = () => {
    const responses = [
      "Hi there! How can I help you today?",
      "Thanks for reaching out. Do you have any questions about my services?",
      "I'd be happy to discuss appointment details. What would you like to know?",
      "Good news, I have some availability this week if you're looking to book soon.",
      "I'm available to answer any questions you might have about the service.",
      "Let me know if you need any information before booking your appointment."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // If provider not found
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-serif mb-4">Loading...</h2>
        </div>
      </div>
    );
  }
  
  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-serif mb-4">Provider not found</h2>
          <Link to={`/services/${serviceId}`} className="text-primary hover:underline">
            Return to service providers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation - same as in ServiceProvidersPage */}
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
              Back to providers
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-secondary mb-4">
            Book with {provider.name}
          </h1>
          <p className="text-lg text-text-light max-w-2xl">
            {provider.specialty} • {provider.location} • ⭐ {provider.rating} ({provider.reviewCount} reviews)
          </p>
        </div>
      </div>

      {/* Booking Progress Steps */}
      <div className="py-6 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between">
            <div className={`flex flex-col items-center ${bookingStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${bookingStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>1</div>
              <span className="text-sm">Select Service</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className={`h-1 w-full ${bookingStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            </div>
            <div className={`flex flex-col items-center ${bookingStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${bookingStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>2</div>
              <span className="text-sm">Choose Time</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className={`h-1 w-full ${bookingStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            </div>
            <div className={`flex flex-col items-center ${bookingStep >= 3 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${bookingStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>3</div>
              <span className="text-sm">Confirm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Booking Content */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Booking Form */}
            <div className="md:w-2/3">
              {/* Step 1: Select Service */}
              {bookingStep === 1 && (
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-2xl font-serif font-medium mb-6">Select a Service</h2>
                  <div className="space-y-4">
                    {serviceOptions.map((service, index) => (
                      <div 
                        key={index}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                          selectedService?.name === service.name ? 'border-primary bg-accent/10' : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedService(service)}
                      >
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-lg">{service.name}</h3>
                            <p className="text-sm text-gray-500">{service.duration} min</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${service.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-right">
                    <button 
                      className={`px-6 py-3 rounded-full font-medium ${
                        selectedService 
                          ? 'bg-primary text-white hover:opacity-90' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      } transition-all duration-300`}
                      disabled={!selectedService}
                      onClick={() => selectedService && setBookingStep(2)}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Select Date & Time */}
              {bookingStep === 2 && (
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-2xl font-serif font-medium mb-6">Select Date & Time</h2>
                  
                  {/* Date Selection */}
                  <div className="mb-8">
                    <h3 className="font-medium mb-4">Select a Date</h3>
                    <div className="flex overflow-x-auto pb-4 space-x-2">
                      {availableDates.map((date) => {
                        const dateObj = new Date(date);
                        const day = dateObj.getDate();
                        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                        const isWeekend = dayName === 'Sat' || dayName === 'Sun';
                        const isSelected = date === selectedDate;
                        
                        return (
                          <div 
                            key={date}
                            className={`flex-shrink-0 p-3 rounded-lg w-20 text-center cursor-pointer ${
                              isSelected 
                                ? 'bg-primary text-white' 
                                : isWeekend 
                                  ? 'bg-accent/50' 
                                  : 'bg-accent'
                            }`}
                            onClick={() => setSelectedDate(date)}
                          >
                            <p className="text-sm">{dayName}</p>
                            <p className="text-xl font-medium">{day}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Time Selection - only shown after date selection */}
                  {selectedDate && (
                    <div>
                      <h3 className="font-medium mb-4">Select a Time</h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {timeSlots.map((slot, index) => (
                          <button 
                            key={index}
                            className={`p-2 rounded-lg text-center ${
                              slot.available 
                                ? selectedTime === slot.time
                                  ? 'bg-primary text-white' 
                                  : 'bg-accent hover:bg-accent/80'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!slot.available}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8 flex justify-between">
                    <button 
                      className="px-6 py-3 rounded-full font-medium border border-gray-300 hover:bg-gray-100 transition-all duration-300"
                      onClick={() => setBookingStep(1)}
                    >
                      Back
                    </button>
                    <button 
                      className={`px-6 py-3 rounded-full font-medium ${
                        selectedDate && selectedTime 
                          ? 'bg-primary text-white hover:opacity-90' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      } transition-all duration-300`}
                      disabled={!selectedDate || !selectedTime}
                      onClick={() => (selectedDate && selectedTime) && setBookingStep(3)}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Confirmation & Payment */}
              {bookingStep === 3 && (
                <div className="bg-white rounded-xl shadow p-6">
                  {!bookingComplete ? (
                    <>
                      <h2 className="text-2xl font-serif font-medium mb-6">Confirm Your Booking</h2>
                      
                      {/* Booking Summary */}
                      <div className="bg-accent/30 p-4 rounded-lg mb-6">
                        <h3 className="font-medium mb-3">Booking Summary</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Service:</span>
                            <span className="font-medium">{selectedService?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{selectedService?.duration} minutes</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Date:</span>
                            <span>{selectedDate ? formatDate(selectedDate) : ''}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Time:</span>
                            <span>{selectedTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Provider:</span>
                            <span>{provider.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Location:</span>
                            <span>{provider.location}</span>
                          </div>
                          <div className="border-t pt-2 mt-2 flex justify-between">
                            <span className="font-medium">Total:</span>
                            <span className="font-medium">${selectedService?.price}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Payment Form */}
                      <div className="mb-6">
                        <h3 className="font-medium mb-4">Payment Details</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm mb-1">Name on Card</label>
                            <input 
                              type="text" 
                              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                              placeholder="Full Name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">Card Number</label>
                            <div className="relative">
                              <input 
                                type="text" 
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                                placeholder="0000 0000 0000 0000"
                              />
                              <CreditCard className="absolute right-3 top-3 text-gray-400" />
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-1/2">
                              <label className="block text-sm mb-1">Expiry Date</label>
                              <input 
                                type="text" 
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                                placeholder="MM/YY"
                              />
                            </div>
                            <div className="w-1/2">
                              <label className="block text-sm mb-1">CVV</label>
                              <input 
                                type="text" 
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-6">
                        <input type="checkbox" id="terms" className="mr-2" />
                        <label htmlFor="terms" className="text-sm">
                          I agree to the <span className="text-primary">Terms and Conditions</span> and <span className="text-primary">Cancellation Policy</span>
                        </label>
                      </div>
                      
                      <div className="mt-8 flex justify-between">
                        <button 
                          className="px-6 py-3 rounded-full font-medium border border-gray-300 hover:bg-gray-100 transition-all duration-300"
                          onClick={() => setBookingStep(2)}
                        >
                          Back
                        </button>
                        <button 
                          className="px-6 py-3 rounded-full font-medium bg-primary text-white hover:opacity-90 transition-all duration-300"
                          onClick={handleBookingSubmit}
                        >
                          Confirm & Pay
                        </button>
                      </div>
                    </>
                  ) : (
                    // Booking Success Message
                    <div className="text-center py-8">
                      <div className="inline-flex justify-center items-center w-16 h-16 bg-green-100 rounded-full mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                      </div>
                      <h2 className="text-2xl font-serif font-medium mb-3">Booking Confirmed!</h2>
                      <p className="text-gray-600 mb-6">
                        Your appointment with {provider.name} has been confirmed for {selectedDate ? formatDate(selectedDate) : ''} at {selectedTime}.
                      </p>
                      <div className="bg-accent/30 p-4 rounded-lg mb-6 text-left">
                        <h3 className="font-medium mb-3">Booking Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Service:</span>
                            <span>{selectedService?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Date:</span>
                            <span>{selectedDate ? formatDate(selectedDate) : ''}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Time:</span>
                            <span>{selectedTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Booking Reference:</span>
                            <span className="font-medium">GG-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-6">
                        A confirmation email has been sent to your email address.
                      </p>
                      <button 
                        className="px-6 py-3 rounded-full font-medium bg-primary text-white hover:opacity-90 transition-all duration-300"
                        onClick={() => navigate('/')}
                      >
                        Return to Home
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Provider Info Sidebar */}
            <div className="md:w-1/3">
              <div className="bg-white rounded-xl shadow overflow-hidden sticky top-24">
                <img 
                  src={provider.image} 
                  alt={provider.name} 
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-5">
                  <h3 className="text-xl font-serif font-medium text-secondary mb-2">{provider.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{provider.specialty}</p>
                  
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center text-text-light text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{provider.location}</span>
                    </div>
                    <div className="flex items-center text-text-light text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Available: {provider.availability.join(', ')}</span>
                    </div>
                    <button 
                      onClick={() => setShowChat(prev => !prev)} 
                      className="flex items-center text-primary hover:underline text-sm"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      <span>Contact provider</span>
                    </button>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Services</h4>
                    <ul className="space-y-1 text-sm">
                      {provider.services.map((service, idx) => (
                        <li key={idx}>{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chat Interface */}
            {showChat && (
              <div className="fixed bottom-4 right-4 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col" style={{ height: "400px" }}>
                {/* Chat Header */}
                <div className="flex items-center justify-between bg-primary text-white p-3 rounded-t-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                      {provider?.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{provider?.name}</p>
                      <p className="text-xs opacity-80">Usually responds in a few minutes</p>
                    </div>
                  </div>
                  <button onClick={() => setShowChat(false)} className="text-white hover:text-gray-200">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-gray-500 mt-4">
                      <p>Start a conversation with {provider?.name}</p>
                      <p className="text-xs mt-2">Ask about services, availability, or any questions you have</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {chatHistory.map((chat, index) => (
                        <div 
                          key={index} 
                          className={`flex ${chat.sender === "You" ? "justify-end" : "justify-start"}`}
                        >
                          <div 
                            className={`max-w-xs py-2 px-3 rounded-lg ${
                              chat.sender === "You" 
                                ? "bg-primary text-white rounded-br-none" 
                                : "bg-white border rounded-bl-none"
                            }`}
                          >
                            <p>{chat.message}</p>
                            <p className={`text-xs mt-1 ${chat.sender === "You" ? "text-white/70" : "text-gray-500"}`}>
                              {chat.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Chat Input */}
                <div className="p-3 border-t">
                  <div className="flex">
                    <input 
                      type="text" 
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 py-2 px-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={chatMessage.trim() === ""}
                      className={`py-2 px-4 rounded-r-lg ${
                        chatMessage.trim() === "" 
                          ? "bg-gray-200 text-gray-400" 
                          : "bg-primary text-white"
                      }`}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer - abbreviated version */}
      <footer className="bg-secondary text-white py-10 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-serif font-medium mb-4">GlamGo</h3>
          <p className="text-gray-400 mb-6">
            Your go-to platform for effortless beauty and wellness — wherever you are.
          </p>
          <p className="text-gray-400">
            &copy; 2024 GlamGo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProviderBookingPage;