import { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WritingPage from './pages/WritingPage';
import ArticlePage from './pages/ArticlePage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import type { Page, NavigationState } from './types';

function App() {
  const [navState, setNavState] = useState<NavigationState>({
    currentPage: 'home',
  });

  const handleNavigate = (page: Page, articleSlug?: string) => {
    setNavState({
      currentPage: page,
      articleSlug,
    });
  };

  const renderPage = () => {
    switch (navState.currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'writing':
        return (
          <WritingPage
            onNavigate={handleNavigate}
            categoryFilter={navState.categoryFilter}
            tagFilter={navState.tagFilter}
          />
        );
      case 'article':
        return navState.articleSlug ? (
          <ArticlePage articleSlug={navState.articleSlug} onNavigate={handleNavigate} />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
      case 'contact':
        return <ContactPage />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation currentPage={navState.currentPage} onNavigate={handleNavigate} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
