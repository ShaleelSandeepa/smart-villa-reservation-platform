"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { scrollToSection } from "@/utils/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Amenities", href: "amenities" },
    { name: "Gallery", href: "gallery" },
    { name: "Attractions", href: "attractions" },
    { name: "Booking", href: "booking" },
    { name: "Reviews", href: "reviews" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      viewport={{ once: true }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VS</span>
            </div>
            <div>
              <h1
                className={`font-bold text-lg ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}>
                Villa Shaa
              </h1>
              <div
                className={`flex items-center text-xs ${
                  scrolled ? "text-gray-600" : "text-white/80"
                }`}>
                <MapPin className="w-3 h-3 mr-1" />
                Hikkaduwa
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={`/${item.href === 'home' ? '' : item.href}`} // Updated href format
                onClick={(e) => scrollToSection(item.href, e)}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                className={`font-medium transition-colors ${
                  scrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}>
                {item.name}
              </motion.a>
            ))}
            <Button
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              asChild>
              <a 
                href="/booking" 
                onClick={(e) => scrollToSection("booking", e)}
              >
                Book Now
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={scrolled ? "text-gray-900" : "text-white"}>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        viewport={{ once: true }}
        className={`md:hidden bg-white/95 backdrop-blur-md border-t ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}>
        <div className="px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={`/${item.href === 'home' ? '' : item.href}`}
              className="block text-gray-700 hover:text-blue-600 font-medium"
              onClick={(e) => {
                scrollToSection(item.href, e);
                setIsOpen(false);
              }}>
              {item.name}
            </a>
          ))}
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-green-500"
            asChild>
            <a 
              href="/booking" 
              onClick={(e) => scrollToSection("booking", e)}
            >
              Book Now
            </a>
          </Button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
