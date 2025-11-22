import { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';
import { supabase, type Article, type Category, type Tag } from '../../lib/supabase';
import ArticleEditor from './ArticleEditor';

export default function ArticleManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([loadArticles(), loadCategories(), loadTags()]);
    } finally {
      setLoading(false);
    }
  };

  const loadArticles = async () => {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    setArticles(data || []);
  };

  const loadCategories = async () => {
    const { data } = await supabase.from('categories').select('*');
    setCategories(data || []);
  };

  const loadTags = async () => {
    const { data } = await supabase.from('tags').select('*');
    setTags(data || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('確定刪除此文章嗎？')) return;

    const { error } = await supabase.from('articles').delete().eq('id', id);

    if (error) {
      alert('刪除失敗');
    } else {
      setArticles(articles.filter((a) => a.id !== id));
    }
  };

  if (editingArticle || isCreating) {
    return (
      <ArticleEditor
        article={editingArticle}
        categories={categories}
        tags={tags}
        onSave={async () => {
          setEditingArticle(null);
          setIsCreating(false);
          await loadArticles();
        }}
        onCancel={() => {
          setEditingArticle(null);
          setIsCreating(false);
        }}
      />
    );
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-500">加載中...</div>;
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => setIsCreating(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800"
      >
        <Plus size={18} />
        <span>新增文章</span>
      </button>

      <div className="bg-white shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">標題</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">分類</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">狀態</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">閱讀次數</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">操作</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{article.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {categories.find((c) => c.id === article.category_id)?.name || '-'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      article.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {article.published ? '已發佈' : '草稿'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{article.view_count}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button
                    onClick={() => setEditingArticle(article)}
                    className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={16} />
                    <span>編輯</span>
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="inline-flex items-center space-x-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                    <span>刪除</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
