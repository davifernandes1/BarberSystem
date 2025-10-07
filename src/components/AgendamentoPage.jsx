import React, { useState } from 'react';

// --- Constantes e Componentes (sem alterações) ---
const tiposDeCorte = { 'Corte Simples': '35.00', 'Corte + Barba': '60.00', 'Barba Terapia': '30.00', 'Sobrancelha': '15.00', 'Platinado': '150.00' , 'Combo Pai e Filho': '70.00', 'Corte Infantil': '40.00' };
const barbeirosData = [
    { id: 'jefferson', nome: 'Jefferson', foto: 'https://i.pinimg.com/1200x/10/8b/ce/108bce49f7a5be3e2e764df0429e8f42.jpg' },
    { id: 'gerson', nome: 'Gerson', foto: 'https://i.pinimg.com/736x/7b/12/f3/7b12f388e180c61049a1ce77a95541ff.jpg' },
    { id: 'cleiton', nome: 'Cleiton', foto: 'https://i.pinimg.com/736x/3a/5e/bc/3a5ebce992678e5020998b5a5b44290c.jpg' },
];

const HorariosModal = ({ selectedDate, agendamentosDoDia, barbeiroSelecionado, onClose, onConfirmTime }) => {
    const [tempSelectedTime, setTempSelectedTime] = useState(null);
    if (!selectedDate || !barbeiroSelecionado) return null;
    const horariosFuncionamento = [];
    for (let i = 9; i < 21; i++) {
        horariosFuncionamento.push(`${i.toString().padStart(2, '0')}:00`);
        horariosFuncionamento.push(`${i.toString().padStart(2, '0')}:30`);
    }
    const handleConfirm = () => { if (tempSelectedTime) { onConfirmTime(tempSelectedTime); } };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20" onClick={onClose}>
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Horários para {selectedDate.toLocaleDateString('pt-BR')}</h3>
                <p className="text-gray-600 mb-6">Barbeiro: <span className="font-semibold">{barbeiroSelecionado.nome}</span></p>
                <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-2">
                    {horariosFuncionamento.map(hora => {
                        const agendado = agendamentosDoDia.some(ag => new Date(ag.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) === hora && ag.barbeiro === barbeiroSelecionado.nome);
                        const isSelected = tempSelectedTime === hora;
                        return (<button key={hora} onClick={() => !agendado && setTempSelectedTime(hora)} className={`p-2 rounded text-center text-sm transition-all duration-200 ${agendado ? 'bg-red-100 text-red-700 cursor-not-allowed line-through' : ''} ${!agendado && isSelected ? 'bg-amber-500 text-white ring-2 ring-amber-600' : ''} ${!agendado && !isSelected ? 'bg-green-100 text-green-700 hover:bg-green-200' : ''}`} disabled={agendado}>{hora}</button>);
                    })}
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button onClick={onClose} className="w-full sm:w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition">Cancelar</button>
                    <button onClick={handleConfirm} disabled={!tempSelectedTime} className="w-full sm:w-1/2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md transition disabled:bg-gray-400 disabled:cursor-not-allowed">Confirmar Horário</button>
                </div>
            </div>
        </div>
    );
};

const BarberSelector = ({ barbeiros, selectedBarber, onSelectBarber }) => (
    <div className="flex flex-wrap justify-center gap-4 mb-6">
        {barbeiros.map((barber) => (
            <div key={barber.id} className={`flex flex-col items-center cursor-pointer p-2 rounded-lg transition-all border-2 ${selectedBarber && selectedBarber.id === barber.id ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300' : 'border-transparent hover:bg-gray-50'}`} onClick={() => onSelectBarber(barber)}>
                <img src={barber.foto} alt={barber.nome} className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 hover:border-amber-500 transition-colors" />
                <span className="mt-2 text-sm font-medium text-gray-700">{barber.nome}</span>
            </div>
        ))}
    </div>
);

export default function AgendamentoPage({ onAgendamentoSubmit, agendamentos }) {
    const [nome, setNome] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [tipoCorte, setTipoCorte] = useState('Corte Simples');
    const [selectedBarber, setSelectedBarber] = useState(null);
    const [erro, setErro] = useState('');
    const [showTimeModal, setShowTimeModal] = useState(false);
    const preco = tiposDeCorte[tipoCorte];
    const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const startOfMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1);
    const endOfMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const totalDays = endOfMonth.getDate();
    const changeMonth = (offset) => { setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + offset, 1)); };
    const handleDayClick = (day) => {
        const clickedDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), day);
        if (clickedDate.getDay() === 0) { setErro("Não agendamos aos domingos."); return; }
        setErro(''); setSelectedDate(clickedDate); setSelectedTime('');
        if (selectedBarber) { setShowTimeModal(true); } else { setErro("Por favor, selecione um barbeiro antes de escolher a data."); }
    };
    const handleConfirmTime = (time) => { setSelectedTime(time); setShowTimeModal(false); };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome || !selectedDate || !selectedTime || !selectedBarber) { setErro('Por favor, preencha todos os campos obrigatórios.'); return; }
        const [hora, minuto] = selectedTime.split(':');
        const dataHoraAgendamento = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), parseInt(hora), parseInt(minuto));
        onAgendamentoSubmit({ id: Date.now(), nome, dataHora: dataHoraAgendamento.toISOString(), tipoCorte, preco, barbeiro: selectedBarber.nome });
        setNome(''); setSelectedDate(null); setSelectedTime(''); setTipoCorte('Corte Simples'); setSelectedBarber(null);
    };

    const renderCalendarCells = () => {
        const cells = [];
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        for (let i = 0; i < startDay; i++) { cells.push(<div key={`empty-${i}`} className="border rounded-md p-2 h-24 bg-gray-50 border-gray-200"></div>); }
        for (let day = 1; day <= totalDays; day++) {
            const currentDayDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), day);
            currentDayDate.setHours(0, 0, 0, 0);
            const isDomingo = currentDayDate.getDay() === 0;
            const isPassado = currentDayDate < hoje;
            const isHoje = currentDayDate.getTime() === hoje.getTime();
            const isSelected = selectedDate && selectedDate.toDateString() === currentDayDate.toDateString();
            cells.push(
                <div key={day} className={`border rounded-md p-2 h-24 flex flex-col items-center justify-center 
                                          ${isDomingo || isPassado ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-800 cursor-pointer hover:shadow-md hover:border-amber-500'}
                                          ${isHoje ? 'border-2 border-blue-500 bg-transparent' : ''}
                                          ${isSelected ? '!border-amber-500 !bg-amber-100 ring-2 ring-amber-300' : ''}
                                          transition-all duration-200`}
                    onClick={() => (!isDomingo && !isPassado) && handleDayClick(day)}>
                    <span className={`font-bold text-lg ${isDomingo || isPassado ? 'text-gray-400' : ''} ${isHoje ? 'text-blue-600' : ''} ${isSelected ? 'text-amber-700' : ''}`}>{day}</span>
                    {!isDomingo && !isPassado && <span className="text-xs text-gray-500 mt-1">{diasDaSemana[currentDayDate.getDay()]}</span>}
                </div>
            );
        }
        return cells;
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Faça seu Agendamento</h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
                {erro && <p className="text-red-600 bg-red-100 p-3 rounded-md text-center">{erro}</p>}
                <div><label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">1. Nome do Cliente</label><input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-amber-500" placeholder="Seu nome completo" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-3">2. Escolha o Barbeiro</label><BarberSelector barbeiros={barbeirosData} selectedBarber={selectedBarber} onSelectBarber={setSelectedBarber} /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-3">3. Selecione a Data e Horário</label><div className="bg-white rounded-lg shadow-inner p-4 border border-gray-200"><div className="flex justify-between items-center mb-4"><button type="button" onClick={() => changeMonth(-1)} className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button><h3 className="text-lg font-bold text-gray-800 capitalize">{currentMonthDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</h3><button type="button" onClick={() => changeMonth(1)} className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button></div><div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500 mb-2">{diasDaSemana.map(dia => <div key={dia}>{dia}</div>)}</div><div className="grid grid-cols-7 gap-1">{renderCalendarCells()}</div></div>{selectedDate && selectedTime && (<p className="mt-4 text-center text-md text-gray-700">Horário Selecionado: <span className="font-semibold text-amber-700">{selectedDate.toLocaleDateString('pt-BR')} às {selectedTime}</span></p>)}{showTimeModal && (<HorariosModal selectedDate={selectedDate} agendamentosDoDia={agendamentos.filter(ag => new Date(ag.dataHora).toDateString() === selectedDate.toDateString())} barbeiroSelecionado={selectedBarber} onClose={() => setShowTimeModal(false)} onConfirmTime={handleConfirmTime} />)}</div>
                <div><label htmlFor="tipoCorte" className="block text-sm font-medium text-gray-700 mb-1">4. Tipo de Serviço</label><select id="tipoCorte" value={tipoCorte} onChange={(e) => setTipoCorte(e.target.value)} className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-amber-500">{Object.keys(tiposDeCorte).map(corte => (<option key={corte} value={corte}>{corte}</option>))}</select></div>
                <div className="text-center pt-4"><p className="text-xl text-gray-800">Preço: <span className="font-bold text-green-600">R$ {preco}</span></p></div>
                <button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-md transition-transform transform hover:scale-105 disabled:bg-gray-400" disabled={!selectedDate || !selectedTime || !selectedBarber || !nome}>Confirmar Agendamento</button>
            </form>
        </div>
    );
}