import React, { useState } from 'react';

// --- Componente: CalendarioPage (Visualização de Agendamentos) ---
// Exibe os agendamentos em uma visualização de calendário mensal.
export default function CalendarioPage({ agendamentos }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const totalDays = endOfMonth.getDate();

  const agendamentosPorDia = {};
  agendamentos.forEach(ag => {
    const data = new Date(ag.dataHora);
    // Ajuste para fuso horário local para evitar problemas com UTC
    const dia = new Date(data.getFullYear(), data.getMonth(), data.getDate()).toISOString().split('T')[0];
    if (!agendamentosPorDia[dia]) {
      agendamentosPorDia[dia] = [];
    }
    agendamentosPorDia[dia].push(ag);
  });

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const renderCells = () => {
    const cells = [];
    // Preenche os dias vazios no início do mês
    for (let i = 0; i < startDay; i++) {
      cells.push(<div key={`empty-${i}`} className="border rounded-md p-2 h-32 bg-gray-800 border-gray-700"></div>);
    }
    // Preenche os dias do mês
    for (let day = 1; day <= totalDays; day++) {
      const diaCompleto = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
      const agendamentosDoDia = agendamentosPorDia[diaCompleto] || [];
      const hoje = new Date();
      const isHoje = hoje.getDate() === day && hoje.getMonth() === currentDate.getMonth() && hoje.getFullYear() === currentDate.getFullYear();

      cells.push(
        <div key={day} className={`border rounded-md p-2 h-32 flex flex-col ${isHoje ? 'bg-blue-900/50 border-blue-500' : 'bg-gray-800 border-gray-700'} transition`}>
          <span className={`font-bold ${isHoje ? 'text-blue-300' : 'text-white'}`}>{day}</span>
          <div className="flex-grow overflow-y-auto mt-1 text-xs space-y-1">
            {agendamentosDoDia.map(ag => (
              <div key={ag.id} className="bg-gray-700 p-1 rounded">
                <p className="font-semibold text-gray-200">{ag.nome}</p>
                <p className="text-gray-400">{ag.tipoCorte}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition">Anterior</button>
        <h2 className="text-2xl font-bold text-white">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => changeMonth(1)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition">Próximo</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-400 mb-2">
        {diasDaSemana.map(dia => <div key={dia}>{dia}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {renderCells()}
      </div>
    </div>
  );
}

