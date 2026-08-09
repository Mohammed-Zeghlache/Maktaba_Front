import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { showToast } from '../components/Toast';
import { apiCall, bookTitle, bookUniversity, bookMajor, taxLabel, UNIVERSITIES, MAJORS } from '../services/api';

function Admin() {
     const navigate = useNavigate();
     const goToHome = () => {
         navigate('/home');
     }
  
  const { lang, currentAdmin, logout, login } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [pendingBooks, setPendingBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentAdmin) return;
    loadTab(activeTab);
  }, [activeTab, currentAdmin]);

  const loadTab = async (tab) => {
    setActiveTab(tab);
    setLoading(true);
    try {
      if (tab === 'overview') {
        const data = await apiCall('/admin/stats');
        setStats(data);
      } else if (tab === 'approvals') {
        const data = await apiCall('/admin/books/pending');
        setPendingBooks(data);
      } else if (tab === 'users') {
        const data = await apiCall('/admin/users');
        setUsers(data);
      }
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveBook = async (id) => {
    try {
      await apiCall(`/admin/books/${id}/approve`, { method: 'PUT' });
      showToast(lang === 'ar' ? 'تمت الموافقة على الكتاب.' : 'Book approved.', 'success');
      loadTab('approvals');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleRejectBook = async (id) => {
    try {
      await apiCall(`/admin/books/${id}/reject`, { method: 'PUT' });
      showToast(lang === 'ar' ? 'تم رفض الكتاب.' : 'Book rejected.', 'info');
      loadTab('approvals');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleToggleBan = async (id, banned) => {
    try {
      await apiCall(`/admin/users/${id}/ban`, {
        method: 'PUT',
        body: JSON.stringify({ banned })
      });
      showToast(
        banned
          ? (lang === 'ar' ? 'تم حظر المستخدم.' : 'User banned.')
          : (lang === 'ar' ? 'تم رفع الحظر عن المستخدم.' : 'User unbanned.'),
        banned ? 'error' : 'success'
      );
      loadTab('users');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  if (!currentAdmin) {
    return (
      <div className="admin-shell">
        <div className="container admin-login-wrap">
          <AdminLogin />
        </div>
      </div>
    );
  }

  const renderOverview = () => {
    if (!stats) return <p className="text-muted">{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>;
    return (
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="number">{stats.totalBooks}</div>
          <div className="label">{lang === 'ar' ? 'إجمالي الكتب' : 'Total books'}</div>
        </div>
        <div className="admin-stat-card">
          <div className="number">{stats.pending}</div>
          <div className="label">{lang === 'ar' ? 'قيد المراجعة' : 'Pending'}</div>
        </div>
        <div className="admin-stat-card">
          <div className="number">{stats.approved}</div>
          <div className="label">{lang === 'ar' ? 'منشورة' : 'Approved'}</div>
        </div>
        <div className="admin-stat-card">
          <div className="number">{stats.rejected}</div>
          <div className="label">{lang === 'ar' ? 'مرفوضة' : 'Rejected'}</div>
        </div>
        <div className="admin-stat-card">
          <div className="number">{stats.totalUsers}</div>
          <div className="label">{lang === 'ar' ? 'المستخدمون' : 'Users'}</div>
        </div>
        <div className="admin-stat-card">
          <div className="number">{stats.bannedUsers}</div>
          <div className="label">{lang === 'ar' ? 'محظورون' : 'Banned'}</div>
        </div>
        <div className="admin-stat-card">
          <div className="number">{stats.totalViews}</div>
          <div className="label">{lang === 'ar' ? 'إجمالي المشاهدات' : 'Total views'}</div>
        </div>
      </div>
    );
  };

  const renderApprovals = () => {
    if (loading) return <p className="text-muted">{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>;
    if (pendingBooks.length === 0) {
      return <p className="text-muted">{lang === 'ar' ? 'لا توجد طلبات قيد المراجعة حالياً.' : 'No listings are awaiting review right now.'}</p>;
    }
    return (
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>{lang === 'ar' ? 'العنوان' : 'Title'}</th>
              <th>{lang === 'ar' ? 'الناشر' : 'Owner'}</th>
              <th>{lang === 'ar' ? 'الجامعة' : 'University'}</th>
              <th>{lang === 'ar' ? 'التخصص' : 'Major'}</th>
              <th>{lang === 'ar' ? 'التاريخ' : 'Date'}</th>
              <th>{lang === 'ar' ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {pendingBooks.map(book => (
              <tr key={book.id}>
                <td><strong>{bookTitle(book, lang)}</strong></td>
                <td>{book.first_name} {book.last_name}</td>
                <td>{bookUniversity(book, lang)}</td>
                <td>{bookMajor(book, lang)}</td>
                <td>{book.created_at ? new Date(book.created_at).toLocaleDateString() : ''}</td>
                <td>
                  <div className="actions">
                    <button className="btn btn-success btn-xs" onClick={() => handleApproveBook(book.id)}>
                      {lang === 'ar' ? 'موافقة' : 'Approve'}
                    </button>
                    <button className="btn btn-outline btn-xs" onClick={() => handleRejectBook(book.id)}>
                      {lang === 'ar' ? 'رفض' : 'Reject'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderUsers = () => {
    if (loading) return <p className="text-muted">{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>;
    if (users.length === 0) {
      return <p className="text-muted">{lang === 'ar' ? 'لا يوجد مستخدمون.' : 'No users yet.'}</p>;
    }
    return (
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>{lang === 'ar' ? 'الاسم' : 'Name'}</th>
              <th>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</th>
              <th>{lang === 'ar' ? 'الهاتف' : 'Phone'}</th>
              <th>{lang === 'ar' ? 'الجامعة' : 'University'}</th>
              <th>{lang === 'ar' ? 'الانضمام' : 'Joined'}</th>
              <th>{lang === 'ar' ? 'المنشورات' : 'Listings'}</th>
              <th>{lang === 'ar' ? 'الحساب' : 'Account'}</th>
              <th>{lang === 'ar' ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td><strong>{user.first_name} {user.last_name}</strong></td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.university_key ? taxLabel(UNIVERSITIES, user.university_key, lang) : '—'}</td>
                <td>{user.created_at ? new Date(user.created_at).toLocaleDateString() : ''}</td>
                <td>{user.listings_count ?? 0}</td>
                <td>
                  <span className={`status-chip ${user.is_banned ? 'status-banned' : 'status-active'}`}>
                    {user.is_banned ? (lang === 'ar' ? 'محظور' : 'Banned') : (lang === 'ar' ? 'نشط' : 'Active')}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-outline btn-xs"
                    onClick={() => handleToggleBan(user.id, !user.is_banned)}
                  >
                    {user.is_banned ? (lang === 'ar' ? 'رفع الحظر' : 'Unban') : (lang === 'ar' ? 'حظر' : 'Ban')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <div className="container flex-between">
          <div className="logo"><i className="fas fa-shield-halved"></i> {lang === 'ar' ? 'لوحة تحكم مكتبة' : 'Maktaba Admin'}</div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button className="btn btn-outline btn-sm" onClick={goToHome}>
              <i className="fas fa-arrow-up-right-from-square"></i> {lang === 'ar' ? 'عرض الموقع' : 'View site'}
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => navigateTo('/Login')}>
              <i className="fas fa-sign-out-alt"></i> {lang === 'ar' ? 'خروج' : 'Log out'}
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => loadTab('overview')}
          >
            <i className="fas fa-chart-pie"></i> {lang === 'ar' ? 'نظرة عامة' : 'Overview'}
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'approvals' ? 'active' : ''}`}
            onClick={() => loadTab('approvals')}
          >
            <i className="fas fa-clock"></i> {lang === 'ar' ? 'طلبات المراجعة' : 'Pending approvals'}
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => loadTab('users')}
          >
            <i className="fas fa-users"></i> {lang === 'ar' ? 'المستخدمون' : 'Users'}
          </button>
        </div>
        <div className="admin-section active" style={{ display: 'block' }}>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'approvals' && renderApprovals()}
          {activeTab === 'users' && renderUsers()}
        </div>
      </div>
    </div>
  );
}

// Admin Login Component - FIXED
function AdminLogin() {
  const { lang } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      showToast(lang === 'ar' ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور.' : 'Please enter email and password.', 'error');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('https://maktaba-back.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      // Check if user is admin
      if (data.user.role !== 'admin') {
        showToast(lang === 'ar' ? 'هذا الحساب ليس مسؤولاً.' : 'This account is not an admin.', 'error');
        setLoading(false);
        return;
      }
      
      // Store token and reload
      localStorage.setItem('maktaba_token', data.token);
      showToast(lang === 'ar' ? 'مرحباً بك في لوحة التحكم' : 'Welcome to the dashboard.', 'success');
      
      // Reload page to show admin panel
      window.location.reload();
      
    } catch (error) {
      showToast(error.message || (lang === 'ar' ? 'فشل تسجيل الدخول' : 'Login failed'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ margin: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
        <i className="fas fa-shield-halved" style={{ color: 'var(--gold)', fontSize: '1.1rem' }}></i>
        <strong style={{ fontFamily: 'var(--font-serif)' }}>{lang === 'ar' ? 'لوحة تحكم مكتبة' : 'Maktaba Admin'}</strong>
      </div>
      <h1 style={{ fontSize: '1.4rem', marginTop: '10px', fontFamily: 'var(--font-serif)' }}>
        {lang === 'ar' ? 'دخول المسؤول' : 'Admin sign in'}
      </h1>
      <p className="subtitle">
        {lang === 'ar' ? 'هذه اللوحة منفصلة تماماً عن حسابات الطلاب.' : 'This panel is completely separate from student accounts.'}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@maktaba.dz"
            required
          />
        </div>
        <div className="form-group password-field">
          <label>{lang === 'ar' ? 'كلمة المرور' : 'Password'}</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
          </button>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (lang === 'ar' ? 'جاري التحميل...' : 'Loading...') : (lang === 'ar' ? 'دخول' : 'Sign in')}
        </button>
      </form>
      <div className="auth-link">
        <a onClick={() => window.location.hash = 'home'}>
          {lang === 'ar' ? 'عرض الموقع' : 'View site'}
        </a>
      </div>
    </div>
  );
}

export default Admin;
