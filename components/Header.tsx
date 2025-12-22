
import React from 'react';
import { Language } from '../App';

interface HeaderProps {
  scrolled: boolean;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ scrolled, lang, setLang }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-4 shadow-md border-b border-[#FFE600]' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-[#333333] flex items-center justify-center">
            <span className="text-white font-serif text-xl">M</span>
          </div>
          <span className="text-2xl font-serif tracking-widest text-[#333333]">Makanin Labs</span>
        </div>
        
        <nav className="flex items-center space-x-6 md:space-x-12">
          <div className="flex items-center bg-[#F9F9F9] p-1 border border-[#E5E5E5]">
            <button 
              onClick={() => setLang('ja')}
              className={`px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] transition-all duration-300 ${lang === 'ja' ? 'bg-[#333333] text-white' : 'text-[#CCCCCC] hover:text-[#333333]'}`}
            >
              JP
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] transition-all duration-300 ${lang === 'en' ? 'bg-[#333333] text-white' : 'text-[#CCCCCC] hover:text-[#333333]'}`}
            >
              EN
            </button>
          </div>
          <a 
            href="#contact"
            className="px-6 py-3 bg-[#FFE600] text-[#333333] text-xs font-bold tracking-widest uppercase hover:bg-[#333333] hover:text-white transition-all duration-500 shadow-sm"
          >
            {lang === 'ja' ? 'ご相談' : 'Contact'}
          </a>
        </nav>
      </div>
    </header>
  );
};
