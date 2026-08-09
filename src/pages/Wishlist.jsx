import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import { showToast } from '../components/Toast';
import { apiCall } from '../services/api';

function Wishlist() {
  const navigate = useNavigate();
  const { lang, currentUser } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchWishlist();
    } else {
      navigate('/login');
    }
  }, [currentUser]);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const data = await apiCall('/books/wishlist');
      setBooks(data || []);
    } catch (error) {
      showToast(error.message || 'Failed to load wishlist', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleWishlist = async (bookId) => {
    try {
      await apiCall(`/books/wishlist/${bookId}`, { method: 'POST' });
      // Remove from list
      setBooks(books.filter(book => book.id !== bookId));
      showToast(
        lang === 'ar' ? 'تمت إزالة الكتاب من المفضلة' : 'Book removed from wishlist',
        'success'
      );
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      {/* Header */}
      <div className="wishlist-header">
        <h1>
          <i className="fas fa-heart" style={{ color: '#e0455f' }}></i>
          {lang === 'ar' ? 'المفضلة' : 'Wishlist'}
        </h1>
        <p className="text-muted">
          {lang === 'ar'
            ? `لديك ${books.length} كتب في قائمة المفضلة`
            : `You have ${books.length} books in your wishlist`}
        </p>
      </div>

      {/* Books Grid */}
      {loading ? (
        <div className="empty-state">
          <i className="fas fa-spinner fa-spin"></i>
          <p>{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      ) : books.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-heart" style={{ fontSize: '3rem', color: 'var(--text-light)' }}></i>
          <p style={{ fontSize: '1.1rem', marginTop: '12px' }}>
            {lang === 'ar' ? 'قائمة المفضلة فارغة' : 'Wishlist is empty'}
          </p>
          <p className="text-muted" style={{ marginBottom: '16px' }}>
            {lang === 'ar'
              ? 'أضف كتبك المفضلة لتجدها بسهولة لاحقاً'
              : 'Add your favorite books to find them easily later'}
          </p>
          <button className="btn btn-gold" onClick={() => navigate('/browse')}>
            <i className="fas fa-book-open"></i>
            {lang === 'ar' ? 'استعراض الكتب' : 'Browse Books'}
          </button>
        </div>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <div key={book.id} className="wishlist-item">
              <BookCard
                book={book}
                onToggleWishlist={handleToggleWishlist}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
