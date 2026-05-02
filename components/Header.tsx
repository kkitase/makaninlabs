import React from 'react';

interface HeaderProps {
  scrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-4 shadow-md border-b border-[#FFE600]' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-[#333333] flex items-center justify-center">
            <span className="text-white font-serif text-xl">M</span>
          </div>
          <span className="text-2xl font-serif tracking-widest text-[#333333]">Makanin Labs</span>
        </div>

        <nav className="flex items-center">
          <a
            href="#contact"
            className="px-6 py-3 bg-[#FFE600] text-[#333333] text-xs font-bold tracking-widest uppercase hover:bg-[#333333] hover:text-white transition-all duration-500 shadow-sm"
          >
            ご相談
          </a>
        </nav>
      </div>
    </header>
  );
};
