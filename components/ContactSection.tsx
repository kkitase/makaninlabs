
import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    form.submit();

    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
      form.reset();

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 500);
  };

  return (
    <section id="contact" className="py-48 bg-white border-t border-[#E5E5E5]">
      <iframe name="hidden_iframe" id="hidden_iframe" style={{display: 'none'}}></iframe>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-xs font-bold text-[#333333] tracking-[0.3em] uppercase mb-6 flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-[#FFE600]"></span>
              Contact
              <span className="w-12 h-px bg-[#FFE600]"></span>
            </h2>
            <h3 className="text-5xl md:text-6xl font-serif text-[#333333] mb-8 italic">お問い合わせ</h3>
            <p className="text-[#666666] leading-[2.0] text-lg font-light max-w-2xl mx-auto">
              講演・ワークショップのご依頼、AI 導入のご相談など、まずはお気軽にお問い合わせください。
            </p>
          </div>

          <div className="bg-[#F9F9F9] p-10 md:p-20 border border-[#E5E5E5] transition-all duration-700">
            {submitted ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-20 h-px bg-[#FFE600] mx-auto mb-10"></div>
                <h4 className="text-3xl font-serif text-[#333333] mb-6">送信完了</h4>
                <p className="text-[#666666] leading-relaxed">お問い合わせありがとうございました。内容を確認の上、担当者より折り返しご連絡いたします。</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                action="https://docs.google.com/forms/d/e/1FAIpQLSdExADzQVDQZnKlN_KxupVcHd0gmdy2oUnC2BZLvIeDyCResA/formResponse"
                target="hidden_iframe"
                method="POST"
                className="grid grid-cols-1 md:grid-cols-2 gap-10"
              >
                <div className="space-y-4">
                  <label className="text-xs font-bold text-[#333333] tracking-widest uppercase">お名前 <span className="text-[#FFE600] underline">*</span></label>
                  <input
                    name="entry.464670817"
                    required
                    type="text"
                    placeholder="山田 太郎"
                    className="w-full px-0 py-4 bg-transparent border-b border-[#CCCCCC] focus:border-[#333333] outline-none transition-all placeholder:text-[#BBBBBB] text-lg font-light"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-[#333333] tracking-widest uppercase">貴社名 <span className="text-[#FFE600] underline">*</span></label>
                  <input
                    name="entry.609499387"
                    required
                    type="text"
                    placeholder="株式会社Makanin"
                    className="w-full px-0 py-4 bg-transparent border-b border-[#CCCCCC] focus:border-[#333333] outline-none transition-all placeholder:text-[#BBBBBB] text-lg font-light"
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <label className="text-xs font-bold text-[#333333] tracking-widest uppercase">メールアドレス <span className="text-[#FFE600] underline">*</span></label>
                  <input
                    name="emailAddress"
                    required
                    type="email"
                    placeholder="example@makanin.labs"
                    className="w-full px-0 py-4 bg-transparent border-b border-[#CCCCCC] focus:border-[#333333] outline-none transition-all placeholder:text-[#BBBBBB] text-lg font-light"
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <label className="text-xs font-bold text-[#333333] tracking-widest uppercase">お問い合わせ内容</label>
                  <textarea
                    name="entry.1321229048"
                    rows={6}
                    placeholder="ご依頼内容（講演・ワークショップなど）、ご検討中のテーマ、対象者・人数、ご希望時期などをご記入ください。"
                    className="w-full px-0 py-4 bg-transparent border-b border-[#CCCCCC] focus:border-[#333333] outline-none transition-all resize-none placeholder:text-[#BBBBBB] text-lg font-light"
                  ></textarea>
                </div>
                <div className="md:col-span-2 mt-8">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-6 bg-[#333333] text-white font-bold tracking-[0.4em] uppercase hover:bg-[#FFE600] hover:text-[#333333] transition-all duration-700 shadow-2xl shadow-gray-200 flex items-center justify-center space-x-4 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span className="text-xs">内容を送信する</span>
                        <svg className="w-6 h-px bg-current" viewBox="0 0 24 1"></svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
