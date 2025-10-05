import React, { useState, useEffect } from 'react';

// --- Componente: AgendamentoPage (Formulário de Agendamento) ---
// Contém o formulário para criar um novo agendamento.
export default function AgendamentoPage({ onAgendamentoSubmit }) {
  const [nome, setNome] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [tipoCorte, setTipoCorte] = useState('Corte Simples');
  const [preco, setPreco] = useState('35.00');
  const [erro, setErro] = useState('');

  const tiposDeCorte = {
    'Corte Simples': '35.00',
    'Corte + Barba': '60.00',
    'Barba Terapia': '30.00',
    'Sobrancelha': '15.00',
    'Platinado': '150.00'
  };

  // Efeito para atualizar o preço sempre que o tipo de corte mudar
  useEffect(() => {
    setPreco(tiposDeCorte[tipoCorte]);
  }, [tipoCorte, tiposDeCorte]); // Corrigido: Adicionada a dependência 'tiposDeCorte'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !dataHora) {
      setErro('Por favor, preencha o nome e a data/horário.');
      return;
    }
    setErro('');
    onAgendamentoSubmit({
      id: Date.now(),
      nome,
      dataHora,
      tipoCorte,
      preco,
    });
    // Limpa o formulário após o envio
    setNome('');
    setDataHora('');
    setTipoCorte('Corte Simples');
    setPreco('35.00');
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Faça seu Agendamento</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-2xl space-y-6">
        {erro && <p className="text-red-400 bg-red-900/50 p-3 rounded-md text-center">{erro}</p>}
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">Nome do Cliente</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Seu nome completo"
          />
        </div>
        <div>
          <label htmlFor="dataHora" className="block text-sm font-medium text-gray-300 mb-2">Data e Hora</label>
          <input
            type="datetime-local"
            id="dataHora"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none"
          />
        </div>
        <div>
          <label htmlFor="tipoCorte" className="block text-sm font-medium text-gray-300 mb-2">Tipo de Serviço</label>
          <select
            id="tipoCorte"
            value={tipoCorte}
            onChange={(e) => setTipoCorte(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {Object.keys(tiposDeCorte).map(corte => (
              <option key={corte} value={corte}>{corte}</option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <p className="text-lg text-gray-300">Preço: <span className="font-bold text-green-400">R$ {preco}</span></p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-transform transform hover:scale-105"
        >
          Agendar Horário
        </button>
      </form>
    </div>
  );
}

