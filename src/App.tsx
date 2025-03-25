import { useEffect, useState } from "react";
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

  const sponsors = [
    "https://images.unsplash.com/photo-1627384113710-424c9181ebbb?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1627384113972-f4c0392fe5aa?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1627384113830-4c8ca2c5d5e1?auto=format&fit=crop&q=80&w=200",
    "https://images.unsplash.com/photo-1627384113776-45c9cfd39b4d?auto=format&fit=crop&q=80&w=200",
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
              <a href="#" className={isScrolled ? "text-white" : "text-white"}>
                Salonz
              </a>
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#"
                className={`${
                  isScrolled ? "text-white" : "text-white"
                } hover:text-secondary transition-colors`}
              >
                Home
              </a>
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
        className="h-screen bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="hero-overlay" style={{ opacity: overlayOpacity }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 animate-fade-in">
            <h1 className="text-7xl font-serif font-medium mb-6">
              Beauty & Care
            </h1>
            <p className="text-2xl mb-12 font-light tracking-wide">
              Your Premier Hair Salon Experience
            </p>
            <button className="bg-primary text-white px-12 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-all duration-300 hover:transform hover:scale-105">
              Book Appointment
            </button>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 bg-accent overflow-hidden">
        <div className="sponsors-scroll">
          <div className="sponsors-scroll-content">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <img
                key={index}
                src={sponsor}
                alt={`Sponsor ${index + 1}`}
                className="h-20 mx-12 grayscale hover:grayscale-0 transition-all duration-300"
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
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-accent p-10 rounded-2xl shadow-lg text-center hover-scale animate-on-scroll">
              <Scissors className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h3 className="text-2xl font-serif font-medium mb-4 text-secondary">
                Premium Cuts
              </h3>
              <p className="text-text-light text-lg">
                Precision haircuts tailored to your unique style and preferences
              </p>
            </div>
            <div className="bg-accent p-10 rounded-2xl shadow-lg text-center hover-scale animate-on-scroll">
              <Clock className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h3 className="text-2xl font-serif font-medium mb-4 text-secondary">
                Color Excellence
              </h3>
              <p className="text-text-light text-lg">
                Expert color services from subtle highlights to bold
                transformations
              </p>
            </div>
            <div className="bg-accent p-10 rounded-2xl shadow-lg text-center hover-scale animate-on-scroll">
              <MapPin className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h3 className="text-2xl font-serif font-medium mb-4 text-secondary">
                Luxury Treatments
              </h3>
              <p className="text-text-light text-lg">
                Rejuvenating treatments for healthy, beautiful hair
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-accent">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 animate-on-scroll">
            <img
              src="https://images.unsplash.com/photo-1633791583419-6bed74d58f96?auto=format&fit=crop&q=80"
              alt="Salon Interior"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div className="md:w-1/2 animate-on-scroll">
            <h2 className="text-5xl font-serif font-medium mb-8 text-secondary">
              About Our Salon
            </h2>
            <p className="text-text-light text-xl mb-8 leading-relaxed">
              At Salonz, we combine artistry with expertise to create looks that
              enhance your natural beauty. Our team of master stylists brings
              decades of combined experience and a passion for staying ahead of
              the latest trends and techniques.
            </p>
            <button className="bg-primary text-white px-12 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-all duration-300">
              Discover More
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-serif font-medium text-center mb-20 text-secondary animate-on-scroll">
            Our Work
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <img
              src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80"
              alt="Hairstyle 1"
              className="rounded-2xl shadow-lg hover-scale animate-on-scroll h-96 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1552850546-184ee64aa351?auto=format&fit=crop&q=80"
              alt="Hairstyle 2"
              className="rounded-2xl shadow-lg hover-scale animate-on-scroll h-96 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80"
              alt="Hairstyle 3"
              className="rounded-2xl shadow-lg hover-scale animate-on-scroll h-96 w-full object-cover"
            />
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
              <p className="text-text-light text-lg">(555) 123-4567</p>
            </div>
            <div className="text-center animate-on-scroll">
              <Mail className="w-12 h-12 mx-auto mb-6 text-primary" />
              <h3 className="text-2xl font-serif font-medium mb-4 text-secondary">
                Email Us
              </h3>
              <p className="text-text-light text-lg">info@salonz.com</p>
            </div>
            <div className="text-center animate-on-scroll">
              <MapPin className="w-12 h-12 mx-auto mb-6 text-primary" />
              <h3 className="text-2xl font-serif font-medium mb-4 text-secondary">
                Visit Us
              </h3>
              <p className="text-text-light text-lg">
                123 Beauty Street, NY 10001
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-serif font-medium mb-6">Salonz</h3>
              <p className="text-gray-400 text-lg">
                Your destination for beauty and confidence.
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
              <p className="text-gray-400 text-lg">(555) 123-4567</p>
              <p className="text-gray-400 text-lg">info@salonz.com</p>
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
              &copy; 2024 Salonz. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
