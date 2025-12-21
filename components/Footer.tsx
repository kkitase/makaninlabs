
import React from 'react';
import { Language } from '../App';

const content = {
  ja: {
    tagline: 'AIとデータの力で、日本のマーケティングに新しいスタンダードを。',
    copyright: '© 2024 Makanin Labs All Rights Reserved.',
    privacy: 'プライバシーポリシー',
    terms: '利用規約'
  },
  en: {
    tagline: 'Creating a new standard for marketing through the power of AI and data.',
    copyright: '© 2024 Makanin Labs All Rights Reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service'
  }
};

export const Footer: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = content[lang];
  return (
    <footer className="bg-slate-900 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-b border-slate-800 pb-16 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter">Makanin Labs</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              {t.tagline}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>{t.copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
