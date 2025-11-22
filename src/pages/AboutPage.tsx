import { FileDown } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-16 text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gray-300 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-300" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">關於作者</h1>
          <p className="text-gray-600 text-lg">Writer, Observer, Wanderer</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white p-8 md:p-12 shadow-sm mb-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              我是一名獨立寫作者，專注於記錄城市生活中那些細微而深刻的瞬間。
              我的文字遊走在散文、詩歌和隨筆之間，試圖捕捉現代都市人內心深處的情感共鳴。
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              寫作於我，是一種觀察和思考的方式。我喜歡在夜晚的街道上漫步，
              在咖啡館的角落裡沉思，在旅途中尋找那些能夠觸動人心的故事。
              每一篇文字都是我與這個世界對話的一種嘗試。
            </p>
            <p className="text-gray-700 leading-relaxed">
              我相信，真正的文學應該是安靜的、克制的，卻能在讀者心中激起漣漪。
              它不需要華麗的辭藻，只需要真誠的情感和對生活細節的敏銳觀察。
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-sm mb-8">
            <h2 className="font-serif text-2xl text-gray-900 mb-6">創作方向</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="mr-3 text-gray-400">—</span>
                <span>城市散文：記錄都市生活的詩意瞬間</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-gray-400">—</span>
                <span>現代詩歌：探索語言的節奏與意象</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-gray-400">—</span>
                <span>旅行筆記：在路上尋找自我與世界的關係</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-gray-400">—</span>
                <span>文化評論：以文學的眼光觀察當代文化現象</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-sm mb-8">
            <h2 className="font-serif text-2xl text-gray-900 mb-6">合作聯繫</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              歡迎媒體約稿、品牌合作、文學活動邀約等各類合作機會。
              如有意向，請透過聯繫頁面與我取得聯繫。
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center space-x-2 px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                <FileDown size={18} />
                <span>下載簡歷</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-sm">
            <h2 className="font-serif text-2xl text-gray-900 mb-6">發表與榮譽</h2>
            <div className="space-y-4 text-gray-700">
              <div className="border-l-2 border-gray-300 pl-4">
                <p className="font-medium">《城市之夜》系列散文</p>
                <p className="text-sm text-gray-500">發表於《文學季刊》2024年春季號</p>
              </div>
              <div className="border-l-2 border-gray-300 pl-4">
                <p className="font-medium">詩集《風的記憶》</p>
                <p className="text-sm text-gray-500">獨立出版 · 2023</p>
              </div>
              <div className="border-l-2 border-gray-300 pl-4">
                <p className="font-medium">青年作家獎提名</p>
                <p className="text-sm text-gray-500">文學協會 · 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
