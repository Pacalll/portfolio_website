function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
function set_current_year_footer(){
  document.getElementById("footer").innerHTML = `Copyright &#169; ${new Date().getFullYear()} Pascal Heilmann. All Rights Reserved.`;
}
set_current_year_footer();