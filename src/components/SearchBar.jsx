import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UNIVERSITIES, MAJORS, YEARS, label } from '../services/api';

function SearchBar({ onSearch }) {
  const { lang } = useAuth();
  const [filters, setFilters] = useState({
    title: '',
    university: '',
    major: '',
    year: '',
    semester: '',
    city: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="search-section">
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '14px' }}>
        <i className="fas fa-search" style={{ color: 'var(--gold)' }}></i>
        <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>
          {lang === 'ar' ? 'بحث متقدم' : 'Advanced search'}
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="search-grid">
          <div className="field">
            <label>{lang === 'ar' ? 'العنوان' : 'Title'}</label>
            <input
              type="text"
              id="title"
              placeholder={lang === 'ar' ? 'مثلاً: الرياضيات' : 'e.g. Calculus'}
              value={filters.title}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>{lang === 'ar' ? 'الجامعة' : 'University'}</label>
            <select id="university" value={filters.university} onChange={handleChange}>
              <option value="">{lang === 'ar' ? 'اختر الجامعة' : 'Select university'}</option>
              {UNIVERSITIES.map(u => (
                <option key={u.key} value={u.key}>{label(u, lang)}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>{lang === 'ar' ? 'التخصص' : 'Major'}</label>
            <select id="major" value={filters.major} onChange={handleChange}>
              <option value="">{lang === 'ar' ? 'اختر التخصص' : 'Select major'}</option>
              {MAJORS.map(m => (
                <option key={m.key} value={m.key}>{label(m, lang)}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>{lang === 'ar' ? 'السنة' : 'Year'}</label>
            <select id="year" value={filters.year} onChange={handleChange}>
              <option value="">{lang === 'ar' ? 'اختر السنة' : 'Select year'}</option>
              {YEARS.map(y => (
                <option key={y.key} value={y.key}>{label(y, lang)}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>{lang === 'ar' ? 'الفصل' : 'Semester'}</label>
            <select id="semester" value={filters.semester} onChange={handleChange}>
              <option value="">{lang === 'ar' ? 'اختر الفصل' : 'Select semester'}</option>
              {[1, 2, 3, 4, 5, 6].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>{lang === 'ar' ? 'المدينة' : 'City'}</label>
            <input
              type="text"
              id="city"
              placeholder={lang === 'ar' ? 'الجزائر، وهران...' : 'Algiers, Oran...'}
              value={filters.city}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <button type="submit" className="btn-search">
              <i className="fas fa-arrow-right"></i> {lang === 'ar' ? 'بحث' : 'Search'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;