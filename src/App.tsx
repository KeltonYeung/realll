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
    // 添加一個視窗滾動到頂部的效果，讓切換頁面時感覺更像翻頁
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
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
    // 這裡修改了背景色與全局文字顏色，營造文青氛圍
    <div className="min-h-screen bg-[#faf9f6] text-stone-800 antialiased selection:bg-stone-200 selection:text-stone-900 flex flex-col">
      
      {/* 導航欄容器 */}
      <div className="sticky top-0 z-50 bg-[#faf9f6]/80 backdrop-blur-sm border-b border-stone-100">
        <Navigation currentPage={navState.currentPage} onNavigate={handleNavigate} />
      </div>

      {/* 主內容區域：增加 fade-in 動畫效果讓頁面加載更優雅 */}
      <main className="flex-grow transition-opacity duration-500 ease-in-out">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}

export default App;
