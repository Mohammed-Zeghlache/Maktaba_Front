import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import { apiCall, UNIVERSITIES, MAJORS, YEARS, EXCHANGE_TYPES, label } from '../services/api';
import { useNavigate } from 'react-router-dom';



function Browse({ navigateTo, pageData }) {
    const navigate = useNavigate();

  const { lang } = useAuth();
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    major: pageData?.major || '',
    university: pageData?.university || '',
    year: pageData?.year || '',
    semester: pageData?.semester || '',
    exchange: pageData?.exchange || '',
    city: pageData?.city || '',
    search: pageData?.search || '',
    sort: 'newest'
  });

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    params.append('page', page);
    params.append('limit', 12);

    try {
      const data = await apiCall(`/books?${params.toString()}`);
      setBooks(data.books || []);
      setTotal(data.total || 0);
    } catch (e) {
      setBooks([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters(prev => ({ ...prev, [id]: value }));
    setPage(1);
  };

  const applyFilters = () => {
    setPage(1);
    fetchBooks();
  };

  const resetFilters = () => {
    setFilters({
      major: '',
      university: '',
      year: '',
      semester: '',
      exchange: '',
      city: '',
      search: '',
      sort: 'newest'
    });
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    const totalPages = Math.max(1, Math.ceil(total / 12));
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const totalPages = Math.max(1, Math.ceil(total / 12));
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return (
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => handlePageChange(page - 1)}>
          <i className="fas fa-chevron-right"></i>
        </button>
        {pages.map(p => (
          <button key={p} className={p === page ? 'active' : ''} onClick={() => handlePageChange(p)}>
            {p}
          </button>
        ))}
        <button disabled={page >= totalPages} onClick={() => handlePageChange(page + 1)}>
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>
    );
  };

  return (
    <div className="container" style={{ paddingTop: '14px', paddingBottom: '14px' }}>
      <div className="browse-header">
        <div>
          <h1>{lang === 'ar' ? 'استعراض' : 'Browse'}</h1>
          <p className="text-muted">
            {lang === 'ar' ? 'ابحث عن الكتاب المثالي من مجتمع جامعتك.' : 'Find the perfect book from your university community.'}
          </p>
        </div>
      </div>

      <div className="browse-layout">
        {/* Sidebar Filters */}
        <aside className="browse-sidebar">
          <h3>
            <i className="fas fa-sliders-h"></i> {lang === 'ar' ? 'التصفية' : 'Filter'}
          </h3>
          <div className="filter-group">
            <label>{lang === 'ar' ? 'التخصص' : 'Major'}</label>
            <select id="major" value={filters.major} onChange={handleFilterChange}>
              <option value="">{lang === 'ar' ? 'اختر التخصص' : 'Select major'}</option>
              {MAJORS.map(m => (
                <option key={m.key} value={m.key}>{label(m, lang)}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>{lang === 'ar' ? 'الجامعة' : 'University'}</label>
            <select id="university" value={filters.university} onChange={handleFilterChange}>
              <option value="">{lang === 'ar' ? 'اختر الجامعة' : 'Select university'}</option>
              {UNIVERSITIES.map(u => (
                <option key={u.key} value={u.key}>{label(u, lang)}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>{lang === 'ar' ? 'السنة' : 'Year'}</label>
            <select id="year" value={filters.year} onChange={handleFilterChange}>
              <option value="">{lang === 'ar' ? 'اختر السنة' : 'Select year'}</option>
              {YEARS.map(y => (
                <option key={y.key} value={y.key}>{label(y, lang)}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>{lang === 'ar' ? 'الفصل' : 'Semester'}</label>
            <select id="semester" value={filters.semester} onChange={handleFilterChange}>
              <option value="">{lang === 'ar' ? 'اختر الفصل' : 'Select semester'}</option>
              {[1, 2, 3, 4, 5, 6].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>{lang === 'ar' ? 'نوع التبادل' : 'Exchange type'}</label>
            <select id="exchange" value={filters.exchange} onChange={handleFilterChange}>
              <option value="">{lang === 'ar' ? 'نوع التبادل' : 'Exchange type'}</option>
              {EXCHANGE_TYPES.map(e => (
                <option key={e.key} value={e.key}>{label(e, lang)}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>{lang === 'ar' ? 'المدينة' : 'City'}</label>
            <input
              type="text"
              id="city"
              placeholder={lang === 'ar' ? 'الجزائر، وهران...' : 'Algiers, Oran...'}
              value={filters.city}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-actions">
            <button className="btn btn-gold" onClick={applyFilters}>
              <i className="fas fa-arrow-right"></i> {lang === 'ar' ? 'تطبيق التصفية' : 'Apply filters'}
            </button>
            <button className="btn btn-outline" onClick={resetFilters}>
              <i className="fas fa-undo"></i> {lang === 'ar' ? 'إعادة تعيين' : 'Reset'}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="browse-main">
          <div className="results-bar">
            <span id="resultsCount">
              <strong>{total}</strong> {lang === 'ar' ? 'نتيجة' : 'results'}
            </span>
            <select
              id="sort"
              className="sort-select"
              value={filters.sort}
              onChange={handleFilterChange}
            >
              <option value="newest">{lang === 'ar' ? 'الأحدث أولاً' : 'Newest first'}</option>
              <option value="oldest">{lang === 'ar' ? 'الأقدم أولاً' : 'Oldest first'}</option>
              <option value="priceAsc">{lang === 'ar' ? 'السعر: من الأقل' : 'Price: low to high'}</option>
              <option value="priceDesc">{lang === 'ar' ? 'السعر: من الأعلى' : 'Price: high to low'}</option>
              <option value="popular">{lang === 'ar' ? 'الأكثر مشاهدة' : 'Most viewed'}</option>
            </select>
          </div>

          <div className="book-grid">
            {loading ? (
              <div className="empty-state">{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</div>
            ) : books.length ? (
              books.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onNavigate={navigateTo}
                />
              ))
            ) : (
              <div className="empty-state">
                <i className="fas fa-book-open"></i>
                {lang === 'ar' ? 'لم يتم العثور على كتب تطابق معايير البحث.' : 'No books match your search criteria.'}
              </div>
            )}
          </div>

          {renderPagination()}
        </main>
      </div>
    </div>
  );
}

export default Browse;