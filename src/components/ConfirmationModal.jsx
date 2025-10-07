import React from 'react';

export default function ConfirmationModal({ onClose }) {
  const CheckIcon = () => (
    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full mx-4">
        <CheckIcon />
        <h3 className="text-2xl font-bold mb-2 text-gray-900">Agendamento Confirmado!</h3>
        <p className="text-gray-600 mb-6">Seu horário foi reservado com sucesso.</p>
        <button
          onClick={onClose}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-md transition-transform transform hover:scale-105"
        >
          Ver meus agendamentos
        </button>
      </div>
    </div>
  );
}