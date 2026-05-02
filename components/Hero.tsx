
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
          <h1 className="text-[2.8rem] md:text-[4.5rem] lg:text-[6rem] font-serif text-[#333333] leading-[1.2] mb-12 animate-fade-in">
            AI 時代のマーケターを、<br />
            <span className="block mb-4">現場で</span>
            <span className="italic block mt-4 border-l-8 border-[#FFE600] pl-6 ml-[-12px]">育てる。</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#666666] leading-[2.0] max-w-2xl mb-16 opacity-90 font-light">
            生成 AI は触れる人がいて初めて武器になります。Makanin Labs は、企業のマーケティング組織に向けた講演・カスタムワークショップで、"明日から使える" 知識と判断軸を提供します。
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
