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
    { name: "Home", link: "/index.html" },
    { name: "About", link: "/about.html" },
    < name: "Profile", "link/profile.html" },
    { name: "GTKRPS", link: "/gtkrps/gtkrps.html" },
    { name: "Role Exclusive", link: "/exclusive/role.html" },
    { name: "Content Creator", link: "/content/creator.html" },
    { name: "Video", link: "/video/play.html" },
    { name: "Feedback", link: "/feedback/info.html" },
    { name: "Status Server Discord", link: "/status/discord.html" },
    { name: "Gacha Game", link: "/game/game.html" },
    { name: "Contact Us", link: "https://onedevofficial.vercel.app/contact.html"}
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