/**
 * STACKLY BOOKSTORE - JAVASCRIPT ENGINE
 * Handles Navigation, Cart Drawer, Wishlist, Hero Slider,
 * Quick View Modals, Filter Logic, and Interactive Dashboards.
 */

// Book Database for Dynamic Interactivity
const BOOKS_DATA = [
  { id: 'b1', title: 'Little Disasters', author: 'Randall Klein', category: 'Mystery', price: 19.00, oldPrice: null, image: 'images/book-1.webp', badge: null, rating: 4.8, pages: 384, format: 'Hardcover', desc: 'A gripping psychological thriller examining secrets, maternal anxiety, and unexpected twists in a suburban community.' },
  { id: 'b2', title: 'The Pisces', author: 'Melissa Broder', category: 'Sale', price: 45.00, oldPrice: 49.00, image: 'images/book-2.webp', badge: '-8%', rating: 4.6, pages: 304, format: 'Paperback', desc: 'An audacious and darkly comedic romance about desire, myth, and emotional depth along the Venice Beach coastline.' },
  { id: 'b3', title: "Gulliver's Travels", author: 'Jonathan Swift', category: 'Romance', price: 23.00, oldPrice: null, image: 'images/book-3.webp', badge: null, rating: 4.9, pages: 352, format: 'Collector Edition', desc: 'The immortal classic satirizing human nature, society, and grand adventurous expeditions across unfamiliar realms.' },
  { id: 'b4', title: 'The Blood Between Us', author: 'Zac Brewer', category: 'Mystery', price: 26.00, oldPrice: null, image: 'images/book-4.webp', badge: null, rating: 4.7, pages: 320, format: 'Hardcover', desc: 'A suspense-filled mystery dissecting family secrets, truth, and deception in the shadow of tragic legacy.' },
  { id: 'b5', title: 'Not In Love', author: 'Ali Hazelwood', category: 'Genre', price: 28.00, oldPrice: null, image: 'images/book-5.webp', badge: 'NEW', rating: 4.9, pages: 384, format: 'Paperback', desc: 'A fierce, witty, forbidden workplace STEM romance featuring complex characters and unstoppable chemistry.' },
  { id: 'b6', title: "A Witch's Guide", author: 'Aaron Blabey', category: 'Romance', price: 36.00, oldPrice: null, image: 'images/book-6.webp', badge: null, rating: 4.8, pages: 290, format: 'Hardcover', desc: 'An enchanting, spellbound journey navigating modern magic, destiny, and heartwarming community bonds.' },
  { id: 'b7', title: 'Broken Prince', author: 'Ali Hazelwood', category: 'Mystery', price: 29.00, oldPrice: null, image: 'images/book-7.webp', badge: null, rating: 4.5, pages: 416, format: 'Hardcover', desc: 'A royal mystery woven with high-stakes political intrigue, loyalty tests, and unexpected romantic tension.' },
  { id: 'b8', title: 'The Many Dates of Indigo', author: 'Francesca May', category: 'Romance', price: 21.00, oldPrice: null, image: 'images/book-8.webp', badge: null, rating: 4.7, pages: 336, format: 'Paperback', desc: 'A charming, modern comedy following Indigo through ten disastrous dates to find authentic self-love.' },
  { id: 'b9', title: 'These Infinite Threads', author: 'Anna North', category: 'Drama', price: 32.00, oldPrice: null, image: 'images/book-9.webp', badge: null, rating: 4.8, pages: 448, format: 'Collector Edition', desc: 'A majestic epic fantasy tracing the interwoven destinies of empires, rebel weavers, and ancient songs.' },
  { id: 'b10', title: 'All the Acorns', author: 'Jonathan Swift', category: 'Fantasy', price: 19.00, oldPrice: null, image: 'images/book-10.webp', badge: null, rating: 4.6, pages: 256, format: 'Paperback', desc: 'A lyrical fable exploring nature, growth, small beginnings, and timeless wisdom passed through seasons.' },
  { id: 'b11', title: 'Clap When You Land', author: 'Elizabeth Acevedo', category: 'Drama', price: 22.00, oldPrice: 27.00, image: 'images/book-11.webp', badge: '-18%', rating: 4.9, pages: 432, format: 'Hardcover', desc: 'A novel in verse about grief, sisterhood, loss, and the enduring resilience of family across oceans.' },
  { id: 'b12', title: 'Tween Night', author: 'Sarah J. Maas', category: 'Fantasy', price: 34.00, oldPrice: null, image: 'images/book-12.webp', badge: 'BESTSELLER', rating: 4.9, pages: 512, format: 'Hardcover', desc: 'A dark, breathless fantasy adventure where starlight, forbidden courts, and fierce magic collide.' }
];

// App State
let cart = JSON.parse(localStorage.getItem('stackly_cart')) || [
  { id: 'b1', title: 'Little Disasters', price: 19.00, quantity: 1, image: 'images/book-1.webp' }
];
let wishlist = JSON.parse(localStorage.getItem('stackly_wishlist')) || ['b2', 'b5'];

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initCartDrawer();
  initWishlist();
  initHeroSlider();
  initQuickViewModal();
  initAccordions();
  initMarquee();
  initToast();
  initScrollReveal();
  initCardRatings();
  initServiceCards3D();
  initTestimonialSlider();
  initPricingToggle();
  initUnboxing3DCard();
  initPatronCards3D();
  initAboutStory3DCard();
  initAboutMetrics3D();
  initValueCards3D();
  initSpacesCards3D();
  initCuratorCards3D();
  initShopSpotlight3D();
  initShopCatalogueFilters();
  initFlashSaleCountdown();
  initAuthorCards3D();
  initContactCards3D();
  initContactForm();
  initAdminDashboard();
  initCustomerDashboard();
  updateCartBadge();
  updateWishlistBadge();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER & SMOOTH SCROLL ENGINE
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let ticking = false;
  let lastScrollY = window.scrollY;

  function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (lastScrollY > 80) {
          header.classList.add('is-sticky');
        } else {
          header.classList.remove('is-sticky');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial state check

  // Universal smooth scroll for in-page anchor links with header offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#' || href.length <= 1) return;
      
      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 15);
        window.scrollTo({
          top: Math.max(0, targetPos),
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. MOBILE DRAWER & INTERACTIVE OVERLAYS
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close-btn');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (drawer.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // Close drawer when clicking any link inside
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Auto close on window resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. CART DRAWER & STATE MANAGEMENT
   -------------------------------------------------------------------------- */
function initCartDrawer() {
  const cartToggleBtns = document.querySelectorAll('.cart-toggle-btn');
  const cartDrawer = document.querySelector('.cart-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const closeBtn = document.querySelector('.cart-close-btn');

  if (cartToggleBtns.length && cartDrawer) {
    cartToggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        cartDrawer.classList.add('is-open');
        if (overlay) overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        renderCartItems();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        cartDrawer.classList.remove('is-open');
        if (overlay) overlay.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        cartDrawer.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    }
  }

  // Bind Add to Cart buttons
  document.addEventListener('click', (e) => {
    const buyBtn = e.target.closest('.add-to-cart-btn, .btn-buy-now');
    if (buyBtn) {
      if (buyBtn.getAttribute('href') === '404.html') {
        window.location.href = '404.html';
        return;
      }
      e.preventDefault();
      const bookId = buyBtn.dataset.id || 'b1';
      addToCart(bookId);
    }
  });

  renderCartItems();
}

function addToCart(bookId, quantity = 1) {
  const book = BOOKS_DATA.find(b => b.id === bookId) || BOOKS_DATA[0];
  const existing = cart.find(item => item.id === bookId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: book.id,
      title: book.title,
      price: book.price,
      quantity: quantity,
      image: book.image
    });
  }

  saveCart();
  renderCartItems();
  updateCartBadge();
  showToast(`"${book.title}" added to your bag!`);

  const cartDrawer = document.querySelector('.cart-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  if (cartDrawer) {
    cartDrawer.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
  }
}

function removeFromCart(bookId) {
  cart = cart.filter(item => item.id !== bookId);
  saveCart();
  renderCartItems();
  updateCartBadge();
  showToast('Item removed from bag');
}

function updateCartQuantity(bookId, delta) {
  const item = cart.find(i => i.id === bookId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(bookId);
  } else {
    saveCart();
    renderCartItems();
    updateCartBadge();
  }
}

function saveCart() {
  localStorage.setItem('stackly_cart', JSON.stringify(cart));
}

function renderCartItems() {
  const container = document.querySelector('.cart-drawer-items');
  const subtotalEl = document.querySelector('.cart-subtotal-val');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--color-text-muted);">
        <svg style="width: 48px; height: 48px; opacity: 0.3; margin-bottom: 1rem;" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
        <p style="font-size: 1.1rem; font-weight: 600; color: var(--color-text-dark);">Your bag is empty</p>
        <p style="font-size: 0.9rem; margin-top: 0.25rem;">Explore our curated releases and add stories to your shelf.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    return;
  }

  let total = 0;
  container.innerHTML = cart.map(item => {
    total += item.price * item.quantity;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.title}</h4>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.5rem;">
            <div style="display: flex; align-items: center; border: 1px solid var(--color-border); border-radius: 4px;">
              <button onclick="updateCartQuantity('${item.id}', -1)" style="padding: 2px 8px; font-weight: bold;">-</button>
              <span style="padding: 0 8px; font-size: 0.9rem; font-weight: 600;">${item.quantity}</span>
              <button onclick="updateCartQuantity('${item.id}', 1)" style="padding: 2px 8px; font-weight: bold;">+</button>
            </div>
            <span class="cart-item-remove" onclick="removeFromCart('${item.id}')">Remove</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (subtotalEl) subtotalEl.textContent = `$${total.toFixed(2)}`;
}

function updateCartBadge() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = count;
  });
}

/* --------------------------------------------------------------------------
   4. WISHLIST MANAGEMENT
   -------------------------------------------------------------------------- */
function initWishlist() {
  document.addEventListener('click', (e) => {
    const wishBtn = e.target.closest('.wishlist-btn');
    if (wishBtn) {
      if (wishBtn.getAttribute('href') === '404.html') {
        window.location.href = '404.html';
        return;
      }
      e.preventDefault();
      const bookId = wishBtn.dataset.id || 'b1';
      toggleWishlist(bookId, wishBtn);
    }
  });
}

function toggleWishlist(bookId, btnElement) {
  const index = wishlist.indexOf(bookId);
  const book = BOOKS_DATA.find(b => b.id === bookId);

  if (index > -1) {
    wishlist.splice(index, 1);
    if (btnElement) btnElement.classList.remove('active');
    showToast(`Removed "${book ? book.title : 'Book'}" from wishlist`);
  } else {
    wishlist.push(bookId);
    if (btnElement) btnElement.classList.add('active');
    showToast(`Saved "${book ? book.title : 'Book'}" to wishlist!`);
  }

  localStorage.setItem('stackly_wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
}

function updateWishlistBadge() {
  document.querySelectorAll('.wishlist-badge').forEach(b => {
    b.textContent = wishlist.length;
  });
}

/* --------------------------------------------------------------------------
   5. HERO REVOLUTION SLIDER (3D Realistic Physics, Parallax & Gestures)
   -------------------------------------------------------------------------- */
function initHeroSlider() {
  const heroContainer = document.getElementById('heroCardContainer');
  const slides = document.querySelectorAll('.hero-slide');
  const indicatorNums = document.querySelectorAll('.slide-indicator-num');
  const progressBars = document.querySelectorAll('.slide-progress-bar');
  const progressTracks = document.querySelectorAll('.slide-progress-track');
  const prevBtn = document.querySelector('.prev-slide-btn');
  const nextBtn = document.querySelector('.next-slide-btn');

  if (!slides.length || !heroContainer) return;

  let currentSlide = 0;
  const slideDuration = 6000; // 6 seconds per slide
  let slideTimer = null;
  let progressStartTime = 0;
  let remainingTime = slideDuration;
  let isPaused = false;

  // --- Slide Activation & Transitions ---
  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const isActive = i === currentSlide;
      slide.classList.toggle('active', isActive);
      // Reset any open book on inactive slides
      slide.querySelectorAll('.hero-book-3d').forEach(b => b.classList.remove('is-open'));
      if (isActive) {
        // Trigger reflow to restart CSS animations
        void slide.offsetWidth;
      }
    });

    indicatorNums.forEach((num, i) => {
      num.classList.toggle('active', i === currentSlide);
    });

    // Reset progress bars
    progressBars.forEach((bar, i) => {
      bar.classList.remove('running');
      bar.style.width = i < currentSlide ? '100%' : '0%';
    });

    // Start progress animation for current slide
    if (progressBars[currentSlide]) {
      setTimeout(() => {
        if (!isPaused && progressBars[currentSlide]) {
          progressBars[currentSlide].classList.add('running');
        }
      }, 50);
    }

    startSlideTimer(slideDuration);
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startSlideTimer(duration) {
    clearTimeout(slideTimer);
    progressStartTime = Date.now();
    remainingTime = duration;

    slideTimer = setTimeout(() => {
      nextSlide();
    }, duration);
  }

  function pauseSlider() {
    if (isPaused) return;
    isPaused = true;
    clearTimeout(slideTimer);
    const elapsed = Date.now() - progressStartTime;
    remainingTime = Math.max(500, remainingTime - elapsed);

    // Pause CSS transition on progress bar
    if (progressBars[currentSlide]) {
      const computedWidth = window.getComputedStyle(progressBars[currentSlide]).width;
      progressBars[currentSlide].classList.remove('running');
      progressBars[currentSlide].style.width = computedWidth;
    }
  }

  function resumeSlider() {
    if (!isPaused) return;
    isPaused = false;
    progressStartTime = Date.now();

    if (progressBars[currentSlide]) {
      progressBars[currentSlide].style.transition = `width ${remainingTime}ms linear`;
      progressBars[currentSlide].style.width = '100%';
    }

    slideTimer = setTimeout(() => {
      if (progressBars[currentSlide]) {
        progressBars[currentSlide].style.transition = '';
      }
      nextSlide();
    }, remainingTime);
  }

  // --- Click & Navigation Event Listeners ---
  indicatorNums.forEach((num, i) => {
    num.addEventListener('click', () => {
      showSlide(i);
    });
  });

  progressTracks.forEach((track, i) => {
    track.addEventListener('click', () => {
      showSlide(i);
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); prevSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); nextSlide(); });

  // Hover to pause / resume
  heroContainer.addEventListener('mouseenter', () => {
    isHovering = true;
    pauseSlider();
  });
  heroContainer.addEventListener('mouseleave', () => {
    isHovering = false;
    targetRotX = 0;
    targetRotY = 0;
    resumeSlider();
  });

  // --- Touch Swipe Navigation ---
  let touchStartX = 0;
  let touchStartY = 0;
  heroContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    pauseSlider();
  }, { passive: true });

  heroContainer.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    resumeSlider();
  }, { passive: true });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    const rect = heroContainer.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isVisible) return;

    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });

  // --- Optimized 3D Mouse Parallax (Runs strictly on active hover) ---
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let isHovering = false;
  let animationFrameId = null;
  let heroRect = null;

  function updateParallax() {
    // Smooth spring interpolation
    currentRotX += (targetRotX - currentRotX) * 0.1;
    currentRotY += (targetRotY - currentRotY) * 0.1;

    const activeSlide = slides[currentSlide];
    if (activeSlide) {
      const book3D = activeSlide.querySelector('.hero-book-3d');
      const sheen = activeSlide.querySelector('.hero-book-sheen');
      const shadow = activeSlide.querySelector('.hero-book-shadow');
      const sunburst = activeSlide.querySelector('.hero-badge-sunburst, .hero-floating-badge');
      const chip = activeSlide.querySelector('.hero-floating-chip');

      if (book3D && !book3D.classList.contains('is-open')) {
        if (isHovering || Math.abs(currentRotX) > 0.05 || Math.abs(currentRotY) > 0.05) {
          book3D.style.transform = `rotateY(${currentRotY.toFixed(2)}deg) rotateX(${currentRotX.toFixed(2)}deg) translateY(-8px) scale(1.02)`;
        } else {
          book3D.style.transform = '';
        }
      }

      if (sheen) {
        sheen.style.opacity = isHovering ? '0.75' : '0.35';
      }

      if (shadow) {
        shadow.style.transform = isHovering ? `translateX(${-currentRotY * 1.2}px) scale(${1 + Math.abs(currentRotX) * 0.015})` : '';
      }

      if (sunburst) {
        sunburst.style.transform = isHovering ? `translateZ(50px) translateX(${currentRotY * 0.8}px) translateY(${currentRotX * 0.8}px)` : 'translateZ(40px)';
      }

      if (chip) {
        chip.style.transform = isHovering ? `translateZ(45px) translateX(${currentRotY * 0.6}px) translateY(${currentRotX * 0.6}px)` : 'translateZ(35px)';
      }
    }

    // Continue loop only if still hovering or decaying back to 0
    if (isHovering || Math.abs(currentRotX) > 0.05 || Math.abs(currentRotY) > 0.05) {
      animationFrameId = requestAnimationFrame(updateParallax);
    } else {
      animationFrameId = null;
      currentRotX = 0;
      currentRotY = 0;
    }
  }

  function startParallax() {
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(updateParallax);
    }
  }

  heroContainer.addEventListener('mouseenter', () => {
    isHovering = true;
    heroRect = heroContainer.getBoundingClientRect();
    startParallax();
  }, { passive: true });

  heroContainer.addEventListener('mousemove', (e) => {
    if (!heroRect) heroRect = heroContainer.getBoundingClientRect();
    const mouseX = e.clientX - heroRect.left;
    const mouseY = e.clientY - heroRect.top;

    const normX = (mouseX / heroRect.width) * 2 - 1;
    const normY = (mouseY / heroRect.height) * 2 - 1;

    targetRotY = normX * 14;
    targetRotX = -normY * 10;
    startParallax();
  }, { passive: true });

  heroContainer.addEventListener('mouseleave', () => {
    isHovering = false;
    heroRect = null;
    targetRotX = 0;
    targetRotY = 0;
    startParallax();
  }, { passive: true });

  // Interactive Open Book on Hover & Tap
  const bookStages = heroContainer.querySelectorAll('.hero-book-stage');
  bookStages.forEach(stage => {
    const book = stage.querySelector('.hero-book-3d');
    if (!book) return;

    stage.addEventListener('mouseenter', () => book.classList.add('is-open'), { passive: true });
    stage.addEventListener('mouseleave', () => book.classList.remove('is-open'), { passive: true });
    stage.addEventListener('click', (e) => {
      e.stopPropagation();
      book.classList.toggle('is-open');
    });
  });

  showSlide(0);
}

/* --------------------------------------------------------------------------
   6. QUICK VIEW MODAL
   -------------------------------------------------------------------------- */
function initQuickViewModal() {
  const modal = document.querySelector('.quick-view-modal');
  const closeBtn = document.querySelector('.modal-close-btn');

  if (!modal) return;

  document.addEventListener('click', (e) => {
    const qvBtn = e.target.closest('.quick-view-btn');
    if (qvBtn) {
      if (qvBtn.getAttribute('href') === '404.html') {
        window.location.href = '404.html';
        return;
      }
      e.preventDefault();
      const bookId = qvBtn.dataset.id || 'b1';
      openQuickView(bookId);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('is-open');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('is-open');
    }
  });
}

function openQuickView(bookId) {
  const modal = document.querySelector('.quick-view-modal');
  const book = BOOKS_DATA.find(b => b.id === bookId) || BOOKS_DATA[0];
  if (!modal || !book) return;

  const content = modal.querySelector('.modal-content-slot');
  if (content) {
    const isWishlisted = wishlist.includes(book.id);
    content.innerHTML = `
      <div style="border-radius: 12px; overflow: hidden; background: #F5F0E0; display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative;">
        <img src="${book.image}" alt="${book.title}" style="max-height: 360px; width: auto; object-fit: contain; filter: drop-shadow(0 14px 28px rgba(0,0,0,0.18)); border-radius: 4px;">
        ${book.badge ? `<span class="product-badge ${book.badge === 'NEW' ? 'badge-new' : ''}">${book.badge}</span>` : ''}
      </div>
      <div style="display: flex; flex-direction: column; justify-content: center;">
        <span class="product-category-tag" style="margin-bottom: 0.35rem;">${book.category}</span>
        <h2 style="font-family: var(--font-heading); font-size: 2.1rem; line-height: 1.25; margin-bottom: 0.35rem; color: var(--color-primary-dark);">${book.title}</h2>
        <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1.15rem;">By <strong style="color: var(--color-text-dark);">${book.author}</strong></p>
        
        <div style="font-family: var(--font-heading); font-size: 1.85rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1.15rem; display: flex; align-items: baseline; gap: 0.5rem;">
          $${book.price.toFixed(2)} ${book.oldPrice ? `<span style="font-size: 1.15rem; color: var(--color-text-muted); text-decoration: line-through; font-weight: normal;">$${book.oldPrice.toFixed(2)}</span>` : ''}
        </div>
        
        <p style="font-size: 0.92rem; color: var(--color-text-body); line-height: 1.65; margin-bottom: 1.35rem;">${book.desc}</p>
        
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; font-size: 0.85rem; color: var(--color-text-muted); border-top: 1px solid rgba(19, 29, 20, 0.08); border-bottom: 1px solid rgba(19, 29, 20, 0.08); padding: 0.75rem 0; flex-wrap: wrap;">
          <span><strong>Rating:</strong> ★ ${book.rating}</span>
          <span>•</span>
          <span><strong>Format:</strong> ${book.format}</span>
          <span>•</span>
          <span><strong>Pages:</strong> ${book.pages}</span>
        </div>
        
        <div style="display: flex; gap: 0.85rem; align-items: center;">
          <button class="btn btn-forest" onclick="addToCart('${book.id}', 1)" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.85rem 1.5rem;">
            <span class="material-symbols-outlined" style="font-size: 18px;">shopping_bag</span>
            <span>Add to Bag</span>
          </button>
          <button class="product-action-btn wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${book.id}" style="width: 48px; height: 48px; border-radius: 50%; border: 1px solid rgba(19, 29, 20, 0.15); display: flex; align-items: center; justify-content: center; background: white; cursor: pointer; color: ${isWishlisted ? '#FF5A5A' : '#131D14'};" title="Toggle Wishlist">
            <span class="material-symbols-outlined" style="font-size: 20px;">favorite</span>
          </button>
        </div>
      </div>
    `;
  }

  modal.classList.add('is-open');
}

/* --------------------------------------------------------------------------
   7. ACCORDIONS (Membership & FAQ)
   -------------------------------------------------------------------------- */
function initAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item, .accordion-card');
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger, .accordion-trigger-modern');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        const parent = item.parentElement;
        if (parent) {
          const siblings = parent.querySelectorAll('.accordion-item, .accordion-card');
          siblings.forEach(other => {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.accordion-trigger, .accordion-trigger-modern');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          });
        }
        if (!isActive) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        } else {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   8. MARQUEE
   -------------------------------------------------------------------------- */
function initMarquee() {
  // Built with CSS keyframe animation for max 60fps performance
}

/* --------------------------------------------------------------------------
   9. TOAST NOTIFICATIONS
   -------------------------------------------------------------------------- */
let toastContainer;

function initToast() {
  toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
}

function showToast(message) {
  if (!toastContainer) initToast();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg style="width: 20px; height: 20px; fill: var(--color-accent-lime); flex-shrink: 0;" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
    <span>${message}</span>
  `;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* --------------------------------------------------------------------------
   10. ADMIN DASHBOARD INTERACTIVITY
   -------------------------------------------------------------------------- */
function initAdminDashboard() {
  const addBookForm = document.getElementById('admin-add-book-form');
  const booksTableBody = document.getElementById('admin-books-table-body');

  if (booksTableBody) {
    renderAdminBooks();
  }

  if (addBookForm) {
    addBookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('new-book-title').value;
      const author = document.getElementById('new-book-author').value;
      const category = document.getElementById('new-book-category').value;
      const price = parseFloat(document.getElementById('new-book-price').value);

      const newId = 'b' + (BOOKS_DATA.length + 1);
      BOOKS_DATA.unshift({
        id: newId,
        title,
        author,
        category,
        price,
        image: 'images/book-1.webp',
        rating: 5.0,
        pages: 350,
        format: 'Hardcover',
        desc: 'New curated arrival in Stackly Books catalogue.'
      });

      renderAdminBooks();
      showToast(`Book "${title}" added to inventory!`);
      addBookForm.reset();

      const modal = document.getElementById('add-book-modal');
      if (modal) modal.classList.remove('is-open');
    });
  }
}

function renderAdminBooks() {
  const tbody = document.getElementById('admin-books-table-body');
  if (!tbody) return;

  tbody.innerHTML = BOOKS_DATA.slice(0, 8).map(book => `
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="${book.image}" alt="${book.title}" style="width: 36px; height: 50px; object-fit: cover; border-radius: 3px;">
          <div>
            <strong>${book.title}</strong>
            <div style="font-size: 0.8rem; color: var(--color-text-muted);">${book.format}</div>
          </div>
        </div>
      </td>
      <td>${book.author}</td>
      <td><span class="status-pill completed">${book.category}</span></td>
      <td><strong>$${book.price.toFixed(2)}</strong></td>
      <td>In Stock (42)</td>
      <td>
        <button onclick="deleteAdminBook('${book.id}')" style="color: var(--color-accent-coral); font-size: 0.85rem; font-weight: 700;">Delete</button>
      </td>
    </tr>
  `).join('');
}

function deleteAdminBook(id) {
  const idx = BOOKS_DATA.findIndex(b => b.id === id);
  if (idx > -1) {
    const deleted = BOOKS_DATA.splice(idx, 1)[0];
    renderAdminBooks();
    showToast(`Deleted "${deleted.title}" from store inventory`);
  }
}

/* --------------------------------------------------------------------------
   11. CUSTOMER DASHBOARD INTERACTIVITY
   -------------------------------------------------------------------------- */
function initCustomerDashboard() {
  const navTabs = document.querySelectorAll('.customer-nav-tab');
  const tabPanes = document.querySelectorAll('.customer-tab-pane');

  if (navTabs.length && tabPanes.length) {
    navTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const target = tab.dataset.target;
        navTabs.forEach(t => t.classList.remove('active'));
        tabPanes.forEach(p => p.style.display = 'none');

        tab.classList.add('active');
        const activePane = document.getElementById(target);
        if (activePane) activePane.style.display = 'block';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   12. SCROLL REVEAL & CARD DECORATIONS ENGINE
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.section-header, .product-card, .curated-banner, .service-card, .service-icon-box, .services-intro, .team-card, .testimonial-quote-box, .blog-card, .membership-plan-card, .trust-badge-item, .author-spotlight-card, .services-metrics-row'
  );

  revealElements.forEach((el, index) => {
    el.classList.add('reveal-fade-up');
    const parentGrid = el.closest('.product-grid-5, .product-grid-4, .product-grid-3, .team-grid, .blog-grid, .trust-badges-row, .services-section-grid, .services-cards-col');
    if (parentGrid) {
      const siblings = Array.from(parentGrid.children);
      const pos = siblings.indexOf(el);
      el.style.setProperty('--stagger-index', pos >= 0 ? pos : index % 5);
      el.style.transitionDelay = `${(pos >= 0 ? pos : index % 5) * 85}ms`;
    }
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

function initCardRatings() {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const buyBtn = card.querySelector('.btn-buy-now, .add-to-cart-btn, [data-id]');
    const info = card.querySelector('.product-info');
    if (!info || info.querySelector('.product-rating-row')) return;

    const bookId = buyBtn ? buyBtn.dataset.id : null;
    const book = BOOKS_DATA.find(b => b.id === bookId) || { rating: 4.8 };

    const ratingEl = document.createElement('div');
    ratingEl.className = 'product-rating-row';
    ratingEl.style.cssText = 'display: flex; align-items: center; justify-content: ' + (info.style.textAlign === 'center' ? 'center' : 'flex-start') + '; gap: 4px; font-size: 0.8rem; color: #FFB800; margin-bottom: 0.35rem;';
    ratingEl.innerHTML = `
      <span>★★★★★</span>
      <span style="font-weight: 700; color: var(--color-text-dark); margin-left: 2px; font-size: 0.82rem;">${book.rating ? book.rating.toFixed(1) : '4.8'}</span>
    `;

    const titleEl = info.querySelector('.product-title');
    if (titleEl) {
      info.insertBefore(ratingEl, titleEl);
    }
  });
}

/**
 * Ultra-Smooth RAF-Throttled 3D Tilt Engine
 * Eliminates layout thrashing, caches rect on enter, throttles style updates via rAF
 */
function attachSmoothTilt(elements, maxTilt = 5, scale = 1.02) {
  if (!elements) return;
  const list = typeof elements === 'string' ? document.querySelectorAll(elements) : (elements.length !== undefined ? elements : [elements]);
  if (!list.length) return;

  list.forEach(card => {
    let rect = null;
    let rAF = null;

    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
    }, { passive: true });

    card.addEventListener('mousemove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = ((y - centerY) / centerY) * -maxTilt;
      const rotY = ((x - centerX) / centerX) * maxTilt;

      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-6px) scale(${scale})`;
      });
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      if (rAF) cancelAnimationFrame(rAF);
      rect = null;
      card.style.transform = '';
    }, { passive: true });
  });
}

/**
 * Interactive 3D Card Hover Physics for Services Section
 */
function initServiceCards3D() {
  attachSmoothTilt('.service-icon-box', 6, 1.02);
}

/**
 * Interactive Testimonials Slider Engine
 */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-quote-box');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.prev-testimonial-btn');
  const nextBtn = document.querySelector('.next-testimonial-btn');
  const counterEl = document.getElementById('current-testimonial-num');
  const wrap = document.querySelector('.testimonial-carousel-wrap');

  if (!slides.length) return;

  let currentIdx = 0;
  let timer = null;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIdx = index;

    slides.forEach((slide, idx) => {
      slide.classList.toggle('is-active', idx === currentIdx);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('is-active', idx === currentIdx);
    });

    if (counterEl) {
      counterEl.textContent = String(currentIdx + 1).padStart(2, '0');
    }
  }

  function nextSlide() {
    showSlide(currentIdx + 1);
  }

  function prevSlide() {
    showSlide(currentIdx - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    timer = setInterval(nextSlide, 6500);
  }

  function stopAutoPlay() {
    if (timer) clearInterval(timer);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoPlay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoPlay(); });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAutoPlay();
    });
  });

  if (wrap) {
    wrap.addEventListener('mouseenter', stopAutoPlay);
    wrap.addEventListener('mouseleave', startAutoPlay);
  }

  startAutoPlay();
}

/**
 * Interactive Monthly / Annual Pricing Toggle
 */
function initPricingToggle() {
  const togglePill = document.getElementById('billing-toggle');
  const monthlyBtn = document.getElementById('billing-monthly-btn');
  const annualBtn = document.getElementById('billing-annual-btn');
  const tier2Val = document.querySelector('.price-tier-2');
  const tier3Val = document.querySelector('.price-tier-3');
  const tier2Period = document.querySelector('.price-period-tier-2');
  const tier3Period = document.querySelector('.price-period-tier-3');

  if (!togglePill) return;

  let isAnnual = false;

  function setBilling(annual) {
    isAnnual = annual;
    togglePill.classList.toggle('annual', isAnnual);
    if (monthlyBtn) monthlyBtn.classList.toggle('active', !isAnnual);
    if (annualBtn) annualBtn.classList.toggle('active', isAnnual);

    if (tier2Val) {
      tier2Val.textContent = isAnnual ? tier2Val.dataset.annual : tier2Val.dataset.monthly;
      if (tier2Period) tier2Period.textContent = isAnnual ? '/ month (billed annually)' : '/ month';
    }

    if (tier3Val) {
      tier3Val.textContent = isAnnual ? tier3Val.dataset.annual : tier3Val.dataset.monthly;
      if (tier3Period) tier3Period.textContent = isAnnual ? '/ year (save $30)' : '/ year';
    }
  }

  togglePill.addEventListener('click', () => setBilling(!isAnnual));
  if (monthlyBtn) monthlyBtn.addEventListener('click', () => setBilling(false));
  if (annualBtn) annualBtn.addEventListener('click', () => setBilling(true));
}

function initUnboxing3DCard() {
  attachSmoothTilt('#unboxing-stage-card', 6, 1.02);
}

function initPatronCards3D() {
  attachSmoothTilt('.patron-review-card', 5, 1.01);
}

function initAboutStory3DCard() {
  attachSmoothTilt('#about-story-card', 6, 1.02);
}

function initAboutMetrics3D() {
  attachSmoothTilt('.about-metric-card', 5, 1.02);
}

function initValueCards3D() {
  attachSmoothTilt('.value-luxury-card', 5, 1.02);
}

function initSpacesCards3D() {
  attachSmoothTilt('.space-luxury-card', 5, 1.01);
}

function initCuratorCards3D() {
  attachSmoothTilt('.curator-luxury-card', 5, 1.02);
}

function initShopSpotlight3D() {
  attachSmoothTilt('#shop-spotlight-card', 6, 1.02);
}

/**
 * Dynamic Catalogue Filtering, Real-Time Search, Format/Price/Author Filters & Sorting
 */
function initShopCatalogueFilters() {
  const grid = document.getElementById('shop-product-grid');
  if (!grid) return;

  const categoryPills = document.querySelectorAll('.category-pill');
  const searchInput = document.getElementById('shop-search-input');
  const formatCheckboxes = document.querySelectorAll('.filter-format-chk');
  const priceRadios = document.querySelectorAll('input[name="price-filter"]');
  const authorCheckboxes = document.querySelectorAll('.filter-author-chk');
  const sortSelect = document.getElementById('shop-sort-select');
  const countDisplay = document.getElementById('shop-showing-count');
  const resetBtn = document.getElementById('shop-reset-filters-btn');

  const cards = Array.from(grid.querySelectorAll('.product-card'));
  if (!cards.length) return;

  // Preserve initial cards order for 'featured' sort
  const originalOrder = [...cards];

  function applyFilters() {
    // 1. Current category
    const activePill = document.querySelector('.category-pill.active');
    const selectedCategory = activePill ? (activePill.dataset.category || 'all').toLowerCase() : 'all';

    // 2. Search keyword
    const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';

    // 3. Checked formats
    const checkedFormats = Array.from(formatCheckboxes)
      .filter(chk => chk.checked)
      .map(chk => chk.value.toLowerCase());

    // 4. Selected price range
    const selectedPriceRadio = document.querySelector('input[name="price-filter"]:checked');
    const priceFilterVal = selectedPriceRadio ? selectedPriceRadio.value : 'all';

    // 5. Checked authors
    const checkedAuthors = Array.from(authorCheckboxes)
      .filter(chk => chk.checked)
      .map(chk => chk.value.toLowerCase());

    let visibleCount = 0;
    const existingEmpty = grid.querySelector('.shop-empty-state');
    if (existingEmpty) existingEmpty.remove();

    cards.forEach((card) => {
      const cardCategory = (card.dataset.category || '').toLowerCase();
      const cardPrice = parseFloat(card.dataset.price) || 0;
      const cardFormat = (card.dataset.format || '').toLowerCase();
      const cardAuthor = (card.dataset.author || '').toLowerCase();
      const titleEl = card.querySelector('.product-title');
      const cardTitle = titleEl ? titleEl.textContent.toLowerCase() : '';

      // Test Category
      const matchCategory = (selectedCategory === 'all') || (cardCategory === selectedCategory);

      // Test Search
      const matchSearch = !searchQuery ||
        cardTitle.includes(searchQuery) ||
        cardAuthor.includes(searchQuery) ||
        cardCategory.includes(searchQuery);

      // Test Format
      const matchFormat = (checkedFormats.length === 0) || checkedFormats.some(f => cardFormat.includes(f));

      // Test Price
      let matchPrice = true;
      if (priceFilterVal === 'under-20') {
        matchPrice = cardPrice < 20;
      } else if (priceFilterVal === '20-35') {
        matchPrice = cardPrice >= 20 && cardPrice <= 35;
      } else if (priceFilterVal === 'above-35') {
        matchPrice = cardPrice > 35;
      }

      // Test Author
      const matchAuthor = (checkedAuthors.length === 0) || checkedAuthors.includes(cardAuthor);

      const isMatch = matchCategory && matchSearch && matchFormat && matchPrice && matchAuthor;

      if (isMatch) {
        card.style.display = '';
        card.classList.remove('animate-in');
        // Force reflow for staggered animation
        void card.offsetWidth;
        card.classList.add('animate-in');
        card.style.animationDelay = `${(visibleCount % 6) * 0.06}s`;
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.classList.remove('animate-in');
      }
    });

    // Update Counter Text
    if (countDisplay) {
      if (visibleCount === 0) {
        countDisplay.innerHTML = 'Showing <strong>0</strong> of <strong>' + cards.length + '</strong> curated volumes';
      } else {
        countDisplay.innerHTML = `Showing <strong>1–${visibleCount}</strong> of <strong>${cards.length}</strong> curated volumes`;
      }
    }

    // Handle Empty State
    if (visibleCount === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'shop-empty-state';
      emptyState.innerHTML = `
        <div class="shop-empty-icon">
          <span class="material-symbols-outlined">menu_book</span>
        </div>
        <h3 class="shop-empty-title">No Matching Volumes Found</h3>
        <p class="shop-empty-desc">We couldn't find any curated editions matching your selected filter criteria. Try broadening your search or reset filters to explore all titles.</p>
        <button id="empty-state-reset-btn" class="btn btn-forest" style="display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer;">
          <span class="material-symbols-outlined">restart_alt</span>
          <span>Reset All Filters</span>
        </button>
      `;
      grid.appendChild(emptyState);

      const emptyResetBtn = emptyState.querySelector('#empty-state-reset-btn');
      if (emptyResetBtn) {
        emptyResetBtn.addEventListener('click', resetAllFilters);
      }
    }
  }

  function applySort() {
    const sortVal = sortSelect ? sortSelect.value : 'featured';
    let sortedCards = [...cards];

    if (sortVal === 'price-asc') {
      sortedCards.sort((a, b) => (parseFloat(a.dataset.price) || 0) - (parseFloat(b.dataset.price) || 0));
    } else if (sortVal === 'price-desc') {
      sortedCards.sort((a, b) => (parseFloat(b.dataset.price) || 0) - (parseFloat(a.dataset.price) || 0));
    } else if (sortVal === 'rating-desc') {
      sortedCards.sort((a, b) => (parseFloat(b.dataset.rating) || 0) - (parseFloat(a.dataset.rating) || 0));
    } else {
      // 'featured'
      sortedCards = [...originalOrder];
    }

    // Re-append sorted cards
    sortedCards.forEach(card => grid.appendChild(card));
    applyFilters();
  }

  function resetAllFilters() {
    // Reset category pills
    categoryPills.forEach(p => {
      if ((p.dataset.category || '').toLowerCase() === 'all') {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    // Reset search
    if (searchInput) searchInput.value = '';

    // Reset formats
    formatCheckboxes.forEach(chk => {
      chk.checked = true;
    });

    // Reset price
    const allPriceRadio = document.querySelector('input[name="price-filter"][value="all"]');
    if (allPriceRadio) allPriceRadio.checked = true;

    // Reset authors
    authorCheckboxes.forEach(chk => {
      chk.checked = false;
    });

    // Reset sort
    if (sortSelect) sortSelect.value = 'featured';

    applySort();
    showToast('Filters have been reset to default');
  }

  // Bind Category Pills
  categoryPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      applyFilters();
    });
  });

  // Bind Search Input
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      applyFilters();
    });
  }

  // Bind Format Checkboxes
  formatCheckboxes.forEach(chk => {
    chk.addEventListener('change', applyFilters);
  });

  // Bind Price Radios
  priceRadios.forEach(radio => {
    radio.addEventListener('change', applyFilters);
  });

  // Bind Author Checkboxes
  authorCheckboxes.forEach(chk => {
    chk.addEventListener('change', applyFilters);
  });

  // Bind Sort Dropdown
  if (sortSelect) {
    sortSelect.addEventListener('change', applySort);
  }

  // Bind Reset Filters Button
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetAllFilters();
    });
  }

  // Initial animation trigger on catalogue cards
  cards.forEach((card, idx) => {
    card.classList.add('animate-in');
    card.style.animationDelay = `${(idx % 6) * 0.06}s`;
  });
}

/**
 * Live Countdown Timer for Flash Sale of the Week
 */
function initFlashSaleCountdown() {
  const hoursEl = document.getElementById('flash-timer-hours');
  const minsEl = document.getElementById('flash-timer-mins');
  const secsEl = document.getElementById('flash-timer-secs');

  if (!hoursEl || !minsEl || !secsEl) return;

  let totalSeconds = 23 * 3600 + 48 * 60 + 29;

  function updateTimer() {
    if (totalSeconds <= 0) {
      totalSeconds = 24 * 3600; // Reset for demo continuity
    } else {
      totalSeconds--;
    }

    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  setInterval(updateTimer, 1000);
}

/**
 * Filter Catalogue by Flash Sale Trigger
 */
function filterByFlashSale() {
  const salePill = document.querySelector('.category-pill[data-category="sale"]');
  if (salePill) {
    salePill.click();
    showToast('Browsing 30% OFF Flash Sale Volumes');
  }

  const catalogue = document.getElementById('catalogue-section');
  if (catalogue) {
    catalogue.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Filter Catalogue by Author Card Click
 */
function filterByAuthorName(authorName) {
  // 1. Reset category to all
  const allPill = document.querySelector('.category-pill[data-category="all"]');
  if (allPill) {
    document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
    allPill.classList.add('active');
  }

  // 2. Uncheck all authors except this author
  const authorCheckboxes = document.querySelectorAll('.filter-author-chk');
  authorCheckboxes.forEach(chk => {
    chk.checked = (chk.value.toLowerCase() === authorName.toLowerCase());
  });

  // 3. Trigger change event to run filter logic
  const activeChk = Array.from(authorCheckboxes).find(chk => chk.value.toLowerCase() === authorName.toLowerCase());
  if (activeChk) {
    activeChk.dispatchEvent(new Event('change'));
  }

  showToast(`Filtered catalogue for ${authorName}`);

  // 4. Smooth scroll to catalogue
  const catalogue = document.getElementById('catalogue-section');
  if (catalogue) {
    catalogue.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function initAuthorCards3D() {
  attachSmoothTilt('.author-card-modern', 5, 1.02);
}

function initContactCards3D() {
  attachSmoothTilt('.contact-channel-card, .schedule-column-card, .concierge-info-card', 4, 1.01);
}

/**
 * Contact Inquiry Form Custom JavaScript Validation Engine
 */
function handleContactInquiry(event) {
  if (event) event.preventDefault();

  const form = document.getElementById('luxury-contact-form');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const phoneInput = document.getElementById('contactPhone');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');
  const generalError = document.getElementById('contactGeneralError');
  const generalErrorText = document.getElementById('contactGeneralErrorText');

  let isValid = true;
  let firstErrorInput = null;

  // Clear previous errors
  clearAllContactErrors();

  // Validate Name (minimum 2 characters)
  const name = nameInput ? nameInput.value.trim() : '';
  if (!name || name.length < 2) {
    setContactFieldError('contactName', 'Please enter your full name (at least 2 characters).');
    if (!firstErrorInput) firstErrorInput = nameInput;
    isValid = false;
  }

  // Validate Email
  const email = emailInput ? emailInput.value.trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setContactFieldError('contactEmail', 'Please enter your email address.');
    if (!firstErrorInput) firstErrorInput = emailInput;
    isValid = false;
  } else if (!emailRegex.test(email)) {
    setContactFieldError('contactEmail', 'Please enter a valid email address (e.g. jane@example.com).');
    if (!firstErrorInput) firstErrorInput = emailInput;
    isValid = false;
  }

  // Validate Phone (optional, but if provided check minimum length)
  const phone = phoneInput ? phoneInput.value.trim() : '';
  if (phone && phone.replace(/[^0-9]/g, '').length < 7) {
    setContactFieldError('contactPhone', 'Please enter a valid phone number (at least 7 digits).');
    if (!firstErrorInput) firstErrorInput = phoneInput;
    isValid = false;
  }

  // Validate Subject
  const subject = subjectInput ? subjectInput.value.trim() : '';
  if (!subject) {
    setContactFieldError('contactSubject', 'Please select an inquiry topic.');
    if (!firstErrorInput) firstErrorInput = subjectInput;
    isValid = false;
  }

  // Validate Message (minimum 5 characters)
  const message = messageInput ? messageInput.value.trim() : '';
  if (!message || message.length < 5) {
    setContactFieldError('contactMessage', 'Please describe your inquiry (minimum 5 characters).');
    if (!firstErrorInput) firstErrorInput = messageInput;
    isValid = false;
  }

  if (!isValid) {
    if (firstErrorInput) {
      firstErrorInput.focus();
    }
    return false;
  }

  // All valid! Redirect directly to 404 error page only
  window.location.href = '404.html';
  return false;
}

function setContactFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + 'Error');
  if (input) {
    input.style.borderColor = '#E63946';
    input.style.boxShadow = '0 0 0 3px rgba(230, 57, 70, 0.15)';
  }
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
}

function clearContactError(fieldId) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + 'Error');
  const generalError = document.getElementById('contactGeneralError');
  if (input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
  }
  if (errorEl) {
    errorEl.style.display = 'none';
    errorEl.textContent = '';
  }
  if (generalError) {
    generalError.style.display = 'none';
  }
}

function clearAllContactErrors() {
  ['contactName', 'contactEmail', 'contactPhone', 'contactSubject', 'contactMessage'].forEach(clearContactError);
}

function initContactForm() {
  const form = document.getElementById('luxury-contact-form');
  if (!form) return;
  form.noValidate = true;
  form.addEventListener('submit', handleContactInquiry);
}

/**
 * VIP Literary Dispatch Custom JavaScript Validation Engine
 */
function handleNewsletterSubscribe(event) {
  if (event) event.preventDefault();
  const emailInput = document.getElementById('newsletterEmail');
  const errorBox = document.getElementById('newsletterError');
  const errorText = document.getElementById('newsletterErrorText');
  const termsCheckbox = document.getElementById('newsletterTerms');

  const email = emailInput ? emailInput.value.trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    if (errorBox && errorText) {
      errorText.textContent = 'Please enter your email address.';
      errorBox.style.display = 'flex';
    }
    if (typeof showToast === 'function') showToast('Please enter your email address.');
    if (emailInput) {
      emailInput.focus();
      emailInput.style.borderColor = '#E63946';
    }
    return false;
  }

  if (!emailRegex.test(email)) {
    if (errorBox && errorText) {
      errorText.textContent = 'Please enter a valid email address (e.g., reader@domain.com).';
      errorBox.style.display = 'flex';
    }
    if (typeof showToast === 'function') showToast('Please enter a valid email address.');
    if (emailInput) {
      emailInput.focus();
      emailInput.style.borderColor = '#E63946';
    }
    return false;
  }

  if (termsCheckbox && !termsCheckbox.checked) {
    if (errorBox && errorText) {
      errorText.textContent = 'Please agree to the Privacy Policy to subscribe.';
      errorBox.style.display = 'flex';
    }
    if (typeof showToast === 'function') showToast('Please agree to the Privacy Policy.');
    return false;
  }

  // All valid! Redirect directly to 404 error page only
  window.location.href = '404.html';
  return false;
}

function clearNewsletterError() {
  const errorBox = document.getElementById('newsletterError');
  const emailInput = document.getElementById('newsletterEmail');
  if (errorBox) errorBox.style.display = 'none';
  if (emailInput) emailInput.style.borderColor = '';
}
