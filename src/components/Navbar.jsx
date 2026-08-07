// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';

// function Navbar({ navigateTo }) {
//   const { currentUser, currentAdmin, lang, theme, toggleLang, toggleTheme, logout, isLoggedIn, isAdmin } = useAuth();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//     document.body.style.overflow = menuOpen ? '' : 'hidden';
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//     document.body.style.overflow = '';
//   };

//   const handleNavigate = (page) => {
//     navigateTo(page);
//     closeMenu();
//   };

//   return (
//     <nav className="navbar site-navbar">
//       <div className="container nav-container">
//         <div className="nav-brand">
//           <button className="menu-toggle" onClick={toggleMenu} aria-label="menu">
//             <i className="fas fa-bars"></i>
//           </button>
//           <div className="logo" onClick={() => handleNavigate('home')}>
//             {lang === 'ar' ? 'مكتبة' : 'Maktaba'}<span>.</span>
//           </div>
//         </div>

//         <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
//           <a className="active" onClick={() => handleNavigate('home')}>
//             {lang === 'ar' ? 'الرئيسية' : 'Home'}
//           </a>
//           <a onClick={() => handleNavigate('browse')}>
//             {lang === 'ar' ? 'استعراض' : 'Browse'}
//           </a>
//           <a onClick={() => handleNavigate('about')}>
//             {lang === 'ar' ? 'عن المكتبة' : 'About'}
//           </a>
//           <a onClick={() => handleNavigate('contact')}>
//             {lang === 'ar' ? 'اتصل بنا' : 'Contact'}
//           </a>
//         </div>

//         <div className="nav-actions">
//           <button className="icon-toggle" onClick={toggleLang}>
//             {lang === 'ar' ? 'EN' : 'AR'}
//           </button>
//           <button className="icon-toggle" onClick={toggleTheme}>
//             <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
//           </button>
//           {isLoggedIn && (
//             <button className="icon-toggle" onClick={() => handleNavigate('wishlist')} title="Wishlist">
//               <i className="fas fa-heart"></i>
//               <span className="wishlist-count hidden">0</span>
//             </button>
//           )}
//           {isAdmin ? (
//             <button className="btn btn-outline btn-sm" onClick={() => handleNavigate('admin')}>
//               <i className="fas fa-shield-halved"></i>
//             </button>
//           ) : isLoggedIn ? (
//             <button className="btn btn-outline btn-sm" onClick={() => handleNavigate('profile')}>
//               <i className="fas fa-user"></i>
//               <span className="full-label">{currentUser?.first_name}</span>
//             </button>
//           ) : (
//             <button className="btn btn-primary btn-sm" onClick={() => handleNavigate('login')}>
//               <i className="fas fa-user"></i>
//               <span className="full-label">{lang === 'ar' ? 'تسجيل الدخول' : 'Log in'}</span>
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';

// function Navbar({ navigateTo }) {
//   const { currentUser, currentAdmin, lang, theme, toggleLang, toggleTheme, logout, isLoggedIn, isAdmin } = useAuth();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//     document.body.style.overflow = menuOpen ? '' : 'hidden';
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//     document.body.style.overflow = '';
//   };

//   const handleNavigate = (page) => {
//     navigateTo(page);
//     closeMenu();
//   };

//   const handleLogout = () => {
//     logout();
//     closeMenu();
//     navigateTo('home');
//   };

//   return (
//     <nav className="navbar site-navbar">
//       <div className="container nav-container">
//         <div className="nav-brand">
//           <button className="menu-toggle" onClick={toggleMenu} aria-label="menu">
//             <i className="fas fa-bars"></i>
//           </button>
//           <div className="logo" onClick={() => handleNavigate('home')}>
//             {lang === 'ar' ? 'مكتبة' : 'Maktaba'}<span>.</span>
//           </div>
//         </div>

//         <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
//           <a onClick={() => handleNavigate('home')}>
//             {lang === 'ar' ? 'الرئيسية' : 'Home'}
//           </a>
//           <a onClick={() => handleNavigate('browse')}>
//             {lang === 'ar' ? 'استعراض' : 'Browse'}
//           </a>
//           <a onClick={() => handleNavigate('about')}>
//             {lang === 'ar' ? 'عن المكتبة' : 'About'}
//           </a>
//           <a onClick={() => handleNavigate('contact')}>
//             {lang === 'ar' ? 'اتصل بنا' : 'Contact'}
//           </a>
//         </div>

//         <div className="nav-actions">
//           <button className="icon-toggle" onClick={toggleLang} title={lang === 'ar' ? 'English' : 'العربية'}>
//             {lang === 'ar' ? 'EN' : 'AR'}
//           </button>
//           <button className="icon-toggle" onClick={toggleTheme}>
//             <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
//           </button>
//           {isLoggedIn && (
//             <button className="icon-toggle" onClick={() => handleNavigate('wishlist')} title="Wishlist">
//               <i className="fas fa-heart"></i>
//               <span className="wishlist-count hidden">0</span>
//             </button>
//           )}
//           {isAdmin ? (
//             <button className="btn btn-outline btn-sm" onClick={() => handleNavigate('admin')}>
//               <i className="fas fa-shield-halved"></i>
//             </button>
//           ) : isLoggedIn ? (
//             <button className="btn btn-outline btn-sm" onClick={() => handleNavigate('profile')}>
//               <i className="fas fa-user"></i>
//               <span className="full-label">{currentUser?.first_name}</span>
//             </button>
//           ) : (
//             <button className="btn btn-primary btn-sm" onClick={() => handleNavigate('login')}>
//               <i className="fas fa-user"></i>
//               <span className="full-label">{lang === 'ar' ? 'تسجيل الدخول' : 'Log in'}</span>
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// function Navbar() {
//   const navigate = useNavigate();
//   const { currentUser, currentAdmin, lang, theme, toggleLang, toggleTheme, logout, isLoggedIn, isAdmin } = useAuth();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//     document.body.style.overflow = menuOpen ? '' : 'hidden';
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//     document.body.style.overflow = '';
//   };

//   const handleNavigate = (path) => {
//     navigate(path);
//     closeMenu();
//   };

//   const handleLogout = () => {
//     logout();
//     closeMenu();
//     navigate('/home');
//   };

//   return (
//     <nav className="navbar site-navbar">
//       <div className="container nav-container">
//         <div className="nav-brand">
//           <button className="menu-toggle" onClick={toggleMenu} aria-label="menu">
//             <i className="fas fa-bars"></i>
//           </button>
//           <div className="logo" onClick={() => handleNavigate('/home')}>
//             {lang === 'ar' ? 'مكتبة' : 'Maktaba'}<span>.</span>
//           </div>
//         </div>

//         <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
//           <a onClick={() => handleNavigate('/home')}>
//             {lang === 'ar' ? 'الرئيسية' : 'Home'}
//           </a>
//           <a onClick={() => handleNavigate('/browse')}>
//             {lang === 'ar' ? 'استعراض' : 'Browse'}
//           </a>
//           <a onClick={() => handleNavigate('/about')}>
//             {lang === 'ar' ? 'عن المكتبة' : 'About'}
//           </a>
//           <a onClick={() => handleNavigate('/contact')}>
//             {lang === 'ar' ? 'اتصل بنا' : 'Contact'}
//           </a>
//         </div>

//         <div className="nav-actions">
//           <button className="icon-toggle" onClick={toggleLang} title={lang === 'ar' ? 'English' : 'العربية'}>
//             {lang === 'ar' ? 'EN' : 'AR'}
//           </button>
//           <button className="icon-toggle" onClick={toggleTheme}>
//             <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
//           </button>
//           {isLoggedIn && (
//             <button className="icon-toggle" onClick={() => handleNavigate('/wishlist')} title="Wishlist">
//               <i className="fas fa-heart"></i>
//               <span className="wishlist-count hidden">0</span>
//             </button>
//           )}
//           {isAdmin ? (
//             <button className="btn btn-outline btn-sm" onClick={() => handleNavigate('/admin')}>
//               <i className="fas fa-shield-halved"></i>
//             </button>
//           ) : isLoggedIn ? (
//             <button className="btn btn-outline btn-sm" onClick={() => handleNavigate('/profile')}>
//               <i className="fas fa-user"></i>
//               <span className="full-label">{currentUser?.first_name}</span>
//             </button>
//           ) : (
//             <button className="btn btn-primary btn-sm" onClick={() => handleNavigate('/login')}>
//               <i className="fas fa-user"></i>
//               <span className="full-label">{lang === 'ar' ? 'تسجيل الدخول' : 'Log in'}</span>
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, currentAdmin, lang, theme, toggleLang, toggleTheme, logout, isLoggedIn, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? '' : 'hidden';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleNavigate = (path) => {
    navigate(path);
    closeMenu();
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/home');
  };

  return (
    <nav className="navbar site-navbar">
      <div className="container nav-container">
        <div className="nav-brand">
          <button className="menu-toggle" onClick={toggleMenu} aria-label="menu">
            <i className="fas fa-bars"></i>
          </button>
          <div className="logo" onClick={() => handleNavigate('/home')}>
            {/* {lang === 'ar' ? 'مكتبة' : 'Maktaba'}<span>.</span> */}
              {lang === 'ar' ? 'مكتبة الطالب' : 'Maktabat eTalib'}<span>.</span>

          </div>
        </div>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a onClick={() => handleNavigate('/home')}>
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </a>
          <a onClick={() => handleNavigate('/browse')}>
            {lang === 'ar' ? 'استعراض' : 'Browse'}
          </a>
          <a onClick={() => handleNavigate('/about')}>
            {lang === 'ar' ? 'عن المكتبة' : 'About'}
          </a>
          <a onClick={() => handleNavigate('/contact')}>
            {lang === 'ar' ? 'اتصل بنا' : 'Contact'}
          </a>
        </div>

        <div className="nav-actions">
          <button className="icon-toggle" onClick={toggleLang} title={lang === 'ar' ? 'English' : 'العربية'}>
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
          <button className="icon-toggle" onClick={toggleTheme}>
            <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
          </button>
          
          {isLoggedIn && (
            <button className="icon-toggle" onClick={() => handleNavigate('/wishlist')} title="Wishlist">
              <i className="fas fa-heart"></i>
              <span className="wishlist-count hidden">0</span>
            </button>
          )}
          
          {isLoggedIn ? (
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {isAdmin && (
                <button 
                  className="icon-toggle" 
                  onClick={() => handleNavigate('/admin')} 
                  title={lang === 'ar' ? 'لوحة التحكم' : 'Admin Panel'}
                  style={{ borderColor: 'var(--gold)' }}
                >
                  <i className="fas fa-shield-halved" style={{ color: 'var(--gold)' }}></i>
                </button>
              )}
              <button className="btn btn-outline btn-sm" onClick={() => handleNavigate('/profile')}>
                <i className="fas fa-user"></i>
                <span className="full-label">{currentUser?.first_name}</span>
              </button>
            </div>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={() => handleNavigate('/login')}>
              <i className="fas fa-user"></i>
              <span className="full-label">{lang === 'ar' ? 'تسجيل الدخول' : 'Log in'}</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;