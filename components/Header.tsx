
import React from 'react';
import { Language } from '../App';

interface HeaderProps {
  scrolled: boolean;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ scrolled, lang, setLang }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Makanin Labs</span>
        </div>
        
        <nav className="flex items-center space-x-4 md:space-x-8">
          <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">
            <button 
              onClick={() => setLang('ja')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'ja' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              JP
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              EN
            </button>
          </div>
          <a 
            href="#contact"
            className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all shadow-md"
          >
            {lang === 'ja' ? 'お問い合わせ' : 'Contact'}
          </a>
        </nav>
      </div>
    </header>
  );
};
