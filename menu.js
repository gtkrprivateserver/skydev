document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const sidebar = document.querySelector(".sidebar");
  const sidebarContent = document.querySelector(".sidebar-content");
  const overlay = document.querySelector(".sidebar-overlay");

  // ==============================
  // Menu Items
  // ==============================
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

  // Generate sidebar menu
  sidebarContent.innerHTML = menuItems.map(item => `<a href="${item.link}">${item.name}</a>`).join("");

  // ==============================
  // Toggle Sidebar
  // ==============================
  const toggleSidebar = () => {
    burger.classList.toggle("active");
    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
  };

  burger.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", toggleSidebar);
  sidebarContent.querySelectorAll("a").forEach(link => link.addEventListener("click", toggleSidebar));

  // ==============================
  // Video Modal
  // ==============================
  const playBtn = document.getElementById("playBtn");
  const videoModal = document.getElementById("videoModal");
  const videoClose = document.getElementById("videoClose");
  const videoFrame = document.getElementById("videoFrame");

  playBtn.addEventListener("click", () => {
    videoFrame.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"; // ganti dengan link YouTube-mu
    videoModal.style.display = "flex";
  });

  videoClose.addEventListener("click", () => {
    videoFrame.src = ""; // stop video
    videoModal.style.display = "none";
  });

  // Tutup modal kalau klik di luar video
  videoModal.addEventListener("click", (e) => {
    if(e.target === videoModal){
      videoFrame.src = "";
      videoModal.style.display = "none";
    }
  });
});