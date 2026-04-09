import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Heart, Landmark, Send, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function CampanhaDetalhe() {
  const { config } = useSiteConfig();
  const { id } = useParams();
  const campanha = config.campanhas.find(c => c.id === id);
  const [valor, setValor] = useState('50');
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!campanha) return <div className="pt-32 text-center text-white">Campanha não encontrada.</div>;

  const gerarPix = () => {
    const { API_URL } = useSiteConfig();
    fetch(`${API_URL}/api/doacao/pix`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valor, categoria: campanha.titulo })
    })
    .then(res => res.json())
    .then(data => setQrCode(data.qrCodeUrl))
    .catch(console.error);
  };

  return (
    <div className="pt-24 min-h-screen bg-sacred-creme text-sacred-dark pb-32">
       {/* Campanha Header */}
       <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img src={campanha.imagem} alt={campanha.titulo} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-sacred-dark/70 backdrop-blur-[2px]"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
             <Link to="/campanhas" className="inline-flex items-center gap-2 text-sacred-gold font-bold text-xs uppercase tracking-widest mb-8 hover:-translate-x-2 transition-transform">
               <ChevronLeft size={16} /> Voltar para Campanhas
             </Link>
             <h1 className="font-headline text-5xl md:text-7xl uppercase tracking-widest mb-8 animate-slide-up leading-tight">
               {campanha.titulo}
             </h1>
             <div className="inline-block py-2 px-6 bg-sacred-gold text-sacred-dark text-xs font-bold uppercase tracking-widest rounded-full animate-fade-in" style={{animationDelay: '0.4s'}}>
               {campanha.categoria}
             </div>
          </div>
       </section>

       <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             {/* Conteúdo Detalhado */}
             <div className="lg:col-span-2 bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl space-y-12">
                <div className="space-y-6">
                   <h2 className="text-sacred-gold font-bold uppercase tracking-[0.2em] text-xs">A Importância Desta Obra</h2>
                   <h3 className="font-headline text-4xl uppercase text-sacred-dark leading-snug">Juntos Pelo Próximo e Pela Fé</h3>
                   <p className="text-sacred-gray text-lg font-light leading-relaxed">
                     A campanha <strong>{campanha.titulo}</strong> é um passo fundamental na nossa jornada de fé. Através da sua generosidade, seremos capazes de transformar a realidade de muitas vidas e preservar o nosso patrimônio espiritual.
                   </p>
                   <p className="text-sacred-gray text-lg font-light leading-relaxed">
                     Cada doação, independentemente do valor, contribui diretamente para a execução desta obra. Em cada tijolo colocado e em cada cesta entregue, há uma prece de gratidão de todos os envolvidos.
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 border-y border-sacred-blue/10">
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sacred-gold/10 rounded-2xl flex items-center justify-center text-sacred-gold flex-shrink-0">
                         <Heart size={24} />
                      </div>
                      <div>
                         <h4 className="font-headline text-xl uppercase mb-2">Amor Radical</h4>
                         <p className="text-xs text-gray-500 font-light">Sua oferta reflete o compromisso com o próximo.</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-sacred-gold/10 rounded-2xl flex items-center justify-center text-sacred-gold flex-shrink-0">
                         <Landmark size={24} />
                      </div>
                      <div>
                         <h4 className="font-headline text-xl uppercase mb-2">Transparência</h4>
                         <p className="text-xs text-gray-500 font-light">Prestamos contas de cada centavo em nosso mural paroquial.</p>
                      </div>
                   </div>
                </div>

                <div className="rounded-[3rem] overflow-hidden shadow-xl aspect-video">
                   <img src={campanha.imagem} alt="Galeria" className="w-full h-full object-cover" />
                </div>
             </div>

             {/* Sidebar de Doação */}
             <div className="space-y-8">
                <div className="bg-sacred-dark p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
                   <div className="absolute inset-0 bg-sacred-gold/5 -rotate-12 translate-x-1/2 translate-y-1/2 rounded-full blur-3xl group-hover:bg-sacred-gold/10 transition-all"></div>
                   <div className="relative z-10 space-y-8">
                      <h4 className="font-headline text-3xl uppercase tracking-widest text-sacred-gold">Doe Agora</h4>
                      <p className="text-sm text-white/50 font-light">Selecione ou insira o valor da sua contribuição via PIX.</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                         {['20', '50', '100', '200'].map(v => (
                           <button 
                             key={v}
                             onClick={() => setValor(v)}
                             className={`py-3 rounded-xl text-xs font-bold transition-all border ${valor === v ? 'bg-sacred-gold text-sacred-dark border-sacred-gold' : 'border-white/10 text-white/60 hover:border-white/30'}`}
                           >
                              R$ {v}
                           </button>
                         ))}
                      </div>

                      <div className="relative">
                         <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 font-bold">R$</span>
                         <input 
                           type="number" 
                           value={valor} 
                           onChange={(e) => setValor(e.target.value)}
                           className="w-full bg-white/5 border border-white/10 p-5 pl-12 rounded-2xl text-xl font-headline focus:outline-none focus:border-sacred-gold transition-colors" 
                         />
                      </div>

                      <button 
                        onClick={gerarPix}
                        className="w-full py-6 bg-sacred-gold text-sacred-dark rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all flex items-center justify-center gap-3 shadow-xl shadow-sacred-gold/20"
                      >
                         Gerar QR Code <Send size={16} />
                      </button>

                      {qrCode && (
                        <div className="bg-white p-6 rounded-3xl mt-8 animate-fade-in flex flex-col items-center">
                           <img src={qrCode} alt="PIX QR Code" className="w-40 h-40" />
                           <p className="text-[10px] text-sacred-dark mt-4 font-bold uppercase tracking-widest opacity-50">Aponte a câmera para doar</p>
                        </div>
                      )}
                   </div>
                </div>

                <div className="bg-white p-8 rounded-[3rem] border border-sacred-blue/10 flex items-center gap-6 group cursor-pointer hover:border-sacred-gold transition-all">
                   <div className="w-16 h-16 rounded-2xl bg-sacred-creme flex items-center justify-center text-sacred-gold flex-shrink-0 group-hover:bg-sacred-gold group-hover:text-white transition-all">
                      <Send size={28} />
                   </div>
                   <div>
                      <h5 className="font-bold text-sacred-dark mb-1 uppercase text-xs tracking-widest">Dúvidas?</h5>
                      <p className="text-xs text-gray-500 font-light leading-relaxed">Fale com a nossa secretaria pelo WhatsApp.</p>
                   </div>
                </div>
             </div>
          </div>
       </section>
    </div>
  );
}
