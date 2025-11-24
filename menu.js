document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const sidebar = document.querySelector(".sidebar");
  const sidebarContent = document.querySelector(".sidebar-content");

  // Buat overlay untuk menutup sidebar saat klik di luar
  let overlay = document.createElement("div");
  overlay.classList.add("sidebar-overlay");
  document.body.appendChild(overlay);

  // List menu otomatis
  const menuItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Portfolio", link: "#portfolio" },
    { name: "Services", link: "#services" },
    { name: "Contact", link: "#contact" }
  ];

  // Generate menu desktop
  const menu = document.getElementById("menu");
  menu.innerHTML = menuItems
    .map(item => `<a href="${item.link}" class="menu-item">${item.name}</a>`)
    .join("");

  // Generate menu sidebar
  sidebarContent.innerHTML = menuItems
    .map(item => `<a href="${item.link}">${item.name}</a>`)
    .join("");

  // Fungsi toggle sidebar
  const toggleSidebar = () => {
    burger.classList.toggle("active");
    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
  };

  // Event klik burger
  burger.addEventListener("click", toggleSidebar);

  // Event klik overlay
  overlay.addEventListener("click", toggleSidebar);

  // Tutup sidebar saat klik menu item (opsional)
  sidebarContent.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      sidebar.classList.remove("open");
      overlay.classList.remove("active");
    });
  });
});