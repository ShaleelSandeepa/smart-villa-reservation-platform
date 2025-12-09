"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { scrollToSection } from "@/utils/navigation";

gsap.registerPlugin(ScrollTrigger);

const Reviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stats = statsRef.current;

    if (section) {
      gsap.fromTo(
        section.querySelectorAll(".review-card"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (stats) {
      const statElements = stats.querySelectorAll(".stat-value");
      statElements.forEach((element) => {
        const label = element.getAttribute("data-label");
        if (label === "Response Time") return; // Skip animation for Response Time

        const targetValue = parseFloat(
          element.getAttribute("data-value") || "0"
        );
        const isPercentage = element.getAttribute("data-value")?.includes("%");
        const isDecimal = element.getAttribute("data-value")?.includes(".");

        gsap.fromTo(
          element,
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 2,
            ease: "power1.out",
            snap: { innerText: isDecimal ? 0.1 : 1 },
            onUpdate: function () {
              (element as HTMLElement).innerText = isPercentage
                ? `${Math.round(
                    parseFloat((element as HTMLElement).innerText)
                  )}%`
                : isDecimal
                ? parseFloat((element as HTMLElement).innerText)
                    .toFixed(1)
                    .toString()
                : Math.round(
                    parseFloat((element as HTMLElement).innerText)
                  ).toString();
            },
            scrollTrigger: {
              trigger: stats,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      review: 'Villa Shaa exceeded all our expectations! The serene setting and luxurious interiors made our stay unforgettable. Mr. Leel Indika was an exceptional host who made sure every detail was perfect.',
      date: '2 months ago',
      verified: true,
    },
    {
      id: 2,
      name: 'James Chen',
      location: 'Singapore',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      review: 'The most luxurious villa experience in Sri Lanka! Every room is beautifully designed, and the garden is like a tropical paradise. Perfect for our family reunion with 3 generations.',
      date: '6 month ago',
      verified: true,
    },
    {
      id: 3,
      name: 'Emma Thompson',
      location: 'London, UK',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      review: 'Incredible attention to detail and world-class amenities. The kitchen facilities were top-notch, perfect for our group cooking sessions. Will definitely return!',
      date: '8 month ago',
      verified: true,
    },
    {
      id: 4,
      name: 'Michael Rodriguez',
      location: 'Madrid, Spain',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      review: 'Villa Shaa is a masterpiece! The architecture blends perfectly with nature. Evenings on the terrace were magical. Highly recommended for luxury travelers.',
      date: '1 year ago',
      verified: true,
    },
    {
      id: 5,
      name: 'Lisa Wang',
      location: 'Sydney, Australia',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      review: 'Outstanding service and pristine facilities. The villa comfortably accommodated our group of 5. Every bathroom and bedroom was spotless and elegantly furnished.',
      date: '1 year 3 months ago',
      verified: true,
    },
    {
      id: 6,
      name: 'David Kumar',
      location: 'Mumbai, India',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      review: 'Perfect for a luxury getaway! The gardens are meticulously maintained and Mr. Indika goes above and beyond to ensure guests feel at home.',
      date: '2 years ago',
      verified: true,
    },
  ];

  // const reviews = [
  //   {
  //     id: 1,
  //     name: "",
  //     location: "",
  //     rating: 5,
  //     avatar: "",
  //     review: "",
  //     date: "",
  //     verified: true,
  //   },
  // ];

  const stats = [
    { label: "Overall Rating", value: "4.9", subtitle: "out of 5 stars" },
    { label: "Total Reviews", value: "127", subtitle: "verified guests" },
    { label: "Repeat Guests", value: "89%", subtitle: "return rate" },
    { label: "Response Time", value: "<1hr", subtitle: "average response" },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Guest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Reviews
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what our guests say about their unforgettable experiences
            at Villa Shaa
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div
                  className="text-3xl font-bold text-blue-600 mb-2 stat-value"
                  data-value={stat.value}
                  data-label={stat.label}>
                  {stat.value}
                </div>
                <div className="font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">{stat.subtitle}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Reviews Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="review-card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              viewport={{ once: true }}>
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>
                          {review.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {review.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {review.location}
                        </p>
                      </div>
                    </div>
                    <Quote className="w-6 h-6 text-blue-500 opacity-50" />
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    {review.verified && (
                      <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-4">
                    "{review.review}"
                  </p>

                  <div className="text-sm text-gray-500">{review.date}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div> */}

        {/* Call to Action */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>
          <h3 className="text-3xl font-bold mb-4">Join Our Happy Guests</h3>
          <p className="text-xl mb-6 text-blue-100">
            Experience the luxury and hospitality that makes Villa Shaa special
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <a href="/booking" onClick={(e) => scrollToSection("booking", e)}>Book Your Stay</a>
            </motion.button>
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Read All Reviews
            </motion.button> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
