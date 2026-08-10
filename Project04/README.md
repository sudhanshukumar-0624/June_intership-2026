# 🎬 Project 04 — Moviestan (Discover Movies & TV Shows)

A premium, feature-rich movie and TV show discovery web application powered by the **OMDb API**. Built with modern HTML, CSS, and Vanilla JavaScript during a web development internship at UNLOX.

---

## 🖥️ Live Preview

🔗 **Deployed URL:** [https://movie-search-04.netlify.app](https://movie-search-04.netlify.app)

Or open `index.html` directly in any modern browser — no server required.

---

## 🖥️ Overview

**Moviestan** delivers a streaming-platform UI experience (similar to Netflix / Prime Video / Disney+). Users can explore curated rows of movies and series, view rich detailed metadata (ratings, plot, cast, director, box office), search in real-time with autocomplete suggestions, view full category collections with 30 titles each in a "See All" overlay, and manage their personal Watchlist.

---

## 📁 Project Structure

```
Project04/
├── index.html      # Main HTML structure (Navbar, Hero, Rows, Detail Modal, Category Grid, Search Overlay).
├── style.css       # Full styling system (Dark glassmorphism theme, smooth animations, layout, responsive design).
├── movie.js        # Core JavaScript logic (OMDb API integration, live search, autocomplete pool, modals, watchlist).
└── README.md       # Project documentation.
```

---

## ✨ Key Features

- **🌟 Cinematic Hero Section**: Dynamic banner featuring top-rated series and movies with background poster, IMDb star rating, genres, plot summary, and an instant "Watch Trailer" button.
- **🍿 Horizontal Content Rows**: Scrollable movie & show rows (Trending, Popular Movies, Top TV Shows, Action & Adventure, Sci-Fi & Thriller, Horror & Mystery) with smooth left/right navigation arrows.
- **📂 "See All" Category View**: Full-screen grid view listing 30 curated titles per category, complete with badges denoting extra titles.
- **🔍 Real-Time Search & Autocomplete**: Instant search with a live autocomplete suggestions pool and keyboard navigation (Arrow keys + Enter), backed by debounced live OMDb API queries.
- **🎥 Interactive Movie Detail Modal**: Rich details overlay showcasing IMDb scores, age ratings, release date, runtime, genre, director, writers, box office, awards, cast list, and direct YouTube trailer search.
- **📌 Personal Watchlist**: Add or remove movies to a local Watchlist stored in browser `localStorage`, with animated toast notification alerts.
- **🎨 Glassmorphic & Modern Aesthetic**: Dark mode design featuring vibrant neon accents (`#00e5a0`, `#9b59f5`), shimmer skeleton loaders, smooth CSS transitions, and keyboard accessibility (Esc key to close, Ctrl+K / '/' to search).

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure, accessibility markup, and responsive UI layout |
| **CSS3** | Vanilla CSS with custom CSS variables, Flexbox, Grid, Glassmorphism, animations, and responsive breakpoints |
| **JavaScript (ES6+)** | Dynamic DOM manipulation, Async/Fetch API, debouncing, keyboard navigation, and `localStorage` state |
| **OMDb API** | External REST API fetching real-time movie/show metadata, posters, ratings, and plot summaries |
| **Font Awesome 6** | Modern UI icons |
| **Google Fonts** | Inter font typography family |

---

## 🚀 How to Run

1. Clone or download the `Project04` repository folder.
2. Open `index.html` directly in any web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
3. No build tools, Node.js server, or installation required.

---

## 🐞 Recent Bug Fixes

- **"See All" Movie Click Z-Index Issue**: Resolved a layout stacking issue where clicking a movie card inside the "See All" category overlay opened the movie detail modal underneath the category overlay (`z-index: 300` vs `z-index: 950`). The detail modal's `z-index` was updated to `2000` (and toast to `3000`), ensuring movie details always open cleanly on top of all section overlays.

---

## 👨‍🎓 Developer

**Sudhanshu Kumar**  
B.Tech Computer Science & Engineering  
OP Jindal University, Raigarh, India · 2024–2028  
📧 sudhanshusdsm@gmail.com  
📞 +91 9835889490

---

## 📝 License

This project was created as part of the **UNLOX Web Development Internship** (June – August 2026).  
Feel free to use it as a reference or learning resource.
