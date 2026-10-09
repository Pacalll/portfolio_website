const toggleBtnDesk = document.getElementById("toggleBtnDesk");
const toggleBtnHamburger = document.getElementById("toggleBtnHamburger");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const langSelectDesk = document.getElementById("langSelectDesk");
const langSelectHamburger = document.getElementById("langSelectHamburger");
const footer_year = document.getElementById("footer_year");

function isLocalStorageAvailable() {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

const hasStorage = isLocalStorageAvailable();

function getSavedTheme() {
  if (hasStorage) {
    return localStorage.getItem("theme");
  }
  return null;
}

function setSavedTheme(theme) {
  if (hasStorage) {
    localStorage.setItem("theme", theme);
  }
}

function applyTheme(theme) {
  document.body.classList.toggle("dark-mode", theme === "dark");
  updateIcon();
}

function updateIcon() {
  const isDark = document.body.classList.contains("dark-mode");
  const iconPath = isDark ? "/assets/light.png" : "/assets/dark.png";

  const iconDesk = document.getElementById("darkmodeIconDesk");
  const iconHamburger = document.getElementById("darkmodeIconHamburger");

  if (iconDesk) iconDesk.src = iconPath;
  if (iconHamburger) iconHamburger.src = iconPath;
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-mode");
  const newTheme = isDark ? "dark" : "light";
  setSavedTheme(newTheme);
  updateIcon();
}

function initTheme() {
  const savedTheme = getSavedTheme();
  const theme = savedTheme || (prefersDark ? "dark" : "light");
  applyTheme(theme);
}

function setCurrentYearFooter() {
  if (footer_year) {
    footer_year.textContent = new Date().getFullYear();
  }
}

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu?.classList.toggle("open");
  icon?.classList.toggle("open");
}

function redirectToSavedLanguage() {
  const isHome = location.pathname === '/' || location.pathname === '/index.html';
  if (!isHome) return;

  const target = localStorage.getItem('lang') || navigator.language.slice(0, 2);
  if (target === 'de' || target === 'es') {
    location.replace(`/${target}/index.html`);
  }
}

function changeLanguage(event) {
  const url = event.target.value;
  const lang = url === '/' ? 'en' : url.split('/')[1];
  localStorage.setItem('lang', lang);
  location.href = url;
}

// Initial setup
initTheme();
redirectToSavedLanguage();
setCurrentYearFooter();

// Event Listeners
toggleBtnDesk?.addEventListener("click", toggleTheme);
toggleBtnHamburger?.addEventListener("click", toggleTheme);
langSelectDesk?.addEventListener("change", changeLanguage);
langSelectHamburger?.addEventListener("change", changeLanguage);