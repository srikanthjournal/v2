/**
 * ethics.js — Ethics & Policy Page Scripts
 * IJITRA Journal Website
 */

document.addEventListener('DOMContentLoaded', () => {
  initPolicyTabs();
  initSectionHighlight();
  initPrintPolicy();
  initEthicsSearch();
});

/* ── POLICY TABS ──────────────────────────────────────────────────── */
function initPolicyTabs() {
  const tabs = document.querySelectorAll('.policy-tab-btn');
  const sections = document.querySelectorAll('.policy-section');

  if (!tabs.length) return;

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;

      tabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      sections.forEach(s => {
        s.style.display = s.dataset.section === target ? 'block' : 'none';
      });
    });
  });
}

/* ── SECTION HIGHLIGHT ON SCROLL ─────────────────────────────────── */
function initSectionHighlight() {
  const navLinks = document.querySelectorAll('.ethics-nav-link');
  if (!navLinks.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const id = e.target.id;
        const link = document.querySelector(`.ethics-nav-link[href="#${id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });

  document.querySelectorAll('[data-ethics-section]').forEach(el => io.observe(el));
}

/* ── PRINT POLICY ─────────────────────────────────────────────────── */
function initPrintPolicy() {
  const btn = document.getElementById('printPolicyBtn');
  if (btn) btn.addEventListener('click', () => window.print());
}

/* ── ETHICS QUICK SEARCH ──────────────────────────────────────────── */
function initEthicsSearch() {
  const input = document.getElementById('ethicsSearch');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    const blocks = document.querySelectorAll('.policy-block');

    blocks.forEach(block => {
      if (!q) {
        block.style.display = '';
        return;
      }
      const text = block.textContent.toLowerCase();
      block.style.display = text.includes(q) ? '' : 'none';
    });

    // Show "no results" message
    const noResults = document.getElementById('ethicsNoResults');
    if (noResults) {
      const visible = [...blocks].some(b => b.style.display !== 'none');
      noResults.style.display = (q && !visible) ? 'block' : 'none';
    }
  });
}

/* ── COPY POLICY TEXT ─────────────────────────────────────────────── */
function copyPolicySection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const text = section.innerText;
  navigator.clipboard.writeText(text).then(() => {
    if (window.showToast) window.showToast('Policy text copied to clipboard.', 'success');
  });
}

/* ── DOWNLOAD PDF STUB ────────────────────────────────────────────── */
function downloadPolicyPDF() {
  if (window.showToast) {
    window.showToast('Preparing Ethics & Policy PDF for download…', 'info');
    setTimeout(() => {
      window.showToast('PDF download ready. Check your Downloads folder.', 'success');
    }, 2000);
  }
}

/* Expose globals */
window.copyPolicySection  = copyPolicySection;
window.downloadPolicyPDF  = downloadPolicyPDF;
