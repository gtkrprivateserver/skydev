/* ===================== ADMIN PASSWORD HASH ===================== */
const ADMIN_HASH = "6c0c1db4443b8a798edc2cc74e07bcb35c50a6481d948e57843b4374c1c1ff6a"; // "admin123"

/* ================= SHA-256 FUNCTION ================= */
async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}

/* ================= DISCORD WEBHOOK ================= */
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1436166844473147585/vddX8wG_FILKvKioU6Ure5MJp6jyQBkVP1mhiTPJsatbxQDhKuHzr5AQRsZJmjX4QVNZ";

/* ================= LOGIN ================= */
document.getElementById("loginBtn").onclick = async () => {
  const pass = document.getElementById("adminPass").value;
  const hash = await sha256(pass);

  if (hash === ADMIN_HASH) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
  } else {
    document.getElementById("loginStatus").textContent = "Password salah!";
  }
};

/* ================= LOAD ANNOUNCEMENTS ================= */
function loadAnnouncements() {
  const list = document.getElementById("announceList");
  list.innerHTML = "";

  const saved = JSON.parse(localStorage.getItem("announcements") || "[]");

  saved.reverse().forEach(a => {
    const div = document.createElement("div");
    div.className = "announce-item";
    div.innerHTML = `<h3>${a.title}</h3><p>${a.text}</p>`;
    list.appendChild(div);
  });
}
loadAnnouncements();

/* ================= PUBLISH ================= */
document.getElementById("publishBtn").onclick = async () => {
  const title = document.getElementById("judul").value;
  const text = document.getElementById("isi").value;

  if (!title || !text) return alert("Isi semua kolom!");

  // Simpan ke localStorage
  const saved = JSON.parse(localStorage.getItem("announcements") || "[]");
  saved.push({ title, text });
  localStorage.setItem("announcements", JSON.stringify(saved));

  // Kirim ke Webhook
  fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `📢 **${title}**\n${text}` })
  });

  alert("Announcement berhasil di-publish!");
  loadAnnouncements();
};