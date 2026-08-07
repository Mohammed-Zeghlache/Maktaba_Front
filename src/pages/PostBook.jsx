import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';
import {
  apiCall,
  bookTitle,
  bookDesc,
  bookCity,
  MAJORS,
  UNIVERSITIES,
  YEARS,
  CONDITIONS,
  EXCHANGE_TYPES,
  label,
  bookImages
} from '../services/api';

function PostBook() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, lang } = useAuth();
  const [editingBookId, setEditingBookId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    majorKey: '',
    universityKey: '',
    yearKey: '',
    semester: '',
    city: '',
    conditionKey: '',
    exchangeKey: '',
    price: '',
    phone: ''
  });

  useEffect(() => {
    // Check if we're editing a book (passed via URL param)
    const searchParams = new URLSearchParams(location.search);
    const bookId = searchParams.get('id');
    if (bookId) {
      fetchBookForEdit(bookId);
    }
  }, [location]);

  const fetchBookForEdit = async (id) => {
    try {
      const book = await apiCall(`/books/${id}`);
      setEditingBookId(id);
      setFormData({
        title: bookTitle(book, lang),
        description: bookDesc(book, lang),
        majorKey: book.major_key || '',
        universityKey: book.university_key || '',
        yearKey: book.year_key || '',
        semester: book.semester || '',
        city: bookCity(book, lang),
        conditionKey: book.condition_key || '',
        exchangeKey: book.exchange_key || '',
        price: book.price || '',
        phone: book.phone || ''
      });
      setUploadedFiles(bookImages(book));
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (uploadedFiles.length + files.length > 5) {
      showToast(lang === 'ar' ? 'يمكنك رفع 5 صور كحد أقصى.' : 'You can upload up to 5 images.', 'error');
      return;
    }
    const toProcess = files.slice(0, 5 - uploadedFiles.length);
    let skipped = false;
    let pending = toProcess.length;

    toProcess.forEach((file) => {
      if (file.size > 2 * 1024 * 1024) {
        skipped = true;
        pending--;
        if (pending === 0 && skipped) {
          showToast(lang === 'ar' ? 'بعض الصور كبيرة جداً وتم تجاهلها (الحد الأقصى 2 ميغابايت لكل صورة).' : 'Some images were too large and were skipped (2MB max per image).', 'error');
        }
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedFiles(prev => [...prev, e.target.result]);
        pending--;
        if (pending === 0 && skipped) {
          showToast(lang === 'ar' ? 'بعض الصور كبيرة جداً وتم تجاهلها (الحد الأقصى 2 ميغابايت لكل صورة).' : 'Some images were too large and were skipped (2MB max per image).', 'error');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      showToast(lang === 'ar' ? 'يجب تسجيل الدخول لنشر كتاب.' : 'You need to log in to post a book.', 'error');
      navigate('/login');
      return;
    }

    const { title, description, majorKey, universityKey, yearKey, semester, city, conditionKey, exchangeKey, price, phone } = formData;
    if (!title || !description || !majorKey || !universityKey || !yearKey || !semester || !city || !conditionKey || !exchangeKey || !phone) {
      showToast(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة.' : 'Please fill in all required fields.', 'error');
      return;
    }

    setLoading(true);
    const langField = lang === 'ar'
      ? { titleAr: title, descAr: description, cityAr: city }
      : { titleEn: title, descEn: description, cityEn: city };

    const payload = {
      ...langField,
      majorKey,
      universityKey,
      yearKey,
      semester: parseInt(semester, 10),
      conditionKey,
      exchangeKey,
      price: exchangeKey === 'sell' ? (parseFloat(price) || 0) : null,
      phone,
      images: uploadedFiles.length ? uploadedFiles : ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop']
    };

    try {
      if (editingBookId) {
        await apiCall(`/books/${editingBookId}`, { method: 'PUT', body: JSON.stringify(payload) });
        showToast(lang === 'ar' ? 'تم تحديث الكتاب وإعادة إرساله للمراجعة.' : 'Book updated and resubmitted for review.', 'success');
        setEditingBookId(null);
        setTimeout(() => navigate('/profile'), 1200);
      } else {
        await apiCall('/books', { method: 'POST', body: JSON.stringify(payload) });
        showToast(lang === 'ar' ? 'تم إرسال الكتاب للمراجعة! سيوافق عليه المسؤول قريباً.' : 'Your book was submitted for review! An admin will approve it soon.', 'success');
        setTimeout(() => navigate('/home'), 1400);
      }
      setUploadedFiles([]);
      setFormData({
        title: '',
        description: '',
        majorKey: '',
        universityKey: '',
        yearKey: '',
        semester: '',
        city: '',
        conditionKey: '',
        exchangeKey: '',
        price: '',
        phone: ''
      });
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="container" style={{ paddingTop: '44px', paddingBottom: '44px' }}>
        <div className="login-required">
          <i className="fas fa-lock"></i>
          <h2 style={{ fontFamily: 'var(--font-serif)' }}>{lang === 'ar' ? 'تسجيل الدخول مطلوب' : 'Login required'}</h2>
          <p>{lang === 'ar' ? 'يجب تسجيل الدخول لنشر كتاب. قم بتسجيل الدخول أو إنشاء حساب جديد.' : 'You need to log in to post a book. Log in or create a new account.'}</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>
              {lang === 'ar' ? 'تسجيل الدخول' : 'Log in'}
            </button>
            <button className="btn btn-gold" onClick={() => navigate('/register')}>
              {lang === 'ar' ? 'إنشاء حساب' : 'Sign up'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="post-form">
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
          {editingBookId ? (lang === 'ar' ? 'تعديل الكتاب' : 'Edit book') : (lang === 'ar' ? 'نشر كتاب جديد' : 'Post a new book')}
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
          {lang === 'ar' ? 'شارك كتبك الدراسية مع المجتمع. يتم مراجعة كل منشور قبل النشر.' : 'Share your textbooks with the community. Every listing is reviewed before it goes live.'}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              {lang === 'ar' ? 'رفع الصور' : 'Upload images'}
              <span style={{ color: 'var(--text-light)', fontWeight: 400 }}> {lang === 'ar' ? '(حتى 5 صور)' : '(up to 5)'}</span>
            </label>
            <div className="upload-area" onClick={() => document.getElementById('fileInput').click()}>
              <i className="fas fa-cloud-upload-alt"></i>
              <div>{lang === 'ar' ? 'اضغط لرفع صور الكتاب' : 'Click to upload book photos'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                {lang === 'ar' ? 'JPG, PNG, WEBP · حتى 2 ميغابايت للصورة' : 'JPG, PNG, WEBP · 2MB max per image'}
              </div>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
              {uploadedFiles.map((src, i) => (
                <div key={i} style={{ position: 'relative', width: '68px', height: '68px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`Upload ${i + 1}`} />
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    style={{ position: 'absolute', top: '2px', insetInlineEnd: '2px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>{lang === 'ar' ? 'عنوان الكتاب' : 'Book title'} *</label>
            <input
              type="text"
              id="title"
              placeholder={lang === 'ar' ? 'مثلاً: الرياضيات الأساسية' : 'e.g. Fundamentals of Calculus'}
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>{lang === 'ar' ? 'الوصف' : 'Description'} *</label>
            <textarea
              id="description"
              placeholder={lang === 'ar' ? 'وصف الكتاب وحالته وتفاصيل أخرى...' : 'Describe the book, its condition, and other details...'}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>{lang === 'ar' ? 'التخصص' : 'Major'} *</label>
              <select id="majorKey" value={formData.majorKey} onChange={handleChange} required>
                <option value="">{lang === 'ar' ? 'اختر التخصص' : 'Select major'}</option>
                {MAJORS.map(m => (
                  <option key={m.key} value={m.key}>{label(m, lang)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>{lang === 'ar' ? 'الجامعة' : 'University'} *</label>
              <select id="universityKey" value={formData.universityKey} onChange={handleChange} required>
                <option value="">{lang === 'ar' ? 'اختر الجامعة' : 'Select university'}</option>
                {UNIVERSITIES.map(u => (
                  <option key={u.key} value={u.key}>{label(u, lang)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>{lang === 'ar' ? 'السنة' : 'Year'} *</label>
              <select id="yearKey" value={formData.yearKey} onChange={handleChange} required>
                <option value="">{lang === 'ar' ? 'اختر السنة' : 'Select year'}</option>
                {YEARS.map(y => (
                  <option key={y.key} value={y.key}>{label(y, lang)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>{lang === 'ar' ? 'الفصل' : 'Semester'} *</label>
              <select id="semester" value={formData.semester} onChange={handleChange} required>
                <option value="">{lang === 'ar' ? 'اختر الفصل' : 'Select semester'}</option>
                {[1, 2, 3, 4, 5, 6].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>{lang === 'ar' ? 'المدينة' : 'City'} *</label>
              <input
                type="text"
                id="city"
                placeholder={lang === 'ar' ? 'الجزائر، وهران...' : 'Algiers, Oran...'}
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{lang === 'ar' ? 'حالة الكتاب' : 'Condition'} *</label>
              <select id="conditionKey" value={formData.conditionKey} onChange={handleChange} required>
                <option value="">{lang === 'ar' ? 'اختر الحالة' : 'Select condition'}</option>
                {CONDITIONS.map(c => (
                  <option key={c.key} value={c.key}>{label(c, lang)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>{lang === 'ar' ? 'نوع التبادل' : 'Exchange type'} *</label>
              <select id="exchangeKey" value={formData.exchangeKey} onChange={handleChange} required>
                <option value="">{lang === 'ar' ? 'نوع التبادل' : 'Exchange type'}</option>
                {EXCHANGE_TYPES.map(e => (
                  <option key={e.key} value={e.key}>{label(e, lang)}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ display: formData.exchangeKey === 'sell' ? 'block' : 'none' }}>
              <label>{lang === 'ar' ? 'السعر (دج)' : 'Price (DZD)'}</label>
              <input
                type="number"
                id="price"
                placeholder="0.00"
                min="0"
                step="100"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>{lang === 'ar' ? 'رقم الهاتف' : 'Phone number'} *</label>
            <input
              type="tel"
              id="phone"
              placeholder={lang === 'ar' ? '+213 555 55 55 55' : '+213 555 55 55 55'}
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-gold btn-block" style={{ padding: '12px', fontSize: '0.95rem' }} disabled={loading}>
            <i className="fas fa-paper-plane"></i>
            {loading
              ? (lang === 'ar' ? 'جاري التحميل...' : 'Loading...')
              : (editingBookId ? (lang === 'ar' ? 'حفظ التعديلات' : 'Save changes') : (lang === 'ar' ? 'إرسال للمراجعة' : 'Submit for review'))}
          </button>

          <div style={{ marginTop: '12px', padding: '8px 12px', background: '#fff3cd', borderRadius: 'var(--radius-sm)', textAlign: 'center', color: '#856404', fontSize: '0.82rem' }}>
            <i className="fas fa-info-circle"></i>
            {lang === 'ar' ? 'سيتم مراجعة الكتاب من قبل المسؤول قبل النشر.' : 'Your listing will be reviewed by an admin before it goes live.'}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostBook;