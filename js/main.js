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
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('open');
}

// Mobile dropdown toggle
document.addEventListener('click', (e) => {
  const dropdownToggle = e.target.closest('.nav-links > li > a[data-dropdown]');
  if (dropdownToggle && window.innerWidth <= 768) {
    e.preventDefault();
    const li = dropdownToggle.parentElement;
    li.classList.toggle('dropdown-open');
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const navLinks = document.querySelector('.nav-links');
  const toggle = document.querySelector('.mobile-toggle');
  if (navLinks && navLinks.classList.contains('open') && !navLinks.contains(e.target) && !toggle.contains(e.target)) {
    navLinks.classList.remove('open');
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
