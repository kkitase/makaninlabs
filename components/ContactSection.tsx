
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
    submitBtn: '内容を送信する',
    privacyText: '送信いただく前にプライバシーポリシーをご確認ください。'
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
    submitBtn: 'Send Message',
    privacyText: 'Please check our Privacy Policy before submitting.'
  }
};

export const ContactSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = content[lang];
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Googleフォームを新しいタブで開く
      const googleFormUrl = process.env.GOOGLE_FORM_URL || 'https://forms.google.com';
      window.open(googleFormUrl, '_blank');
      
      // 成功メッセージを表示
      setSubmitted(true);
      setIsLoading(false);
      
      // 5秒後にメッセージを非表示
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to open form:", error);
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4">{t.section}</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-6">{t.heading}</h3>
            <p className="text-slate-500 leading-relaxed">
              {t.description}
            </p>
          </div>

          <div className="bg-slate-50 p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-sm transition-all duration-500">
            {submitted ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-2">{t.successTitle}</h4>
                <p className="text-slate-600">{t.successText}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t.labelName} <span className="text-red-500">*</span></label>
                  <input
                    name="name"
                    required
                    type="text"
                    placeholder={t.placeholderName}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t.labelCompany}</label>
                  <input
                    name="company"
                    type="text"
                    placeholder={t.placeholderCompany}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t.labelEmail} <span className="text-red-500">*</span></label>
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder={t.placeholderEmail}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">{t.labelMessage} <span className="text-red-500">*</span></label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder={t.placeholderMessage}
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <div className="md:col-span-2 mt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center space-x-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        <span>{t.submitBtn}</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-4">
                    {t.privacyText.split('プライバシーポリシー').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <a href="#" className="underline hover:text-slate-600">{lang === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}</a>}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
