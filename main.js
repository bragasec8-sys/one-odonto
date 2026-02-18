// ONE ODONTOLOGIA MOEMA - JavaScript

// ========================================
// MENU MOBILE
// ========================================
const navToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');
const navLinks = document.querySelectorAll('.nav__list a');


// Toggle menu ao clicar no botão
navToggle.addEventListener('click', () => {
  const isOpen = navList.style.right === '0px';
  navList.style.right = isOpen ? '-100%' : '0px';
  
  // Anima o botão hamburger
  navToggle.classList.toggle('active');
});

// Fecha menu ao clicar em um link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navList.style.right = '-100%';
    navToggle.classList.remove('active');
  });
});

// Fecha menu ao clicar fora
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
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

const mediaVideo  = document.getElementById('mediaVideo');
const playOverlay = document.getElementById('playOverlay');
const videoControls = document.getElementById('videoControls');
const vcPlay      = document.getElementById('vcPlay');
const vcProgress  = document.getElementById('vcProgress');
const vcSound     = document.getElementById('vcSound');

if (mediaVideo) {
  // Play inicial
  playOverlay.addEventListener('click', () => {
    mediaVideo.play();
    playOverlay.classList.add('hidden');
    videoControls.classList.add('visible');
  });

  // Play / Pause
  vcPlay.addEventListener('click', () => {
    if (mediaVideo.paused) {
      mediaVideo.play();
    } else {
      mediaVideo.pause();
    }
  });

  mediaVideo.addEventListener('play', () => {
    document.getElementById('vcIconPlay').style.display  = 'none';
    document.getElementById('vcIconPause').style.display = 'block';
  });

  mediaVideo.addEventListener('pause', () => {
    document.getElementById('vcIconPlay').style.display  = 'block';
    document.getElementById('vcIconPause').style.display = 'none';
  });

  // Progress bar
  mediaVideo.addEventListener('timeupdate', () => {
    if (mediaVideo.duration) {
      vcProgress.value = (mediaVideo.currentTime / mediaVideo.duration) * 100;
    }
  });

  vcProgress.addEventListener('input', () => {
    mediaVideo.currentTime = (vcProgress.value / 100) * mediaVideo.duration;
  });

  // Som
  mediaVideo.muted = true;
  vcSound.addEventListener('click', () => {
    mediaVideo.muted = !mediaVideo.muted;
    document.getElementById('vcIconMuted').style.display = mediaVideo.muted ? 'block' : 'none';
    document.getElementById('vcIconSound').style.display = mediaVideo.muted ? 'none' : 'block';
  });
}

// ========================================
// FORMULÁRIO DE CONTATO
// ========================================
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = {
      nome: document.getElementById('nome').value,
      telefone: document.getElementById('telefone').value,
      email: document.getElementById('email').value,
      objetivo: document.getElementById('objetivo').value
    };
    
    // Aqui você integraria com seu backend/API
    // Por enquanto, mostramos um alerta
    alert(`Obrigado, ${formData.nome}! Entraremos em contato em breve pelo ${formData.telefone}.`);
    
    // Limpa o formulário
    contactForm.reset();
    
    // Opcional: redirecionar para WhatsApp
    // const whatsappNumber = '5511999999999'; // Número da clínica
    // const message = `Olá! Gostaria de transformar meu sorriso. Meu nome é ${formData.nome}.`;
    // window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  });
}

// ========================================
// MÁSCARA DE TELEFONE
// ========================================
const telefoneInput = document.getElementById('telefone');

if (telefoneInput) {
  telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    }
    
    e.target.value = value;
  });
}

// ========================================
// ANIMAÇÃO DE ELEMENTOS AO SCROLL
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observa todos os cards, testimonials e steps
document.querySelectorAll('.card, .testimonial, .step, .faq__item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Adiciona sombra ao header quando scrollar
  if (currentScroll > 50) {
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
  } else {
    header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.04)';
  }
  
  lastScroll = currentScroll;
});

// ========================================
// FAQ ACCORDION
// ========================================
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
  const summary = item.querySelector('summary');
  
  summary.addEventListener('click', () => {
    // Fecha outros items (opcional - remover para permitir múltiplos abertos)
    // faqItems.forEach(otherItem => {
    //   if (otherItem !== item && otherItem.hasAttribute('open')) {
    //     otherItem.removeAttribute('open');
    //   }
    // });
  });
});

console.log('🦷 One Odontologia Moema - Site carregado com sucesso!');