let username = "";
let coins = 100;

// Callback login Google
function handleCredentialResponse(response) {
  const payload = JSON.parse(atob(response.credential.split('.')[1]));
  username = payload.name;

  document.getElementById("loginDiv").style.display = "none";
  document.getElementById("gachaDiv").style.display = "block";
  document.getElementById("welcome").textContent = `Selamat datang, ${username}`;
  updateCoins();
}

// Data item gacha
const items = [
  { name: "Diamond Lock", value: 50 },
  { name: "Rainbow Aura", value: 100 },
  { name: "Jetpack", value: 30 },
  { name: "Shiny Crown", value: 70 },
  { name: "Rare Seed", value: 20 },
  { name: "Epic Block", value: 150 },
  { name: "Bom!", value: -50 } // Bom mengurangi coin
];

// Tombol gacha
document.getElementById("spinBtn").addEventListener("click", () => {
  if (coins < 10) {
    alert("Coins tidak cukup! Silakan Top Up.");
    return;
  }

  coins -= 10; // Biaya spin
  const item = items[Math.floor(Math.random() * items.length)];
  coins += item.value;
  updateCoins();

  if (item.name === "Bom!") {
    displayBombEffect();
    document.getElementById("result").textContent = `${username} kena Bom! Coins berkurang 50!`;
  } else if (item.value >= 100) {
    displayCoinEffect();
    document.getElementById("result").textContent = `🎉 ${username} mendapatkan ITEM BESAR: ${item.name} (+${item.value} coins) 🎉`;
  } else {
    document.getElementById("result").textContent = `${username} mendapatkan: ${item.name} (+${item.value} coins)`;
  }
});

// Tombol Top Up
document.getElementById("topUpBtn").addEventListener("click", () => {
  const amount = parseInt(prompt("Masukkan jumlah coin yang ingin di-top up:", "100"));
  if (!isNaN(amount) && amount > 0) {
    coins += amount;
    updateCoins();
    alert(`Top Up berhasil! Coin sekarang: ${coins}`);
  }
});

// Update tampilan coin
function updateCoins() {
  document.getElementById("coinDisplay").textContent = coins;
}

// Efek coin jatuh
function displayCoinEffect() {
  const coinDiv = document.getElementById("coinEffect");
  for (let i = 0; i < 20; i++) {
    const coin = document.createElement("div");
    coin.className = "coin";
    coin.style.left = Math.random() * 90 + "vw";
    coin.style.animationDuration = 1 + Math.random() * 1 + "s";
    coinDiv.appendChild(coin);
    setTimeout(() => coin.remove(), 2000);
  }
}

// Efek bom
function displayBombEffect() {
  const coinDiv = document.getElementById("coinEffect");
  const bomb = document.createElement("div");
  bomb.className = "bomb";
  bomb.style.left = "50%";
  coinDiv.appendChild(bomb);
  setTimeout(() => bomb.remove(), 1000);
}