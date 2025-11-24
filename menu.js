// =====================
// Auto Generate Menu
// =====================

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");

  const menuItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Portfolio", link: "#portfolio" },
    { name: "Services", link: "#services" },
    { name: "Contact", link: "#contact" }
  ];

  menu.innerHTML = menuItems
    .map(
      (item) => `
      <a href="${item.link}" class="menu-item">${item.name}</a>
    `
    )
    .join("");
});

// =====================
// Burger Menu Mobile
// =====================

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  menu.classList.toggle("open");
});