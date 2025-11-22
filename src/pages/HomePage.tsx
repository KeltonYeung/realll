import { useEffect, useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { supabase, type Article } from '../lib/supabase';
import type { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page, articleSlug?: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedArticles();
  }, []);

  const loadFeaturedArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('published', true)
        .eq('featured', true)
        .order('published_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setFeaturedArticles(data || []);
    } catch (error) {
      console.error('Error loading featured articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-neutral-50" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl text-gray-900 mb-6 tracking-tight leading-tight">
            在文字間遊走
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            紀錄城市的夜晚，風中的記憶，以及那些值得留下的瞬間
          </p>
          <button
            onClick={() => onNavigate('writing')}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 group"
          >
            <span className="tracking-wide">探索作品</span>
            <ArrowRight
              size={18}
              className="transform group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gray-400 rounded-full" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900">精選作品</h2>
          <button
            onClick={() => onNavigate('writing')}
            className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2 group"
          >
            <span className="text-sm tracking-wide">查看全部</span>
            <ArrowRight
              size={16}
              className="transform group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 mb-4" />
                <div className="h-4 bg-gray-200 mb-2 w-3/4" />
                <div className="h-3 bg-gray-200 w-1/2" />
              </div>
            ))}
          </div>
        ) : featuredArticles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">暫無精選作品</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <article
                key={article.id}
                className="group cursor-pointer"
                onClick={() => onNavigate('article', article.slug)}
              >
                <div className="relative overflow-hidden bg-gray-200 mb-4 aspect-[4/3]">
                  {article.cover_image_url ? (
                    <img
                      src={article.cover_image_url}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-200" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    {article.category && <span>{article.category.name}</span>}
                    <span>·</span>
                    <span className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{article.reading_time} 分鐘</span>
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
