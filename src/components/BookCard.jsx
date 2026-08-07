import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookTitle, bookUniversity, bookMajor, bookYear, bookCity, bookExchange, bookImages, CURRENCY } from '../services/api';

function BookCard({ book, onToggleWishlist }) {
  const navigate = useNavigate();
  const { lang } = useAuth();
  const ex = bookExchange(book);
  const priceText = ex && ex.key === 'sell' ? ` · ${book.price} ${CURRENCY[lang]}` : '';
  const images = bookImages(book);
  const isWished = book.wishlisted || false;

  const handleCardClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="book-card">
      <div className="book-cover" onClick={handleCardClick}>
        <div
          className={`wishlist-heart ${isWished ? 'active' : ''}`}
          data-book-id={book.id}
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleWishlist) onToggleWishlist(book.id);
          }}
        >
          <i className={`fa${isWished ? 's' : 'r'} fa-heart`}></i>
        </div>
        <img
          src={images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop'}
          alt={bookTitle(book, lang)}
          loading="lazy"
        />
      </div>
      <div onClick={handleCardClick}>
        <div className="book-title">{bookTitle(book, lang)}</div>
        <div className="book-meta">
          <i className="fas fa-university"></i> {bookUniversity(book, lang)}
        </div>
        <div className="book-meta">
          <i className="fas fa-graduation-cap"></i> {bookMajor(book, lang)} · {bookYear(book, lang)}
        </div>
        <div className="book-meta">
          <i className="fas fa-map-pin"></i> {bookCity(book, lang)}
        </div>
        {ex && (
          <div className={`book-badge ${ex.badge}`}>
            <i className={`fas ${ex.icon}`}></i> {ex[lang]}{priceText}
          </div>
        )}
        {book.status === 'pending' && (
          <div className="book-badge pending">
            <i className="fas fa-clock"></i> {lang === 'ar' ? 'قيد المراجعة' : 'Under review'}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCard;