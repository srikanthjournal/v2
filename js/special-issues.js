/**
 * special-issues.js — Special Issues Page Scripts
 * IJITRA Journal Website
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initProposalForm();
  initFilterTabs();
});

/* ── COUNTDOWN TIMER ──────────────────────────────────────────────── */
function initCountdown() {
  const deadlines = {
    'countdown-si4': new Date('2025-05-30T23:59:59'),
    'countdown-si5': new Date('2025-07-15T23:59:59'),
  };

  Object.entries(deadlines).forEach(([id, deadline]) => {
    const el = document.getElementById(id);
    if (!el) return;

    function update() {
      const now  = new Date();
      const diff = deadline - now;
      if (diff <= 0) { el.textContent = 'Deadline passed'; return; }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      el.textContent = `${d}d ${h}h ${m}m remaining`;
    }
    update();
    setInterval(update, 60000);
  });
}

/* ── PROPOSAL FORM ────────────────────────────────────────────────── */
function initProposalForm() {
  const form = document.getElementById('proposalForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    btn.disabled = true;
    btn.textContent = 'Submitting…';

    setTimeout(() => {
      form.innerHTML = `
        <div style="text-align:center; padding:24px 0;">
          <div style="font-size:40px; margin-bottom:12px;">✅</div>
          <h3 style="color:white; font-family:'EB Garamond',serif; font-size:22px; margin-bottom:8px;">Proposal Received!</h3>
          <p style="color:#a8c0df; font-size:14px;">Thank you for your interest in guest editing a special issue. Our editorial team will review your proposal and respond within 10 business days.</p>
        </div>`;
    }, 1800);
  });
}

/* ── FILTER TABS ──────────────────────────────────────────────────── */
function initFilterTabs() {
  const btns  = document.querySelectorAll('.si-filter-btn');
  const cards = document.querySelectorAll('.si-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const status = card.dataset.status;
        card.style.display = (filter === 'all' || status === filter) ? '' : 'none';
      });
    });
  });
}
