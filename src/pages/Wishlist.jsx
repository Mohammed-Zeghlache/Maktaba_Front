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
      showToast(error.message || 'Failed to load wishlist', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await apiCall(`/books/wishlist/${bookId}`, { method: 'POST' });
      setBooks(books.filter(book => book.id !== bookId));
      showToast(
        lang === 'ar' ? 'تمت الإزالة' : 'Removed',
        'success'
      );
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="container" style={{ padding: '20px 0 40px' }}>
      
      {/* Simple Header */}
      <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
        <i className="fas fa-heart" style={{ color: '#e0455f', marginRight: '10px' }}></i>
        {lang === 'ar' ? 'المفضلة' : 'Wishlist'}
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        {books.length} {lang === 'ar' ? 'كتاب' : 'books'}
      </p>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div className="spinner" style={{ width: '36px', height: '36px', margin: '0 auto', border: '3px solid var(--border)', borderTop: '3px solid var(--gold)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && books.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <i className="fas fa-heart" style={{ fontSize: '3.5rem', color: '#e0455f', opacity: 0.3, marginBottom: '16px', display: 'block' }}></i>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>{lang === 'ar' ? 'لا توجد كتب' : 'No books'}</h2>
          <button className="btn btn-gold" onClick={() => navigate('/browse')}>
            <i className="fas fa-book-open"></i> {lang === 'ar' ? 'استعراض' : 'Browse'}
          </button>
        </div>
      )}

      {/* Books Grid - ONLY BOOKS */}
      {!loading && books.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {books.map((book) => {
            const ex = bookExchange(book);
            const images = bookImages(book);
            const priceText = ex && ex.key === 'sell' ? ` · ${book.price} ${CURRENCY[lang]}` : '';

            return (
              <div 
                key={book.id} 
                style={{ 
                  background: 'var(--white)', 
                  borderRadius: '12px', 
                  border: '1px solid var(--border)', 
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative'
                }}
                onClick={() => navigate(`/book/${book.id}`)}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Image */}
                <div style={{ height: '180px', overflow: 'hidden', background: 'var(--off-white)' }}>
                  <img 
                    src={images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop'} 
                    alt={bookTitle(book, lang)} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Remove button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemove(book.id); }}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.9)',
                      border: '1px solid var(--border)',
                      color: '#dc3545',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#dc3545'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.color = '#dc3545'; }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                {/* Info */}
                <div style={{ padding: '12px 14px 14px' }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0 0 4px', color: 'var(--black)', fontFamily: 'var(--font-serif)' }}>
                    {bookTitle(book, lang)}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '2px 0' }}>
                    <i className="fas fa-university" style={{ width: '14px', color: 'var(--gold)' }}></i> {bookUniversity(book, lang)}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '2px 0' }}>
                    <i className="fas fa-map-pin" style={{ width: '14px', color: 'var(--gold)' }}></i> {bookCity(book, lang)}
                  </p>
                  {ex && (
                    <span style={{ 
                      display: 'inline-block', 
                      padding: '2px 10px', 
                      borderRadius: '20px', 
                      fontSize: '0.65rem', 
                      fontWeight: 600,
                      marginTop: '6px',
                      background: ex.badge === 'free' ? '#d4edda' : ex.badge === 'sell' ? '#f8d7da' : '#d1ecf1',
                      color: ex.badge === 'free' ? '#155724' : ex.badge === 'sell' ? '#721c24' : '#0c5460'
                    }}>
                      <i className={`fas ${ex.icon}`}></i> {ex[lang]}{priceText}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
