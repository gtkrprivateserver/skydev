document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const sidebar = document.querySelector(".sidebar");
  const sidebarContent = document.querySelector(".sidebar-content");
  const overlay = document.querySelector(".sidebar-overlay");

  // Menu items
  const menuItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Services", link: "#services" },
    { name: "Projects", link: "#projects" },
    { name: "Blog", link: "#blog" },
    { name: "Contact", link: "#contact" }
  ];

  // Generate desktop menu
  menu.innerHTML = menuItems.map(item => `<a href="${item.link}" class="menu-item">${item.name}</a>`).join("");

  // Generate sidebar
  sidebarContent.innerHTML = menuItems.map(item => `<a href="${item.link}">${item.name}</a>`).join("");

  // Toggle sidebar
  const toggleSidebar = () => {
    burger.classList.toggle("active");
    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
  };

  burger.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", toggleSidebar);

  // Tutup sidebar saat klik link
  sidebarContent.querySelectorAll("a").forEach(link => link.addEventListener("click", toggleSidebar));
});