/**
 * MOVIESTAN — OMDB API Movie Website
 * Data API:   http://www.omdbapi.com/?apikey=
 * Poster API: http://img.omdbapi.com/?apikey=
 */

'use strict';

/* ============================================================
   CONFIG
   ============================================================ */
const API_KEY  = '';
const API_BASE = `https://www.omdbapi.com/?apikey=${API_KEY}&`;
// Note: img.omdbapi.com requires a Patreon subscription; we use the
// Poster field from the main API as the primary poster URL.

/* ============================================================
   CURATED TITLE LISTS
   ============================================================ */
const HERO_TITLES = [
    'tt5180504', // The Witcher
    'tt0944947', // Game of Thrones
    'tt3032476', // Better Call Saul
    'tt2861424', // Rick and Morty
    'tt4574334', // Stranger Things
    'tt7366338', // Chernobyl
    'tt1475582', // Sherlock
];

const TRENDING_TITLES = [
    'Avengers Endgame', 'Dune', 'Oppenheimer', 'The Batman',
    'Interstellar', 'Inception', 'Avatar', 'Top Gun Maverick',
    'Spider-Man No Way Home', 'The Dark Knight',
    'Guardians of the Galaxy', 'Black Panther', 'Thor Ragnarok',
    'Doctor Strange', 'Shang-Chi',
    // Extra 15 Titles for See All Section (Total 30 Movies)
    'Eternals', 'Deadpool', 'Avatar The Way of Water', 'Gladiator',
    'The Matrix', 'Fast X', 'Jurassic World', 'The Avengers',
    'Avengers Infinity War', 'Captain America Civil War', 'Iron Man',
    'Transformers', 'The Dark Knight Rises', 'Spider-Man Far From Home',
    'Doctor Strange in the Multiverse of Madness'
];

const MOVIES_TITLES = [
    'Parasite', 'Joker', 'Tenet', 'Knives Out', 'Ford v Ferrari',
    'The Irishman', '1917', 'Midsommar', 'Marriage Story', 'Jojo Rabbit',
    'Everything Everywhere All at Once', 'CODA', 'Belfast',
    'The Power of the Dog', 'Nomadland',
    // Extra 15 Titles for See All Section (Total 30 Movies)
    'Soul', 'Minari', 'The French Dispatch', 'Spencer', 'Last Night in Soho',
    'No Time to Die', 'Dune Part Two', 'Poor Things', 'The Zone of Interest',
    'Barbie', 'La La Land', 'Whiplash', 'The Wolf of Wall Street',
    'Django Unchained', 'Fight Club'
];

const TV_TITLES = [
    'Breaking Bad', 'Chernobyl', 'True Detective', 'The Crown',
    'Narcos', 'Ozark', 'Peaky Blinders', 'The Boys',
    'Squid Game', 'Succession', 'The Last of Us', 'House of the Dragon',
    'Andor', 'The Bear', 'The White Lotus',
    // Extra 15 Titles for See All Section (Total 30 Shows)
    'Severance', 'Yellowstone', 'Loki', 'WandaVision', 'Ted Lasso',
    'Euphoria', 'Invincible', 'Arcane', 'Stranger Things', 'Game of Thrones',
    'Sherlock', 'The Mandalorian', 'Dark', 'Fleabag', 'Mindhunter'
];

const ACTION_TITLES = [
    'John Wick', 'Mad Max Fury Road', 'Mission Impossible Fallout',
    'Atomic Blonde', 'Baby Driver', 'The Raid Redemption', 'Kill Bill Vol 1',
    'Edge of Tomorrow', 'Extraction', 'Nobody',
    'John Wick Chapter 4', 'Bullet Train', 'The Gray Man',
    'Ambulance', 'Violent Night',
    // Extra 15 Titles for See All Section (Total 30 Movies)
    'RRR', 'Prey', 'Elvis', 'Top Gun Maverick', 'Casino Royale',
    'Die Hard', 'Speed', 'Logan', 'Free Guy', 'Skyfall',
    'Gladiator', 'Top Gun', 'Fast Five', 'The Bourne Identity', 'Taken'
];

const SCIFI_TITLES = [
    'Arrival', 'Ex Machina', 'Annihilation', 'Blade Runner 2049',
    'The Martian', 'Gravity', 'Moon', 'District 9',
    'Looper', 'Source Code', 'Coherence', 'A Quiet Place',
    'Interstellar', 'Inception', 'The Matrix',
    // Extra 15 Titles for See All Section (Total 30 Movies)
    'Tenet', 'Minority Report', 'Children of Men', 'Oblivion',
    'TRON Legacy', 'Dune', 'Contact', 'Jurassic Park', '12 Monkeys',
    'Alien', 'Blade Runner', 'War of the Worlds', 'Pacific Rim', 'Avatar', 'Prometheus'
];

const HORROR_TITLES = [
    'Hereditary', 'Midsommar', 'Get Out', 'Us',
    'The Witch', 'It Chapter Two', 'A Quiet Place', 'Nope',
    'Talk to Me', 'The Black Phone', 'Barbarian', 'Malignant',
    'The Conjuring', 'Insidious', 'Sinister',
    // Extra 15 Titles for See All Section (Total 30 Movies)
    'The Ring', 'Scream', 'Saw', 'It', 'The Shining',
    'Evil Dead Rise', 'Smile', 'The Exorcist', 'Resident Evil',
    'A Nightmare on Elm Street', 'Psycho', 'The Silence of the Lambs',
    'Sleepy Hollow', 'The Cabin in the Woods', 'Misery'
];

/* ============================================================
   AUTOCOMPLETE SUGGESTIONS POOL
   ============================================================ */
const SUGGESTIONS_POOL = [
    // Movies
    'Avengers Endgame', 'Avengers Infinity War', 'Avengers Age of Ultron',
    'Avatar', 'Avatar The Way of Water', 'Aladdin', 'Aquaman', 'Aliens', 'Alien',
    'Arrival', 'Annihilation', 'Atomic Blonde', 'Ambulance',
    'Baby Driver', 'Batman Begins', 'Blade Runner 2049', 'Belfast', 'Barbarian',
    'Black Panther', 'Bullet Train', 'Bohemian Rhapsody', 'Barbie',
    'Captain America Civil War', 'Captain America Brave New World', 'Casino Royale', 'Children of Men', 'Contact',
    'CODA', 'Coherence', 'Cruella',
    'Dune', 'Dune Part Two', 'Doctor Strange', 'Doctor Strange Multiverse of Madness',
    'District 9', 'Deadpool', 'Die Hard', 'Django Unchained',
    'Edge of Tomorrow', 'Elvis', 'Eternals', 'Everything Everywhere All at Once',
    'Ex Machina', 'Extraction', 'Evil Dead Rise',
    'Ford v Ferrari', 'The French Dispatch', 'Fight Club', 'Free Guy', 'Fleabag',
    'Gravity', 'Get Out', 'Guardians of the Galaxy', 'Gladiator',
    'Hereditary', 'House of Gucci',
    'Inception', 'Interstellar', 'It Chapter Two', 'Invincible', 'Insidious', 'It',
    'Jojo Rabbit', 'Joker', 'John Wick', 'John Wick Chapter 4', 'Justice League', 'Jurassic World', 'Jurassic Park',
    'KGF Chapter 2', 'Kill Bill', 'Knives Out',
    'Looper', 'Last Night in Soho', 'The Last of Us', 'La La Land', 'Logan',
    'Mad Max Fury Road', 'Midsommar', 'Marriage Story', 'Malignant', 'Minari',
    'Mission Impossible Fallout', 'Moon', 'The Matrix', 'Minority Report',
    'Nobody', 'No Time to Die', 'Nope', 'Nomadland',
    'Oppenheimer', 'Oblivion',
    'Parasite', 'Poor Things', 'Power of the Dog', 'Prey',
    'RRR', 'The Ring', 'Resident Evil',
    'Shang-Chi', 'Soul', 'Source Code', 'Severance', 'Spencer',
    'Spider-Man No Way Home', 'Spider-Man Into the Spider-Verse', 'Squid Game', 'Succession', 'Station Eleven', 'Speed', 'Sinister', 'Scream', 'Saw', 'Smile',
    'Talk to Me', 'Tenet', 'The Batman', 'The Bear', 'The Boys',
    'The Dark Knight', 'The Irishman', 'The Martian', 'The Raid',
    'The Witch', 'The Zone of Interest', 'Thor Ragnarok',
    'Top Gun Maverick', 'Tron Legacy', 'The Shining', 'The Exorcist',
    'Us',
    'Violent Night',
    'WandaVision', 'White Lotus', 'Whiplash', 'The Wolf of Wall Street',
    'Yellowstone',
    '1917', '12 Monkeys',
    // TV Shows
    'Andor', 'Arcane',
    'Breaking Bad', 'Better Call Saul',
    'Chernobyl', 'The Crown', 'Cobra Kai',
    'Dark',
    'Euphoria',
    'Game of Thrones',
    'House of the Dragon',
    'Loki',
    'Narcos',
    'Ozark',
    'Peaky Blinders',
    'Rick and Morty',
    'Sherlock', 'Stranger Things',
    'Ted Lasso', 'True Detective', 'The Mandalorian',
    'The Witcher',
];

/* ============================================================
   STATE
   ============================================================ */
let watchlist = JSON.parse(localStorage.getItem('ms_watchlist') || '[]');
let currentHeroIndex = 0;
let heroTitles = [];
let searchDebounceTimer = null;
let isSearchOpen = false;

/* ============================================================
   DOM REFERENCES
   ============================================================ */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelector(sel);

const loaderScreen  = $('loader-screen');
const loaderFill    = $('loader-fill');
const navbar        = $('navbar');
const searchOverlay = $('search-overlay');
const searchInput   = $('search-input');
const searchClear   = $('search-clear');
const searchHint    = $('search-hint');
const searchGrid    = $('search-results-grid');
const heroImg       = $('hero-img');
const heroTitle     = $('hero-title');
const heroMeta      = $('hero-meta');
const heroStars     = $('hero-stars');
const heroGenres    = $('hero-genres');
const heroPlot      = $('hero-plot');
const heroTypeBadge = $('hero-type-badge');
const heroGenreBadge= $('hero-genre-badge');
const heroBg        = $('hero-bg');
const modalOverlay  = $('modal-overlay');
const toast         = $('toast');
const toastMsg      = $('toast-msg');

/* ============================================================
   LOADER ANIMATION
   ============================================================ */
function runLoader(onComplete) {
    let pct = 0;
    const interval = setInterval(() => {
        pct = Math.min(pct + Math.random() * 14, 95);
        loaderFill.style.width = pct + '%';
    }, 120);

    setTimeout(() => {
        clearInterval(interval);
        loaderFill.style.width = '100%';
        setTimeout(() => {
            loaderScreen.classList.add('hidden');
            onComplete && onComplete();
        }, 500);
    }, 1600);
}

/* ============================================================
   OMDB API HELPERS
   ============================================================ */
async function fetchByImdbId(imdbId) {
    try {
        const url = `${API_BASE}i=${imdbId}&plot=full`;
        const res = await fetch(url);
        const data = await res.json();
        return data.Response === 'True' ? data : null;
    } catch { return null; }
}

async function fetchByTitle(title, type = '') {
    try {
        const typeParam = type ? `&type=${type}` : '';
        // 1. Try exact title lookup with type
        let url = `${API_BASE}t=${encodeURIComponent(title)}&plot=short${typeParam}`;
        let res = await fetch(url);
        let data = await res.json();
        if (data.Response === 'True') return data;

        // 2. Try exact title lookup without type parameter
        if (typeParam) {
            url = `${API_BASE}t=${encodeURIComponent(title)}&plot=short`;
            res = await fetch(url);
            data = await res.json();
            if (data.Response === 'True') return data;
        }

        // 3. Fallback to OMDB Search API (s=title)
        url = `${API_BASE}s=${encodeURIComponent(title)}${typeParam}`;
        res = await fetch(url);
        data = await res.json();
        if (data.Response === 'True' && data.Search && data.Search.length > 0) {
            return await fetchByImdbId(data.Search[0].imdbID);
        }

        return null;
    } catch { return null; }
}

async function searchOMDB(query) {
    try {
        const url = `${API_BASE}s=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        const data = await res.json();
        return data.Response === 'True' ? data.Search : [];
    } catch { return []; }
}

async function fetchFullDetails(imdbId) {
    return fetchByImdbId(imdbId);
}

/* ============================================================
   STAR RATING GENERATOR
   ============================================================ */
function buildStars(rating, max = 10, count = 5) {
    const filled = Math.round((rating / max) * count);
    let html = '';
    for (let i = 0; i < count; i++) {
        html += `<span class="star${i < filled ? '' : ' empty'}">&#9733;</span>`;
    }
    return html;
}

/* ============================================================
   POSTER URL HELPER
   ============================================================ */
function getPoster(data) {
    if (data.Poster && data.Poster !== 'N/A') return data.Poster;
    // Fallback: img.omdbapi.com (may require Patreon)
    return `https://img.omdbapi.com/?apikey=${API_KEY}&i=${data.imdbID}`;
}

/* ============================================================
   HERO SECTION
   ============================================================ */
async function loadHeroTitles() {
    const promises = HERO_TITLES.map(id => fetchByImdbId(id));
    const results = await Promise.all(promises);
    heroTitles = results.filter(Boolean);
    if (heroTitles.length) renderHero(heroTitles[0]);
    startHeroRotation();
}

function renderHero(data) {
    if (!data) return;

    const poster = getPoster(data);

    // Clear bg (just a subtle dark radial gradient now, set in CSS)
    heroBg.style.backgroundImage = 'none';

    // Full-height right-side poster — fade in smoothly
    heroImg.style.opacity = '0';
    heroImg.onerror = () => { heroImg.style.opacity = '0'; };
    heroImg.onload  = () => { heroImg.style.opacity = '1'; };
    heroImg.src = poster;
    heroImg.alt = data.Title;

    heroTitle.textContent = data.Title;
    heroMeta.textContent = [data.Year, data.Rated, data.Runtime].filter(v => v && v !== 'N/A').join('  ·  ');

    const rating = parseFloat(data.imdbRating) || 0;
    heroStars.innerHTML = buildStars(rating);

    heroTypeBadge.textContent = data.Type === 'series' ? 'Series' : 'Movie';

    const genres = (data.Genre || '').split(',').map(g => g.trim()).filter(Boolean);
    heroGenreBadge.textContent = genres[0] || '';
    heroGenres.innerHTML = genres.slice(0, 4).map(g =>
        `<span class="hero-genre-tag">${g}</span>`
    ).join('');

    heroPlot.textContent = data.Plot && data.Plot !== 'N/A' ? data.Plot : '';

    $('hero-play-btn').onclick = () => openYouTubeTrailer(data.Title);
    $('hero-add-btn').onclick = () => toggleWatchlist(data.imdbID, data.Title);
}

function startHeroRotation() {
    if (heroTitles.length < 2) return;
    setInterval(() => {
        currentHeroIndex = (currentHeroIndex + 1) % heroTitles.length;
        renderHero(heroTitles[currentHeroIndex]);
    }, 8000);
}

/* ============================================================
   MOVIE CARDS
   ============================================================ */
function createSkeletonCards(count, containerId) {
    const container = $(containerId);
    if (!container) return;
    container.innerHTML = Array(count).fill('').map(() => `
        <div class="card-skeleton">
            <div class="skeleton-poster"></div>
            <div class="skeleton-title"></div>
            <div class="skeleton-year"></div>
        </div>
    `).join('');
}

function createMovieCard(data, isSearch = false, isExtra = false) {
    const isSeries = data.Type === 'series';
    const rating = parseFloat(data.imdbRating) || 0;
    const poster = getPoster(data);

    const card = document.createElement('div');
    card.className = `movie-card${isSearch ? ' search-card' : ''}`;
    card.setAttribute('data-imdbid', data.imdbID || data.imdbId || '');
    card.setAttribute('title', data.Title);
    card.innerHTML = `
        <div class="card-poster-wrap">
            <img class="card-poster" src="${poster}" alt="${data.Title}" loading="lazy"
                 onerror="this.src='https://via.placeholder.com/160x240/111118/444?text=No+Image'">
            <div class="card-hover-overlay">
                <div class="card-hover-play"><i class="fas fa-play"></i></div>
                ${rating ? `<div class="card-rating"><i class="fas fa-star"></i> ${rating.toFixed(1)}</div>` : ''}
            </div>
            <span class="card-badge${isSeries ? ' series' : ''}">${isSeries ? 'Series' : 'Movie'}</span>
            ${isExtra ? `<span class="card-badge extra"><i class="fas fa-sparkles"></i> Extra</span>` : ''}
        </div>
        <div class="card-info">
            <p class="card-title">${data.Title}</p>
            <p class="card-year">${data.Year || ''}</p>
        </div>
    `;
    card.addEventListener('click', () => {
        const id = data.imdbID || data.imdbId;
        if (id) openModal(id);
    });
    return card;
}

async function loadRow(titles, containerId, type = '') {
    createSkeletonCards(8, containerId);
    const container = $(containerId);
    if (!container) return;

    const fetched = await Promise.all(titles.map(t => fetchByTitle(t, type)));
    const valid = fetched.filter(Boolean);

    container.innerHTML = '';
    valid.forEach(data => {
        container.appendChild(createMovieCard(data));
    });
}

/* ============================================================
   MODAL
   ============================================================ */
async function openModal(imdbId) {
    if (!imdbId) return;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Prefill loading state
    $('modal-title').textContent = 'Loading…';
    $('modal-poster').src = '';
    $('modal-plot').textContent = '';
    $('modal-meta').textContent = '';
    $('modal-imdb-score').textContent = '';
    $('modal-stars').innerHTML = '';

    const data = await fetchFullDetails(imdbId);
    if (!data) {
        $('modal-title').textContent = 'Could not load details.';
        return;
    }

    $('modal-poster').src = getPoster(data);
    $('modal-poster').alt = data.Title;
    $('modal-type').textContent = data.Type === 'series' ? 'Series' : 'Movie';
    $('modal-rated').textContent = data.Rated !== 'N/A' ? data.Rated : '';
    $('modal-title').textContent = data.Title;
    $('modal-meta').textContent = [data.Year, data.Runtime, data.Genre ? data.Genre.split(',')[0] : '']
        .filter(v => v && v !== 'N/A').join('  ·  ');

    const rating = parseFloat(data.imdbRating) || 0;
    $('modal-imdb-score').textContent = rating.toFixed(1);
    $('modal-stars').innerHTML = buildStars(rating);
    $('modal-plot').textContent = data.Plot !== 'N/A' ? data.Plot : '';

    const set = (id, val) => { $(id).textContent = val && val !== 'N/A' ? val : '—'; };
    set('modal-director', data.Director);
    set('modal-writer', data.Writer);
    set('modal-genre', data.Genre);
    set('modal-released', data.Released);
    set('modal-runtime', data.Runtime);
    set('modal-language', data.Language);
    set('modal-boxoffice', data.BoxOffice);
    set('modal-awards', data.Awards);
    set('modal-actors', data.Actors);

    $('modal-play-btn').onclick = () => openYouTubeTrailer(data.Title);
    $('modal-watchlist-btn').onclick = () => toggleWatchlist(imdbId, data.Title);
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

/* ============================================================
   WATCHLIST
   ============================================================ */
function toggleWatchlist(imdbId, title) {
    const idx = watchlist.indexOf(imdbId);
    if (idx === -1) {
        watchlist.push(imdbId);
        showToast(`✓ Added "${title}" to Watchlist`);
    } else {
        watchlist.splice(idx, 1);
        showToast(`Removed "${title}" from Watchlist`);
    }
    localStorage.setItem('ms_watchlist', JSON.stringify(watchlist));
}

/* ============================================================
   TOAST
   ============================================================ */
let toastTimer = null;
function showToast(msg) {
    toastMsg.textContent = msg;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ============================================================
   YOUTUBE TRAILER
   ============================================================ */
function openYouTubeTrailer(movieTitle) {
    const query = encodeURIComponent(movieTitle + ' trailer');
    const url = `https://www.youtube.com/results?search_query=${query}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

/* ============================================================
   SEARCH — AUTOCOMPLETE SUGGESTIONS
   ============================================================ */
let suggestionsEl = null;

function buildSuggestionsEl() {
    suggestionsEl = document.createElement('div');
    suggestionsEl.id = 'search-suggestions';
    suggestionsEl.className = 'search-suggestions';
    // Insert right after the search-wrap div
    const searchWrap = document.querySelector('.search-wrap');
    searchWrap.parentNode.insertBefore(suggestionsEl, searchWrap.nextSibling);

    // Prevent input blur when clicking inside suggestions box
    suggestionsEl.addEventListener('mousedown', e => {
        e.preventDefault();
        e.stopPropagation();
    });

    // Handle suggestion item selection on click
    suggestionsEl.addEventListener('click', e => {
        e.stopPropagation(); // Stop click from reaching searchOverlay (which closes search)
        const item = e.target.closest('.suggestion-item');
        if (!item) return;
        const title = item.dataset.title;
        searchInput.value = title;
        searchClear.classList.add('visible');
        performSearch(title);
        hideSuggestions();
    });
}

function showSuggestions(query) {
    if (!suggestionsEl) buildSuggestionsEl();
    const q = query.trim().toLowerCase();
    if (!q) { hideSuggestions(); return; }

    const matches = SUGGESTIONS_POOL
        .filter(title => title.toLowerCase().includes(q))
        .sort((a, b) => {
            // Prioritize titles that START with the query
            const aStart = a.toLowerCase().startsWith(q) ? 0 : 1;
            const bStart = b.toLowerCase().startsWith(q) ? 0 : 1;
            return aStart - bStart || a.localeCompare(b);
        })
        .slice(0, 8);

    if (!matches.length) { hideSuggestions(); return; }

    suggestionsEl.innerHTML = matches.map((title, i) => {
        const highlighted = title.replace(
            new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
            '<mark>$1</mark>'
        );
        return `<div class="suggestion-item" data-title="${title}" data-index="${i}">
            <i class="fas fa-search suggestion-icon"></i>
            <span>${highlighted}</span>
            <i class="fas fa-arrow-up-left suggestion-arrow"></i>
        </div>`;
    }).join('');

    suggestionsEl.classList.add('visible');
}

function hideSuggestions() {
    if (suggestionsEl) suggestionsEl.classList.remove('visible');
}

function openSearch() {
    isSearchOpen = true;
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 150);
}

function closeSearch() {
    isSearchOpen = false;
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
    searchInput.value = '';
    searchGrid.innerHTML = '';
    searchHint.style.display = 'flex';
    searchClear.classList.remove('visible');
    hideSuggestions();
}

async function performSearch(query) {
    if (!query.trim()) {
        searchGrid.innerHTML = '';
        searchHint.style.display = 'flex';
        return;
    }
    searchHint.style.display = 'none';
    searchGrid.innerHTML = '<p style="color:var(--text-subtle);font-size:0.85rem;padding:10px 0;">Searching…</p>';

    const results = await searchOMDB(query);
    searchGrid.innerHTML = '';

    if (!results.length) {
        searchGrid.innerHTML = `<p style="color:var(--text-subtle);font-size:0.85rem;padding:10px 0;">No results for "<strong>${query}</strong>"</p>`;
        return;
    }

    results.forEach(item => {
        searchGrid.appendChild(createMovieCard(item, true));
    });
}

/* ============================================================
   SEE ALL CATEGORY MODAL
   ============================================================ */
const categoryOverlay    = $('category-overlay');
const categoryModalTitle = $('category-modal-title');
const categoryModalCount = $('category-modal-count');
const categoryModalGrid  = $('category-modal-grid');
const categoryCloseBtn   = $('category-close-btn');

const CATEGORY_MAP = {
    trending: { title: 'Trending Now', titles: TRENDING_TITLES, type: '' },
    movies:   { title: 'Popular Movies', titles: MOVIES_TITLES, type: 'movie' },
    tv:       { title: 'Top TV Shows', titles: TV_TITLES, type: 'series' },
    action:   { title: 'Action & Adventure', titles: ACTION_TITLES, type: 'movie' },
    scifi:    { title: 'Sci-Fi & Thriller', titles: SCIFI_TITLES, type: 'movie' },
    horror:   { title: 'Horror & Mystery', titles: HORROR_TITLES, type: 'movie' },
};

async function openCategoryModal(categoryKey) {
    const category = CATEGORY_MAP[categoryKey];
    if (!category) return;

    categoryModalTitle.textContent = category.title;
    categoryModalCount.textContent = `${category.titles.length} titles`;
    categoryModalGrid.innerHTML = '';
    categoryOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Render skeleton cards first
    categoryModalGrid.innerHTML = Array(category.titles.length).fill('').map(() => `
        <div class="card-skeleton">
            <div class="skeleton-poster"></div>
            <div class="skeleton-title"></div>
            <div class="skeleton-year"></div>
        </div>
    `).join('');

    const fetched = await Promise.all(category.titles.map(t => fetchByTitle(t, category.type)));
    const valid = fetched.filter(Boolean);

    categoryModalGrid.innerHTML = '';
    const extraCount = Math.max(0, valid.length - 10);
    categoryModalCount.textContent = `${valid.length} Titles (${extraCount} Extra Movies)`;

    valid.forEach((data, index) => {
        // First 10 titles are displayed on the home page; index >= 10 are extra movies!
        const isExtra = index >= 10;
        categoryModalGrid.appendChild(createMovieCard(data, false, isExtra));
    });
}

function closeCategoryModal() {
    categoryOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function setupSeeAllButtons() {
    document.querySelectorAll('.see-all-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const rowKey = btn.dataset.row;
            if (rowKey) openCategoryModal(rowKey);
        });
    });
    if (categoryCloseBtn) {
        categoryCloseBtn.addEventListener('click', closeCategoryModal);
    }
    if (categoryOverlay) {
        categoryOverlay.addEventListener('click', e => {
            if (e.target === categoryOverlay) closeCategoryModal();
        });
    }
}

/* ============================================================
   SCROLL ARROWS
   ============================================================ */
function setupScrollArrows() {
    document.querySelectorAll('.scroll-arrow').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = $(btn.dataset.target);
            if (!target) return;
            const direction = btn.classList.contains('scroll-left') ? -1 : 1;
            target.scrollBy({ left: direction * 500, behavior: 'smooth' });
        });
    });
}

/* ============================================================
   NAVBAR SCROLL BEHAVIOUR
   ============================================================ */
function setupNavbar() {
    const hero = $$('.hero');
    const heroH = hero ? hero.offsetHeight * 0.6 : 400;

    window.addEventListener('scroll', () => {
        if (window.scrollY > heroH) {
            navbar.classList.remove('transparent');
        } else {
            navbar.classList.add('transparent');
        }
    }, { passive: true });
    navbar.classList.add('transparent');
}

/* ============================================================
   NAV LINKS (FILTER BEHAVIOUR)
   ============================================================ */
function setupNavLinks() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            // Scroll to corresponding section
            const section = link.dataset.section;
            let targetEl = null;
            if (section === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
            if (section === 'tv')       targetEl = $('tv-row');
            if (section === 'movies')   targetEl = $('movies-row');
            if (section === 'upcoming') targetEl = $('action-row');
            if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

/* ============================================================
   KEYBOARD & ACCESSIBILITY
   ============================================================ */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (categoryOverlay && categoryOverlay.classList.contains('active')) closeCategoryModal();
        else if (isSearchOpen) closeSearch();
        else closeModal();
    }
    if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && !isSearchOpen) {
        e.preventDefault();
        openSearch();
    }
});

/* ============================================================
   EVENT LISTENERS
   ============================================================ */
// Search toggle
$('search-toggle-btn').addEventListener('click', openSearch);
$('search-close-btn').addEventListener('click', closeSearch);

// Search overlay click-outside
searchOverlay.addEventListener('click', e => {
    if (e.target === searchOverlay) closeSearch();
});

// Search input — instant suggestions + debounced API search
searchInput.addEventListener('input', e => {
    const val = e.target.value;
    searchClear.classList.toggle('visible', val.length > 0);
    // Instant local suggestions
    showSuggestions(val);
    // Clear stale results immediately so no "no results" flash
    searchGrid.innerHTML = '';
    // Only trigger API search if at least 3 characters typed
    clearTimeout(searchDebounceTimer);
    if (val.trim().length < 3) {
        if (!val.trim()) searchHint.style.display = 'flex';
        return;
    }
    searchHint.style.display = 'none';
    // Debounced OMDB API search — fires after 500ms of inactivity
    searchDebounceTimer = setTimeout(() => performSearch(val), 500);
});

searchInput.addEventListener('blur', () => {
    setTimeout(hideSuggestions, 200);
});

searchInput.addEventListener('focus', e => {
    if (e.target.value.trim()) showSuggestions(e.target.value);
});

// Keyboard navigation in suggestions
searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (suggestionsEl && suggestionsEl.classList.contains('visible')) {
            const active = suggestionsEl.querySelector('.suggestion-item.highlighted');
            if (active) {
                searchInput.value = active.dataset.title;
            }
        }
        const val = searchInput.value.trim();
        if (val) {
            hideSuggestions();
            performSearch(val);
        }
        return;
    }
    if (!suggestionsEl || !suggestionsEl.classList.contains('visible')) return;
    const items = suggestionsEl.querySelectorAll('.suggestion-item');
    const active = suggestionsEl.querySelector('.suggestion-item.highlighted');
    let idx = active ? parseInt(active.dataset.index) : -1;
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        idx = Math.min(idx + 1, items.length - 1);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        idx = Math.max(idx - 1, 0);
    } else { return; }
    items.forEach(i => i.classList.remove('highlighted'));
    if (items[idx]) {
        items[idx].classList.add('highlighted');
        searchInput.value = items[idx].dataset.title;
    }
});

searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.classList.remove('visible');
    searchGrid.innerHTML = '';
    searchHint.style.display = 'flex';
    searchInput.focus();
});

// Modal close
$('modal-close').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
});

// Logo → scroll to top
$('logo-home-btn').addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   INIT
   ============================================================ */
async function init() {
    setupNavbar();
    setupNavLinks();
    setupScrollArrows();
    setupSeeAllButtons();
    buildSuggestionsEl();

    // Load 10 movies for each home page row (30 total movies in 'See All' section)
    await Promise.all([
        loadHeroTitles(),
        loadRow(TRENDING_TITLES.slice(0, 10), 'trending-cards'),
        loadRow(MOVIES_TITLES.slice(0, 10),   'movies-cards', 'movie'),
        loadRow(TV_TITLES.slice(0, 10),       'tv-cards',     'series'),
        loadRow(ACTION_TITLES.slice(0, 10),   'action-cards', 'movie'),
        loadRow(SCIFI_TITLES.slice(0, 10),    'scifi-cards',  'movie'),
        loadRow(HORROR_TITLES.slice(0, 10),   'horror-cards', 'movie'),
    ]);
}

runLoader(() => init());
