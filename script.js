/**
 * ISellOnline — Clean Vanilla JavaScript Controller
 * Handles Bilingual Switch (Hindi/English), Mobile Drawer, and Autoplay.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Bilingual Language Switcher ---
  const langButtons = document.querySelectorAll('.lang-btn');
  const storedLang = localStorage.getItem('isellonline_lang') || 'hi';

  function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('isellonline_lang', lang);

    // Update active button state
    langButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-lang-target') === lang;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
    });

    // Swap content for all bilingual elements
    document.querySelectorAll('[data-hi][data-en]').forEach(el => {
      const translated = el.getAttribute(`data-${lang}`);
      if (translated) {
        el.innerHTML = translated;
      }
    });

    // Update WhatsApp link greeting message
    const waText = lang === 'hi'
      ? encodeURIComponent('नमस्ते ISellOnline, मुझे अपनी दुकान को ऑनलाइन लाना है। कृपया लाइव प्रोटोटाइप की जानकारी दें।')
      : encodeURIComponent('Hello ISellOnline, I would like to bring my store online. Please share the live prototype details.');

    document.querySelectorAll('.wa-button').forEach(btn => {
      btn.href = `https://wa.me/918521567359?text=${waText}`;
    });
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang-target');
      if (targetLang) setLanguage(targetLang);
    });
  });

  // Initialize language on page load
  if (storedLang !== 'hi') {
    setLanguage(storedLang);
  } else {
    setLanguage('hi');
  }

  // --- 2. Mobile Drawer Navigation ---
  const hamburgerBtn = document.getElementById('navHamburgerBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');

  function toggleMobileMenu(forceState) {
    if (!hamburgerBtn || !mobileDrawer) return;
    const isOpening = forceState !== undefined ? forceState : !mobileDrawer.classList.contains('open');

    hamburgerBtn.classList.toggle('active', isOpening);
    hamburgerBtn.setAttribute('aria-expanded', isOpening ? 'true' : 'false');
    mobileDrawer.classList.toggle('open', isOpening);
    mobileDrawer.setAttribute('aria-hidden', isOpening ? 'false' : 'true');
  }

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close when tapping any navigation link inside drawer
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Close when clicking outside drawer
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') &&
          !mobileDrawer.contains(e.target) &&
          !hamburgerBtn.contains(e.target)) {
        toggleMobileMenu(false);
      }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        toggleMobileMenu(false);
      }
    });
  }

  // --- 3. Hero Video Autoplay Resilience ---
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    heroVideo.play().catch(() => {
      // Modern browsers permit muted autoplay
    });
  }

  // --- 4. Smooth Active Nav Link Highlighting (Scrollspy) ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href*="#"]');

  function updateActiveNav() {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const targetId = href.includes('#') ? href.split('#')[1] : href;
        link.classList.toggle('active', targetId === currentSectionId);
      });
    }
  }

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    // Immediate activation on load
    updateActiveNav();

    // Instant active underline on jump link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }
});
