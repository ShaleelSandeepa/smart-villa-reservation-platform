"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Users, Calendar } from "lucide-react";
import Image from "next/image";
import { scrollToSection } from "@/utils/navigation";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (hero && title && subtitle) {
      const tl = gsap.timeline();

      tl.fromTo(
        title,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      ).fromTo(
        subtitle,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      gsap.fromTo(
        hero,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: hero,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, []);

  const features = [
    { icon: Star, text: "4.9 Rating", subtext: "127 Reviews" },
    { icon: Users, text: "5 Guests", subtext: "Max Capacity" },
    { icon: Calendar, text: "Available", subtext: "Book Today" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div ref={heroRef} className="absolute inset-0">
        <Image
          src="/assets/hero.jpg"
          alt="Hero background"
          fill
          className="object-cover object-center"
          style={{ opacity: 0.8, filter: "blur(8px)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-blue-900/70 to-green-900/80" />{" "}
        {/* Darker gradient with black start */}
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 mt-20 lg:mt-20">
          {" "}
          {/* Added top margin for mobile */}
          <div className="flex flex-wrap items-center justify-center mb-4 px-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="text-green-400 font-medium text-sm sm:text-base">
              Hikkaduwa, Sri Lanka
            </span>
          </div>
        </motion.div>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          Villa{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            Shaa
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-base md:text-lg text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Escape to paradise, where comfort meets nature, just moments from
          golden shores.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-lg px-8 py-3">
            <a href="/booking" onClick={(e) => scrollToSection("booking", e)}>
              Book Your Stay
            </a>
          </Button>
          {/* <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-white/30 text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 transition-colors">
            Virtual Tour
          </Button> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="glass-effect rounded-xl p-6 text-center">
              <feature.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-white font-semibold text-lg">
                {feature.text}
              </div>
              <div className="text-white/70 text-sm">{feature.subtext}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        viewport={{ once: true }}
        className="absolute bottom-8 transform -translate-x-1/2">
        {/* <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
        </div> */}
        <div className="text-white font-semibold text-sm mx-auto text-center">
          Scroll to more
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
