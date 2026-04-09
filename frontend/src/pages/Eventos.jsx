import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, List as ListIcon, Clock, MapPin, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Eventos() {
  const { config } = useSiteConfig();
  const [view, setView] = useState('lista');
  const [searchTerm, setSearchTerm] = useState('');
  const eventos = config.home.eventos || [];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredEventos = eventos.filter(e => 
    e.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.local.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch(view) {
      case 'mes':
        return (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-sacred-blue/10 animate-fade-in">
             <div className="flex justify-between items-center mb-10 border-b border-sacred-blue/10 pb-6">
                <h3 className="font-headline text-2xl uppercase tracking-[0.2em] text-sacred-dark">Setembro 2026</h3>
                <div className="flex gap-4">
                  <button className="p-2 hover:bg-sacred-gold/10 rounded-full transition-colors"><ChevronLeft size={20}/></button>
                  <button className="p-2 hover:bg-sacred-gold/10 rounded-full transition-colors"><ChevronRight size={20}/></button>
                </div>
             </div>
             <div className="grid grid-cols-7 gap-px bg-sacred-blue/10 rounded-xl overflow-hidden border border-sacred-blue/10">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                  <div key={d} className="bg-sacred-creme p-4 text-center text-[10px] uppercase font-bold tracking-[0.2em] text-sacred-dark/50">{d}</div>
                ))}
                {Array.from({length: 30}).map((_, i) => (
                  <div key={i} className="bg-white h-32 p-4 border-t border-sacred-blue/5 hover:bg-sacred-creme/50 transition-colors group relative cursor-pointer">
                    <span className="text-xs font-bold text-sacred-dark/30 group-hover:text-sacred-gold transition-colors">{i+1}</span>
                    {(i === 14 || i === 19) && (
                      <div className="mt-2 text-[9px] bg-sacred-gold/10 text-sacred-gold p-1 font-bold rounded truncate border border-sacred-gold/20">
                        {i === 14 ? 'Missa Solene' : 'Encontro de Jovens'}
                      </div>
                    )}
                  </div>
                ))}
             </div>
          </div>
        );
      case 'dia': {
        const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
        return (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center py-12 border-y border-sacred-blue/10">
              <span className="text-sacred-gold font-bold uppercase tracking-widest text-[10px] block mb-2">Hoje</span>
              <h3 className="font-headline text-3xl uppercase tracking-widest text-sacred-dark">{hoje}</h3>
            </div>
            {filteredEventos.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEventos.slice(0, 1).map(evento => (
                    <div key={evento.id} className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-sacred-blue/10 group cursor-pointer hover:-translate-y-2 transition-all duration-300">
                      <div className="h-56 relative overflow-hidden">
                        <img src={evento.imagem} alt={evento.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-4 left-4 bg-sacred-dark/80 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 uppercase tracking-widest rounded-full">{evento.tipo}</div>
                      </div>
                      <div className="p-8 space-y-4">
                        <div className="flex items-center gap-2 text-sacred-gold font-bold text-xs uppercase tracking-widest">
                          <Clock size={14}/> {evento.horario}
                        </div>
                        <h4 className="font-headline text-2xl uppercase text-sacred-dark leading-tight line-clamp-2">{evento.titulo}</h4>
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-light">
                          <MapPin size={14}/> {evento.local}
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            ) : (
                <div className="text-center py-20 text-gray-400 font-light italic">Nenhum evento agendado para hoje.</div>
            )}
          </div>
        );
      }
      default:
        return (
          <div className="space-y-10 animate-fade-in">
            {filteredEventos.map((evento) => (
              <div key={evento.id} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl md:flex items-center gap-12 border border-sacred-blue/5 hover:border-sacred-gold/30 transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sacred-gold/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-sacred-gold/10 transition-all"></div>
                <div className="flex-shrink-0 text-center md:text-left border-b md:border-b-0 md:border-r border-sacred-blue/10 md:pr-12 pb-6 md:pb-0 relative">
                   <div className="text-sacred-gold text-sm font-bold uppercase tracking-widest mb-1">{evento.dia.split(' ')[0]}</div>
                   <div className="font-headline text-6xl text-sacred-dark leading-none">{evento.dia.split(' ')[1]}</div>
                   <div className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.3em] mt-2 bg-sacred-creme py-1 px-3 rounded-full inline-block">{evento.tipo}</div>
                </div>
                
                <div className="flex-grow py-6 md:py-0 relative">
                  <h4 className="font-headline text-3xl md:text-4xl uppercase text-sacred-dark mb-4 group-hover:text-sacred-gold transition-colors">{evento.titulo}</h4>
                  <div className="flex flex-wrap gap-6 items-center">
                    <div className="flex items-center gap-2 text-sacred-gray text-xs font-bold uppercase tracking-wider">
                      <Clock size={16} className="text-sacred-gold"/> {evento.horario}
                    </div>
                    <div className="flex items-center gap-2 text-sacred-gray text-xs font-light">
                      <MapPin size={16} className="text-sacred-gold"/> {evento.local}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 relative">
                   <button className="px-8 py-4 bg-sacred-dark text-white hover:bg-sacred-gold transition-all text-[10px] font-bold uppercase tracking-widest rounded-xl flex items-center gap-3 group">
                     Ver Detalhes <ChevronRight size={14}/>
                   </button>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-sacred-creme text-sacred-dark pb-32 overflow-hidden">
      <section className="bg-white border-b border-sacred-blue/10 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
           <div className="relative w-full lg:w-96 group">
             <input 
               type="text" 
               placeholder="Pesquisar eventos..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-sacred-creme p-4 pr-12 rounded-2xl text-sm font-light focus:outline-none focus:ring-2 focus:ring-sacred-gold/30 border border-transparent group-hover:border-sacred-gold/20 transition-all"
             />
             <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
           </div>

           <div className="flex bg-sacred-creme p-2 rounded-2xl border border-sacred-blue/5">
             {[
               {id: 'lista', label: 'Lista', icon: ListIcon},
               {id: 'mes', label: 'Mês', icon: CalendarIcon},
               {id: 'dia', label: 'Dia', icon: Clock}
             ].map(tab => (
               <button
                 key={tab.id}
                 onClick={() => setView(tab.id)}
                 className={`flex items-center gap-3 px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-xl ${view === tab.id ? 'bg-white text-sacred-gold shadow-lg' : 'text-gray-400 hover:text-sacred-dark'}`}
               >
                 <tab.icon size={16}/> {tab.label}
               </button>
             ))}
           </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mt-16">
        {renderContent()}
      </section>
    </div>
  );
}
