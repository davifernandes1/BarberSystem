import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import HomePage from './components/HomePage.jsx';
import AgendamentoPage from './components/AgendamentoPage.jsx';
import CalendarioPage from './components/CalendarioPage.jsx';

// --- COMPONENTE PRINCIPAL (App) ---
// Gerencia o estado geral da aplicação, como a página atual e a lista de agendamentos.
export default function App() {
  // Estado para controlar a página visível ('home', 'agendamento', 'calendario')
  const [page, setPage] = useState('home');
  
  // Estado para armazenar a lista de agendamentos, buscando do localStorage
  const [agendamentos, setAgendamentos] = useState(() => {
    const agendamentosSalvos = localStorage.getItem('agendamentos');
    return agendamentosSalvos ? JSON.parse(agendamentosSalvos) : [];
  });

  // Efeito para salvar os agendamentos no localStorage sempre que a lista for alterada
  useEffect(() => {
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
  }, [agendamentos]);

  // Função para adicionar um novo agendamento à lista
  const handleAgendamentoSubmit = (novoAgendamento) => {
    setAgendamentos([...agendamentos, novoAgendamento]);
    alert('Agendamento realizado com sucesso!');
    setPage('calendario'); // Muda para a página de calendário após o agendamento
  };
  
  // Função para remover um agendamento (opcional, não implementado na UI)
  const removerAgendamento = (id) => {
    setAgendamentos(agendamentos.filter(ag => ag.id !== id));
  }

  // Renderização condicional da página com base no estado 'page'
  const renderPage = () => {
    switch (page) {
      case 'agendamento':
        return <AgendamentoPage onAgendamentoSubmit={handleAgendamentoSubmit} />;
      case 'calendario':
        return <CalendarioPage agendamentos={agendamentos} removerAgendamento={removerAgendamento} />;
      case 'home':
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <Header setPage={setPage} />
      <main className="container mx-auto p-4">
        {renderPage()}
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Barbearia VIP &copy; 2025 - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

