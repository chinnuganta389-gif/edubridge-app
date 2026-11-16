/**
 * EduBridge - Authentication & Session Management Client
 * Handles student registration, login, logout, profile state, and header integration
 */

const EduAuth = {
  currentUser: null,
  token: localStorage.getItem('edubridge_token') || null,

  async init() {
    await this.checkAuth();
    this.updateHeaderUI();
  },

  async checkAuth() {
    try {
      const headers = {};
      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      const res = await fetch('/api/auth/me', { headers });
      const data = await res.json();

      if (data.authenticated && data.user) {
        this.currentUser = data.user;
        if (data.user.preferred_language && data.user.preferred_language !== currentLang) {
          setLanguage(data.user.preferred_language);
        }
      } else {
        this.currentUser = null;
      }
    } catch (err) {
      console.warn('Auth check failed:', err);
      this.currentUser = null;
    }
  },

  async login(email, password) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed.');
      }

      this.currentUser = data.user;
      this.token = data.token;
      localStorage.setItem('edubridge_token', data.token);

      if (data.user.preferred_language) {
        setLanguage(data.user.preferred_language);
      }

      this.updateHeaderUI();
      return { success: true, user: data.user, message: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async register(userData) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed.');
      }

      this.currentUser = data.user;
      this.token = data.token;
      localStorage.setItem('edubridge_token', data.token);

      if (data.user.preferred_language) {
        setLanguage(data.user.preferred_language);
      }

      this.updateHeaderUI();
      return { success: true, user: data.user, message: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async updateProfile(updates) {
    if (!this.currentUser) return;
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (res.ok && data.user) {
        this.currentUser = data.user;
        this.updateHeaderUI();
        return { success: true, user: data.user };
      }
    } catch (err) {
      console.error('Update profile failed:', err);
    }
  },

  async logout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    }
    this.currentUser = null;
    this.token = null;
    localStorage.removeItem('edubridge_token');
    this.updateHeaderUI();
    window.location.href = 'index.html';
  },

  updateHeaderUI() {
    const authActionsContainer = document.getElementById('navAuthActions');
    if (!authActionsContainer) return;

    if (this.currentUser) {
      const isAdmin = this.currentUser.role === 'admin';
      const displayName = this.currentUser.name.split(' ')[0];

      authActionsContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.35rem;">
          <a href="${isAdmin ? 'admin.html' : 'dashboard.html'}" class="btn btn-outline btn-sm" style="padding:0.35rem 0.55rem; font-size:0.78rem;" title="My Profile & Learning Space">
            👤 ${displayName} ${isAdmin ? '(Admin)' : ''}
          </a>
          <button onclick="EduAuth.logout()" class="btn btn-sm" style="padding:0.35rem 0.55rem; font-size:0.78rem; background:#fee2e2; color:#b91c1c; border-color:#fca5a5;" title="Logout">
            ⎋
          </button>
        </div>
      `;
    } else {
      authActionsContainer.innerHTML = `
        <a href="login.html" class="btn btn-primary btn-sm">
          <span>Login / Register</span>
        </a>
      `;
    }
  }
};

window.EduAuth = EduAuth;

document.addEventListener('DOMContentLoaded', () => {
  EduAuth.init();
});
