"use client";

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Amenities from '@/components/Amenities';
import Gallery from '@/components/Gallery';
import NearbyAttractions from '@/components/NearbyAttractions';
import Booking from '@/components/Booking';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import SectionNavigator from '@/components/SectionNavigator';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  // Handle section navigation
  const SearchParamsHandler = () => {
    const searchParams = useSearchParams();
    
    useEffect(() => {
      const section = searchParams.get('section');
      if (section) {
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 100);
      }
    }, [searchParams]);
    
    return null;
  };

  return (
    <main className="relative">
      <Suspense fallback={null}>
        <SearchParamsHandler />
      </Suspense>
      
      <Navbar />
      <Hero />
      <About />
      <Amenities />
      <Gallery />
      <NearbyAttractions />
      <Booking />
      <Reviews />
      <Contact />
      <Footer />
      <WhatsAppButton 
        phoneNumber={process.env.VILLA_WHATSAPP || "94777943393"}
        message="Hello, I'm interested in Villa Shaa. Could you please provide details on availability and reservation options?"
        position="bottom-right"
        showTooltip={true}
      />
      <ChatBot agentId="e4de6340-6a4f-40d8-a3d1-15c55770b416" />
    </main>
  );
}