import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import BackToTop from './components/BackToTop';
import PageTransition from './components/PageTransition';
import PageLoader from './components/PageLoader';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [loading, setLoading] = useState(false);
  
  const showLoader = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-white dark:bg-blue-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
        {loading && <PageLoader />}
        
        <Header />
        
        <main className="flex-grow">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </PageTransition>
        </main>
        
        <Footer />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;