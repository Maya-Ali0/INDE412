import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Scissors,
  Clock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const heroImages = [
    "https://i.pinimg.com/736x/19/cd/15/19cd156a6600bd26c4cb736b9d8748f6.jpg",
    "https://www.shutterstock.com/image-photo/we-better-when-together-studio-600nw-345945431.jpg",
    //"https://media.gettyimages.com/id/1370743548/video/woman-tattoo-artist-doing-tattoos-for-her-boyfriend.jpg?s=640x640&k=20&c=TEI7yzG7vF3UFoQnA9_aPNF9ZJStm13wpcqe6U0QQT4=",
  ];
  const HeroImageSlider = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transitionProperty: "opacity",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-30" />
      </div>
    );
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const sponsors = [
    "/images/SamerKhouzami.png",
    "/images/BassamFattouh.png",
    "/images/Mounir.png",
    "/images/Yehia&Zakaria.png",
    "/images/Kempinski .png",
    "/images/yoyo&kreik.png",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
  
      if (scrollPosition < window.innerHeight) {
        const opacity = (scrollPosition / window.innerHeight) * 0.95;
        setOverlayOpacity(opacity);
      }
    };
  
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
  
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px",
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      if (element instanceof HTMLElement) {
        observer.observe(element);
        element.style.opacity = "0";
      }
    });
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      clearInterval(imageInterval);
    };
  }, []);
  
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
              <a
                href="#services"
                className={`${
                  isScrolled ? "text-white" : "text-white"
                } hover:text-secondary transition-colors`}
              >
                Services
              </a>
              <a
                href="#about"
                className={`${
                  isScrolled ? "text-white" : "text-white"
                } hover:text-secondary transition-colors`}
              >
                About
              </a>
              <a
                href="#gallery"
                className={`${
                  isScrolled ? "text-white" : "text-white"
                } hover:text-secondary transition-colors`}
              >
                Gallery
              </a>
              <a
                href="#contact"
                className={`${
                  isScrolled ? "text-white" : "text-white"
                } hover:text-secondary transition-colors`}
              >
                Contact
              </a>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all duration-300">
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
  className="h-screen bg-cover bg-center bg-fixed relative transition-all duration-1000"
  style={{
    backgroundImage: `url("${heroImages[currentImageIndex]}")`,
  }}
>

        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="hero-overlay" style={{ opacity: overlayOpacity }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 animate-fade-in">
            <h1 className="text-7xl font-serif font-medium mb-6">
              On-Demand Glam, Anytime
            </h1>
            <p className="text-2xl mb-12 font-light tracking-wide">
              Beauty & wellness at your doorstep. Safe, vetted, and flexible.
            </p>
            <button className="bg-primary text-white px-12 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-all duration-300 hover:transform hover:scale-105">
              Get Early Access
            </button>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 bg-accent overflow-hidden">
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="flex items-center animate-scroll whitespace-nowrap">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <img
                key={index}
                src={sponsor}
                alt={`Sponsor ${index + 1}`}
                className="h-20 mx-8 grayscale hover:grayscale-0 transition-all duration-300 inline-block"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-serif font-medium text-center mb-20 text-secondary animate-on-scroll">
            Our Services
          </h2>

          <div className="text-center mb-10 animate-on-scroll">
            <p className="text-lg text-text-light max-w-2xl mx-auto leading-relaxed">
              Browse services below to find vetted professionals and book beauty
              or wellness appointments that come to you — wherever you are.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-12">
            {/* Hair */}
            <Link to="/services/hair" className="block">
              <div className="bg-accent px-6 py-8 max-w-[240px] min-h-[340px] rounded-2xl shadow-lg text-center hover:scale-105 transition-transform animate-on-scroll mx-auto flex flex-col items-center justify-between">
                <div>
                  <div className="flex flex-col items-center text-center">
                    <Scissors className="w-10 h-10 mb-3 text-primary" />
                    <h3 className="text-lg font-serif font-medium mb-2 text-secondary">
                      Hair & Styling
                    </h3>
                    <p className="text-text-light text-sm leading-snug text-center">
                      From blowouts to bridal styling, done wherever you are
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-primary font-medium">
                  Tap to explore bookings
                </p>
              </div>
            </Link>

            {/* Nails */}
            <Link to="/services/nails" className="block">
              <div className="bg-accent px-6 py-8 max-w-[240px] min-h-[340px] rounded-2xl shadow-lg text-center hover:scale-105 transition-transform animate-on-scroll mx-auto flex flex-col items-center justify-between">
                <div>
                  <div className="flex flex-col items-center text-center">
                    <Clock className="w-10 h-10 mb-3 text-primary" />
                    <h3 className="text-lg font-serif font-medium mb-2 text-secondary">
                      Nails & Waxing
                    </h3>
                    <p className="text-text-light text-sm leading-snug text-center">
                      Book mani-pedis and waxing at home with certified pros
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-primary font-medium">
                  Tap to explore bookings
                </p>
              </div>
            </Link>

            {/* Massage */}
            <Link to="/services/massage" className="block">
              <div className="bg-accent px-6 py-8 max-w-[240px] min-h-[340px] rounded-2xl shadow-lg text-center hover:scale-105 transition-transform animate-on-scroll mx-auto flex flex-col items-center justify-between">
                <div>
                  <div className="flex flex-col items-center text-center">
                    <MapPin className="w-10 h-10 mb-3 text-primary" />
                    <h3 className="text-lg font-serif font-medium mb-2 text-secondary">
                      Massages & Wellness
                    </h3>
                    <p className="text-text-light text-sm leading-snug text-center">
                      Relaxation meets convenience — unwind without leaving the
                      house
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-primary font-medium">
                  Tap to explore bookings
                </p>
              </div>
            </Link>

            {/* Barbers */}
            <Link to="/services/barbers" className="block">
              <div className="bg-accent px-6 py-8 max-w-[240px] min-h-[340px] rounded-2xl shadow-lg text-center hover:scale-105 transition-transform animate-on-scroll mx-auto flex flex-col items-center justify-between">
                <div>
                  <div className="flex flex-col items-center text-center">
                    <Scissors className="w-10 h-10 mb-3 text-primary rotate-90" />
                    <h3 className="text-lg font-serif font-medium mb-2 text-secondary">
                      Barber Services
                    </h3>
                    <p className="text-text-light text-sm leading-snug text-center">
                      On-demand grooming and beard care tailored for men
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-primary font-medium">
                  Tap to explore bookings
                </p>
              </div>
            </Link>

            {/* Tattoos */}
            <Link to="/services/tattoos" className="block">
              <div className="bg-accent px-6 py-8 max-w-[240px] min-h-[340px] rounded-2xl shadow-lg text-center hover:scale-105 transition-transform animate-on-scroll mx-auto flex flex-col items-center justify-between">
                <div>
                  <div className="flex flex-col items-center text-center">
                    <MapPin className="w-10 h-10 mb-3 text-primary rotate-45" />
                    <h3 className="text-lg font-serif font-medium mb-2 text-secondary">
                      Tattoos & Body Art
                    </h3>
                    <p className="text-text-light text-sm leading-snug text-center">
                      Professional in-home tattoo sessions by trusted artists
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-primary font-medium">
                  Tap to explore bookings
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works – Timeline Style */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <h2 className="text-5xl font-serif font-medium mb-12 text-secondary">
            How GlamGo Works
          </h2>
          <div className="relative border-l border-gray-300 pl-12 space-y-12 text-left">
            <div className="relative">
              <div className="absolute -left-3 top-1 w-6 h-6 bg-primary rounded-full border-4 border-white"></div>
              <h3 className="text-xl pl-6 font-semibold text-primary mb-1">
                Choose a Service
              </h3>
              <p className="text-text-light text-sm max-w-md pl-6">
                Browse our on-demand beauty & wellness categories and pick
                exactly what you need.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-3 top-1 w-6 h-6 bg-primary rounded-full border-4 border-white"></div>
              <h3 className="text-xl pl-6 font-semibold text-primary mb-1">
                Book on Your Terms
              </h3>
              <p className="text-text-light text-sm max-w-md pl-6">
                Select the date, time, and location — home, office, or event —
                we'll handle the rest.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-3 top-1 w-6 h-6 bg-primary rounded-full border-4 border-white"></div>
              <h3 className="text-xl pl-6 font-semibold text-primary mb-1 ">
                Enjoy the Experience
              </h3>
              <p className="text-text-light text-sm max-w-md pl-6">
                Your pro arrives fully equipped — relax, glow up, and feel your
                best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-serif font-medium text-center mb-20 text-secondary animate-on-scroll">
            What Clients Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feedback Card 1 */}
            <div className="bg-accent rounded-2xl p-8 shadow-lg animate-on-scroll">
              <p className="text-text-light text-base mb-6 leading-relaxed">
                “I booked a last-minute stylist before my friend’s wedding — she
                showed up early, brought everything with her, and nailed the
                look. GlamGo is a lifesaver!”
              </p>
              <p className="text-secondary font-serif font-medium text-lg">
                — Layla M.
              </p>
            </div>

            {/* Feedback Card 2 */}
            <div className="bg-accent rounded-2xl p-8 shadow-lg animate-on-scroll">
              <p className="text-text-light text-base mb-6 leading-relaxed">
                “Getting a massage at home after a long work week? Game changer.
                GlamGo makes self-care easy, even with my schedule.”
              </p>
              <p className="text-secondary font-serif font-medium text-lg">
                — Rami K.
              </p>
            </div>

            {/* Feedback Card 3 */}
            <div className="bg-accent rounded-2xl p-8 shadow-lg animate-on-scroll">
              <p className="text-text-light text-base mb-6 leading-relaxed">
                “Super smooth booking and great service. I’ve used GlamGo for
                hair, nails, and even a group event — highly recommend.”
              </p>
              <p className="text-secondary font-serif font-medium text-lg">
                — Dana S.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-accent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-serif font-medium text-center mb-20 text-secondary animate-on-scroll">
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center animate-on-scroll">
              <Phone className="w-12 h-12 mx-auto mb-6 text-primary" />
              <h3 className="text-2xl font-serif font-medium mb-4 text-secondary">
                Call Us
              </h3>
              <p className="text-text-light text-lg">(+961) 01 123 456</p>
            </div>
            <div className="text-center animate-on-scroll">
              <Mail className="w-12 h-12 mx-auto mb-6 text-primary" />
              <h3 className="text-2xl font-serif font-medium mb-4 text-secondary">
                Email Us
              </h3>
              <p className="text-text-light text-lg">info@glamgo.com</p>
            </div>
            <div className="text-center animate-on-scroll">
              <MapPin className="w-12 h-12 mx-auto mb-6 text-primary" />
              <h3 className="text-2xl font-serif font-medium mb-4 text-secondary">
                Visit Us
              </h3>
              <p className="text-text-light text-lg">Beirut, Lebanon</p>
            </div>
          </div>
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
}

export default App;
