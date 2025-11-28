// exchange.js

// Simulasi database user yang tersambung dengan admin-exchange.html
let users = [
{ username: "User1", coin: 1000 },
{ username: "User2", coin: 500 },
{ username: "User3", coin: 750 }
];

const coinSpan = document.getElementById('coin');
const loginForm = document.getElementById('login-form');
let currentUser = null;

function updateBalance() {
if(currentUser){
const userData = users.find(u => u.username === currentUser);
coinSpan.textContent = userData ? userData.coin : 0;
} else {
coinSpan.textContent = 0;
}
}

// Login handler
loginForm.addEventListener('submit', e => {
e.preventDefault();
const username = e.target.username.value;
const password = e.target.password.value;
const user = users.find(u => u.username === username);
if(user){
currentUser = username;
alert('Login successful!');
updateBalance();
} else {
alert('User not found!');
}
});

// Store Exchange buttons
document.querySelectorAll('.store-btn').forEach(btn => {
btn.addEventListener('click', () => {
if(!currentUser){ alert('Please login first!'); return; }
const cost = parseInt(btn.dataset.cost);
const item = btn.dataset.item;
const userData = users.find(u => u.username === currentUser);
if(userData.coin >= cost){
userData.coin -= cost;
updateBalance();
alert("Successfully exchanged ${item}!");
sendWebhook(currentUser, item, cost);
} else {
alert('Not enough coins!');
}
});
});

// Exchange Form submit
document.getElementById('exchange-form').addEventListener('submit', e => {
e.preventDefault();
if(!currentUser){ alert('Please login first!'); return; }
const form = e.target;
const item = form.item.value;
const amount = parseInt(form.amount.value);
const userData = users.find(u => u.username === currentUser);
if(userData.coin >= amount){
userData.coin -= amount;
updateBalance();
alert("Exchange request submitted: ${item} - ${amount} coins");
sendWebhook(currentUser, item, amount);
form.reset();
} else {
alert('Not enough coins!');
}
});

// Discord Webhook
function sendWebhook(user, item, amount){
fetch('https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ content: "User **${user}** exchanged **${item}** for **${amount} OD Coins**!" })
}).catch(err => console.error('Webhook error:', err));
}

// Simulasi data admin-topup dinamis (misal load dari sessionStorage/localStorage)
if(localStorage.getItem('userBalances')){
users = JSON.parse(localStorage.getItem('userBalances'));
}
function saveUsers(){ localStorage.setItem('userBalances', JSON.stringify(users)); }