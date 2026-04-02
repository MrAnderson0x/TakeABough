/* ============================================
   Take A Bough Tree Service — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Contact Form Success Message --- */
  if (window.location.search.indexOf('sent=true') !== -1) {
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.innerHTML = '<div style="text-align:center;padding:40px 20px;"><h3 style="color:var(--green-dark);margin-bottom:12px;">Thank You!</h3><p style="color:var(--gray-mid);">Your estimate request has been sent. We\'ll get back to you within one business day.</p></div>';
    }
  }

  /* --- Mobile Navigation --- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  var navOverlay = document.getElementById('navOverlay');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      if (navOverlay) navOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    var navItems = navLinks.querySelectorAll('a');
    navItems.forEach(function (item) {
      item.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Sticky Header --- */
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* --- Active Nav Link --- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinksAll = document.querySelectorAll('.nav-links a');
  navLinksAll.forEach(function (link) {
    link.classList.remove('active');
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  /* --- Scroll Animations --- */
  var animateElements = document.querySelectorAll('.animate-on-scroll');
  if (animateElements.length > 0 && 'IntersectionObserver' in window) {
    var scrollObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animateElements.forEach(function (el) {
      scrollObserver.observe(el);
    });
  } else {
    animateElements.forEach(function (el) {
      el.classList.add('animate-in');
    });
  }

  /* --- Stats Counter Animation --- */
  var statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    var statsAnimated = false;
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          animateCounters();
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(function (stat) {
      statsObserver.observe(stat);
    });
  }

  function animateCounters() {
    statNumbers.forEach(function (stat) {
      var target = parseInt(stat.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      var duration = 2000;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        stat.textContent = current.toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          stat.textContent = target.toLocaleString();
          var suffix = stat.getAttribute('data-suffix');
          if (suffix) stat.textContent += suffix;
        }
      }

      requestAnimationFrame(step);
    });
  }

  /* --- Back to Top Button --- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Smooth Scrolling for Anchor Links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  /* --- Phone Click Tracking --- */
  document.querySelectorAll('a[href^="tel:"]').forEach(function (phoneLink) {
    phoneLink.addEventListener('click', function () {
      console.log('[Take A Bough] Phone call initiated: ' + this.getAttribute('href'));
      if (typeof gtag === 'function') {
        gtag('event', 'click_to_call', {
          event_category: 'engagement',
          event_label: this.getAttribute('href')
        });
      }
    });
  });

  /* --- Contact Form Validation --- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      var requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(function (field) {
        var group = field.closest('.form-group');
        var errorMsg = group ? group.querySelector('.error-message') : null;

        if (group) group.classList.remove('error');

        if (!field.value.trim()) {
          isValid = false;
          if (group) group.classList.add('error');
          if (errorMsg) errorMsg.textContent = 'This field is required';
          return;
        }

        if (field.type === 'email' && field.value.trim()) {
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value.trim())) {
            isValid = false;
            if (group) group.classList.add('error');
            if (errorMsg) errorMsg.textContent = 'Please enter a valid email address';
          }
        }

        if (field.type === 'tel' && field.value.trim()) {
          var phoneClean = field.value.replace(/[\s\-\(\)\.]/g, '');
          if (phoneClean.length < 10) {
            isValid = false;
            if (group) group.classList.add('error');
            if (errorMsg) errorMsg.textContent = 'Please enter a valid phone number';
          }
        }
      });

      if (isValid) {
        var submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          var originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;

          setTimeout(function () {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#2d5a27';
            contactForm.reset();

            setTimeout(function () {
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
              submitBtn.style.background = '';
            }, 3000);
          }, 1000);
        }
      }
    });
  }

  /* --- Testimonial Auto-Rotate --- */
  var testimonialCards = document.querySelectorAll('.testimonial-card');
  if (testimonialCards.length > 1) {
    var currentTestimonial = 0;
    var testimonialInterval;

    function isMobileView() {
      return window.innerWidth <= 768;
    }

    function showTestimonial(index) {
      if (!isMobileView()) return;
      testimonialCards.forEach(function (card, i) {
        card.style.display = i === index ? 'block' : 'none';
        card.style.opacity = i === index ? '1' : '0';
      });
    }

    function startAutoRotate() {
      if (!isMobileView()) {
        testimonialCards.forEach(function (card) {
          card.style.display = '';
          card.style.opacity = '';
        });
        return;
      }
      showTestimonial(currentTestimonial);
      testimonialInterval = setInterval(function () {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
      }, 5000);
    }

    function handleResize() {
      clearInterval(testimonialInterval);
      startAutoRotate();
    }

    startAutoRotate();
    window.addEventListener('resize', handleResize);
  }

  /* --- Reviews: Google Sheet Integration --- */
  // SET YOUR GOOGLE APPS SCRIPT WEB APP URL HERE:
  var REVIEWS_SCRIPT_URL = '';

  // Load approved reviews from Google Sheet
  function loadApprovedReviews() {
    if (!REVIEWS_SCRIPT_URL) return; // Skip if not configured yet
    fetch(REVIEWS_SCRIPT_URL)
      .then(function(response) { return response.json(); })
      .then(function(reviews) {
        if (!reviews || reviews.length === 0) return;
        var grid = document.getElementById('testimonials-grid');
        if (!grid) return;
        grid.innerHTML = '';
        reviews.forEach(function(r) {
          var stars = '';
          for (var i = 0; i < parseInt(r.rating); i++) stars += '\u2733';
          var card = document.createElement('div');
          card.className = 'testimonial-card animate-on-scroll';
          card.innerHTML =
            '<div class="testimonial-stars">' + '\u2733'.repeat(parseInt(r.rating)) + '</div>' +
            '<p>"' + r.review.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '"</p>' +
            '<div class="testimonial-author">' + r.name.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</div>' +
            '<div class="testimonial-location">' + r.location.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</div>';
          grid.appendChild(card);
        });
      })
      .catch(function() {}); // Silently fail, keep hardcoded reviews
  }

  loadApprovedReviews();

  // Submit review form
  var reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var statusEl = document.getElementById('reviewStatus');

      if (!REVIEWS_SCRIPT_URL) {
        statusEl.style.color = 'var(--yellow)';
        statusEl.textContent = 'Review system is being set up. Please try again later.';
        return;
      }

      var data = {
        name: document.getElementById('reviewName').value.trim(),
        location: document.getElementById('reviewLocation').value.trim(),
        rating: document.getElementById('reviewRating').value,
        review: document.getElementById('reviewText').value.trim()
      };

      var submitBtn = reviewForm.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;

      fetch(REVIEWS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(function() {
        statusEl.style.color = 'var(--yellow)';
        statusEl.textContent = 'Thank you! Your review has been submitted and will appear after approval.';
        reviewForm.reset();
        submitBtn.textContent = 'Submit Review';
        submitBtn.disabled = false;
      })
      .catch(function() {
        statusEl.style.color = '#ff6b6b';
        statusEl.textContent = 'Something went wrong. Please try again.';
        submitBtn.textContent = 'Submit Review';
        submitBtn.disabled = false;
      });
    });
  }

});
