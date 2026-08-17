import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { apiCall, UNIVERSITIES, MAJORS, label } from '../services/api';

function Home() {
  const navigate = useNavigate();
  const { lang } = useAuth();
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState({ books: '…', students: '…' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
    fetchStats();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await apiCall('/books?limit=4');
      setBooks(data.books || []);
    } catch (e) {
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await apiCall('/books?limit=1');
      setStats(prev => ({ ...prev, books: `${data.total || 0}+` }));
    } catch (e) {
      // Keep placeholder
    }
  };

  const handleSearch = (filters) => {
    navigate('/browse', { state: filters });
  };

  const handleToggleWishlist = async (bookId) => {
    console.log('Toggle wishlist:', bookId);
  };

  return (
    <div className="container home-container">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1 dangerouslySetInnerHTML={{
            __html: lang === 'ar'
              ? 'ابحث عن الكتب التي <span class="gold">تحتاجها.</span><br>شارك الكتب التي <span class="gold">لا تحتاجها.</span>'
              : 'Find the books you <span class="gold">need.</span><br>Share the books you <span class="gold">don\'t.</span>'
          }} />
          <p>
            {lang === 'ar'
              ? 'سوق أكاديمي جزائري متميز للطلاب الجامعيين. تبادل، تبرع، بع أو أهدِ كتبك الدراسية بسرعة وثقة.'
              : 'A premium Algerian academic marketplace for university students. Exchange, donate, sell, or give away your textbooks — fast and with confidence.'}
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate('/browse')}>
              <i className="fas fa-book-open"></i> {lang === 'ar' ? 'استعراض الكتب' : 'Browse books'}
            </button>
            <button className="btn btn-gold" onClick={() => navigate('/post')}>
              <i className="fas fa-plus-circle"></i> {lang === 'ar' ? 'نشر كتاب' : 'Post a book'}
            </button>
          </div>
        </div>
        <div className="hero-illustration">
          <img
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&h=900&fit=crop"
            alt="Students"
            loading="lazy"
          />
        </div>
      </div>

      {/* Search Section */}
      <section className="home-section">
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Stats Section */}
      <section className="home-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="number">{stats.books}</div>
            <div className="label">{lang === 'ar' ? 'كتب' : 'Books'}</div>
          </div>
          <div className="stat-item">
            <div className="number">{stats.students}</div>
            <div className="label">{lang === 'ar' ? 'طلاب' : 'Students'}</div>
          </div>
          <div className="stat-item">
            <div className="number">{UNIVERSITIES.length}+</div>
            <div className="label">{lang === 'ar' ? 'جامعات' : 'Universities'}</div>
          </div>
          <div className="stat-item">
            <div className="number">{MAJORS.length}+</div>
            <div className="label">{lang === 'ar' ? 'تخصصات' : 'Majors'}</div>
          </div>
        </div>
      </section>

      {/* Popular Majors */}
      <section className="home-section">
        <div className="flex-between">
          <h2 className="home-section-title">
            {lang === 'ar' ? 'التخصصات الشائعة' : 'Popular majors'}
          </h2>
          <span className="text-muted" style={{ fontSize: '0.85rem', cursor: 'pointer' }} onClick={() => navigate('/browse')}>
            {lang === 'ar' ? 'عرض الكل' : 'View all'} <i className="fas fa-arrow-left"></i>
          </span>
        </div>
        <div className="majors-grid">
          {MAJORS.slice(0, 12).map(m => (
            <div key={m.key} className="major-chip" onClick={() => navigate('/browse', { state: { major: m.key } })}>
              <i className="fas fa-graduation-cap"></i> {label(m, lang)}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="home-section">
        <div className="flex-between">
          <h2 className="home-section-title">
            {lang === 'ar' ? 'الكتب المميزة' : 'Featured books'}
          </h2>
          <span className="text-muted" style={{ fontSize: '0.85rem', cursor: 'pointer' }} onClick={() => navigate('/browse')}>
            {lang === 'ar' ? 'عرض الكل' : 'View all'} <i className="fas fa-arrow-left"></i>
          </span>
        </div>
        <div className="book-grid">
          {loading ? (
            <div className="empty-state">
              <i className="fas fa-spinner fa-spin"></i>
              {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </div>
          ) : books.length ? (
            books.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onToggleWishlist={handleToggleWishlist}
              />
            ))
          ) : (
            <div className="empty-state">
              <i className="fas fa-book-open"></i>
              {lang === 'ar' ? 'لا توجد كتب حالياً' : 'No books available'}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="home-section">
        <h2 className="home-section-title" style={{ textAlign: 'center', marginBottom: '8px' }}>
          {lang === 'ar' ? 'كيف يعمل' : 'How it works'}
        </h2>
        <div className="steps-grid">
          <div className="step">
            <div className="icon"><i className="fas fa-plus-circle"></i></div>
            <h4>{lang === 'ar' ? 'نشر' : 'Post'}</h4>
            <p>{lang === 'ar' ? 'ضع كتابك في دقائق' : 'List your book in minutes'}</p>
          </div>
          <div className="step">
            <div className="icon"><i className="fas fa-search"></i></div>
            <h4>{lang === 'ar' ? 'بحث' : 'Search'}</h4>
            <p>{lang === 'ar' ? 'ابحث عن ما تحتاجه' : 'Find what you need'}</p>
          </div>
          <div className="step">
            <div className="icon"><i className="fas fa-phone-alt"></i></div>
            <h4>{lang === 'ar' ? 'اتصال' : 'Contact'}</h4>
            <p>{lang === 'ar' ? 'تواصل مع المالك' : 'Reach out to the owner'}</p>
          </div>
          <div className="step">
            <div className="icon"><i className="fas fa-handshake"></i></div>
            <h4>{lang === 'ar' ? 'تبادل' : 'Exchange'}</h4>
            <p>{lang === 'ar' ? 'تبادل في الحرم الجامعي' : 'Meet up on campus'}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
