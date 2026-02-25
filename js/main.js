/* ============================================
   GREYSITE.IN — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Page Loader ----------
  const loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('loaded'), 400);
    });
    // Fallback
    setTimeout(() => loader.classList.add('loaded'), 2000);
  }

  // ---------- Scroll Progress Bar ----------
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    });
  }

  // ---------- Header Scroll Effect ----------
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ---------- Mobile Nav Toggle ----------
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // ---------- Scroll Reveal Animation ----------
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  fadeElements.forEach(el => observer.observe(el));

  // ---------- Counter Animation ----------
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = prefix + Math.floor(current) + suffix;
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  // ---------- Portfolio Filter ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'block';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          }, 200);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ---------- Contact Form ----------
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.querySelector('.form-success');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate sending
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        contactForm.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('show');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Reset after 5s
        setTimeout(() => {
          if (formSuccess) formSuccess.classList.remove('show');
          contactForm.style.display = 'block';
        }, 5000);
      }, 1500);
    });
  }

  // ---------- Template Modals ----------
  const templateCards = document.querySelectorAll('[data-modal]');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');

  const templateData = {
    business: {
      title: 'Business Website Templates',
      description: 'Professional business websites designed to establish trust and drive conversions. Perfect for consultancies, agencies, and corporate brands.',
      features: ['Responsive Design', 'Contact Forms', 'Team Section', 'Services Showcase', 'Testimonials', 'Blog Integration']
    },
    ecommerce: {
      title: 'E-Commerce Templates',
      description: 'Full-featured online store templates with product catalogs, shopping carts, and secure checkout flows.',
      features: ['Product Catalog', 'Shopping Cart', 'Payment Integration', 'Order Tracking', 'Wishlist', 'Product Reviews']
    },
    portfolio: {
      title: 'Portfolio Templates',
      description: 'Stunning portfolio layouts to showcase your creative work beautifully. Ideal for designers, photographers, and artists.',
      features: ['Gallery Grid', 'Lightbox Preview', 'Category Filters', 'About Section', 'Contact Form', 'Social Links']
    },
    restaurant: {
      title: 'Restaurant Templates',
      description: 'Appetizing restaurant websites with online menus, reservation systems, and location maps.',
      features: ['Digital Menu', 'Online Reservations', 'Location Map', 'Photo Gallery', 'Operating Hours', 'Delivery Integration']
    },
    flowershop: {
      title: 'Flower Shop Templates',
      description: 'Beautiful, colorful templates for flower shops and floral businesses with online ordering capabilities.',
      features: ['Product Showcase', 'Online Ordering', 'Occasion Categories', 'Delivery Scheduling', 'Gift Cards', 'Customer Reviews']
    },
    school: {
      title: 'School & Education Templates',
      description: 'Comprehensive educational institution websites with course catalogs, faculty pages, and event calendars.',
      features: ['Course Catalog', 'Faculty Directory', 'Event Calendar', 'Admissions Portal', 'News/Blog', 'Parent Portal']
    },
    clinic: {
      title: 'Clinic & Healthcare Templates',
      description: 'Clean, trustworthy healthcare websites with appointment booking, doctor profiles, and service listings.',
      features: ['Appointment Booking', 'Doctor Profiles', 'Service Listings', 'Patient Portal', 'Health Blog', 'Insurance Info']
    }
  };

  templateCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-modal');
      const data = templateData[key];
      if (data && modalTitle && modalBody && modalOverlay) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = `
          <p style="color: var(--text-secondary); margin-bottom: 24px;">${data.description}</p>
          <h4 style="margin-bottom: 16px; font-size: 1rem;">Key Features:</h4>
          <ul style="list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            ${data.features.map(f => `<li style="color: var(--text-secondary); font-size: 0.9rem; display: flex; align-items: center; gap: 8px;"><span style="color: var(--accent-blue);">✓</span> ${f}</li>`).join('')}
          </ul>
          <div style="margin-top: 32px;">
            <a href="contact.html" class="btn btn-primary">Request This Template</a>
          </div>
        `;
        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // ---------- Set Active Nav Link ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
