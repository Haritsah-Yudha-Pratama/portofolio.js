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
// Tiap gambar punya src + caption (keterangan halaman/fitur apa)
const galleries = {
  'hris-new': [
    { src: 'assets/img/HRIS-new/login.jpeg', caption: 'Halaman Login' },
    { src: 'assets/img/HRIS-new/modules.jpeg', caption: 'Daftar Modul HRIS' },
    { src: 'assets/img/HRIS-new/iku_sasaran.png', caption: 'IKU — Daftar Sasaran' },
    { src: 'assets/img/HRIS-new/iku_sasaran_from.png', caption: 'IKU — Form Sasaran' },
    { src: 'assets/img/HRIS-new/iku_perencanaan.png', caption: 'IKU — Daftar Perencanaan' },
    { src: 'assets/img/HRIS-new/iku_perencanaan_detail.png', caption: 'IKU — Detail Perencanaan' },
    { src: 'assets/img/HRIS-new/iku_perencanaan_form.png', caption: 'IKU — Form Perencanaan' },
    { src: 'assets/img/HRIS-new/iku_realisasi.png', caption: 'IKU — Daftar Realisasi' },
    { src: 'assets/img/HRIS-new/iku_realisasi_form.png', caption: 'IKU — Form Entry Realisasi' },
    { src: 'assets/img/HRIS-new/iku_report.png', caption: 'IKU — Laporan Performance Index' },
    { src: 'assets/img/HRIS-new/payroll_main.png', caption: 'Payroll — Halaman Utama' },
    { src: 'assets/img/HRIS-new/payroll_master_data.png', caption: 'Payroll — Master Data' },
    { src: 'assets/img/HRIS-new/payroll_form_input_manual.png', caption: 'Payroll — Input Manual' },
  ],
  'app-absensi': [
    { src: 'assets/img/App Absensi/login.jpeg', caption: 'Halaman Login' },
    { src: 'assets/img/App Absensi/beranda.jpeg', caption: 'Beranda / Dashboard' },
    { src: 'assets/img/App Absensi/jadwal.jpeg', caption: 'Jadwal — Navigasi per Bulan' },
    { src: 'assets/img/App Absensi/riwayat.jpeg', caption: 'Riwayat Absensi' },
    { src: 'assets/img/App Absensi/profil.jpeg', caption: 'Profil Pegawai' },
  ],
  'hris-old': [
    { src: 'assets/img/Masters/eai_main.png', caption: 'Employee Assessment Indicator — Daftar' },
    { src: 'assets/img/Masters/eai_form.png', caption: 'Employee Assessment Indicator — Form' },
    { src: 'assets/img/Masters/wht_main.png', caption: 'Working Hour Type — Daftar' },
    { src: 'assets/img/Masters/wht_form.png', caption: 'Working Hour Type — Form' },
    { src: 'assets/img/Masters/leave_main.png', caption: 'Master Cuti — Daftar' },
    { src: 'assets/img/Masters/leave_form.png', caption: 'Master Cuti — Form' },
    { src: 'assets/img/Masters/leave_detail.png', caption: 'Master Cuti — Detail' },
    { src: 'assets/img/Resignation/resignation_main.png', caption: 'Resignation — Daftar Pengajuan' },
    { src: 'assets/img/Resignation/resignation_form.png', caption: 'Resignation — Form Pengajuan' },
    { src: 'assets/img/Resignation/resignation_detail & approval.png', caption: 'Resignation — Detail & Approval' },
    { src: 'assets/img/Resignation/resignation_exit_interview_hr.png', caption: 'Resignation — Exit Interview (HR)' },
    { src: 'assets/img/Resignation/resignation_exit_interview_owner.png', caption: 'Resignation — Exit Interview (Atasan)' },
  ],
  'evaluation': [
    { src: 'assets/img/evaluation/eval_main.png', caption: 'Halaman Utama Evaluasi' },
    { src: 'assets/img/evaluation/eval_form.png', caption: 'Form Tambah Evaluasi' },
    { src: 'assets/img/evaluation/eval_detail.png', caption: 'Detail Evaluasi' },
    { src: 'assets/img/evaluation/eval_detail_form.png', caption: 'Form Edit Detail Evaluasi' },
  ],
};

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
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
    const item = currentGallery[currentIndex];
    img.classList.remove('loaded');
    img.src = item.src;
    caption.textContent = item.caption || '';
    counter.textContent = (currentIndex + 1) + ' / ' + currentGallery.length;
  }

  img.addEventListener('load', () => img.classList.add('loaded'));

  function open(galleryKey, startIndex) {
    currentGallery = galleries[galleryKey] || [];
    if (!currentGallery.length) return;
    show(startIndex || 0);
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

// ============ PROJECT PREVIEW THUMBNAIL (browser mockup) ============
// Mengisi gambar pertama tiap gallery sebagai thumbnail di project-preview
function initProjectPreviews() {
  document.querySelectorAll('.project-preview[data-gallery]').forEach(preview => {
    const key = preview.getAttribute('data-gallery');
    const gallery = galleries[key];
    if (!gallery || !gallery.length) return;
    const imgEl = preview.querySelector('img');
    if (imgEl) {
      imgEl.src = gallery[0].src;
      imgEl.alt = gallery[0].caption || '';
    }
    // klik thumbnail langsung buka lightbox dari gambar pertama
    preview.style.cursor = 'pointer';
    preview.addEventListener('click', () => {
      const trigger = preview.closest('.project-card')?.querySelector('[data-gallery-trigger]');
      if (trigger) trigger.click();
    });
  });
}

initProjectPreviews();

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

    const navbarHeight = 0; // tinggi pill + buffer supaya section tidak ketutup navbar
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});
