/* ===================== PASSWORD ADMIN ===================== */
const ADMIN_PASSWORD = "onedev_josh_developer";

/* ===================== DISCORD WEBHOOK URL ===================== */
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1436166844473147585/vddX8wG_FILKvKioU6Ure5MJp6jyQBkVP1mhiTPJsatbxQDhKuHzr5AQRsZJmjX4QVNZ";

/* ===================== LOGIN ADMIN ===================== */
document.getElementById("loginBtn").onclick = () => {
  const pass = document.getElementById("adminPass").value;

  if (pass === ADMIN_PASSWORD) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
  } else {
    document.getElementById("loginStatus").textContent = "Password salah!";
  }
};

/* ===================== LOAD ANNOUNCEMENTS ===================== */
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

/* ===================== PUBLISH ANNOUNCEMENT ===================== */
document.getElementById("publishBtn").onclick = async () => {
  const title = document.getElementById("judul").value;
  const text = document.getElementById("isi").value;

  if (!title || !text) {
    alert("Harap isi semua kolom!");
    return;
  }

  // Simpan di localStorage
  const saved = JSON.parse(localStorage.getItem("announcements") || "[]");
  saved.push({ title, text });
  localStorage.setItem("announcements", JSON.stringify(saved));

  /* ========== KIRIM KE API VERCEL UNTUK FORWARD KE DISCORD WEBHOOK ========== */
  try {
    await fetch("/api/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        text,
        webhook: DISCORD_WEBHOOK
      })
    });
  } catch (err) {
    console.error("Gagal kirim webhook:", err);
  }

  alert("Announcement berhasil dipublish!");
  loadAnnouncements();
};