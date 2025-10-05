import React, { useState } from 'react';

// --- Componente Modal para Horários ---
const HorariosModal = ({ dia, agendamentosDoDia, onClose }) => {
    // Horários de funcionamento (9:00 - 21:00)
    const horariosDisponiveis = [];
    for (let i = 9; i <= 21; i++) {
        horariosDisponiveis.push(`${i.toString().padStart(2, '0')}:00`);
        if (i < 21) {
            horariosDisponiveis.push(`${i.toString().padStart(2, '0')}:30`);
        }
    }

    const horariosOcupados = agendamentosDoDia.map(ag => {
        const data = new Date(ag.dataHora);
        return `${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`;
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20" onClick={onClose}>
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Horários para {dia.toLocaleDateString('pt-BR')}</h3>
                <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto">
                    {horariosDisponiveis.map(hora => {
                        const isOcupado = horariosOcupados.includes(hora);
                        return (
                            <div key={hora} className={`p-2 rounded text-center text-sm ${isOcupado ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                                {hora} {isOcupado ? '(Ocupado)' : '(Livre)'}
                            </div>
                        );
                    })}
                </div>
                <button onClick={onClose} className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md">Fechar</button>
            </div>
        </div>
    );
};


export default function CalendarioPage({ agendamentos }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const totalDays = endOfMonth.getDate();

  const agendamentosPorDia = {};
  agendamentos.forEach(ag => {
    const data = new Date(ag.dataHora);
    const diaKey = new Date(data.getFullYear(), data.getMonth(), data.getDate()).toISOString().split('T')[0];
    if (!agendamentosPorDia[diaKey]) {
      agendamentosPorDia[diaKey] = [];
    }
    agendamentosPorDia[diaKey].push(ag);
  });

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const handleDayClick = (day) => {
    const diaCompleto = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDay(diaCompleto);
  };
  
  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < startDay; i++) {
      cells.push(<div key={`empty-${i}`} className="border rounded-md p-2 h-32 bg-gray-50 border-gray-200"></div>);
    }
    for (let day = 1; day <= totalDays; day++) {
      const diaCompleto = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
      const agendamentosDoDia = agendamentosPorDia[diaCompleto] || [];
      const hoje = new Date();
      const isHoje = hoje.getDate() === day && hoje.getMonth() === currentDate.getMonth() && hoje.getFullYear() === currentDate.getFullYear();

      cells.push(
        <div 
          key={day} 
          className={`border rounded-md p-2 h-32 flex flex-col cursor-pointer transition-all ${isHoje ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-200'} hover:shadow-lg hover:border-amber-500`}
          onClick={() => handleDayClick(day)}
        >
          <span className={`font-bold ${isHoje ? 'text-blue-600' : 'text-gray-800'}`}>{day}</span>
          <div className="flex-grow overflow-y-auto mt-1 text-xs space-y-1">
            {agendamentosDoDia.map(ag => (
              <div key={ag.id} className="bg-gray-200 p-1 rounded">
                <p className="font-semibold text-gray-800">{new Date(ag.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                <p className="text-gray-600 truncate">{ag.nome}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      {selectedDay && (
          <HorariosModal
              dia={selectedDay}
              agendamentosDoDia={agendamentosPorDia[selectedDay.toISOString().split('T')[0]] || []}
              onClose={() => setSelectedDay(null)}
          />
      )}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => changeMonth(-1)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition">Anterior</button>
        <h2 className="text-2xl font-bold text-gray-800 capitalize">
          {currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => changeMonth(1)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition">Próximo</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-500 mb-2">
        {diasDaSemana.map(dia => <div key={dia}>{dia}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {renderCells()}
      </div>
    </div>
  );
}