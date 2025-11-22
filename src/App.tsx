import React, { useState } from 'react';
import { 
  BookOpen, 
  Coffee, 
  Feather, 
  Menu, 
  X, 
  ArrowRight, 
  Instagram, 
  Mail 
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // 1. 全局背景設定：使用 Stone-50 (米白/紙質感) 替代純白或黑色
    <div className="min-h-screen bg-[#faf9f6] text-stone-800 font-sans selection:bg-stone-200">
      
      {/* 導航欄：極簡、透明感 */}
      <nav className="fixed w-full z-50 bg-[#faf9f6]/80 backdrop-blur-sm border-b border-stone-200/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo: 使用襯線字體 (font-serif) */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-serif tracking-wider text-stone-900">Realll.</span>
            </div>
            
            {/* 桌面選單：文字顏色柔和，Hover 效果低調 */}
            <div className="hidden md:flex items-center space-x-12">
              <a href="#" className="text-stone-600 hover:text-stone-900 transition-colors text-sm tracking-widest uppercase">Journal</a>
              <a href="#" className="text-stone-600 hover:text-stone-900 transition-colors text-sm tracking-widest uppercase">Gallery</a>
              <a href="#" className="text-stone-600 hover:text-stone-900 transition-colors text-sm tracking-widest uppercase">About</a>
              <button className="bg-stone-800 text-[#faf9f6] px-6 py-2 rounded-full text-sm hover:bg-stone-700 transition-all duration-500 ease-out">
                Connect
              </button>
            </div>

            {/* 手機選單按鈕 */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-600 hover:text-stone-900">
                {isMenuOpen ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* 手機選單展開 */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#faf9f6] border-b border-stone-200 absolute w-full">
            <div className="px-6 py-8 space-y-4 flex flex-col items-center font-serif text-xl">
              <a href="#" className="block py-2 text-stone-700">Journal</a>
              <a href="#" className="block py-2 text-stone-700">Gallery</a>
              <a href="#" className="block py-2 text-stone-700">About</a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO 區域：大留白、襯線字體、優雅的排版 */}
      <header className="pt-40 pb-20 md:pt-52 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="border-b border-stone-300 pb-1 text-stone-500 text-sm tracking-[0.2em] uppercase">
              Welcome to the space
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 leading-tight mb-8 font-light">
            Simplicity is the <br/>
            <span className="italic font-normal text-stone-600">ultimate sophistication.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-500 max-w-xl mx-auto leading-relaxed mb-12 font-light">
            在這裡保留您原本的功能，但換上一種更安靜、更舒適的視覺語言。
            生活不需要太複雜，設計也是。
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="group flex items-center justify-center gap-3 bg-stone-800 text-[#faf9f6] px-8 py-4 rounded-full hover:bg-stone-700 transition-all duration-500">
              Start Exploring
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-stone-300 text-stone-600 hover:border-stone-800 hover:text-stone-900 transition-all duration-500">
              Read More
            </button>
          </div>
        </div>
      </header>

      {/* 功能區塊 (Feature Section) - 模擬卡片式設計 */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            
            {/* 卡片 1 */}
            <div className="group">
              <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-stone-100 transition-colors">
                <Feather className="w-5 h-5 text-stone-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-stone-800">Lightweight</h3>
              <p className="text-stone-500 leading-relaxed font-light">
                輕盈的架構，如同羽毛般無負擔。保留核心功能，去除多餘裝飾。
              </p>
            </div>

            {/* 卡片 2 */}
            <div className="group">
              <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-stone-100 transition-colors">
                <BookOpen className="w-5 h-5 text-stone-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-stone-800">Storytelling</h3>
              <p className="text-stone-500 leading-relaxed font-light">
                每一個像素都在訴說故事。用最簡單的線條，勾勒出最深刻的印象。
              </p>
            </div>

            {/* 卡片 3 */}
            <div className="group">
              <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-stone-100 transition-colors">
                <Coffee className="w-5 h-5 text-stone-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-stone-800">Relaxed</h3>
              <p className="text-stone-500 leading-relaxed font-light">
                給用戶一杯咖啡的時間，享受慢節奏的交互體驗。溫暖而治癒。
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 圖片/展示區塊 */}
      <section className="py-24 px-6 bg-[#faf9f6]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-[4/5] bg-stone-200 rounded-sm overflow-hidden relative">
               {/* 這裡可以用 img 標籤放入您的圖片 */}
               <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                  [ 您的圖片區域 ]
               </div>
            </div>
            <div className="md:pl-12">
              <h2 className="text-4xl font-serif mb-6 text-stone-900">捕捉每一個<br/>真實的瞬間</h2>
              <p className="text-stone-500 leading-relaxed mb-8 font-light">
                這裡可以放置您的主要功能展示。我們使用了由淺入深的排版方式，
                讓視覺焦點自然流動。
              </p>
              <a href="#" className="inline-flex items-center text-stone-800 border-b border-stone-800 pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors">
                查看更多作品 <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 頁腳 */}
      <footer className="bg-stone-900 text-[#faf9f6] py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-serif">Realll.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-400 transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-stone-400 transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
          <div className="text-stone-500 text-sm font-light">
            © 2024 Design by Bolt. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
