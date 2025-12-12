import React, { useState, useEffect } from 'react';
import { Menu, X, Clock, LogIn } from 'lucide-react';
import { Button } from './Button';

interface NavbarProps {
  onStart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll spy to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'demo', 'testimonials'];
      const scrollPosition = window.scrollY + 100; // Offset

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { id: 'features', label: 'Tính năng' },
    { id: 'demo', label: 'Demo AI' },
    { id: 'testimonials', label: 'Đánh giá' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">TeamFlow</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex space-x-1 mr-4">
              {navLinks.map((link) => (
                <a 
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === link.id 
                      ? 'text-indigo-600 bg-indigo-50' 
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <Button variant="ghost" size="sm" onClick={onStart}>
                <LogIn className="w-4 h-4 mr-2" />
                Đăng nhập
              </Button>
              <Button variant="primary" size="sm" onClick={onStart} className="shadow-lg shadow-indigo-200/50">
                Bắt đầu ngay
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onStart} className="!px-2">
              <LogIn className="w-5 h-5" />
            </Button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`}
              className={`block px-3 py-3 text-base font-medium rounded-md transition-colors ${
                activeSection === link.id 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
              }`}
              onClick={(e) => scrollToSection(e, link.id)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
            <Button variant="primary" className="w-full justify-center" onClick={() => { setIsOpen(false); if(onStart) onStart(); }}>
              Bắt đầu miễn phí
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};