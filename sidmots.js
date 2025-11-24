// ===== AUTO SIDEBAR =====
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");

  sidebar.innerHTML = `
    <h2>MENU</h2>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Tentang Kami</a></li>
      <li><a href="#">Divisi</a></li>
      <li><a href="#">Kontak</a></li>
      <li class="dropdown">
        <a href="#">Lainnya ▼</a>
        <ul class="dropdown-menu">
          <li><a href="#">Galeri</a></li>
          <li><a href="#">Team</a></li>
          <li><a href="#">Project</a></li>
        </ul>
      </li>
    </ul>
  `;

  // ===== DROPDOWN =====
  const dropdown = document.querySelector(".dropdown");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  dropdown.addEventListener("click", () => {
    dropdownMenu.classList.toggle("active");
  });

  // ===== LOADING SCREEN =====
  setTimeout(() => {
    document.getElementById("loading-screen").style.opacity = 0;
    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none";
    }, 500);
  }, 1000);
});