const toggleBtnDesk = document.getElementById("toggleBtnDesk");
const toggleBtnHamburger = document.getElementById("toggleBtnHamburger");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

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
  const iconPath = isDark ? "assets/light.png" : "assets/dark.png";

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
  const footer = document.getElementById("footer");
  if (footer) {
    footer.innerHTML = `Copyright &#169; ${new Date().getFullYear()} Pascal Heilmann. All Rights Reserved.`;
  }
}

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu?.classList.toggle("open");
  icon?.classList.toggle("open");
}

// Initial setup
initTheme();
setCurrentYearFooter();

// Event Listeners
toggleBtnDesk?.addEventListener("click", toggleTheme);
toggleBtnHamburger?.addEventListener("click", toggleTheme);
