/* ===================== ADMIN PASSWORD (HASH SHA-256) ===================== */
const ADMIN_HASH = "a84ca1a8b07e6b92fad38acb8b671bb09c94943a26bb17ac2af22d654f4e5a57";

/* SHA-256 */
async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2, "0")).join("");
}

/* ===================== LOGIN ===================== */
document.getElementById("loginBtn").onclick = async () => {
  const input = document.getElementById("adminInput").value;
  const status = document.getElementById("adminStatus");

  const hash = await sha256(input);

  if (hash === ADMIN_HASH) {
    status.textContent = "Akses diberikan ✔";
    status.style.color = "lime";

    document.getElementById("lockBox").style.display = "none";
    document.getElementById("announcementForm").style.display = "block";
  } else {
    status.textContent = "Password salah!";
    status.style.color = "red";
  }
};

/* ===================== DISCORD WEBHOOK (AMAN) ===================== */
const encodedWebhook = btoa("https://discord.com/api/webhooks/1436166844473147585/vddX8wG_FILKvKioU6Ure5MJp6jyQBkVP1mhiTPJsatbxQDhKuHzr5AQRsZJmjX4QVNZ"); // GANTI INI
const WEBHOOK_URL = atob(encodedWebhook);

/* ===================== KIRIM ANNOUNCEMENT ===================== */
document.getElementById("sendBtn").onclick = async () => {
  const title = document.getElementById("titleInput").value.trim();
  const message = document.getElementById("messageInput").value.trim();
  const media = document.getElementById("mediaInput").files[0];
  const status = document.getElementById("status");

  if (!title || !message) {
    status.textContent = "Judul dan pesan wajib diisi.";
    status.style.color = "red";
    return;
  }

  const formData = new FormData();
  const payload = {
    username: "OneDev Announcement Bot",
    embeds: [
      {
        title,
        description: message,
        color: 0x4a6fff,
        timestamp: new Date().toISOString()
      }
    ]
  };

  formData.append("payload_json", JSON.stringify(payload));
  if (media) formData.append("file", media);

  try {
    const res = await fetch(WEBHOOK_URL, { method: "POST", body: formData });

    if (res.ok) {
      status.textContent = "Announcement berhasil dikirim!";
      status.style.color = "lime";
      addAnnouncementLocal(title, message);
    } else {
      status.textContent = "Gagal mengirim announcement!";
      status.style.color = "red";
    }
  } catch {
    status.textContent = "Tidak dapat terhubung ke server!";
    status.style.color = "red";
  }
};

/* ===================== RIWAYAT LOCAL ===================== */
function addAnnouncementLocal(title, message) {
  const box = document.getElementById("announcementList");

  if (box.children[0]?.tagName === "P") box.innerHTML = "";

  const item = document.createElement("div");
  item.className = "history-item";
  item.innerHTML = `
    <h3>${title}</h3>
    <p>${message}</p>
    <span class="date">${new Date().toLocaleString()}</span>
  `;

  box.prepend(item);
}