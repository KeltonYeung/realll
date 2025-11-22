import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { Page } from '../types';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { page: Page; label: string }[] = [
    { page: 'home', label: '首頁' },
    { page: 'writing', label: '作品集' },
    { page: 'about', label: '關於' },
    { page: 'dashboard', label: '後台' },
    { page: 'contact', label: '聯繫' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="text-xl font-serif text-gray-900 hover:text-gray-600 transition-colors"
          >
            文字間
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => handleNavClick(page)}
                className={`text-sm tracking-wide transition-colors relative group ${
                  currentPage === page ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-px bg-gray-900 transform origin-left transition-transform duration-300 ${
                    currentPage === page ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-4">
            {navItems.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => handleNavClick(page)}
                className={`block w-full text-left text-base transition-colors ${
                  currentPage === page ? 'text-gray-900 font-medium' : 'text-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
