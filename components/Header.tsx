
import React from 'react';
import { BrainCircuitIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 border-b border-slate-200">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-center gap-3">
        <BrainCircuitIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
          AI Business Advisor
        </h1>
      </div>
    </header>
  );
};
