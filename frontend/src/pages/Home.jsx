import { Link } from 'react-router-dom';
import { Clock, Navigation, CheckCircle2, Calendar, MapPin, HeartHandshake, Phone, Mail, ArrowRight, User } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Home() {
  const { config } = useSiteConfig();
  const hero = config.home.hero;
  const sobre = config.home.sobreSecao;
  const missas = config.home.missas;
  const eventos = config.home.eventos;
  const galeria = config.home.galeria;
  const doacoesCTA = config.home.doacoesCTA;
  const construcao = config.home.construcao;
  const contatoSecao = config.home.contatoSecao;

  // Parse hero title for <span> highlights
  const renderTitle = (text) => {
    const parts = text.split(/<span>(.*?)<\/span>/);
    return parts.map((part, i) =>
      i % 2 === 1 ? <span key={i} className="text-sacred-gold italic">{part}</span> : part
    );
  };

  return (
    <div className="bg-sacred-beige text-sacred-dark">
      
      {/* 1. HERO SECTION */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={hero.imagemFundo} 
            alt="Interior da Igreja" 
            className="w-full h-full object-cover object-center scale-105 animate-[pulse_20s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-sacred-beige/50 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-sacred-beige via-transparent to-sacred-beige/80"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-24">
          <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl text-sacred-dark mb-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
            {renderTitle(hero.titulo)}
          </h1>
          <p className="text-sacred-gray max-w-2xl mx-auto text-lg font-light mb-12 animate-slide-up leading-relaxed" style={{animationDelay: '0.4s'}}>
            {hero.subtitulo}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <Link to={hero.botaoLink} className="button-primary w-full sm:w-auto uppercase tracking-widest text-xs px-10 py-5">
              {hero.botaoTexto}
            </Link>
          </div>
        </div>
      </section>

      {/* 1.5. AÇÕES RÁPIDAS */}
      <section className="relative z-30 mt-16 max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {config.home.acoesRapidas.map((item, idx) => (
          <Link 
            key={idx} 
            to={item.link}
            className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl hover:-translate-y-4 transition-all duration-500 animate-slide-up"
            style={{animationDelay: `${idx * 0.1}s`}}
          >
            <div className="absolute inset-0 bg-sacred-dark/40 group-hover:bg-sacred-dark/20 transition-all duration-500 z-10"></div>
            <img src={item.imagem} alt={item.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            
            <div className="absolute inset-0 p-10 flex flex-col justify-between z-20">
               <span className="text-white font-bold uppercase tracking-[0.3em] text-[10px] opacity-70 group-hover:opacity-100 transition-opacity">
                 {item.categoria}
               </span>
               <h4 className="font-headline text-3xl text-white uppercase leading-tight group-hover:text-sacred-gold transition-colors">
                 {item.titulo}
               </h4>
            </div>
          </Link>
        ))}
      </section>

      {/* 2. SOBRE A IGREJA */}
      <section id="sobre" className="section-container mt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 scroll-reveal visible">
             <span className="text-sacred-gold font-bold tracking-[0.2em] uppercase text-xs block mb-2">{sobre.subtitulo}</span>
             <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl text-sacred-dark leading-tight">{renderTitle(sobre.titulo)}</h2>
             <p className="text-sacred-gray leading-relaxed text-lg">
               {sobre.paragrafo}
             </p>
             <div className="space-y-4 pt-4">
               {sobre.features.map((feature, i) => (
                 <div key={i} className="flex gap-4 items-start">
                    {i === 0 ? <HeartHandshake className="text-sacred-gold shrink-0 mt-1" size={24} /> : <CheckCircle2 className="text-sacred-gold shrink-0 mt-1" size={24} />}
                    <div>
                      <h4 className="font-headline text-xl font-semibold mb-1">{feature.titulo}</h4>
                      <p className="text-sacred-gray text-sm">{feature.descricao}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>
          <div className="relative">
             <div className="aspect-[3/4] overflow-hidden rounded-bl-[100px] rounded-tr-[100px] shadow-2xl">
                <img src={sobre.imagem} alt="Igreja História" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-sacred-blue max-w-[200px]">
                <p className="font-headline text-sacred-gold text-4xl mb-1">{sobre.anosHistoria}</p>
                <p className="text-xs uppercase font-bold text-sacred-gray tracking-widest">Anos de História</p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. MISSAS E CELEBRAÇÕES */}
      <section id="missas" className="bg-white py-24 border-y border-sacred-blue">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal visible">
            <span className="text-sacred-gold font-bold tracking-[0.2em] uppercase text-xs block mb-4">Liturgia</span>
            <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl text-sacred-dark">Celebrações e <span className="italic text-sacred-gold">Missas</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* Domingo */}
             <div className="card-premium p-8 bg-sacred-blue/30 border-t-4 border-t-sacred-gold hover:-translate-y-2 transition-transform duration-300">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline text-2xl">Domingo</h3>
                  <Calendar className="text-sacred-gold" />
               </div>
               <div className="space-y-4">
                 {missas.domingo.map((m, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm group hover:bg-sacred-gold transition-colors cursor-pointer">
                      <span className="font-semibold group-hover:text-white transition-colors">{m.nome}</span>
                      <span className="bg-sacred-light-gray text-sacred-dark px-3 py-1 rounded text-sm group-hover:bg-white transition-colors font-bold">{m.horario}</span>
                   </div>
                 ))}
               </div>
             </div>

             {/* Semana */}
             <div className="card-premium p-8 hover:-translate-y-2 transition-transform duration-300">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline text-2xl">Dias de Semana</h3>
                  <Clock className="text-sacred-gold" />
               </div>
               <div className="space-y-4">
                 {missas.semana.map((m, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-sacred-light-gray rounded-lg group hover:bg-sacred-dark hover:text-white transition-colors">
                      <span className="font-semibold text-sm">{m.nome}</span>
                      <span className="font-bold text-sacred-gold">{m.horario}</span>
                   </div>
                 ))}
               </div>
             </div>

             {/* Sacramentos */}
             <div className="card-premium p-8 hover:-translate-y-2 transition-transform duration-300">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline text-2xl">Sacramentos</h3>
                  <User className="text-sacred-gold" />
               </div>
               <div className="space-y-4">
                 {missas.sacramentos.map((s, i) => (
                   <div key={i} className="p-4 bg-sacred-light-gray rounded-lg">
                      <span className="font-semibold block mb-1">{s.nome}</span>
                      {s.detalhes.map((d, j) => (
                        <p key={j} className="text-xs text-sacred-gray">{d}</p>
                      ))}
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4/5. EVENTOS */}
      <section id="eventos" className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 scroll-reveal visible">
          <div>
            <span className="text-sacred-gold font-bold tracking-[0.2em] uppercase text-xs block mb-4">Nossa Agenda</span>
            <h2 className="font-headline text-4xl sm:text-5xl">Próximos <span className="italic text-sacred-gold">Eventos</span></h2>
          </div>
          <Link to="/eventos?view=mes" className="button-outline text-xs">
            Acessar Calendário Completo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventos.map((evento) => (
            <div key={evento.id} className="card-premium group">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={evento.imagem} 
                  alt={evento.titulo} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 backdrop-blur-md bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded text-sacred-dark shadow-sm">
                  {evento.tipo}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-xs text-sacred-gray mb-3 font-semibold uppercase tracking-wider">
                  <Calendar size={14} className="text-sacred-gold" />
                  {evento.dia} &bull; {evento.horario}
                </div>
                <h3 className="font-headline text-xl mb-3 group-hover:text-sacred-gold transition-colors">{evento.titulo}</h3>
                <div className="flex items-center gap-2 text-sm text-sacred-gray font-light">
                  <MapPin size={16} />
                  {evento.local}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
            <Link to="/eventos" className="button-primary bg-sacred-dark hover:bg-sacred-gold text-xs px-10">
              Ver Todos os Eventos
            </Link>
        </div>
      </section>

      {/* 6. GALERIA */}
      <section className="bg-sacred-dark py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16 scroll-reveal visible">
            <span className="text-sacred-gold font-bold tracking-[0.2em] uppercase text-xs block mb-4">Memórias</span>
            <h2 className="font-headline text-4xl sm:text-5xl">Nossa <span className="italic">Comunidade</span> em Fotos</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {galeria[0] && (
               <div className="col-span-2 row-span-2 aspect-square md:aspect-auto overflow-hidden rounded-xl">
                 <img src={galeria[0]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 cursor-pointer" alt="Galeria" />
               </div>
             )}
             {galeria[1] && (
               <div className="aspect-square overflow-hidden rounded-xl">
                 <img src={galeria[1]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 cursor-pointer" alt="Galeria" />
               </div>
             )}
             {galeria[2] && (
               <div className="aspect-square overflow-hidden rounded-xl">
                 <img src={galeria[2]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 cursor-pointer" alt="Galeria" />
               </div>
             )}
             {galeria[3] && (
               <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-xl">
                 <img src={galeria[3]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 cursor-pointer" alt="Galeria" />
               </div>
             )}
          </div>
        </div>
      </section>

      {/* 7. DOAÇÕES */}
      <section id="doacoes" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-r from-sacred-gold/90 to-sacred-gold-light/90 z-10"></div>
           <img src={doacoesCTA.imagemFundo} alt="Doação" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-20 text-center text-white">
           <HeartHandshake className="mx-auto text-white mb-6" size={48} />
           <span className="font-bold tracking-[0.2em] uppercase text-xs block mb-4">Um Gesto de Fé</span>
           <h2 className="font-headline text-5xl sm:text-7xl italic mb-8">{doacoesCTA.titulo}</h2>
           <p className="text-white/90 text-lg sm:text-xl font-light mb-12 leading-relaxed max-w-2xl mx-auto">
             {doacoesCTA.subtitulo}
           </p>
           
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <Link to="/doacoes" className="button-primary bg-white text-sacred-gold hover:bg-sacred-dark hover:text-white hover:border-transparent px-12 py-5 shadow-2xl flex items-center gap-2">
                {doacoesCTA.botaoTexto} <ArrowRight size={18} />
             </Link>
           </div>
        </div>
      </section>

      {/* 8. CONSTRUÇÃO */}
      <section id="construcao" className="section-container bg-white border-b border-sacred-light-gray">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <span className="text-sacred-gold font-bold tracking-[0.2em] uppercase text-xs block mb-2">Construção</span>
               <h2 className="font-headline text-4xl sm:text-5xl mb-6">{renderTitle(construcao.titulo)}</h2>
               <p className="text-sacred-gray leading-relaxed mb-8">
                  {construcao.descricao}
               </p>
               
               <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-sacred-light-gray before:to-transparent">
                  {construcao.etapas.map((etapa, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                       <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${
                         etapa.status === 'concluida' ? 'bg-sacred-gold text-white' :
                         etapa.status === 'em_andamento' ? 'bg-white border-sacred-gold text-sacred-gold' :
                         'bg-sacred-light-gray text-sacred-gray'
                       }`}>
                          {etapa.status === 'concluida' ? <CheckCircle2 size={16} /> : <div className={`w-2 h-2 rounded-full ${etapa.status === 'em_andamento' ? 'bg-sacred-gold animate-pulse' : 'bg-sacred-gray/50'}`}></div>}
                       </div>
                       <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg shadow-sm ${
                         etapa.status === 'em_andamento' ? 'bg-white border border-sacred-gold/30 shadow-md' :
                         etapa.status === 'pendente' ? 'bg-sacred-light-gray/50 opacity-60' :
                         'bg-sacred-light-gray'
                       }`}>
                          <h4 className={`font-headline text-lg font-bold ${etapa.status === 'em_andamento' ? 'text-sacred-gold' : ''}`}>{etapa.nome}</h4>
                          <p className="text-xs text-sacred-gray">{etapa.detalhe}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden shadow-2xl">
               <img src={construcao.imagem} alt="Projeto" className="w-full h-full object-cover" />
               <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sacred-dark/80 p-6 text-white text-center">
                 <p className="font-headline italic text-2xl">O seu novo Templo.</p>
               </div>
            </div>
         </div>
      </section>

      {/* 9. CONTATO */}
      <section id="contato" className="section-container">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="card-premium p-10 bg-white">
               <h3 className="font-headline text-3xl mb-6 text-sacred-dark">Entre em Contato</h3>
               <form className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-sacred-gray uppercase tracking-wider mb-2">Nome Completo</label>
                    <input type="text" className="w-full bg-sacred-light-gray border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-sacred-gold focus:outline-none" placeholder="João da Silva" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-sacred-gray uppercase tracking-wider mb-2">E-mail</label>
                    <input type="email" className="w-full bg-sacred-light-gray border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-sacred-gold focus:outline-none" placeholder="joao@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-sacred-gray uppercase tracking-wider mb-2">Mensagem</label>
                    <textarea className="w-full bg-sacred-light-gray border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-sacred-gold focus:outline-none h-32 resize-none" placeholder="Como podemos ajudar?"></textarea>
                  </div>
                  <button type="submit" className="button-primary w-full">
                    Enviar Mensagem
                  </button>
               </form>
            </div>
            <div className="space-y-8 flex flex-col justify-center">
               <div>
                  <h3 className="font-headline text-4xl mb-6">Visite-nos</h3>
                  <p className="text-sacred-gray mb-8">Nossas portas estão abertas. Sinta-se abraçado e convidado a conhecer nossa comunidade.</p>
               </div>
               
               <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sacred-blue rounded-full flex items-center justify-center text-sacred-dark">
                       <MapPin size={24} />
                    </div>
                    <div>
                       <span className="block font-bold text-sacred-dark">Endereço</span>
                       <span className="text-sacred-gray text-sm">{contatoSecao.endereco}</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sacred-blue rounded-full flex items-center justify-center text-sacred-dark">
                       <Phone size={24} />
                    </div>
                    <div>
                       <span className="block font-bold text-sacred-dark">Telefone / WhatsApp</span>
                       <span className="text-sacred-gray text-sm">{contatoSecao.telefone}</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sacred-blue rounded-full flex items-center justify-center text-sacred-dark">
                       <Mail size={24} />
                    </div>
                    <div>
                       <span className="block font-bold text-sacred-dark">E-mail Administrativo</span>
                       <span className="text-sacred-gray text-sm">{contatoSecao.email}</span>
                    </div>
                 </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
