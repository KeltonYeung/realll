import { useState } from 'react';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { supabase, type ContactSubmission } from '../lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiry_type: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const { error: submitError } = await supabase.from('contact_submissions').insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          inquiry_type: formData.inquiry_type,
        },
      ]);

      if (submitError) throw submitError;

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiry_type: '',
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('提交失敗，請稍後重試');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">聯繫方式</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            歡迎各類合作機會與文學交流，期待與你的對話
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={24} />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">郵件聯繫</h3>
            <p className="text-sm text-gray-600">contact@example.com</p>
          </div>

          <div className="bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={24} />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">媒體約稿</h3>
            <p className="text-sm text-gray-600">歡迎各類出版與媒體合作</p>
          </div>

          <div className="bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={24} />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">品牌合作</h3>
            <p className="text-sm text-gray-600">提供文案創作與品牌故事服務</p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 shadow-sm">
          <h2 className="font-serif text-2xl text-gray-900 mb-6">發送訊息</h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800">
              訊息已成功發送，我會盡快回復您！
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                  姓名 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                  郵箱 *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="inquiry_type" className="block text-sm text-gray-700 mb-2">
                諮詢類型
              </label>
              <select
                id="inquiry_type"
                name="inquiry_type"
                value={formData.inquiry_type}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
              >
                <option value="">請選擇</option>
                <option value="collaboration">合作邀約</option>
                <option value="media">媒體約稿</option>
                <option value="brand">品牌合作</option>
                <option value="general">一般諮詢</option>
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm text-gray-700 mb-2">
                主題
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                訊息內容 *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={8}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400 transition-colors flex items-center justify-center space-x-2"
            >
              <span>{submitting ? '發送中...' : '發送訊息'}</span>
              <Send size={18} />
            </button>
          </form>
        </div>

        <div className="mt-12 bg-white p-8 md:p-12 shadow-sm">
          <h2 className="font-serif text-2xl text-gray-900 mb-6">合作領域</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">文學創作</h3>
              <ul className="space-y-2 text-sm">
                <li>• 散文與詩歌創作</li>
                <li>• 專欄約稿</li>
                <li>• 文學評論</li>
                <li>• 翻譯與改編</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">品牌內容</h3>
              <ul className="space-y-2 text-sm">
                <li>• 品牌故事撰寫</li>
                <li>• 文案創作</li>
                <li>• 內容策劃</li>
                <li>• 創意諮詢</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">媒體合作</h3>
              <ul className="space-y-2 text-sm">
                <li>• 雜誌供稿</li>
                <li>• 訪談與對話</li>
                <li>• 線上分享</li>
                <li>• 工作坊主持</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">其他項目</h3>
              <ul className="space-y-2 text-sm">
                <li>• 出版合作</li>
                <li>• 文學活動</li>
                <li>• 寫作指導</li>
                <li>• 跨界合作</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
