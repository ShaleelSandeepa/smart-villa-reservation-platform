import { redirect } from "next/navigation";
import { Metadata } from "next";

interface SectionPageProps {
  params: {
    section: string;
  };
}

// This defines which static paths will be generated at build time
export function generateStaticParams() {
  return [
    { section: "about" },
    { section: "amenities" },
    { section: "gallery" },
    { section: "attractions" },
    { section: "booking" },
    { section: "reviews" },
    { section: "contact" },
  ];
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { section } = params;

  const sectionTitles: Record<string, string> = {
    about: "About Villa Shaa | Luxury Villa in Hikkaduwa",
    amenities: "Our Amenities | Villa Shaa",
    gallery: "Photo Gallery | Villa Shaa",
    attractions: "Nearby Attractions | Villa Shaa",
    booking: "Book Your Stay | Villa Shaa",
    reviews: "Guest Reviews | Villa Shaa",
    contact: "Contact Us | Villa Shaa",
  };

  return {
    title: sectionTitles[section] || "Villa Shaa - Luxury Villa in Hikkaduwa",
  };
}

export default function SectionPage({ params }: SectionPageProps) {
  const validSections = [
    "about",
    "amenities",
    "gallery",
    "attractions",
    "booking",
    "reviews",
    "contact",
  ];

  if (!validSections.includes(params.section)) {
    redirect("/");
  }

  // This will redirect to the home page but scroll to the section
  redirect(`/?section=${params.section}`);
}
