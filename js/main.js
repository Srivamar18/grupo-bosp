/* ============================================
   GRUPO BOSP — Main JavaScript
   Global: Preloader, Navbar, Scroll Reveal, 
   Smooth Scroll, WhatsApp, Parallax
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {



  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');
  const isHomePage = document.querySelector('.hero') !== null;

  function handleNavScroll() {
    if (!navbar) return;
    if (isHomePage) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Initial check

  // ---------- Mobile Menu ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      if (navOverlay) navOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        closeMenu();
      });
    }

    function closeMenu() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      if (navOverlay) navOverlay.classList.remove('active');
      document.body.style.overflow = '';
      // Also close any open dropdowns
      document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
    }

    // Close menu on link click (not dropdown triggers)
    navLinks.querySelectorAll('a:not(.nav-dropdown-trigger)').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close menu on dropdown sub-link click
    navLinks.querySelectorAll('.nav-dropdown-menu a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Handle resize: close mobile menu if viewport becomes desktop-sized
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // ---------- Mobile Dropdown Toggle ----------
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          // Close other open dropdowns first
          dropdowns.forEach(other => {
            if (other !== dropdown) other.classList.remove('open');
          });
          dropdown.classList.toggle('open');
        }
      });
    }
  });

  // ---------- Scroll Reveal (IntersectionObserver) ----------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ---------- Smooth Scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---------- Parallax Effect (Hero) ----------
  const hero = document.querySelector('.hero');
  if (hero) {
    const glows = hero.querySelectorAll('.hero-glow');

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;

      glows.forEach((glow, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        glow.style.transform = `translate(${direction * rate * 0.1}px, ${rate * 0.2}px)`;
      });
    }, { passive: true });
  }

  // ---------- Active Nav Link ----------
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.navbar-links > a, .nav-dropdown-menu a');

    navLinksAll.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.includes(currentPage) && currentPage !== 'index.html') {
        link.classList.add('active');
      }
    });
  }
  setActiveNavLink();

  // ---------- WhatsApp Button Visibility ----------
  const whatsappFloat = document.querySelector('.whatsapp-float');
  if (whatsappFloat) {
    // Show after scrolling a bit on home, immediately on other pages
    if (isHomePage) {
      whatsappFloat.style.opacity = '0';
      whatsappFloat.style.transform = 'scale(0)';
      whatsappFloat.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          whatsappFloat.style.opacity = '1';
          whatsappFloat.style.transform = 'scale(1)';
        } else {
          whatsappFloat.style.opacity = '0';
          whatsappFloat.style.transform = 'scale(0)';
        }
      }, { passive: true });
    }
  }

});
