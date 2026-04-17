/**
 * IJITRA Journal Website — Main JavaScript
 */

/* ── DOM READY ─────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initMobileNav();
  initSearch();
  initStickyHeader();
  initAnimations();
  setActiveNavLink();
  initAccordion();
  initTooltips();
  initCopyDOI();
  initCounterAnimation();
});

/* ── ACTIVE NAV LINK ─────────────────────────────────────────────── */
function setActiveNavLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) link.classList.add('active');
  });
}

/* ── TABS ────────────────────────────────────────────────────────── */
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    const paneContainer = tabGroup.nextElementSibling;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (paneContainer) {
          paneContainer.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.toggle('active', pane.dataset.tab === target);
          });
        }
      });
    });
  });
}

/* ── MOBILE NAV ──────────────────────────────────────────────────── */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.textContent = menu.classList.contains('open') ? '✕' : '☰';
  });

  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      toggle.textContent = '☰';
    }
  });
}

/* ── STICKY HEADER ───────────────────────────────────────────────── */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.style.boxShadow = y > 20
      ? '0 4px 28px rgba(0,0,0,0.4)'
      : '0 3px 24px rgba(0,0,0,0.35)';
    lastY = y;
  }, { passive: true });
}

/* ── SEARCH ──────────────────────────────────────────────────────── */
function initSearch() {
  const form   = document.getElementById('searchForm');
  const input  = document.getElementById('searchInput');
  const btn    = document.getElementById('searchBtn');

  function doSearch() {
    const q = input ? input.value.trim() : '';
    if (q.length < 2) return;
    window.location.href = `search.html?q=${encodeURIComponent(q)}`;
  }

  if (btn)  btn.addEventListener('click', doSearch);
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

  // Search results page
  if (location.pathname.includes('search.html')) {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    const resultHeading = document.getElementById('searchResultHeading');
    const searchInputPage = document.getElementById('searchInputPage');
    if (resultHeading) resultHeading.textContent = `Results for: "${q}"`;
    if (searchInputPage) searchInputPage.value = q;
  }
}

/* ── ANIMATIONS (Intersection Observer) ─────────────────────────── */
function initAnimations() {
  const els = document.querySelectorAll('[data-animate]');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('fade-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
}

/* ── ACCORDION ───────────────────────────────────────────────────── */
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item    = header.parentElement;
      const body    = item.querySelector('.accordion-body');
      const icon    = header.querySelector('.acc-icon');
      const isOpen  = item.classList.contains('open');

      // Close all siblings
      item.parentElement.querySelectorAll('.accordion-item.open').forEach(open => {
        open.classList.remove('open');
        open.querySelector('.accordion-body').style.maxHeight = null;
        const ic = open.querySelector('.acc-icon');
        if (ic) ic.textContent = '+';
      });

      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        if (icon) icon.textContent = '−';
      }
    });
  });
}

/* ── TOOLTIPS ────────────────────────────────────────────────────── */
function initTooltips() {
  const tip = document.createElement('div');
  tip.id = 'tooltip';
  tip.style.cssText = `
    position:fixed; background:#1a1a2e; color:#fff; font-size:12px;
    padding:6px 11px; border-radius:4px; pointer-events:none;
    opacity:0; transition:opacity 0.2s; z-index:9999; max-width:220px;
    box-shadow:0 4px 16px rgba(0,0,0,0.3);
  `;
  document.body.appendChild(tip);

  document.querySelectorAll('[data-tip]').forEach(el => {
    el.addEventListener('mouseenter', e => {
      tip.textContent = el.dataset.tip;
      tip.style.opacity = '1';
    });
    el.addEventListener('mousemove', e => {
      tip.style.left = e.clientX + 14 + 'px';
      tip.style.top  = e.clientY - 30 + 'px';
    });
    el.addEventListener('mouseleave', () => { tip.style.opacity = '0'; });
  });
}

/* ── COPY DOI ────────────────────────────────────────────────────── */
function initCopyDOI() {
  document.querySelectorAll('.copy-doi').forEach(btn => {
    btn.addEventListener('click', () => {
      const doi = btn.dataset.doi;
      navigator.clipboard.writeText(doi).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✓ Copied';
        btn.style.color = '#27ae60';
        setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 2000);
      });
    });
  });
}

/* ── COUNTER ANIMATION ───────────────────────────────────────────── */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseFloat(el.dataset.count);
      const dec = el.dataset.dec ? parseInt(el.dataset.dec) : 0;
      const suf = el.dataset.suffix || '';
      const dur = 1600;
      const step = 16;
      const steps = dur / step;
      const increment = end / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) { current = end; clearInterval(timer); }
        el.textContent = dec > 0 ? current.toFixed(dec) + suf : Math.round(current) + suf;
      }, step);

      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
}

/* ── SUBMISSION FORM ─────────────────────────────────────────────── */
function initSubmissionForm() {
  const form = document.getElementById('submissionForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = form.querySelectorAll('[required]');
    let valid = true;

    fields.forEach(f => {
      f.style.borderColor = '';
      if (!f.value.trim()) {
        f.style.borderColor = '#c0392b';
        valid = false;
      }
    });

    if (!valid) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Simulate submission
    const btn = form.querySelector('[type=submit]');
    btn.disabled = true;
    btn.textContent = 'Submitting…';

    setTimeout(() => {
      form.innerHTML = `
        <div class="alert alert-success" style="font-size:15px;padding:22px 24px;">
          <span style="font-size:24px;">✓</span>
          <div>
            <strong>Manuscript Submitted Successfully!</strong><br>
            Your submission has been received. You will get a confirmation email within 24 hours.
            Your manuscript ID is <strong>IJITRA-2025-${Math.floor(Math.random()*9000)+1000}</strong>.
          </div>
        </div>`;
    }, 1800);
  });
}

/* ── TOAST NOTIFICATION ──────────────────────────────────────────── */
function showToast(message, type = 'info') {
  const colors = { info: '#2457b3', success: '#27ae60', error: '#c0392b', warning: '#c8961e' };
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:9999;
    background:${colors[type]}; color:#fff; padding:13px 20px;
    border-radius:4px; font-size:13.5px; box-shadow:0 6px 24px rgba(0,0,0,0.25);
    animation:fadeInUp 0.3s ease; max-width:320px;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3800);
}

/* ── NEWSLETTER FORM ─────────────────────────────────────────────── */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input[type=email]').value;
    if (!email) return;
    showToast('Thank you! You have been subscribed to our newsletter.', 'success');
    form.reset();
  });
}

/* ── CONTACT FORM ────────────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Message sent! We will respond within 2 business days.', 'success');
    form.reset();
  });
}

/* ── PRINT ARTICLE ───────────────────────────────────────────────── */
function printArticle() { window.print(); }

/* ── EXPORT CITATION ─────────────────────────────────────────────── */
function exportCitation(format) {
  const citations = {
    apa: `Sharma, P., Gupta, R. K., & Singh, A. (2025). Deep learning-based intrusion detection system for IoT networks. IJITRA, 3(2), 1–14. https://doi.org/10.12345/ijitra.2025.3.2.001`,
    mla: `Sharma, Priya, et al. "Deep Learning-Based Intrusion Detection System for IoT Networks." IJITRA, vol. 3, no. 2, 2025, pp. 1–14.`,
    bibtex: `@article{sharma2025dl,\n  title={Deep learning-based IDS for IoT},\n  author={Sharma, P. and Gupta, R. K. and Singh, A.},\n  journal={IJITRA},\n  volume={3},\n  number={2},\n  pages={1--14},\n  year={2025}\n}`,
  };

  const box = document.getElementById('citationBox');
  const text = document.getElementById('citationText');
  if (box && text) {
    text.textContent = citations[format] || '';
    box.style.display = 'block';
  }
}

/* ── EXPOSE GLOBALS ──────────────────────────────────────────────── */
window.showToast       = showToast;
window.printArticle    = printArticle;
window.exportCitation  = exportCitation;
window.initSubmissionForm = initSubmissionForm;
window.initNewsletter  = initNewsletter;
window.initContactForm = initContactForm;

/* Trigger page-specific inits */
if (document.getElementById('submissionForm')) initSubmissionForm();
if (document.getElementById('newsletterForm'))  initNewsletter();
if (document.getElementById('contactForm'))     initContactForm();
