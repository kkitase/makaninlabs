
import React from 'react';
import { Language } from '../App';

const content = {
  ja: {
    tagline: 'AIとデータの力で、日本のマーケティングに新しいスタンダードを。',
    copyright: '© 2024 Makanin Labs All Rights Reserved.'
  },
  en: {
    tagline: 'Creating a new standard for marketing through the power of AI and data.',
    copyright: '© 2024 Makanin Labs All Rights Reserved.'
  }
};

export const Footer: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = content[lang];
  return (
    <footer className="bg-white text-[#333333] py-32 border-t border-[#E5E5E5]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 border-b border-[#F9F9F9] pb-24 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center space-x-4 mb-10">
              <div className="w-10 h-10 bg-[#333333] flex items-center justify-center">
                <span className="text-white font-serif text-xl">M</span>
              </div>
              <span className="text-3xl font-serif tracking-widest uppercase">Makanin Labs</span>
            </div>
            <p className="text-[#666666] leading-[2.0] text-lg font-light italic">
              {t.tagline}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-px bg-[#FFE600] mb-4"></div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#CCCCCC]">Towards Sincerity</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] text-[#BBBBBB] uppercase">
          <p>{t.copyright}</p>
          <p className="mt-4 md:mt-0 font-serif lowercase italic">crafted with sincerity.</p>
        </div>
      </div>
    </footer>
  );
};
