import React from 'react';

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
         
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Chill Barber</h1>
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