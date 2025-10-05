import React, { useState, useEffect } from 'react';

// --- Constantes e Funções de Utilidade ---
const tiposDeCorte = {
  'Corte Simples': '35.00',
  'Corte + Barba': '60.00',
  'Barba Terapia': '30.00',
  'Sobrancelha': '15.00',
  'Platinado': '150.00'
};

const barbeiros = ['Carlos', 'João', 'Pedro'];

export default function AgendamentoPage({ onAgendamentoSubmit, agendamentos }) {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [tipoCorte, setTipoCorte] = useState('Corte Simples');
  const [barbeiro, setBarbeiro] = useState(barbeiros[0]);
  const [observacoes, setObservacoes] = useState('');
  const [erro, setErro] = useState('');

  const preco = tiposDeCorte[tipoCorte];

  const getMinDate = () => {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !data || !hora || !barbeiro) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // --- Validação de Conflito de Horário ---
    const dataHoraSelecionada = new Date(`${data}T${hora}`);
    const conflito = agendamentos.some(ag => 
        new Date(ag.dataHora).getTime() === dataHoraSelecionada.getTime() && ag.barbeiro === barbeiro
    );

    if (conflito) {
        setErro(`O barbeiro ${barbeiro} já tem um horário agendado para ${data} às ${hora}.`);
        return;
    }

    setErro('');
    onAgendamentoSubmit({
      id: Date.now(),
      nome,
      dataHora: dataHoraSelecionada.toISOString(),
      tipoCorte,
      preco,
      barbeiro,
      observacoes
    });
    
    // Limpa o formulário
    setNome('');
    setData('');
    setHora('');
    setTipoCorte('Corte Simples');
    setBarbeiro(barbeiros[0]);
    setObservacoes('');
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Faça seu Agendamento</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        {erro && <p className="text-red-600 bg-red-100 p-3 rounded-md text-center">{erro}</p>}
        
        {/* Campos do formulário */}
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome do Cliente</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Seu nome completo"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input
              type="date"
              id="data"
              value={data}
              min={getMinDate()}
              onChange={(e) => {
                  const dia = new Date(e.target.value).getUTCDay();
                  if (dia === 0) { // 0 = Domingo
                      setErro("Não agendamos aos domingos. Por favor, escolha outro dia.");
                      setData('');
                  } else {
                      setErro('');
                      setData(e.target.value);
                  }
              }}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label htmlFor="hora" className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
            <input
              type="time"
              id="hora"
              value={hora}
              min="09:00"
              max="21:00"
              step="1800" // 30 em 30 minutos
              onChange={(e) => setHora(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="tipoCorte" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Serviço</label>
                <select
                    id="tipoCorte"
                    value={tipoCorte}
                    onChange={(e) => setTipoCorte(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-amber-500"
                >
                    {Object.keys(tiposDeCorte).map(corte => (
                    <option key={corte} value={corte}>{corte}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="barbeiro" className="block text-sm font-medium text-gray-700 mb-1">Escolha o Barbeiro</label>
                <select
                    id="barbeiro"
                    value={barbeiro}
                    onChange={(e) => setBarbeiro(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-amber-500"
                >
                    {barbeiros.map(b => (
                    <option key={b} value={b}>{b}</option>
                    ))}
                </select>
            </div>
        </div>

        <div>
          <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">Observações (Opcional)</label>
          <textarea
            id="observacoes"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows="3"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-amber-500"
            placeholder="Ex: Alergia a algum produto, preferência de máquina, etc."
          ></textarea>
        </div>

        <div className="text-center pt-4">
          <p className="text-xl text-gray-800">Preço: <span className="font-bold text-green-600">R$ {preco}</span></p>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-md transition-transform transform hover:scale-105"
        >
          Confirmar Agendamento
        </button>
      </form>
    </div>
  );
}