export const categories = [
  { id: 'all', label: 'All' },
  { id: 'running', label: 'Running' },
  { id: 'basketball', label: 'Basketball' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'jordan', label: 'Jordan' },
  { id: 'airmax', label: 'Air Max' },
];

export const products = [
  {
    id: 1,
    name: 'Air Jordan 1 Retro High OG',
    brand: 'Nike',
    category: 'jordan',
    price: 18999,
    originalPrice: 22999,
    rating: 4.8,
    reviewCount: 1240,
    description: 'The Air Jordan 1 Retro High OG is a timeless silhouette that started it all. Premium leather upper, encapsulated Air cushioning, and iconic color blocking make this a must-have.',
    colors: ['#C0392B', '#2C3E50', '#FFFFFF'],
    sizes: [6, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    ],
    tags: ['iconic', 'retro', 'og'],
    featured: true,
    reviews: [
      { id: 1, user: 'Jordan Fan', avatar: 'JF', rating: 5, date: 'Aug 2024', comment: 'Absolutely legendary shoe. The quality is top-notch and they look even better in person!' },
      { id: 2, user: 'Sneakerhead Mike', avatar: 'SM', rating: 5, date: 'Jul 2024', comment: 'Perfect fit, great colorway. This is the gold standard of sneakers.' },
      { id: 3, user: 'Street Style', avatar: 'SS', rating: 4, date: 'Jun 2024', comment: 'Great shoes but run a little narrow. Size up if you have wide feet.' },
    ]
  },
  {
    id: 2,
    name: 'Nike Air Max 270',
    brand: 'Nike',
    category: 'airmax',
    price: 14999,
    originalPrice: 17999,
    rating: 4.6,
    reviewCount: 890,
    description: 'The Nike Air Max 270 features Nikes biggest heel Air unit yet for an extremely lightweight feel. The sleek design combined with maximum cushioning makes this perfect for all-day wear.',
    colors: ['#E67E22', '#3498DB', '#1A1A1A'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80',
    ],
    tags: ['air max', 'cushioning', 'lifestyle'],
    featured: true,
    reviews: [
      { id: 1, user: 'Daily Walker', avatar: 'DW', rating: 5, date: 'Aug 2024', comment: 'Most comfortable shoes I\'ve ever worn. The air cushion is incredible!' },
      { id: 2, user: 'Collector X', avatar: 'CX', rating: 4, date: 'Jul 2024', comment: 'Clean design, great for casual wear. Slightly pricey but worth it.' },
    ]
  },
  {
    id: 3,
    name: 'Nike Air Force 1 Low',
    brand: 'Nike',
    category: 'lifestyle',
    price: 9999,
    originalPrice: 11999,
    rating: 4.7,
    reviewCount: 2100,
    description: 'The Nike Air Force 1 Low is one of the most iconic silhouettes ever created. Clean, classic, and versatile — it pairs with everything.',
    colors: ['#FFFFFF', '#1A1A1A', '#C0392B'],
    sizes: [5, 6, 7, 8, 9, 10, 11, 12, 13],
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80',
    ],
    tags: ['classic', 'white', 'versatile'],
    featured: false,
    reviews: [
      { id: 1, user: 'Classic Lover', avatar: 'CL', rating: 5, date: 'Aug 2024', comment: 'The most iconic shoe of all time. Never gets old!' },
      { id: 2, user: 'Fresh Kicks', avatar: 'FK', rating: 5, date: 'Jul 2024', comment: 'Perfect with any outfit. Bought my 4th pair!' },
      { id: 3, user: 'Urban Style', avatar: 'US', rating: 4, date: 'Jun 2024', comment: 'Great quality, very clean. Scuffs easily but stays fresh with proper care.' },
    ]
  },
  {
    id: 4,
    name: 'Nike Air Presto',
    brand: 'Nike',
    category: 'running',
    price: 11999,
    originalPrice: 13999,
    rating: 4.5,
    reviewCount: 560,
    description: 'The Nike Air Presto is designed like a T-shirt for your foot. Stretchy, breathable mesh delivers a sock-like fit with a modern aesthetic.',
    colors: ['#2ECC71', '#E74C3C', '#1A1A1A'],
    sizes: [6, 7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80',
    ],
    tags: ['running', 'lightweight', 'breathable'],
    featured: false,
    reviews: [
      { id: 1, user: 'Runner Pro', avatar: 'RP', rating: 5, date: 'Aug 2024', comment: 'Incredibly lightweight. Feels like running on air!' },
      { id: 2, user: 'Gym Rat', avatar: 'GR', rating: 4, date: 'Jul 2024', comment: 'Great for workouts. The mesh keeps feet cool.' },
    ]
  },
  {
    id: 5,
    name: 'Air Jordan 11 Retro',
    brand: 'Nike',
    category: 'jordan',
    price: 22999,
    originalPrice: 26999,
    rating: 4.9,
    reviewCount: 1560,
    description: 'The Air Jordan 11 Retro features the iconic patent leather mudguard that Michael Jordan debuted during the 1995-96 season. A timeless masterpiece.',
    colors: ['#1A1A1A', '#FFFFFF', '#C0392B'],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    image: 'https://images.unsplash.com/photo-1612015670817-0127d21628d4?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1612015670817-0127d21628d4?w=600&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    ],
    tags: ['premium', 'patent leather', 'iconic'],
    featured: true,
    reviews: [
      { id: 1, user: 'MJ Fan', avatar: 'MJ', rating: 5, date: 'Aug 2024', comment: 'The holy grail of basketball shoes. Worth every penny!' },
      { id: 2, user: 'Grail Hunter', avatar: 'GH', rating: 5, date: 'Jul 2024', comment: 'Got them in perfect condition. The patent leather is stunning.' },
    ]
  },
  {
    id: 6,
    name: 'Nike LeBron 20',
    brand: 'Nike',
    category: 'basketball',
    price: 19999,
    originalPrice: 23999,
    rating: 4.7,
    reviewCount: 780,
    description: 'The Nike LeBron 20 delivers elite performance for the King\'s game. Full-length Air Max cushioning, supportive fit, and dynamic traction pattern.',
    colors: ['#E74C3C', '#F39C12', '#2C3E50'],
    sizes: [8, 9, 10, 11, 12, 13, 14],
    image: 'https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?w=600&q=80',
    ],
    tags: ['basketball', 'performance', 'lebron'],
    featured: false,
    reviews: [
      { id: 1, user: 'Court King', avatar: 'CK', rating: 5, date: 'Aug 2024', comment: 'Best basketball shoe I\'ve played in. Amazing ankle support!' },
      { id: 2, user: 'Baller Life', avatar: 'BL', rating: 4, date: 'Jul 2024', comment: 'Great performance shoe. Slightly heavy but super stable.' },
    ]
  },
  {
    id: 7,
    name: 'Nike Zoom Pegasus 40',
    brand: 'Nike',
    category: 'running',
    price: 12999,
    originalPrice: 15499,
    rating: 4.6,
    reviewCount: 934,
    description: 'The Nike Zoom Pegasus 40 is the go-to daily trainer. React foam cushioning, Zoom Air unit in the forefoot, and a redesigned upper deliver speed and comfort.',
    colors: ['#3498DB', '#E74C3C', '#FFFFFF'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80',
    ],
    tags: ['running', 'daily trainer', 'zoom'],
    featured: false,
    reviews: [
      { id: 1, user: 'Marathon Man', avatar: 'MM', rating: 5, date: 'Aug 2024', comment: 'Perfect for long runs. My feet feel great even after 20k!' },
    ]
  },
  {
    id: 8,
    name: 'Air Jordan 4 Retro',
    brand: 'Nike',
    category: 'jordan',
    price: 20999,
    originalPrice: 24999,
    rating: 4.8,
    reviewCount: 1120,
    description: 'The Air Jordan 4 Retro was first released in 1989. Visible Air cushioning, unique mesh panels, and the iconic "Flight" logo make this a collector\'s dream.',
    colors: ['#F39C12', '#2C3E50', '#E74C3C'],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    ],
    tags: ['retro', 'collector', 'fire red'],
    featured: true,
    reviews: [
      { id: 1, user: 'Retro Head', avatar: 'RH', rating: 5, date: 'Aug 2024', comment: 'Absolutely stunning pair. The mesh detailing is incredible!' },
      { id: 2, user: 'Kick Collector', avatar: 'KC', rating: 5, date: 'Jul 2024', comment: 'This colorway is fire. Immediate grail!' },
    ]
  },
  {
    id: 9,
    name: 'Nike Dunk Low',
    brand: 'Nike',
    category: 'lifestyle',
    price: 10999,
    originalPrice: 12999,
    rating: 4.7,
    reviewCount: 1890,
    description: 'Originally designed for the hardwood, the Nike Dunk Low has transcended sport to become a streetwear staple. Clean colorblocking and premium leather.',
    colors: ['#27AE60', '#C0392B', '#2C3E50'],
    sizes: [5, 6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80',
    ],
    tags: ['dunk', 'streetwear', 'versatile'],
    featured: false,
    reviews: [
      { id: 1, user: 'Street Plug', avatar: 'SP', rating: 5, date: 'Aug 2024', comment: 'Perfect streetwear shoe. Goes with literally everything.' },
      { id: 2, user: 'Dunk Fanatic', avatar: 'DF', rating: 4, date: 'Jul 2024', comment: 'Love the Panda colorway. Super clean!' },
    ]
  },
  {
    id: 10,
    name: 'Nike KD 15',
    brand: 'Nike',
    category: 'basketball',
    price: 16999,
    originalPrice: 19999,
    rating: 4.5,
    reviewCount: 620,
    description: 'The Nike KD 15 wraps your foot in a knit bootie construction. Full-length Zoom Air Strobel delivers explosive cushioning for KD\'s quick, precise game.',
    colors: ['#8E44AD', '#F39C12', '#1A1A1A'],
    sizes: [8, 9, 10, 11, 12, 13],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    ],
    tags: ['basketball', 'kevin durant', 'zoom'],
    featured: false,
    reviews: [
      { id: 1, user: 'KD Fan', avatar: 'KD', rating: 5, date: 'Aug 2024', comment: 'Incredibly responsive. Perfect for quick footwork on the court.' },
    ]
  },
  {
    id: 11,
    name: 'Nike Air Max 90',
    brand: 'Nike',
    category: 'airmax',
    price: 13999,
    originalPrice: 16499,
    rating: 4.6,
    reviewCount: 1340,
    description: 'The Nike Air Max 90 stays true to its OG roots with the iconic Waffle outsole, stitched overlays, and classic BRS logo. The visible Air cushioning remains the star of the show.',
    colors: ['#E74C3C', '#FFFFFF', '#1A1A1A'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    ],
    tags: ['air max 90', 'classic', 'waffle'],
    featured: false,
    reviews: [
      { id: 1, user: 'OG Collector', avatar: 'OG', rating: 5, date: 'Aug 2024', comment: 'A true classic! The Air Max 90 never goes out of style.' },
      { id: 2, user: 'Vintage Head', avatar: 'VH', rating: 4, date: 'Jul 2024', comment: 'Love the retro feel. Very comfortable for all-day wear.' },
    ]
  },
  {
    id: 12,
    name: 'Nike React Infinity Run',
    brand: 'Nike',
    category: 'running',
    price: 15999,
    originalPrice: 18499,
    rating: 4.7,
    reviewCount: 780,
    description: 'The Nike React Infinity Run is designed to keep you running. More cushioning and improved upper details help reduce injury and keep you on the run.',
    colors: ['#3498DB', '#E67E22', '#1A1A1A'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&q=80',
    ],
    tags: ['running', 'react foam', 'injury prevention'],
    featured: false,
    reviews: [
      { id: 1, user: 'Road Runner', avatar: 'RR', rating: 5, date: 'Aug 2024', comment: 'Saved my knees! These are incredible for long distances.' },
    ]
  },
  {
    id: 13,
    name: 'Air Jordan 3 Retro',
    brand: 'Nike',
    category: 'jordan',
    price: 19999,
    originalPrice: 23999,
    rating: 4.8,
    reviewCount: 980,
    description: 'The Air Jordan 3 Retro was the first Jordan to feature visible Air. Designed by Tinker Hatfield, its elephant print overlays and cement colorway are legendary.',
    colors: ['#FFFFFF', '#C0392B', '#2C3E50'],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600&q=80',
    ],
    tags: ['jordan 3', 'cement', 'tinker hatfield'],
    featured: false,
    reviews: [
      { id: 1, user: 'Cement Head', avatar: 'CH', rating: 5, date: 'Aug 2024', comment: 'The cement print is just incredible. My favorite Jordan ever.' },
    ]
  },
  {
    id: 14,
    name: 'Nike SB Dunk High',
    brand: 'Nike',
    category: 'lifestyle',
    price: 13999,
    originalPrice: 16499,
    rating: 4.6,
    reviewCount: 740,
    description: 'The Nike SB Dunk High Pro brings skateboarding performance to your feet. Zoom Air cushioning, reinforced toe cap, and padded tongue for board feel.',
    colors: ['#8E44AD', '#E67E22', '#1A1A1A'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&q=80',
    ],
    tags: ['sb dunk', 'skate', 'high top'],
    featured: false,
    reviews: [
      { id: 1, user: 'Skate Life', avatar: 'SL', rating: 5, date: 'Aug 2024', comment: 'Perfect for skating AND streetwear. Versatile and durable.' },
    ]
  },
  {
    id: 15,
    name: 'Nike Air Zoom Alphafly',
    brand: 'Nike',
    category: 'running',
    price: 24999,
    originalPrice: 28999,
    rating: 4.9,
    reviewCount: 430,
    description: 'The Nike Air Zoom Alphafly NEXT% is designed for race day. Two Zoom Air pods and ZoomX foam deliver maximum energy return for your fastest races.',
    colors: ['#E74C3C', '#F39C12', '#1A1A1A'],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',
    ],
    tags: ['racing', 'zoomx', 'elite'],
    featured: false,
    reviews: [
      { id: 1, user: 'Elite Runner', avatar: 'ER', rating: 5, date: 'Aug 2024', comment: 'PR machine! Shaved 3 minutes off my marathon time.' },
    ]
  },
  {
    id: 16,
    name: 'Air Jordan 6 Retro',
    brand: 'Nike',
    category: 'jordan',
    price: 21999,
    originalPrice: 25999,
    rating: 4.8,
    reviewCount: 860,
    description: 'The Air Jordan 6 Retro — the shoe MJ wore when he won his first championship in 1991. Features a pull tab at the heel, a modified sole, and carbon fiber support.',
    colors: ['#1A1A1A', '#C0392B', '#F39C12'],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    ],
    tags: ['jordan 6', 'championship', 'infrared'],
    featured: false,
    reviews: [
      { id: 1, user: 'Championship Fan', avatar: 'CF', rating: 5, date: 'Aug 2024', comment: 'Wearing these gives me MJ energy. Absolute heat!' },
    ]
  },
  {
    id: 17,
    name: 'Nike Blazer Mid 77',
    brand: 'Nike',
    category: 'lifestyle',
    price: 8999,
    originalPrice: 10999,
    rating: 4.5,
    reviewCount: 1120,
    description: 'The Nike Blazer Mid 77 Vintage brings back the look of one of Nike\'s earliest athletic shoes. Vintage finish, distressed midsole, and premium leather upper.',
    colors: ['#FFFFFF', '#F39C12', '#2C3E50'],
    sizes: [5, 6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&q=80',
    ],
    tags: ['blazer', 'vintage', 'retro'],
    featured: false,
    reviews: [
      { id: 1, user: 'Vintage Lover', avatar: 'VL', rating: 5, date: 'Aug 2024', comment: 'The distressed finish is perfect. Very unique and stylish.' },
    ]
  },
  {
    id: 18,
    name: 'Nike Giannis Immortality 3',
    brand: 'Nike',
    category: 'basketball',
    price: 8999,
    originalPrice: 10999,
    rating: 4.4,
    reviewCount: 450,
    description: 'The Giannis Immortality 3 delivers premium performance at an accessible price. Cushioned foam, multidirectional traction, and lockdown fit.',
    colors: ['#27AE60', '#1A1A1A', '#F39C12'],
    sizes: [8, 9, 10, 11, 12, 13, 14],
    image: 'https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?w=600&q=80',
    ],
    tags: ['basketball', 'giannis', 'budget'],
    featured: false,
    reviews: [
      { id: 1, user: 'Budget Baller', avatar: 'BB', rating: 4, date: 'Aug 2024', comment: 'Amazing value for the price. Plays above its cost!' },
    ]
  },
  {
    id: 19,
    name: 'Nike Air Max 95',
    brand: 'Nike',
    category: 'airmax',
    price: 16999,
    originalPrice: 19999,
    rating: 4.7,
    reviewCount: 680,
    description: 'The Nike Air Max 95 OG was inspired by the human body. Multiple Air units, graduated panels, and a spine-shaped lacing system create an unforgettable look.',
    colors: ['#1A1A1A', '#E74C3C', '#F39C12'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
    ],
    tags: ['air max 95', 'neon', 'gradient'],
    featured: false,
    reviews: [
      { id: 1, user: 'Neon Fan', avatar: 'NF', rating: 5, date: 'Aug 2024', comment: 'The neon yellow colorway is timeless. Always get compliments!' },
    ]
  },
  {
    id: 20,
    name: 'Air Jordan 13 Retro',
    brand: 'Nike',
    category: 'jordan',
    price: 23999,
    originalPrice: 27999,
    rating: 4.8,
    reviewCount: 720,
    description: 'The Air Jordan 13 Retro is inspired by MJ\'s panther-like moves on the court. The holographic eye outsole and premium leather create a bold statement.',
    colors: ['#1A1A1A', '#C0392B', '#FFFFFF'],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    image: 'https://images.unsplash.com/photo-1612015670817-0127d21628d4?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1612015670817-0127d21628d4?w=600&q=80',
    ],
    tags: ['jordan 13', 'flint', 'hologram'],
    featured: false,
    reviews: [
      { id: 1, user: 'Flint Head', avatar: 'FH', rating: 5, date: 'Aug 2024', comment: 'The holographic catpaw is next level! Best AJ13 colorway.' },
    ]
  },
  {
    id: 21,
    name: 'Nike Vaporfly Next% 3',
    brand: 'Nike',
    category: 'running',
    price: 21999,
    originalPrice: 25999,
    rating: 4.8,
    reviewCount: 380,
    description: 'The Nike Vaporfly Next% 3 is built for elite performance. ZoomX foam, full-length carbon fiber plate, and an optimized upper deliver record-breaking speed.',
    colors: ['#E74C3C', '#3498DB', '#1A1A1A'],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80',
    ],
    tags: ['racing', 'carbon plate', 'elite'],
    featured: false,
    reviews: [
      { id: 1, user: 'Speed Demon', avatar: 'SD', rating: 5, date: 'Aug 2024', comment: 'These are absolutely insane for racing. PR guaranteed!' },
    ]
  },
  {
    id: 22,
    name: 'Nike P-6000',
    brand: 'Nike',
    category: 'lifestyle',
    price: 7999,
    originalPrice: 9499,
    rating: 4.3,
    reviewCount: 420,
    description: 'The Nike P-6000 is inspired by a late \'90s running silhouette. Chunky, premium design with a breathable mesh upper and foam midsole.',
    colors: ['#E67E22', '#8E44AD', '#FFFFFF'],
    sizes: [6, 7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
    ],
    tags: ['dad shoe', 'chunky', '90s'],
    featured: false,
    reviews: [
      { id: 1, user: '90s Kid', avatar: '9K', rating: 4, date: 'Aug 2024', comment: 'Love the retro chunky vibe. Very comfortable!' },
    ]
  },
  {
    id: 23,
    name: 'Nike Air Max SNDR',
    brand: 'Nike',
    category: 'airmax',
    price: 11999,
    originalPrice: 13999,
    rating: 4.4,
    reviewCount: 290,
    description: 'The Nike Air Max SNDR reimagines the Air Max legacy with a fresh, modern take. Lightweight foam and visible Air cushioning in a bold new silhouette.',
    colors: ['#3498DB', '#E74C3C', '#FFFFFF'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    ],
    tags: ['air max', 'modern', 'new silhouette'],
    featured: false,
    reviews: [
      { id: 1, user: 'New Wave', avatar: 'NW', rating: 4, date: 'Aug 2024', comment: 'Fresh new shape. Love the bold color options!' },
    ]
  },
  {
    id: 24,
    name: 'Air Jordan 5 Retro',
    brand: 'Nike',
    category: 'jordan',
    price: 20999,
    originalPrice: 24999,
    rating: 4.8,
    reviewCount: 890,
    description: 'The Air Jordan 5 Retro was inspired by WWII fighter planes. Lace locks, reflective tongue, visible Air cushioning, and shark-tooth midsole make it unmistakable.',
    colors: ['#FFFFFF', '#C0392B', '#1A1A1A'],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80',
    ],
    tags: ['jordan 5', 'fire red', 'shark tooth'],
    featured: false,
    reviews: [
      { id: 1, user: 'Fire Red Fan', avatar: 'FR', rating: 5, date: 'Aug 2024', comment: 'The Fire Red 5s are legendary! Perfect execution.' },
    ]
  },
  {
    id: 25,
    name: 'Nike PG 6',
    brand: 'Nike',
    category: 'basketball',
    price: 11999,
    originalPrice: 13999,
    rating: 4.5,
    reviewCount: 380,
    description: 'The Nike PG 6 is designed for Paul George\'s quick, agile game. React foam cushioning, herringbone traction pattern, and a snug fit for multi-directional play.',
    colors: ['#9B59B6', '#E74C3C', '#1A1A1A'],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    ],
    tags: ['basketball', 'paul george', 'react'],
    featured: false,
    reviews: [
      { id: 1, user: 'Court Hooper', avatar: 'CH', rating: 4, date: 'Aug 2024', comment: 'Great traction and fit. My go-to for pickup games.' },
    ]
  },
  {
    id: 26,
    name: 'Nike Air Huarache',
    brand: 'Nike',
    category: 'lifestyle',
    price: 10999,
    originalPrice: 12999,
    rating: 4.5,
    reviewCount: 760,
    description: 'The Nike Air Huarache features an innovative inner sleeve for a snug, custom fit. Visible Air heel unit and sleek low-profile design make it a modern classic.',
    colors: ['#E74C3C', '#1A1A1A', '#3498DB'],
    sizes: [6, 7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=600&q=80',
    ],
    tags: ['huarache', 'inner sleeve', 'sleek'],
    featured: false,
    reviews: [
      { id: 1, user: 'Sneaker Nerd', avatar: 'SN', rating: 5, date: 'Aug 2024', comment: 'The inner sleeve technology is genius. Fits perfectly!' },
    ]
  },
  {
    id: 27,
    name: 'Nike Air Max Plus',
    brand: 'Nike',
    category: 'airmax',
    price: 14999,
    originalPrice: 17499,
    rating: 4.6,
    reviewCount: 620,
    description: 'The Nike Air Max Plus, also known as the TN, was inspired by waves, sunrays, and palm tree trunks. Its aggressive design and visible Tuned Air units are iconic.',
    colors: ['#F39C12', '#1A1A1A', '#3498DB'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
    ],
    tags: ['tn', 'tuned air', 'aggressive'],
    featured: false,
    reviews: [
      { id: 1, user: 'TN Lover', avatar: 'TN', rating: 5, date: 'Aug 2024', comment: 'TNs are the most aggressive Air Max ever made. Absolute heat!' },
    ]
  },
  {
    id: 28,
    name: 'Nike Ja 2',
    brand: 'Nike',
    category: 'basketball',
    price: 12999,
    originalPrice: 14999,
    rating: 4.6,
    reviewCount: 520,
    description: 'The Nike Ja 2 is built for Ja Morant\'s explosive, athletic game. Responsive cushioning, secure fit, and multidirectional traction for high-flying plays.',
    colors: ['#E74C3C', '#1A1A1A', '#F39C12'],
    sizes: [8, 9, 10, 11, 12, 13],
    image: 'https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?w=600&q=80',
    ],
    tags: ['basketball', 'ja morant', 'explosive'],
    featured: false,
    reviews: [
      { id: 1, user: 'Young Hooper', avatar: 'YH', rating: 5, date: 'Aug 2024', comment: 'These make me feel like I can fly! Amazing for explosive players.' },
    ]
  },
  {
    id: 29,
    name: 'Nike Air Max 1',
    brand: 'Nike',
    category: 'airmax',
    price: 12999,
    originalPrice: 14999,
    rating: 4.7,
    reviewCount: 980,
    description: 'The Nike Air Max 1 started the Air Max revolution in 1987. Tinker Hatfield\'s iconic design cut a window in the midsole to show off the Air cushioning to the world.',
    colors: ['#C0392B', '#E67E22', '#1A1A1A'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    ],
    tags: ['air max 1', 'og', 'tinker hatfield'],
    featured: false,
    reviews: [
      { id: 1, user: 'OG Head', avatar: 'OG', rating: 5, date: 'Aug 2024', comment: 'The shoe that started it all. Timeless design, perfect execution.' },
    ]
  },
  {
    id: 30,
    name: 'Nike Free Metcon 6',
    brand: 'Nike',
    category: 'running',
    price: 13999,
    originalPrice: 15999,
    rating: 4.5,
    reviewCount: 340,
    description: 'The Nike Free Metcon 6 combines flexibility for running with stability for training. The wide, flat heel and textured pattern create a stable base for heavy lifts.',
    colors: ['#1A1A1A', '#E74C3C', '#27AE60'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1545289414-1c3cb1c06238?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1545289414-1c3cb1c06238?w=600&q=80',
    ],
    tags: ['training', 'crossfit', 'flexible'],
    featured: false,
    reviews: [
      { id: 1, user: 'CrossFit Pro', avatar: 'CP', rating: 5, date: 'Aug 2024', comment: 'Best training shoe I\'ve used. Handles everything from cardio to lifting.' },
    ]
  },
];

export const getProductsByCategory = (category) => {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};

export const getProductById = (id) => {
  return products.find(p => p.id === parseInt(id));
};

export const getSimilarProducts = (product, count = 4) => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, count);
};
