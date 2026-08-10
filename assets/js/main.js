document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMenu = () => {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden'; // Disable scroll when menu is open
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
    document.body.style.overflow = ''; // Re-enable scroll
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMenu);
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // --- Smooth Scrolling for Navigation ---
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-target');
      if (targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Logo home button smooth scroll
  const logoBtn = document.querySelector('header button.cursor-pointer');
  if (logoBtn) {
    logoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetElement = document.querySelector('#inicio');
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  // --- Scroll-Fade-in Intersection Observer ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Slightly offset the bottom trigger area
  });

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // --- Header Opacity/Blur Scroll Transition ---
  const header = document.querySelector('header');
  
  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.remove('bg-transparent');
      header.classList.add('bg-[#2B160D]/85', 'backdrop-blur-md', 'border-b', 'border-[#C9A227]/10', 'shadow-lg');
    } else {
      header.classList.add('bg-transparent');
      header.classList.remove('bg-[#2B160D]/85', 'backdrop-blur-md', 'border-b', 'border-[#C9A227]/10', 'shadow-lg');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll);
  // Run once on load in case page is already scrolled
  handleHeaderScroll();

  // --- Testimonials Slider ---
  const testimonials = [
    {
      text: "Saí de lá renovada, como se o mundo tivesse desacelerado só para mim. Uma experiência de outro nível.",
      author: "Marina Albuquerque",
      context: "Cliente desde 2023"
    },
    {
      text: "O atendimento é impecável e o ambiente transmite uma paz indescritível. O Ritual de Casal é simplesmente maravilhoso.",
      author: "Lucas & Amanda Mendes",
      context: "Clientes desde 2024"
    },
    {
      text: "A melhor massagem terapêutica que já fiz na vida. Profissionais extremamente qualificados e atenciosos.",
      author: "Beatriz Ramos",
      context: "Cliente desde 2022"
    }
  ];

  let currentTestimonial = 0;
  const blockquoteEl = document.getElementById('testimonial-blockquote');
  const textEl = document.getElementById('testimonial-text');
  const authorEl = document.getElementById('testimonial-author');
  const contextEl = document.getElementById('testimonial-context');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dotsContainer = document.getElementById('testimonial-dots');
  
  if (blockquoteEl && prevBtn && nextBtn && dotsContainer) {
    const dots = dotsContainer.querySelectorAll('button');

    const updateTestimonials = (index) => {
      // Fade out
      blockquoteEl.classList.add('opacity-0', 'scale-95');
      
      setTimeout(() => {
        currentTestimonial = index;
        const data = testimonials[currentTestimonial];
        
        textEl.textContent = data.text;
        authorEl.textContent = data.author;
        contextEl.textContent = data.context;
        
        // Update dots
        dots.forEach((dot, idx) => {
          if (idx === currentTestimonial) {
            dot.className = "h-1.5 rounded-full transition-all duration-300 w-8 bg-[#C9A227]";
          } else {
            dot.className = "h-1.5 rounded-full transition-all duration-300 w-1.5 bg-[#2B160D]/25";
          }
        });
        
        // Fade in
        blockquoteEl.classList.remove('opacity-0', 'scale-95');
      }, 300);
    };

    prevBtn.addEventListener('click', () => {
      let index = currentTestimonial - 1;
      if (index < 0) index = testimonials.length - 1;
      updateTestimonials(index);
    });

    nextBtn.addEventListener('click', () => {
      let index = currentTestimonial + 1;
      if (index >= testimonials.length) index = 0;
      updateTestimonials(index);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (index !== currentTestimonial) {
          updateTestimonials(index);
        }
      });
    });
  }
});
