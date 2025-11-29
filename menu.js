document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // Safe DOM Getter
  // ==============================
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const burger = $("#burger");
  const menu = $("#menu");
  const sidebar = $(".sidebar");
  const sidebarContent = $(".sidebar-content");
  const overlay = $(".sidebar-overlay");

  // ==============================
  // Menu Items (Safe)
  // ==============================
  const menuItems = [
    { name: "Home", link: "/index.html" },
    { name: "About", link: "/about.html" },
    { name: "Profile", link: "/profile.html" },
    { name: "Store", link: "/store/home.html" },
    { name: "Esport", link: "/esport/esport.html" },
    { name: "GTKRPS", link: "/gtkrps/gtkrps.html" },
    { name: "Role Exclusive", link: "/exclusive/role.html" },
    { name: "Content Creator", link: "/content/creator.html" },
    { name: "Video", link: "/video/play.html" },
    { name: "Feedback", link: "/feedback/info.html" },
    { name: "Status Server Discord", link: "/status/discord.html" },
    { name: "Gacha Game", link: "/game/game.html" },
    { name: "Contact Us", link: "https://onedevofficial.vercel.app/contact.html" }
  ];

  // Encode HTML untuk keamanan dasar (anti-XSS)
  const escapeHTML = (str) => str.replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[c]);

  // ==============================
  // Generate Desktop Menu
  // ==============================
  if (menu) {
    menu.innerHTML = menuItems
      .map(item =>
        `<a href="${escapeHTML(item.link)}" class="menu-item">${escapeHTML(item.name)}</a>`
      ).join("");
  }

  // ==============================
  // Generate Sidebar Menu
  // ==============================
  if (sidebarContent) {
    sidebarContent.innerHTML = menuItems
      .map(item =>
        `<a href="${escapeHTML(item.link)}">${escapeHTML(item.name)}</a>`
      ).join("");
  }

  // ==============================
  // Toggle Sidebar
  // ==============================
  if (burger && sidebar && overlay) {

    const toggleSidebar = () => {
      burger.classList.toggle("active");
      sidebar.classList.toggle("open");
      overlay.classList.toggle("active");
    };

    burger.addEventListener("click", toggleSidebar);
    overlay.addEventListener("click", toggleSidebar);

    if (sidebarContent) {
      $$ (".sidebar-content a").forEach(link => {
        link.addEventListener("click", toggleSidebar);
      });
    }
  }

  // ==============================
  // Video Modal (Safe)
  // ==============================
  const playBtn = $("#playBtn");
  const videoModal = $("#videoModal");
  const videoClose = $("#videoClose");
  const videoFrame = $("#videoFrame");

  if (playBtn && videoModal && videoClose && videoFrame) {

    const VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1";

    playBtn.addEventListener("click", () => {
      videoFrame.src = VIDEO_URL;
      videoModal.style.display = "flex";
    });

    const closeVideo = () => {
      videoFrame.src = "";
      videoModal.style.display = "none";
    };

    videoClose.addEventListener("click", closeVideo);

    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) closeVideo();
    });
  }

});