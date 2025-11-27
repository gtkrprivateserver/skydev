let isLoggedIn = false;

function handleCredentialResponse(response) {
console.log("Google credential:", response.credential);
// Asumsikan login berhasil
isLoggedIn = true;
afterLogin();
}

function afterLogin() {
document.getElementById('login-container').style.display = 'none';
document.getElementById('gacha-section').style.display = 'block';
}

const gachaItems = [
{ name: "Legendary Sword", rarity: "⭐️⭐️⭐️⭐️⭐️" },
{ name: "Epic Shield", rarity: "⭐️⭐️⭐️⭐️" },
{ name: "Rare Potion", rarity: "⭐️⭐️⭐️" },
{ name: "Common Coin", rarity: "⭐️⭐" },
{ name: "Basic Herb", rarity: "⭐️" }
];

document.addEventListener('DOMContentLoaded', () => {
const btn = document.getElementById('gachaBtn');
btn.addEventListener('click', () => {
if(!isLoggedIn) {
alert("Silakan login dengan Google terlebih dahulu!");
return;
}
const idx = Math.floor(Math.random() * gachaItems.length);
const item = gachaItems[idx];
document.getElementById('gachaResult').textContent =
"Kamu mendapatkan: ${item.name} (${item.rarity})!";
});
});