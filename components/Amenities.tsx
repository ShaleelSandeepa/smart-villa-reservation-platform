'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wifi, Car, Utensils, Tv, Wind, Coffee, Waves, Trees, Camera, Shield, Dumbbell, Gamepad2, PictureInPicture, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { scrollToSection } from "@/utils/navigation";

gsap.registerPlugin(ScrollTrigger);

const Amenities = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      gsap.fromTo(
        section.querySelectorAll('.amenity-card'),
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  const amenities = [
    { icon: Trees, title: 'Tropical Garden', description: 'Landscaped gardens with local flora' },
    { icon: Wifi, title: 'High-Speed WiFi', description: 'Complimentary internet throughout' },
    { icon: Car, title: 'Parking Space', description: 'Secure parking space' },
    { icon: Utensils, title: 'Full Kitchen', description: 'Modern appliances & cookware' },
    { icon: Tv, title: 'Television', description: '24" TV with configurable modes' },
    { icon: Wind, title: 'Air Conditioning', description: 'Climate control in a selected room' },
    { icon: Camera, title: 'Paddy Field Views', description: 'Lush rice terrace views' },
    { icon: Shield, title: '24/7 Security', description: 'Secured with perimeter walls' },
    { icon: Waves, title: 'Beach Access', description: '10 min. ride to shore' },
    { icon: Building2, title: 'Town Access', description: '15 min. ride to town' },
  ];

  return (
    <section id="amenities" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Amenities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every detail has been carefully curated to ensure your stay is nothing short of extraordinary
          </p>
        </motion.div>

        {/* <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Swimming Pool"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Infinity Swimming Pool</h3>
                  <p className="text-blue-100">Dive into luxury with our temperature-controlled infinity pool featuring stunning ocean views</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.pexels.com/photos/1693095/pexels-photo-1693095.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Garden"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Tropical Gardens</h3>
                  <p className="text-green-100">Immerse yourself in our meticulously maintained gardens featuring exotic plants and serene pathways</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div> */}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              className="amenity-card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <amenity.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{amenity.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{amenity.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Experience Luxury?</h3>
          <p className="text-xl mb-6 text-blue-100">
            Book your stay at Villa Shaa and discover what makes us the premier destination in Hikkaduwa
          </p>
          <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              onClick={(e) => scrollToSection("contact", e)}
              animate={{ opacity: 1 }}
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Check Availability
            </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Amenities;