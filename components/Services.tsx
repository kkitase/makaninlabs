
import React from 'react';
import { Language } from '../App';

const content = {
  ja: {
    section: 'Services',
    heading: 'AI Marketing Support',
    subheading: '市場分析からクリエイティブ生成、組織変革まで。最新AI技術でマーケティングプロセス全体を最適化します。',
    items: [
      {
        title: "Market Analysis",
        description: "膨大な市場・競合データをAIがリアルタイム解析。確かなデータに基づき、高精度かつ迅速な意思決定を支援します。"
      },
      {
        title: "Content Generation",
        description: "ターゲットに響くコピーやビジュアルをAIで高速生成。クリエイティブの質を落とさず、圧倒的な制作効率を実現します。"
      },
      {
        title: "Marketing Consulting",
        description: "属人化した業務を仕組み化し、戦略立案に注力できる体制へ。AI活用研修も実施し、組織全体の生産性と自走力を高めます。"
      }
    ]
  },
  en: {
    section: 'Services',
    heading: 'AI Marketing Support',
    subheading: 'From market analysis to creative generation and organizational transformation. We optimize the entire marketing process with the latest AI technology.',
    items: [
      {
        title: "Market Analysis",
        description: "AI analyzes vast amounts of market and competitor data in real-time. We support high-precision and rapid decision-making based on reliable data."
      },
      {
        title: "Content Generation",
        description: "Rapidly generate copy and visuals that resonate with your target audience using AI. Achieve overwhelming production efficiency without sacrificing quality."
      },
      {
        title: "Marketing Consulting",
        description: "Systematize personalized tasks and move towards a structure focused on strategic planning. We also conduct AI training to enhance productivity and autonomy."
      }
    ]
  }
};

const ICONS = [
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
];

export const Services: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = content[lang];
  return (
    <section id="services" className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4">{t.section}</h2>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900">{t.heading}</h3>
            <p className="text-slate-500 max-w-lg">
              {t.subheading}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.items.map((item, index) => (
            <div key={index} className="p-8 bg-white rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-slate-200 transition-all group">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {ICONS[index]}
              </div>
              <h4 className="text-xl font-bold mb-4 text-slate-800">{item.title}</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
