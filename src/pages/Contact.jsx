import React from 'react';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';

function Contact({ navigateTo }) {
    const navigate = useNavigate();

  const { lang } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(lang === 'ar' ? 'تم إرسال الرسالة! سوف نرد خلال 24 ساعة.' : 'Message sent! We will reply within 24 hours.', 'success');
    e.target.reset();
  };

  return (
    <div className="container static-page" style={{ maxWidth: '540px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
        {lang === 'ar' ? 'اتصل بنا' : 'Contact us'}
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '22px' }}>
        {lang === 'ar' ? 'لديك أسئلة؟ يسعدنا سماع رأيك.' : "Have a question? We'd love to hear from you."}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{lang === 'ar' ? 'الاسم الكامل' : 'Full name'}</label>
          <input type="text" required />
        </div>
        <div className="form-group">
          <label>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
          <input type="email" placeholder="you@university.dz" required />
        </div>
        <div className="form-group">
          <label>{lang === 'ar' ? 'الموضوع' : 'Subject'}</label>
          <input type="text" placeholder={lang === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'} required />
        </div>
        <div className="form-group">
          <label>{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
          <textarea rows="5" required></textarea>
        </div>
        <button type="submit" className="btn btn-gold btn-block" style={{ padding: '12px' }}>
          <i className="fas fa-paper-plane"></i> {lang === 'ar' ? 'إرسال الرسالة' : 'Send message'}
        </button>
      </form>
    </div>
  );
}

export default Contact;