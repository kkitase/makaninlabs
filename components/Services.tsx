
import React from 'react';
import { Language } from '../App';

const content = {
  ja: {
    section: '私たちのサービス',
    heading: 'Generative AI Marketing',
    subheading: '生成AIによる市場分析から、クリエイティブの自動生成、そして真摯なコンサルティングまで。最先端の力を、確かな納得感と共に。',
    items: [
      {
        title: "Marketing Consulting",
        description: "属人化した業務を仕組み化し、戦略立案に注力できる体制へ。AI活用研修も実施し、組織全体の生産性と自走力を高めます。"
      },
      {
        title: "Content Generation",
        description: "ターゲットに響くコピーやビジュアルをAIで高速生成。クリエイティブの質を落とさず、圧倒的な制作効率を実現します。"
      },
      {
        title: "Market Analysis",
        description: "膨大な市場・競合データをAIがリアルタイム解析。確かなデータに基づき、高精度かつ迅速な意思決定を支援します。"
      }
    ]
  },
  en: {
    section: 'Services',
    heading: 'AI Marketing Support',
    subheading: 'From market analysis to creative generation and organizational transformation. We optimize the entire marketing process with the latest AI technology.',
    items: [
      {
        title: "Marketing Consulting",
        description: "Systematize personalized tasks and move towards a structure focused on strategic planning. We also conduct AI training to enhance productivity and autonomy."
      },
      {
        title: "Content Generation",
        description: "Rapidly generate copy and visuals that resonate with your target audience using AI. Achieve overwhelming production efficiency without sacrificing quality."
      },
      {
        title: "Market Analysis",
        description: "AI analyzes vast amounts of market and competitor data in real-time. We support high-precision and rapid decision-making based on reliable data."
      }
    ]
  }
};

const ICONS = [
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
];

export const Services: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = content[lang];
  return (
    <section id="services" className="py-48 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-32">
          <h2 className="text-xs font-bold text-[#333333] tracking-[0.3em] uppercase mb-6 flex items-center gap-4">
            <span className="w-16 h-px bg-[#FFE600]"></span>
            {t.section}
          </h2>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <h3 className="text-5xl md:text-7xl font-serif text-[#333333] leading-[1.2]">{t.heading}</h3>
            <p className="text-[#666666] max-w-xl leading-[2.0] text-lg font-light">
              {t.subheading}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {t.items.map((item, index) => (
            <div key={index} className="relative group pt-12">
              {/* Hover yellow line animation */}
              <div className="absolute top-0 left-0 w-0 h-1 bg-[#FFE600] group-hover:w-full transition-all duration-700 ease-in-out"></div>
              
              <div className="mb-10 text-[#CCCCCC] group-hover:text-[#333333] transition-colors duration-500">
                {ICONS[index]}
              </div>
              
              <h4 className="text-2xl font-serif mb-6 text-[#333333] group-hover:translate-x-2 transition-transform duration-500">{item.title}</h4>
              <p className="text-[#666666] leading-[2.0] text-base font-light opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
