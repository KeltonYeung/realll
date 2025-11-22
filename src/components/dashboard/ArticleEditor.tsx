import { useState } from 'react';
import { supabase, type Article, type Category, type Tag } from '../../lib/supabase';
import { Save, X } from 'lucide-react';

interface ArticleEditorProps {
  article: Article | null;
  categories: Category[];
  tags: Tag[];
  onSave: () => void;
  onCancel: () => void;
}

export default function ArticleEditor({
  article,
  categories,
  tags,
  onSave,
  onCancel,
}: ArticleEditorProps) {
  const [title, setTitle] = useState(article?.title || '');
  const [subtitle, setSubtitle] = useState(article?.subtitle || '');
  const [excerpt, setExcerpt] = useState(article?.excerpt || '');
  const [content, setContent] = useState(article?.content || '');
  const [categoryId, setCategoryId] = useState(article?.category_id || '');
  const [published, setPublished] = useState(article?.published || false);
  const [featured, setFeatured] = useState(article?.featured || false);
  const [readingTime, setReadingTime] = useState(article?.reading_time || 5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!title.trim()) {
      setError('標題不能為空');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      if (article) {
        const { error: updateError } = await supabase
          .from('articles')
          .update({
            title,
            subtitle: subtitle || null,
            slug,
            excerpt: excerpt || null,
            content,
            category_id: categoryId || null,
            published,
            featured,
            reading_time: readingTime,
            updated_at: new Date().toISOString(),
          })
          .eq('id', article.id);

        if (updateError) throw updateError;
      } else {
        const { data: newArticle, error: insertError } = await supabase
          .from('articles')
          .insert([
            {
              title,
              subtitle: subtitle || null,
              slug,
              excerpt: excerpt || null,
              content,
              category_id: categoryId || null,
              published,
              featured,
              reading_time: readingTime,
            },
          ])
          .select()
          .single();

        if (insertError) throw insertError;
        article = newArticle;
      }

      if (article && selectedTags.length > 0) {
        await supabase.from('article_tags').delete().eq('article_id', article.id);

        const tagLinks = selectedTags.map((tagId) => ({
          article_id: article.id,
          tag_id: tagId,
        }));

        await supabase.from('article_tags').insert(tagLinks);
      }

      onSave();
    } catch (err) {
      setError('保存失敗');
      console.error('Error saving article:', err);
    } finally {
      setSaving(false);
    }
  };

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-gray-900">
          {article ? '編輯文章' : '新增文章'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-900"
        >
          <X size={24} />
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800">
          {error}
        </div>
      )}

      <div className="bg-white p-6 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">標題 *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 focus:border-gray-900 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">副標題</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 focus:border-gray-900 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">摘要</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 focus:border-gray-900 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">內容 *</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full px-4 py-2 border border-gray-300 focus:border-gray-900 focus:outline-none font-mono text-sm resize-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">分類</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 focus:border-gray-900 focus:outline-none"
            >
              <option value="">選擇分類</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">閱讀時間(分鐘)</label>
            <input
              type="number"
              value={readingTime}
              onChange={(e) => setReadingTime(parseInt(e.target.value) || 5)}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 focus:border-gray-900 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">標籤</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`px-3 py-1 text-sm border transition-colors ${
                  selectedTags.includes(tag.id)
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-900'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            <span className="text-sm text-gray-700">發佈</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <span className="text-sm text-gray-700">精選</span>
          </label>
        </div>

        <div className="flex space-x-4 pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400"
          >
            <Save size={18} />
            <span>{saving ? '保存中...' : '保存'}</span>
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 text-gray-900 hover:bg-gray-300"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}
