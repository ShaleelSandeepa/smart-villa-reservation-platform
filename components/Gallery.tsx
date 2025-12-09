"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
// Import the gallery images
import { galleryImages } from "@/data/gallery";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate widths for slider
  useEffect(() => {
    const updateWidths = () => {
      if (sliderRef.current && containerRef.current) {
        setSliderWidth(sliderRef.current.scrollWidth);
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidths();
    window.addEventListener("resize", updateWidths);

    return () => window.removeEventListener("resize", updateWidths);
  }, []);

  // Animate gallery items
  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      gsap.fromTo(
        section.querySelectorAll(".gallery-item"),
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
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

  // Auto-sliding effect
  useEffect(() => {
    // Clear existing interval if any
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }

    // Only set up auto-sliding if it's enabled
    if (autoSlide) {
      autoSlideRef.current = setInterval(() => {
        const isAtEnd = sliderPosition <= -(sliderWidth - containerWidth) + 20;

        // If at the end, go back to start
        if (isAtEnd) {
          setSliderPosition(0);
        } else {
          // Otherwise advance to next set of images
          const itemsPerScreen = Math.floor(containerWidth / 300);
          const moveAmount = Math.min(containerWidth, itemsPerScreen * 300);
          const newPosition = Math.max(
            -(sliderWidth - containerWidth),
            sliderPosition - moveAmount
          );
          setSliderPosition(newPosition);
        }
      }, 3000);
    }

    // Clean up interval on unmount or when dependencies change
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [autoSlide, sliderPosition, sliderWidth, containerWidth]);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const slideNext = () => {
    // Calculate how many items are visible based on screen size
    const itemsPerScreen = Math.floor(containerWidth / 300); // Approximate width of each item with gap
    const moveAmount = Math.min(containerWidth, itemsPerScreen * 300);

    // Check if we're at the end of the slider
    const newPosition = Math.max(
      -(sliderWidth - containerWidth),
      sliderPosition - moveAmount
    );

    setSliderPosition(newPosition);
    pauseAutoSlide();
  };

  const slidePrev = () => {
    // Calculate how many items are visible based on screen size
    const itemsPerScreen = Math.floor(containerWidth / 300); // Approximate width of each item with gap
    const moveAmount = Math.min(containerWidth, itemsPerScreen * 300);

    // Check if we're at the beginning of the slider
    const newPosition = Math.min(0, sliderPosition + moveAmount);
    setSliderPosition(newPosition);
    pauseAutoSlide();
  };

  const pauseAutoSlide = () => setAutoSlide(false);
  const resumeAutoSlide = () => setAutoSlide(true);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Villa{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Gallery
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Take a visual journey through Villa Shaa and discover the luxury
            that awaits you
          </p>

          {/* <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              className="hover:bg-gradient-to-r from-blue-500 to-green-500 border-blue-500 hover:border-none text-blue-600 hover:bg-blue-50 hover:text-white hover:scale-105 transition-transform">
              <Play className="w-4 h-4 mr-2" />
              Virtual Tour
            </Button>
          </div> */}
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => {
              slidePrev();
              pauseAutoSlide();
              // Auto-resume after 10 seconds of inactivity
              setTimeout(resumeAutoSlide, 10000);
            }}
            disabled={sliderPosition >= 0}
            className={`absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg ${
              sliderPosition >= 0 ? "opacity-30 cursor-not-allowed" : "opacity-80"
            }`}>
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={() => {
              slideNext();
              pauseAutoSlide();
              // Auto-resume after 10 seconds of inactivity
              setTimeout(resumeAutoSlide, 10000);
            }}
            disabled={sliderPosition <= -(sliderWidth - containerWidth) + 20}
            className={`absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white backdrop-blur-sm rounded-full p-3 shadow-lg ${
              sliderPosition <= -(sliderWidth - containerWidth) + 20
                ? "opacity-30 cursor-not-allowed"
                : "opacity-80"
            }`}>
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Overflow Container */}
          <div
            ref={containerRef}
            className="overflow-hidden rounded-xl"
            onMouseEnter={pauseAutoSlide}
            onMouseLeave={resumeAutoSlide}
            onTouchStart={pauseAutoSlide}>
            {/* Slider */}
            <motion.div
              ref={sliderRef}
              className="flex gap-6"
              animate={{ x: sliderPosition }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: -(sliderWidth - containerWidth), right: 0 }}
              onDragEnd={(e, info) => {
                // Pause auto-sliding on user interaction
                pauseAutoSlide();
                
                // Update position after drag
                const newPosition = sliderPosition + info.offset.x;
                if (newPosition > 0) {
                  setSliderPosition(0);
                } else if (newPosition < -(sliderWidth - containerWidth)) {
                  setSliderPosition(-(sliderWidth - containerWidth));
                } else {
                  setSliderPosition(newPosition);
                }
                
                // Auto-resume after 10 seconds of inactivity
                setTimeout(resumeAutoSlide, 10000);
              }}>
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  viewport={{ once: true }}
                  className="gallery-item relative shrink-0 w-[280px] sm:w-[320px] md:w-[340px] overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openLightbox(index)}>
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold text-sm sm:text-base">
                        {image.title}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-300">
                        {image.category}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0114 0z"
                      />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(sliderWidth / containerWidth) }).map(
                (_, i) => {
                  // Calculate which section we're in
                  const totalSections = Math.ceil(sliderWidth / containerWidth);
                  const sectionWidth = sliderWidth / totalSections;
                  const currentSection = Math.abs(
                    Math.round(sliderPosition / sectionWidth)
                  );

                  return (
                    <button
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentSection ? "bg-blue-500 w-6" : "bg-gray-300"
                      }`}
                      onClick={() => setSliderPosition(-i * sectionWidth)}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              viewport={{ once: true }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                viewport={{ once: true }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}>
                <img
                  src={galleryImages[currentIndex].src}
                  alt={galleryImages[currentIndex].title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />

                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors">
                  <X className="w-6 h-6" />
                </button>

                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
                  <p className="font-semibold">{galleryImages[currentIndex].title}</p>
                  <p className="text-sm text-center">
                    {currentIndex + 1} of {galleryImages.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
