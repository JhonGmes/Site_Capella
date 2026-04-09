import { useEffect } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Sobre() {
  const { config } = useSiteConfig();
  const sb = config.sobre;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-sacred-creme text-sacred-dark pb-32">
      {/* Hero Intermediária */}
      <section className="relative py-32 bg-sacred-dark text-white overflow-hidden text-center">
         <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src={sb.heroImagem} 
              alt="Interior da Igreja" 
              className="w-full h-full object-cover" 
            />
         </div>
         <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h1 className="font-headline text-5xl md:text-7xl uppercase tracking-widest animate-slide-up">{sb.heroTitulo}</h1>
            <div className="w-24 h-1 bg-sacred-gold mx-auto mt-8"></div>
         </div>
      </section>

      {/* Comunidade */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img 
              src={sb.comunidade.imagem} 
              alt="Comunidade" 
              className="rounded-[3rem] shadow-2xl z-10 relative"
            />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-sacred-gold/10 rounded-full blur-3xl -z-0"></div>
          </div>
          <div className="space-y-8">
            <h2 className="text-sacred-gold font-bold tracking-[0.25em] uppercase text-xs">{sb.comunidade.subtitulo}</h2>
            <h3 className="font-headline text-4xl md:text-5xl uppercase text-sacred-dark leading-tight" dangerouslySetInnerHTML={{ __html: sb.comunidade.titulo }}></h3>
            {sb.comunidade.paragrafos.map((p, i) => (
              <p key={i} className="text-sacred-gray text-lg font-light leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="section-container bg-white/50 py-32 rounded-[4rem] mx-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 space-y-8 px-6 lg:px-12">
            <h2 className="text-sacred-gold font-bold tracking-[0.25em] uppercase text-xs">{sb.historia.subtitulo}</h2>
            <h3 className="font-headline text-4xl md:text-5xl uppercase text-sacred-dark">{sb.historia.titulo}</h3>
            {sb.historia.paragrafos.map((p, i) => (
              <p key={i} className="text-sacred-gray text-lg font-light leading-relaxed">{p}</p>
            ))}
          </div>
          <div className="order-1 lg:order-2 px-6 lg:px-0">
             <img 
              src={sb.historia.imagem} 
              alt="História" 
              className="rounded-[3rem] shadow-2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
