window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hide'), 700);
});

const cursorGlow = document.getElementById('cursorGlow');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateGlow(){
  glowX += (mouseX - glowX) * 0.12;
  glowY += (mouseY - glowY) * 0.12;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';
  requestAnimationFrame(animateGlow);
}
animateGlow();

window.addEventListener('click', (e) => {
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = e.clientX + 'px';
  ripple.style.top = e.clientY + 'px';
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
});


const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
}
window.addEventListener('scroll', updateScrollProgress);

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const navToggle = document.getElementById('navToggle');
const navLinksWrap = document.getElementById('navLinks');
const sections = document.querySelectorAll('section[id]');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  backToTop.classList.toggle('show', window.scrollY > 500);

  let current = sections[0].id;
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksWrap.classList.toggle('open');
});
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinksWrap.classList.remove('open');
  });
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const roles = ['Pelajar', 'Programmer', 'Gamer', 'Developer'];
const typedEl = document.getElementById('typedText');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const word = roles[roleIndex];
  if (!deleting){
    charIndex++;
    typedEl.textContent = word.slice(0, charIndex);
    if (charIndex === word.length){
      deleting = true;
      setTimeout(typeLoop, 1300);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = word.slice(0, charIndex);
    if (charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 55 : 100);
}
typeLoop();

const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const fill = entry.target.querySelector('.skill-bar-fill');
      const percent = entry.target.getAttribute('data-percent');
      requestAnimationFrame(() => { fill.style.width = percent + '%'; });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillCards.forEach(card => skillObserver.observe(card));

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      const duration = 1400;
      const start = performance.now();
      function tick(now){
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

function handleFormSubmit(e){
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = 'Terima kasih! Pesan kamu tersimpan secara lokal (demo front-end).';
  note.style.color = '#00C8FF';
  e.target.reset();
}

document.getElementById('year').textContent = new Date().getFullYear();

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H;
function resizeCanvas(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let scrollY = 0;
window.addEventListener('scroll', () => { scrollY = window.scrollY; });

const STAR_COUNT = 140;
const stars = Array.from({ length: STAR_COUNT }, () => ({
  x: Math.random() * W,
  y: Math.random() * H,
  r: Math.random() * 1.4 + 0.3,
  baseAlpha: Math.random() * 0.5 + 0.2,
  tw: Math.random() * Math.PI * 2,
  speed: Math.random() * 0.02 + 0.01,
  depth: Math.random() * 0.4 + 0.1
}));

const PARTICLE_COUNT = 40;
const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
  x: Math.random() * W,
  y: Math.random() * H,
  r: Math.random() * 2 + 1,
  vy: -(Math.random() * 0.35 + 0.1),
  vx: (Math.random() - 0.5) * 0.15,
  alpha: Math.random() * 0.4 + 0.15
}));

let shootingStars = [];
function spawnShootingStar(){
  shootingStars.push({
    x: Math.random() * W * 0.7 + W * 0.15,
    y: Math.random() * H * 0.3,
    len: Math.random() * 120 + 80,
    speed: Math.random() * 9 + 7,
    angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
    life: 0,
    maxLife: 60
  });
}
setInterval(() => {
  if (Math.random() < 0.7) spawnShootingStar();
}, 3200);

function draw(){
  ctx.clearRect(0, 0, W, H);

  stars.forEach(s => {
    s.tw += s.speed;
    const alpha = s.baseAlpha + Math.sin(s.tw) * 0.25;
    const py = (s.y + scrollY * s.depth) % H;
    ctx.beginPath();
    ctx.arc(s.x, py, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220,240,255,${Math.max(alpha,0.05)})`;
    ctx.fill();
  });

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
    if (p.x < -10) p.x = W + 10;
    if (p.x > W + 10) p.x = -10;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,200,255,${p.alpha})`;
    ctx.shadowColor = 'rgba(0,200,255,0.8)';
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  shootingStars.forEach(s => {
    s.life++;
    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;
    const fade = 1 - s.life / s.maxLife;
    const tailX = s.x - Math.cos(s.angle) * s.len;
    const tailY = s.y - Math.sin(s.angle) * s.len;
    const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
    grad.addColorStop(0, `rgba(255,255,255,${fade})`);
    grad.addColorStop(1, 'rgba(0,200,255,0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();
  });
  shootingStars = shootingStars.filter(s => s.life < s.maxLife && s.y < H + 100);

  requestAnimationFrame(draw);
}
draw();

function updateBirthdayCountdown() {

    const now = new Date();

    let target = new Date(
        now.getFullYear(),
        3,      // April (0 = Januari)
        17,
        0,
        0,
        0
    );

    if (now > target) {
        target.setFullYear(target.getFullYear() + 1);
    }

    const distance = target - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").textContent = `${days} Days`;
    document.getElementById("hours").textContent = `${hours} Hours`;
    document.getElementById("minutes").textContent = `${minutes} Min`;
    document.getElementById("seconds").textContent = `${seconds} Sec`;

}

updateBirthdayCountdown();
setInterval(updateBirthdayCountdown, 1000);