import React from 'react';

// --- Ícones ---
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// --- Componente de Serviço ---
const ServiceCard = ({ image, title, description }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

export default function HomePage({ setPage }) {
    // --- Dados dos Serviços ---
    const services = [
        {
            image: "https://images.unsplash.com/photo-1599335615245-5d91437e78d8?q=80&w=1887&auto=format&fit=crop",
            title: "Corte Moderno",
            description: "Estilos atuais e personalizados para o seu visual."
        },
        {
            image: "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=1770&auto=format&fit=crop",
            title: "Barba Terapia",
            description: "Cuidado completo com toalha quente e produtos especiais."
        },
        {
            image: "https://plus.unsplash.com/premium_photo-1661386019579-a47a11b1548e?q=80&w=1770&auto=format&fit=crop",
            title: "Tratamento Capilar",
            description: "Hidratação e fortalecimento para seus cabelos."
        }
    ];

  return (
    <div>
      {/* --- Seção Hero --- */}
      <section className="text-center py-20 bg-white rounded-lg shadow-md">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Bem-vindo à Barbearia VIP</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Seu estilo, nossa paixão. Oferecemos cortes de cabelo e barba com a máxima precisão e qualidade. Agende seu horário e viva uma experiência única.
        </p>
        <button 
          onClick={() => setPage('agendamento')}
          className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-600 transition-all transform hover:scale-105 flex items-center mx-auto"
        >
          <CalendarIcon />
          Agendar meu Horário
        </button>
      </section>

      {/* --- Seção de Serviços --- */}
      <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map(service => (
                  <ServiceCard key={service.title} {...service} />
              ))}
          </div>
      </section>
    </div>
  );
}