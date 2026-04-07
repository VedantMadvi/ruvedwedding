// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Mobile Ring Menu Toggle
const mobileRingToggle = document.getElementById('mobileRingToggle');
const mobileRingMenu = document.getElementById('mobileRingMenu');

mobileRingToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  mobileRingMenu.classList.toggle('active');
});

// Close ring menu when clicking anywhere else
document.addEventListener('click', (e) => {
  if (!mobileRingMenu.contains(e.target) && !mobileRingToggle.contains(e.target)) {
    mobileRingMenu.classList.remove('active');
  }
});

// Close ring menu when a link is clicked
mobileRingMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileRingMenu.classList.remove('active');
  });
});

// Countdown Timer
// Change this date to the wedding date
const weddingDate = new Date('2026-12-05T00:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Confetti Crackers on Wedding Section =====
(function () {
  const weddingSection = document.getElementById('wedding');
  if (!weddingSection) return;

  let hasPopped = false;

  function createConfettiPiece(container) {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');

    const colors = ['#ff6b8a', '#ffd700', '#ff69b4', '#7b4f6e', '#ff4500', '#00cec9', '#e84393', '#fdcb6e', '#6c5ce7', '#e17055', '#00b894', '#fab1a0'];
    const shapes = ['circle', 'square', 'strip'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.left = Math.random() * 100 + '%';
    piece.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    piece.style.animationDelay = Math.random() * 0.8 + 's';

    if (shape === 'circle') {
      piece.style.width = (Math.random() * 8 + 5) + 'px';
      piece.style.height = piece.style.width;
      piece.style.borderRadius = '50%';
    } else if (shape === 'square') {
      piece.style.width = (Math.random() * 8 + 5) + 'px';
      piece.style.height = piece.style.width;
      piece.style.borderRadius = '2px';
    } else {
      piece.style.width = (Math.random() * 4 + 2) + 'px';
      piece.style.height = (Math.random() * 15 + 10) + 'px';
      piece.style.borderRadius = '1px';
    }

    container.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 4000);
  }

  function popCrackers() {
    const container = document.createElement('div');
    container.classList.add('confetti-container');
    weddingSection.appendChild(container);

    // Burst confetti in waves
    for (let i = 0; i < 80; i++) {
      setTimeout(() => createConfettiPiece(container), Math.random() * 600);
    }
    // Second wave
    setTimeout(() => {
      for (let i = 0; i < 50; i++) {
        setTimeout(() => createConfettiPiece(container), Math.random() * 400);
      }
    }, 500);

    setTimeout(() => {
      container.remove();
    }, 5000);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasPopped) {
        hasPopped = true;
        popCrackers();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(weddingSection);
})();
