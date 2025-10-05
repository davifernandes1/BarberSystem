import React from 'react';

// Componente: Header (Navegação)
// Este componente cria o cabeçalho e os links de navegação.
export default function Header({ setPage }) {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-yellow-400">Barbearia VIP</h1>
        <nav>
          <button onClick={() => setPage('home')} className="mx-2 hover:text-yellow-400 transition-colors">Home</button>
          <button onClick={() => setPage('agendamento')} className="mx-2 hover:text-yellow-400 transition-colors">Agendar</button>
          <button onClick={() => setPage('calendario')} className="mx-2 hover:text-yellow-400 transition-colors">Calendário</button>
        </nav>
      </div>
    </header>
  );
}
