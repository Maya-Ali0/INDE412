import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Clock, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Star, Award, ChevronRight } from "lucide-react";

// Service type definition
interface ServiceDetail {
  id: string;
  name: string;
  description: string;
  image: string;
  pricing: {
    service: string;
    price: string;
  }[];
  icon: JSX.Element;
  providers: Provider[];
  inspirationGallery: InspirationItem[];
}

interface Provider {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  specialty: string;
  location: string;
}

interface InspirationItem {
  id: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
}

export const ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

 
  const services: Record<string, ServiceDetail> = {
    "hair": {
      id: "hair",
      name: "Hair & Styling",
      description: "Professional hair services delivered to your location. Our stylists bring the salon experience to you with everything from cuts and color to blowouts and bridal styling.",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80",
      pricing: [
        { service: "Women's Haircut", price: "$75+" },
        { service: "Men's Haircut", price: "$55+" },
        { service: "Blowout", price: "$65+" },
        { service: "Color", price: "$120+" },
        { service: "Bridal Styling", price: "$150+" }
      ],
      icon: <Clock className="w-10 h-10 text-primary" />,
      providers: [
        {
          id: "h1",
          name: "Nadine Mcheik",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
          rating: 4.9,
          reviewCount: 124,
          specialty: "Color Specialist & Bridal Stylist",
          location: "Downtown"
        },
        {
          id: "h2",
          name: "Hashem Khodor",
          image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80",
          rating: 4.8,
          reviewCount: 98,
          specialty: "Precision Cuts & Styling",
          location: "West Side"
        },
        {
          id: "h3",
          name: "Nour El-Hajj",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
          rating: 4.9,
          reviewCount: 112,
          specialty: "Extensions & Textured Hair",
          location: "North District"
        }
      ],
      inspirationGallery: [
        {
          id: "hi1",
          image: "https://i.pinimg.com/736x/97/62/50/97625069f11f22149e998fea245a1b45.jpg",
          title: "Elegant Bridal Updo",
          description: "Sophisticated twisted updo with delicate accessories, perfect for bridal events",
          tags: ["bridal", "updo", "elegant"]
        },
        {
          id: "hi2",
          image: "https://i.pinimg.com/736x/b2/92/3c/b2923c6bd8f4ac06e572223ce6142d2f.jpg",
          title: "Modern Bob Cut",
          description: "Sleek, precision-cut bob with subtle layers for movement and texture",
          tags: ["bob", "modern", "sleek"]
        },
        {
          id: "hi3",
          image: "https://i.pinimg.com/736x/ec/46/03/ec46031afbb7103dea1c22b2f3168814.jpg",
          title: "Vibrant Balayage",
          description: "Hand-painted highlights creating a natural sun-kissed gradient effect",
          tags: ["balayage", "color", "natural"]
        },
        {
          id: "hi4",
          image: "https://i.pinimg.com/736x/6c/02/c0/6c02c0d8b0921d8b24e93c34800f9f40.jpg",
          title: "Textured Waves",
          description: "Effortless beach waves with volume and movement for a casual yet polished look",
          tags: ["waves", "texture", "casual"]
        }
      ]
    },
    "nails": {
      id: "nails",
      name: "Nails & Waxing",
      description: "Enjoy salon-quality nail and waxing services from the comfort of your home. Our technicians arrive with all necessary equipment for perfect manicures, pedicures, and waxing treatments.",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80",
      pricing: [
        { service: "Classic Manicure", price: "$45+" },
        { service: "Gel Manicure", price: "$65+" },
        { service: "Classic Pedicure", price: "$55+" },
        { service: "Full Set Acrylics", price: "$85+" },
        { service: "Brow Waxing", price: "$25+" }
      ],
      icon: <Clock className="w-10 h-10 text-primary" />,
      providers: [
        {
          id: "n1",
          name: "Mariam Farhat",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80",
          rating: 4.9,
          reviewCount: 156,
          specialty: "Nail Art & Gel Extensions",
          location: "East Side"
        },
        {
          id: "n2",
          name: "David Park",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80",
          rating: 4.7,
          reviewCount: 89,
          specialty: "Precision Waxing & Manicures",
          location: "South District"
        },
        {
          id: "n3",
          name: "Zara Malik",
          image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80",
          rating: 4.8,
          reviewCount: 134,
          specialty: "Acrylics & 3D Nail Art",
          location: "Central"
        }
      ],
      inspirationGallery: [
        {
          id: "ni1",
          image: "https://i.pinimg.com/736x/75/ca/16/75ca169f327d3a1e3d13782c687c7d34.jpg",
            title: "Warm Neutrals with Glitter Accent",
            description: "A cozy autumn-inspired manicure blending soft nude tones with a touch of glam sparkle on the ring finger.",
            tags: ["neutral", "glitter", "cozy", "fall", "elegant"]
          },
        {
          id: "ni2",
          image: "https://i.pinimg.com/736x/f8/5b/b4/f85bb435f233f455f56e05e6f1a06a85.jpg",
          title: "Geometric Nail Art",
          description: "Bold geometric patterns with metallic accents for a statement look",
          tags: ["geometric", "bold", "metallic"]
        },
        {
          id: "ni3",
          image: "https://i.pinimg.com/736x/49/45/01/494501bd8b55527ee26c2d8580f29584.jpg",
          title: "Ombre Pastels",
          description: "Soft gradient effect with complementary pastel shades for a dreamy look",
          tags: ["ombre", "pastel", "soft"]
        },
        {
          id: "ni4",
          image: "https://i.pinimg.com/736x/29/f2/ad/29f2adabceebe9993c2996341a4ebbf2.jpg",
          title: "Rhinestone Accents",
          description: "Luxurious design with strategically placed crystals for elegant sparkle",
          tags: ["rhinestones", "luxury", "sparkle"]
        }
      ]
    },
    "massage": {
      id: "massage",
      name: "Massages & Wellness",
      description: "Relax and rejuvenate with our professional massage and wellness services. Our licensed therapists bring everything needed for your personalized treatment right to your door.",
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80",
      pricing: [
        { service: "Swedish Massage (60 min)", price: "$95+" },
        { service: "Deep Tissue (60 min)", price: "$110+" },
        { service: "Hot Stone Massage", price: "$125+" },
        { service: "Prenatal Massage", price: "$95+" },
        { service: "Couples Massage", price: "$190+" }
      ],
      icon: <MapPin className="w-10 h-10 text-primary" />,
      providers: [
        {
          id: "m1",
          name: "Joe Khoury",
          image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80",
          rating: 4.9,
          reviewCount: 203,
          specialty: "Deep Tissue & Sports Therapy",
          location: "All Areas"
        },
        {
          id: "m2",
          name: "Elena Hlayhel",
          image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80",
          rating: 5.0,
          reviewCount: 178,
          specialty: "Swedish & Hot Stone Therapy",
          location: "Central & North"
        },
        {
          id: "m3",
          name: "Omar Ibrahim",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
          rating: 4.8,
          reviewCount: 156,
          specialty: "Therapeutic & Prenatal Massage",
          location: "South & East"
        }
      ],
      inspirationGallery: [
        {
          id: "mi1",
          image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80",
          title: "Aromatherapy Massage",
          description: "Essential oil-infused massage combining scent therapy with relaxation techniques",
          tags: ["aromatherapy", "relaxation", "essential oils"]
        },
        {
          id: "mi2",
          image: "https://i.pinimg.com/736x/80/ab/6f/80ab6fdd2d6a20779fc5c16cdd593e6d.jpg",
          title: "Hot Stone Placement",
          description: "Strategic stone placement for deep muscle relief and energy balancing",
          tags: ["hot stone", "relaxation", "energy"]
        },
        {
          id: "mi3",
          image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80",
          title: "Reflexology Focus",
          description: "Targeted foot therapy engaging reflex points connected to entire body wellness",
          tags: ["reflexology", "pressure points", "holistic"]
        },
        {
          id: "mi4",
          image: "https://i.pinimg.com/736x/a9/a8/15/a9a81509eaa2baecd0ce57ca57dde9c8.jpg",
          title: "Couples Experience",
          description: "Side-by-side massage experience perfect for partners or friends",
          tags: ["couples", "shared", "experience"]
        }
      ]
    },
    "barbers": {
      id: "barbers",
      name: "Barber Services",
      description: "Expert barber services delivered to you. From classic cuts to beard trims and hot towel shaves, our barbers bring professional grooming right to your location.",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80",
      pricing: [
        { service: "Haircut", price: "$55+" },
        { service: "Beard Trim", price: "$25+" },
        { service: "Haircut & Beard", price: "$75+" },
        { service: "Hot Towel Shave", price: "$45+" },
        { service: "Kid's Haircut", price: "$35+" }
      ],
      icon: <Clock className="w-10 h-10 rotate-90 text-primary" />,
      providers: [
        {
          id: "b1",
          name: "Hassan Hamdar",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
          rating: 4.9,
          reviewCount: 187,
          specialty: "Classic Cuts & Fades",
          location: "All Areas"
        },
        {
          id: "b2",
          name: "Miguel Boulos",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
          rating: 4.8,
          reviewCount: 154,
          specialty: "Beard Styling & Hot Towel Shaves",
          location: "Downtown & West"
        },
        {
          id: "b3",
          name: "Alex Mabsout",
          image: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?auto=format&fit=crop&q=80",
          rating: 4.7,
          reviewCount: 129,
          specialty: "Modern Styles & Texture Work",
          location: "North & East"
        }
      ],
      inspirationGallery: [
        {
          id: "bi1",
          image: "https://i.pinimg.com/736x/22/c0/d8/22c0d860e155d1461845dcc969ec07ac.jpg",
          title: "Classic Fade",
          description: "Precision fade with clean lines and detailed edge work for a timeless look",
          tags: ["fade", "classic", "precision"]
        },
        {
          id: "bi2",
          image: "https://i.pinimg.com/736x/2f/3a/5f/2f3a5fce19d198b2b20e0d288e7aa56e.jpg",
          title: "Textured Crop",
          description: "Modern textured top with short sides for a contemporary, easy-to-maintain style",
          tags: ["crop", "texture", "modern"]
        },
        {
          id: "bi3",
          image: "https://i.pinimg.com/736x/fa/87/32/fa873247fe0ea8c17dd39b4f6890c10f.jpg",
          title: "Full Beard Styling",
          description: "Sculpted full beard with defined cheek and necklines for a polished appearance",
          tags: ["beard", "grooming", "sculpted"]
        },
        {
          id: "bi4",
          image: "https://i.pinimg.com/736x/05/48/e6/0548e60ca77d5d376ab871df86aca1ad.jpg",
          title: "Vintage Pompadour",
          description: "Classic high-volume style with modern execution for a sophisticated statement",
          tags: ["pompadour", "vintage", "volume"]
        }
      ]
    },
    "tattoos": {
      id: "tattoos",
      name: "Tattoos & Body Art",
      description: "Professional tattoo artists come to you with all the sterile equipment needed for a safe, comfortable experience. Custom designs and professional application in your preferred environment.",
      image: "https://images.unsplash.com/photo-1612221039748-4cc90d6180b6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      pricing: [
        { service: "Small Tattoo", price: "$120+" },
        { service: "Medium Tattoo", price: "$250+" },
        { service: "Large Tattoo", price: "$400+" },
        { service: "Custom Design", price: "$75+" },
        { service: "Touch-up", price: "$85+" }
      ],
      icon: <MapPin className="w-10 h-10 rotate-45 text-primary" />,
      providers: [
        {
          id: "t1",
          name: "Luna Mcheik",
          image: "https://images.unsplash.com/photo-1542740348-39501cd6e2b4?auto=format&fit=crop&q=80",
          rating: 4.9,
          reviewCount: 213,
          specialty: "Fine Line & Minimalist Designs",
          location: "All Areas"
        },
        {
          id: "t2",
          name: "Ahmad El-Hajj",
          image: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&q=80",
          rating: 4.8,
          reviewCount: 189,
          specialty: "Neo-Traditional & Color Work",
          location: "Central & West"
        },
        {
          id: "t3",
          name: "Jade Eid",
          image: "https://images.unsplash.com/photo-1606122017369-d782bbb78f32?auto=format&fit=crop&q=80",
          rating: 4.9,
          reviewCount: 176,
          specialty: "Blackwork & Geometric Designs",
          location: "East & North"
        }
      ],
      inspirationGallery: [
        {
          id: "ti1",
          image: "https://i.pinimg.com/736x/f2/b0/21/f2b02126913c53d59c149c15ca35dba1.jpg",
          title: "Minimalist Line Art",
          description: "Delicate single-line designs with subtle details for an elegant statement",
          tags: ["minimalist", "line work", "delicate"]
        },
        {
          id: "ti2",
          image: "https://i.pinimg.com/736x/9a/83/a1/9a83a111c9ba39e926a938059e3c3bc3.jpg",
          title: "Botanical Illustrations",
          description: "Nature-inspired florals and plants with detailed shading and realistic execution",
          tags: ["botanical", "nature", "detailed"]
        },
        {
          id: "ti3",
          image: "https://i.pinimg.com/736x/f4/e3/5c/f4e35c202a2938e34f82ca36cfacbcb2.jpg",
          title: "Geometric Blackwork",
          description: "Bold black ink patterns using geometric shapes and precise line work",
          tags: ["geometric", "blackwork", "pattern"]
        },
        {
          id: "ti4",
          image: "https://i.pinimg.com/736x/cf/d5/2d/cfd52d4fea1aab3bec6b8cc28a3fb6f6.jpg",
          title: "Watercolor Effect",
          description: "Vibrant colors blending together to create a painterly, artistic effect",
          tags: ["watercolor", "colorful", "artistic"]
        }
      ]
    }
  };

  useEffect(() => {
    // Find the selected service based on the URL parameter
    if (serviceId && services[serviceId]) {
      setSelectedService(services[serviceId]);
    }

    // Handle scroll for the navbar
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [serviceId]);

  const nextGalleryItem = () => {
    if (selectedService) {
      setActiveGalleryIndex((prevIndex) => 
        prevIndex === selectedService.inspirationGallery.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevGalleryItem = () => {
    if (selectedService) {
      setActiveGalleryIndex((prevIndex) => 
        prevIndex === 0 ? selectedService.inspirationGallery.length - 1 : prevIndex - 1
      );
    }
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
            
          </div>
        </div>
      </nav>

      {/* Hero Section for the specific service */}
      <section
        className="h-screen bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage: `url(${selectedService.image})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 animate-fade-in">
            <h1 className="text-6xl font-serif font-medium mb-6">
              {selectedService.name}
            </h1>
            <p className="text-xl mb-12 font-light tracking-wide max-w-2xl mx-auto">
              {selectedService.description}
            </p>
            <Link 
  to={`/services/${serviceId}/providers`}
  className="inline-block bg-primary text-white px-10 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-all duration-300 hover:transform hover:scale-105"
>
  Book This Service
</Link>
          </div>
        </div>
      </section>

      {/* Back to services */}
      <div className="py-8 bg-accent">
        <div className="max-w-6xl mx-auto px-4">
          <Link 
            to="/#services" 
            className="inline-flex items-center text-primary hover:underline"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to all services
          </Link>
        </div>
      </div>

      {/* Service Details Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-on-scroll">
              <h2 className="text-4xl font-serif font-medium mb-6 text-secondary">
                About {selectedService.name}
              </h2>
              <p className="text-lg text-text-light mb-8 leading-relaxed">
                {selectedService.description}
              </p>
              <div className="bg-accent p-6 rounded-xl">
                <h3 className="text-2xl font-serif font-medium mb-4 text-secondary">
                  Why Choose GlamGo?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-text-light">
                    <span className="text-primary font-bold mr-2">✓</span>
                    Vetted professionals with proven experience
                  </li>
                  <li className="flex items-start text-text-light">
                    <span className="text-primary font-bold mr-2">✓</span>
                    All equipment and products provided
                  </li>
                  <li className="flex items-start text-text-light">
                    <span className="text-primary font-bold mr-2">✓</span>
                    Flexible scheduling, including last-minute bookings
                  </li>
                  <li className="flex items-start text-text-light">
                    <span className="text-primary font-bold mr-2">✓</span>
                    Competitive pricing without hidden fees
                  </li>
                  <li className="flex items-start text-text-light">
                    <span className="text-primary font-bold mr-2">✓</span>
                    Backed by our satisfaction guarantee
                  </li>
                </ul>
              </div>
            </div>

            <div className="animate-on-scroll">
            <div className="animate-on-scroll">
  <div className="bg-accent p-8 rounded-xl shadow-lg">
    <h3 className="text-2xl font-serif font-medium mb-6 text-secondary">
      What Our Clients Say
    </h3>
    <p className="text-text-light mb-6">
      Read some recent feedback from clients who have experienced our {selectedService.name} service.
    </p>
    <ul className="space-y-6">
      {selectedService.id === "hair" && (
        <>
          <li className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="ml-2 font-medium">Emily R.</span>
            </div>
            <p className="text-text-light italic">
              "Nadine did an incredible job with my balayage! She was very attentive to what I wanted and explained every step. So nice having it done at home."
            </p>
          </li>
          <li className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="ml-2 font-medium">Michael T.</span>
            </div>
            <p className="text-text-light italic">
              "Hashem gave me the best haircut I've had in years! He really understood what would work with my hair type and face shape."
            </p>
          </li>
          <li className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="ml-2 font-medium">Sophia L.</span>
            </div>
            <p className="text-text-light italic">
              "Nour styled my hair for my wedding and it was absolutely perfect! She was patient with my indecisiveness and created exactly what I wanted."
            </p>
          </li>
        </>
      )}
      
      {selectedService.id === "nails" && (
        <>
          <li className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="ml-2 font-medium">Jessica K.</span>
            </div>
            <p className="text-text-light italic">
              "Mariam's nail art is incredible! She created the most beautiful geometric design and the gel polish has lasted for weeks."
            </p>
          </li>
          <li className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="ml-2 font-medium">Alex P.</span>
            </div>
            <p className="text-text-light italic">
              "David gave me the most painless and precise eyebrow wax I've ever had. He was professional and made me feel completely comfortable."
            </p>
          </li>
          <li className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="ml-2 font-medium">Maya H.</span>
            </div>
            <p className="text-text-light italic">
              "Zara transformed my nails with the most beautiful 3D nail art. Her attention to detail is amazing and she works so cleanly in the home setting."
            </p>
          </li>
        </>
      )}
      
      {selectedService.id === "massage" && (
        <>
          <li className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="ml-2 font-medium">Nathan D.</span>
            </div>
            <p className="text-text-light italic">
              "Joe's deep tissue massage was exactly what I needed. He targeted all my problem areas and the tension in my shoulders is finally gone."
            </p>
          </li>
          <li className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="ml-2 font-medium">Sarah C.</span>
            </div>
            <p className="text-text-light italic">
              "Elena's hot stone massage was pure bliss. She created such a relaxing atmosphere in my home and her technique was exceptional."
            </p>
          </li>
          <li className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="ml-2 font-medium">Leila R.</span>
            </div>
            <p className="text-text-light italic">
              "Omar's prenatal massage was exactly what I needed in my third trimester. He was so knowledgeable about safe techniques and positions."
            </p>
          </li>
        </>
      )}
      
      {selectedService.id === "barbers" && (
        <>
          <li className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="ml-2 font-medium">Thomas J.</span>
            </div>
            <p className="text-text-light italic">
              "Hassan gave me the cleanest fade I've ever had. His attention to detail with the line work was impressive. Saved me so much time not having to go to the shop."
            </p>
          </li>
          <li className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="ml-2 font-medium">Karim M.</span>
            </div>
            <p className="text-text-light italic">
              "Miguel's hot towel shave experience was top-notch. Very thorough and the closest shave I've had. The beard shaping was perfect."
            </p>
          </li>
          <li className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="ml-2 font-medium">Jad A.</span>
            </div>
            <p className="text-text-light italic">
              "Alex is a master with textured hair. He understood exactly what I wanted with my curls and gave great styling advice. Will definitely book again."
            </p>
          </li>
        </>
      )}
      
      {selectedService.id === "tattoos" && (
        <>
          <li className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="ml-2 font-medium">Daniel F.</span>
            </div>
            <p className="text-text-light italic">
              "Luna's fine line work is unbelievable. She created exactly what I envisioned for my minimalist tattoo and made me feel completely at ease in my own space."
            </p>
          </li>
          <li className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="ml-2 font-medium">Rania S.</span>
            </div>
            <p className="text-text-light italic">
              "Ahmad's color work is exceptional. He brought my floral design to life with vibrant colors that have healed beautifully. Incredibly hygienic setup too."
            </p>
          </li>
          <li className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="ml-2 font-medium">Marc L.</span>
            </div>
            <p className="text-text-light italic">
              "Jade's geometric blackwork is incredible. The precision in her lines is amazing. She was professional, thorough, and made the experience comfortable."
            </p>
          </li>
        </>
      )}
    </ul>
  </div>
</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Service Providers Section */}
      <section className="py-20 px-4 bg-accent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-medium text-center mb-16 text-secondary animate-on-scroll">
            Our Top {selectedService.name} Providers
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {selectedService.providers.map((provider) => (
              <div key={provider.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-on-scroll">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-serif font-medium text-secondary">{provider.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{provider.rating}</span>
                      <span className="ml-1 text-text-light text-sm">({provider.reviewCount})</span>
                    </div>
                  </div>
                  <p className="text-primary font-medium text-sm mb-2">{provider.specialty}</p>
                  <div className="flex items-center text-text-light text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{provider.location}</span>
                  </div>
                  <button className="mt-6 w-full bg-primary bg-opacity-10 text-primary py-2 rounded-full hover:bg-opacity-20 transition-all duration-300 font-medium">
                    Book with {provider.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration Gallery Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-medium text-center mb-4 text-secondary animate-on-scroll">
            {selectedService.name} Inspiration
          </h2>
          <p className="text-center text-text-light max-w-2xl mx-auto mb-16">
            Browse our curated gallery for inspiration and ideas for your next appointment.
          </p>

          <div className="relative">
            {/* Gallery Navigation */}
            <button 
              onClick={prevGalleryItem}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 p-3 rounded-full shadow-lg hover:bg-opacity-100 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-secondary" />
            </button>
            <button 
              onClick={nextGalleryItem}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 p-3 rounded-full shadow-lg hover:bg-opacity-100 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-secondary" />
            </button>

            {/* Creative Inspiration Gallery */}
            <div className="grid lg:grid-cols-12 gap-6 relative">
              {/* Featured Large Image */}
              <div className="lg:col-span-8 rounded-xl overflow-hidden shadow-lg animate-on-scroll">
              <div className="relative group aspect-[16/10]">

                  <img 
                    src={selectedService.inspirationGallery[activeGalleryIndex].image} 
                    alt={selectedService.inspirationGallery[activeGalleryIndex].title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-serif font-medium mb-2">
                      {selectedService.inspirationGallery[activeGalleryIndex].title}
                    </h3>
                    <p className="text-gray-200 mb-4">
                      {selectedService.inspirationGallery[activeGalleryIndex].description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.inspirationGallery[activeGalleryIndex].tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-primary bg-opacity-30 backdrop-blur-sm rounded-full text-white text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                {selectedService.inspirationGallery.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`rounded-lg overflow-hidden shadow-md cursor-pointer transition-all duration-300 ${
                      index === activeGalleryIndex ? 'ring-4 ring-primary' : 'hover:opacity-80'
                    }`}
                    onClick={() => setActiveGalleryIndex(index)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-36 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-20 px-4 bg-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-medium mb-8 text-secondary">
            Ready to Experience {selectedService.name}?
          </h2>
          <p className="text-lg text-text-light mb-10 max-w-2xl mx-auto">
            Book your appointment now and have our professional come to your location. All equipment and products provided.
          </p>
          
        </div>
      </section>

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

export default ServicePage;