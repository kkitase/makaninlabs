
import React, { useState } from 'react';
import { Language } from '../App';

const content = {
  ja: {
    section: 'Contact',
    heading: 'お問い合わせ',
    description: 'サービスに関するご相談や、AI導入の具体的なステップなど、まずはお気軽にお問い合わせください。',
    successTitle: '送信完了',
    successText: 'お問い合わせありがとうございました。内容を確認の上、担当者より折り返しご連絡いたします。',
    labelName: 'お名前',
    labelCompany: '貴社名',
    labelEmail: 'メールアドレス',
    labelMessage: 'お問い合わせ内容',
    placeholderName: '山田 太郎',
    placeholderCompany: '株式会社Makanin',
    placeholderEmail: 'example@makanin.labs',
    placeholderMessage: 'ご相談内容をご記入ください。',
    submitBtn: '内容を送信する'
  },
  en: {
    section: 'Contact',
    heading: 'Contact Us',
    description: 'Please feel free to contact us for consultations regarding our services or specific steps for AI implementation.',
    successTitle: 'Sent Successfully',
    successText: 'Thank you for your inquiry. Our representative will get back to you shortly.',
    labelName: 'Name',
    labelCompany: 'Company',
    labelEmail: 'Email Address',
    labelMessage: 'Message',
    placeholderName: 'John Doe',
    placeholderCompany: 'Makanin Corp',
    placeholderEmail: 'example@makanin.labs',
    placeholderMessage: 'How can we help you?',
    submitBtn: 'Send Message'
  }
};

export const ContactSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = content[lang];
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // フォームを送信(iframe に送信されるため、ページ遷移は発生しない)
    const form = e.currentTarget;
    form.submit();
    
    // 成功メッセージを表示
    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
      form.reset();
      
      // 5秒後にフォームを再表示
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 500); // Google フォームへの送信を待つため、わずかに遅延
  };

  return (
    <section id="contact" className="py-48 bg-white border-t border-[#E5E5E5]">
      {/* Google フォーム送信用の隠し iframe */}
      <iframe name="hidden_iframe" id="hidden_iframe" style={{display: 'none'}}></iframe>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-xs font-bold text-[#333333] tracking-[0.3em] uppercase mb-6 flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-[#FFE600]"></span>
              {t.section}
              <span className="w-12 h-px bg-[#FFE600]"></span>
            </h2>
            <h3 className="text-5xl md:text-6xl font-serif text-[#333333] mb-8 italic">{t.heading}</h3>
            <p className="text-[#666666] leading-[2.0] text-lg font-light max-w-2xl mx-auto">
              {t.description}
            </p>
          </div>

          <div className="bg-[#F9F9F9] p-10 md:p-20 border border-[#E5E5E5] transition-all duration-700">
            {submitted ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-20 h-px bg-[#FFE600] mx-auto mb-10"></div>
                <h4 className="text-3xl font-serif text-[#333333] mb-6">{t.successTitle}</h4>
                <p className="text-[#666666] leading-relaxed">{t.successText}</p>
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
                  <label className="text-xs font-bold text-[#333333] tracking-widest uppercase">{t.labelName} <span className="text-[#FFE600] underline">*</span></label>
                  <input
                    name="entry.464670817"
                    required
                    type="text"
                    placeholder={t.placeholderName}
                    className="w-full px-0 py-4 bg-transparent border-b border-[#CCCCCC] focus:border-[#333333] outline-none transition-all placeholder:text-[#BBBBBB] text-lg font-light"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-[#333333] tracking-widest uppercase">{t.labelCompany} <span className="text-[#FFE600] underline">*</span></label>
                  <input
                    name="entry.609499387"
                    required
                    type="text"
                    placeholder={t.placeholderCompany}
                    className="w-full px-0 py-4 bg-transparent border-b border-[#CCCCCC] focus:border-[#333333] outline-none transition-all placeholder:text-[#BBBBBB] text-lg font-light"
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <label className="text-xs font-bold text-[#333333] tracking-widest uppercase">{t.labelEmail} <span className="text-[#FFE600] underline">*</span></label>
                  <input
                    name="emailAddress"
                    required
                    type="email"
                    placeholder={t.placeholderEmail}
                    className="w-full px-0 py-4 bg-transparent border-b border-[#CCCCCC] focus:border-[#333333] outline-none transition-all placeholder:text-[#BBBBBB] text-lg font-light"
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <label className="text-xs font-bold text-[#333333] tracking-widest uppercase">{t.labelMessage}</label>
                  <textarea
                    name="entry.1321229048"
                    rows={4}
                    placeholder={t.placeholderMessage}
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
                        <span className="text-xs">{t.submitBtn}</span>
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
