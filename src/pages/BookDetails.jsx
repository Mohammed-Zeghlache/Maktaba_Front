// // import React, { useState, useEffect } from 'react';
// // import { useAuth } from '../context/AuthContext';
// // import BookCard from '../components/BookCard';
// // import { useNavigate, useParams } from 'react-router-dom';

// // import {
// //   apiCall,
// //   bookTitle,
// //   bookDesc,
// //   bookAuthor,
// //   bookOwner,
// //   bookUniversity,
// //   bookMajor,
// //   bookYear,
// //   bookCity,
// //   bookCondition,
// //   bookExchange,
// //   bookImages,
// //   CURRENCY,
// //   EXCHANGE_TYPES
// // } from '../services/api';

// // function BookDetails({ navigateTo, bookId }) {
// //    const navigate = useNavigate();
// //   const { id } = useParams();


// //   const { lang, currentUser } = useAuth();
// //   const [book, setBook] = useState(null);
// //   const [similarBooks, setSimilarBooks] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [activeImageIndex, setActiveImageIndex] = useState(0);

// //   useEffect(() => {
// //     if (bookId) {
// //       fetchBookDetails(bookId);
// //     }
// //   }, [bookId]);

// //   const fetchBookDetails = async (id) => {
// //     try {
// //       const data = await apiCall(`/books/${id}`);
// //       setBook(data);
// //       setActiveImageIndex(0);
// //       // Fetch similar books
// //       const similar = await apiCall(`/books?major=${encodeURIComponent(data.major_key)}&limit=4`);
// //       setSimilarBooks((similar.books || []).filter(b => b.id !== data.id).slice(0, 3));
// //     } catch (e) {
// //       // Book not found
// //       navigateTo('browse');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleToggleWishlist = async (id) => {
// //     try {
// //       const result = await apiCall(`/books/wishlist/${id}`, { method: 'POST' });
// //       // Refresh book details to update wishlist status
// //       fetchBookDetails(id);
// //     } catch (e) {
// //       console.error('Wishlist error:', e);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="container" style={{ padding: '40px 0' }}>
// //         <div className="empty-state">{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</div>
// //       </div>
// //     );
// //   }

// //   if (!book) {
// //     return (
// //       <div className="container" style={{ padding: '40px 0' }}>
// //         <div className="empty-state">
// //           <i className="fas fa-book"></i>
// //           {lang === 'ar' ? 'الكتاب غير موجود' : 'Book not found'}
// //         </div>
// //       </div>
// //     );
// //   }

// //   const ex = bookExchange(book);
// //   const priceText = ex && ex.key === 'sell' ? `${book.price} ${CURRENCY[lang]}` : (ex ? ex[lang] : '');
// //   const images = bookImages(book);
// //   const isOwner = currentUser && currentUser.id === book.user_id;
// //   const waLink = `https://wa.me/${(book.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
// //     (lang === 'ar' ? 'مرحباً، أنا مهتم بكتاب "' : "Hi, I'm interested in your book ") +
// //     bookTitle(book, lang) +
// //     (lang === 'ar' ? '" على مكتبة.' : '" on Maktaba.')
// //   )}`;

// //   return (
// //     <div className="container">
// //       <div style={{ padding: '14px 0' }}>
// //         <button className="btn btn-outline btn-sm" onClick={() => navigateTo('browse')}>
// //           <i className="fas fa-arrow-right"></i> {lang === 'ar' ? 'العودة إلى الاستعراض' : 'Back to browse'}
// //         </button>
// //       </div>

// //       <div className="detail-container">
// //         {/* Gallery */}
// //         <div>
// //           <div className="detail-gallery-main">
// //             <img
// //               src={images[activeImageIndex] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop'}
// //               alt={bookTitle(book, lang)}
// //             />
// //           </div>
// //           {images.length > 1 && (
// //             <div className="detail-thumbs">
// //               {images.map((img, i) => (
// //                 <img
// //                   key={i}
// //                   src={img}
// //                   className={i === activeImageIndex ? 'active' : ''}
// //                   onClick={() => setActiveImageIndex(i)}
// //                   alt={`Thumbnail ${i + 1}`}
// //                 />
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Info */}
// //         <div className="detail-info">
// //           <h1>{bookTitle(book, lang)}</h1>
// //           <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
// //             {bookAuthor(book, lang) || (lang === 'ar' ? 'مؤلف غير معروف' : 'Unknown author')}
// //           </p>

// //           {book.status !== 'approved' && (
// //             <div className={`book-badge ${book.status === 'pending' ? 'pending' : 'rejected'}`}
// //                  style={{ fontSize: '0.82rem', padding: '4px 16px', margin: '0 0 12px 0' }}>
// //               <i className={`fas ${book.status === 'pending' ? 'fa-clock' : 'fa-times-circle'}`}></i>
// //               {book.status === 'pending'
// //                 ? (lang === 'ar' ? 'قيد المراجعة من قبل المسؤول' : 'Under review')
// //                 : (lang === 'ar' ? 'تم رفض هذا الكتاب' : 'This book was rejected')}
// //             </div>
// //           )}

// //           <div className="owner">
// //             <div className="avatar"><i className="fas fa-user"></i></div>
// //             <div>
// //               <strong>{bookOwner(book, lang)}</strong>
// //               <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
// //                 <i className="fas fa-phone-alt" style={{ color: 'var(--gold)' }}></i> {book.phone}
// //               </div>
// //             </div>
// //           </div>

// //           <div style={{ margin: '12px 0' }}>
// //             {ex && (
// //               <span className={`book-badge ${ex.badge}`} style={{ fontSize: '0.82rem', padding: '4px 16px' }}>
// //                 <i className={`fas ${ex.icon}`}></i> {priceText}
// //               </span>
// //             )}
// //             <span className="book-badge" style={{ background: '#e8edf5', color: '#4a6fb3', fontSize: '0.82rem', padding: '4px 16px' }}>
// //               <i className="fas fa-check-circle"></i> {bookCondition(book, lang)}
// //             </span>
// //           </div>

// //           <div className="detail-meta-grid">
// //             <div className="meta-item">
// //               <span className="label">{lang === 'ar' ? 'الجامعة' : 'University'}</span>
// //               <span>{bookUniversity(book, lang)}</span>
// //             </div>
// //             <div className="meta-item">
// //               <span className="label">{lang === 'ar' ? 'التخصص' : 'Major'}</span>
// //               <span>{bookMajor(book, lang)}</span>
// //             </div>
// //             <div className="meta-item">
// //               <span className="label">{lang === 'ar' ? 'السنة' : 'Year'}</span>
// //               <span>{bookYear(book, lang)}</span>
// //             </div>
// //             <div className="meta-item">
// //               <span className="label">{lang === 'ar' ? 'الفصل' : 'Semester'}</span>
// //               <span>{book.semester}</span>
// //             </div>
// //             <div className="meta-item">
// //               <span className="label">{lang === 'ar' ? 'المدينة' : 'City'}</span>
// //               <span>{bookCity(book, lang)}</span>
// //             </div>
// //             <div className="meta-item">
// //               <span className="label">{lang === 'ar' ? 'تاريخ النشر' : 'Posted on'}</span>
// //               <span>{book.created_at ? new Date(book.created_at).toLocaleDateString() : ''}</span>
// //             </div>
// //           </div>

// //           <div style={{ margin: '12px 0' }}>
// //             <h4 style={{ fontWeight: 600, marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
// //               {lang === 'ar' ? 'الوصف' : 'Description'}
// //             </h4>
// //             <p style={{ color: 'var(--text-secondary)' }}>{bookDesc(book, lang)}</p>
// //           </div>

// //           {book.status === 'approved' ? (
// //             <div className="detail-actions-row">
// //               <button
// //                 className="btn btn-gold"
// //                 onClick={() => {
// //                   // Show phone number in a toast or alert
// //                   alert(`${lang === 'ar' ? 'رقم الهاتف' : 'Phone'}: ${book.phone}`);
// //                 }}
// //               >
// //                 <i className="fas fa-phone-alt"></i> {lang === 'ar' ? 'اتصل بالمالك' : 'Call owner'}
// //               </button>
// //               <a className="btn btn-outline" href={waLink} target="_blank" rel="noopener noreferrer">
// //                 <i className="fab fa-whatsapp" style={{ color: '#25D366' }}></i> WhatsApp
// //               </a>
// //             </div>
// //           ) : (
// //             <div style={{ padding: '12px', background: '#fff3cd', borderRadius: 'var(--radius-sm)', textAlign: 'center', color: '#856404', fontSize: '0.88rem' }}>
// //               <i className="fas fa-clock"></i>
// //               {lang === 'ar'
// //                 ? 'هذا الكتاب قيد المراجعة أو غير منشور حالياً.'
// //                 : 'This book is currently under review or unpublished.'}
// //             </div>
// //           )}

// //           <div className="view-count">
// //             <i className="fas fa-eye"></i> {book.views || 0} {lang === 'ar' ? 'مشاهدة' : 'views'}
// //           </div>

// //           <div style={{ marginTop: '12px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
// //             <button
// //               className="btn btn-outline btn-sm"
// //               onClick={() => handleToggleWishlist(book.id)}
// //             >
// //               <i className={`fa${book.wishlisted ? 's' : 'r'} fa-heart`} style={{ color: 'var(--gold)' }}></i>
// //               {lang === 'ar' ? 'المفضلة' : 'Wishlist'}
// //             </button>
// //             <button
// //               className="btn btn-outline btn-sm"
// //               onClick={() => {
// //                 const url = `${window.location.origin}${window.location.pathname}#book?id=${book.id}`;
// //                 navigator.clipboard?.writeText(url).then(() => {
// //                   // Show toast notification
// //                   console.log('Link copied!');
// //                 });
// //               }}
// //             >
// //               <i className="fas fa-share-alt"></i> {lang === 'ar' ? 'مشاركة' : 'Share'}
// //             </button>
// //             {isOwner && (
// //               <>
// //                 <button className="btn btn-outline btn-sm" onClick={() => navigateTo('post', book.id)}>
// //                   <i className="fas fa-pen"></i> {lang === 'ar' ? 'تعديل' : 'Edit'}
// //                 </button>
// //                 <button
// //                   className="btn btn-danger btn-sm"
// //                   onClick={() => {
// //                     if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا الكتاب؟' : 'Are you sure you want to delete this book?')) {
// //                       apiCall(`/books/${book.id}`, { method: 'DELETE' })
// //                         .then(() => navigateTo('profile'))
// //                         .catch(console.error);
// //                     }
// //                   }}
// //                 >
// //                   <i className="fas fa-trash"></i> {lang === 'ar' ? 'حذف' : 'Delete'}
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Similar Books */}
// //       <div style={{ padding: '24px 0 32px' }}>
// //         <h2 style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>
// //           {lang === 'ar' ? 'كتب مشابهة' : 'Similar books'}
// //         </h2>
// //         <div className="book-grid">
// //           {similarBooks.length ? (
// //             similarBooks.map(b => (
// //               <BookCard key={b.id} book={b} onNavigate={navigateTo} />
// //             ))
// //           ) : (
// //             <div className="empty-state">
// //               {lang === 'ar' ? 'لا توجد كتب مشابهة حالياً.' : 'No similar books yet.'}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default BookDetails;



// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import BookCard from '../components/BookCard';
// import {
//   apiCall,
//   bookTitle,
//   bookDesc,
//   bookAuthor,
//   bookOwner,
//   bookUniversity,
//   bookMajor,
//   bookYear,
//   bookCity,
//   bookCondition,
//   bookExchange,
//   bookImages,
//   CURRENCY,
// } from '../services/api';

// function BookDetails() {
//   const { id } = useParams(); // Get ID from URL
//   const navigate = useNavigate();
//   const { lang, currentUser } = useAuth();
//   const [book, setBook] = useState(null);
//   const [similarBooks, setSimilarBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   useEffect(() => {
//     if (id) {
//       fetchBookDetails(id);
//     }
//   }, [id]);

//   const fetchBookDetails = async (bookId) => {
//     setLoading(true);
//     try {
//       const data = await apiCall(`/books/${bookId}`);
//       setBook(data);
//       setActiveImageIndex(0);
//       // Fetch similar books
//       const similar = await apiCall(`/books?major=${encodeURIComponent(data.major_key)}&limit=4`);
//       setSimilarBooks((similar.books || []).filter(b => b.id !== data.id).slice(0, 3));
//     } catch (e) {
//       // Book not found
//       navigate('/browse');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleWishlist = async (bookId) => {
//     try {
//       const result = await apiCall(`/books/wishlist/${bookId}`, { method: 'POST' });
//       // Refresh book details to update wishlist status
//       fetchBookDetails(bookId);
//     } catch (e) {
//       console.error('Wishlist error:', e);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container" style={{ padding: '40px 0' }}>
//         <div className="empty-state">
//           <i className="fas fa-spinner fa-spin"></i>
//           {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
//         </div>
//       </div>
//     );
//   }

//   if (!book) {
//     return (
//       <div className="container" style={{ padding: '40px 0' }}>
//         <div className="empty-state">
//           <i className="fas fa-book"></i>
//           {lang === 'ar' ? 'الكتاب غير موجود' : 'Book not found'}
//         </div>
//       </div>
//     );
//   }

//   const ex = bookExchange(book);
//   const priceText = ex && ex.key === 'sell' ? `${book.price} ${CURRENCY[lang]}` : (ex ? ex[lang] : '');
//   const images = bookImages(book);
//   const isOwner = currentUser && currentUser.id === book.user_id;
//   const waLink = `https://wa.me/${(book.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
//     (lang === 'ar' ? 'مرحباً، أنا مهتم بكتاب "' : "Hi, I'm interested in your book ") +
//     bookTitle(book, lang) +
//     (lang === 'ar' ? '" على مكتبة.' : '" on Maktaba.')
//   )}`;

//   return (
//     <div className="container">
//       <div style={{ padding: '14px 0' }}>
//         <button className="btn btn-outline btn-sm" onClick={() => navigate('/browse')}>
//           <i className={`fas fa-arrow-${lang === 'ar' ? 'right' : 'left'}`}></i>
//           {lang === 'ar' ? 'العودة إلى الاستعراض' : 'Back to browse'}
//         </button>
//       </div>

//       <div className="detail-container">
//         {/* Gallery */}
//         <div>
//           <div className="detail-gallery-main">
//             <img
//               src={images[activeImageIndex] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop'}
//               alt={bookTitle(book, lang)}
//             />
//           </div>
//           {images.length > 1 && (
//             <div className="detail-thumbs">
//               {images.map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   className={i === activeImageIndex ? 'active' : ''}
//                   onClick={() => setActiveImageIndex(i)}
//                   alt={`Thumbnail ${i + 1}`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Info */}
//         <div className="detail-info">
//           <h1>{bookTitle(book, lang)}</h1>
//           <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
//             {bookAuthor(book, lang) || (lang === 'ar' ? 'مؤلف غير معروف' : 'Unknown author')}
//           </p>

//           {book.status !== 'approved' && (
//             <div className={`book-badge ${book.status === 'pending' ? 'pending' : 'rejected'}`}
//                  style={{ fontSize: '0.82rem', padding: '4px 16px', margin: '0 0 12px 0' }}>
//               <i className={`fas ${book.status === 'pending' ? 'fa-clock' : 'fa-times-circle'}`}></i>
//               {book.status === 'pending'
//                 ? (lang === 'ar' ? 'قيد المراجعة من قبل المسؤول' : 'Under review')
//                 : (lang === 'ar' ? 'تم رفض هذا الكتاب' : 'This book was rejected')}
//             </div>
//           )}

//           <div className="owner">
//             <div className="avatar"><i className="fas fa-user"></i></div>
//             <div>
//               <strong>{bookOwner(book, lang)}</strong>
//               <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
//                 <i className="fas fa-phone-alt" style={{ color: 'var(--gold)' }}></i> {book.phone}
//               </div>
//             </div>
//           </div>

//           <div style={{ margin: '12px 0' }}>
//             {ex && (
//               <span className={`book-badge ${ex.badge}`} style={{ fontSize: '0.82rem', padding: '4px 16px' }}>
//                 <i className={`fas ${ex.icon}`}></i> {priceText}
//               </span>
//             )}
//             <span className="book-badge" style={{ background: '#e8edf5', color: '#4a6fb3', fontSize: '0.82rem', padding: '4px 16px' }}>
//               <i className="fas fa-check-circle"></i> {bookCondition(book, lang)}
//             </span>
//           </div>

//           <div className="detail-meta-grid">
//             <div className="meta-item">
//               <span className="label">{lang === 'ar' ? 'الجامعة' : 'University'}</span>
//               <span>{bookUniversity(book, lang)}</span>
//             </div>
//             <div className="meta-item">
//               <span className="label">{lang === 'ar' ? 'التخصص' : 'Major'}</span>
//               <span>{bookMajor(book, lang)}</span>
//             </div>
//             <div className="meta-item">
//               <span className="label">{lang === 'ar' ? 'السنة' : 'Year'}</span>
//               <span>{bookYear(book, lang)}</span>
//             </div>
//             <div className="meta-item">
//               <span className="label">{lang === 'ar' ? 'الفصل' : 'Semester'}</span>
//               <span>{book.semester}</span>
//             </div>
//             <div className="meta-item">
//               <span className="label">{lang === 'ar' ? 'المدينة' : 'City'}</span>
//               <span>{bookCity(book, lang)}</span>
//             </div>
//             <div className="meta-item">
//               <span className="label">{lang === 'ar' ? 'تاريخ النشر' : 'Posted on'}</span>
//               <span>{book.created_at ? new Date(book.created_at).toLocaleDateString() : ''}</span>
//             </div>
//           </div>

//           <div style={{ margin: '12px 0' }}>
//             <h4 style={{ fontWeight: 600, marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
//               {lang === 'ar' ? 'الوصف' : 'Description'}
//             </h4>
//             <p style={{ color: 'var(--text-secondary)' }}>{bookDesc(book, lang)}</p>
//           </div>

//           {book.status === 'approved' ? (
//             <div className="detail-actions-row">
//               <button
//                 className="btn btn-gold"
//                 onClick={() => {
//                   alert(`${lang === 'ar' ? 'رقم الهاتف' : 'Phone'}: ${book.phone}`);
//                 }}
//               >
//                 <i className="fas fa-phone-alt"></i> {lang === 'ar' ? 'اتصل بالمالك' : 'Call owner'}
//               </button>
//               <a className="btn btn-outline" href={waLink} target="_blank" rel="noopener noreferrer">
//                 <i className="fab fa-whatsapp" style={{ color: '#25D366' }}></i> WhatsApp
//               </a>
//             </div>
//           ) : (
//             <div style={{ padding: '12px', background: '#fff3cd', borderRadius: 'var(--radius-sm)', textAlign: 'center', color: '#856404', fontSize: '0.88rem' }}>
//               <i className="fas fa-clock"></i>
//               {lang === 'ar'
//                 ? 'هذا الكتاب قيد المراجعة أو غير منشور حالياً.'
//                 : 'This book is currently under review or unpublished.'}
//             </div>
//           )}

//           <div className="view-count">
//             <i className="fas fa-eye"></i> {book.views || 0} {lang === 'ar' ? 'مشاهدة' : 'views'}
//           </div>

//           <div style={{ marginTop: '12px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
//             <button
//               className="btn btn-outline btn-sm"
//               onClick={() => handleToggleWishlist(book.id)}
//             >
//               <i className={`fa${book.wishlisted ? 's' : 'r'} fa-heart`} style={{ color: 'var(--gold)' }}></i>
//               {lang === 'ar' ? 'المفضلة' : 'Wishlist'}
//             </button>
//             <button
//               className="btn btn-outline btn-sm"
//               onClick={() => {
//                 const url = `${window.location.origin}${window.location.pathname}/book/${book.id}`;
//                 navigator.clipboard?.writeText(url).then(() => {
//                   showToast(lang === 'ar' ? 'تم نسخ الرابط!' : 'Link copied!', 'success');
//                 });
//               }}
//             >
//               <i className="fas fa-share-alt"></i> {lang === 'ar' ? 'مشاركة' : 'Share'}
//             </button>
//             {isOwner && (
//               <>
//                 <button className="btn btn-outline btn-sm" onClick={() => navigate(`/post?id=${book.id}`)}>
//                   <i className="fas fa-pen"></i> {lang === 'ar' ? 'تعديل' : 'Edit'}
//                 </button>
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => {
//                     if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا الكتاب؟' : 'Are you sure you want to delete this book?')) {
//                       apiCall(`/books/${book.id}`, { method: 'DELETE' })
//                         .then(() => navigate('/profile'))
//                         .catch(console.error);
//                     }
//                   }}
//                 >
//                   <i className="fas fa-trash"></i> {lang === 'ar' ? 'حذف' : 'Delete'}
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Similar Books */}
//       <div style={{ padding: '24px 0 32px' }}>
//         <h2 style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>
//           {lang === 'ar' ? 'كتب مشابهة' : 'Similar books'}
//         </h2>
//         <div className="book-grid">
//           {similarBooks.length ? (
//             similarBooks.map(b => (
//               <BookCard key={b.id} book={b} />
//             ))
//           ) : (
//             <div className="empty-state">
//               {lang === 'ar' ? 'لا توجد كتب مشابهة حالياً.' : 'No similar books yet.'}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookDetails;


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