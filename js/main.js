// ============================================
// MEGA REALTY — Global JS
// ============================================

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }
});

// Mobile menu toggle
function toggleMobileMenu() {
  const navLeft = document.querySelector('.nav-left');
  const navRight = document.querySelector('.nav-right');
  const toggle = document.querySelector('.mobile-toggle');
  const isOpen = navLeft && navLeft.classList.contains('open');
  
  if (navLeft) navLeft.classList.toggle('open');
  if (navRight) navRight.classList.toggle('open');
  if (toggle) toggle.classList.toggle('active');
  
  // Toggle hamburger to X
  if (toggle) {
    const spans = toggle.querySelectorAll('span');
    if (!isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      document.body.style.overflow = 'hidden';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
      document.body.style.overflow = '';
    }
  }
}

// Mobile dropdown toggle
document.addEventListener('click', (e) => {
  const dropdownToggle = e.target.closest('[data-dropdown]');
  if (dropdownToggle && window.innerWidth <= 768) {
    e.preventDefault();
    const li = dropdownToggle.parentElement;
    li.classList.toggle('dropdown-open');
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const navLeft = document.querySelector('.nav-left');
  const navRight = document.querySelector('.nav-right');
  const toggle = document.querySelector('.mobile-toggle');
  if (navLeft && navLeft.classList.contains('open') && !navLeft.contains(e.target) && !navRight.contains(e.target) && !toggle.contains(e.target)) {
    navLeft.classList.remove('open');
    if (navRight) navRight.classList.remove('open');
  }
});

// Scroll reveal animation
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
});
