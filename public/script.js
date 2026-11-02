//! Client-side interactivity for BMW M4 Luxury Brand Page

document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navLinks = document.querySelector('.nav-links ul');
  const header = document.querySelector('.navbar');

  // Header scroll effect
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down - hide header
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up - show header
      header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  }, { passive: true });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Feature card hover enhancement
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
  });

  // Gallery item hover effect
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const img = this.querySelector('.gallery-img');
      if (img) {
        img.style.transition = 'transform 0.3s ease';
        img.style.transform = 'scale(1.05)';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      const img = this.querySelector('.gallery-img');
      if (img) {
        img.style.transform = 'scale(1)';
      }
    });
  });

  // CTA button ripple effect
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = '0';
      ripple.style.height = '0';
      ripple.style.background = 'rgba(201,168,76,0.3)';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'scale(0)';
      ripple.style.pointerEvents = 'none';
      ripple.style.transition = 'width 0.6s ease, height 0.6s ease, opacity 0.6s ease';

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.style.width = '200%';
        ripple.style.height = '200%';
        ripple.style.opacity = '0';
      }, 10);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Intersection Observer for section animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Theme toggle (dark/light mode)
  const html = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (prefersDark) {
    html.setAttribute('data-theme', 'dark');
  }

  // Form validation for contact section
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const inputs = this.querySelectorAll('input[required], select[required]');
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#e74c3c';
        } else {
          input.style.borderColor = '';
        }
      });

      if (valid) {
        // Show success feedback
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
          margin-top: 1rem;
          padding: 1rem;
          background: var(--accent-primary);
          color: var(--bg-primary);
          border-radius: var(--radius-sm);
          text-align: center;
        `;
        successMsg.textContent = 'Message sent successfully!';
        this.appendChild(successMsg);

        setTimeout(() => {
          successMsg.remove();
          this.reset();
        }, 3000);
      }
    });
  });

  // Input focus styles
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.outline = 'none';
      this.style.borderColor = 'var(--accent-primary)';
      this.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.15)';
    });

    input.addEventListener('blur', function() {
      this.style.borderColor = '';
      this.style.boxShadow = '';
    });
  });
});