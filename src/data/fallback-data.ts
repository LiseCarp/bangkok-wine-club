// Fallback data when database is not available
export const fallbackEvents = [
  {
    id: 1,
    title: "French Rouges",
    date: new Date("2025-08-15"),
    theme: "French Red Wines",
    budget: "1,500 THB",
    participants: 12,
    winner: "Luccianus Amphore",
    excerpt: "An evening dedicated to the elegance of French Burgundy wines, featuring exceptional reds from Bordeaux to Burgundy.",
    location: "O'Shea's Irish Pub",
    status: "completed" as const,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: "Italian Renaissance",
    date: new Date("2025-07-20"),
    theme: "Italian Red Wines",
    budget: "1,200 THB",
    participants: 15,
    winner: "Tenuta Ulissse Don Antonio",
    excerpt: "A journey through Italy's diverse wine regions, showcasing Tuscany, Piedmont, and Veneto's finest expressions of terroir.",
    location: "Casa Boo",
    status: "completed" as const,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    title: "Malbec Discovery",
    date: new Date("2024-01-18"),
    theme: "Malbec from Argentina or Anywhere",
    budget: "1,400 THB",
    participants: 14,
    winner: "BenMarco Expresivo 2021",
    excerpt: "Exploring the bold and rich world of Argentine Malbec, from Mendoza's high-altitude vineyards to Bangkok's sophisticated palate.",
    location: "O'Shea's Irish Pub",
    status: "completed" as const,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const fallbackStats = {
  totalEvents: 36,
  totalMembers: 25,
  totalWines: 150
};

export const fallbackMembers = [
  {
    id: 1,
    name: "Alex Chen",
    email: "alex@bangkokwineclub.com",
    role: "admin" as const,
    isActive: true,
    joinDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: "Sarah Martinez",
    email: "sarah@bangkokwineclub.com",
    role: "organizer" as const,
    isActive: true,
    joinDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: "James Richardson",
    email: "james@bangkokwineclub.com",
    role: "organizer" as const,
    isActive: true,
    joinDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
