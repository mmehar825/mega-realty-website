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
  let overlay = document.getElementById('mobileMenuOverlay');
  const toggle = document.querySelector('.mobile-toggle');
  
  if (overlay) {
    // Close menu
    overlay.remove();
    document.body.style.overflow = '';
    if (toggle) {
      toggle.querySelectorAll('span').forEach((s,i) => {
        s.style.transform = 'none';
        s.style.opacity = '1';
      });
    }
    return;
  }
  
  // Build menu from nav-left and nav-right
  overlay = document.createElement('div');
  overlay.id = 'mobileMenuOverlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100vh;background:rgba(255,255,255,0.99);backdrop-filter:blur(20px);z-index:1001;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:20px 32px;overflow-y:auto;';
  
  // Gather all menu items
  const navLeft = document.querySelector('.nav-left');
  const navRight = document.querySelector('.nav-right');
  const items = [];
  
  if (navLeft) {
    navLeft.querySelectorAll(':scope > li').forEach(li => {
      items.push(li.cloneNode(true));
    });
  }
  if (navRight) {
    navRight.querySelectorAll(':scope > li').forEach(li => {
      items.push(li.cloneNode(true));
    });
  }
  
  const list = document.createElement('ul');
  list.style.cssText = 'list-style:none;padding:0;margin:0;width:100%;text-align:center;';
  
  items.forEach(li => {
    li.style.cssText = 'width:100%;text-align:center;';
    const a = li.querySelector(':scope > a');
    if (a) {
      if (a.classList.contains('nav-cta')) {
        a.style.cssText = 'display:block;padding:16px 32px;font-size:18px;font-weight:700;background:var(--burgundy);color:white;border-radius:12px;text-decoration:none;margin-top:16px;';
      } else {
        a.style.cssText = 'display:block;padding:14px 8px;font-size:20px;font-weight:600;color:#333;text-decoration:none;';
      }
    }
    // Handle dropdowns
    const dropdown = li.querySelector('.nav-dropdown');
    if (dropdown) {
      dropdown.style.cssText = 'display:none;background:rgba(0,0,0,0.03);border-radius:8px;padding:4px;margin:0 0 4px;';
      dropdown.querySelectorAll('a').forEach(da => {
        da.style.cssText = 'display:block;padding:12px 16px;color:#666;font-size:17px;text-decoration:none;text-align:center;';
      });
      const toggle = li.querySelector('[data-dropdown]');
      if (toggle) {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });
      }
    }
    list.appendChild(li);
  });
  
  overlay.appendChild(list);
  
  // Close on click outside
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) toggleMobileMenu();
  });
  
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  
  // Animate hamburger to X
  if (toggle) {
    const spans = toggle.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
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
