

// ─── MEN'S PRODUCT DATA & CONSTANTS ──────────────────────────────────────────
// Split from Mensproduct.jsx for easier management

export const CATEGORIES_FILTER = [
  "T-Shirts", "Hoodies", "Shirts", "Jackets", "Pants", "Shorts", "Sweaters", "Accessories",
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

// 💡 Replace src paths with your real product images in /public/images/
export const ALL_PRODUCTS = [
  { id: 1,  name: "Essential Hoodie",   price: 89,  badge: "NEW", category: "Hoodies",     src: "/images/t-shirt1.png", rating: 4.9, reviews: 312, sizes: ["S","M","L","XL"],       colors: ["Black","Beige","Grey"]  },
  { id: 2,  name: "Heavyweight Tee",    price: 49,  badge: "NEW", category: "T-Shirts",    src: "/images/t-shirt2.png", rating: 4.8, reviews: 198, sizes: ["XS","S","M","L","XL"],   colors: ["Black","White","Beige"] },
  { id: 3,  name: "Relaxed Sweatshirt", price: 69,  badge: "NEW", category: "Sweaters",    src: "/images/t-shirt3.png", rating: 4.7, reviews: 145, sizes: ["S","M","L","XL","XXL"],  colors: ["Beige","Grey","Brown"]  },
  { id: 4,  name: "Boxy Fit T-Shirt",   price: 39,  badge: "NEW", category: "T-Shirts",    src: "/images/t-babe1.png",  rating: 4.9, reviews: 421, sizes: ["XS","S","M","L"],        colors: ["Black","White","Navy"]  },
  { id: 5,  name: "Cargo Pants",        price: 79,  badge: "NEW", category: "Pants",       src: "/images/menset1.png",  rating: 4.6, reviews: 87,  sizes: ["S","M","L","XL"],        colors: ["Black","Green","Brown"] },
  { id: 6,  name: "Overshirt Jacket",   price: 99,  badge: "NEW", category: "Jackets",     src: "/images/t-shirt1.png", rating: 4.8, reviews: 203, sizes: ["S","M","L","XL","XXL"],  colors: ["Beige","Grey","Brown"]  },
  { id: 7,  name: "Washed Cap",         price: 29,  badge: "NEW", category: "Accessories", src: "/images/t-babe2.png",  rating: 4.7, reviews: 156, sizes: ["S","M","L"],             colors: ["Black","Beige","Navy"]  },
  { id: 8,  name: "Puffer Vest",        price: 109, badge: "NEW", category: "Jackets",     src: "/images/t-babe3.png",  rating: 4.5, reviews: 64,  sizes: ["S","M","L","XL"],        colors: ["Black","Navy","Green"]  },
  { id: 9,  name: "Knit Sweater",       price: 69,  badge: "NEW", category: "Sweaters",    src: "/images/t-shirt3.png", rating: 4.8, reviews: 177, sizes: ["XS","S","M","L"],        colors: ["Beige","Grey","Brown"]  },
  { id: 10, name: "Classic Tee",        price: 35,  badge: null,  category: "T-Shirts",    src: "/images/t-shirt2.png", rating: 4.6, reviews: 299, sizes: ["S","M","L","XL","XXL"],  colors: ["Black","White","Grey"]  },
  { id: 11, name: "Slim Chinos",        price: 85,  badge: null,  category: "Pants",       src: "/images/menset1.png",  rating: 4.7, reviews: 132, sizes: ["S","M","L","XL"],        colors: ["Beige","Grey","Navy"]   },
  { id: 12, name: "Linen Shirt",        price: 65,  badge: null,  category: "Shirts",      src: "/images/t-shirt1.png", rating: 4.9, reviews: 88,  sizes: ["S","M","L","XL"],        colors: ["White","Beige"]         },
];

export const SORT_OPTIONS = ["Newest", "Price: Low to High", "Price: High to Low", "Most Popular"];

export const PER_PAGE = 9;