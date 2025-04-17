
import React from 'react';
import { Book, Calculator, Globe2, Atom, Music, Palette } from 'lucide-react';

const FloatingSymbols = () => {
  const symbols = [
    { icon: Book, color: 'text-kid-blue', delay: '0s' },
    { icon: Calculator, color: 'text-kid-green', delay: '2s' },
    { icon: Globe2, color: 'text-kid-yellow', delay: '1s' },
    { icon: Atom, color: 'text-kid-purple', delay: '3s' },
    { icon: Music, color: 'text-kid-pink', delay: '2.5s' },
    { icon: Palette, color: 'text-kid-orange', delay: '1.5s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {symbols.map((Symbol, index) => (
        <div
          key={index}
          className={`absolute ${Symbol.color} opacity-20 animate-float`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: Symbol.delay,
            transform: `scale(${1 + Math.random()})`,
          }}
        >
          <Symbol.icon size={32} />
        </div>
      ))}
    </div>
  );
};

export default FloatingSymbols;
