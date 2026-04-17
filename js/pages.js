/**
 * pages.js — JavaScript for Login, Register, Search,
 *            Announcements, Sitemap, Dashboard, 404 pages
 * IJITRA Journal Website
 */

document.addEventListener('DOMContentLoaded', () => {
  /* Route to page-specific init */
  const page = location.pathname.split('/').pop();

  if (page === 'login.html'    || document.getElementById('loginForm'))    initLogin();
  if (page === 'register.html' || document.getElementById('registerForm')) initRegister();
  if (page === 'search.html'   || document.getElementById('searchResults')) initSearch();
  if (page === 'dashboard.html'|| document.getElementById('dashTabs'))     initDashboard();
  if (page === 'announcements.html') initAnnouncements();

  initGlobalNav();
  initToast();
});

/* ── GLOBAL NAV ACTIVE STATE ──────────────────────────────────────── */
function initGlobalNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if ((link.getAttribute('href') || '') === page) link.classList.add('active');
  });

  /* Search bar in nav */
  const inp = document.getElementById('searchInput');
  const btn = document.getElementById('searchBtn');
  function goSearch() {
    const q = inp ? inp.value.trim() : '';
    if (q.length > 1) location.href = `search.html?q=${encodeURIComponent(q)}`;
  }
  if (btn) btn.addEventListener('click', goSearch);
  if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') goSearch(); });
}

/* ── LOGIN ────────────────────────────────────────────────────────── */
function initLogin() {
  const form   = document.getElementById('loginForm');
  const toggle = document.getElementById('pwToggle');
  const pw     = document.getElementById('loginPw');

  if (toggle && pw) {
    toggle.addEventListener('click', () => {
      const show = pw.type === 'password';
      pw.type = show ? 'text' : 'password';
      toggle.textContent = show ? '🙈' : '👁️';
    });
  }

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email    = form.querySelector('[type=email]').value;
      const password = pw ? pw.value : '';
      if (!email || !password) { showToast('Please enter your email and password.', 'error'); return; }

      const btn = form.querySelector('[type=submit]');
      btn.disabled = true; btn.textContent = 'Signing in…';
      setTimeout(() => {
        showToast('Login successful! Redirecting to dashboard…', 'success');
        setTimeout(() => location.href = 'dashboard.html', 1200);
      }, 1400);
    });
  }
}

/* ── REGISTER ─────────────────────────────────────────────────────── */
function initRegister() {
  const form    = document.getElementById('registerForm');
  const pwField = document.getElementById('regPw');
  const pwConf  = document.getElementById('regPwConf');
  const bar     = document.getElementById('strengthFill');
  const text    = document.getElementById('strengthText');
  const toggle  = document.getElementById('regPwToggle');

  if (toggle && pwField) {
    toggle.addEventListener('click', () => {
      const show = pwField.type === 'password';
      pwField.type = show ? 'text' : 'password';
      toggle.textContent = show ? '🙈' : '👁️';
    });
  }

  if (pwField && bar && text) {
    pwField.addEventListener('input', () => {
      const val = pwField.value;
      let score = 0;
      if (val.length >= 8)  score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;
      const colors = ['#e74c3c','#e67e22','#f1c40f','#27ae60'];
      const labels = ['Weak','Fair','Good','Strong'];
      bar.style.width  = (score * 25) + '%';
      bar.style.background = colors[score - 1] || '#e0e0e0';
      text.textContent = val ? labels[score - 1] || '' : '';
    });
  }

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (pwField && pwConf && pwField.value !== pwConf.value) {
        showToast('Passwords do not match.', 'error'); return;
      }
      const btn = form.querySelector('[type=submit]');
      btn.disabled = true; btn.textContent = 'Creating account…';
      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align:center;padding:30px 0;">
            <div style="font-size:48px;margin-bottom:16px;">🎉</div>
            <h3 style="font-family:'EB Garamond',Georgia,serif;font-size:22px;color:var(--navy);margin-bottom:8px;">Account Created!</h3>
            <p style="font-size:13.5px;color:var(--text-mid);line-height:1.7;">
              A verification email has been sent to your registered address.<br>
              Please verify your email to activate your account.
            </p>
            <a href="login.html" style="display:inline-block;margin-top:20px;background:var(--blue-accent);color:white;padding:11px 28px;border-radius:4px;font-size:14px;font-weight:600;">Go to Login →</a>
          </div>`;
      }, 1800);
    });
  }
}

/* ── SEARCH ───────────────────────────────────────────────────────── */
function initSearch() {
  const params  = new URLSearchParams(location.search);
  const q       = params.get('q') || '';

  /* Fill search inputs with query */
  document.querySelectorAll('.search-query-fill').forEach(el => {
    if (el.tagName === 'INPUT') el.value = q;
    else el.textContent = q ? `"${q}"` : '';
  });

  /* Update result heading */
  const heading = document.getElementById('resultHeading');
  if (heading) heading.textContent = q ? `Search Results for "${q}"` : 'Browse All Articles';

  /* Filter chips */
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      // In a real app, this would re-query the server
    });
  });

  /* Sort select */
  const sortSel = document.getElementById('sortSelect');
  if (sortSel) {
    sortSel.addEventListener('change', () => {
      showToast(`Sorting by: ${sortSel.options[sortSel.selectedIndex].text}`, 'info');
    });
  }

  /* New search from results page */
  const newSearchBtn = document.getElementById('newSearchBtn');
  const newSearchInp = document.getElementById('newSearchInput');
  if (newSearchBtn && newSearchInp) {
    function doSearch() {
      const nq = newSearchInp.value.trim();
      if (nq.length > 1) location.href = `search.html?q=${encodeURIComponent(nq)}`;
    }
    newSearchBtn.addEventListener('click', doSearch);
    newSearchInp.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
  }
}

/* ── DASHBOARD ────────────────────────────────────────────────────── */
function initDashboard() {
  const tabs    = document.querySelectorAll('.dash-tab-btn');
  const panes   = document.querySelectorAll('.dash-pane');

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = document.querySelector(`.dash-pane[data-pane="${btn.dataset.tab}"]`);
      if (pane) pane.classList.add('active');
    });
  });

  /* Withdraw submission */
  document.querySelectorAll('.btn-withdraw').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Are you sure you want to withdraw this submission?')) {
        btn.closest('.submission-row').style.opacity = '0.4';
        showToast('Withdrawal request submitted. The editorial office will confirm within 24 hours.', 'warning');
      }
    });
  });
}

/* ── ANNOUNCEMENTS ────────────────────────────────────────────────── */
function initAnnouncements() {
  const filterBtns = document.querySelectorAll('.ann-filter-btn');
  const cards      = document.querySelectorAll('.ann-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.type;
      cards.forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.type === filter) ? '' : 'none';
      });
    });
  });
}

/* ── TOAST ────────────────────────────────────────────────────────── */
function initToast() { /* expose globally */ window.showToast = showToast; }

function showToast(msg, type = 'info') {
  const colors = { info: '#2457b3', success: '#27ae60', error: '#c0392b', warning: '#c8961e' };
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed;bottom:24px;right:24px;z-index:9999;
    background:${colors[type]||'#2457b3'};color:#fff;
    padding:13px 20px;border-radius:4px;font-size:13.5px;font-family:'DM Sans',sans-serif;
    box-shadow:0 6px 24px rgba(0,0,0,0.25);animation:fadeInUp 0.3s ease;max-width:340px;line-height:1.5;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity='0'; toast.style.transition='opacity 0.3s'; setTimeout(()=>toast.remove(),350); }, 3800);
}
