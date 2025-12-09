export interface Attraction {
  id: number;
  name: string;
  alts?: string;
  image: string;
  description: string;
  additionalInfo: string;
  distance: string;
  duration: string;
  recommandedVisit: string;
  direction: string;
  rating: number;
  category: string;
  additionalImages?: string[];
  fullDescription?: string;
  highlights?: string[];
  bestTimeToVisit?: string;
  ticketPrice?: string;
  contactInfo?: string;
  tips?: string[];
}

export const attractions: Attraction[] = [
  {
    id: 1,
    name: "Hikkaduwa Beach",
    alts: "Hikkaduwa Beach, Sri Lanka, Beach, Surfing, Snorkeling, Coral Reef, Sea Turtles, Golden Sands, Water Activities",
    image: "/assets/attractions/hikkaduwa-beach-0.jpg",
    description:
      "World-famous beach destination with golden sands, perfect for surfing, snorkeling, and beach activities.",
    additionalInfo:
      "Hikkaduwa Beach, located on Sri Lanka's southwestern coast, is a popular destination known for its beautiful beaches, vibrant atmosphere, and diverse water activities. It's a great place for snorkeling, diving, and surfing, and it's also home to a coral reef and sea turtles. ",

    distance: "1.9 km",
    duration: "7 min drive",
    recommandedVisit: "1-2 hours",
    direction: "https://maps.app.goo.gl/VeTPVzDSyUN6tA2s8",
    rating: 4.8,
    category: "Beach",
    additionalImages: [
      "/assets/attractions/hikkaduwa-beach-1.jpg",
      "/assets/attractions/hikkaduwa-beach-2.jpg",
      "/assets/attractions/hikkaduwa-beach-3.jpg",
      "/assets/attractions/hikkaduwa-beach-4.jpg",
      "/assets/attractions/hikkaduwa-beach-5.jpg",
      "/assets/attractions/hikkaduwa-beach-6.jpg",
    ],
    fullDescription:
      "Hikkaduwa Beach is one of Sri Lanka's most celebrated coastal destinations, renowned for its pristine golden sands and crystal-clear waters. This vibrant beach town offers an incredible array of water sports, from world-class surfing to snorkeling among colorful coral reefs. The beach stretches for miles, providing ample space for sunbathing, beach volleyball, and romantic sunset walks.",
    highlights: [
      "World-renowned surfing waves",
      "Vibrant coral reef for snorkeling",
      "Beachside restaurants and cafes",
      "Stunning sunset views",
      "Marine turtle watching",
    ],
    bestTimeToVisit:
      "November to April for best weather and surfing conditions",
    ticketPrice: "Free access",
    contactInfo: "+94 777 94 33 93",
    tips: [
      "Best surfing waves during December to March",
      "Bring reef-safe sunscreen to protect coral",
      "Visit early morning or late afternoon for fewer crowds",
      "Watch for sea turtles during nesting season",
    ],
  },
  {
    id: 2,
    name: "Galle Fort",
    alts: "Galle Fort, Sri Lanka, UNESCO World Heritage Site, Colonial Architecture, Historic Ramparts, Cobblestone Streets, Art Galleries",
    image:
    //   "https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "/assets/attractions/Galle-Fort-0.jpg",
    description:
      "UNESCO World Heritage Site featuring Dutch colonial architecture, historic ramparts, and charming cobblestone streets.",
    additionalInfo: "",
    distance: "18.4 km",
    duration: "20 min drive",
    recommandedVisit: "2-3 hours",
    direction: "https://maps.app.goo.gl/a3UpQi6AZDL2AdZG6",
    rating: 4.9,
    category: "Historical",
    additionalImages: [
      "/assets/attractions/Galle-Fort-1.webp",
      "/assets/attractions/Galle-Fort-2.jpg",
      "/assets/attractions/Galle-Fort-3.jpg",
      "/assets/attractions/Galle-Fort-4.jpg",
      "/assets/attractions/Galle-Fort-5.jpg",
      "/assets/attractions/Galle-Fort-6.jpg",
    ],
    fullDescription:
      "Galle Fort stands as a magnificent testament to Sri Lanka's colonial past, built by the Dutch in the 17th century. This UNESCO World Heritage Site is a living fortress where history comes alive through well-preserved architecture, museums, boutique shops, and art galleries. Walking through its cobblestone streets feels like stepping back in time.",
    highlights: [
      "UNESCO World Heritage Site",
      "Dutch colonial architecture",
      "Historic lighthouse and ramparts",
      "Art galleries and museums",
      "Boutique shops and cafes",
    ],
    bestTimeToVisit:
      "Early morning (8:00 AM - 10:00 AM) or late afternoon (4:00 PM - 6:00 PM)",
    ticketPrice: "Free entry / Museum fees: ~ LKR 500-1000",
    tips: [
      "Wear comfortable walking shoes for cobblestone streets",
      "Visit during sunset for spectacular views from ramparts",
      "Explore the Dutch Reformed Church and Maritime Museum",
      "Try local cuisine at fort restaurants",
    ],
  },
  {
    id: 3,
    name: "Tsunami Museum",
    alts: "Tsunami Museum, Sri Lanka, 2004 Tsunami, Educational Museum, Survivor Stories, Historical Exhibits, Memorial",
    image:
    //   "https://images.pexels.com/photos/8828489/pexels-photo-8828489.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "/assets/attractions/Tsunami-museum-0.jpg",
    description:
      "Educational museum commemorating the 2004 tsunami with exhibits, photographs, and survivor stories.",
    additionalInfo: "",
    distance: "5.7 km",
    duration: "10 min drive",
    recommandedVisit: "1-2 hours",
    direction: "https://maps.app.goo.gl/UT4aiMf3KNkppokW7",
    rating: 4.5,
    category: "Museum",
    additionalImages: [
      "/assets/attractions/Tsunami-museum-1.jpg",
      "/assets/attractions/Tsunami-museum-2.jpg",
      "/assets/attractions/Tsunami-museum-3.jpg",
      "/assets/attractions/Tsunami-museum-4.jpg",
      "/assets/attractions/Tsunami-museum-5.jpg",
      "/assets/attractions/Tsunami-museum-6.jpg",
    ],
    fullDescription:
      "The Tsunami Museum serves as a poignant reminder of the devastating 2004 Indian Ocean tsunami that affected Sri Lanka's coastline. Through powerful exhibits, photographs, and personal testimonies, visitors gain insight into this tragic event and the remarkable resilience of the affected communities.",
    highlights: [
      "Historical photographs and artifacts",
      "Survivor testimonies and stories",
      "Educational exhibits about tsunamis",
      "Memorial for victims",
      "Community rebuilding stories",
    ],
    bestTimeToVisit: "Any time during operating hours (9:00 AM - 5:00 PM)",
    ticketPrice: "~ LKR 200 per person",
    tips: [
      "Allow time for reflection and reading testimonies",
      "Photography may be restricted in certain areas",
      "Guided tours available for deeper understanding",
      "Suitable for educational visits with children",
    ],
  },
//   {
//     id: 4,
//     name: "Madu River Safari",
//     image:
//       "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//     description:
//       "Scenic boat safari through mangrove forests, spotting wildlife including monitor lizards and exotic birds.",
//     additionalInfo: "",
//     distance: "15 min drive",
//     duration: "2-3 hours",
//     recommandedVisit: "2-3 hours",
//     direction: "",
//     rating: 4.7,
//     category: "Nature",
//     fullDescription:
//       "Madu River Safari offers an enchanting journey through one of Sri Lanka's most biodiverse wetland ecosystems. Navigate through narrow waterways surrounded by lush mangrove forests, discovering an incredible variety of wildlife including water monitors, exotic birds, and endemic fish species.",
//     highlights: [
//       "Mangrove forest exploration",
//       "Wildlife spotting opportunities",
//       "Traditional fishing villages",
//       "Fish spa experience",
//       "Cinnamon island visit",
//     ],
//     bestTimeToVisit:
//       "Early morning (6:00 AM - 9:00 AM) for best wildlife sightings",
//     ticketPrice: "~ LKR 2000-3000 per person",
//     tips: [
//       "Bring binoculars for bird watching",
//       "Wear light, quick-dry clothing",
//       "Apply insect repellent before the trip",
//       "Book morning tours for cooler weather and active wildlife",
//     ],
//   },
  {
    id: 5,
    name: "Moonstone Mines",
    alts: "Moonstone Mines, Sri Lanka, Gem Mining, Traditional Mining, Moonstones, Cultural Experience, Gemology",
    image:
    //   "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "/assets/attractions/Moonstones-0.jpg",
    description:
      "Traditional gemstone mining sites where you can witness the extraction of precious moonstones and other gems.",
    additionalInfo: "",
    distance: "12.4 km",
    duration: "21 min drive",
    recommandedVisit: "1 hour",
    direction: "https://maps.app.goo.gl/Q9GM7HkAPmvTpThz7",
    rating: 4.4,
    category: "Cultural",
    additionalImages: [
      "/assets/attractions/Moonstones-1.jpg",
      "/assets/attractions/Moonstones-2.jpg",
      "/assets/attractions/Moonstones-3.jpg",
      "/assets/attractions/Moonstones-4.jpg",
      "/assets/attractions/Moonstones-mines-1.jpg",
      "/assets/attractions/Moonstones-mines-2.jpg",
    ],
    fullDescription:
      "Sri Lanka's moonstone mines offer a fascinating glimpse into the country's rich gemological heritage. Witness traditional mining techniques passed down through generations and learn about the formation of these mystical blue-scheen gems that have made Sri Lanka famous worldwide.",
    highlights: [
      "Traditional mining demonstrations",
      "Gem cutting and polishing workshops",
      "Authentic moonstone purchases",
      "Local miner interactions",
      "Geological education",
    ],
    bestTimeToVisit: "Morning hours (8:00 AM - 12:00 PM) for active mining",
    ticketPrice: "~ LKR 1500 per person",
    tips: [
      "Wear closed shoes for mine visits",
      "Learn about authentic vs. synthetic gems",
      "Negotiate prices when purchasing gems",
      "Ask for certificates of authenticity",
    ],
  },
  {
    id: 6,
    name: "Ariyapala Mask Museum",
    alts: "Ariyapala Mask Museum, Sri Lanka, Traditional Masks, Cultural Heritage, Mask Making, Folk Art, Wesmuhunu Masks",
    image:
    //   "https://images.pexels.com/photos/6207375/pexels-photo-6207375.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    "/assets/attractions/masks-srilanka-0.jpg",
    description:
      "Traditional mask-making workshop showcasing authentic Sri Lankan Wesmuhunu masks and cultural performances.",
    additionalInfo: "",
    distance: "15.6 km",
    duration: "25 min drive",
    recommandedVisit: "about 1 hour",
    direction: "https://maps.app.goo.gl/yVhwmzBpPYaw6K247",
    rating: 4.6,
    category: "Cultural",
    additionalImages: [
      "/assets/attractions/masks-srilanka-1.jpg",
      "/assets/attractions/masks-srilanka-2.jpg",
      "/assets/attractions/masks-srilanka-3.jpg",
      "/assets/attractions/masks-srilanka-4.jpg",
      "/assets/attractions/masks-srilanka-5.jpg",
      "/assets/attractions/Ariyapala-Masks-Museum.jpg",
    ],
    fullDescription:
      "The Ariyapala Mask Museum is a treasure trove of Sri Lankan folk art, showcasing the intricate craft of traditional mask making. Watch skilled artisans create elaborate masks used in classical dance performances and devil dancing ceremonies, while learning about their cultural significance.",
    highlights: [
      "Live mask-making demonstrations",
      "Traditional dance performances",
      "Cultural storytelling sessions",
      "Authentic mask purchases",
      "Photography opportunities",
    ],
    bestTimeToVisit: "Afternoon hours (2:00 PM - 5:00 PM) for demonstrations",
    ticketPrice: "~ LKR 800 per person",
    tips: [
      "Ask about the meaning behind different mask designs",
      "Watch the carving process from start to finish",
      "Purchase authentic masks as souvenirs",
      "Respect cultural traditions during visits",
    ],
  },
//   {
//     id: 7,
//     name: "Kande Viharaya Temple",
//     image:
//       "https://images.pexels.com/photos/8349886/pexels-photo-8349886.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//     description:
//       "Ancient Buddhist temple with stunning architecture, peaceful gardens, and panoramic views of the coastline.",
//     additionalInfo: "",
//     distance: "12 min drive",
//     duration: "1-2 hours",
//     recommandedVisit: "1-2 hours",
//     direction: "",
//     rating: 4.7,
//     category: "Temple",
//     fullDescription:
//       "Kande Viharaya Temple is a serene Buddhist sanctuary perched on a hill overlooking the Indian Ocean. This ancient temple complex features impressive architecture, beautiful murals, and a towering Buddha statue that can be seen from miles away. The peaceful atmosphere makes it perfect for meditation and reflection.",
//     highlights: [
//       "Giant Buddha statue",
//       "Ancient temple architecture",
//       "Panoramic ocean views",
//       "Beautiful wall paintings",
//       "Peaceful meditation spaces",
//     ],
//     bestTimeToVisit:
//       "Early morning (6:00 AM - 8:00 AM) or evening (5:00 PM - 7:00 PM)",
//     ticketPrice: "Free (donations welcome)",
//     tips: [
//       "Dress modestly covering shoulders and knees",
//       "Remove shoes before entering temple buildings",
//       "Maintain silence and respect during prayers",
//       "Climb to the top for best panoramic views",
//     ],
//   },
//   {
//     id: 8,
//     name: "Brief Garden",
//     image:
//       "https://images.pexels.com/photos/1693095/pexels-photo-1693095.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
//     description:
//       "Enchanting landscape garden created by renowned artist Bevis Bawa, featuring sculptures and tropical plants.",
//     additionalInfo: "",
//     distance: "30 min drive",
//     duration: "2-3 hours",
//     recommandedVisit: "2-3 hours",
//     direction: "",
//     rating: 4.8,
//     category: "Garden",
//     fullDescription:
//       "Brief Garden is the former home and garden of renowned Sri Lankan landscape architect Bevis Bawa, brother of famous architect Geoffrey Bawa. This enchanting garden showcases a perfect blend of natural beauty and artistic vision, featuring exotic plants, sculptures, and architectural elements in perfect harmony.",
//     highlights: [
//       "Bevis Bawa's artistic landscape design",
//       "Rare and exotic plant collections",
//       "Unique sculptures and art pieces",
//       "Traditional Sri Lankan architecture",
//       "Peaceful walking trails",
//     ],
//     bestTimeToVisit: "Early morning (8:00 AM - 10:00 AM) for cooler weather",
//     ticketPrice: "~ LKR 1200 per person",
//     tips: [
//       "Wear comfortable walking shoes",
//       "Bring a camera for stunning garden photography",
//       "Allow 2-3 hours to fully explore",
//       "Visit during flowering seasons for best views",
//     ],
//   },
];
