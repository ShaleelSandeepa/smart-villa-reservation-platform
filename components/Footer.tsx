"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { scrollToSection } from "@/utils/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Villa", href: "about" },
    { name: "Amenities", href: "amenities" },
    { name: "Gallery", href: "gallery" },
    { name: "Attractions", href: "attractions" },
    { name: "Booking", href: "booking" },
    { name: "Reviews", href: "reviews" },
    { name: "Contact", href: "contact" },
  ];

  const policies = [
    { name: "Privacy Policy", href: "home" },
    { name: "Terms of Service", href: "home" },
    { name: "Cancellation Policy", href: "home" },
    { name: "House Rules", href: "home" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "home", label: "Facebook" },
    { icon: Instagram, href: "home", label: "Instagram" },
    { icon: Twitter, href: "home", label: "Twitter" },
    { icon: Youtube, href: "home", label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Villa Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
            viewport={{ once: true }}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">VS</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Villa Shaa</h3>
                <p className="text-gray-400 text-sm">
                  Luxury Villa in Hikkaduwa
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Experience unparalleled luxury at Villa Shaa, where modern
              amenities meet tropical paradise. Your perfect getaway awaits in
              the heart of Hikkaduwa.
            </p>

            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-sm">
                  Hikkaduwa, Southern Province, Sri Lanka
                </span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2 text-green-400" />
                <span className="text-sm">{process.env.VILLA_PHONE}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-sm">{process.env.VILLA_EMAIL}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={`/${link.href === "home" ? "" : link.href}`} // Updated href format
                    onClick={(e) => scrollToSection(link.href, e)}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Policies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}>
            <h4 className="text-lg font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              {policies.map((policy, index) => (
                <li key={index}>
                  <a
                    href={`/${policy.href === "home" ? "" : policy.href}`} // Updated href format
                    onClick={(e) => scrollToSection(policy.href, e)}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                    {policy.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Villa Host & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4">
            <h4 className="text-lg font-semibold mb-4">Your Host</h4>

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LI</span>
                </div>
                <div>
                  <h5 className="font-semibold">Mr. Leel Indika</h5>
                  <p className="text-gray-400 text-xs">Villa Owner</p>
                </div>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
                Dedicated to providing exceptional hospitality and ensuring
                every guest has an unforgettable experience.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={`/${social.href === "home" ? "" : social.href}`} // Updated href format
                    onClick={(e) => scrollToSection(social.href, e)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    viewport={{ once: true }}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 transition-all duration-300"
                    aria-label={social.label}>
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Villa Shaa. All rights reserved. Designed for
              luxury travelers.
              <br />
              Developed by Shaleel Sandeepa | Nova Technologies
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>🏆 Top Rated Villa in Hikkaduwa</span>
              <span>⭐ 4.9/5 Rating</span>
              <span>✅ Verified Property</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
