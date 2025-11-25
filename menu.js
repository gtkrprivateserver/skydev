document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const sidebar = document.querySelector(".sidebar");
  const sidebarContent = document.querySelector(".sidebar-content");
  const overlay = document.querySelector(".sidebar-overlay");
  const playBtn = document.getElementById("playBtn");
  const videoModal = document.getElementById("videoModal");
  const videoClose = document.getElementById("videoClose");
  const videoFrame = document.getElementById("videoFrame");

  // Menu items + dropdown
  const menuItems = [
      const menuItems = [
    { name: "Home", link: "/index.html" },
    { name: "Video", link: "/video/play.html" },
    { name: "About", link: "/about.html" },
    { name: "Contact Us", link: "/contact.html" }
  ];

  // Generate desktop menu
  menu.innerHTML = menuItems.map(item => `<a href="${item.link}" class="menu-item">${item.name}</a>`).join("");

  // Generate sidebar menu
  sidebarContent.innerHTML = menuItems.map(item => {
    if(item.dropdown){
      return `
        <div class="dropdown">
          <button class="dropdown-btn">${item.name} <span class="arrow">&#9654;</span></button>
          <div class="dropdown-content">
            ${item.dropdown.map(sub => `<a href="${sub.link}">${sub.name}</a>`).join('')}
          </div>
        </div>
      `;
    } else {
      return `<a href="${item.link}">${item.name}</a>`;
    }
  }).join("");

  // Add social media
  sidebarContent.innerHTML += `
    <div class="social-media">
      <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
      <a href="https://twitter.com" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
      <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
      <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
    </div>
  `;

  // Toggle sidebar
  const toggleSidebar = () => {
    burger.classList.toggle("active");
    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
  };
  burger.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", toggleSidebar);

  // Close sidebar on link click
  sidebarContent.querySelectorAll("a").forEach(link => link.addEventListener("click", toggleSidebar));

  // Dropdown toggle
  sidebarContent.querySelectorAll(".dropdown-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const parent = btn.parentElement;
      parent.classList.toggle("open");
    });
  });

  // Video modal
  playBtn.addEventListener("click", () => {
    videoFrame.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
    videoModal.style.display = "flex";
  });
  videoClose.addEventListener("click", () => {
    videoFrame.src = "";
    videoModal.style.display = "none";
  });
  videoModal.addEventListener("click", e => {
    if(e.target === videoModal){
      videoFrame.src = "";
      videoModal.style.display = "none";
    }
  });

  // Contact form webhook Discord
  const contactForm = document.getElementById("contactForm");
  const webhookURL = "https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN"; // ganti

  if(contactForm){
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      const payload = { content: null, embeds: [{
        title: "New Contact Form Submission",
        color: 5814783,
        fields: [
          { name:"Name", value:name },
          { name:"Email", value:email },
          { name:"Message", value:message }
        ],
        timestamp: new Date().toISOString()
      }]};

      try{
        await fetch(webhookURL, {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(payload)
        });
        alert("Thank you! Your message has been sent.");
        contactForm.reset();
      } catch(err){
        alert("Oops! Something went wrong.");
        console.error(err);
      }
    });
  }
});