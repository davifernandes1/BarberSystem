import React, { useState } from 'react';

// --- Componente Modal para Visualizar Horários ---
const HorariosModal = ({ dia, agendamentosDoDia, onClose }) => {
    const horariosDisponiveis = [];
    for (let i = 9; i < 21; i++) {
        horariosDisponiveis.push(`${i.toString().padStart(2, '0')}:00`);
        horariosDisponiveis.push(`${i.toString().padStart(2, '0')}:30`);
    }
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
        // ▼▼▼ ALTERAÇÃO AQUI: Fundo transparente com desfoque ▼▼▼
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20" onClick={onClose}>
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Horários para {dia.toLocaleDateString('pt-BR')}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-2">
                    {horariosDisponiveis.map(hora => {
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
            </div>
        </div>
    );
};

export default function CalendarioPage({ agendamentos }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDayModal, setSelectedDayModal] = useState(null);
    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const totalDays = endOfMonth.getDate();
    const agendamentosPorDia = {};
    agendamentos.forEach(ag => {
        const data = new Date(ag.dataHora);
        const diaKey = new Date(data.getFullYear(), data.getMonth(), data.getDate()).toISOString().split('T')[0];
        if (!agendamentosPorDia[diaKey]) { agendamentosPorDia[diaKey] = []; }
        agendamentosPorDia[diaKey].push(ag);
    });
    const changeMonth = (offset) => { setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)); };
    const handleDayClick = (day) => {
        const diaCompleto = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDayModal(diaCompleto);
    };

    const renderCells = () => {
        const cells = [];
        const hoje = new Date();
        hoje.setHours(0,0,0,0);
        for (let i = 0; i < startDay; i++) { cells.push(<div key={`empty-${i}`} className="border rounded-md p-2 h-32 bg-gray-50 border-gray-200"></div>); }
        for (let day = 1; day <= totalDays; day++) {
            const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            currentDayDate.setHours(0,0,0,0);
            const diaCompletoKey = currentDayDate.toISOString().split('T')[0];
            const agendamentosDoDia = agendamentosPorDia[diaCompletoKey] || [];
            const isHoje = currentDayDate.getTime() === hoje.getTime();
            const isDomingo = currentDayDate.getDay() === 0;
            cells.push(
                <div key={day} className={`border rounded-md p-2 h-32 flex flex-col transition-all 
                                          ${isDomingo ? 'bg-red-50 text-red-500 cursor-not-allowed' : 'bg-white text-gray-800 cursor-pointer hover:shadow-lg hover:border-amber-500'}
                                          ${isHoje ? 'border-2 border-blue-500 bg-transparent' : ''}`}
                    onClick={() => !isDomingo && handleDayClick(day)}>
                    <span className={`font-bold ${isHoje ? 'text-blue-600' : 'text-gray-800'} ${isDomingo ? 'text-red-600' : ''}`}>{day}</span>
                    <div className="flex-grow overflow-y-auto mt-1 text-xs space-y-1">
                        {agendamentosDoDia.map(ag => (
                            <div key={ag.id} className="bg-gray-200 p-1 rounded">
                                <p className="font-semibold text-gray-800 truncate">{new Date(ag.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - {ag.barbeiro}</p>
                            </div>
                        ))}
                    </div>
                    {isDomingo && <p className="text-xs font-semibold mt-auto text-center">Fechado</p>}
                    {!isDomingo && agendamentosDoDia.length > 0 && (<p className="text-xs text-amber-700 font-semibold mt-1">{agendamentosDoDia.length} agendamento(s)</p>)}
                </div>
            );
        }
        return cells;
    };

    return (
        <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
            {selectedDayModal && (<HorariosModal dia={selectedDayModal} agendamentosDoDia={agendamentos.filter(ag => new Date(ag.dataHora).toDateString() === selectedDayModal.toDateString())} onClose={() => setSelectedDayModal(null)} />)}
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => changeMonth(-1)} className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
                <h2 className="text-2xl font-bold text-gray-800 capitalize">{currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={() => changeMonth(1)} className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-500 mb-2">{diasDaSemana.map(dia => <div key={dia}>{dia}</div>)}</div>
            <div className="grid grid-cols-7 gap-2">{renderCells()}</div>
        </div>
    );
}