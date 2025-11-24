// ==========================
// Smooth Scroll Effect
// ==========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth",
      });
    }
  });
});

// ==========================
// Button "Watch Video"
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.getElementById("playBtn");

  playBtn.addEventListener("click", () => {
    alert("Video player bisa ditambahkan di sini 🔥");
  });
});

// ==========================
// Scroll Navbar Shadow
// ==========================
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");

  if (window.scrollY > 20) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// ==========================
// Hover Animasi Logo
// ==========================
const logo = document.querySelector(".logo");

if (logo) {
  logo.addEventListener("mouseenter", () => {
    logo.style.transform = "rotate(8deg) scale(1.1)";
  });

  logo.addEventListener("mouseleave", () => {
    logo.style.transform = "rotate(0deg) scale(1)";
  });
}