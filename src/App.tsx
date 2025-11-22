import React from 'react';
import { 
  Rocket, 
  Shield, 
  Zap, 
  ChevronRight, 
  Menu, 
  X, 
  Github, 
  Twitter 
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      
      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Bolt<span className="text-indigo-500">Redesign</span></span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="hover:text-indigo-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Features</a>
                <a href="#" className="hover:text-indigo-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
                <a href="#" className="hover:text-indigo-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">About</a>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all">
                  Get Started
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Features</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Pricing</a>
              <button className="w-full mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg">Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-sm text-slate-300">v2.0 is now live</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Build websites that <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              look expensive.
            </span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10">
            Stop settling for basic defaults. Use this code to instantly upgrade your Bolt application with a modern, dark-themed UI.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-indigo-600/25">
              Start Building <ChevronRight className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all">
              View Documentation
            </button>
          </div>
        </div>
      </div>

      {/* FEATURES GRID */}
      <div className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 group">
              <div className="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                <Zap className="w-6 h-6 text-indigo-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-slate-400">Optimized for speed with Vite and React. Your users won't wait for content to load.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-all hover:shadow-2xl hover:shadow-purple-500/10 group">
              <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <Shield className="w-6 h-6 text-purple-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure by Default</h3>
              <p className="text-slate-400">Built-in best practices for security and data protection. Enterprise grade safety.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-pink-500/50 transition-all hover:shadow-2xl hover:shadow-pink-500/10 group">
              <div className="w-12 h-12 bg-pink-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pink-600 transition-colors">
                <Rocket className="w-6 h-6 text-pink-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Modern Stack</h3>
              <p className="text-slate-400">Uses the latest Tailwind CSS utility classes for rapid and beautiful UI development.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-slate-800 p-1.5 rounded-lg">
              <Rocket className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="font-semibold text-slate-300">BoltRedesign</span>
          </div>
          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
          <p className="text-slate-500 text-sm">© 2024 All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;
