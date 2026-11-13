/**
 * EduBridge - Administrator Dashboard Controller
 * Resource CRUD, student feedback reviews, category statistics
 */

const EduAdmin = {
  currentEditId: null,

  async init() {
    const token = localStorage.getItem('edubridge_token');
    if (!token) {
      window.location.href = 'login.html';
      return;
    }

    await window.EduAuth.checkAuth();
    if (!window.EduAuth.currentUser || window.EduAuth.currentUser.role !== 'admin') {
      alert('Access restricted to Administrators. Please login with admin credentials (admin@edubridge.org / admin123).');
      window.location.href = 'login.html';
      return;
    }

    this.loadStats();
    this.loadResources();
    this.loadFeedback();
  },

  async loadStats() {
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${window.EduAuth.token}` }
      });
      const data = await res.json();

      document.getElementById('statTotalResources').textContent = data.totalResources;
      document.getElementById('statTotalUsers').textContent = data.totalUsers;
      document.getElementById('statTotalVisits').textContent = data.totalVisits;
      document.getElementById('statTotalFeedback').textContent = data.totalFeedback;
      document.getElementById('statPendingFeedback').textContent = data.pendingFeedback;
    } catch (e) {
      console.error('Stats error:', e);
    }
  },

  async loadResources() {
    const tableBody = document.getElementById('resourcesTableBody');
    tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Loading resources...</td></tr>';

    try {
      const cat = document.getElementById('adminCategoryFilter').value;
      const search = document.getElementById('adminSearchInput').value.trim();

      let url = '/api/resources?limit=100';
      if (cat && cat !== 'all') url += `&category=${cat}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.resources && data.resources.length > 0) {
        tableBody.innerHTML = data.resources.map(r => `
          <tr>
            <td><strong>#${r.id}</strong></td>
            <td>
              <div style="font-weight:700; color:var(--gray-900);">${r.name}</div>
              <a href="${r.url}" target="_blank" style="font-size:0.78rem; color:var(--primary-600);">${r.url}</a>
            </td>
            <td><span class="badge" style="background:#e0e7ff; color:#3730a3;">${r.category}</span></td>
            <td><span class="badge badge-beginner">${r.skill_level}</span></td>
            <td><span class="badge badge-free">${r.pricing}</span></td>
            <td>
              <div style="display:flex; gap:0.4rem;">
                <button onclick="EduAdmin.openEditModal(${r.id})" class="btn btn-sm btn-outline" title="Edit Resource">✏️ Edit</button>
                <button onclick="EduAdmin.deleteResource(${r.id}, '${r.name.replace(/'/g, "\\'")}')" class="btn btn-sm" style="background:#fee2e2; color:#b91c1c; border-color:#fca5a5;" title="Delete">🗑️</button>
              </div>
            </td>
          </tr>
        `).join('');
      } else {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:1.5rem;">No resources found.</td></tr>';
      }
    } catch (e) {
      tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:red;">Failed to load resources.</td></tr>';
    }
  },

  openAddModal() {
    this.currentEditId = null;
    document.getElementById('resourceModalTitle').textContent = 'Add New Educational Resource';
    document.getElementById('resourceForm').reset();
    document.getElementById('resIdInput').value = '';
    document.getElementById('resourceModal').classList.add('active');
  },

  async openEditModal(id) {
    this.currentEditId = id;
    document.getElementById('resourceModalTitle').textContent = `Edit Educational Resource (#${id})`;

    try {
      const res = await fetch(`/api/resources/${id}`);
      const r = await res.json();

      document.getElementById('resIdInput').value = r.id;
      document.getElementById('resName').value = r.name;
      document.getElementById('resUrl').value = r.url;
      document.getElementById('resCategory').value = r.category;
      document.getElementById('resSubcategories').value = (r.subcategories || []).join(', ');
      document.getElementById('resSkillLevel').value = r.skill_level || 'Beginner';
      document.getElementById('resPricing').value = r.pricing || '100% Free';
      document.getElementById('resPricingDetails').value = r.pricing_details || '';
      document.getElementById('resDescription').value = r.description;
      document.getElementById('resTeluguDescription').value = r.telugu_description || '';
      document.getElementById('resSupportedTopics').value = (r.supported_topics || []).join(', ');
      document.getElementById('resFeatured').checked = r.featured === 1;

      document.getElementById('resourceModal').classList.add('active');
    } catch (e) {
      EduApp.toast('Failed to load resource details for editing', 'error');
    }
  },

  closeModal() {
    document.getElementById('resourceModal').classList.remove('active');
  },

  async handleResourceSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('resIdInput').value;
    const name = document.getElementById('resName').value.trim();
    const url = document.getElementById('resUrl').value.trim();
    const category = document.getElementById('resCategory').value;
    const subcategories = document.getElementById('resSubcategories').value.split(',').map(s => s.trim()).filter(Boolean);
    const skill_level = document.getElementById('resSkillLevel').value;
    const pricing = document.getElementById('resPricing').value;
    const pricing_details = document.getElementById('resPricingDetails').value.trim();
    const description = document.getElementById('resDescription').value.trim();
    const telugu_description = document.getElementById('resTeluguDescription').value.trim();
    const supported_topics = document.getElementById('resSupportedTopics').value.split(',').map(s => s.trim()).filter(Boolean);
    const featured = document.getElementById('resFeatured').checked;

    const payload = {
      name,
      url,
      category,
      subcategories,
      skill_level,
      pricing,
      pricing_details,
      description,
      telugu_description,
      supported_topics,
      featured
    };

    try {
      let reqUrl = '/api/admin/resources';
      let method = 'POST';

      if (id) {
        reqUrl = `/api/admin/resources/${id}`;
        method = 'PUT';
      }

      const res = await fetch(reqUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.EduAuth.token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Operation failed');

      EduApp.toast(data.message || 'Resource saved successfully!', 'success');
      this.closeModal();
      this.loadResources();
      this.loadStats();
    } catch (err) {
      EduApp.toast(err.message, 'error');
    }
  },

  async deleteResource(id, name) {
    if (!confirm(`Are you sure you want to delete "${name}" from EduBridge?`)) return;

    try {
      const res = await fetch(`/api/admin/resources/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${window.EduAuth.token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');

      EduApp.toast(data.message || 'Resource deleted.', 'info');
      this.loadResources();
      this.loadStats();
    } catch (err) {
      EduApp.toast(err.message, 'error');
    }
  },

  async loadFeedback() {
    const tableBody = document.getElementById('feedbackTableBody');
    tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Loading student feedback...</td></tr>';

    try {
      const res = await fetch('/api/admin/feedback', {
        headers: { 'Authorization': `Bearer ${window.EduAuth.token}` }
      });
      const data = await res.json();

      if (data && data.length > 0) {
        tableBody.innerHTML = data.map(f => {
          const date = new Date(f.created_at).toLocaleDateString();
          let statusBadge = '<span class="badge" style="background:#fef3c7; color:#92400e;">Pending</span>';
          if (f.status === 'reviewed') statusBadge = '<span class="badge" style="background:#dbeafe; color:#1e40af;">Reviewed</span>';
          else if (f.status === 'resolved') statusBadge = '<span class="badge badge-free">Resolved</span>';

          return `
            <tr>
              <td><strong>#${f.id}</strong></td>
              <td>
                <span class="badge" style="background:#f1f5f9; color:#475569; text-transform:uppercase;">${f.type.replace('_', ' ')}</span>
                <div style="font-weight:700; margin-top:0.25rem;">${f.title || 'Submission'}</div>
                ${f.url ? `<a href="${f.url}" target="_blank" style="font-size:0.75rem; color:#2563eb;">${f.url}</a>` : ''}
              </td>
              <td>${f.user_name || 'Guest'}<br><span style="font-size:0.75rem; color:#64748b;">${f.user_email || ''}</span></td>
              <td style="max-width:280px; font-size:0.85rem;">${f.message}</td>
              <td>${statusBadge}</td>
              <td>
                <select onchange="EduAdmin.updateFeedbackStatus(${f.id}, this.value)" class="form-control" style="font-size:0.8rem; padding:0.2rem 0.4rem;">
                  <option value="pending" ${f.status === 'pending' ? 'selected' : ''}>Pending</option>
                  <option value="reviewed" ${f.status === 'reviewed' ? 'selected' : ''}>Reviewed</option>
                  <option value="resolved" ${f.status === 'resolved' ? 'selected' : ''}>Resolved</option>
                </select>
              </td>
            </tr>
          `;
        }).join('');
      } else {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:1.5rem;">No student feedback submitted yet.</td></tr>';
      }
    } catch (e) {
      tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:red;">Failed to load feedback.</td></tr>';
    }
  },

  async updateFeedbackStatus(id, newStatus) {
    try {
      const res = await fetch(`/api/admin/feedback/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.EduAuth.token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      EduApp.toast('Feedback status updated.', 'success');
      this.loadStats();
    } catch (e) {
      EduApp.toast('Failed to update status', 'error');
    }
  }
};

window.EduAdmin = EduAdmin;

document.addEventListener('DOMContentLoaded', () => {
  EduAdmin.init();
});
