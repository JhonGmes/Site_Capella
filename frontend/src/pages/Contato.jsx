import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Contato() {
  const { config } = useSiteConfig();
  const ct = config.contato;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-white text-sacred-dark pb-32">
       {/* Hero Minimalista */}
       <div className="bg-sacred-creme py-32 text-center border-b border-sacred-blue/10">
          <div className="max-w-4xl mx-auto px-6">
             <span className="text-sacred-gold font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">Informações</span>
             <h1 className="font-headline text-5xl md:text-7xl uppercase tracking-widest text-sacred-dark">Contato &amp; Visita</h1>
          </div>
       </div>

       <section className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
             {/* Esquerda: Informações e Endereço */}
             <div className="space-y-12">
                <div className="space-y-6">
                   <h2 className="font-headline text-4xl uppercase tracking-widest text-sacred-dark border-b border-sacred-gold/30 pb-4">Onde Estamos</h2>
                   <p className="text-sacred-gray text-lg font-light leading-relaxed">
                      Sua presença é um presente para nós. Venha nos visitar e vivenciar a paz do Sagrado Coração.
                   </p>
                </div>

                <div className="bg-sacred-dark p-12 rounded-[4rem] text-white space-y-10 shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-sacred-gold/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-sacred-gold/20 transition-all"></div>
                   
                   <div className="space-y-8 relative z-10">
                      <div className="flex items-start gap-6">
                         <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-sacred-gold flex-shrink-0"><MapPin size={24}/></div>
                         <div>
                            <h4 className="font-bold text-xs uppercase tracking-widest text-sacred-gold mb-2">Endereço</h4>
                            <p className="text-lg font-light whitespace-pre-line">{ct.endereco}</p>
                         </div>
                      </div>

                      <div className="flex items-start gap-6">
                         <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-sacred-gold flex-shrink-0"><Phone size={24}/></div>
                         <div>
                            <h4 className="font-bold text-xs uppercase tracking-widest text-sacred-gold mb-2">Telefone</h4>
                            <p className="text-lg font-light">{ct.telefone}</p>
                         </div>
                      </div>

                      <div className="flex items-start gap-6">
                         <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-sacred-gold flex-shrink-0"><Mail size={24}/></div>
                         <div>
                            <h4 className="font-bold text-xs uppercase tracking-widest text-sacred-gold mb-2">E-mail</h4>
                            <p className="text-lg font-light">{ct.email}</p>
                         </div>
                      </div>
                   </div>

                   <a 
                     href={ct.googleMapsUrl} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="block w-full text-center py-6 bg-sacred-gold text-sacred-dark rounded-[2rem] font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl shadow-sacred-gold/10 flex items-center justify-center gap-3"
                   >
                      Abrir no Google Maps <ExternalLink size={16}/>
                   </a>
                </div>
             </div>

             {/* Direita: Horários */}
             <div className="space-y-16">
                <div className="bg-sacred-creme p-12 rounded-[4rem] border border-sacred-blue/10">
                   <h3 className="font-headline text-3xl uppercase tracking-widest text-sacred-dark flex items-center gap-4 mb-10 border-b border-sacred-gold/30 pb-4">
                      <Clock className="text-sacred-gold" size={28}/> Funcionamento
                   </h3>
                   <div className="space-y-6">
                      {ct.horarios.map(h => (
                        <div key={h.dia} className="flex flex-col md:flex-row justify-between border-b border-sacred-blue/5 pb-4 last:border-0">
                           <span className="font-bold text-sacred-dark uppercase text-[10px] tracking-widest mb-2 md:mb-0">{h.dia}</span>
                           <div className="flex flex-col gap-1 items-end">
                              <span className="text-sm font-light text-sacred-gray italic">Capela: <strong>{h.capela}</strong></span>
                              <span className="text-[11px] text-gray-400 font-light">Secretaria: {h.secretaria}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-sacred-creme p-12 rounded-[4rem] border border-sacred-blue/10">
                   <h3 className="font-headline text-3xl uppercase tracking-widest text-sacred-dark flex items-center gap-4 mb-10 border-b border-sacred-gold/30 pb-4">
                      <ExternalLink className="text-sacred-gold" size={28}/> Missas e Celebrações
                   </h3>
                   <div className="space-y-6">
                      {ct.missas.map(m => (
                        <div key={m.dia} className="flex justify-between border-b border-sacred-blue/5 pb-4 last:border-0">
                           <span className="font-bold text-sacred-dark uppercase text-[10px] tracking-widest">{m.dia}</span>
                           <div className="flex gap-2">
                              {m.horarios.map(h => (
                                <span key={h} className="px-3 py-1 bg-sacred-gold/10 text-sacred-gold rounded-full text-xs font-bold">{h}</span>
                              ))}
                           </div>
                        </div>
                      ))}
                   </div>
                   <p className="mt-8 text-[10px] text-gray-400 italic text-center uppercase tracking-widest leading-relaxed">
                      * Sujeito a alterações em feriados e dias santos. <br/>Consulte as notícias para atualizações.
                   </p>
                </div>
             </div>
          </div>
       </section>
    </div>
  );
}
