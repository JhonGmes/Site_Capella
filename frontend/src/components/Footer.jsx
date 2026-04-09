import { Link } from 'react-router-dom';
import { Church, Camera, Send, Video, MapPin, Phone, Mail } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Footer() {
  const { config } = useSiteConfig();
  const ft = config.footer;
  const ct = config.contato || config.home.contatoSecao;

  return (
    <footer className="bg-sacred-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sacred-gold rounded-full flex items-center justify-center">
              <Church size={20} className="text-white" />
            </div>
            <span className="font-headline text-2xl">{config.brand.nome}</span>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed">
            {ft.descricao}
          </p>
          <div className="flex gap-4">
            <a href={ft.redesSociais.instagram} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sacred-gold transition-colors"><Camera size={18} /></a>
            <a href={ft.redesSociais.telegram} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sacred-gold transition-colors"><Send size={18} /></a>
            <a href={ft.redesSociais.youtube} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sacred-gold transition-colors"><Video size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-headline text-lg mb-6 text-sacred-gold">Links Rápidos</h4>
          <ul className="space-y-4 text-sm text-white/70">
            {ft.linksRapidos.map((link, i) => (
              <li key={i}><Link to={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-headline text-lg mb-6 text-sacred-gold">Contato</h4>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-sacred-gold shrink-0 mt-0.5" />
              <span>{ct.endereco}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-sacred-gold shrink-0" />
              <span>{ct.telefone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-sacred-gold shrink-0" />
              <span>{ct.email}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline text-lg mb-6 text-sacred-gold">Horários</h4>
          <ul className="space-y-3 text-sm text-white/70">
            {ft.horarios.map((h, i) => (
              <li key={i} className="flex justify-between border-b border-white/10 pb-2 last:border-0">
                <span>{h.dia}</span>
                <span className="font-semibold text-white">{h.horario}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
        <p>&copy; {new Date().getFullYear()} {ft.copyright}</p>
        <p>{ft.credito}</p>
      </div>
    </footer>
  );
}
