// ─── UNISEX PRODUCT DATA & CONSTANTS ─────────────────────────────────────────

export const CATEGORIES_FILTER = [
  "T-Shirts", "Hoodies", "Sweatshirts", "Pants", "Shorts", "Jackets", "Accessories",
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const COLORS = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "White", hex: "#f5f5f5" },
  { name: "Beige", hex: "#d4c5a9" },
  { name: "Grey",  hex: "#888888" },
  { name: "Navy",  hex: "#1b2a4a" },
  { name: "Green", hex: "#2d4a2d" },
  { name: "Brown", hex: "#6b4226" },
];

export const ALL_PRODUCTS = [
  { id: 1,  name: "Organic Cotton Tee",   price: 39,  badge: "NEW", category: "T-Shirts",    src: "/images/t-shirt1.png", rating: 4.9, reviews: 312, sizes: ["S","M","L","XL"],       colors: ["Black","White","Beige"] },
  { id: 2,  name: "Relaxed Sweatshirt",   price: 69,  badge: "NEW", category: "Sweatshirts",  src: "/images/t-shirt2.png", rating: 4.8, reviews: 198, sizes: ["XS","S","M","L","XL"],   colors: ["Black","Beige","Grey"]  },
  { id: 3,  name: "Wide Leg Pants",       price: 89,  badge: "NEW", category: "Pants",        src: "/images/t-shirt3.png", rating: 4.7, reviews: 145, sizes: ["S","M","L","XL","XXL"],  colors: ["Black","Grey","Brown"]  },
  { id: 4,  name: "Core Hoodie",          price: 79,  badge: "NEW", category: "Hoodies",      src: "/images/t-babe1.png",  rating: 4.9, reviews: 421, sizes: ["XS","S","M","L"],        colors: ["Black","Beige","Navy"]  },
  { id: 5,  name: "Utility Shorts",       price: 59,  badge: "NEW", category: "Shorts",       src: "/images/t-babe2.png",  rating: 4.6, reviews: 87,  sizes: ["S","M","L","XL"],        colors: ["Black","Beige","Green"] },
  { id: 6,  name: "Canvas Tote Bag",      price: 39,  badge: "NEW", category: "Accessories",  src: "/images/t-babe3.png",  rating: 4.8, reviews: 203, sizes: ["S","M","L"],             colors: ["Black","Beige","Grey"]  },
  { id: 7,  name: "Heavyweight Tee",      price: 45,  badge: "NEW", category: "T-Shirts",     src: "/images/t-shirt1.png", rating: 4.7, reviews: 156, sizes: ["S","M","L","XL","XXL"],  colors: ["Black","White","Grey"]  },
  { id: 8,  name: "Essential Hoodie",     price: 85,  badge: "NEW", category: "Hoodies",      src: "/images/t-shirt2.png", rating: 4.5, reviews: 64,  sizes: ["S","M","L","XL"],        colors: ["Black","Navy","Green"]  },
  { id: 9,  name: "Boxy Sweatshirt",      price: 72,  badge: "NEW", category: "Sweatshirts",  src: "/images/t-shirt3.png", rating: 4.8, reviews: 177, sizes: ["XS","S","M","L"],        colors: ["Beige","Grey","Brown"]  },
  { id: 10, name: "Classic Tee",          price: 35,  badge: null,  category: "T-Shirts",     src: "/images/t-babe1.png",  rating: 4.6, reviews: 299, sizes: ["S","M","L","XL","XXL"],  colors: ["Black","White","Grey"]  },
  { id: 11, name: "Jogger Pants",         price: 79,  badge: null,  category: "Pants",        src: "/images/t-babe2.png",  rating: 4.7, reviews: 132, sizes: ["S","M","L","XL"],        colors: ["Black","Grey","Navy"]   },
  { id: 12, name: "Track Jacket",         price: 95,  badge: null,  category: "Jackets",      src: "/images/t-babe3.png",  rating: 4.9, reviews: 88,  sizes: ["S","M","L","XL"],        colors: ["Black","White","Beige"] },
];

export const SORT_OPTIONS = ["Newest", "Price: Low to High", "Price: High to Low", "Most Popular"];

export const PER_PAGE = 6;

// Hero slideshow slides data
export const HERO_SLIDES = [
  {
    id: 0,
    tag: "Shop All",
    heading: "Everything",
    sub: "All styles. One place.",
    body: [
      "Menswear, womenswear, and more.",
      "Discover the full collection."
    ],
    accent: "#C9A84C",
  },
  {
    id: 1,
    tag: "Full Collection",
    heading: "No Limits",
    sub: "Explore every category.",
    body: [
      "From essentials to statement pieces.",
      "Built for every style."
    ],
    accent: "#C9A84C",
  },
  {
    id: 2,
    tag: "New Arrivals",
    heading: "Just Dropped",
    sub: "Fresh pieces, all in one place.",
    body: [
      "Latest styles across all categories.",
      "Stay ahead of the trend."
    ],
    accent: "#C9A84C",
  },
];