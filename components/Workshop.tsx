import React from 'react';

const items = [
  {
    label: 'Keynote / Speaking',
    title: '講演・登壇',
    summary: '60 〜 90 分の単発講演・登壇',
    description: '社内向けの経営層・全社イベントから、業界カンファレンス・パートナー向けセッション・ウェビナーまで対応。AI とマーケティングの現在地、組織がいま向き合うべき問いを、実践的な事例と共に語ります。',
    targetLabel: '想定',
    target: '経営会議 / 全社キックオフ / 業界カンファレンス / パートナー向けセッション',
  },
  {
    label: 'Workshop',
    title: 'カスタムワークショップ',
    summary: '2 時間 〜 1 日 / 貴社の課題に合わせて設計',
    description: '決まったコースは提供していません。貴社のマーケ組織の状況・課題・対象者をヒアリングした上で、内容を 1 から設計するハンズオン型ワークショップ。3 つの専門領域（組織導入 / コンテンツ制作 / ツール実践）から組み合わせます。',
    targetLabel: '想定',
    target: 'マーケ部門 5 〜 30 名 / 短時間セミナー〜半日・1 日研修 / オンライン or 対面',
  },
];

export const Workshop: React.FC = () => {
  return (
    <section id="workshop" className="py-48 bg-[#F9F9F9] overflow-hidden border-t border-[#E5E5E5]">
      <div className="container mx-auto px-6">
        <div className="mb-32">
          <h2 className="text-xs font-bold text-[#333333] tracking-[0.3em] uppercase mb-6 flex items-center gap-4">
            <span className="w-16 h-px bg-[#FFE600]"></span>
            Workshop
          </h2>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <h3 className="text-5xl md:text-7xl font-serif text-[#333333] leading-[1.4]">依頼形態</h3>
            <p className="text-[#666666] max-w-xl leading-[2.0] text-lg font-light">
              貴社の課題に合わせた、カスタム形式で提供します。決まったコースはありません。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {items.map((item, index) => (
            <div key={index} className="bg-white p-12 md:p-16 border border-[#E5E5E5] relative group">
              <div className="absolute top-0 left-0 w-0 h-1 bg-[#FFE600] group-hover:w-full transition-all duration-700 ease-in-out"></div>

              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#999999] mb-6">{item.label}</p>
              <h4 className="text-3xl md:text-4xl font-serif mb-4 text-[#333333]">{item.title}</h4>
              <p className="text-base font-bold tracking-wider text-[#333333] mb-8">{item.summary}</p>
              <p className="text-[#666666] leading-[2.0] text-base font-light mb-10">
                {item.description}
              </p>
              <div className="border-t border-[#E5E5E5] pt-6">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#CCCCCC] mb-3">{item.targetLabel}</p>
                <p className="text-sm text-[#666666] font-light leading-[1.8]">{item.target}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <p className="text-[#666666] leading-[2.0] text-lg font-light italic">
            ご依頼内容・規模・予算など、まずはお気軽にご相談ください。
          </p>
          <a href="#contact" className="inline-block mt-8 px-10 py-4 bg-[#333333] text-white font-bold tracking-widest uppercase text-xs hover:bg-[#FFE600] hover:text-[#333333] transition-all duration-500">
            ご相談はこちら
          </a>
        </div>
      </div>
    </section>
  );
};
