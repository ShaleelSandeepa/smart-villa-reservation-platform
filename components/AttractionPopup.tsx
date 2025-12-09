"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Clock,
  Star,
  Camera,
  Users,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Attraction } from "@/data/attractions";
import { toast } from "sonner";

interface AttractionPopupProps {
  attraction: Attraction | null;
  isOpen: boolean;
  onClose: () => void;
}

const AttractionPopup = ({ attraction, isOpen, onClose }: AttractionPopupProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!attraction) return null;

  // Function to render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  // Enhanced attraction data with fallback values
  const enhancedAttraction = {
    ...attraction,
    additionalImages: attraction.additionalImages || [
      "https://images.pexels.com/photos/1450359/pexels-photo-1450359.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      "https://images.pexels.com/photos/1450361/pexels-photo-1450361.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    ],
    fullDescription:
      attraction.fullDescription ||
      `${attraction.description} ${attraction.additionalInfo}`,
    highlights: attraction.highlights || [
      "Stunning panoramic views",
      "Rich cultural heritage",
      "Perfect for photography",
      "Family-friendly environment",
      "Local guide available",
    ],
    bestTimeToVisit:
      attraction.bestTimeToVisit ||
      "Early morning (6:00 AM - 10:00 AM) or late afternoon (4:00 PM - 6:00 PM)",
    ticketPrice: attraction.ticketPrice || "Contact for details",
    contactInfo: attraction.contactInfo || "+94 777 94 33 93",
    tips: attraction.tips || [
      "Bring comfortable walking shoes",
      "Carry water and sun protection",
      "Best to visit during weekdays for fewer crowds",
      "Don't forget your camera for stunning shots",
    ],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              <img
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-64 sm:h-80 object-cover rounded-t-2xl"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge className="bg-white/90 text-gray-700 hover:bg-white">
                  {attraction.category}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="bg-white/90 hover:bg-white rounded-full p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                {renderStars(attraction.rating)}
                <span className="text-sm font-semibold text-gray-700 ml-1">
                  {attraction.rating} / 5
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-0">
                  {attraction.name}
                </h2>
                <div className="flex gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => window.open(attraction.direction, "_blank")}>
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                  <Button variant="outline" onClick={() => {
                    navigator.clipboard.writeText(attraction.direction);
                    // Optional: You could add a toast notification here
                    toast.success("Directions copied to clipboard", {
                      duration: 2000,
                      position: "top-center",
                    });
                  }}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <Card className="p-4">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    <div>
                      <p className="text-gray-500">Distance</p>
                      <p className="font-semibold">{attraction.distance}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-green-500" />
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="font-semibold">{attraction.duration}</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-purple-500" />
                    <div>
                      <p className="text-gray-500">Entry Fee</p>
                      <p className="font-semibold">
                        {enhancedAttraction.ticketPrice}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  About This Place
                </h3>
                <p className="text-gray-600 leading-relaxed text-md align-justify">
                  {enhancedAttraction.fullDescription}
                </p>
              </div>

              {/* Image Gallery */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Photo Gallery
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {enhancedAttraction.additionalImages.map((image, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="relative overflow-hidden rounded-lg"
                    >
                      <img
                        src={image}
                        alt={`${attraction.name} ${index + 1} ${attraction.alts}`}
                        className="w-full h-32 sm:h-40 object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {enhancedAttraction.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Time to Visit */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Best Time to Visit
                </h3>
                <p className="text-gray-600 bg-blue-50 p-4 rounded-lg">
                  {enhancedAttraction.bestTimeToVisit}
                </p>
              </div>

              {/* Tips */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Visitor Tips
                </h3>
                <div className="space-y-2">
                  {enhancedAttraction.tips.map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">
                  Need More Information?
                </h3>
                <p className="mb-4">
                  Contact our local guide Mr. Leel Indika for personalized
                  recommendations and bookings.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">
                    Call: {enhancedAttraction.contactInfo}
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-transparent border-2 font-bold border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    Use WhatsApp for Chat
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AttractionPopup;
