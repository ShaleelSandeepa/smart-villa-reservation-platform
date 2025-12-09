"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SectionNavigator() {
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
  
  // This component doesn't render anything visible
  return null;
}