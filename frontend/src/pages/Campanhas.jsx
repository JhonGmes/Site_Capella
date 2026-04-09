import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Campanhas() {
  const { config } = useSiteConfig();
  const campanhas = config.campanhas;

  return (
    <div className="pt-24 min-h-screen bg-sacred-dark text-white pb-32">
      <div className="bg-sacred-gold/10 py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Heart className="mx-auto text-sacred-gold mb-8 animate-pulse" size={48} />
          <h1 className="font-headline text-5xl md:text-7xl uppercase tracking-widest mb-6">Campanhas de Fé</h1>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto italic">
            "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria."
          </p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {campanhas.map((campanha, index) => (
            <div key={campanha.id} className="bg-white/5 rounded-[3rem] p-4 border border-white/10 hover:border-sacred-gold/50 transition-all group animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="relative h-80 rounded-[2.5rem] overflow-hidden">
                 <img src={campanha.imagem} alt={campanha.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute top-6 left-6 bg-sacred-gold text-sacred-dark text-[10px] font-bold px-4 py-2 uppercase tracking-widest rounded-full">{campanha.categoria}</div>
              </div>
              <div className="p-8 space-y-4">
                 <h3 className="font-headline text-3xl uppercase leading-tight group-hover:text-sacred-gold transition-colors">{campanha.titulo}</h3>
                 <p className="text-white/40 text-sm leading-relaxed font-light">{campanha.previa}</p>
                 <Link 
                   to={`/campanha/${campanha.id}`} 
                   className="inline-flex items-center gap-2 text-sacred-gold font-bold text-xs uppercase tracking-widest pt-4 group-hover:gap-4 transition-all"
                 >
                   Saiba Mais <ArrowRight size={16} />
                 </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
