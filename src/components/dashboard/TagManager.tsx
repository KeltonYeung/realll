import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Save, X } from 'lucide-react';
import { supabase, type Tag } from '../../lib/supabase';

export default function TagManager() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [tagName, setTagName] = useState('');

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    const { data } = await supabase.from('tags').select('*');
    setTags(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!tagName.trim()) {
      alert('標籤名稱不能為空');
      return;
    }

    const slug = tagName
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    if (editing) {
      const { error } = await supabase
        .from('tags')
        .update({ name: tagName, slug })
        .eq('id', editing);

      if (error) {
        alert('更新失敗');
        return;
      }
    } else {
      const { error } = await supabase.from('tags').insert([{ name: tagName, slug }]);

      if (error) {
        alert('新增失敗');
        return;
      }
    }

    setTagName('');
    setEditing(null);
    setIsCreating(false);
    await loadTags();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('確定刪除此標籤嗎？')) return;

    const { error } = await supabase.from('tags').delete().eq('id', id);

    if (error) {
      alert('刪除失敗');
    } else {
      await loadTags();
    }
  };

  const startEdit = (tag: Tag) => {
    setTagName(tag.name);
    setEditing(tag.id);
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">加載中...</div>;
  }

  return (
    <div className="space-y-6">
      {!isCreating && !editing && (
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800"
        >
          <Plus size={18} />
          <span>新增標籤</span>
        </button>
      )}

      {(isCreating || editing) && (
        <div className="bg-white p-6 shadow-sm">
          <h3 className="font-medium text-gray-900 mb-4">
            {editing ? '編輯標籤' : '新增標籤'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">標籤名稱</label>
              <input
                type="text"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 focus:border-gray-900 focus:outline-none"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-1 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800"
              >
                <Save size={16} />
                <span>保存</span>
              </button>
              <button
                onClick={() => {
                  setTagName('');
                  setEditing(null);
                  setIsCreating(false);
                }}
                className="flex items-center space-x-1 px-4 py-2 bg-gray-200 text-gray-900 hover:bg-gray-300"
              >
                <X size={16} />
                <span>取消</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">標籤名稱</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">操作</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{tag.name}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button
                    onClick={() => startEdit(tag)}
                    className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={16} />
                    <span>編輯</span>
                  </button>
                  <button
                    onClick={() => handleDelete(tag.id)}
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
