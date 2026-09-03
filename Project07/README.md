# 🔥 SoleFire — Premium Sneaker Store

> **Reimagined Comfort. Built to Stand Out.**

A modern, full-featured e-commerce sneaker store built with React 19, Redux Toolkit, and React Router. SoleFire offers a premium shopping experience with a sleek dark UI, real-time cart and wishlist management, advanced search & filtering, and seamless product browsing across multiple categories.

🌐 **Live Demo:** [https://solefire.vercel.app/](https://solefire.vercel.app/)

---
## ✨ Features

- 🏠 **Hero Landing Page** — Animated hero section with floating product showcase cards, stats (30+ products, 5 categories, 4.7★ avg rating), and featured drops
- 🔍 **Smart Search** — Real-time search modal with instant results and query highlighting
- 🗂️ **Category Browsing** — Filter by All, Running, Basketball, Lifestyle, Jordan, and Air Max
- 🛍️ **Product Detail Pages** — Image previews, color swatch pickers, UK shoe size selectors, star ratings, and review counts
- ❤️ **Wishlist** — Toggle items in/out of wishlist with persistent badge counts; move items directly to cart
- 🛒 **Shopping Cart** — Add/remove items, adjust quantities, real-time subtotal & total calculation
- 🏷️ **Discount Badges** — Dynamic sale/hot badges (e.g., −17%, −15%) on product cards
- 🎟️ **Promo Codes** — Free shipping on orders over ₹5,000; 10% off with code `SOLEFIRE24`
- 📱 **Responsive Design** — Mobile-first layout that works across all screen sizes
- 📧 **Newsletter Subscription** — Footer newsletter signup form

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.x | UI library |
| **React Router DOM** | 7.x | Client-side routing & navigation |
| **Redux Toolkit** | 2.x | Global state management (cart & wishlist) |
| **React Redux** | 9.x | React bindings for Redux |
| **React Icons** | 5.x | Icon library |
| **Vite** | 8.x | Build tool & dev server |
| **Oxlint** | 1.x | Fast JavaScript linter |
| **Vanilla CSS** | — | Custom styling & animations |

---

## 📁 Project Structure

```
solefire/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and media
│   ├── components/
│   │   ├── Navbar/         # Header with search, wishlist & cart icons
│   │   ├── Footer/         # Footer with links, social icons & newsletter
│   │   └── ProductCard/    # Reusable product card component
│   ├── data/               # Product data (mock dataset)
│   ├── pages/
│   │   ├── Home/           # Landing page with hero & featured sections
│   │   ├── Category/       # Category listing & filter page
│   │   ├── ProductDetail/  # Individual product detail page
│   │   ├── Cart/           # Shopping cart page
│   │   └── Wishlist/       # Saved wishlist page
│   ├── store/
│   │   ├── cartSlice.js    # Redux slice for cart state
│   │   ├── wishlistSlice.js# Redux slice for wishlist state
│   │   └── index.js        # Redux store configuration
│   ├── App.jsx             # Root component with routing setup
│   ├── main.jsx            # App entry point with Redux Provider
│   └── index.css           # Global styles & design tokens
├── index.html
├── vite.config.js
└── package.json
```
