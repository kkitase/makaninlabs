
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Topics } from './components/Topics';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export type Language = 'ja' | 'en';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Language>('ja');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100">
      <Header scrolled={scrolled} lang={lang} setLang={setLang} />
      <main className="flex-grow">
        <Hero />
        <Topics />
        <ContactSection lang={lang} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
