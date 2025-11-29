document.addEventListener("DOMContentLoaded", () => {

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const burger = $("#burger");
  const menu = $("#menu");
  const sidebar = $(".sidebar");
  const sidebarContent = $(".sidebar-content");
  const overlay = $(".sidebar-overlay");

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

  const escapeHTML = (str) => str.replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[c]);

  // Desktop menu
  if (menu) {
    menu.innerHTML = menuItems
      .map(item => `<a href="${escapeHTML(item.link)}" class="menu-item">${escapeHTML(item.name)}</a>`) 
      .join("");
  }

  // Sidebar menu
  if (sidebarContent) {
    sidebarContent.innerHTML = menuItems
      .map(item => `<a href="${escapeHTML(item.link)}">${escapeHTML(item.name)}</a>`)
      .join("");
  }

  // Sidebar toggle
  if (burger && sidebar && overlay) {

    const toggleSidebar = () => {
      burger.classList.toggle("active");
      sidebar.classList.toggle("open");
      overlay.classList.toggle("active");
    };

    burger.addEventListener("click", toggleSidebar);
    overlay.addEventListener("click", toggleSidebar);

    $$(".sidebar-content a").forEach(link => {
      link.addEventListener("click", toggleSidebar);
    });
  }

  // ==============================
  // Video Player FIX (Anti Error)
  // ==============================

  const playBtn = $("#playBtn");
  const videoModal = $("#videoModal");
  const videoClose = $("#videoClose");
  const videoFrame = $("#videoFrame");

  const elementsExist = playBtn && videoModal && videoClose && videoFrame;

  if (!elementsExist) {
    console.warn("Video modal tidak lengkap. Pastikan HTML memiliki: #playBtn, #videoModal, #videoClose, #videoFrame");
    return; // stop supaya tidak error
  }

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

});