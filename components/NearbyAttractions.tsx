"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, MapPin, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AttractionPopup from "./AttractionPopup";
import { attractions } from "@/data/attractions";

gsap.registerPlugin(ScrollTrigger);

const NearbyAttractions = () => {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [autoSlide, setAutoSlide] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesToShow(1);
      } else if (width < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);

    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  useEffect(() => {
    const updateWidths = () => {
      if (sliderRef.current && containerRef.current) {
        const container = containerRef.current;
        const slider = sliderRef.current;
        
        // Update container width
        setContainerWidth(container.offsetWidth);
        
        // Calculate slider width based on card count and gaps
        const cardWidth = container.offsetWidth / slidesToShow;
        const totalCards = attractions.length;
        const gapWidth = 24; // 24px gap between cards
        const totalGaps = (totalCards - 1) * gapWidth;
        const calculatedSliderWidth = (cardWidth * totalCards) + totalGaps;
        
        setSliderWidth(calculatedSliderWidth);
      }
    };

    updateWidths();
    window.addEventListener("resize", updateWidths);

    return () => window.removeEventListener("resize", updateWidths);
  }, [slidesToShow, attractions.length]);

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      gsap.fromTo(
        section.querySelectorAll(".attraction-card"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }

    if (autoSlide && containerWidth > 0 && sliderWidth > 0) {
      autoSlideRef.current = setInterval(() => {
        const maxPosition = -(sliderWidth - containerWidth);
        const cardWidth = containerWidth / slidesToShow;
        
        if (sliderPosition <= maxPosition + cardWidth) {
          setSliderPosition(0);
        } else {
          const newPosition = Math.max(maxPosition, sliderPosition - cardWidth);
          setSliderPosition(newPosition);
        }
      }, 3000);
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [autoSlide, sliderPosition, sliderWidth, containerWidth, slidesToShow]);

  const slideNext = () => {
    const cardWidth = containerWidth / slidesToShow;
    const maxPosition = -(sliderWidth - containerWidth);
    const newPosition = Math.max(maxPosition, sliderPosition - cardWidth);

    setSliderPosition(newPosition);
    pauseAutoSlide();

    setTimeout(resumeAutoSlide, 10000);
  };

  const slidePrev = () => {
    const cardWidth = containerWidth / slidesToShow;
    const newPosition = Math.min(0, sliderPosition + cardWidth);

    setSliderPosition(newPosition);
    pauseAutoSlide();

    setTimeout(resumeAutoSlide, 10000);
  };

  const pauseAutoSlide = () => setAutoSlide(false);
  const resumeAutoSlide = () => setAutoSlide(true);

  const handleAttractionClick = (attraction: any) => {
    setSelectedAttraction(attraction);
    setIsPopupOpen(true);
    pauseAutoSlide();
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedAttraction(null);
    setTimeout(resumeAutoSlide, 1000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section id="attractions" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nearby{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Attractions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the rich culture, stunning nature, and historical treasures
            just minutes away from Villa Shaa
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={slidePrev}
            disabled={sliderPosition >= 0}
            className={`absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-gray-700/70 hover:bg-gray-700 backdrop-blur-sm rounded-full p-3 shadow-lg transition-opacity ${
              sliderPosition >= 0
                ? "opacity-30 cursor-not-allowed"
                : "opacity-80 hover:opacity-100"
            }`}>
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={slideNext}
            disabled={sliderPosition <= -(sliderWidth - containerWidth)}
            className={`absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-gray-700/70 hover:bg-gray-700 backdrop-blur-sm rounded-full p-3 shadow-lg transition-opacity ${
              sliderPosition <= -(sliderWidth - containerWidth)
                ? "opacity-30 cursor-not-allowed"
                : "opacity-80 hover:opacity-100"
            }`}>
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <div
            ref={containerRef}
            className="overflow-hidden rounded-xl p-4"
            onMouseEnter={pauseAutoSlide}
            onMouseLeave={resumeAutoSlide}
            onTouchStart={pauseAutoSlide}>
            <motion.div
              ref={sliderRef}
              className="flex gap-6"
              animate={{ x: sliderPosition }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{
                left: -(sliderWidth - containerWidth),
                right: 0,
              }}
              onDragEnd={(e, info) => {
                pauseAutoSlide();

                const cardWidth = containerWidth / slidesToShow;
                const maxPosition = -(sliderWidth - containerWidth);
                const newPosition = sliderPosition + info.offset.x;
                
                // Snap to nearest card position
                const snapPosition = Math.round(newPosition / cardWidth) * cardWidth;
                
                if (snapPosition > 0) {
                  setSliderPosition(0);
                } else if (snapPosition < maxPosition) {
                  setSliderPosition(maxPosition);
                } else {
                  setSliderPosition(snapPosition);
                }

                setTimeout(resumeAutoSlide, 10000);
              }}>
              {attractions.map((attraction) => (
                  <motion.div
                    key={attraction.id}
                    className="attraction-card flex-shrink-0"
                    style={{
                      width: `calc(${100 / slidesToShow}% - ${
                        ((slidesToShow - 1) * 24) / slidesToShow
                      }px)`,
                      marginRight: attraction.id === attractions.length ? '0' : '24px',
                    }}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}>
                    <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="relative">
                        <img
                          src={attraction.image}
                          alt={attraction.alts}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                          {attraction.category}
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                          {renderStars(attraction.rating)}
                          <span className="text-xs font-semibold text-gray-700 ml-1">
                            {attraction.rating}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {attraction.name}
                        </h3>

                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {attraction.description}
                        </p>

                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                            <span>{attraction.distance} from villa</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-2 text-green-500" />
                            <span>
                              Recommended visit: {attraction.recommandedVisit}
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          onClick={() => handleAttractionClick(attraction)}
                          className="w-full mt-4 hover:scale-105 hover:shadow-xl border-blue-500 hover:border-white text-blue-600 hover:bg-gradient-to-r from-blue-500 to-green-500 hover:text-white transition-all duration-300">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          {/* Pagination dots */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {Array.from({
                length: Math.max(
                  1,
                  Math.ceil(attractions.length / slidesToShow)
                ),
              }).map((_, i) => {
                // Calculate which dot is active based on current position
                const cardWidth = containerWidth / slidesToShow;
                const maxPosition = -(sliderWidth - containerWidth);
                const totalSlides = Math.ceil(attractions.length / slidesToShow);
                
                // Determine active index based on position
                let activeIndex = 0;
                if (sliderPosition !== 0 && cardWidth > 0) {
                  activeIndex = Math.round(Math.abs(sliderPosition) / cardWidth);
                }
                
                // Ensure activeIndex is within bounds
                activeIndex = Math.max(0, Math.min(totalSlides - 1, activeIndex));

                return (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "bg-blue-500 w-6" : "bg-gray-300"
                    }`}
                    onClick={() => {
                      // Calculate exact position for this dot
                      const targetPosition = i === 0 ? 0 : -(i * cardWidth);
                      const boundedPosition = Math.max(maxPosition, targetPosition);
                      
                      setSliderPosition(boundedPosition);
                      pauseAutoSlide();
                      setTimeout(resumeAutoSlide, 10000);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>
          <h3 className="text-3xl font-bold mb-4">
            Explore Hikkaduwa & Beyond
          </h3>
          <p className="text-xl mb-6 text-blue-100">
            Let Mr. Leel Indika help you plan the perfect itinerary to discover
            these amazing attractions
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Plan My Trip
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Download Guide
            </motion.button>
          </div> */}
        </motion.div>
      </div>

      {/* Attraction Popup */}
      <AttractionPopup 
        attraction={selectedAttraction}
        isOpen={isPopupOpen}
        onClose={closePopup}
      />
    </section>
  );
};

export default NearbyAttractions;
