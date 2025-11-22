import { useState } from 'react';
import { Plus, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Page } from '../types';
import ArticleManager from '../components/dashboard/ArticleManager';
import CategoryManager from '../components/dashboard/CategoryManager';
import TagManager from '../components/dashboard/TagManager';

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'articles' | 'categories' | 'tags'>('articles');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;
      if (data.user) {
        setIsLoggedIn(true);
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setError('登入失敗，請檢查帳號和密碼');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    onNavigate('home');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
        <div className="max-w-md mx-auto px-6">
          <div className="bg-white p-8 shadow-sm">
            <h1 className="font-serif text-3xl text-gray-900 mb-6 text-center">後台登入</h1>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">電郵地址</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">密碼</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
              >
                {loading ? '登入中...' : '登入'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-4xl text-gray-900">後台管理</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-900 hover:bg-gray-300 transition-colors"
          >
            <LogOut size={18} />
            <span>登出</span>
          </button>
        </div>

        <div className="flex space-x-2 mb-8 border-b border-gray-200">
          {[
            { id: 'articles', label: '文章' },
            { id: 'categories', label: '分類' },
            { id: 'tags', label: '標籤' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'articles' && <ArticleManager />}
        {activeTab === 'categories' && <CategoryManager />}
        {activeTab === 'tags' && <TagManager />}
      </div>
    </div>
  );
}
