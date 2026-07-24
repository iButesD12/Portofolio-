  /* button more inform */
  function pesan() {
    const popup = document.createElement("div");
    popup.innerHTML = `
        <h2>Information iButes</h2>
        <p>Loading...</p>
    `;
    popup.style.cssText = `
        position:fixed;
        inset:0;
        background:#000e;
        color:#fff;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        font-family:monospace;
        font-size:28px;
        z-index:9999;
        opacity:0;
        transition:.8s;
    `;
    document.body.appendChild(popup);
    setTimeout(()=>{
        popup.style.opacity = "1";
    },50);
    setTimeout(()=>{
        popup.innerHTML = `
            <h1>One</h1>
        `;
    },1500);
    setTimeout(()=>{
        popup.innerHTML = `<h1>Two</h1>`;
    },2500);
    setTimeout(()=>{
        popup.innerHTML = `<h1>Three</h1>`;
    },3500);
    setTimeout(()=>{
        popup.innerHTML = `
            <h2>Welcome to My Information...</h2>
            <h2>Jangan Lupa Follow Guyss</h2>
        `;
    },4500);
    setTimeout(()=>{
        window.location.href = "https://whatsapp.com/channel/0029Vb6z2tsG3R3hVVQDTN1L";
    },5500);
}
  function lyric() {
    const popup = document.createElement("div");
    popup.innerHTML = `
        <h2>🌹 Ini Semua Tentang Kamu >//<</h2>
        <p>I Miss You XXL...</p>
    `;
    popup.style.cssText = `
        position:fixed;
        inset:0;
        background:#000e;
        color:#fff;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        font-family:monospace;
        font-size:28px;
        z-index:9999;
        opacity:0;
        transition:.8s;
    `;
    document.body.appendChild(popup);

    setTimeout(()=>{
        popup.style.opacity = "1";
    },50);
    setTimeout(()=>{
        popup.innerHTML = `
            <h1>3</h1>
        `;
    },1500);
    setTimeout(()=>{
        popup.innerHTML = `<h1>2</h1>`;
    },2500);
    setTimeout(()=>{
        popup.innerHTML = `<h1>1</h1>`;
    },3500);
    setTimeout(()=>{
        popup.innerHTML = `
            <h2>🌹D🌸</h2>
        `;
    },4500);
    setTimeout(()=>{
        window.location.href = "lyric.html";
    },5500);
}
  /* birthday countdown */
  function updateCountdown() {
    const now = new Date();
    let birthday = new Date(now.getFullYear(), 3, 17, 0, 0, 0); // April = 3
    if (now > birthday) birthday.setFullYear(birthday.getFullYear() + 1);
    const distance = birthday - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);
    document.getElementById("countdown")
    .textContent =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  /* navbar background on scroll */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  /* scroll-reveal sections */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* animate bar fills once their section is visible */
  const fillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-fill]').forEach(bar => {
          bar.style.width = bar.getAttribute('data-fill') + '%';
        });
        fillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('#skills, #games').forEach(sec => fillObserver.observe(sec));

  /* navbar scroll-spy */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === entry.target.id);
        });
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(sec => spyObserver.observe(sec));

  /* sidenav scroll-spy */
  const sideItems = document.querySelectorAll('.sidenav-item');
  const sideSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sideItems.forEach(item => {
          item.classList.toggle('active', item.dataset.target === entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(sec => sideSpyObserver.observe(sec));
  