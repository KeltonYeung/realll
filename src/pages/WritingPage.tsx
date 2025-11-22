import { useEffect, useState } from 'react';
import { Clock, Search } from 'lucide-react';
import { supabase, type Article, type Category, type Tag } from '../lib/supabase';
import type { Page } from '../types';

interface WritingPageProps {
  onNavigate: (page: Page, articleSlug?: string) => void;
  categoryFilter?: string;
  tagFilter?: string;
}

export default function WritingPage({ onNavigate, categoryFilter, tagFilter }: WritingPageProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFilter || null);
  const [selectedTag, setSelectedTag] = useState<string | null>(tagFilter || null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, [selectedCategory, selectedTag]);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([loadArticles(), loadCategories(), loadTags()]);
    } finally {
      setLoading(false);
    }
  };

  const loadArticles = async () => {
    let query = supabase
      .from('articles')
      .select(`
        *,
        category:categories(*),
        article_tags!inner(tag:tags(*))
      `)
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (selectedCategory) {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', selectedCategory)
        .maybeSingle();
      if (cat) {
        query = query.eq('category_id', cat.id);
      }
    }

    const { data, error } = await query;

    if (error) throw error;

    let processedArticles = (data || []).map((article) => ({
      ...article,
      tags: article.article_tags?.map((at: { tag: Tag }) => at.tag) || [],
    }));

    if (selectedTag) {
      processedArticles = processedArticles.filter((article) =>
        article.tags?.some((tag) => tag.slug === selectedTag)
      );
    }

    setArticles(processedArticles);
  };

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order');

    if (error) throw error;
    setCategories(data || []);
  };

  const loadTags = async () => {
    const { data, error } = await supabase.from('tags').select('*').order('name');

    if (error) throw error;
    setTags(data || []);
  };

  const filteredArticles = articles.filter(
    (article) =>
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">作品集</h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            收錄散文、詩歌與隨筆，記錄關於城市、記憶、夜晚、遠方的文字
          </p>
        </div>

        <div className="mb-8 relative">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="搜尋文章..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 text-sm transition-colors ${
              selectedCategory === null
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            全部
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-4 py-2 text-sm transition-colors ${
                selectedCategory === category.slug
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-sm text-gray-500 mb-3 tracking-wide">標籤篩選</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(selectedTag === tag.slug ? null : tag.slug)}
                  className={`px-3 py-1 text-xs border transition-colors ${
                    selectedTag === tag.slug
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-900'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 mb-4" />
                <div className="h-4 bg-gray-200 mb-2 w-3/4" />
                <div className="h-3 bg-gray-200 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">未找到相關文章</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
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
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag.id}
                          className="text-xs text-gray-500 border border-gray-300 px-2 py-0.5"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
