import React, { useState } from 'react';

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);



export default function HorariosModal({
  mode = 'selection',
  selectedDate,
  agendamentosDoDia,
  barbeiroSelecionado,
  onClose,
  onConfirmTime,
  removerAgendamento
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
    const agendamentosOrdenados = [...agendamentosDoDia].sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));

    return (
      <>
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Agendamentos para {selectedDate.toLocaleDateString('pt-BR')}</h3>
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {agendamentosOrdenados.length > 0 ? (
            agendamentosOrdenados.map(ag => (
              <div key={ag.id} className="bg-gray-100 p-3 rounded-md flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-800">
                    {new Date(ag.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - {ag.nome}
                  </p>
                  <p className="text-sm text-gray-600">{ag.tipoCorte} - {ag.barbeiro} (R$ {ag.preco})</p>
                </div>
                <button 
                  onClick={() => removerAgendamento(ag.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                  title="Cancelar Agendamento"
                >
                  <TrashIcon />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">Nenhum agendamento para este dia.</p>
          )}
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