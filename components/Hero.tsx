
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-32 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#FFE600] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-[#333333] rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-1.5 mb-8 text-xs font-bold uppercase tracking-[0.2em] text-[#333333] border-b-2 border-[#FFE600]">
            私たちが目指すこと
          </span>
          <h1 className="text-[2rem] md:text-[3.5rem] lg:text-[5rem] font-serif text-[#333333] leading-[1.4] mb-12 animate-fade-in">
            AI とマーケティング、<br />
            <span className="italic block mt-4 border-l-8 border-[#FFE600] pl-6 ml-[-12px]">付き合い方を考える。</span>
          </h1>
          <p className="text-base md:text-lg text-[#666666] leading-[2.0] max-w-2xl mb-16 opacity-90 font-light">
            <span className="whitespace-nowrap">生成 AI</span> で何が変わり、何から始めればいいのか。答えは業界・組織・規模ごとに違います。Makanin Labs は、講演やカスタムワークショップを通じて、貴社のマーケティングに合った "AI との付き合い方" を、一緒に組み立てます。
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#contact" className="px-10 py-5 bg-[#333333] text-white font-bold rounded-none hover:bg-[#FFE600] hover:text-[#333333] transition-all duration-500 shadow-xl shadow-gray-100 text-center tracking-widest uppercase text-xs">
              講演・ワークショップを依頼する
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <p className="text-[10px] tracking-[0.3em] uppercase mb-4 text-[#CCCCCC] [-webkit-writing-mode:vertical-rl]">Scroll</p>
        <div className="w-px h-24 bg-[#E5E5E5] mx-auto"></div>
      </div>
    </section>
  );
};
