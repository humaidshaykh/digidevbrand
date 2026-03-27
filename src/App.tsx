import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from '@/context/AppContext';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChat from '@/components/AIChat';
import LoadingScreen from '@/components/LoadingScreen';
import CountryMarquee from '@/components/CountryMarquee';
import ScrollToTop from '@/components/ScrollToTop';

// Pages
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import ContactPage from '@/pages/ContactPage';
import ReviewPage from '@/pages/ReviewPage';

// Page transition wrapper
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

// Main App Content
const AppContent: React.FC = () => {
  const { isLoading, theme } = useApp();
  const isDark = theme === 'dark';

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className={`flex flex-col min-h-screen transition-colors duration-300 w-full overflow-x-hidden ${isDark ? 'bg-[#110B2E] text-white' : 'bg-white text-[#281E5A]'}`}>
        <Navbar />

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <PageWrapper>
                    <HomePage />
                  </PageWrapper>
                }
              />
              <Route
                path="/about"
                element={
                  <PageWrapper>
                    <AboutPage />
                  </PageWrapper>
                }
              />
              <Route
                path="/services"
                element={
                  <PageWrapper>
                    <ServicesPage />
                  </PageWrapper>
                }
              />
              <Route
                path="/services/:id"
                element={
                  <PageWrapper>
                    <ServiceDetailPage />
                  </PageWrapper>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageWrapper>
                    <ContactPage />
                  </PageWrapper>
                }
              />
              <Route
                path="/review"
                element={
                  <PageWrapper>
                    <ReviewPage />
                  </PageWrapper>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>

        <div className={`w-full px-4 md:px-6 py-3 md:py-4 text-center ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
          <p className="font-semibold tracking-wider uppercase text-xs" style={{ color: isDark ? '#f59e0b' : '#62109F' }}>
            Trusted by Brands Worldwide
          </p>
        </div>
        <CountryMarquee />
        <Footer />
        <AIChat />
      </div>
    </Router>
  );
};

// App with Provider
const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};




// Humaids Code


function equalHeightUL() {
  // ❌ mobile pe run nahi hoga
  if (window.innerWidth < 768) return;

  const containers = document.querySelectorAll(".equal-height");

  containers.forEach((container) => {
    const uls = container.querySelectorAll("ul");

    let maxHeight = 0;

    uls.forEach((ul) => {
      ul.style.minHeight = "auto";
    });

    uls.forEach((ul) => {
      const height = ul.getBoundingClientRect().height;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    uls.forEach((ul) => {
      ul.style.minHeight = maxHeight + "px";
    });
  });
}

// 🔥 run multiple times (animation ke baad bhi)
window.addEventListener("load", () => {
  equalHeightUL();

  setTimeout(equalHeightUL, 300);
  setTimeout(equalHeightUL, 800);
  setTimeout(equalHeightUL, 1500);
});

// resize pe
window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    // 👇 mobile pe reset kar do
    document.querySelectorAll(".equal-height ul").forEach((ul) => {
  (ul as HTMLElement).style.minHeight = "auto";
});
  } else {
    equalHeightUL();
  }
});

// 🔥 observe DOM changes (React + motion fix)
const observer = new MutationObserver(() => {
  equalHeightUL();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});


export default App;
