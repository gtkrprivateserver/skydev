// ===== Navbar & Sidebar Otomatis =====
document.addEventListener("DOMContentLoaded", () => {
  // Tambahkan halaman di sini untuk muncul otomatis di sidebar
  const pages = [
    { name: "Home", link: "/index.html" },
    { name: "Bot List", link: "/bot/bots.html" },
    { name: "Harga", link: "/price/pricing.html" },
    { name: "Kontak", link: "/contact/contact.html" }
  ];

  // Buat navbar secara otomatis
  const header = document.createElement("header");
  header.className = "navbar";

  header.innerHTML = `
    <div class="logo">🤖 OneDev Bot Rent</div>
    <button class="menu-btn" id="menu-btn">☰</button>
    <nav class="nav-links" id="nav-links">
      ${pages.map(p => `<a href="${p.link}">${p.name}</a>`).join("")}
    </nav>
  `;
  document.body.prepend(header);

  // Sidebar toggle
  const menuBtn = header.querySelector("#menu-btn");
  const navLinks = header.querySelector("#nav-links");
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});