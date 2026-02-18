// ONE ODONTOLOGIA MOEMA - JavaScript

// ========================================
// SCROLL PROGRESS BAR
// ========================================
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  if (scrollProgress) scrollProgress.style.width = progress + '%';
});

// ========================================
// MENU MOBILE
// ========================================
const navToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');
const navLinks = document.querySelectorAll('.nav__list a');

navToggle.addEventListener('click', () => {
  const isOpen = navList.style.right === '0px';
  navList.style.right = isOpen ? '-100%' : '0px';
  navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.style.right = '-100%';
    navToggle.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (!navList.contains(e.target) && !navToggle.contains(e.target)) {
    navList.style.right = '-100%';
    navToggle.classList.remove('active');
  }
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      window.scrollTo({ top: target.offsetTop - headerHeight, behavior: 'smooth' });
    }
  });
});

// ========================================
// REVEAL ON SCROLL
// ========================================
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ========================================
// COUNTER ANIMATION
// ========================================
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutQuart
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// ========================================
// STEPS TABS
// ========================================
const stepTabs = document.querySelectorAll('.step-tab');
const stepPanels = document.querySelectorAll('.step-panel');

stepTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const index = parseInt(tab.dataset.step);

    stepTabs.forEach(t => t.classList.remove('active'));
    stepPanels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    stepPanels[index].classList.add('active');
  });
});

// ========================================
// VIDEO
// ========================================
const mediaVideo    = document.getElementById('mediaVideo');
const playOverlay   = document.getElementById('playOverlay');
const videoControls = document.getElementById('videoControls');
const vcPlay        = document.getElementById('vcPlay');
const vcProgress    = document.getElementById('vcProgress');
const vcSound       = document.getElementById('vcSound');

if (mediaVideo) {
  playOverlay.addEventListener('click', () => {
    mediaVideo.play();
    playOverlay.classList.add('hidden');
    videoControls.classList.add('visible');
  });

  vcPlay.addEventListener('click', () => {
    mediaVideo.paused ? mediaVideo.play() : mediaVideo.pause();
  });

  mediaVideo.addEventListener('play', () => {
    document.getElementById('vcIconPlay').style.display  = 'none';
    document.getElementById('vcIconPause').style.display = 'block';
  });

  mediaVideo.addEventListener('pause', () => {
    document.getElementById('vcIconPlay').style.display  = 'block';
    document.getElementById('vcIconPause').style.display = 'none';
  });

  mediaVideo.addEventListener('timeupdate', () => {
    if (mediaVideo.duration) {
      vcProgress.value = (mediaVideo.currentTime / mediaVideo.duration) * 100;
    }
  });

  vcProgress.addEventListener('input', () => {
    mediaVideo.currentTime = (vcProgress.value / 100) * mediaVideo.duration;
  });

  mediaVideo.muted = true;

  vcSound.addEventListener('click', () => {
    mediaVideo.muted = !mediaVideo.muted;
    document.getElementById('vcIconMuted').style.display = mediaVideo.muted ? 'block' : 'none';
    document.getElementById('vcIconSound').style.display = mediaVideo.muted ? 'none'  : 'block';
  });
}

// ========================================
// FORMULÁRIO
// ========================================
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '✓ Enviado com sucesso!';
    btn.style.background = 'linear-gradient(135deg, #4caf7d, #388f5e)';
    btn.disabled = true;

    setTimeout(() => {
      alert(`Obrigado, ${nome}! Entraremos em contato em breve pelo ${telefone}.`);
      contactForm.reset();
      btn.textContent = 'Quero transformar meu sorriso';
      btn.style.background = '';
      btn.disabled = false;
    }, 1500);
  });
}

// ========================================
// MÁSCARA TELEFONE
// ========================================
const telefoneInput = document.getElementById('telefone');

if (telefoneInput) {
  telefoneInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length <= 11) {
      v = v.replace(/^(\d{2})(\d)/, '($1) $2');
      v = v.replace(/(\d)(\d{4})$/, '$1-$2');
    }
    e.target.value = v;
  });
}

// ========================================
// HEADER SCROLL
// ========================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  header.style.boxShadow = window.pageYOffset > 50
    ? '0 4px 20px rgba(0,0,0,0.09)'
    : '0 1px 0 #ede9e0';
});

console.log('🦷 One Odontologia Moema - Carregado!');