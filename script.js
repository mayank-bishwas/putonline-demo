/**
 * PutOnline — Vanilla JavaScript
 * Bilingual Engine (Hindi Devanagari <-> English), Dynamic SVG Connectors, and WhatsApp Links
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Bilingual Language Switcher ---
  // Default language is Hindi ('hi')
  const savedLang = localStorage.getItem('putonline_lang') || 'hi';
  applyLanguage(savedLang);

  document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang-target');
      if (targetLang) {
        localStorage.setItem('putonline_lang', targetLang);
        applyLanguage(targetLang);
      }
    });
  });

  function applyLanguage(lang) {
    document.documentElement.lang = lang;

    // Update active class on toggle buttons
    document.querySelectorAll('.lang-toggle-btn').forEach(b => {
      if (b.getAttribute('data-lang-target') === lang) {
        b.classList.add('active');
        b.setAttribute('aria-pressed', 'true');
      } else {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      }
    });

    // Update all elements with data-hi and data-en
    document.querySelectorAll('[data-hi][data-en]').forEach(el => {
      const content = el.getAttribute(`data-${lang}`);
      if (content !== null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = content;
        } else {
          el.innerHTML = content;
        }
      }
    });

    // Update WhatsApp links with language-specific greeting message
    const waText = lang === 'hi'
      ? encodeURIComponent('नमस्ते PutOnline, मुझे अपनी दुकान को ऑनलाइन लाना है। कृपया लाइव प्रोटोटाइप की जानकारी दें।')
      : encodeURIComponent('Hello PutOnline, I would like to bring my store online. Please share the live prototype details.');

    document.querySelectorAll('.btn-whatsapp-pill').forEach(btn => {
      btn.href = `https://wa.me/911234567890?text=${waText}`;
    });
  }

  // --- 2. Hero Video Autoplay Resilience ---
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    heroVideo.play().catch(() => {
      // Modern browsers allow muted autoplay
    });
  }

  // --- 3. Smooth Anchor Scrolling with Header Offset ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- 4. Mobile Menu Drawer Toggle Controller ---
  const navHamburgerBtn = document.getElementById('navHamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');

  if (navHamburgerBtn && mobileNavDrawer) {
    function toggleMobileMenu(isOpen) {
      const open = typeof isOpen === 'boolean' ? isOpen : !mobileNavDrawer.classList.contains('open');
      if (open) {
        mobileNavDrawer.classList.add('open');
        navHamburgerBtn.classList.add('active');
        navHamburgerBtn.setAttribute('aria-expanded', 'true');
        mobileNavDrawer.setAttribute('aria-hidden', 'false');
      } else {
        mobileNavDrawer.classList.remove('open');
        navHamburgerBtn.classList.remove('active');
        navHamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileNavDrawer.setAttribute('aria-hidden', 'true');
      }
    }

    navHamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close when clicking any link in the drawer
    mobileNavDrawer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    });

    // Close when clicking outside header or drawer
    document.addEventListener('click', (e) => {
      const header = document.getElementById('mainHeader');
      if (header && !header.contains(e.target)) {
        toggleMobileMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggleMobileMenu(false);
      }
    });
  }

  // Debounce utility
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
});
