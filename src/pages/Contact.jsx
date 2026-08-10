// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import { showToast } from '../components/Toast';
// import { useNavigate } from 'react-router-dom';

// function Contact({ navigateTo }) {
//     const navigate = useNavigate();

//   const { lang } = useAuth();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     showToast(lang === 'ar' ? 'تم إرسال الرسالة! سوف نرد خلال 24 ساعة.' : 'Message sent! We will reply within 24 hours.', 'success');
//     e.target.reset();
//   };

//   return (
//     <div className="container static-page" style={{ maxWidth: '540px', margin: '0 auto' }}>
//       <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
//         {lang === 'ar' ? 'اتصل بنا' : 'Contact us'}
//       </h1>
//       <p style={{ color: 'var(--text-secondary)', marginBottom: '22px' }}>
//         {lang === 'ar' ? 'لديك أسئلة؟ يسعدنا سماع رأيك.' : "Have a question? We'd love to hear from you."}
//       </p>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>{lang === 'ar' ? 'الاسم الكامل' : 'Full name'}</label>
//           <input type="text" required />
//         </div>
//         <div className="form-group">
//           <label>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
//           <input type="email" placeholder="you@university.dz" required />
//         </div>
//         <div className="form-group">
//           <label>{lang === 'ar' ? 'الموضوع' : 'Subject'}</label>
//           <input type="text" placeholder={lang === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'} required />
//         </div>
//         <div className="form-group">
//           <label>{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
//           <textarea rows="5" required></textarea>
//         </div>
//         <button type="submit" className="btn btn-gold btn-block" style={{ padding: '12px' }}>
//           <i className="fas fa-paper-plane"></i> {lang === 'ar' ? 'إرسال الرسالة' : 'Send message'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Contact;





import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../services/api';

function Contact() {
  const navigate = useNavigate();
  const { lang } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { fullName, email, subject, message } = formData;
    
    if (!fullName || !email || !subject || !message) {
      showToast(
        lang === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields',
        'error'
      );
      return;
    }

    setLoading(true);
    
    try {
      await apiCall('/contact', {
        method: 'POST',
        body: JSON.stringify({ fullName, email, subject, message })
      });
      
      showToast(
        lang === 'ar' ? 'تم إرسال الرسالة! سوف نرد خلال 24 ساعة.' : 'Message sent! We will reply within 24 hours.',
        'success'
      );
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      showToast(error.message || 'Failed to send message', 'error');
    } finally {
      setLoading(false);
    }
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
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
          <input
            type="email"
            id="email"
            {/* placeholder="you@university.dz" */}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{lang === 'ar' ? 'الموضوع' : 'Subject'}</label>
          <input
            type="text"
            id="subject"
            {/* placeholder={lang === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'} */}
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
          <textarea
            id="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-gold btn-block" style={{ padding: '12px' }} disabled={loading}>
          <i className="fas fa-paper-plane"></i> 
          {loading 
            ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') 
            : (lang === 'ar' ? 'إرسال الرسالة' : 'Send message')}
        </button>
      </form>
    </div>
  );
}

export default Contact;
