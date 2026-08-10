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



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { showToast } from '../components/Toast';
// import { apiCall, bookTitle, bookUniversity, bookMajor, bookYear, bookCity, bookExchange, bookImages, CURRENCY } from '../services/api';

// function Wishlist() {
//   const navigate = useNavigate();
//   const { lang, currentUser } = useAuth();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [removingId, setRemovingId] = useState(null);

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
//       showToast(error.message || (lang === 'ar' ? 'تعذر تحميل المفضلة' : 'Failed to load wishlist'), 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemove = async (bookId) => {
//     setRemovingId(bookId);
//     try {
//       await apiCall(`/books/wishlist/${bookId}`, { method: 'POST' });
//       setBooks((prev) => prev.filter((book) => book.id !== bookId));
//       showToast(lang === 'ar' ? 'تمت الإزالة من المفضلة' : 'Removed from wishlist', 'success');
//     } catch (error) {
//       showToast(error.message || (lang === 'ar' ? 'حدث خطأ' : 'Something went wrong'), 'error');
//     } finally {
//       setRemovingId(null);
//     }
//   };

//   if (!currentUser) return null;

//   return (
//     <div className="container" style={{ padding: '32px 0 56px' }}>

//       {/* Header */}
//       <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '8px' }}>
//         <div>
//           <h1 style={{
//             fontSize: '1.75rem',
//             fontWeight: 700,
//             margin: 0,
//             fontFamily: 'var(--font-serif)',
//             color: 'var(--black)',
//             letterSpacing: '-0.01em'
//           }}>
//             {lang === 'ar' ? 'المفضلة' : 'Wishlist'}
//           </h1>
//         </div>
//         {!loading && books.length > 0 && (
//           <span style={{
//             fontSize: '0.8rem',
//             fontWeight: 600,
//             color: 'var(--text-secondary)',
//             letterSpacing: '0.02em',
//             textTransform: 'uppercase'
//           }}>
//             {books.length} {lang === 'ar' ? (books.length === 1 ? 'كتاب' : 'كتب') : books.length === 1 ? 'book' : 'books'}
//           </span>
//         )}
//       </div>

//       {/* Loading */}
//       {loading && (
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '22px' }}>
//           {Array.from({ length: 4 }).map((_, i) => (
//             <div key={i} style={{
//               borderRadius: '14px',
//               overflow: 'hidden',
//               border: '1px solid var(--border)',
//               background: 'var(--white)'
//             }}>
//               <div style={{ height: '200px', background: 'var(--off-white)', animation: 'pulse 1.4s ease-in-out infinite' }} />
//               <div style={{ padding: '14px 16px' }}>
//                 <div style={{ height: '12px', width: '70%', background: 'var(--off-white)', borderRadius: '4px', marginBottom: '8px', animation: 'pulse 1.4s ease-in-out infinite' }} />
//                 <div style={{ height: '10px', width: '45%', background: 'var(--off-white)', borderRadius: '4px', animation: 'pulse 1.4s ease-in-out infinite' }} />
//               </div>
//             </div>
//           ))}
//           <style>{`@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
//         </div>
//       )}

//       {/* Empty state — no browse / no filters, just a clean invitation */}
//       {!loading && books.length === 0 && (
//         <div style={{
//           textAlign: 'center',
//           padding: '80px 20px',
//           border: '1px dashed var(--border)',
//           borderRadius: '16px'
//         }}>
//           <i className="fas fa-heart" style={{ fontSize: '2.25rem', color: 'var(--gold)', opacity: 0.5, marginBottom: '18px', display: 'block' }}></i>
//           <h2 style={{ fontSize: '1.15rem', fontWeight: 600, margin: '0 0 6px', fontFamily: 'var(--font-serif)', color: 'var(--black)' }}>
//             {lang === 'ar' ? 'قائمة المفضلة فارغة' : 'Your wishlist is empty'}
//           </h2>
//           <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
//             {lang === 'ar' ? 'الكتب التي تحفظها ستظهر هنا' : 'Books you save will appear here'}
//           </p>
//         </div>
//       )}

//       {/* Wishlist grid — books only */}
//       {!loading && books.length > 0 && (
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '22px' }}>
//           {books.map((book) => {
//             const ex = bookExchange(book);
//             const images = bookImages(book);
//             const priceText = ex && ex.key === 'sell' ? ` · ${book.price} ${CURRENCY[lang]}` : '';
//             const isRemoving = removingId === book.id;

//             return (
//               <div
//                 key={book.id}
//                 style={{
//                   background: 'var(--white)',
//                   borderRadius: '14px',
//                   border: '1px solid var(--border)',
//                   overflow: 'hidden',
//                   cursor: 'pointer',
//                   transition: 'transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease',
//                   opacity: isRemoving ? 0.4 : 1,
//                   pointerEvents: isRemoving ? 'none' : 'auto'
//                 }}
//                 onClick={() => navigate(`/book/${book.id}`)}
//                 onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
//                 onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
//               >
//                 {/* Image */}
//                 <div style={{ position: 'relative', height: '190px', overflow: 'hidden', background: 'var(--off-white)' }}>
//                   <img
//                     src={images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop'}
//                     alt={bookTitle(book, lang)}
//                     style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                   />

//                   {/* Remove button */}
//                   <button
//                     onClick={(e) => { e.stopPropagation(); handleRemove(book.id); }}
//                     aria-label={lang === 'ar' ? 'إزالة من المفضلة' : 'Remove from wishlist'}
//                     disabled={isRemoving}
//                     style={{
//                       position: 'absolute',
//                       top: '10px',
//                       right: '10px',
//                       width: '30px',
//                       height: '30px',
//                       borderRadius: '50%',
//                       background: 'rgba(255,255,255,0.95)',
//                       border: 'none',
//                       boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
//                       color: '#c0334a',
//                       cursor: isRemoving ? 'default' : 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontSize: '0.75rem',
//                       transition: 'background 0.2s, color 0.2s'
//                     }}
//                     onMouseEnter={(e) => { if (!isRemoving) { e.currentTarget.style.background = '#c0334a'; e.currentTarget.style.color = 'white'; } }}
//                     onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; e.currentTarget.style.color = '#c0334a'; }}
//                   >
//                     <i className={isRemoving ? 'fas fa-spinner fa-spin' : 'fas fa-times'}></i>
//                   </button>

//                   {ex && (
//                     <span style={{
//                       position: 'absolute',
//                       bottom: '10px',
//                       left: '10px',
//                       padding: '3px 11px',
//                       borderRadius: '20px',
//                       fontSize: '0.65rem',
//                       fontWeight: 700,
//                       letterSpacing: '0.02em',
//                       background: ex.badge === 'free' ? 'rgba(212,237,218,0.95)' : ex.badge === 'sell' ? 'rgba(248,215,218,0.95)' : 'rgba(209,236,241,0.95)',
//                       color: ex.badge === 'free' ? '#155724' : ex.badge === 'sell' ? '#721c24' : '#0c5460'
//                     }}>
//                       <i className={`fas ${ex.icon}`}></i> {ex[lang]}{priceText}
//                     </span>
//                   )}
//                 </div>

//                 {/* Info */}
//                 <div style={{ padding: '14px 16px 16px' }}>
//                   <h3 style={{
//                     fontSize: '0.92rem',
//                     fontWeight: 600,
//                     margin: '0 0 6px',
//                     color: 'var(--black)',
//                     fontFamily: 'var(--font-serif)',
//                     lineHeight: 1.3,
//                     display: '-webkit-box',
//                     WebkitLineClamp: 2,
//                     WebkitBoxOrient: 'vertical',
//                     overflow: 'hidden'
//                   }}>
//                     {bookTitle(book, lang)}
//                   </h3>
//                   <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '3px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
//                     <i className="fas fa-university" style={{ width: '13px', color: 'var(--gold)', fontSize: '0.75rem' }}></i>
//                     <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{bookUniversity(book, lang)}</span>
//                   </p>
//                   <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '3px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
//                     <i className="fas fa-map-pin" style={{ width: '13px', color: 'var(--gold)', fontSize: '0.75rem' }}></i>
//                     <span>{bookCity(book, lang)}</span>
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Wishlist;











// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { showToast } from '../components/Toast';
// import { apiCall, bookTitle, bookUniversity, bookMajor, bookYear, bookCity, bookExchange, bookImages, CURRENCY } from '../services/api';

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

//   const handleRemoveFromWishlist = async (bookId) => {
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
//     <div className="wishlist-page">
//       <div className="container">

//         {/* Header */}
//         <div className="wishlist-header">
//           <h1>
//             <i className="fas fa-heart" style={{ color: '#e0455f' }}></i>
//             {lang === 'ar' ? 'المفضلة' : 'Wishlist'}
//           </h1>
//           <p className="text-muted">
//             {lang === 'ar'
//               ? `لديك ${books.length} كتب في المفضلة`
//               : `You have ${books.length} books in wishlist`}
//           </p>
//         </div>

//         {/* Loading */}
//         {loading ? (
//           <div className="wishlist-loading">
//             <div className="spinner"></div>
//             <p>{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
//           </div>
//         ) : books.length === 0 ? (
//           /* Empty State */
//           <div className="wishlist-empty">
//             <i className="fas fa-heart"></i>
//             <h2>{lang === 'ar' ? 'لا توجد كتب في المفضلة' : 'No books in wishlist'}</h2>
//             <p>{lang === 'ar' ? 'أضف كتبك المفضلة هنا' : 'Add your favorite books here'}</p>
//             <button className="btn btn-gold" onClick={() => navigate('/browse')}>
//               <i className="fas fa-book-open"></i>
//               {lang === 'ar' ? 'استعراض الكتب' : 'Browse Books'}
//             </button>
//           </div>
//         ) : (
//           /* Wishlist Grid */
//           <div className="wishlist-grid">
//             {books.map((book) => {
//               const ex = bookExchange(book);
//               const images = bookImages(book);
//               const priceText = ex && ex.key === 'sell' ? ` · ${book.price} ${CURRENCY[lang]}` : '';

//               return (
//                 <div key={book.id} className="wishlist-item">
//                   <div className="wishlist-item-image" onClick={() => navigate(`/book/${book.id}`)}>
//                     <img
//                       src={images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop'}
//                       alt={bookTitle(book, lang)}
//                     />
//                     <button 
//                       className="wishlist-remove"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleRemoveFromWishlist(book.id);
//                       }}
//                     >
//                       <i className="fas fa-times"></i>
//                     </button>
//                   </div>
//                   <div className="wishlist-item-info" onClick={() => navigate(`/book/${book.id}`)}>
//                     <h3>{bookTitle(book, lang)}</h3>
//                     <p>
//                       <i className="fas fa-university"></i> {bookUniversity(book, lang)}
//                     </p>
//                     <p>
//                       <i className="fas fa-graduation-cap"></i> {bookMajor(book, lang)} · {bookYear(book, lang)}
//                     </p>
//                     <p>
//                       <i className="fas fa-map-pin"></i> {bookCity(book, lang)}
//                     </p>
//                     {ex && (
//                       <span className={`wishlist-badge ${ex.badge}`}>
//                         <i className={`fas ${ex.icon}`}></i> {ex[lang]}{priceText}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Wishlist;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';
import { apiCall, bookTitle, bookUniversity, bookCity, bookExchange, bookImages, CURRENCY } from '../services/api';

function Wishlist() {
  const navigate = useNavigate();
  const { lang, currentUser } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

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
      console.log('📚 Wishlist data:', data);
      setBooks(data || []);
    } catch (error) {
      console.error('❌ Error:', error);
      showToast(error.message || (lang === 'ar' ? 'تعذر تحميل المفضلة' : 'Failed to load wishlist'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (bookId) => {
    setRemovingId(bookId);
    try {
      await apiCall(`/books/wishlist/${bookId}`, { method: 'POST' });
      setBooks((prev) => prev.filter((book) => book.id !== bookId));
      showToast(lang === 'ar' ? 'تمت الإزالة من المفضلة' : 'Removed from wishlist', 'success');
    } catch (error) {
      showToast(error.message || (lang === 'ar' ? 'حدث خطأ' : 'Something went wrong'), 'error');
    } finally {
      setRemovingId(null);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="container" style={{ padding: '32px 0 56px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            margin: 0,
            fontFamily: 'var(--font-serif)',
            color: 'var(--black)',
            letterSpacing: '-0.01em'
          }}>
            <i className="fas fa-heart" style={{ color: '#e0455f', marginRight: '10px' }}></i>
            {lang === 'ar' ? 'المفضلة' : 'Wishlist'}
          </h1>
        </div>
        {!loading && books.length > 0 && (
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            letterSpacing: '0.02em',
            textTransform: 'uppercase'
          }}>
            {books.length} {lang === 'ar' ? (books.length === 1 ? 'كتاب' : 'كتب') : books.length === 1 ? 'book' : 'books'}
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            margin: '0 auto', 
            border: '3px solid var(--border)', 
            borderTop: '3px solid var(--gold)', 
            borderRadius: '50%', 
            animation: 'spin 0.8s linear infinite' 
          }} />
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
            {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </p>
        </div>
      )}

      {/* Empty state */}
      {!loading && books.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          border: '1px dashed var(--border)',
          borderRadius: '16px'
        }}>
          <i className="fas fa-heart" style={{ fontSize: '2.25rem', color: 'var(--gold)', opacity: 0.5, marginBottom: '18px', display: 'block' }}></i>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 600, margin: '0 0 6px', fontFamily: 'var(--font-serif)', color: 'var(--black)' }}>
            {lang === 'ar' ? 'قائمة المفضلة فارغة' : 'Your wishlist is empty'}
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 16px' }}>
            {lang === 'ar' ? 'الكتب التي تحفظها ستظهر هنا' : 'Books you save will appear here'}
          </p>
          <button className="btn btn-gold" onClick={() => navigate('/browse')}>
            <i className="fas fa-book-open"></i>
            {lang === 'ar' ? 'استعراض الكتب' : 'Browse Books'}
          </button>
        </div>
      )}

      {/* Wishlist grid */}
      {!loading && books.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '22px' }}>
          {books.map((book) => {
            const ex = bookExchange(book);
            const images = bookImages(book);
            const priceText = ex && ex.key === 'sell' ? ` · ${book.price} ${CURRENCY[lang]}` : '';
            const isRemoving = removingId === book.id;

            return (
              <div
                key={book.id}
                style={{
                  background: 'var(--white)',
                  borderRadius: '14px',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease',
                  opacity: isRemoving ? 0.4 : 1,
                  pointerEvents: isRemoving ? 'none' : 'auto'
                }}
                onClick={() => navigate(`/book/${book.id}`)}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '190px', overflow: 'hidden', background: 'var(--off-white)' }}>
                  <img
                    src={images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop'}
                    alt={bookTitle(book, lang)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Remove button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRemove(book.id); }}
                    aria-label={lang === 'ar' ? 'إزالة من المفضلة' : 'Remove from wishlist'}
                    disabled={isRemoving}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.95)',
                      border: 'none',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                      color: '#c0334a',
                      cursor: isRemoving ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      transition: 'background 0.2s, color 0.2s'
                    }}
                    onMouseEnter={(e) => { if (!isRemoving) { e.currentTarget.style.background = '#c0334a'; e.currentTarget.style.color = 'white'; } }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; e.currentTarget.style.color = '#c0334a'; }}
                  >
                    <i className={isRemoving ? 'fas fa-spinner fa-spin' : 'fas fa-times'}></i>
                  </button>

                  {ex && (
                    <span style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      padding: '3px 11px',
                      borderRadius: '20px',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      background: ex.badge === 'free' ? 'rgba(212,237,218,0.95)' : ex.badge === 'sell' ? 'rgba(248,215,218,0.95)' : 'rgba(209,236,241,0.95)',
                      color: ex.badge === 'free' ? '#155724' : ex.badge === 'sell' ? '#721c24' : '#0c5460'
                    }}>
                      <i className={`fas ${ex.icon}`}></i> {ex[lang]}{priceText}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: '14px 16px 16px' }}>
                  <h3 style={{
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    margin: '0 0 6px',
                    color: 'var(--black)',
                    fontFamily: 'var(--font-serif)',
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {bookTitle(book, lang)}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '3px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fas fa-university" style={{ width: '13px', color: 'var(--gold)', fontSize: '0.75rem' }}></i>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{bookUniversity(book, lang)}</span>
                  </p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '3px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fas fa-map-pin" style={{ width: '13px', color: 'var(--gold)', fontSize: '0.75rem' }}></i>
                    <span>{bookCity(book, lang)}</span>
                  </p>
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
