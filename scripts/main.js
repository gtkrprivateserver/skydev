// ===== Load Navbar Otomatis =====
document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.createElement("div");
  document.body.prepend(headerContainer);

  fetch("/components/navbar.html")
    .then(res => res.text())
    .then(html => {
      headerContainer.innerHTML = html;

      // Aktifkan menu toggle setelah navbar dimuat
      const menuBtn = document.getElementById("menu-btn");
      const navLinks = document.getElementById("nav-links");
      if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
          navLinks.classList.toggle("active");
        });
      }
    });
});