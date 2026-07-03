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
  const mobileLinks = document.querySelectorAll('.mobile-link[href^="#"]');
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
  mobileLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

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
  const frame       = lightbox.querySelector('.lightbox-frame');

  if (!lightbox) return;

  let currentGallery = [];
  let currentIndex = 0;

  // ─ Zoom state ─
  let zScale = 1, zPanX = 0, zPanY = 0;
  const ZOOM_MAX = 4, ZOOM_MIN = 1;

  function applyZoom(animated) {
    img.style.transition = animated
      ? 'transform 0.3s cubic-bezier(0.22,1,0.36,1)'
      : 'none';
    img.style.transform = `translate(${zPanX}px, ${zPanY}px) scale(${zScale})`;
  }

  function clampPan() {
    if (zScale <= 1) { zPanX = 0; zPanY = 0; return; }
    const fw = frame ? frame.clientWidth  : 300;
    const fh = frame ? frame.clientHeight : 300;
    const iw = img.clientWidth  * zScale;
    const ih = img.clientHeight * zScale;
    const maxX = Math.max(0, (iw - fw) / 2);
    const maxY = Math.max(0, (ih - fh) / 2);
    zPanX = Math.max(-maxX, Math.min(maxX, zPanX));
    zPanY = Math.max(-maxY, Math.min(maxY, zPanY));
  }

  // ─ Thumbnails ─
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

  // ─ Show (ganti gambar) ─
  function show(index, direction) {
    if (!currentGallery.length) return;
    resetZoom();
    currentIndex = (index + currentGallery.length) % currentGallery.length;
    const item = currentGallery[currentIndex];

    img.classList.remove('anim-next', 'anim-prev');
    void img.offsetWidth;
    img.classList.add(direction === 'prev' ? 'anim-prev' : 'anim-next');

    // Hapus class animasi setelah selesai supaya tidak konflik dengan zoom transform
    img.addEventListener('animationend', () => {
      img.classList.remove('anim-next', 'anim-prev');
    }, { once: true });

    const preCheck = new Image();
    preCheck.src = item.src;
    if (loader && !preCheck.complete) loader.classList.remove('hidden');

    img.src = item.src;
    caption.textContent = item.caption || '';
    counter.textContent = (currentIndex + 1) + ' / ' + currentGallery.length;
    thumbsEl.querySelectorAll('.lb-thumb').forEach((t, i) => t.classList.toggle('active', i === currentIndex));
    scrollThumbIntoView(currentIndex);
  }

  img.addEventListener('load',  () => { if (loader) loader.classList.add('hidden'); });
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
    resetZoom();
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

  // ── Touch: pinch zoom + double-tap + swipe ──
  if (!frame) return;

  let t1x = 0, t1y = 0;
  let lastTap = 0;
  let pinching = false;
  let pinchDist0 = 0, pinchScale0 = 1;
  let pinchPanX0 = 0, pinchPanY0 = 0;
  let rafId = null;
  let pendingTransform = false;

  // Pre-promote ke GPU layer saat lightbox dibuka
  img.style.willChange = 'transform';

  function scheduleApplyZoom() {
    if (pendingTransform) return;
    pendingTransform = true;
    rafId = requestAnimationFrame(() => {
      pendingTransform = false;
      img.style.transition = 'none';
      img.style.transform = `translate(${zPanX}px, ${zPanY}px) scale(${zScale})`;
    });
  }

  function applyZoom(animated) {
    if (rafId) cancelAnimationFrame(rafId);
    pendingTransform = false;
    if (animated) {
      img.style.transition = 'transform 0.3s cubic-bezier(0.22,1,0.36,1)';
      requestAnimationFrame(() => {
        img.style.transform = `translate(${zPanX}px, ${zPanY}px) scale(${zScale})`;
      });
    } else {
      scheduleApplyZoom();
    }
  }

  function resetZoom() {
    zScale = 1; zPanX = 0; zPanY = 0;
    if (rafId) cancelAnimationFrame(rafId);
    pendingTransform = false;
    img.style.transition = 'none';
    img.style.transform = 'none';
    img.classList.remove('anim-next', 'anim-prev');
  }

  frame.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      t1x = e.touches[0].clientX;
      t1y = e.touches[0].clientY;
      pinching = false;

      // double-tap
      const now = Date.now();
      if (now - lastTap < 280) {
        e.preventDefault();
        if (zScale > 1) {
          zScale = 1; zPanX = 0; zPanY = 0;
          applyZoom(true);
        } else {
          const rect = img.getBoundingClientRect();
          const tapX = t1x - rect.left - rect.width / 2;
          const tapY = t1y - rect.top  - rect.height / 2;
          zScale = 2.5;
          zPanX = -(tapX * (zScale - 1)) / zScale;
          zPanY = -(tapY * (zScale - 1)) / zScale;
          clampPan();
          applyZoom(true);
        }
      }
      lastTap = now;

    } else if (e.touches.length === 2) {
      e.preventDefault();
      pinching = true;
      const dx = e.touches[1].clientX - e.touches[0].clientX;
      const dy = e.touches[1].clientY - e.touches[0].clientY;
      pinchDist0  = Math.hypot(dx, dy);
      pinchScale0 = zScale;
      pinchPanX0  = zPanX;
      pinchPanY0  = zPanY;
    }
  }, { passive: false });

  // touchmove PASSIVE supaya browser tidak block rendering
  // kita kontrol scroll via touch-action: none di CSS
  frame.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && pinching) {
      const dx = e.touches[1].clientX - e.touches[0].clientX;
      const dy = e.touches[1].clientY - e.touches[0].clientY;
      const dist = Math.hypot(dx, dy);
      zScale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, pinchScale0 * (dist / pinchDist0)));
      zPanX = pinchPanX0;
      zPanY = pinchPanY0;
      clampPan();
      scheduleApplyZoom(); // rAF supaya smooth
    } else if (e.touches.length === 1 && !pinching && zScale > 1) {
      const dx = e.touches[0].clientX - t1x;
      const dy = e.touches[0].clientY - t1y;
      zPanX += dx;
      zPanY += dy;
      t1x = e.touches[0].clientX;
      t1y = e.touches[0].clientY;
      clampPan();
      scheduleApplyZoom(); // rAF supaya smooth
    }
  }, { passive: true }); // PASSIVE = browser tidak block, jauh lebih smooth

  frame.addEventListener('touchend', (e) => {
    pinching = false;
    if (zScale < 1.05) {
      zScale = 1; zPanX = 0; zPanY = 0;
      applyZoom(true);
    }
    // swipe hanya kalau tidak zoom
    if (zScale <= 1 && e.changedTouches.length === 1 && e.touches.length === 0) {
      const dx = e.changedTouches[0].clientX - t1x;
      const dy = e.changedTouches[0].clientY - t1y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx < 0) show(currentIndex + 1, 'next');
        else show(currentIndex - 1, 'prev');
      }
    }
  }, { passive: true });
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

  // Blokir klik kanan & drag
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  canvas.addEventListener('dragstart',   (e) => e.preventDefault());

  // ── Zoom: pinch + double-tap + wheel (desktop) ──
  const certFrame = viewer.querySelector('.lightbox-frame');
  if (!certFrame) return;

  let cZ = 1, cX = 0, cY = 0;
  const CZ_MAX = 5, CZ_MIN = 1;
  let cLastTap = 0, cPinching = false;
  let cDist0 = 0, cScale0 = 1, cPX0 = 0, cPY0 = 0;
  let cT1x = 0, cT1y = 0;
  let cRaf = null, cPending = false;

  canvas.style.willChange = 'transform';
  canvas.style.transformOrigin = 'center center';
  certFrame.style.touchAction = 'none';

  function cClamp() {
    if (cZ <= 1) { cX = 0; cY = 0; return; }
    const maxX = Math.max(0, (canvas.clientWidth  * cZ - certFrame.clientWidth)  / 2);
    const maxY = Math.max(0, (canvas.clientHeight * cZ - certFrame.clientHeight) / 2);
    cX = Math.max(-maxX, Math.min(maxX, cX));
    cY = Math.max(-maxY, Math.min(maxY, cY));
  }

  function cApply(animated) {
    if (cRaf) cancelAnimationFrame(cRaf);
    cPending = false;
    if (animated) {
      canvas.style.transition = 'transform 0.3s cubic-bezier(0.22,1,0.36,1)';
      requestAnimationFrame(() => { canvas.style.transform = `translate(${cX}px,${cY}px) scale(${cZ})`; });
    } else {
      if (cPending) return;
      cPending = true;
      cRaf = requestAnimationFrame(() => {
        cPending = false;
        canvas.style.transition = 'none';
        canvas.style.transform = `translate(${cX}px,${cY}px) scale(${cZ})`;
      });
    }
  }

  function cReset() {
    cZ = 1; cX = 0; cY = 0;
    canvas.style.transition = 'none';
    canvas.style.transform = 'none';
  }

  // Reset tiap buka
  const _origOpen = open;
  open = function(certKey) { cReset(); _origOpen(certKey); };

  certFrame.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      cT1x = e.touches[0].clientX;
      cT1y = e.touches[0].clientY;
      cPinching = false;
      const now = Date.now();
      if (now - cLastTap < 280) {
        e.preventDefault();
        if (cZ > 1) { cZ = 1; cX = 0; cY = 0; cApply(true); }
        else {
          const r = canvas.getBoundingClientRect();
          const tx = cT1x - r.left - r.width  / 2;
          const ty = cT1y - r.top  - r.height / 2;
          cZ = 2.5;
          cX = -(tx * (cZ - 1)) / cZ;
          cY = -(ty * (cZ - 1)) / cZ;
          cClamp(); cApply(true);
        }
      }
      cLastTap = now;
    } else if (e.touches.length === 2) {
      e.preventDefault();
      cPinching = true;
      const dx = e.touches[1].clientX - e.touches[0].clientX;
      const dy = e.touches[1].clientY - e.touches[0].clientY;
      cDist0 = Math.hypot(dx, dy); cScale0 = cZ; cPX0 = cX; cPY0 = cY;
    }
  }, { passive: false });

  certFrame.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && cPinching) {
      const dx = e.touches[1].clientX - e.touches[0].clientX;
      const dy = e.touches[1].clientY - e.touches[0].clientY;
      cZ = Math.min(CZ_MAX, Math.max(CZ_MIN, cScale0 * (Math.hypot(dx, dy) / cDist0)));
      cX = cPX0; cY = cPY0; cClamp(); cApply(false);
    } else if (e.touches.length === 1 && !cPinching && cZ > 1) {
      cX += e.touches[0].clientX - cT1x;
      cY += e.touches[0].clientY - cT1y;
      cT1x = e.touches[0].clientX;
      cT1y = e.touches[0].clientY;
      cClamp(); cApply(false);
    }
  }, { passive: true });

  certFrame.addEventListener('touchend', () => {
    cPinching = false;
    if (cZ < 1.05) { cZ = 1; cX = 0; cY = 0; cApply(true); }
  }, { passive: true });

  // Desktop: scroll wheel zoom
  certFrame.addEventListener('wheel', (e) => {
    e.preventDefault();
    cZ = Math.min(CZ_MAX, Math.max(CZ_MIN, cZ * (e.deltaY > 0 ? 0.85 : 1.15)));
    cClamp(); cApply(false);
  }, { passive: false });
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
