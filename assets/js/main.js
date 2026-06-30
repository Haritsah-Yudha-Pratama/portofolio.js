// ============ NAVBAR PROGRESS BAR ============
// Auto-update tahun
const _year = new Date().getFullYear();
const _heroYear = document.getElementById('heroYear');
const _footerYear = document.getElementById('footerYear');
if (_heroYear) _heroYear.textContent = _year;
if (_footerYear) _footerYear.textContent = _year;
function updateProgressBar() {
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('navProgress');
  const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / totalScroll) * 100;
  progressBar.style.width = scrolled + '%';
  if (window.scrollY > 10) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
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
      if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
    });
  }
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
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
  if (isDark) { moonIcon.style.display = 'none'; sunIcon.style.display = 'block'; }
  else { moonIcon.style.display = 'block'; sunIcon.style.display = 'none'; }
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

// ── Mobile theme toggle ──
function syncMobileThemeBtn(isDark) {
  const moonM  = document.querySelector('.icon-moon-m');
  const sunM   = document.querySelector('.icon-sun-m');
  const label  = document.querySelector('.mobile-theme-label');
  if (moonM)  moonM.style.display  = isDark ? 'none'  : 'block';
  if (sunM)   sunM.style.display   = isDark ? 'block' : 'none';
  if (label)  label.textContent    = isDark ? 'Light Mode' : 'Dark Mode';
}

const mobileThemeBtn = document.getElementById('mobileThemeToggle');
if (mobileThemeBtn) {
  syncMobileThemeBtn(document.documentElement.classList.contains('dark-mode'));
  mobileThemeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark, true);
    syncMobileThemeBtn(isDark);
  });
}

// ============ SKILL BAR ANIMATION + TOOLTIP ============
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const width = e.target.getAttribute('data-width');
        if (prefersReduced) e.target.style.transition = 'none';
        e.target.style.width = width + '%';
        skillObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  bars.forEach(bar => {
    skillObserver.observe(bar);

    // Tooltip persen saat hover
    const tooltip = document.createElement('span');
    tooltip.className = 'skill-tooltip';
    tooltip.textContent = bar.getAttribute('data-width') + '%';
    bar.parentElement.style.position = 'relative';
    bar.parentElement.appendChild(tooltip);

    bar.parentElement.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateY(-4px)';
    });
    bar.parentElement.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
      tooltip.style.transform = 'translateY(0)';
    });
  });
}

initSkillBars();

// ============ SCROLL TO TOP ============
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
initScrollTop();

// ============ PROJECT GALLERY LIGHTBOX ============
const galleries = {
  'hris-new': [
    { src: 'assets/img/HRIS-new/login.jpeg', caption: 'Halaman Login' },
    { src: 'assets/img/HRIS-new/modules.jpeg', caption: 'Daftar Modul HRIS' },
    { src: 'assets/img/HRIS-new/iku_sasaran.png', caption: 'IKU — Daftar Sasaran' },
    { src: 'assets/img/HRIS-new/iku_perencanaan.png', caption: 'IKU — Daftar Perencanaan' },
    { src: 'assets/img/HRIS-new/iku_perencanaan_detail.png', caption: 'IKU — Detail Perencanaan' },
    { src: 'assets/img/HRIS-new/iku_realisasi.png', caption: 'IKU — Daftar Realisasi' },
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
    { src: 'assets/img/Masters/wht_main.png', caption: 'Working Hour Type — Daftar' },
    { src: 'assets/img/Masters/leave_main.png', caption: 'Master Cuti — Daftar' },
    { src: 'assets/img/Masters/leave_detail.png', caption: 'Master Cuti — Detail' },
    { src: 'assets/img/Resignation/resignation_main.png', caption: 'Resignation — Daftar Pengajuan' },
    { src: 'assets/img/Resignation/resignation_detail & approval.png', caption: 'Resignation — Detail & Approval' },
    { src: 'assets/img/Resignation/resignation_exit_interview_hr.png', caption: 'Resignation — Exit Interview (HR)' },
    { src: 'assets/img/Resignation/resignation_exit_interview_owner.png', caption: 'Resignation — Exit Interview (Owner)' },
  ],
  'evaluation': [
    { src: 'assets/img/evaluation/eval_main.png', caption: 'Halaman Utama Evaluasi' },
    { src: 'assets/img/evaluation/eval_detail.png', caption: 'Detail Evaluasi' },
  ],
};

const galleryNames = {
  'hris-new':    'New-HRIS — Sistem HRIS Internal RSUI',
  'app-absensi': 'Aplikasi Absensi RSUI',
  'hris-old':    'HRIS-Old — Master Data & Resignation',
  'evaluation':  'Aplikasi Evaluasi & Planning',
};

function initLightbox() {
  const lightbox    = document.getElementById('lightbox');
  const img         = document.getElementById('lightboxImg');
  const caption     = document.getElementById('lightboxCaption');
  const counter     = document.getElementById('lightboxCounter');
  const projectName = document.getElementById('lightboxProjectName');
  const thumbsEl    = document.getElementById('lightboxThumbs');
  const loader      = document.getElementById('lightboxLoader');
  const closeBtn    = document.getElementById('lightboxClose');
  const prevBtn     = document.getElementById('lightboxPrev');
  const nextBtn     = document.getElementById('lightboxNext');
  const frame       = document.querySelector('.lightbox-frame');

  if (!lightbox) return;

  let currentGallery = [];
  let currentIndex = 0;

  function buildThumbs() {
    thumbsEl.innerHTML = '';
    currentGallery.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'lb-thumb' + (i === currentIndex ? ' active' : '');
      const tImg = document.createElement('img');
      tImg.src = item.src;
      tImg.alt = item.caption || '';
      tImg.loading = 'lazy';
      div.appendChild(tImg);
      div.addEventListener('click', () => show(i, i > currentIndex ? 'next' : 'prev'));
      thumbsEl.appendChild(div);
    });
  }

  function scrollThumbIntoView(index) {
    const thumbs = thumbsEl.querySelectorAll('.lb-thumb');
    if (thumbs[index]) thumbs[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  function show(index, direction) {
    if (!currentGallery.length) return;
    currentIndex = (index + currentGallery.length) % currentGallery.length;
    const item = currentGallery[currentIndex];

    img.classList.remove('anim-next', 'anim-prev');
    void img.offsetWidth;
    img.classList.add(direction === 'prev' ? 'anim-prev' : 'anim-next');

    if (loader) loader.classList.remove('hidden');
    img.src = item.src;
    caption.textContent = item.caption || '';
    counter.textContent = (currentIndex + 1) + ' / ' + currentGallery.length;

    thumbsEl.querySelectorAll('.lb-thumb').forEach((t, i) => t.classList.toggle('active', i === currentIndex));
    scrollThumbIntoView(currentIndex);
  }

  img.addEventListener('load', () => { if (loader) loader.classList.add('hidden'); });
  img.addEventListener('error', () => { if (loader) loader.classList.add('hidden'); });

  function open(galleryKey, startIndex) {
    currentGallery = galleries[galleryKey] || [];
    if (!currentGallery.length) return;
    if (projectName) projectName.textContent = galleryNames[galleryKey] || galleryKey;
    buildThumbs();
    show(startIndex || 0, 'next');
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
  prevBtn.addEventListener('click', () => show(currentIndex - 1, 'prev'));
  nextBtn.addEventListener('click', () => show(currentIndex + 1, 'next'));

  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(currentIndex - 1, 'prev');
    if (e.key === 'ArrowRight') show(currentIndex + 1, 'next');
  });

  // ---- Swipe gesture mobile ----
  if (frame) {
    let touchStartX = 0;
    let touchStartY = 0;
    frame.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    frame.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx < 0) show(currentIndex + 1, 'next');
        else show(currentIndex - 1, 'prev');
      }
    }, { passive: true });
  }
}

initLightbox();

// ============ PROJECT PREVIEW — klik stack buka lightbox ============
document.querySelectorAll('.project-preview[data-gallery]').forEach(preview => {
  preview.style.cursor = 'pointer';
  preview.addEventListener('click', () => {
    const trigger = preview.closest('.project-card')?.querySelector('[data-gallery-trigger]');
    if (trigger) trigger.click();
  });
});

// ============ PDF THUMBNAIL (sertifikat) ============
function initCertThumbnails() {
  const certs = [
    {
      canvasId: 'certCanvas1',
      wrapperId: 'certThumb1',
      pdf:  'assets/certificates/sertifikat_c959aaab-56d9-42dc-81b4-6045e7850e27 (1).pdf',
      viewKey: 'cert1',
    },
  ];

  if (typeof pdfjsLib === 'undefined') return;
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  certs.forEach(({ canvasId, wrapperId, pdf, viewKey }) => {
    const canvas  = document.getElementById(canvasId);
    const wrapper = document.getElementById(wrapperId);
    if (!canvas || !wrapper) return;

    pdfjsLib.getDocument(pdf).promise
      .then(doc => doc.getPage(1))
      .then(page => {
        const viewport = page.getViewport({ scale: 1 });
        const wrap  = canvas.closest('.cert-canvas-wrap');
        const w     = (wrap ? wrap.offsetWidth : 200) || 200;
        const scale = (w / viewport.width) * 2;
        const scaled = page.getViewport({ scale });
        canvas.width  = scaled.width;
        canvas.height = scaled.height;
        page.render({ canvasContext: canvas.getContext('2d'), viewport: scaled });
      })
      .catch(() => {
        const wrap = canvas.closest('.cert-canvas-wrap');
        if (wrap) wrap.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--muted)"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div>`;
      });

    // Klik thumbnail buka cert viewer (render canvas), BUKAN link PDF langsung
    wrapper.style.cursor = 'pointer';
    wrapper.addEventListener('click', () => {
      const trigger = document.querySelector(`[data-cert-view="${viewKey}"]`);
      if (trigger) trigger.click();
    });
  });
}

initCertThumbnails();

// ============ CERT VIEWER (lihat-saja, tanpa link download) ============
function initCertViewer() {
  const certPdfMap = {
    cert1: 'assets/certificates/sertifikat_c959aaab-56d9-42dc-81b4-6045e7850e27 (1).pdf',
  };

  const viewer   = document.getElementById('certViewer');
  const canvas   = document.getElementById('certViewerCanvas');
  const wrap     = document.getElementById('certViewerCanvasWrap');
  const loader   = document.getElementById('certViewerLoader');
  const closeBtn = document.getElementById('certViewerClose');

  if (!viewer || !canvas) return;

  function open(certKey) {
    const pdfPath = certPdfMap[certKey];
    if (!pdfPath || typeof pdfjsLib === 'undefined') return;

    canvas.classList.remove('cert-revealed');
    loader.classList.remove('hidden');
    viewer.classList.add('open');
    document.body.style.overflow = 'hidden';

    pdfjsLib.getDocument(pdfPath).promise
      .then(doc => doc.getPage(1))
      .then(page => {
        const viewport = page.getViewport({ scale: 1 });
        const targetW = Math.min(wrap.clientWidth || 800, 900);
        const scale = (targetW / viewport.width) * 2; // retina
        const scaled = page.getViewport({ scale });
        canvas.width = scaled.width;
        canvas.height = scaled.height;
        return page.render({ canvasContext: canvas.getContext('2d'), viewport: scaled }).promise;
      })
      .then(() => {
        loader.classList.add('hidden');
        // trigger animasi reveal setelah render selesai
        requestAnimationFrame(() => canvas.classList.add('cert-revealed'));
      })
      .catch(() => loader.classList.add('hidden'));
  }

  function close() {
    viewer.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-cert-view]').forEach(btn => {
    btn.addEventListener('click', () => open(btn.getAttribute('data-cert-view')));
  });

  closeBtn.addEventListener('click', close);
  viewer.addEventListener('click', (e) => { if (e.target === viewer) close(); });
  document.addEventListener('keydown', (e) => {
    if (viewer.classList.contains('open') && e.key === 'Escape') close();
  });

  // Blokir klik kanan & drag pada canvas supaya tidak mudah di-save
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  canvas.addEventListener('dragstart', (e) => e.preventDefault());
}

initCertViewer();

// ============ FADE-IN ON SCROLL ============
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

if (prefersReducedMotion) document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
else document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ============ TYPING ANIMATION — HERO ROLE ============
function initTypingAnimation() {
  const el = document.getElementById('heroRole');
  if (!el) return;
  const roles = ['IT Staff HRIS', 'Software Developer', 'Mobile App Developer', 'Embedded Systems Engineer'];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) { el.textContent = roles[0]; return; }

  let roleIndex = 0, charIndex = 0, isDeleting = false;
  function tick() {
    const current = roles[roleIndex];
    if (!isDeleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) { isDeleting = true; setTimeout(tick, 1800); return; }
      setTimeout(tick, 80);
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(tick, 400); return; }
      setTimeout(tick, 45);
    }
  }
  tick();
}
initTypingAnimation();

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
  });
});
