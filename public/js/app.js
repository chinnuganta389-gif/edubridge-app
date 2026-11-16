/**
 * EduBridge - Main Application Logic
 * Resource cards, visit tracking, bookmarking, global search, and UI utilities
 */

const EduApp = {
  // Toast notifications
  toast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    toast.innerHTML = `<span><strong>${icon}</strong> ${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  },

  // Track visit and open genuine educational website in new tab (Prompt #15 & #20)
  async openPlatform(id, url) {
    try {
      const headers = {};
      const token = localStorage.getItem('edubridge_token');
      if (token) headers['Authorization'] = `Bearer ${token}`;

      fetch(`/api/resources/${id}/visit`, { method: 'POST', headers }).catch(() => {});
    } catch (e) {
      // ignore
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  },

  // Toggle bookmark / save to favourites
  async toggleBookmark(resourceId, btnElement) {
    const token = localStorage.getItem('edubridge_token');
    if (!token || !window.EduAuth || !window.EduAuth.currentUser) {
      this.toast('Please login or register to save this website to your personal dashboard!', 'info');
      setTimeout(() => {
        if (confirm('Would you like to login to bookmark and track your learning progress?')) {
          window.location.href = 'login.html';
        }
      }, 300);
      return;
    }

    try {
      const res = await fetch('/api/bookmarks/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ resource_id: resourceId })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update bookmark');

      if (data.bookmarked) {
        if (btnElement) {
          btnElement.classList.add('bookmarked');
          btnElement.innerHTML = '❤️';
          btnElement.setAttribute('title', 'Remove from Saved');
        }
        this.toast('Saved to your dashboard bookmarks! ⭐', 'success');
      } else {
        if (btnElement) {
          btnElement.classList.remove('bookmarked');
          btnElement.innerHTML = '🤍';
          btnElement.setAttribute('title', 'Save to Favourites');
        }
        this.toast('Removed from saved bookmarks.', 'info');
      }

      // If on dashboard, re-render bookmarks
      if (window.loadDashboardData) {
        window.loadDashboardData();
      }
    } catch (err) {
      this.toast(err.message, 'error');
    }
  },

  // Generate platform initial or logo representation
  getPlatformLogoHtml(res) {
    const name = res.name || 'Platform';
    const initial = name.charAt(0).toUpperCase();

    // Specific brand colors
    let bg = 'linear-gradient(135deg, #1e40af, #3b82f6)';
    if (name.includes('W3Schools')) bg = 'linear-gradient(135deg, #04aa6d, #28a745)';
    else if (name.includes('GeeksforGeeks')) bg = 'linear-gradient(135deg, #2f8d46, #0f5132)';
    else if (name.includes('HackerRank')) bg = 'linear-gradient(135deg, #00ea64, #008744)';
    else if (name.includes('LeetCode')) bg = 'linear-gradient(135deg, #ffa116, #d97706)';
    else if (name.includes('CodeChef')) bg = 'linear-gradient(135deg, #663300, #935116)';
    else if (name.includes('freeCodeCamp')) bg = 'linear-gradient(135deg, #0a0a23, #1b1b32)';
    else if (name.includes('NPTEL') || name.includes('SWAYAM')) bg = 'linear-gradient(135deg, #ea580c, #c2410c)';
    else if (name.includes('Coursera')) bg = 'linear-gradient(135deg, #0056d2, #1d4ed8)';
    else if (name.includes('IBM')) bg = 'linear-gradient(135deg, #054ada, #002d9c)';
    else if (name.includes('Infosys')) bg = 'linear-gradient(135deg, #007cc3, #004b75)';
    else if (name.includes('Microsoft')) bg = 'linear-gradient(135deg, #00a4ef, #7fba00)';
    else if (name.includes('Cisco')) bg = 'linear-gradient(135deg, #1ba0d7, #0d274d)';
    else if (name.includes('IndiaBIX')) bg = 'linear-gradient(135deg, #4f46e5, #4338ca)';
    else if (name.includes('Gate Smashers')) bg = 'linear-gradient(135deg, #dc2626, #b91c1c)';

    return `
      <div class="platform-logo-box" style="background: ${bg}; color: #ffffff;">
        ${initial}
      </div>
    `;
  },

  // Build standard resource card HTML
  renderResourceCard(r) {
    const isTe = currentLang === 'te';
    const desc = isTe && r.telugu_description ? r.telugu_description : r.description;
    const isBookmarked = r.is_bookmarked || false;

    // Badges
    let priceClass = 'badge-free';
    if (r.pricing.includes('Freemium')) priceClass = 'badge-freemium';
    else if (r.pricing.includes('Audit')) priceClass = 'badge-audit';

    let levelClass = 'badge-beginner';
    if (r.skill_level === 'Intermediate') levelClass = 'badge-intermediate';
    else if (r.skill_level === 'Advanced') levelClass = 'badge-advanced';

    // Topics list
    const topics = Array.isArray(r.supported_topics) ? r.supported_topics : [];
    const topicsHtml = topics.slice(0, 3).map(t => `<span class="topic-chip">${t}</span>`).join('');

    // Telugu helper tip if in English mode
    const teluguSnippet = (!isTe && r.telugu_description) ? `
      <div class="card-telugu-tip">
        <strong>తెలుగు సూచన:</strong> ${r.telugu_description}
      </div>
    ` : '';

    return `
      <div class="resource-card" data-id="${r.id}" data-category="${r.category}">
        <div class="card-top-bar">
          <div class="platform-identity">
            ${this.getPlatformLogoHtml(r)}
            <div class="platform-title-area">
              <h3>${r.name}</h3>
              <span class="platform-category-label">${r.category.replace('_', ' ')}</span>
            </div>
          </div>
          <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" 
                  onclick="EduApp.toggleBookmark(${r.id}, this)"
                  title="${isBookmarked ? 'Saved to bookmarks' : 'Save to favourites'}">
            ${isBookmarked ? '❤️' : '🤍'}
          </button>
        </div>

        <div class="card-badges">
          <span class="badge ${priceClass}">● ${r.pricing}</span>
          <span class="badge ${levelClass}">${r.skill_level}</span>
        </div>

        <p class="card-description">${desc}</p>

        ${teluguSnippet}

        <div class="card-topics-list">
          ${topicsHtml}
        </div>

        <div class="card-action-bar">
          <div class="card-pricing-note" title="${r.pricing_details || ''}">
            ${r.pricing_details || 'Verified educational resource'}
          </div>
          <button onclick="EduApp.openPlatform(${r.id}, '${r.url}')" class="btn btn-open-platform">
            <span>${t('btn_open_platform')}</span> ↗
          </button>
        </div>
      </div>
    `;
  },

  // Setup mobile navigation toggle
  setupMobileNav() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    if (menuBtn && navMenu) {
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navMenu.classList.toggle('open');
        menuBtn.textContent = isOpen ? '✕' : '☰';
        menuBtn.setAttribute('aria-expanded', isOpen);
      });

      // Close on link click
      navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          menuBtn.textContent = '☰';
          menuBtn.setAttribute('aria-expanded', 'false');
        });
      });

      // Close on clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.site-header')) {
          navMenu.classList.remove('open');
          menuBtn.textContent = '☰';
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  },

  // Setup search forms
  setupGlobalSearch() {
    const heroSearchForm = document.getElementById('heroSearchForm');
    if (heroSearchForm) {
      heroSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('heroSearchInput');
        const q = input ? input.value.trim() : '';
        if (q) {
          window.location.href = `explore.html?search=${encodeURIComponent(q)}`;
        }
      });
    }
  }
};

window.EduApp = EduApp;

document.addEventListener('DOMContentLoaded', () => {
  EduApp.setupMobileNav();
  EduApp.setupGlobalSearch();
});
