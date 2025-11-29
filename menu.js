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
    { name: "Contact Us", link: "https://onedevofficial.vercel.app/contact.html"}
  ];

  if (menu) {
    menu.innerHTML = menuItems
      .map(item => `<a href="${item.link}" class="menu-item">${item.name}</a>`)
      .join("");
  }

  if (sidebarContent) {
    sidebarContent.innerHTML = menuItems
      .map(item => `<a href="${item.link}">${item.name}</a>`)
      .join("");
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
      sidebarContent.querySelectorAll("a")
        .forEach(link => link.addEventListener("click", toggleSidebar));
    }
  }

  // ==============================
  // Video Modal (Safe Mode)
  // ==============================
  const playBtn = document.getElementById("playBtn");
  const videoModal = document.getElementById("videoModal");
  const videoClose = document.getElementById("videoClose");
  const videoFrame = document.getElementById("videoFrame");

  if (playBtn && videoModal && videoClose && videoFrame) {
    playBtn.addEventListener("click", () => {
      videoFrame.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
      videoModal.style.display = "flex";
    });

    videoClose.addEventListener("click", () => {
      videoFrame.src = "";
      videoModal.style.display = "none";
    });

    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        videoFrame.src = "";
        videoModal.style.display = "none";
      }
    });
  }
});