// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import BookCard from '../components/BookCard';
// import { showToast } from '../components/Toast';
// import { apiCall } from '../services/api';

// function Wishlist() {
//   const navigate = useNavigate();
//   const { lang, currentUser } = useAuth();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (currentUser) {
//       fetchWishlist();
//     } else {
//       navigate('/login');
//     }
//   }, [currentUser]);

//   const fetchWishlist = async () => {
//     setLoading(true);
//     try {
//       const data = await apiCall('/books/wishlist');
//       setBooks(data || []);
//     } catch (error) {
//       showToast(error.message || 'Failed to load wishlist', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleWishlist = async (bookId) => {
//     try {
//       await apiCall(`/books/wishlist/${bookId}`, { method: 'POST' });
//       // Remove from list
//       setBooks(books.filter(book => book.id !== bookId));
//       showToast(
//         lang === 'ar' ? 'تمت إزالة الكتاب من المفضلة' : 'Book removed from wishlist',
//         'success'
//       );
//     } catch (error) {
//       showToast(error.message, 'error');
//     }
//   };

//   if (!currentUser) {
//     return null;
//   }

//   return (
//     <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
//       {/* Header */}
//       <div className="wishlist-header">
//         <h1>
//           <i className="fas fa-heart" style={{ color: '#e0455f' }}></i>
//           {lang === 'ar' ? 'المفضلة' : 'Wishlist'}
//         </h1>
//         <p className="text-muted">
//           {lang === 'ar'
//             ? `لديك ${books.length} كتب في قائمة المفضلة`
//             : `You have ${books.length} books in your wishlist`}
//         </p>
//       </div>

//       {/* Books Grid */}
//       {loading ? (
//         <div className="empty-state">
//           <i className="fas fa-spinner fa-spin"></i>
//           <p>{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
//         </div>
//       ) : books.length === 0 ? (
//         <div className="empty-state">
//           <i className="fas fa-heart" style={{ fontSize: '3rem', color: 'var(--text-light)' }}></i>
//           <p style={{ fontSize: '1.1rem', marginTop: '12px' }}>
//             {lang === 'ar' ? 'قائمة المفضلة فارغة' : 'Wishlist is empty'}
//           </p>
//           <p className="text-muted" style={{ marginBottom: '16px' }}>
//             {lang === 'ar'
//               ? 'أضف كتبك المفضلة لتجدها بسهولة لاحقاً'
//               : 'Add your favorite books to find them easily later'}
//           </p>
//           <button className="btn btn-gold" onClick={() => navigate('/browse')}>
//             <i className="fas fa-book-open"></i>
//             {lang === 'ar' ? 'استعراض الكتب' : 'Browse Books'}
//           </button>
//         </div>
//       ) : (
//         <div className="book-grid">
//           {books.map((book) => (
//             <div key={book.id} className="wishlist-item">
//               <BookCard
//                 book={book}
//                 onToggleWishlist={handleToggleWishlist}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Wishlist;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import BookCard from '../components/BookCard';
// import { showToast } from '../components/Toast';
// import { apiCall } from '../services/api';

// function Wishlist() {
//   const navigate = useNavigate();
//   const { lang, currentUser } = useAuth();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (currentUser) {
//       fetchWishlist();
//     } else {
//       navigate('/login');
//     }
//   }, [currentUser]);

//   const fetchWishlist = async () => {
//     setLoading(true);
//     try {
//       const data = await apiCall('/books/wishlist');
//       setBooks(data || []);
//     } catch (error) {
//       console.error('Wishlist error:', error);
//       showToast(error.message || 'Failed to load wishlist', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleWishlist = async (bookId) => {
//     try {
//       await apiCall(`/books/wishlist/${bookId}`, { method: 'POST' });
//       setBooks(books.filter(book => book.id !== bookId));
//       showToast(
//         lang === 'ar' ? 'تمت إزالة الكتاب من المفضلة' : 'Book removed from wishlist',
//         'success'
//       );
//     } catch (error) {
//       showToast(error.message, 'error');
//     }
//   };

//   if (!currentUser) {
//     return null;
//   }

//   return (
//     <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
//       {/* Header */}
//       <div className="wishlist-header">
//         <h1>
//           <i className="fas fa-heart" style={{ color: '#e0455f' }}></i>
//           {lang === 'ar' ? 'المفضلة' : 'Wishlist'}
//         </h1>
//         <p className="text-muted">
//           {lang === 'ar'
//             ? `لديك ${books.length} كتب في قائمة المفضلة`
//             : `You have ${books.length} books in your wishlist`}
//         </p>
//       </div>

//       {/* Books Grid */}
//       {loading ? (
//         <div className="empty-state">
//           <i className="fas fa-spinner fa-spin"></i>
//           <p>{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
//         </div>
//       ) : books.length === 0 ? (
//         <div className="empty-state">
//           <i className="fas fa-heart" style={{ fontSize: '3rem', color: 'var(--text-light)' }}></i>
//           <p style={{ fontSize: '1.1rem', marginTop: '12px' }}>
//             {lang === 'ar' ? 'قائمة المفضلة فارغة' : 'Wishlist is empty'}
//           </p>
//           <p className="text-muted" style={{ marginBottom: '16px' }}>
//             {lang === 'ar'
//               ? 'أضف كتبك المفضلة لتجدها بسهولة لاحقاً'
//               : 'Add your favorite books to find them easily later'}
//           </p>
//           <button className="btn btn-gold" onClick={() => navigate('/browse')}>
//             <i className="fas fa-book-open"></i>
//             {lang === 'ar' ? 'استعراض الكتب' : 'Browse Books'}
//           </button>
//         </div>
//       ) : (
//         <div className="book-grid">
//           {books.map((book) => (
//             <BookCard
//               key={book.id}
//               book={book}
//               onToggleWishlist={handleToggleWishlist}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Wishlist;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';
import { apiCall, bookTitle, bookUniversity, bookMajor, bookYear, bookCity, bookExchange, bookImages, CURRENCY } from '../services/api';

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
      console.error('Wishlist error:', error);
      showToast(error.message || 'Failed to load wishlist', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (bookId) => {
    try {
      await apiCall(`/books/wishlist/${bookId}`, { method: 'POST' });
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
    <div className="wishlist-page">
      <div className="container">

        {/* Header */}
        <div className="wishlist-header">
          <div className="wishlist-header-content">
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
          {books.length > 0 && (
            <button 
              className="btn btn-outline btn-sm" 
              onClick={() => {
                if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف جميع الكتب من المفضلة؟' : 'Are you sure you want to remove all books from wishlist?')) {
                  // Clear all wishlist
                  Promise.all(books.map(b => apiCall(`/books/wishlist/${b.id}`, { method: 'POST' })))
                    .then(() => {
                      setBooks([]);
                      showToast(
                        lang === 'ar' ? 'تم حذف جميع الكتب من المفضلة' : 'All books removed from wishlist',
                        'success'
                      );
                    })
                    .catch(err => showToast(err.message, 'error'));
                }
              }}
            >
              <i className="fas fa-trash-alt"></i>
              {lang === 'ar' ? 'حذف الكل' : 'Clear all'}
            </button>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="wishlist-loading">
            <div className="spinner"></div>
            <p>{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
          </div>
        ) : books.length === 0 ? (
          /* Empty State */
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">
              <i className="fas fa-heart"></i>
            </div>
            <h2>{lang === 'ar' ? 'قائمة المفضلة فارغة' : 'Wishlist is empty'}</h2>
            <p>{lang === 'ar' ? 'أضف كتبك المفضلة لتجدها بسهولة لاحقاً' : 'Add your favorite books to find them easily later'}</p>
            <button className="btn btn-gold" onClick={() => navigate('/browse')}>
              <i className="fas fa-book-open"></i>
              {lang === 'ar' ? 'استعراض الكتب' : 'Browse Books'}
            </button>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="wishlist-grid">
            {books.map((book) => {
              const ex = bookExchange(book);
              const images = bookImages(book);
              const priceText = ex && ex.key === 'sell' ? ` · ${book.price} ${CURRENCY[lang]}` : '';

              return (
                <div key={book.id} className="wishlist-card">
                  <div className="wishlist-card-image" onClick={() => navigate(`/book/${book.id}`)}>
                    <img
                      src={images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop'}
                      alt={bookTitle(book, lang)}
                    />
                    <button 
                      className="wishlist-remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromWishlist(book.id);
                      }}
                      title={lang === 'ar' ? 'إزالة من المفضلة' : 'Remove from wishlist'}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="wishlist-card-body" onClick={() => navigate(`/book/${book.id}`)}>
                    <h3>{bookTitle(book, lang)}</h3>
                    <div className="wishlist-card-meta">
                      <span><i className="fas fa-university"></i> {bookUniversity(book, lang)}</span>
                      <span><i className="fas fa-graduation-cap"></i> {bookMajor(book, lang)}</span>
                    </div>
                    <div className="wishlist-card-meta">
                      <span><i className="fas fa-map-pin"></i> {bookCity(book, lang)}</span>
                      <span><i className="fas fa-calendar"></i> {bookYear(book, lang)}</span>
                    </div>
                    {ex && (
                      <div className={`wishlist-card-badge ${ex.badge}`}>
                        <i className={`fas ${ex.icon}`}></i> {ex[lang]}{priceText}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
