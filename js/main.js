// ============================================
// MEGA REALTY — Global JS (Clean)
// ============================================

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 80);
});

// ============================================
// MOBILE FULLSCREEN MENU
// ============================================
function toggleMobileMenu() {
  const existing = document.getElementById('mobileMenuOverlay');
  const btn = document.querySelector('.mobile-toggle');

  // --- CLOSE ---
  if (existing) {
    existing.style.opacity = '0';
    setTimeout(() => existing.remove(), 200);
    document.body.style.overflow = '';
    resetHamburger(btn);
    return;
  }

  // --- OPEN: build overlay from scratch ---
  const overlay = document.createElement('div');
  overlay.id = 'mobileMenuOverlay';
  overlay.style.cssText = `
    position:fixed;inset:0;width:100%;height:100dvh;
    background:#fff;z-index:1001;
    display:flex;flex-direction:column;align-items:center;
    padding:100px 40px 40px;overflow-y:auto;
    opacity:0;transition:opacity 0.25s ease;
  `;

  // Build one clean list of ALL nav items
  const ul = document.createElement('ul');
  ul.style.cssText = 'list-style:none;padding:0;margin:0;width:100%;max-width:320px;';

  const navs = document.querySelectorAll('.nav-left > li, .nav-right > li');
  let activeDropdown = null;

  navs.forEach((origLi, i) => {
    const li = document.createElement('li');
    li.style.cssText = `
      text-align:center;
      opacity:0;transform:translateY(10px);
      transition:opacity 0.3s ease ${i * 0.04}s, transform 0.3s ease ${i * 0.04}s;
    `;

    const origA = origLi.querySelector(':scope > a');
    const origDrop = origLi.querySelector('.nav-dropdown');

    // Create link
    const a = document.createElement('a');
    a.href = origA ? origA.getAttribute('href') : '#';
    a.innerHTML = origA ? origA.innerHTML : '';

    if (origA && origA.classList.contains('nav-cta')) {
      // CTA button
      a.style.cssText = `
        display:block;padding:16px;margin-top:20px;
        background:#6f1e1c;color:#fff;border-radius:12px;
        text-decoration:none;font-size:18px;font-weight:700;
        font-family:'DM Sans',sans-serif;text-align:center;
      `;
      a.addEventListener('click', () => toggleMobileMenu());
    } else if (origDrop) {
      // Has dropdown
      a.style.cssText = `
        display:block;padding:14px 8px;font-size:21px;font-weight:700;
        color:#333;text-decoration:none;cursor:pointer;
        font-family:'Outfit',sans-serif;
      `;

      // Build dropdown container
      const dropWrap = document.createElement('div');
      dropWrap.style.cssText = `
        max-height:0;overflow:hidden;
        transition:max-height 0.35s cubic-bezier(0.33,1,0.68,1);
        background:#f7f5f2;border-radius:12px;margin:4px 0 8px;
      `;

      origDrop.querySelectorAll('a').forEach(origDA => {
        const da = document.createElement('a');
        da.href = origDA.getAttribute('href');
        da.textContent = origDA.textContent;
        da.style.cssText = `
          display:block;padding:13px 16px;color:#555;
          font-size:16px;text-decoration:none;text-align:center;
          font-family:'DM Sans',sans-serif;
          transition:color 0.15s ease;
        `;
        da.addEventListener('click', () => toggleMobileMenu());
        dropWrap.appendChild(da);
      });

      a.addEventListener('click', (e) => {
        e.preventDefault();

        // Close previous if different
        if (activeDropdown && activeDropdown.wrap !== dropWrap) {
          activeDropdown.wrap.style.maxHeight = '0';
          const pa = activeDropdown.arrow;
          if (pa) pa.style.transform = 'rotate(0deg)';
        }

        const isOpen = dropWrap.style.maxHeight !== '0px' && dropWrap.style.maxHeight !== '0' && dropWrap.style.maxHeight !== '';

        if (isOpen) {
          dropWrap.style.maxHeight = '0';
          activeDropdown = null;
        } else {
          dropWrap.style.maxHeight = dropWrap.scrollHeight + 20 + 'px';
          activeDropdown = { wrap: dropWrap, arrow: a.querySelector('.arrow') };
        }

        // Arrow animation
        const arrow = a.querySelector('.arrow');
        if (arrow) {
          arrow.style.cssText = `
            display:inline-block;
            transition:transform 0.3s cubic-bezier(0.33,1,0.68,1);
            transform:rotate(${isOpen ? '0deg' : '180deg'});
          `;
        }
      });

      li.appendChild(a);
      li.appendChild(dropWrap);
      ul.appendChild(li);
      return; // skip the normal append below
    } else {
      // Regular link
      a.style.cssText = `
        display:block;padding:14px 8px;font-size:21px;font-weight:700;
        color:#333;text-decoration:none;
        font-family:'Outfit',sans-serif;
      `;
      a.addEventListener('click', () => toggleMobileMenu());
    }

    li.appendChild(a);
    ul.appendChild(li);
  });

  overlay.appendChild(ul);

  // Close on tap outside the list
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) toggleMobileMenu();
  });

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      ul.querySelectorAll(':scope > li').forEach(li => {
        li.style.opacity = '1';
        li.style.transform = 'translateY(0)';
      });
    });
  });

  // Hamburger → X
  animateHamburger(btn);
}

function animateHamburger(btn) {
  if (!btn) return;
  const s = btn.querySelectorAll('span');
  s[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
  s[1].style.opacity = '0';
  s[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
}

function resetHamburger(btn) {
  if (!btn) return;
  const s = btn.querySelectorAll('span');
  s[0].style.transform = 'none';
  s[1].style.opacity = '1';
  s[2].style.transform = 'none';
}

// ============================================
// DESKTOP dropdown toggle (hover handled by CSS, 
// this is only for click on mobile outside overlay — disabled)
// ============================================

// ============================================
// SCROLL REVEAL
// ============================================
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
