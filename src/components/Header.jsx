import React from 'react';

// --- Ícone de Logo (Tesoura) ---
const LogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 8l12 12M6 18L18 6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14a2 2 0 100-4 2 2 0 000 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
);


export default function Header({ setPage }) {
  return (
    <header className="bg-white text-gray-800 p-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setPage('home')}
        >
          <LogoIcon />
          <h1 className="text-xl md:text-2xl font-bold">Barbearia VIP</h1>
        </div>
        <nav className="flex items-center gap-4 md:gap-6">
          <button onClick={() => setPage('home')} className="font-medium hover:text-amber-600 transition-colors">Home</button>
          <button onClick={() => setPage('agendamento')} className="font-medium hover:text-amber-600 transition-colors">Agendar</button>
          <button onClick={() => setPage('calendario')} className="font-medium hover:text-amber-600 transition-colors">Calendário</button>
        </nav>
      </div>
    </header>
  );
}