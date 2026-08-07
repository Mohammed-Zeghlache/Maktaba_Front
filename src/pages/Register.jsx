import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';
import { UNIVERSITIES, MAJORS, label } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const { register, lang } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    universityKey: '',
    majorKey: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, password, confirmPassword, universityKey, majorKey } = formData;

    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      showToast(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة.' : 'Please fill in all required fields.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast(lang === 'ar' ? 'كلمات المرور غير متطابقة.' : 'Passwords do not match.', 'error');
      return;
    }

    setLoading(true);
    const result = await register({
      firstName,
      lastName,
      email,
      phone,
      password,
      universityKey,
      majorKey
    });
    setLoading(false);

    if (result.success) {
      showToast(lang === 'ar' ? 'تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.' : 'Account created successfully! You can log in now.', 'success');
      setTimeout(() => navigate('/login'), 1200);
    }
  };

  return (
    <div className="container">
      <div className="auth-container">
        <h1>{lang === 'ar' ? 'إنشاء حساب' : 'Create an account'}</h1>
        <p className="subtitle">
          {lang === 'ar' ? 'انضم إلى المجتمع الأكاديمي المتميز.' : 'Join the academic community.'}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-row-2">
            <div className="form-group">
              <label>{lang === 'ar' ? 'الاسم الأول' : 'First name'}</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{lang === 'ar' ? 'الاسم الأخير' : 'Last name'}</label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@university.dz"
              required
            />
          </div>
          <div className="form-group">
            <label>{lang === 'ar' ? 'رقم الهاتف' : 'Phone number'}</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+213 555 55 55 55"
              required
            />
          </div>
          <div className="form-group password-field">
            <label>{lang === 'ar' ? 'كلمة المرور' : 'Password'}</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
            </button>
          </div>
          <div className="form-group password-field">
            <label>{lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm password'}</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <i className={`fas fa-${showConfirmPassword ? 'eye-slash' : 'eye'}`}></i>
            </button>
          </div>
          <div className="form-row-2">
            <div className="form-group">
              <label>{lang === 'ar' ? 'الجامعة (اختياري)' : 'University (optional)'}</label>
              <select id="universityKey" value={formData.universityKey} onChange={handleChange}>
                <option value="">{lang === 'ar' ? 'اختر الجامعة' : 'Select university'}</option>
                {UNIVERSITIES.map(u => (
                  <option key={u.key} value={u.key}>{label(u, lang)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>{lang === 'ar' ? 'التخصص (اختياري)' : 'Major (optional)'}</label>
              <select id="majorKey" value={formData.majorKey} onChange={handleChange}>
                <option value="">{lang === 'ar' ? 'اختر التخصص' : 'Select major'}</option>
                {MAJORS.map(m => (
                  <option key={m.key} value={m.key}>{label(m, lang)}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (lang === 'ar' ? 'جاري التحميل...' : 'Loading...') : (lang === 'ar' ? 'إنشاء حساب' : 'Sign up')}
          </button>
        </form>
        <div className="auth-link">
          {lang === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'}
          <a onClick={() => navigate('/login')} style={{ color: 'var(--gold)', cursor: 'pointer', fontWeight: 500 }}>
            {lang === 'ar' ? 'تسجيل الدخول' : 'Log in'}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;