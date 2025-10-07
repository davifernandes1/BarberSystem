import React, { useState } from 'react';


export default function HorariosModal({
  mode = 'selection', 
  selectedDate,
  agendamentosDoDia,
  barbeiroSelecionado,
  onClose,
  onConfirmTime
}) {
  const [tempSelectedTime, setTempSelectedTime] = useState(null);

  if (!selectedDate) return null;


  const horariosFuncionamento = [];
  for (let i = 9; i < 21; i++) {
    horariosFuncionamento.push(`${i.toString().padStart(2, '0')}:00`);
    horariosFuncionamento.push(`${i.toString().padStart(2, '0')}:30`);
  }

  const handleConfirm = () => {
    if (tempSelectedTime && onConfirmTime) {
      onConfirmTime(tempSelectedTime);
    }
  };

  const renderSelectionMode = () => (
    <>
      <h3 className="text-2xl font-bold mb-4 text-gray-900">Horários para {selectedDate.toLocaleDateString('pt-BR')}</h3>
      <p className="text-gray-600 mb-6">Barbeiro: <span className="font-semibold">{barbeiroSelecionado.nome}</span></p>
      <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-2">
        {horariosFuncionamento.map(hora => {
          const agendado = agendamentosDoDia.some(ag =>
            new Date(ag.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) === hora &&
            ag.barbeiro === barbeiroSelecionado.nome
          );
          const isSelected = tempSelectedTime === hora;
          return (
            <button
              key={hora}
              onClick={() => !agendado && setTempSelectedTime(hora)}
              className={`p-2 rounded text-center text-sm transition-all duration-200 ${
                agendado ? 'bg-red-100 text-red-700 cursor-not-allowed line-through' : ''
              } ${
                !agendado && isSelected ? 'bg-amber-500 text-white ring-2 ring-amber-600' : ''
              } ${
                !agendado && !isSelected ? 'bg-green-100 text-green-700 hover:bg-green-200' : ''
              }`}
              disabled={agendado}
            >
              {hora}
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button onClick={onClose} className="w-full sm:w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition">Cancelar</button>
        <button onClick={handleConfirm} disabled={!tempSelectedTime} className="w-full sm:w-1/2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md transition disabled:bg-gray-400 disabled:cursor-not-allowed">Confirmar Horário</button>
      </div>
    </>
  );

  const renderViewMode = () => {
    const horariosOcupadosPorBarbeiro = {};
    agendamentosDoDia.forEach(ag => {
      const data = new Date(ag.dataHora);
      const horaMinuto = `${data.getHours().toString().padStart(2, '0')}:${data.getMinutes().toString().padStart(2, '0')}`;
      if (!horariosOcupadosPorBarbeiro[horaMinuto]) {
        horariosOcupadosPorBarbeiro[horaMinuto] = [];
      }
      horariosOcupadosPorBarbeiro[horaMinuto].push(ag.barbeiro);
    });

    return (
      <>
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Horários para {selectedDate.toLocaleDateString('pt-BR')}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-2">
          {horariosFuncionamento.map(hora => {
            const barbeirosOcupados = horariosOcupadosPorBarbeiro[hora] || [];
            const isTotalmenteOcupado = barbeirosOcupados.length >= 3;
            return (
              <div key={hora} className={`p-2 rounded text-center text-sm ${isTotalmenteOcupado ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                <span className="font-semibold">{hora}</span>
                {isTotalmenteOcupado ? (<p className="text-xs">Todos ocupados</p>) : (<p className="text-xs">{3 - barbeirosOcupados.length} barbeiro(s) livre(s)</p>)}
                {barbeirosOcupados.length > 0 && (<p className="text-xs text-red-500 mt-1">Ocupado por: {barbeirosOcupados.join(', ')}</p>)}
              </div>
            );
          })}
        </div>
        <button onClick={onClose} className="mt-6 w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md transition">Fechar</button>
      </>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        {mode === 'selection' ? renderSelectionMode() : renderViewMode()}
      </div>
    </div>
  );
}