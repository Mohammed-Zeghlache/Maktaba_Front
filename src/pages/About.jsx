import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function About({ navigateTo }) {
    const navigate = useNavigate();

  const { lang } = useAuth();

  return (
    <div className="container static-page" style={{ maxWidth: '740px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>
        {lang === 'ar' ? 'عن المكتبة' : 'About Maktaba'}
      </h1>
      <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
        {lang === 'ar'
          ? 'سوق أكاديمي متميز يربط طلاب الجامعات الجزائرية من خلال الكتب.'
          : 'A premium academic marketplace connecting Algerian university students through books.'}
      </p>
      <div style={{ background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <p style={{ marginBottom: '12px' }}>
          {lang === 'ar'
            ? 'تأسست مكتبة بمهمة بسيطة: جعل الكتب الأكاديمية أكثر سهولة وبأسعار معقولة واستدامة. نؤمن بأن المعرفة يجب أن تتدفق بحرية داخل المجتمعات الجامعية.'
            : 'Maktaba was founded on a simple mission: make academic books more accessible, affordable, and sustainable. We believe knowledge should flow freely within university communities.'}
        </p>
        <p style={{ marginBottom: '12px' }}>
          {lang === 'ar'
            ? 'منصتنا تمكن الطلاب والخريجين والأساتذة من تبادل وبيع والتبرع أو إهداء الكتب الدراسية. كل معاملة بسيطة وشفافة وقائمة على الثقة.'
            : 'Our platform lets students, graduates, and professors exchange, sell, donate, or give away textbooks. Every transaction is simple, transparent, and built on trust.'}
        </p>
        <p>
          {lang === 'ar'
            ? 'لا ميزات تواصل اجتماعي. لا دردشة، لا تعليقات، لا إعجابات. مجرد سوق نظيف حيث يمكنك العثور على الكتب التي تحتاجها ومشاركة الكتب التي لا تحتاجها.'
            : "No social features. No chat, no comments, no likes. Just a clean marketplace where you can find the books you need and share the books you don't."}
        </p>
      </div>
    </div>
  );
}

export default About;