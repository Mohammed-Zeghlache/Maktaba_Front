import React from 'react';
import { useAuth } from '../context/AuthContext';

function Footer() {
  const { lang } = useAuth();
  const year = new Date().getFullYear();

  return (
    <div className="container site-footer">
      <footer className="footer">
        <div className="logo">
          {/* {lang === 'ar' ? 'مكتبة' : 'Maktaba'}<span>.</span> */}
          {lang === 'ar' ? 'مكتبة الطالب' : 'Maktabat eTalib'}<span>.</span>

        </div>
        <div style={{ fontSize: '0.8rem' }}>
          {lang === 'ar'
            ? `© ${year} · مكتبة · سوق الكتب الأكاديمية الجزائري`
            : `© ${year} · Maktaba · Algeria's Academic Book Marketplace`}
        </div>
      </footer>
    </div>
  );
}

export default Footer;
