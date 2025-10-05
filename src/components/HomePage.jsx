import React from 'react';

// --- ÍCONES SVG ---
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ScissorsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 8l12 12M6 18L18 6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14a2 2 0 100-4 2 2 0 000 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
);

// Componente: HomePage (Página Inicial)
// Esta é a página de apresentação da barbearia.
export default function HomePage({ setPage }) {
  return (
    <div className="text-center p-8 flex flex-col items-center justify-center h-full">
        <ScissorsIcon />
      <h2 className="text-4xl font-bold text-white mt-4 mb-2">Bem-vindo à Barbearia VIP</h2>
      <p className="text-gray-300 mb-6 max-w-lg">
        Seu estilo, nossa paixão. Oferecemos cortes de cabelo e barba com a máxima precisão e qualidade. Agende seu horário e viva uma experiência única.
      </p>
      <button 
        onClick={() => setPage('agendamento')}
        className="bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 flex items-center"
      >
        <CalendarIcon />
        Agendar meu Horário
      </button>
    </div>
  );
}
