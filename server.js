const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db, initDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'edubridge-secret-key-rural-awareness-2026';

// Initialize SQLite Database
initDatabase();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Helper Authentication Middleware
function authenticateToken(req, res, next) {
  let token = req.cookies.token;
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      req.user = null;
    } else {
      req.user = decoded;
    }
    next();
  });
}

function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required. Please login.' });
  }
  next();
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Administrator privileges required.' });
  }
  next();
}

app.use(authenticateToken);

// ==================== AUTHENTICATION ROUTES ====================

// Register
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, village, college_school, study_level, preferred_language, interests } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email.trim().toLowerCase());
    if (existingUser) {
      return res.status(409).json({ error: 'An account with this email already exists. Please login instead.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);
    const interestsJson = JSON.stringify(Array.isArray(interests) ? interests : []);

    const stmt = db.prepare(`
      INSERT INTO users (name, email, password_hash, role, village, college_school, study_level, preferred_language, interests)
      VALUES (?, ?, ?, 'student', ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name.trim(),
      email.trim().toLowerCase(),
      password_hash,
      village || '',
      college_school || '',
      study_level || 'Undergraduate',
      preferred_language || 'en',
      interestsJson
    );

    const user = {
      id: Number(result.lastInsertRowid),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: 'student',
      village: village || '',
      college_school: college_school || '',
      study_level: study_level || 'Undergraduate',
      preferred_language: preferred_language || 'en',
      interests: Array.isArray(interests) ? interests : []
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    });

    res.status(201).json({
      message: 'Registration successful! Welcome to EduBridge.',
      user,
      token
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed due to a server error. Please try again.' });
  }
});

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter both email and password.' });
    }

    const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email.trim().toLowerCase());
    if (!row) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = bcrypt.compareSync(password, row.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    let parsedInterests = [];
    try {
      parsedInterests = JSON.parse(row.interests || '[]');
    } catch {
      parsedInterests = [];
    }

    const user = {
      id: row.id,
      name: row.name,
      email: row.email,
      role: row.role,
      village: row.village,
      college_school: row.college_school,
      study_level: row.study_level,
      preferred_language: row.preferred_language || 'en',
      interests: parsedInterests
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax'
    });

    res.json({
      message: 'Login successful.',
      user,
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// Current User Profile
app.get('/api/auth/me', (req, res) => {
  if (!req.user) {
    return res.json({ authenticated: false, user: null });
  }

  const row = db.prepare('SELECT id, name, email, role, village, college_school, study_level, preferred_language, interests, created_at FROM users WHERE id = ?').get(req.user.id);
  if (!row) {
    return res.json({ authenticated: false, user: null });
  }

  let parsedInterests = [];
  try {
    parsedInterests = JSON.parse(row.interests || '[]');
  } catch {
    parsedInterests = [];
  }

  res.json({
    authenticated: true,
    user: {
      ...row,
      interests: parsedInterests
    }
  });
});

// Update Profile
app.put('/api/auth/profile', requireAuth, (req, res) => {
  try {
    const { name, village, college_school, study_level, preferred_language, interests } = req.body;

    const stmt = db.prepare(`
      UPDATE users
      SET name = COALESCE(?, name),
          village = COALESCE(?, village),
          college_school = COALESCE(?, college_school),
          study_level = COALESCE(?, study_level),
          preferred_language = COALESCE(?, preferred_language),
          interests = COALESCE(?, interests)
      WHERE id = ?
    `);

    stmt.run(
      name ? name.trim() : null,
      village !== undefined ? village.trim() : null,
      college_school !== undefined ? college_school.trim() : null,
      study_level !== undefined ? study_level : null,
      preferred_language !== undefined ? preferred_language : null,
      interests ? JSON.stringify(interests) : null,
      req.user.id
    );

    const updated = db.prepare('SELECT id, name, email, role, village, college_school, study_level, preferred_language, interests FROM users WHERE id = ?').get(req.user.id);
    let parsedInterests = [];
    try {
      parsedInterests = JSON.parse(updated.interests || '[]');
    } catch {
      parsedInterests = [];
    }

    res.json({
      message: 'Profile updated successfully.',
      user: {
        ...updated,
        interests: parsedInterests
      }
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully.' });
});

// Forgot Password
app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email address is required.' });
  }

  const user = db.prepare('SELECT id, email, name FROM users WHERE email = ?').get(email.trim().toLowerCase());
  if (!user) {
    return res.status(404).json({ error: 'No account registered with this email address.' });
  }

  // Generate a friendly password reset demo code
  const resetCode = Math.floor(100000 + Math.random() * 900000);
  res.json({
    message: `A password reset instruction code (${resetCode}) has been prepared for ${user.email}. In this demonstration prototype, you can proceed to reset your password or login directly.`,
    resetCode
  });
});

// ==================== RESOURCE DISCOVERY ROUTES ====================

// Get Resources with Flexible Search & Multi-Filters
app.get('/api/resources', (req, res) => {
  try {
    const { search, category, subcategory, skill_level, pricing, featured, sort, limit, offset } = req.query;

    let query = 'SELECT * FROM resources WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (skill_level && skill_level !== 'all') {
      query += ' AND (skill_level = ? OR skill_level = "All Levels")';
      params.push(skill_level);
    }

    if (pricing && pricing !== 'all') {
      if (pricing === 'free') {
        query += ' AND (pricing LIKE "%Free%" OR pricing LIKE "%100% Free%")';
      } else if (pricing === 'freemium') {
        query += ' AND pricing LIKE "%Freemium%"';
      } else if (pricing === 'audit') {
        query += ' AND pricing LIKE "%Audit%"';
      }
    }

    if (featured === '1' || featured === 'true') {
      query += ' AND featured = 1';
    }

    if (search && search.trim()) {
      const searchTerm = `%${search.trim().toLowerCase()}%`;
      query += ` AND (
        LOWER(name) LIKE ? OR
        LOWER(description) LIKE ? OR
        LOWER(telugu_description) LIKE ? OR
        LOWER(subcategories) LIKE ? OR
        LOWER(supported_topics) LIKE ?
      )`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (subcategory && subcategory.trim()) {
      query += ' AND LOWER(subcategories) LIKE ?';
      params.push(`%${subcategory.trim().toLowerCase()}%`);
    }

    // Sorting
    if (sort === 'popular') {
      query += ' ORDER BY click_count DESC, featured DESC, id ASC';
    } else if (sort === 'newest') {
      query += ' ORDER BY id DESC';
    } else if (sort === 'alpha') {
      query += ' ORDER BY name ASC';
    } else {
      query += ' ORDER BY featured DESC, click_count DESC, id ASC';
    }

    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit, 10));
      if (offset) {
        query += ' OFFSET ?';
        params.push(parseInt(offset, 10));
      }
    }

    const rows = db.prepare(query).all(...params);

    // Format JSON array fields
    const formatted = rows.map(r => {
      let subcategories = [];
      let supported_topics = [];
      try { subcategories = JSON.parse(r.subcategories || '[]'); } catch { subcategories = []; }
      try { supported_topics = JSON.parse(r.supported_topics || '[]'); } catch { supported_topics = []; }

      return {
        ...r,
        subcategories,
        supported_topics
      };
    });

    // Check bookmarks for logged in user
    let userBookmarks = new Set();
    if (req.user) {
      const bMarks = db.prepare('SELECT resource_id FROM bookmarks WHERE user_id = ?').all(req.user.id);
      bMarks.forEach(b => userBookmarks.add(b.resource_id));
    }

    const resourcesWithBookmarks = formatted.map(r => ({
      ...r,
      is_bookmarked: userBookmarks.has(r.id)
    }));

    res.json({
      total: resourcesWithBookmarks.length,
      resources: resourcesWithBookmarks
    });
  } catch (err) {
    console.error('Error fetching resources:', err);
    res.status(500).json({ error: 'Failed to retrieve resources.' });
  }
});

// Single Resource
app.get('/api/resources/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM resources WHERE id = ?').get(req.params.id);
    if (!row) {
      return res.status(404).json({ error: 'Educational resource not found.' });
    }

    let subcategories = [];
    let supported_topics = [];
    try { subcategories = JSON.parse(row.subcategories || '[]'); } catch { subcategories = []; }
    try { supported_topics = JSON.parse(row.supported_topics || '[]'); } catch { supported_topics = []; }

    let is_bookmarked = false;
    if (req.user) {
      const bm = db.prepare('SELECT id FROM bookmarks WHERE user_id = ? AND resource_id = ?').get(req.user.id, row.id);
      is_bookmarked = !!bm;
    }

    res.json({
      ...row,
      subcategories,
      supported_topics,
      is_bookmarked
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error retrieving resource.' });
  }
});

// Track Resource Click / Visit ("Open Platform")
app.post('/api/resources/:id/visit', (req, res) => {
  try {
    const resourceId = req.params.id;
    const resource = db.prepare('SELECT id, url FROM resources WHERE id = ?').get(resourceId);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    // Increment click count
    db.prepare('UPDATE resources SET click_count = click_count + 1 WHERE id = ?').run(resourceId);

    // If user is logged in, record visit history
    if (req.user) {
      db.prepare('INSERT INTO visits (user_id, resource_id) VALUES (?, ?)').run(req.user.id, resourceId);
    }

    res.json({ success: true, url: resource.url });
  } catch (err) {
    console.error('Track visit error:', err);
    res.status(500).json({ error: 'Error recording visit' });
  }
});

// ==================== BOOKMARK ROUTES ====================

// Get Bookmarked Resources
app.get('/api/bookmarks', requireAuth, (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT r.*, b.created_at as bookmarked_at
      FROM bookmarks b
      JOIN resources r ON b.resource_id = r.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
    `).all(req.user.id);

    const formatted = rows.map(r => {
      let subcategories = [];
      let supported_topics = [];
      try { subcategories = JSON.parse(r.subcategories || '[]'); } catch { subcategories = []; }
      try { supported_topics = JSON.parse(r.supported_topics || '[]'); } catch { supported_topics = []; }
      return {
        ...r,
        subcategories,
        supported_topics,
        is_bookmarked: true
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error('Bookmarks error:', err);
    res.status(500).json({ error: 'Failed to fetch bookmarks.' });
  }
});

// Toggle Bookmark
app.post('/api/bookmarks/toggle', requireAuth, (req, res) => {
  try {
    const { resource_id } = req.body;
    if (!resource_id) {
      return res.status(400).json({ error: 'Resource ID is required.' });
    }

    const existing = db.prepare('SELECT id FROM bookmarks WHERE user_id = ? AND resource_id = ?').get(req.user.id, resource_id);

    if (existing) {
      db.prepare('DELETE FROM bookmarks WHERE id = ?').run(existing.id);
      return res.json({ bookmarked: false, message: 'Resource removed from saved bookmarks.' });
    } else {
      db.prepare('INSERT INTO bookmarks (user_id, resource_id) VALUES (?, ?)').run(req.user.id, resource_id);
      return res.json({ bookmarked: true, message: 'Resource successfully saved to your bookmarks!' });
    }
  } catch (err) {
    console.error('Toggle bookmark error:', err);
    res.status(500).json({ error: 'Failed to update bookmark.' });
  }
});

// ==================== DASHBOARD DATA ====================

app.get('/api/dashboard/stats', requireAuth, (req, res) => {
  try {
    const userId = req.user.id;

    // User details
    const user = db.prepare('SELECT id, name, email, role, village, college_school, study_level, preferred_language, interests FROM users WHERE id = ?').get(userId);
    let interests = [];
    try { interests = JSON.parse(user.interests || '[]'); } catch { interests = []; }

    // Bookmark count
    const bookmarkCount = db.prepare('SELECT COUNT(*) as count FROM bookmarks WHERE user_id = ?').get(userId).count;

    // Visit count
    const visitCount = db.prepare('SELECT COUNT(*) as count FROM visits WHERE user_id = ?').get(userId).count;

    // Recently visited platforms (unique recent 8)
    const recentVisits = db.prepare(`
      SELECT r.id, r.name, r.url, r.logo_icon, r.category, r.skill_level, r.pricing, MAX(v.visited_at) as last_visited
      FROM visits v
      JOIN resources r ON v.resource_id = r.id
      WHERE v.user_id = ?
      GROUP BY r.id
      ORDER BY last_visited DESC
      LIMIT 8
    `).all(userId);

    // Bookmarked items list
    const bookmarks = db.prepare(`
      SELECT r.id, r.name, r.url, r.logo_icon, r.category, r.skill_level, r.pricing, r.description, r.telugu_description, b.created_at as bookmarked_at
      FROM bookmarks b
      JOIN resources r ON b.resource_id = r.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
      LIMIT 10
    `).all(userId);

    // Recommended resources matching user's interests or popular if none
    let recommendations = [];
    if (interests && interests.length > 0) {
      const interestMatches = [];
      for (const item of interests) {
        const rows = db.prepare(`
          SELECT * FROM resources
          WHERE (LOWER(category) LIKE ? OR LOWER(subcategories) LIKE ? OR LOWER(supported_topics) LIKE ?)
          LIMIT 4
        `).all(`%${item.toLowerCase()}%`, `%${item.toLowerCase()}%`, `%${item.toLowerCase()}%`);
        interestMatches.push(...rows);
      }

      // Deduplicate recommendations
      const seen = new Set();
      recommendations = interestMatches.filter(r => {
        if (seen.has(r.id)) return false;
        seen.add(r.id);
        return true;
      }).slice(0, 8);
    }

    if (recommendations.length === 0) {
      recommendations = db.prepare('SELECT * FROM resources WHERE featured = 1 ORDER BY click_count DESC LIMIT 6').all();
    }

    // Format recommendations JSON arrays
    const formattedRecs = recommendations.map(r => {
      let subcategories = [];
      try { subcategories = JSON.parse(r.subcategories || '[]'); } catch { subcategories = []; }
      return { ...r, subcategories };
    });

    res.json({
      user: { ...user, interests },
      stats: {
        savedBookmarks: bookmarkCount,
        visitedPlatforms: visitCount,
        learningInterestsCount: interests.length
      },
      recentVisits,
      bookmarks,
      recommendations: formattedRecs
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ error: 'Failed to load dashboard information.' });
  }
});

// ==================== FEEDBACK & SUGGESTIONS ====================

app.post('/api/feedback', (req, res) => {
  try {
    const { user_name, user_email, type, title, url, message } = req.body;

    if (!type || !message) {
      return res.status(400).json({ error: 'Feedback type and message are required.' });
    }

    const userId = req.user ? req.user.id : null;
    const name = user_name || (req.user ? req.user.name : 'Guest Rural Learner');
    const email = user_email || (req.user ? req.user.email : '');

    const stmt = db.prepare(`
      INSERT INTO feedback (user_id, user_name, user_email, type, title, url, message, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    `);

    stmt.run(userId, name, email, type, title || '', url || '', message.trim());

    res.status(201).json({
      message: 'Thank you! Your suggestion/feedback has been submitted successfully. Our team will review it to help rural learners.'
    });
  } catch (err) {
    console.error('Feedback error:', err);
    res.status(500).json({ error: 'Failed to submit feedback. Please try again.' });
  }
});

// ==================== ADMIN ROUTES ====================

// Admin Stats
app.get('/api/admin/stats', requireAdmin, (req, res) => {
  try {
    const totalResources = db.prepare('SELECT COUNT(*) as count FROM resources').get().count;
    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const totalVisits = db.prepare('SELECT COUNT(*) as count FROM visits').get().count;
    const totalFeedback = db.prepare('SELECT COUNT(*) as count FROM feedback').get().count;
    const pendingFeedback = db.prepare("SELECT COUNT(*) as count FROM feedback WHERE status = 'pending'").get().count;

    // Category distribution
    const categoryCounts = db.prepare('SELECT category, COUNT(*) as count FROM resources GROUP BY category').all();

    res.json({
      totalResources,
      totalUsers,
      totalVisits,
      totalFeedback,
      pendingFeedback,
      categoryCounts
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ error: 'Failed to load administrator statistics.' });
  }
});

// Admin: Add Resource
app.post('/api/admin/resources', requireAdmin, (req, res) => {
  try {
    const {
      name,
      url,
      logo_icon,
      category,
      subcategories,
      skill_level,
      pricing,
      pricing_details,
      description,
      telugu_description,
      supported_topics,
      featured
    } = req.body;

    if (!name || !url || !category || !description) {
      return res.status(400).json({ error: 'Name, URL, category, and English description are required.' });
    }

    const stmt = db.prepare(`
      INSERT INTO resources (
        name, url, logo_icon, category, subcategories, skill_level, pricing, pricing_details,
        description, telugu_description, supported_topics, featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name.trim(),
      url.trim(),
      logo_icon || 'generic',
      category,
      JSON.stringify(Array.isArray(subcategories) ? subcategories : []),
      skill_level || 'Beginner',
      pricing || '100% Free',
      pricing_details || '',
      description.trim(),
      telugu_description ? telugu_description.trim() : '',
      JSON.stringify(Array.isArray(supported_topics) ? supported_topics : []),
      featured ? 1 : 0
    );

    res.status(201).json({
      message: 'Educational platform added successfully!',
      resourceId: Number(result.lastInsertRowid)
    });
  } catch (err) {
    console.error('Add resource error:', err);
    res.status(500).json({ error: 'Failed to add resource.' });
  }
});

// Admin: Edit Resource
app.put('/api/admin/resources/:id', requireAdmin, (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      url,
      logo_icon,
      category,
      subcategories,
      skill_level,
      pricing,
      pricing_details,
      description,
      telugu_description,
      supported_topics,
      featured
    } = req.body;

    const stmt = db.prepare(`
      UPDATE resources
      SET name = ?,
          url = ?,
          logo_icon = ?,
          category = ?,
          subcategories = ?,
          skill_level = ?,
          pricing = ?,
          pricing_details = ?,
          description = ?,
          telugu_description = ?,
          supported_topics = ?,
          featured = ?
      WHERE id = ?
    `);

    stmt.run(
      name,
      url,
      logo_icon,
      category,
      JSON.stringify(Array.isArray(subcategories) ? subcategories : []),
      skill_level,
      pricing,
      pricing_details,
      description,
      telugu_description,
      JSON.stringify(Array.isArray(supported_topics) ? supported_topics : []),
      featured ? 1 : 0,
      id
    );

    res.json({ message: 'Resource updated successfully!' });
  } catch (err) {
    console.error('Update resource error:', err);
    res.status(500).json({ error: 'Failed to update resource.' });
  }
});

// Admin: Delete Resource
app.delete('/api/admin/resources/:id', requireAdmin, (req, res) => {
  try {
    const id = req.params.id;
    db.prepare('DELETE FROM resources WHERE id = ?').run(id);
    res.json({ message: 'Resource deleted successfully.' });
  } catch (err) {
    console.error('Delete resource error:', err);
    res.status(500).json({ error: 'Failed to delete resource.' });
  }
});

// Admin: Get Feedback & Suggestions
app.get('/api/admin/feedback', requireAdmin, (req, res) => {
  try {
    const feedbackList = db.prepare('SELECT * FROM feedback ORDER BY created_at DESC').all();
    res.json(feedbackList);
  } catch (err) {
    console.error('Get feedback error:', err);
    res.status(500).json({ error: 'Failed to fetch feedback.' });
  }
});

// Admin: Update Feedback Status
app.put('/api/admin/feedback/:id', requireAdmin, (req, res) => {
  try {
    const { status } = req.body;
    db.prepare('UPDATE feedback SET status = ? WHERE id = ?').run(status || 'reviewed', req.params.id);
    res.json({ message: 'Feedback status updated.' });
  } catch (err) {
    console.error('Update feedback error:', err);
    res.status(500).json({ error: 'Failed to update feedback status.' });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` EduBridge Server Running at http://localhost:${PORT}`);
  console.log(` Project: A STUDY ON DIGITAL EDUCATION AWARENESS IN RURAL VILLAGES`);
  console.log(` Default Admin: admin@edubridge.org (admin123)`);
  console.log(` Default Student: ravi.student@example.com (student123)`);
  console.log(`=======================================================`);
});
