/* ===================================
   MOHAMED ASEEM — PORTFOLIO JS
   Consolidated & bug-free
   =================================== */

// ===================== LOADER =====================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  document.body.classList.add('loaded');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-holo');
      setTimeout(() => { loader.style.display = 'none'; }, 600);
    }, 300);
  }
});

// Loader cycle text & waveform
const cycleTexts = ['Preparing assets', 'Compiling shaders', 'Mounting levels', 'Initializing physics'];
let cycleIndex = 0;
const cycleEl = document.getElementById('loader-cycle');
if (cycleEl) {
  cycleEl.textContent = cycleTexts[0];
  setInterval(() => {
    cycleEl.textContent = cycleTexts[++cycleIndex % cycleTexts.length];
  }, 1400);
}
const wavePath = document.getElementById('wavePath');
if (wavePath) {
  let t = 0;
  setInterval(() => {
    t += 0.02;
    const amp = 12 + Math.sin(t) * 6;
    wavePath.setAttribute('d', `M0 50 C150 ${50 - amp} 450 ${50 + amp} 600 50`);
  }, 40);
}

// ===================== HAMBURGER NAV =====================
const ham = document.getElementById('hamburger1');
const closeBtn = document.getElementById('navClose');
const mobNav = document.getElementById('mobile1Nav');

if (ham && mobNav) {
  ham.addEventListener('click', () => {
    mobNav.classList.add('nav-open1');
    ham.classList.add('hidden');
  });
}
if (closeBtn && mobNav) {
  closeBtn.addEventListener('click', () => {
    mobNav.classList.remove('nav-open1');
    ham.classList.remove('hidden');
  });
}
// Close nav on link click
document.querySelectorAll('#mobile1Nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (mobNav) mobNav.classList.remove('nav-open1');
    if (ham) ham.classList.remove('hidden');
  });
});

// ===================== REVEAL ON SCROLL =====================
const revealElems = document.querySelectorAll('section, .project-card, .skill-card, .glass, .stats-bar');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.transition = 'all 0.9s cubic-bezier(.2,.9,.3,1)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealElems.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  observer.observe(el);
});

// ===================== SMOOTH SCROLLING =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if open
      if (mobNav) mobNav.classList.remove('nav-open1');
      if (ham) ham.classList.remove('hidden');
    }
  });
});

// ===================== SCROLL EVENTS (consolidated) =====================
const topBtn = document.getElementById('backToTop');
const scrollProgress = document.getElementById('scrollProgress');
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // 1. Back to top button
  if (topBtn) {
    topBtn.style.display = scrollY > 500 ? 'flex' : 'none';
  }

  // 2. Scroll progress bar
  if (scrollProgress) {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollY / totalHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }

  // 3. Header background darken on scroll
  if (header) {
    if (scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// ===================== DOM CONTENT LOADED =====================
document.addEventListener('DOMContentLoaded', () => {

  // --- TYPING ANIMATION ---
  const typingEl = document.getElementById('heroTyping');
  if (typingEl) {
    const roles = [
      'Building Immersive Game Worlds',
      'C++ & Blueprint Architecture',
      'Multiplayer & VR Systems',
      'Scalable Gameplay Frameworks'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIdx];
      if (isDeleting) charIdx--;
      else charIdx++;

      typingEl.innerHTML = currentRole.substring(0, charIdx) + '<span class="cursor"></span>';

      let typeSpeed = isDeleting ? 35 : 70;

      if (!isDeleting && charIdx === currentRole.length) {
        typeSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 500;
      }
      setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 1200);
  }

  // --- STATS COUNTER ANIMATION ---
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetStr = el.getAttribute('data-target');
          const target = parseFloat(targetStr);
          const isDecimal = targetStr.includes('.');
          let count = 0;
          const increment = target / 40; 
          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              el.textContent = (isDecimal ? target.toFixed(1) : Math.round(target)) + '+';
              clearInterval(timer);
            } else {
              el.textContent = (isDecimal ? count.toFixed(1) : Math.ceil(count)) + '+';
            }
          }, 50);
          statsObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => statsObserver.observe(num));
  }


  // --- ACTIVE NAV LINK HIGHLIGHT ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  function highlightNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = '#00d4ff';
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNav);
  highlightNav();

  // --- SLIDER LOGIC ---
  const track = document.getElementById('vcTrack');
  if (track) {
    const slides = Array.from(track.children);
    const totalRealSlides = slides.length;

    // Clone for infinite loop
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalRealSlides - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    let currentSlide = 1;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    window.changeSlide = function (direction) {
      track.style.transition = 'transform 0.6s ease-in-out';
      currentSlide += direction;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;

      track.addEventListener('transitionend', () => {
        if (currentSlide >= totalRealSlides + 1) {
          track.style.transition = 'none';
          currentSlide = 1;
          track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        if (currentSlide <= 0) {
          track.style.transition = 'none';
          currentSlide = totalRealSlides;
          track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
      }, { once: true });
    };

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
      }, 250);
    });
  }
});

// ===================== GOOGLE SHEETS CONTACT FORM =====================
const submitBtn = document.getElementById('contactBtn');
const emailInput = document.getElementById('subscriberEmail');
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwr6TnKMNOfrJaAPYlmL0m_grqsJPF9s86p76FLTCgNEkhoq4pOmOIuceR5nIkx3x4W/exec';

function showToast(message, isError) {
  const old = document.getElementById('email-toast');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.id = 'email-toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
    padding: '14px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: '600',
    color: '#fff', zIndex: '9999', opacity: '0', transition: 'opacity 0.4s ease',
    background: isError ? '#e74c3c' : 'linear-gradient(135deg, #00d4ff, #6f42c1)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)'
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; });
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 3500);
}

if (submitBtn && emailInput) {
  emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitBtn.click();
  });

  submitBtn.addEventListener('click', async () => {
    const email = emailInput.value.trim();

    if (!email) { showToast('Please enter your email', true); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address', true);
      return;
    }

    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳';
    submitBtn.disabled = true;

    try {
      const formData = new FormData();
      formData.append('email', email);
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: formData });
      showToast('✅ Email saved successfully!', false);
      emailInput.value = '';
    } catch (error) {
      console.error('Error:', error);
      showToast('❌ Something went wrong. Try again.', true);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}