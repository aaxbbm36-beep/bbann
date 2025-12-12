import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { AIDemo } from './components/AIDemo';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard'>('landing');

  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
    window.scrollTo(0, 0);
  };

  const navigateToLanding = () => {
    setCurrentPage('landing');
    window.scrollTo(0, 0);
  };

  if (currentPage === 'dashboard') {
    return <Dashboard onBack={navigateToLanding} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onStart={navigateToDashboard} />
      <main>
        <Hero onStart={navigateToDashboard} />
        <Features />
        <AIDemo />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default App;