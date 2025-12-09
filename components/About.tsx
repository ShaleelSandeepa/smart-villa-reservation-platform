"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Home,
  Bed,
  Bath,
  Car,
  Trees,
  Waves,
  AirVent,
  Utensils,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stats = statsRef.current;

    if (section) {
      // Fade and slide-in animations for text and image sections
      gsap.fromTo(
        section.querySelectorAll(".fade-in"),
        { opacity: 0, y: 100, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );

      // Image zoom and glow effect
      gsap.fromTo(
        section.querySelector(".hero-image"),
        { scale: 1.95, filter: "brightness(0.8)" },
        {
          scale: 1,
          filter: "brightness(1)",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.5,
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (stats) {
      // Card flip animation for stats cards
      gsap.fromTo(
        stats.querySelectorAll(".motion-card"),
        { rotationY: 180, opacity: 0 },
        {
          rotationY: 0,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: stats,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const stats = [
    { icon: Home, label: "2 Floors", description: "Multi-level luxury" },
    { icon: Bed, label: "2 Bedrooms", description: "Regular & comfort" },
    { icon: AirVent, label: "A/C Bedroom", description: "Cool & comfort" },
    { icon: Bath, label: "2 Bathrooms", description: "Modern fixtures" },
    { icon: Utensils, label: "Kitchen", description: "Fully equipped" },
    { icon: Trees, label: "Garden", description: "Spacious & green" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Villa Shaa
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}>
            Nestled near the scenic shores of Hikkaduwa, Villa Shaa offers a
            comfortable two-story stay with balcony views of lush paddy fields,
            modern amenities, and warm hospitality by Mr. Leel Indika.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mb-16">
          <motion.div
            className="fade-in"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}>
            <div className="relative aspect-[4/3] w-full">
              <img
                src="/assets/hero2.jpg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Villa Shaa exterior"
                className="rounded-2xl shadow-2xl w-full h-full object-cover hero-image max-w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </motion.div>

          <motion.div
            className="fade-in space-y-4 flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <motion.h3
              className="text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}>
              Luxury Redefined
            </motion.h3>
            <motion.p
              className="text-gray-600 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}>
              Villa Shaa spans two magnificent floors, each thoughtfully
              designed to provide maximum comfort and luxury. With 3 spacious
              bedrooms accommodating up to 5 guests.
            </motion.p>
            <motion.p
              className="text-gray-600 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}>
              Our villa features 2 beautifully appointed bathrooms, fully
              equipped kitchen, and expansive living spaces that seamlessly
              blend indoor and outdoor living. Enjoy peaceful paddy field views
              from the balcony, unwind in the small flower garden, and make use
              of essential amenities like air conditioning, WiFi, and secure
              parking—just minutes from the beach and town.
            </motion.p>
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}>
              <p className="font-semibold text-lg mb-2">Owned & Managed by</p>
              <p className="text-2xl font-bold">Mr. Leel Indika</p>
              <p className="text-blue-100">
                Your dedicated host ensuring an unforgettable experience
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 fade-in">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="motion-card transform transition-all duration-600"
              whileHover={{
                scale: 1.1,
                rotate: 0,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
              }}
              viewport={{ once: true }}
              style={{ perspective: 1000 }}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">
                    {stat.label}
                  </h4>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
