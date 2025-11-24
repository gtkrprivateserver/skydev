// Simple mobile menu + fake "play" interaction
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  burger.addEventListener('click', () => {
    if(menu.style.display === 'flex') {
      menu.style.display = '';
    } else {
      menu.style.display = 'flex';
      menu.style.flexDirection = 'column';
      menu.style.position = 'absolute';
      menu.style.right = '20px';
      menu.style.top = '66px';
      menu.style.background = 'rgba(0,0,0,0.35)';
      menu.style.padding = '12px';
      menu.style.borderRadius = '10px';
      menu.style.gap = '10px';
    }
  });

  const playBtn = document.getElementById('playBtn');
  playBtn.addEventListener('click', () => {
    // contoh: buka modal video sederhana (bisa diganti embed YouTube)
    alert('https://www.youtube.com/embed/?rel=iJPMoI6nCxU?si=xwSIgSZTZAf8hM-z');
  });
});