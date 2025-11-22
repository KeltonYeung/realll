import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Calendar, Share2, Printer } from 'lucide-react';
import { supabase, type Article, type Tag } from '../lib/supabase';
import type { Page } from '../types';

interface ArticlePageProps {
  articleSlug: string;
  onNavigate: (page: Page, articleSlug?: string) => void;
}

export default function ArticlePage({ articleSlug, onNavigate }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    loadArticle();
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [articleSlug]);

  const loadArticle = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          category:categories(*),
          article_tags(tag:tags(*))
        `)
        .eq('slug', articleSlug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        console.error('Article not found');
        return;
      }

      const articleWithTags = {
        ...data,
        tags: data.article_tags?.map((at: { tag: Tag }) => at.tag) || [],
      };

      setArticle(articleWithTags);

      await supabase
        .from('articles')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', data.id);

      if (data.category_id) {
        loadRelatedArticles(data.id, data.category_id);
      }
    } catch (error) {
      console.error('Error loading article:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedArticles = async (currentArticleId: string, categoryId: string) => {
    const { data } = await supabase
      .from('articles')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('category_id', categoryId)
      .eq('published', true)
      .neq('id', currentArticleId)
      .order('published_at', { ascending: false })
      .limit(3);

    setRelatedArticles(data || []);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt || '',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('鏈接已複製到剪貼板');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 w-3/4" />
            <div className="h-4 bg-gray-200 w-1/2" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200" />
              <div className="h-4 bg-gray-200" />
              <div className="h-4 bg-gray-200 w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-lg mb-8">文章未找到</p>
          <button
            onClick={() => onNavigate('writing')}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            <span>返回作品集</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gray-900 z-50 transition-all duration-150"
        style={{ width: `${readingProgress}%` }}
      />

      <div className="pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-6">
          <button
            onClick={() => onNavigate('writing')}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
          >
            <ArrowLeft
              size={18}
              className="transform group-hover:-translate-x-1 transition-transform"
            />
            <span>返回作品集</span>
          </button>

          <header className="mb-12">
            {article.category && (
              <span className="text-sm text-gray-500 tracking-wide">{article.category.name}</span>
            )}
            <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mt-4 mb-4 leading-tight">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="text-xl text-gray-600 leading-relaxed mb-6">{article.subtitle}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-6 border-t border-gray-200">
              <span className="flex items-center space-x-2">
                <Calendar size={16} />
                <time>
                  {article.published_at
                    ? new Date(article.published_at).toLocaleDateString('zh-CN')
                    : ''}
                </time>
              </span>
              <span>·</span>
              <span className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{article.reading_time} 分钟阅读</span>
              </span>
              <div className="ml-auto flex items-center space-x-3">
                <button
                  onClick={handleShare}
                  className="hover:text-gray-900 transition-colors"
                  aria-label="分享"
                >
                  <Share2 size={18} />
                </button>
                <button
                  onClick={handlePrint}
                  className="hover:text-gray-900 transition-colors"
                  aria-label="打印"
                >
                  <Printer size={18} />
                </button>
              </div>
            </div>
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {article.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-xs text-gray-600 border border-gray-300 px-3 py-1"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </header>

          {article.cover_image_url && (
            <div className="mb-12 -mx-6 md:mx-0">
              <img
                src={article.cover_image_url}
                alt={article.title}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>

          {article.author_notes && (
            <div className="mt-12 p-6 bg-gray-100 border-l-4 border-gray-900">
              <h3 className="font-serif text-lg text-gray-900 mb-3">作者註</h3>
              <p className="text-gray-700 leading-relaxed">{article.author_notes}</p>
            </div>
          )}
        </article>

        {relatedArticles.length > 0 && (
          <div className="max-w-6xl mx-auto px-6 mt-24">
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-8">相關作品</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <article
                  key={related.id}
                  className="group cursor-pointer"
                  onClick={() => onNavigate('article', related.slug)}
                >
                  <div className="relative overflow-hidden bg-gray-200 mb-4 aspect-[4/3]">
                    {related.cover_image_url ? (
                      <img
                        src={related.cover_image_url}
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-200" />
                    )}
                  </div>
                  <h3 className="font-serif text-lg text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
