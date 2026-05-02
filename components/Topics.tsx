import React from 'react';

const items = [
  {
    title: 'AI 導入の組織変革',
    subtitle: '組織と業務に AI を組み込む',
    description: 'ツール導入だけでは現場は動きません。AI を "誰が・何に・どう使うか" を業務フローに織り込み、属人化させずに組織として活用するための仕組みづくり。マーケ組織の変革プロセスを設計から伴走まで支援します。',
  },
  {
    title: 'AI を活用したコンテンツ制作',
    subtitle: '品質を落とさず、制作を加速する',
    description: 'コピー・ビジュアル・動画・SNS 投稿。生成 AI を制作実務に正しく組み込めば、量と速度を両立しながらクリエイティブの質を落とさずに済みます。実務で使える型と判断基準を、ワークショップ形式で提供します。',
  },
  {
    title: 'ツール・プロンプト実践',
    subtitle: 'ChatGPT / Claude / Gemini を使いこなす',
    description: '主要な生成 AI ツールにはそれぞれ得意・不得意があります。マーケ業務のシーン別にどのツールを選び、どんなプロンプトを書くか。ハンズオン形式で実務に直結するスキルを身につけます。',
  },
];

const ICONS = [
  // カード 1: 組織変革（building-office 系）
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  // カード 2: 制作（pencil-square 系）
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
  // カード 3: ツール（command-line 系）
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
];

export const Topics: React.FC = () => {
  return (
    <section id="topics" className="py-48 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-32">
          <h2 className="text-xs font-bold text-[#333333] tracking-[0.3em] uppercase mb-6 flex items-center gap-4">
            <span className="w-16 h-px bg-[#FFE600]"></span>
            Topics
          </h2>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <h3 className="text-5xl md:text-7xl font-serif text-[#333333] leading-[1.4]">3 つの専門領域</h3>
            <p className="text-[#666666] max-w-xl leading-[2.0] text-lg font-light">
              私たちが講演・ワークショップで扱う 3 つの領域です。組織導入から実務、ハンズオンまで一貫して支援します。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          {items.map((item, index) => (
            <div key={index} className="relative group pt-12">
              <div className="absolute top-0 left-0 w-0 h-1 bg-[#FFE600] group-hover:w-full transition-all duration-700 ease-in-out"></div>

              <div className="mb-10 text-[#CCCCCC] group-hover:text-[#333333] transition-colors duration-500">
                {ICONS[index]}
              </div>

              <h4 className="text-2xl font-serif mb-3 text-[#333333] group-hover:translate-x-2 transition-transform duration-500">{item.title}</h4>
              <p className="text-sm font-bold tracking-wider text-[#999999] mb-6">{item.subtitle}</p>
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
