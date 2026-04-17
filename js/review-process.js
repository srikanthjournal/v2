/**
 * review-process.js — Peer Review Process Page Scripts
 * IJITRA Journal Website
 */

document.addEventListener('DOMContentLoaded', () => {
  initStepHighlight();
  initProgressTracker();
  initReviewerForm();
});

/* ── STEP HIGHLIGHT ON HOVER ──────────────────────────────────────── */
function initStepHighlight() {
  const steps = document.querySelectorAll('.review-step-card');
  const nums  = document.querySelectorAll('.review-step-num');

  steps.forEach((card, i) => {
    card.addEventListener('mouseenter', () => {
      nums[i] && nums[i].style.setProperty('transform', 'scale(1.15)');
    });
    card.addEventListener('mouseleave', () => {
      nums[i] && nums[i].style.setProperty('transform', '');
    });
  });
}

/* ── PROGRESS TRACKER ─────────────────────────────────────────────── */
function initProgressTracker() {
  const form  = document.getElementById('trackerForm');
  const result = document.getElementById('trackerResult');
  if (!form || !result) return;

  const statuses = [
    { stage: 'Received',        detail: 'Your manuscript has been received and logged in our system.',        icon: '📨', color: '#27ae60' },
    { stage: 'Desk Review',     detail: 'The managing editor is performing initial scope and format checks.', icon: '🔍', color: '#2457b3' },
    { stage: 'Under Review',    detail: 'Your manuscript has been sent to peer reviewers.',                  icon: '🔬', color: '#7b2d9e' },
    { stage: 'Decision Pending', detail: 'Reviewer reports have been received and are being evaluated.',     icon: '⚖️', color: '#c8961e' },
    { stage: 'Revision Required', detail: 'Reviewer comments have been sent to you. Please revise.',        icon: '✏️', color: '#c0392b' },
    { stage: 'Accepted',        detail: 'Congratulations! Your manuscript has been formally accepted.',      icon: '🎉', color: '#27ae60' },
  ];

  form.addEventListener('submit', e => {
    e.preventDefault();
    const id = form.querySelector('input').value.trim();
    if (!id.startsWith('IJITRA-')) {
      result.innerHTML = `<div class="alert alert-danger"><span>❌</span><span>Invalid manuscript ID format. Please use the format IJITRA-YYYY-XXXX.</span></div>`;
      return;
    }

    // Simulate a random status
    const idx = Math.floor(Math.random() * statuses.length);
    const s   = statuses[idx];
    result.innerHTML = `
      <div style="background:white;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-top:16px;">
        <div style="background:${s.color};color:white;padding:14px 20px;display:flex;align-items:center;gap:10px;">
          <span style="font-size:22px;">${s.icon}</span>
          <div>
            <div style="font-weight:700;font-size:15px;">${id}</div>
            <div style="font-size:13px;opacity:0.9;">Current Status: <strong>${s.stage}</strong></div>
          </div>
        </div>
        <div style="padding:16px 20px;font-size:13.5px;color:var(--text-mid);">
          <p>${s.detail}</p>
          <p style="margin-top:8px;font-size:12px;color:var(--text-light);">Last updated: ${new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</p>
          <p style="margin-top:6px;font-size:12px;color:var(--text-light);">For queries, email <a href="mailto:editor@ijitra.com" style="color:var(--blue-accent);">editor@ijitra.com</a> with your manuscript ID.</p>
        </div>
      </div>`;
  });
}

/* ── REVIEWER SIGNUP FORM ─────────────────────────────────────────── */
function initReviewerForm() {
  const form = document.getElementById('quickReviewerForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (window.showToast) window.showToast('Reviewer application received! We will respond within 5 business days.', 'success');
    form.reset();
  });
}
