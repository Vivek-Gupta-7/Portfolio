/* =========================================================
   VIVEK GUPTA — PORTFOLIO SCRIPT
   Sections: loader, particle background, cursor glow,
   nav behavior, typing effects, counters, scroll reveal,
   project tilt, GitHub live fetch, contact form.
   ========================================================= */

// ---- Set your GitHub username here to enable live stats + repos ----
const GITHUB_USERNAME = ""; // e.g. "vivekgupta" — leave blank to skip live fetch

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  initLoader();
  initParticles();
  initCursorGlow();
  initNav();
  initTypedRole();
  initCodeWindow();
  initCounters();
  initScrollReveal();
  initTilt();
  initGithub();
  initContactForm();
  initBackToTop();
});

/* ---------------- LOADER ---------------- */
function initLoader() {
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 900);
  });
  // fallback in case 'load' already fired
  setTimeout(() => loader.classList.add('hidden'), 3000);
}

/* ---------------- PARTICLE BACKGROUND ---------------- */
function initParticles() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const count = Math.min(70, Math.floor((w * h) / 22000));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.5 ? '79,140,255' : '168,85,247'
    });
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue}, 0.55)`;
      ctx.fill();
    });
    // connecting lines for nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(125,211,252,${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    if (!reduceMotion) requestAnimationFrame(tick);
  }
  tick();
}

/* ---------------- CURSOR GLOW ---------------- */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  window.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });
}

/* ---------------- NAV ---------------- */
function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  const navAnchors = document.querySelectorAll('[data-nav]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  navAnchors.forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

  // active link highlighting
  const sections = [...navAnchors].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => observer.observe(s));
}

/* ---------------- TYPED ROLE ---------------- */
function initTypedRole() {
  const el = document.getElementById('typed-role');
  if (!el) return;
  const roles = [
    'AI & Software Developer',
    'Problem Solver',
    'Java Developer',
    'Full Stack Developer',
    'Data Analyst',
    'Technology Enthusiast'
  ];
  let roleIndex = 0, charIndex = 0, deleting = false;

  function step() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        return setTimeout(step, 1500);
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(step, deleting ? 35 : 65);
  }
  step();
}

/* ---------------- CODE WINDOW TYPING ---------------- */
function initCodeWindow() {
  const el = document.getElementById('code-typed');
  if (!el) return;
  const lines = [
    { text: '// about_me.js', cls: 'cmt' },
    { text: 'const vivek = {', cls: '' },
    { text: '  role: ', cls: '', inline: '"Software Developer & Data Analyst"', inlineCls: 'str' },
    { text: '  cgpa: ', cls: '', inline: '8.93', inlineCls: 'str' },
    { text: '  loves: ', cls: '', inline: '"solving real problems"', inlineCls: 'str' },
    { text: '  status: ', cls: '', inline: '"open to work"', inlineCls: 'str' },
    { text: '};', cls: '' },
  ];

  let html = '';
  let li = 0;

  function typeLine() {
    if (li >= lines.length) return;
    const line = lines[li];
    const full = line.inline ? `${line.text}${line.inline},` : line.text;
    let ci = 0;
    const interval = setInterval(() => {
      ci++;
      renderPartial(full.slice(0, ci));
      if (ci >= full.length) {
        clearInterval(interval);
        html += `<span class="${line.cls}">${line.text}</span>` + (line.inline ? `<span class="${line.inlineCls}">${line.inline}</span>,` : '') + '\n';
        li++;
        setTimeout(typeLine, 120);
      }
    }, 18);
  }

  function renderPartial(partial) {
    el.innerHTML = html + partial;
  }

  // start typing when hero visible
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      typeLine();
      obs.disconnect();
    }
  }, { threshold: 0.3 });
  obs.observe(document.getElementById('code-window'));
}

/* ---------------- COUNTERS ---------------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const isDecimal = String(target).includes('.');
      let current = 0;
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        current = target * eased;
        el.textContent = isDecimal ? current.toFixed(2) : Math.round(current);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = isDecimal ? target.toFixed(2) : target;
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => obs.observe(c));
}

/* ---------------- SCROLL REVEAL ---------------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(item => obs.observe(item));
}

/* ---------------- PROJECT TILT ---------------- */
function initTilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -6;
      const rotateY = ((x / rect.width) - 0.5) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ---------------- GITHUB LIVE DATA ---------------- */
async function initGithub() {
  const repoList = document.getElementById('gh-repo-list');
  const statsRepos = document.getElementById('gh-repos');
  const statsFollowers = document.getElementById('gh-followers');
  const statsGists = document.getElementById('gh-gists');
  const profileLinks = [document.getElementById('gh-profile-link'), document.getElementById('gh-visit-link')];

  if (!GITHUB_USERNAME) {
    if (repoList) repoList.innerHTML = '<p class="gh-loading">Add your GitHub username in script.js to show live repos here.</p>';
    return;
  }

  profileLinks.forEach(a => { if (a) a.href = `https://github.com/${GVivek-Gupta-7}`; });

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${Vivek-Gupta-7}`),
      fetch(`https://api.github.com/users/${Vivek-Gupta-7}/repos?sort=updated&per_page=5`)
    ]);
    if (userRes.ok) {
      const user = await userRes.json();
      if (statsRepos) statsRepos.textContent = user.public_repos ?? '—';
      if (statsFollowers) statsFollowers.textContent = user.followers ?? '—';
      if (statsGists) statsGists.textContent = user.public_gists ?? '—';
    }
    if (reposRes.ok && repoList) {
      const repos = await reposRes.json();
      if (Array.isArray(repos) && repos.length) {
        repoList.innerHTML = repos.map(r =>
          `<a href="${r.html_url}" target="_blank" rel="noopener">${r.name}<span class="repo-star">★ ${r.stargazers_count}</span></a>`
        ).join('');
      } else {
        repoList.innerHTML = '<p class="gh-loading">No public repositories found.</p>';
      }
    }
  } catch (err) {
    if (repoList) repoList.innerHTML = '<p class="gh-loading">Could not load GitHub data right now.</p>';
  }
}

/* ---------------- CONTACT FORM ---------------- */
emailjs.init("8Fg9Yx9vZBLMfTNRv");

function initContactForm() {

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", function(e) {

    e.preventDefault();

    emailjs.sendForm(
      "service_66vxckp",
      "template_lth3vfo",
      this
    ).then(() => {

      status.textContent = "✅ Message sent successfully!";
      form.reset();

    }).catch((error) => {

      console.log(error);
      status.textContent = "❌ Failed to send message.";

    });

  });

}

initContactForm();

/* ---------------- BACK TO TOP ---------------- */
function initBackToTop() {
  const btn = document.getElementById('to-top');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
