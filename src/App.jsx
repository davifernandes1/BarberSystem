import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import HomePage from './components/HomePage.jsx';
import AgendamentoPage from './components/AgendamentoPage.jsx';
import CalendarioPage from './components/CalendarioPage.jsx';

export default function App() {
  const [page, setPage] = useState('home');
  const [agendamentos, setAgendamentos] = useState(() => {
    const agendamentosSalvos = localStorage.getItem('agendamentos');
    return agendamentosSalvos ? JSON.parse(agendamentosSalvos) : [];
  });

  useEffect(() => {
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
  }, [agendamentos]);

  const handleAgendamentoSubmit = (novoAgendamento) => {
    setAgendamentos([...agendamentos, novoAgendamento]);
    alert('Agendamento realizado com sucesso!');
    setPage('calendario');
  };

  const removerAgendamento = (id) => {
    setAgendamentos(agendamentos.filter(ag => ag.id !== id));
  };

  const renderPage = () => {
    switch (page) {
      case 'agendamento':
        return <AgendamentoPage onAgendamentoSubmit={handleAgendamentoSubmit} agendamentos={agendamentos} />;
      case 'calendario':
        return <CalendarioPage agendamentos={agendamentos} removerAgendamento={removerAgendamento} />;
      case 'home':
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 font-sans">
      <Header setPage={setPage} />
      <main className="container mx-auto p-4 md:p-8">
        {renderPage()}
      </main>
      <footer className="text-center p-6 text-gray-500 border-t border-gray-200 mt-8">
        <p>Barbearia VIP &copy; 2025 - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}