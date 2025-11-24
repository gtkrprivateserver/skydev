// ==========================
// MENU OTOMATIS + BURGER FIX
// ==========================

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const burger = document.getElementById("burger");

  // List menu otomatis
  const menuItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Portfolio", link: "#portfolio" },
    { name: "Services", link: "#services" },
    { name: "Contact", link: "#contact" }
  ];

  // Generate menu
  menu.innerHTML = menuItems
    .map(item => `<a href="${item.link}" class="menu-item">${item.name}</a>`)
    .join("");

  // Burger toggle
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("open");
  });
});