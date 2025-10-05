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
  // Componente interno para os botões de navegação
  const NavButton = ({ children, onClick }) => (
    <button 
      onClick={onClick} 
      className="relative font-medium text-gray-700 hover:text-gray-900 py-2 px-3 transition-colors group"
    >
      {children}
      {/* Linha animada que aparece ao passar o mouse */}
      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
    </button>
  );

  return (
    <header className="bg-white text-gray-800 p-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setPage('home')}
        >
          <LogoIcon />
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Barbearia VIP</h1>
        </div>
        <nav className="flex items-center gap-2 md:gap-4">
          <NavButton onClick={() => setPage('home')}>Home</NavButton>
          <NavButton onClick={() => setPage('agendamento')}>Agendar</NavButton>
          <NavButton onClick={() => setPage('calendario')}>Calendário</NavButton>
        </nav>
      </div>
    </header>
  );
}