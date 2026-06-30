document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────────────────
     1. AOS — Animate on Scroll
  ──────────────────────────────────────────*/
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic'
    });
  }

  /* ─────────────────────────────────────────
     2. Sticky navbar shadow on scroll
  ──────────────────────────────────────────*/
  var navbar = document.getElementById('navbar');
  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add('shadow-lg');
      navbar.classList.remove('border-b', 'border-gray-100');
    } else {
      navbar.classList.remove('shadow-lg');
      navbar.classList.add('border-b', 'border-gray-100');
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });

  /* ─────────────────────────────────────────
     3. Hamburger toggle
  ──────────────────────────────────────────*/
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      hamburger.classList.toggle('hamburger-open');
      hamburger.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  /* ─────────────────────────────────────────
     4. Close mobile menu on nav link click
  ──────────────────────────────────────────*/
  document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu) mobileMenu.classList.add('hidden');
      if (hamburger) {
        hamburger.classList.remove('hamburger-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ─────────────────────────────────────────
     5. Mobile services accordion
  ──────────────────────────────────────────*/
  var mobileServicesToggle = document.getElementById('mobile-services-toggle');
  var mobileServicesDropdown = document.getElementById('mobile-services-dropdown');

  if (mobileServicesToggle && mobileServicesDropdown) {
    mobileServicesToggle.addEventListener('click', function () {
      mobileServicesDropdown.classList.toggle('hidden');
      var chevron = mobileServicesToggle.querySelector('.chevron-icon');
      if (chevron) {
        chevron.style.transform = mobileServicesDropdown.classList.contains('hidden')
          ? 'rotate(0deg)'
          : 'rotate(180deg)';
      }
    });
  }

  /* ─────────────────────────────────────────
     6. Floating side CTAs visibility
  ──────────────────────────────────────────*/
  var floatingCTAs = document.getElementById('floating-ctas');
  var heroSection = document.getElementById('home');

  function updateFloatingCTAs() {
    if (!floatingCTAs || !heroSection) return;
    var threshold = heroSection.offsetHeight * 0.55;
    if (window.scrollY > threshold) {
      floatingCTAs.style.opacity = '1';
      floatingCTAs.style.pointerEvents = 'auto';
    } else {
      floatingCTAs.style.opacity = '0';
      floatingCTAs.style.pointerEvents = 'none';
    }
  }
  window.addEventListener('scroll', updateFloatingCTAs, { passive: true });

  /* ─────────────────────────────────────────
     7. Stats counter animation
  ──────────────────────────────────────────*/
  var statsAnimated = false;
  var statsSection = document.getElementById('stats');

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10);
    var suffix = el.dataset.suffix || '';
    var duration = 1600;
    var startTime = null;

    function update(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = easeOutCubic(progress);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  if (statsSection) {
    var statsObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !statsAnimated) {
        statsAnimated = true;
        document.querySelectorAll('.stat-number').forEach(animateCounter);
        statsObserver.disconnect();
      }
    }, { threshold: 0.35 });
    statsObserver.observe(statsSection);
  }

  /* ─────────────────────────────────────────
     8. Active nav link highlight on scroll
  ──────────────────────────────────────────*/
  var sections = document.querySelectorAll('section[id], div[id="stats"]');
  var navLinks = document.querySelectorAll('#desktop-nav a[href^="#"]');

  if (sections.length && navLinks.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var targetHref = '#' + entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === targetHref) {
              link.classList.add('nav-active');
            }
          });
        }
      });
    }, { rootMargin: '-25% 0px -70% 0px' });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ─────────────────────────────────────────
     9. Sticky bottom bar slide-in
  ──────────────────────────────────────────*/
  var stickyBar = document.getElementById('sticky-bottom-bar');

  if (stickyBar) {
    stickyBar.style.transform = 'translateY(100%)';

    function updateStickyBar() {
      if (window.scrollY > 320) {
        stickyBar.style.transform = 'translateY(0)';
      } else {
        stickyBar.style.transform = 'translateY(100%)';
      }
    }
    window.addEventListener('scroll', updateStickyBar, { passive: true });
  }

});
