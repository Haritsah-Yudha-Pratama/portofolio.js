// ============ NAVBAR PROGRESS BAR ============
function updateProgressBar() {
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('navProgress');
  const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / totalScroll) * 100;

  progressBar.style.width = scrolled + '%';

  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateProgressBar, { passive: true });

// ============ ACTIVE NAV LINK ON SCROLL ============
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');

  const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 10;

  let current = '';

  if (isAtBottom) {
    current = 'contact';
  } else {
    sections.forEach(section => {
      // offset 120px — sedikit lebih dari tinggi navbar pill (≈ 60px + 22px top + buffer)
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
  }

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ============ DARK MODE TOGGLE ============
function initDarkMode() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    htmlElement.classList.add('dark-mode');
    updateThemeIcon(true, false);
  } else {
    htmlElement.classList.remove('dark-mode');
    updateThemeIcon(false, false);
  }

  themeToggle.addEventListener('click', () => {
    const isDark = htmlElement.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark, true);
  });
}

function updateThemeIcon(isDark, animate) {
  const moonIcon = document.querySelector('.icon-moon');
  const sunIcon = document.querySelector('.icon-sun');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (animate && !prefersReduced) {
    const btn = document.getElementById('themeToggle');
    btn.classList.add('theme-spin');
    btn.addEventListener('animationend', () => btn.classList.remove('theme-spin'), { once: true });
  }

  if (isDark) {
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
  } else {
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';
  }
}

initDarkMode();

// ============ MOBILE HAMBURGER MENU ============
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#navbar')) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

initMobileMenu();

// ============ SKILL BAR ANIMATION ============
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const width = e.target.getAttribute('data-width');
        if (prefersReduced) {
          e.target.style.transition = 'none';
        }
        e.target.style.width = width + '%';
        skillObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  bars.forEach(bar => skillObserver.observe(bar));
}

initSkillBars();

// ============ SCROLL TO TOP ============
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

initScrollTop();

// ============ PROJECT GALLERY LIGHTBOX ============
const galleries = {
  'hris-new': [
    'assets/img/HRIS-new/login.jpeg',
    'assets/img/HRIS-new/modules.jpeg',
    'assets/img/HRIS-new/iku_sasaran.png',
    'assets/img/HRIS-new/iku_sasaran_from.png',
    'assets/img/HRIS-new/iku_perencanaan.png',
    'assets/img/HRIS-new/iku_perencanaan_detail.png',
    'assets/img/HRIS-new/iku_perencanaan_form.png',
    'assets/img/HRIS-new/iku_realisasi.png',
    'assets/img/HRIS-new/iku_realisasi_form.png',
    'assets/img/HRIS-new/iku_report.png',
    'assets/img/HRIS-new/payroll_main.png',
    'assets/img/HRIS-new/payroll_master_data.png',
    'assets/img/HRIS-new/payroll_form_input_manual.png',
  ],
  'app-absensi': [
    'assets/img/App Absensi/login.jpeg',
    'assets/img/App Absensi/beranda.jpeg',
    'assets/img/App Absensi/jadwal.jpeg',
    'assets/img/App Absensi/riwayat.jpeg',
    'assets/img/App Absensi/profil.jpeg',
  ],
  'hris-old': [
    'assets/img/Masters/eai_main.png',
    'assets/img/Masters/eai_form.png',
    'assets/img/Masters/wht_main.png',
    'assets/img/Masters/wht_form.png',
    'assets/img/Masters/leave_main.png',
    'assets/img/Masters/leave_form.png',
    'assets/img/Masters/leave_detail.png',
    'assets/img/Resignation/resignation_main.png',
    'assets/img/Resignation/resignation_form.png',
    'assets/img/Resignation/resignation_detail & approval.png',
    'assets/img/Resignation/resignation_exit_interview_hr.png',
    'assets/img/Resignation/resignation_exit_interview_owner.png',
  ],
  'evaluation': [
    'assets/img/evaluation/eval_main.png',
    'assets/img/evaluation/eval_form.png',
    'assets/img/evaluation/eval_detail.png',
    'assets/img/evaluation/eval_detail_form.png',
  ],
};

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!lightbox) return;

  let currentGallery = [];
  let currentIndex = 0;

  function show(index) {
    if (!currentGallery.length) return;
    currentIndex = (index + currentGallery.length) % currentGallery.length;
    img.src = currentGallery[currentIndex];
    counter.textContent = (currentIndex + 1) + ' / ' + currentGallery.length;
  }

  function open(galleryKey) {
    currentGallery = galleries[galleryKey] || [];
    if (!currentGallery.length) return;
    show(0);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-gallery-trigger]').forEach(btn => {
    btn.addEventListener('click', () => open(btn.getAttribute('data-gallery-trigger')));
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => show(currentIndex - 1));
  nextBtn.addEventListener('click', () => show(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
    if (e.key === 'ArrowRight') show(currentIndex + 1);
  });
}

initLightbox();

// ============ FADE-IN ON SCROLL ============
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

if (prefersReducedMotion) {
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
} else {
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ============ TYPING ANIMATION — HERO ROLE ============
function initTypingAnimation() {
  const el = document.getElementById('heroRole');
  if (!el) return;

  const roles = [
    'Software Developer',
    'Staff HRIS',
    'Embedded Systems Engineer',
  ];

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    el.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 45;
  const pauseAfterType = 1800;
  const pauseAfterDelete = 400;

  function tick() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, pauseAfterType);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, pauseAfterDelete);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  tick();
}

initTypingAnimation();

// ============ SMOOTH SCROLL — offset untuk floating navbar ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navbarHeight = 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});
