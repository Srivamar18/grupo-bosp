/* ============================================
   GRUPO BOSP — Home Page JavaScript
   Typing effect, Counter animation, Card tilt
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Typing Effect ----------
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const phrases = [
      'Seguridad Física Profesional',
      'Tecnología de Vanguardia',
      'Mantenimiento Integral',
      'Protección las 24 horas',
      'Soluciones a medida'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 60;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(type, typingSpeed);
    }

    // Start typing after hero animations
    setTimeout(type, 1500);
  }

  // ---------- Counter Animation ----------
  const counters = document.querySelectorAll('.counter');

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = 2000; // ms
          const increment = target / (duration / 16);
          let current = 0;

          function updateCounter() {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          }

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ---------- 3D Tilt Effect on Hero Cards ----------
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) return; // Disable on mobile

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  // ---------- Stagger animation for service cards ----------
  const serviceCards = document.querySelectorAll('.hero-service-card');
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${0.5 + index * 0.2}s`;
  });

  // ---------- About Tabs (Misión / Visión / Valores) ----------
  const tabButtons = document.querySelectorAll('.about-tab-btn');
  const tabPanels = document.querySelectorAll('.about-tab-panel');

  if (tabButtons.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        // Deactivate all
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        // Activate selected
        btn.classList.add('active');
        const targetPanel = document.getElementById('tab-' + targetTab);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

});
