/**
 * IJITRA — Shared Header & Footer HTML
 * Injected into every page via components.js
 */

const HEADER_HTML = `
<div class="topbar">
  <div class="topbar-inner">
    <div class="topbar-left">
      <span class="issn-badge">ISSN: 2584-8119 (Online)</span>
      <span class="topbar-divider">|</span>
      <span>Peer-Reviewed &nbsp;·&nbsp; Open Access &nbsp;·&nbsp; DOI: 10.12345/ijitra</span>
    </div>
    <div class="topbar-right">
      <a href="index.html">Home</a>
      <a href="login.html">Login</a>
      <a href="register.html">Register</a>
      <a href="contact.html">Contact</a>
    </div>
  </div>
</div>

<header class="site-header">
  <div class="header-brand-row">
    <div class="journal-logo">
      <div class="logo-abbr">IJ</div>
      <div class="logo-sub">ITRA</div>
    </div>
    <div class="journal-title-block">
      <div class="journal-abbr-name"><span>IJITRA</span></div>
      <div class="journal-full-name">International Journal of Innovative Technology, Innovation and Research Applications</div>
    </div>
    <div class="header-actions">
      <a href="submit.html" class="btn-submit">✦ Submit Manuscript</a>
      <div class="header-metrics">
        <span><span class="metric-dot"></span> Impact Factor: 6.142</span>
        <span><span class="metric-dot"></span> H-Index: 14</span>
        <span><span class="metric-dot"></span> CiteScore: 4.8</span>
      </div>
    </div>
  </div>
  <nav class="main-nav">
    <div class="nav-inner">
      <a href="index.html" class="nav-link">Home</a>
      <div class="nav-item">
        <a href="about.html" class="nav-link">About <span class="arrow">▾</span></a>
        <div class="dropdown">
          <a href="about.html">About IJITRA</a>
          <a href="editorial-board.html">Editorial Board</a>
          <a href="ethics.html">Ethics & Policy</a>
          <a href="indexing.html">Indexing</a>
        </div>
      </div>
      <a href="editorial-board.html" class="nav-link">Editorial Board</a>
      <div class="nav-item">
        <a href="current-issue.html" class="nav-link">Issues <span class="arrow">▾</span></a>
        <div class="dropdown">
          <a href="current-issue.html">Current Issue</a>
          <a href="archives.html">Archives</a>
          <a href="special-issues.html">Special Issues</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="guidelines.html" class="nav-link">For Authors <span class="arrow">▾</span></a>
        <div class="dropdown">
          <a href="guidelines.html">Author Guidelines</a>
          <a href="submit.html">Submit Manuscript</a>
          <a href="review-process.html">Review Process</a>
          <a href="apc.html">APC / Charges</a>
        </div>
      </div>
      <a href="indexing.html" class="nav-link">Indexing</a>
      <a href="contact.html" class="nav-link">Contact</a>
      <div class="nav-search-wrap">
        <input id="searchInput" class="nav-search-input" type="text" placeholder="Search articles…">
        <button id="searchBtn" class="nav-search-btn">Search</button>
      </div>
    </div>
  </nav>
</header>`;

const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-top">
    <div class="footer-grid">
      <div class="footer-brand-col">
        <div class="f-abbr">
          <div style="background:linear-gradient(135deg,#c8961e,#e8b84b);color:#0a1628;width:36px;height:36px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:900;font-size:14px;flex-shrink:0;">IJ</div>
          IJITRA
        </div>
        <p>International Journal of Innovative Technology, Innovation and Research Applications is a peer-reviewed, open-access multidisciplinary journal publishing original research in technology and engineering sciences. Published quarterly since 2022.</p>
        <div class="footer-contact">
          <span>📧 <a href="mailto:editor@ijitra.com">editor@ijitra.com</a></span>
          <span>📞 +91-11-XXXX-XXXX</span>
          <span>🏢 Publication Office, New Delhi – 110001, India</span>
        </div>
        <div class="social-links">
          <a href="#" class="social-btn s-fb">Facebook</a>
          <a href="#" class="social-btn s-li">LinkedIn</a>
          <a href="#" class="social-btn s-tw">Twitter</a>
          <a href="#" class="social-btn s-yt">YouTube</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Journal</h4>
        <ul>
          <li><a href="about.html">About IJITRA</a></li>
          <li><a href="editorial-board.html">Editorial Board</a></li>
          <li><a href="ethics.html">Peer Review Policy</a></li>
          <li><a href="ethics.html">Publication Ethics</a></li>
          <li><a href="about.html#oa">Open Access Policy</a></li>
          <li><a href="ethics.html#plagiarism">Plagiarism Policy</a></li>
          <li><a href="ethics.html#retraction">Retraction Policy</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Authors</h4>
        <ul>
          <li><a href="guidelines.html">Author Guidelines</a></li>
          <li><a href="submit.html">Submit Manuscript</a></li>
          <li><a href="submit.html#track">Track Submission</a></li>
          <li><a href="guidelines.html#template">Article Template</a></li>
          <li><a href="apc.html">APC Information</a></li>
          <li><a href="review-process.html">Review Process</a></li>
          <li><a href="contact.html">FAQs</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Content</h4>
        <ul>
          <li><a href="current-issue.html">Current Issue</a></li>
          <li><a href="archives.html">All Archives</a></li>
          <li><a href="special-issues.html">Special Issues</a></li>
          <li><a href="archives.html#cited">Most Cited</a></li>
          <li><a href="archives.html#downloaded">Most Downloaded</a></li>
          <li><a href="indexing.html">Indexing</a></li>
          <li><a href="contact.html">Announcements</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-bottom-left">
      © 2025 IJITRA — International Journal of Innovative Technology & Research Applications. All rights reserved.
    </div>
    <div class="footer-bottom-right">
      <span class="cc-badge">CC BY 4.0</span>
      <a href="ethics.html">Privacy Policy</a>
      <a href="ethics.html">Terms of Use</a>
      <a href="sitemap.html">Sitemap</a>
    </div>
  </div>
</footer>`;

/* Inject header and footer */
(function () {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = HEADER_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;
})();
