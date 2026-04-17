/**
 * apc.js — Article Processing Charges Page Scripts
 * IJITRA Journal Website
 */

document.addEventListener('DOMContentLoaded', () => {
  initFAQ();
  initCurrencyConverter();
  initWaiverForm();
});

/* ── FAQ ACCORDION ────────────────────────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q    = item.querySelector('.faq-q');
    const a    = item.querySelector('.faq-a');
    const icon = item.querySelector('.faq-icon');

    if (!q || !a) return;

    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(open => {
        open.classList.remove('open');
        open.querySelector('.faq-a').style.maxHeight = null;
        const ic = open.querySelector('.faq-icon');
        if (ic) ic.textContent = '+';
      });

      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
        if (icon) icon.textContent = '−';
      }
    });
  });
}

/* ── CURRENCY CONVERTER ───────────────────────────────────────────── */
function initCurrencyConverter() {
  const converter = document.getElementById('currencyConverter');
  if (!converter) return;

  // APC amounts in USD
  const rates = {
    USD: 1,
    INR: 83.2,
    EUR: 0.92,
    GBP: 0.79,
    SGD: 1.34,
    AED: 3.67,
    SAR: 3.75,
    BDT: 110,
    PKR: 278,
  };

  const apcUSD = { india: 30, saarc: 60, intl: 100, special: 36 };

  const select = document.getElementById('currencySelect');
  if (!select) return;

  // Populate options
  Object.keys(rates).forEach(code => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = code;
    if (code === 'INR') opt.selected = true;
    select.appendChild(opt);
  });

  function updatePrices() {
    const currency = select.value;
    const rate     = rates[currency] || 1;
    const symbol   = { USD: '$', INR: '₹', EUR: '€', GBP: '£', SGD: 'S$', AED: 'AED', SAR: 'SAR', BDT: '৳', PKR: '₨' }[currency] || currency + ' ';

    Object.entries(apcUSD).forEach(([key, usd]) => {
      const el = document.getElementById('price-' + key);
      if (el) {
        const val = Math.round(usd * rate);
        el.textContent = symbol + val.toLocaleString();
      }
    });
  }

  select.addEventListener('change', updatePrices);
  updatePrices();
}

/* ── WAIVER REQUEST FORM ──────────────────────────────────────────── */
function initWaiverForm() {
  const form = document.getElementById('waiverForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (window.showToast) {
      window.showToast('Waiver request submitted. You will receive a response within 3 business days.', 'success');
    }
    form.reset();
  });
}

/* ── PAYMENT METHOD SELECTOR ─────────────────────────────────────── */
function selectPaymentMethod(method) {
  const methods = document.querySelectorAll('.payment-method-card');
  const details = document.querySelectorAll('.payment-detail');

  methods.forEach(m => m.classList.toggle('active', m.dataset.method === method));
  details.forEach(d => {
    d.style.display = d.dataset.method === method ? 'block' : 'none';
  });
}

window.selectPaymentMethod = selectPaymentMethod;
