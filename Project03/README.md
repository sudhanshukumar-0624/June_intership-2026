# 🌤️ Project 03 — WeatherWise Dashboard

A beautiful, real-time weather dashboard called **WeatherWise** that fetches live weather data using the OpenWeatherMap API. Features city search, GPS-based auto-detection, AQI status, hourly/weekly forecasts, and a glassmorphism UI. Built with HTML, CSS, & JavaScript during a web development internship at UNLOX.

---

## 🖥️ Live Preview

🔗 **Deployed URL:** [https://weather-dashboard-006.netlify.app](https://weather-dashboard-006.netlify.app)

> ⚠️ **Requires an active internet connection** — fetches live data from OpenWeatherMap API.

Open `index.html` in any modern browser (Chrome recommended for Geolocation).

---

## 📁 Project Structure

```
Project03/
├── index.html          # Main HTML structure.
├── styles.css          # Glassmorphism UI styling.
├── web.js              # All JavaScript logic & API calls.
└── assets/
    └── weather_dashboard_bg.png   # Background image.
```

---

## ✨ Features

- **City Search** — Type any city name and get instant weather data
- **GPS / Geolocation** — One-click button to detect your current location
- **Recent Searches** — Saves last searched cities in `localStorage`
- **Current Weather** — Temperature, feels-like, humidity, wind speed, visibility
- **AQI Status Badge** — Air Quality Index with a visual SVG chart
- **Hourly Forecast** — Hour-by-hour weather breakdown
- **Weekly Forecast** — 7-day weather outlook
- **Dynamic Icons** — Lucide icon library for weather conditions
- **Glassmorphism Design** — Frosted glass UI cards over a sky background

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure & semantic layout |
| CSS3 | Glassmorphism, animations, responsive design |
| JavaScript (ES6+) | API calls, DOM updates, geolocation, localStorage |
| OpenWeatherMap API | Live weather & forecast data |
| Lucide Icons | Weather & UI icons |
| Google Fonts | Typography — Outfit |

---

## 🌐 API Used

**OpenWeatherMap** — [https://openweathermap.org/](https://openweathermap.org/)

| Endpoint | Purpose |
|---|---|
| `/weather` | Current weather by city name or coordinates |
| `/forecast` | 5-day / 3-hour forecast |
| `/air_pollution` | AQI and air quality data |

> The API key is stored in `web.js` at the top: `const API_KEY = "..."`.  
> If the key stops working, register a free key at [openweathermap.org/api](https://openweathermap.org/api).

---

## 🎨 Design Highlights

- Frosted glassmorphism card UI
- Full-screen atmospheric background image
- Sidebar panel with status graph (SVG chart)
- Smooth transitions and responsive layout
- Color-coded AQI badge (Good → Hazardous)

---

## 🚀 How to Run

1. Clone or download the `Project03` folder
2. Open `index.html` in **Google Chrome** or any modern browser
3. Allow location access when prompted for GPS weather
4. Type a city name in the search box and press **Enter** or click search

---

## 📌 UI Sections

| Component | Description |
|---|---|
| Sidebar | Logo, AQI status with SVG graph, recent search history |
| Main Panel | Current temp, city name, condition, hourly forecast |
| Bottom Row | Weekly forecast cards, additional stats (wind, humidity, etc.) |

---

## ⚙️ Configuration

To use your own API key, open `web.js` and replace line 2:

```js
// web.js — line 2
const API_KEY = "your_openweathermap_api_key_here";
```

Get a free key at: [https://home.openweathermap.org/users/sign_up](https://home.openweathermap.org/users/sign_up)

---

## 🔒 Known Limitations

- Geolocation requires HTTPS or `localhost` in some browsers
- Free OpenWeatherMap plan limits to 1,000 calls/day
- The background image must remain in the `assets/` folder

---

## 👨‍💻 Developer

**Sudhanshu Kumar**  
B.Tech Computer Science & Engineering  
OP Jindal University, Raighar, India · 2024–2028  
📧 sudhanshusdsm@gmail.com

---

## 📝 License

This project was created as part of the **UNLOX Web Development Internship** (June – August 2026).
