/* ========== CONFIG WEBHOOK AMAN ========== */
const encodedWebhook = btoa("https://discord.com/api/webhooks/1436166844473147585/vddX8wG_FILKvKioU6Ure5MJp6jyQBkVP1mhiTPJsatbxQDhKuHzr5AQRsZJmjX4QVNZ"); 
const WEBHOOK_URL = atob(encodedWebhook);

/* ========== SEND ANNOUNCEMENT TO DISCORD ========== */
document.getElementById("sendBtn").onclick = async () => {
  const title = document.getElementById("titleInput").value.trim();
  const message = document.getElementById("messageInput").value.trim();
  const status = document.getElementById("status");

  if (!title || !message) {
    status.textContent = "Harap isi judul dan pesan.";
    status.style.color = "red";
    return;
  }

  const payload = {
    username: "OneDev Announcement Bot",
    embeds: [
      {
        title: title,
        description: message,
        color: 0x00AEEF,
        timestamp: new Date().toISOString(),
      }
    ]
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      status.textContent = "Pengumuman berhasil dikirim!";
      status.style.color = "lime";
      addAnnouncementLocal(title, message);
    } else {
      status.textContent = "Gagal mengirim ke Discord!";
      status.style.color = "red";
    }
  } catch (err) {
    status.textContent = "Error: tidak dapat terhubung!";
    status.style.color = "red";
  }
};

/* ========== LOCAL ANNOUNCEMENT RENDER ========== */
function addAnnouncementLocal(title, message) {
  const box = document.getElementById("announcementList");
  const item = document.createElement("div");

  item.className = "announcement-item";
  item.innerHTML = `
    <h3>${title}</h3>
    <p>${message}</p>
    <span class="date">${new Date().toLocaleString()}</span>
  `;

  box.prepend(item);
}