
const API_KEY = " Use Your API Key ";

const recentKeyName = "recent_weather_searches";


lucide.createIcons();

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        getWeather(query);
        searchInput.value = "";
    }
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
            getWeather(query);
            searchInput.value = "";
        }
    }
});


document.getElementById("gps-btn").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                getWeatherByCoords(lat, lon);
            },
            () => {
                alert("Unable to access current location.");
            }
        );
    }
});

renderRecents();

getWeather("Brooklyn");

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
        .then(res => {
            if (!res.ok) throw new Error("API call failed");
            return res.json();
        })
        .then(data => {
            Promise.all([
                fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`).then(r => r.json()),
                fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}`).then(r => r.json())
            ])
            .then(([forecast, aqiData]) => {
                const aqi = aqiData.list[0].main.aqi;
                updateDashboard(data, forecast, aqi);
                saveRecent(data.name, data.sys.country, Math.round(data.main.temp), data.weather[0].description, data.weather[0].icon);
            })
            .catch(() => {
                updateDashboard(data, null, 1);
            });
        })
        .catch(() => {
            alert(`Could not load weather for "${city}". Please try another city.`);
        });
}

function getWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(res => {
            if (!res.ok) throw new Error("Coords fetch failed");
            return res.json();
        })
        .then(data => {
            getWeather(data.name);
        })
        .catch(() => {
            alert("Unable to fetch weather for your location.");
        });
}

function updateDashboard(weather, forecast, aqi) {
    const utc = Date.now() + new Date().getTimezoneOffset() * 60000;
    const local = new Date(utc + weather.timezone * 1000);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dateStr = `${days[local.getDay()]}, ${months[local.getMonth()]} ${local.getDate()}`;

    document.getElementById("city-name").textContent = `${weather.name}, ${weather.sys.country}`;
    document.getElementById("globe-location").textContent = `${weather.name}, ${weather.sys.country}`;
    document.getElementById("date-label").textContent = `(${dateStr})`;

    document.getElementById("temp-val").textContent = Math.round(weather.main.temp);
    document.getElementById("high-temp").textContent = `${Math.round(weather.main.temp_max)}°`;
    document.getElementById("low-temp").textContent = `${Math.round(weather.main.temp_min)}°`;

    const desc = weather.weather[0].description;
    document.getElementById("weather-desc").textContent = desc.charAt(0).toUpperCase() + desc.slice(1);

    updateAqiChart(aqi);
    updateBackground(weather.weather[0].icon);

    let weekly = [];
    if (forecast && forecast.list) {
        const midDay = forecast.list.filter(f => f.dt_txt.includes("12:00:00"));
        weekly = midDay.map(f => {
            const date = new Date(f.dt * 1000);
            return {
                day: days[date.getDay()],
                temp: Math.round(f.main.temp),
                high: Math.round(f.main.temp_max),
                low: Math.round(f.main.temp_min),
                desc: f.weather[0].description,
                owmIcon: f.weather[0].icon,         
                icon: mapIcon(f.weather[0].icon)      
            };
        });
    }

    if (weekly.length < 6) {
        weekly = createMockWeekly(Math.round(weather.main.temp), weather.weather[0].icon);
    }

    renderWeeklyGraph(weekly);
    updateGlobe(weather.coord.lat, weather.coord.lon);
}


function updateBackground(icon) {
    const bgMap = {
        "01": "assets/bg_sunny.png",  
        "02": "assets/weather_dashboard_bg.png",  
        "03": "assets/weather_dashboard_bg.png",  
        "04": "assets/weather_dashboard_bg.png",  
        "09": "assets/bg_cloudy.png",   
        "10": "assets/bg_cloudy.png",   
        "11": "assets/bg_stormy.png",  
        "13": "assets/bg_snowy.png",   
        "50": "assets/weather_dashboard_bg.png"  
    };

    const code = icon ? icon.slice(0, 2) : "01";
    const newSrc = bgMap[code] || "assets/bg_sunny.png";

    const bgImg = document.querySelector(".bg-img");
    if (!bgImg) return;

   
    if (bgImg.dataset.currentBg === newSrc) return;
    bgImg.dataset.currentBg = newSrc;

    bgImg.style.transition = "opacity 0.8s ease";
    bgImg.style.opacity = "0";
    setTimeout(() => {
        bgImg.src = newSrc;
        bgImg.onload = () => { bgImg.style.opacity = "1"; };
        if (bgImg.complete) bgImg.style.opacity = "1";
    }, 400);
}


function createMockWeekly(base, baseOwmIcon) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    
    const options = [
        { icon: "sun",              owmIcon: "01d", desc: "Clear sky" },
        { icon: "cloud",            owmIcon: "04d", desc: "Overcast clouds" },
        { icon: "cloud-sun",        owmIcon: "02d", desc: "Partly cloudy" },
        { icon: "cloud-rain",       owmIcon: "10d", desc: "Moderate rain" },
        { icon: "cloud-lightning",  owmIcon: "11d", desc: "Thunderstorm" },
        { icon: "snowflake",        owmIcon: "13d", desc: "Light snow" }
    ];
    return days.map((d, i) => {
        const pick = i === 0 && baseOwmIcon
            ? { icon: mapIcon(baseOwmIcon), owmIcon: baseOwmIcon, desc: "Current conditions" }
            : options[Math.floor(Math.random() * options.length)];
        return {
            day: d,
            temp: base + Math.floor(Math.random() * 8) - 4,
            high: base + 3,
            low: base - 3,
            desc: pick.desc,
            owmIcon: pick.owmIcon,
            icon: pick.icon
        };
    });
}


function mapIcon(icon) {
    if (!icon) return "cloud";
    if (icon.startsWith("01")) return "sun";
    if (icon.startsWith("02") || icon.startsWith("03") || icon.startsWith("04")) return "cloud-sun";
    if (icon.startsWith("09")) return "cloud-drizzle";
    if (icon.startsWith("10")) return "cloud-rain";
    if (icon.startsWith("11")) return "cloud-lightning";
    if (icon.startsWith("13")) return "snowflake";
    return "cloud";
}


function updateAqiChart(aqi) {
    const positions = {
        1: { x: 25, y: 68, text: "Optimal", isDanger: false },
        2: { x: 55, y: 60, text: "Moderate", isDanger: false },
        3: { x: 80, y: 40, text: "Moderate", isDanger: false },
        4: { x: 115, y: 27, text: "Unhealthy", isDanger: true },
        5: { x: 145, y: 16, text: "Dangerous", isDanger: true }
    };

    const pos = positions[aqi] || positions[1];

    document.getElementById("chart-dot").setAttribute("cx", pos.x);
    document.getElementById("chart-dot").setAttribute("cy", pos.y);

    const badge = document.getElementById("aqi-badge");
    const aqiSpan = document.getElementById("aqi-text");
    const tooltip = document.getElementById("chart-tooltip");
    const tooltipText = document.getElementById("tooltip-text");

    aqiSpan.textContent = `AQI Level ${aqi}`;
    tooltipText.textContent = pos.text;

    const chartEl = document.querySelector(".chart");
    const dot = document.getElementById("chart-dot");
    const chartRect = chartEl.getBoundingClientRect();
    const dotRect = dot.getBoundingClientRect();

   
    const leftPx = dotRect.left - chartRect.left + dotRect.width / 2;
    const topPx = dotRect.top - chartRect.top;
    tooltip.style.left = `${leftPx}px`;
    tooltip.style.top = `${topPx}px`;

    if (pos.isDanger) {
        badge.classList.add("danger");
        tooltip.classList.add("danger");
    } else {
        badge.classList.remove("danger");
        tooltip.classList.remove("danger");
    }
}


function renderWeeklyGraph(weekly) {
    const daysList = document.getElementById("weekly-days");
    const tempsRow = document.getElementById("weekly-temps");
    const nodesGroup = document.getElementById("graph-nodes");

    daysList.innerHTML = "";
    tempsRow.innerHTML = "";
    nodesGroup.innerHTML = "";

    const temps = weekly.map(w => w.temp);
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    const range = (max - min) || 1;

    const width = 800;
    const height = 120;
    const points = [];

    weekly.forEach((item, index) => {
        const x = 50 + index * ((width - 100) / (weekly.length - 1));
        const y = 80 - ((item.temp - min) / range) * 50;
        points.push({ x, y });

        const dayDiv = document.createElement("div");
        dayDiv.className = `day ${index === 3 ? 'active' : ''}`;
        dayDiv.innerHTML = `
            <span class="day-name">${item.day}</span>
            <i data-lucide="${item.icon}" class="day-icon"></i>
        `;
        daysList.appendChild(dayDiv);

        const tempSpan = document.createElement("span");
        tempSpan.className = `temp-val ${index === 3 ? 'active' : ''}`;
        tempSpan.id = `tval-${index}`;
        tempSpan.textContent = `${item.temp}°`;
        tempsRow.appendChild(tempSpan);

        dayDiv.addEventListener("click", () => {
            document.querySelectorAll(".day").forEach(d => d.classList.remove("active"));
            document.querySelectorAll(".temp-val").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".node").forEach(n => n.classList.remove("active"));
            document.querySelectorAll(".line").forEach(l => l.classList.remove("active"));

            dayDiv.classList.add("active");
            tempSpan.classList.add("active");

            document.getElementById(`node-${index}`).classList.add("active");
            document.getElementById(`line-${index}`).classList.add("active");

      
            document.getElementById("temp-val").textContent = item.temp;
            if (item.high) document.getElementById("high-temp").textContent = `${item.high}°`;
            if (item.low)  document.getElementById("low-temp").textContent  = `${item.low}°`;
            if (item.desc) {
                const d = item.desc;
                document.getElementById("weather-desc").textContent = d.charAt(0).toUpperCase() + d.slice(1);
            }
            if (item.owmIcon) updateBackground(item.owmIcon);
        });
    });

    let linePath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        linePath += ` L ${points[i].x} ${points[i].y}`;
    }

    document.getElementById("graph-line").setAttribute("d", linePath);

    const fillPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;
    document.getElementById("graph-fill").setAttribute("d", fillPath);

    points.forEach((pt, index) => {
        const guideline = document.createElementNS("http://www.w3.org/2000/svg", "line");
        guideline.setAttribute("x1", pt.x);
        guideline.setAttribute("y1", pt.y);
        guideline.setAttribute("x2", pt.x);
        guideline.setAttribute("y2", height);
        guideline.setAttribute("class", `line ${index === 3 ? 'active' : ''}`);
        guideline.setAttribute("id", `line-${index}`);
        nodesGroup.appendChild(guideline);

        const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", pt.x);
        dot.setAttribute("cy", pt.y);
        dot.setAttribute("r", "4.5");
        dot.setAttribute("class", `node ${index === 3 ? 'active' : ''}`);
        dot.setAttribute("id", `node-${index}`);
        nodesGroup.appendChild(dot);

        dot.addEventListener("click", () => {
            document.querySelectorAll(".day")[index].click();
        });
    });

    lucide.createIcons();
}


function updateGlobe(lat, lon) {
    const globeImg = document.getElementById("globe-img");
    if (globeImg) {
        globeImg.src = `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&z=2&l=sat&size=350,220`;
    }
}


function getRecents() {
    try {
        return JSON.parse(localStorage.getItem(recentKeyName)) || [];
    } catch {
        return [];
    }
}

function saveRecent(name, country, temp, desc, icon) {
    let recent = getRecents();
    recent = recent.filter(r => r.name.toLowerCase() !== name.toLowerCase());
    recent.unshift({ name, country, temp, desc, icon });
    recent = recent.slice(0, 3);
    localStorage.setItem(recentKeyName, JSON.stringify(recent));
    renderRecents();
}

function renderRecents() {
    const list = document.getElementById("recent-list");
    const clearBtn = document.getElementById("clear-btn");
    let recent = getRecents();

    if (recent.length === 0) {
        recent = [
            { name: "Liverpool", country: "UK", temp: 16, desc: "Partly Cloudy", icon: "02d" },
            { name: "Palermo", country: "Italy", temp: -2, desc: "RainThunder", icon: "11d" }
        ];
        clearBtn.style.display = "none";
    } else {
        clearBtn.style.display = "inline";
    }

    list.innerHTML = "";

    recent.forEach(city => {
        const card = document.createElement("div");
        card.className = "recent-card";

        const iconName = mapIcon(city.icon);

        card.innerHTML = `
            <div class="recent-icon-wrap">
                <i data-lucide="${iconName}" class="recent-weather-icon"></i>
            </div>
            <div class="recent-info">
                <span class="recent-city">${city.name}, ${city.country}</span>
                <span class="recent-desc">${city.desc}</span>
            </div>
            <span class="recent-temp">${city.temp}°</span>
        `;

        card.addEventListener("click", () => {
            getWeather(city.name);
        });

        list.appendChild(card);
    });

    clearBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem(recentKeyName);
        renderRecents();
    };

    lucide.createIcons();
}
