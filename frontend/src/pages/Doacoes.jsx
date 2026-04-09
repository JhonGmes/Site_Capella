import { useState } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Doacoes() {
  const { config } = useSiteConfig();
  const d = config.doacoes;
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState(d.categorias[0] || 'Dízimo');
  const [pixData, setPixData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const gerarPix = async (e) => {
    e.preventDefault();
    if (!valor || isNaN(valor) || valor <= 0) return alert('Por favor, insira um valor válido.');
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/doacao/pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor, categoria })
      });
      const data = await response.json();
      setPixData(data);
    } catch (error) {
       console.error(error);
       alert('Erro ao gerar PIX. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const copiarCodigo = () => {
    if (pixData?.chaveCopiaCola) {
      navigator.clipboard.writeText(pixData.chaveCopiaCola);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-sacred-creme text-sacred-dark pb-32">
      {/* Hero Emocional */}
      <section className="relative py-32 bg-sacred-dark text-white overflow-hidden text-center">
         <div className="absolute inset-0 z-0 opacity-30">
            <img src={d.heroImagem} alt="Doação" className="w-full h-full object-cover" />
         </div>
         <div className="relative z-10 max-w-4xl mx-auto px-6">
            <span className="text-sacred-gold font-bold tracking-[0.2em] uppercase text-xs block mb-4 animate-fade-in">{d.heroSubtitulo}</span>
            <h1 className="font-headline text-5xl md:text-7xl italic animate-slide-up">{d.heroTitulo}</h1>
            <p className="mt-8 text-white/80 text-lg leading-relaxed max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
              {d.heroDescricao}
            </p>
         </div>
      </section>

      {/* Formulário e PIX */}
      <section className="max-w-4xl mx-auto px-6 -mt-16 relative z-20">
         <div className="bg-white p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-12">
            
            <div className="flex-1 space-y-8">
               <h2 className="font-headline text-3xl italic">Como deseja contribuir?</h2>
               
               <form onSubmit={gerarPix} className="space-y-6">
                 <div>
                   <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Destino da Oferta</label>
                   <div className="grid grid-cols-2 gap-4">
                      {d.categorias.map(cat => (
                        <button 
                          key={cat} type="button"
                          onClick={() => setCategoria(cat)}
                          className={`py-3 text-xs font-bold uppercase tracking-wider border transition-colors ${categoria === cat ? 'border-sacred-gold bg-sacred-gold/5 text-sacred-gold' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}
                        >
                          {cat}
                        </button>
                      ))}
                   </div>
                 </div>

                 <div>
                   <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Valor (R$)</label>
                   <input 
                     type="number" 
                     min="1" step="0.01"
                     value={valor} onChange={(e) => setValor(e.target.value)}
                     className="w-full p-4 border border-gray-200 text-lg focus:outline-none focus:border-sacred-gold transition-colors"
                     placeholder="0,00"
                     required
                   />
                 </div>

                 <button 
                   type="submit" 
                   disabled={loading}
                   className="w-full button-primary text-sm"
                 >
                   {loading ? 'Processando...' : 'Gerar PIX para Doação'}
                 </button>
               </form>
            </div>

            <div className="flex-1 bg-sacred-creme/50 p-8 flex flex-col items-center justify-center border border-gray-100 text-center">
               {!pixData ? (
                 <div className="text-gray-400 space-y-4">
                    <span className="material-symbols-outlined text-5xl">qr_code_scanner</span>
                    <p className="font-light text-sm">Preencha o formulário ao lado para gerar o seu código PIX ou Copia e Cola.</p>
                 </div>
               ) : (
                 <div className="w-full space-y-6 animate-fade-in">
                    <div className="text-sacred-gold font-bold uppercase tracking-widest text-xs">Escaneie o QR Code</div>
                    <img src={pixData.qrCodeUrl} alt="QR Code PIX" className="w-48 h-48 mx-auto" />
                    
                    <div className="relative pt-4">
                       <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                       <div className="relative flex justify-center"><span className="bg-sacred-creme/50 px-4 text-xs text-gray-400 uppercase tracking-widest bg-sacred-creme">Ou use o Copia e Cola</span></div>
                    </div>

                    <button 
                      onClick={copiarCodigo}
                      className="w-full py-4 border border-sacred-gold text-sacred-gold font-bold uppercase tracking-widest text-xs hover:bg-sacred-gold hover:text-white transition-colors"
                    >
                      {copiado ? 'Código Copiado!' : 'Copiar Código PIX'}
                    </button>
                    
                    <p className="text-[10px] text-gray-500 font-light mt-4">{pixData.mensagem}</p>
                 </div>
               )}
            </div>

         </div>
      </section>

    </div>
  );
}
