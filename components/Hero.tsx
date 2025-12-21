
import React from 'react';
import { Language } from '../App';

const content = {
  ja: {
    badge: 'AI-Driven Innovation',
    title: 'マーケティングを、',
    titleAccent: 'AIで進化させる。',
    description: 'Makanin Labsは、企業のマーケティング活動におけるAI活用を支援し、データとテクノロジーの力でビジネスの成長を加速させます。',
    cta: '詳しく見る'
  },
  en: {
    badge: 'AI-Driven Innovation',
    title: 'Evolve Marketing with',
    titleAccent: 'The Power of AI.',
    description: 'Makanin Labs supports the integration of AI in corporate marketing, accelerating business growth through the synergy of data and cutting-edge technology.',
    cta: 'Learn More'
  }
};

export const Hero: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = content[lang];
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-400 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-slate-400 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 rounded-full">
            {t.badge}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 leading-[1.1] mb-8 animate-fade-in">
            {t.title}<br />
            <span className="gradient-text italic">{t.titleAccent}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mb-12 opacity-90">
            {t.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#services" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 text-center">
              {t.cta}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-px h-12 bg-slate-300 mx-auto"></div>
      </div>
    </section>
  );
};
