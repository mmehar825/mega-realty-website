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
    // Animate out
    overlay.style.opacity = '0';
    overlay.style.transform = 'scale(0.98)';
    setTimeout(() => {
      if (overlay.parentNode) overlay.remove();
    }, 250);
    document.body.style.overflow = '';
    if (toggle) {
      toggle.querySelectorAll('span').forEach(s => {
        s.style.transform = 'none';
        s.style.opacity = '1';
      });
    }
    return;
  }
  
  // Build overlay
  overlay = document.createElement('div');
  overlay.id = 'mobileMenuOverlay';
  Object.assign(overlay.style, {
    position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
    width: '100%', height: '100vh',
    background: 'rgba(255,255,255,0.99)',
    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
    zIndex: '1001',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
    paddingTop: '100px', paddingBottom: '40px',
    paddingLeft: '32px', paddingRight: '32px',
    overflowY: 'auto',
    opacity: '0', transform: 'scale(0.98)',
    transition: 'opacity 0.3s cubic-bezier(0.16,1,0.3,1), transform 0.3s cubic-bezier(0.16,1,0.3,1)'
  });
  
  // Gather items from both nav lists
  const navLeft = document.querySelector('.nav-left');
  const navRight = document.querySelector('.nav-right');
  const allItems = [];
  [navLeft, navRight].forEach(nav => {
    if (!nav) return;
    nav.querySelectorAll(':scope > li').forEach(li => allItems.push(li.cloneNode(true)));
  });
  
  const list = document.createElement('ul');
  Object.assign(list.style, {
    listStyle: 'none', padding: '0', margin: '0', width: '100%', textAlign: 'center'
  });
  
  let openDropdown = null;
  
  allItems.forEach((li, idx) => {
    Object.assign(li.style, {
      width: '100%', textAlign: 'center',
      opacity: '0', transform: 'translateY(12px)',
      transition: `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${idx * 0.05}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${idx * 0.05}s`
    });
    
    const a = li.querySelector(':scope > a');
    if (a) {
      if (a.classList.contains('nav-cta')) {
        Object.assign(a.style, {
          display: 'block', padding: '16px 32px', fontSize: '18px', fontWeight: '700',
          background: '#6f1e1c', color: 'white', borderRadius: '12px',
          textDecoration: 'none', marginTop: '20px',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        });
        a.addEventListener('touchstart', () => { a.style.transform = 'scale(0.97)'; });
        a.addEventListener('touchend', () => { a.style.transform = 'scale(1)'; });
      } else {
        Object.assign(a.style, {
          display: 'block', padding: '16px 8px', fontSize: '22px', fontWeight: '700',
          color: '#333', textDecoration: 'none',
          transition: 'color 0.2s ease'
        });
      }
    }
    
    // Dropdown accordion
    const dropdown = li.querySelector('.nav-dropdown');
    if (dropdown) {
      Object.assign(dropdown.style, {
        position: 'static',
        opacity: '1',
        visibility: 'visible',
        transform: 'none',
        maxHeight: '0', overflow: 'hidden',
        transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
        background: 'rgba(0,0,0,0.02)', borderRadius: '12px',
        margin: '4px 0', padding: '0',
        boxShadow: 'none', minWidth: '100%'
      });
      dropdown.querySelectorAll('a').forEach(da => {
        Object.assign(da.style, {
          display: 'block', padding: '12px 16px', color: '#666',
          fontSize: '17px', textDecoration: 'none', textAlign: 'center',
          transition: 'color 0.2s ease'
        });
      });
      
      const dropToggle = li.querySelector('[data-dropdown]');
      if (dropToggle) {
        dropToggle.addEventListener('click', (e) => {
          e.preventDefault();
          // Close any other open dropdown
          if (openDropdown && openDropdown !== dropdown) {
            openDropdown.style.maxHeight = '0';
            const prevArrow = openDropdown.parentElement.querySelector('.arrow');
            if (prevArrow) prevArrow.style.transform = 'rotate(0deg)';
          }
          
          const isOpen = dropdown.style.maxHeight !== '0px' && dropdown.style.maxHeight !== '0';
          if (isOpen) {
            dropdown.style.maxHeight = '0';
            openDropdown = null;
          } else {
            dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
            openDropdown = dropdown;
          }
          
          // Rotate arrow
          const arrow = dropToggle.querySelector('.arrow');
          if (arrow) {
            arrow.style.transition = 'transform 0.3s cubic-bezier(0.16,1,0.3,1)';
            arrow.style.display = 'inline-block';
            arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
          }
        });
      }
    }
    
    // Close menu on link click (non-dropdown)
    if (a && !li.querySelector('.nav-dropdown')) {
      a.addEventListener('click', () => toggleMobileMenu());
    }
    // Also close on dropdown child link click
    if (dropdown) {
      dropdown.querySelectorAll('a').forEach(da => {
        da.addEventListener('click', () => toggleMobileMenu());
      });
    }
    
    list.appendChild(li);
  });
  
  overlay.appendChild(list);
  
  // Close on background tap
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) toggleMobileMenu();
  });
  
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  
  // Animate in
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
    overlay.style.transform = 'scale(1)';
    // Stagger items
    list.querySelectorAll(':scope > li').forEach(li => {
      li.style.opacity = '1';
      li.style.transform = 'translateY(0)';
    });
  });
  
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
