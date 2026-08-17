import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';
import BookCard from '../components/BookCard';
import '../styles/details.css'
import {
  apiCall,
  bookTitle,
  bookDesc,
  bookAuthor,
  bookOwner,
  bookUniversity,
  bookMajor,
  bookYear,
  bookCity,
  bookCondition,
  bookExchange,
  bookImages,
  CURRENCY,
} from '../services/api';

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, currentUser } = useAuth();
  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) fetchBook(id);
  }, [id]);

  const fetchBook = async (bookId) => {
    setLoading(true);
    try {
      const data = await apiCall(`/books/${bookId}`);
      setBook(data);
      const similar = await apiCall(`/books?major=${encodeURIComponent(data.major_key)}&limit=4`);
      setSimilarBooks((similar.books || []).filter(b => b.id !== data.id).slice(0, 3));
    } catch {
      navigate('/browse');
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async () => {
    try {
      await apiCall(`/books/wishlist/${book.id}`, { method: 'POST' });
      fetchBook(book.id);
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  const copyLink = () => {
    const url = `${window.location.origin}/book/${book.id}`;
    navigator.clipboard?.writeText(url).then(() => {
      showToast(lang === 'ar' ? 'تم نسخ الرابط!' : 'Link copied!', 'success');
    });
  };

  const deleteBook = async () => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد؟' : 'Are you sure?')) {
      await apiCall(`/books/${book.id}`, { method: 'DELETE' });
      navigate('/profile');
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner"></div>
        <p className="text-muted mt-2">{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container text-center py-5">
        <i className="fas fa-book fa-3x text-muted"></i>
        <p className="mt-2">{lang === 'ar' ? 'الكتاب غير موجود' : 'Book not found'}</p>
      </div>
    );
  }

  const ex = bookExchange(book);
  const images = bookImages(book);
  const isOwner = currentUser?.id === book.user_id;

  return (
    <div className="book-detail">
      <div className="container">

        {/* Back */}
        <button className="btn-back" onClick={() => navigate('/browse')}>
          <i className={`fas fa-arrow-${lang === 'ar' ? 'right' : 'left'}`}></i>
          {lang === 'ar' ? 'العودة' : 'Back'}
        </button>

        <div className="detail-grid">

          {/* Images */}
          <div className="detail-images">
            <div className="main-image">
              <img
                src={images[activeImage] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop'}
                alt={bookTitle(book, lang)}
              />
            </div>
            {images.length > 1 && (
              <div className="thumbnails">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className={i === activeImage ? 'active' : ''}
                    onClick={() => setActiveImage(i)}
                    alt=""
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="detail-info">
            <h1>{bookTitle(book, lang)}</h1>
            <p className="author">{bookAuthor(book, lang) || (lang === 'ar' ? 'مؤلف غير معروف' : 'Unknown')}</p>

            {book.status !== 'approved' && (
              <span className={`badge ${book.status}`}>
                {book.status === 'pending' ? (lang === 'ar' ? 'قيد المراجعة' : 'Pending') : (lang === 'ar' ? 'مرفوض' : 'Rejected')}
              </span>
            )}

            <div className="owner">
              <div className="avatar"><i className="fas fa-user"></i></div>
              <div>
                <strong>{bookOwner(book, lang)}</strong>
                <span><i className="fas fa-phone"></i> {book.phone}</span>
              </div>
            </div>

            <div className="badges">
              {ex && <span className={`badge ${ex.badge}`}><i className={`fas ${ex.icon}`}></i> {ex[lang]}{ex.key === 'sell' ? ` ${book.price} ${CURRENCY[lang]}` : ''}</span>}
              <span className="badge condition"><i className="fas fa-check"></i> {bookCondition(book, lang)}</span>
            </div>

            <div className="meta">
              <div><span>{lang === 'ar' ? 'الجامعة' : 'University'}</span> {bookUniversity(book, lang)}</div>
              <div><span>{lang === 'ar' ? 'التخصص' : 'Major'}</span> {bookMajor(book, lang)}</div>
              <div><span>{lang === 'ar' ? 'السنة' : 'Year'}</span> {bookYear(book, lang)}</div>
              <div><span>{lang === 'ar' ? 'الفصل' : 'Semester'}</span> {book.semester}</div>
              <div><span>{lang === 'ar' ? 'المدينة' : 'City'}</span> {bookCity(book, lang)}</div>
              <div><span>{lang === 'ar' ? 'تاريخ النشر' : 'Posted'}</span> {new Date(book.created_at).toLocaleDateString()}</div>
            </div>

            <div className="desc">
              <h4>{lang === 'ar' ? 'الوصف' : 'Description'}</h4>
              <p>{bookDesc(book, lang)}</p>
            </div>

            {book.status === 'approved' ? (
              <button className="btn-call" onClick={() => window.location.href = `tel:${book.phone}`}>
                <i className="fas fa-phone"></i> {lang === 'ar' ? 'اتصل بالمالك' : 'Call owner'}
              </button>
            ) : (
              <div className="notice">
                <i className="fas fa-clock"></i>
                {lang === 'ar' ? 'قيد المراجعة' : 'Under review'}
              </div>
            )}

            {/* <div className="actions">
              <button className="btn-outline" onClick={toggleWishlist}>
                <i className={`fa${book.wishlisted ? 's' : 'r'} fa-heart`}></i>
                {lang === 'ar' ? 'المفضلة' : 'Wishlist'}
              </button>
              <button className="btn-outline" onClick={copyLink}>
                <i className="fas fa-share"></i> {lang === 'ar' ? 'مشاركة' : 'Share'}
              </button>
              {isOwner && (
                <>
                  <button className="btn-outline" onClick={() => navigate(`/post?id=${book.id}`)}>
                    <i className="fas fa-edit"></i> {lang === 'ar' ? 'تعديل' : 'Edit'}
                  </button>
                  <button className="btn-danger" onClick={deleteBook}>
                    <i className="fas fa-trash"></i> {lang === 'ar' ? 'حذف' : 'Delete'}
                  </button>
                </>
              )}
            </div> */}

            <div className="action-row">
  <button className="btn btn-outline btn-sm" onClick={toggleWishlist}>
    <i className={`fa${book.wishlisted ? 's' : 'r'} fa-heart`}></i>
    {lang === 'ar' ? 'المفضلة' : 'Wishlist'}
  </button>
  <button className="btn btn-outline btn-sm" onClick={copyLink}>
    <i className="fas fa-share-alt"></i> {lang === 'ar' ? 'مشاركة' : 'Share'}
  </button>
  {isOwner && (
    <>
      <button className="btn btn-outline btn-sm" onClick={() => navigate(`/post?id=${book.id}`)}>
        <i className="fas fa-edit"></i> {lang === 'ar' ? 'تعديل' : 'Edit'}
      </button>
      <button className="btn btn-danger btn-sm" onClick={deleteBook}>
        <i className="fas fa-trash"></i> {lang === 'ar' ? 'حذف' : 'Delete'}
      </button>
    </>
  )}
</div>

            <div className="views">
              <i className="fas fa-eye"></i> {book.views || 0} {lang === 'ar' ? 'مشاهدة' : 'views'}
            </div>
          </div>
        </div>

        {/* Similar */}
        {similarBooks.length > 0 && (
          <div className="similar">
            <h3>{lang === 'ar' ? 'كتب مشابهة' : 'Similar books'}</h3>
            <div className="book-grid">
              {similarBooks.map(b => <BookCard key={b.id} book={b} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetails;
