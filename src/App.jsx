// // import React, { useState, useEffect, lazy, Suspense } from 'react';
// // import { AuthProvider, useAuth } from './context/AuthContext';
// // import Navbar from './components/Navbar';
// // import Footer from './components/Footer';
// // import Toast from './components/Toast';
// // import Modal from './components/Modal';
// // import LoadingSpinner from './components/LoadingSpinner';

// // // Lazy load pages for better performance
// // const Home = lazy(() => import('./pages/Home'));
// // const Browse = lazy(() => import('./pages/Browse'));
// // const BookDetails = lazy(() => import('./pages/BookDetails'));
// // const Profile = lazy(() => import('./pages/Profile'));
// // const Login = lazy(() => import('./pages/Login'));
// // const Register = lazy(() => import('./pages/Register'));
// // const Contact = lazy(() => import('./pages/Contact'));
// // const Admin = lazy(() => import('./pages/Admin'));
// // const PostBook = lazy(() => import('./pages/PostBook'));

// // function AppContent() {
// //   const { currentUser, currentAdmin } = useAuth();
// //   const [currentPage, setCurrentPage] = useState('home');
// //   const [pageData, setPageData] = useState(null);
// //   const [isAdminMode, setIsAdminMode] = useState(false);

// //   useEffect(() => {
// //     const hash = window.location.hash.replace('#', '') || 'home';
// //     if (hash === 'admin') {
// //       setIsAdminMode(true);
// //       setCurrentPage('admin');
// //     } else {
// //       setIsAdminMode(false);
// //       const validPages = ['home', 'browse', 'book', 'post', 'profile', 'wishlist', 'login', 'register', 'about', 'contact'];
// //       if (validPages.includes(hash)) {
// //         setCurrentPage(hash);
// //         // Extract ID from hash for book details
// //         if (hash === 'book') {
// //           const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
// //           const id = params.get('id');
// //           if (id) setPageData(Number(id));
// //         }
// //       } else {
// //         setCurrentPage('home');
// //       }
// //     }
// //   }, [window.location.hash]);

// //   const navigateTo = (page, data) => {
// //     if (page === 'admin') {
// //       window.location.hash = 'admin';
// //       return;
// //     }
// //     if (data !== undefined && data !== null) {
// //       window.location.hash = `${page}?id=${data}`;
// //     } else {
// //       window.location.hash = page;
// //     }
// //     setCurrentPage(page);
// //     setPageData(data);
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   };

// //   const renderPage = () => {
// //     if (isAdminMode) {
// //       return <Admin />;
// //     }

// //     switch (currentPage) {
// //       case 'home':
// //         return <Home navigateTo={navigateTo} />;
// //       case 'browse':
// //         return <Browse navigateTo={navigateTo} pageData={pageData} />;
// //       case 'book':
// //         return <BookDetails navigateTo={navigateTo} bookId={pageData} />;
// //       case 'post':
// //         return <PostBook navigateTo={navigateTo} />;
// //       case 'profile':
// //         return <Profile navigateTo={navigateTo} />;
// //       case 'wishlist':
// //         return <Browse navigateTo={navigateTo} pageData={{ wishlist: true }} />;
// //       case 'login':
// //         return <Login navigateTo={navigateTo} />;
// //       case 'register':
// //         return <Register navigateTo={navigateTo} />;
// //       case 'about':
// //         return <About navigateTo={navigateTo} />;
// //       case 'contact':
// //         return <Contact navigateTo={navigateTo} />;
// //       default:
// //         return <Home navigateTo={navigateTo} />;
// //     }
// //   };

// //   return (
// //     <div className="app">
// //       {!isAdminMode && <Navbar navigateTo={navigateTo} />}
// //       <main className="main-content">
// //         <Suspense fallback={<LoadingSpinner />}>
// //           {renderPage()}
// //         </Suspense>
// //       </main>
// //       {!isAdminMode && <Footer />}
// //       <Toast />
// //       <Modal />
// //     </div>
// //   );
// // }

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <AppContent />
// //     </AuthProvider>
// //   );
// // }

// // export default App;

// import React, { useState, useEffect, lazy, Suspense } from 'react';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Toast from './components/Toast';
// import Modal from './components/Modal';
// import LoadingSpinner from './components/LoadingSpinner';

// // Lazy load pages for better performance
// const Home = lazy(() => import('./pages/Home'));
// const Browse = lazy(() => import('./pages/Browse'));
// const BookDetails = lazy(() => import('./pages/BookDetails'));
// const Profile = lazy(() => import('./pages/Profile'));
// const Login = lazy(() => import('./pages/Login'));
// const Register = lazy(() => import('./pages/Register'));
// const Contact = lazy(() => import('./pages/Contact'));
// const Admin = lazy(() => import('./pages/Admin'));
// const PostBook = lazy(() => import('./pages/PostBook'));
// const About = lazy(() => import('./pages/About'));

// function AppContent() {
//   const { currentUser, currentAdmin, lang, theme, toggleLang, toggleTheme, logout } = useAuth();
//   const [currentPage, setCurrentPage] = useState('home');
//   const [pageData, setPageData] = useState(null);
//   const [isAdminMode, setIsAdminMode] = useState(false);

//   // Initial language and theme setup
//   useEffect(() => {
//     // Apply initial language direction
//     const html = document.documentElement;
//     html.setAttribute('lang', lang);
//     html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
//     html.style.setProperty('--font-current', lang === 'ar' ? 'var(--font-arabic)' : 'var(--font-serif)');
//     document.body.style.fontFamily = lang === 'ar' ? 'var(--font-arabic)' : 'var(--font-serif)';
    
//     // Apply initial theme
//     html.setAttribute('data-theme', theme);
//   }, []);

//   useEffect(() => {
//     const hash = window.location.hash.replace('#', '') || 'home';
//     if (hash === 'admin') {
//       setIsAdminMode(true);
//       setCurrentPage('admin');
//     } else {
//       setIsAdminMode(false);
//       const validPages = ['home', 'browse', 'book', 'post', 'profile', 'wishlist', 'login', 'register', 'about', 'contact'];
//       if (validPages.includes(hash)) {
//         setCurrentPage(hash);
//         if (hash === 'book') {
//           const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
//           const id = params.get('id');
//           if (id) setPageData(Number(id));
//         }
//       } else {
//         setCurrentPage('home');
//       }
//     }
//   }, [window.location.hash]);

//   const navigateTo = (page, data) => {
//     if (page === 'admin') {
//       window.location.hash = 'admin';
//       return;
//     }
//     if (data !== undefined && data !== null && data !== 0) {
//       window.location.hash = `${page}?id=${data}`;
//     } else {
//       window.location.hash = page;
//     }
//     setCurrentPage(page);
//     setPageData(data);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const renderPage = () => {
//     if (isAdminMode) {
//       return <Admin />;
//     }

//     switch (currentPage) {
//       case 'home':
//         return <Home navigateTo={navigateTo} />;
//       case 'browse':
//         return <Browse navigateTo={navigateTo} pageData={pageData} />;
//       case 'book':
//         return <BookDetails navigateTo={navigateTo} bookId={pageData} />;
//       case 'post':
//         return <PostBook navigateTo={navigateTo} />;
//       case 'profile':
//         return <Profile navigateTo={navigateTo} />;
//       case 'wishlist':
//         return <Browse navigateTo={navigateTo} pageData={{ wishlist: true }} />;
//       case 'login':
//         return <Login navigateTo={navigateTo} />;
//       case 'register':
//         return <Register navigateTo={navigateTo} />;
//       case 'about':
//         return <About navigateTo={navigateTo} />;
//       case 'contact':
//         return <Contact navigateTo={navigateTo} />;
//       default:
//         return <Home navigateTo={navigateTo} />;
//     }
//   };

//   return (
//     <div className="app">
//       {!isAdminMode && <Navbar navigateTo={navigateTo} />}
//       <main className="main-content">
//         <Suspense fallback={<LoadingSpinner />}>
//           {renderPage()}
//         </Suspense>
//       </main>
//       {!isAdminMode && <Footer />}
//       <Toast />
//       <Modal />
//     </div>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// }

// export default App;



import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Modal from './components/Modal';

// Import all pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import BookDetails from './pages/BookDetails';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import PostBook from './pages/PostBook';
import About from './pages/About';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/book/:id" element={<BookDetails />} />
      <Route path="/post" element={<PostBook />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/wishlist" element={<Browse />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      {!isAdminRoute && <Navbar />}
      <main className="main-content">
        <AppRoutes />
      </main>
      {!isAdminRoute && <Footer />}
      <Toast />
      <Modal />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;