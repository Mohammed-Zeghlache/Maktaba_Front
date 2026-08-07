import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import { showToast } from '../components/Toast';
import { showModal } from '../components/Modal';
import { apiCall, bookTitle, bookUniversity, bookImages, taxLabel, UNIVERSITIES, MAJORS } from '../services/api';
import { useNavigate } from 'react-router-dom';



function Profile({ navigateTo }) {
    const navigate = useNavigate();

    
  const { currentUser, logout, lang } = useAuth();
  const [books, setBooks] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchProfileData();
    }
  }, [currentUser]);

  const fetchProfileData = async () => {
    try {
      const [userBooks, wishlist] = await Promise.all([
        apiCall('/books/my/books'),
        apiCall('/books/wishlist')
      ]);
      setBooks(userBooks || []);
      setWishlistCount(wishlist.length || 0);
    } catch (e) {
      console.error('Failed to fetch profile data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    showModal(
      lang === 'ar' ? 'حذف الكتاب' : 'Delete book',
      lang === 'ar' ? 'هل أنت متأكد من رغبتك في حذف هذا الكتاب؟ لا يمكن التراجع عن هذا الإجراء.' : 'Are you sure you want to delete this book? This cannot be undone.',
      async () => {
        try {
          await apiCall(`/books/${bookId}`, { method: 'DELETE' });
          showToast(lang === 'ar' ? 'تم حذف الكتاب.' : 'Book deleted.', 'info');
          fetchProfileData();
        } catch (error) {
          showToast(error.message, 'error');
        }
      }
    );
  };

  if (!currentUser) {
    navigateTo('login');
    return null;
  }

  const renderMyBookCard = (book) => {
    const statusColor = book.status === 'approved'
      ? 'background:#d4edda;color:#155724;'
      : book.status === 'pending'
        ? 'background:#fff3cd;color:#856404;'
        : 'background:#f8d7da;color:#721c24;';
    const statusLabel = book.status === 'approved'
      ? (lang === 'ar' ? 'منشور' : 'Live')
      : book.status === 'pending'
        ? (lang === 'ar' ? 'قيد المراجعة' : 'Under review')
        : (lang === 'ar' ? 'مرفوض' : 'Rejected');
    const images = bookImages(book);

    return (
      <div key={book.id} className="book-card" style={{ cursor: 'default' }}>
        <div className="book-cover" onClick={() => navigateTo('book', book.id)}>
          <img
            src={images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop'}
            alt={bookTitle(book, lang)}
          />
        </div>
        <div className="book-title">{bookTitle(book, lang)}</div>
        <div className="book-meta">
          <i className="fas fa-university"></i> {bookUniversity(book, lang)}
        </div>
        <span style={{
          display: 'inline-block',
          padding: '2px 8px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.65rem',
          marginTop: '4px',
          ...Object.fromEntries(statusColor.split(';').filter(Boolean).map(s => {
            const [key, val] = s.split(':');
            return [key.trim(), val.trim()];
          }))
        }}>
          {statusLabel}
        </span>
        <div style={{ display: 'flex', gap: '3px', marginTop: '6px' }}>
          <button className="btn btn-outline btn-xs" onClick={() => navigateTo('post', book.id)}>
            <i className="fas fa-pen"></i>
          </button>
          <button className="btn btn-danger btn-xs" onClick={() => handleDeleteBook(book.id)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <div className="profile-header">
        <div className="profile-avatar"><i className="fas fa-user"></i></div>
        <div className="profile-info">
          <h2>{currentUser.first_name} {currentUser.last_name}</h2>
          <div className="detail"><i className="fas fa-envelope"></i> {currentUser.email}</div>
          <div className="detail"><i className="fas fa-phone-alt"></i> {currentUser.phone}</div>
          {currentUser.university_key && (
            <div className="detail"><i className="fas fa-university"></i> {taxLabel(UNIVERSITIES, currentUser.university_key, lang)}</div>
          )}
          {currentUser.major_key && (
            <div className="detail"><i className="fas fa-graduation-cap"></i> {taxLabel(MAJORS, currentUser.major_key, lang)}</div>
          )}
          <div className="detail">
            <i className="fas fa-calendar-alt"></i> {lang === 'ar' ? 'انضم في' : 'Joined'} {currentUser.created_at ? new Date(currentUser.created_at).toLocaleDateString() : ''}
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button className="btn btn-sm profile-tab-btn active">
          <i className="fas fa-list"></i> {lang === 'ar' ? 'منشوراتي' : 'My listings'} ({books.length})
        </button>
        <button className="btn btn-outline btn-sm" onClick={() => navigateTo('wishlist')}>
          <i className="fas fa-heart" style={{ color: 'var(--gold)' }}></i> {lang === 'ar' ? 'المفضلة' : 'Wishlist'} ({wishlistCount})
        </button>
        <button className="btn btn-outline btn-sm" onClick={() => navigateTo('post')}>
          <i className="fas fa-plus"></i> {lang === 'ar' ? 'نشر كتاب' : 'Post a book'}
        </button>
        <button className="btn btn-outline btn-sm" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> {lang === 'ar' ? 'تسجيل الخروج' : 'Log out'}
        </button>
      </div>

      <div className="book-grid">
        {loading ? (
          <div className="empty-state">{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</div>
        ) : books.length ? (
          books.map(renderMyBookCard)
        ) : (
          <div className="empty-state">
            <i className="fas fa-book"></i>
            {lang === 'ar' ? 'لا توجد منشورات حالياً.' : 'No listings yet.'}
            <a onClick={() => navigateTo('post')} style={{ color: 'var(--gold)', cursor: 'pointer', display: 'block', marginTop: '8px' }}>
              {lang === 'ar' ? 'انشر كتاباً الآن' : 'Post a book now'}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;