import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { login, lang } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast(lang === 'ar' ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور.' : 'Please enter your email and password.', 'error');
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/home');
    }
  };

  return (
    <div className="container">
      <div className="auth-container">
        <h1>{lang === 'ar' ? 'مرحباً بعودتك' : 'Welcome back'}</h1>
        <p className="subtitle">
          {lang === 'ar' ? 'سجل الدخول للوصول إلى كتبك ومنشوراتك.' : 'Log in to access your books and listings.'}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@gmail.com"
              required
            />
          </div>
          <div className="form-group password-field">
            <label>{lang === 'ar' ? 'كلمة المرور' : 'Password'}</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <div style={{ textAlign: 'start', marginBottom: '12px' }}>
            <a
              style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.8rem', cursor: 'pointer' }}
              onClick={() => showToast(lang === 'ar' ? 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.' : 'A password reset link has been sent to your email.', 'info')}
            >
              {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
            </a>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (lang === 'ar' ? 'جاري التحميل...' : 'Loading...') : (lang === 'ar' ? 'تسجيل الدخول' : 'Log in')}
          </button>
        </form>
        <div className="auth-link">
          {lang === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}
          <a onClick={() => navigate('/register')} style={{ color: 'var(--gold)', cursor: 'pointer', fontWeight: 500 }}>
            {lang === 'ar' ? 'إنشاء حساب' : 'Sign up'}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
