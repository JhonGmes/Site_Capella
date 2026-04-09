import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Church, Menu, X } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { config } = useSiteConfig();

  const menuItems = config.header.menuItems;

  return (
    <header className="absolute w-full z-50 bg-transparent text-sacred-dark py-8">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo no Canto */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-sacred-dark shadow-xl shadow-black/10 overflow-hidden">
            {config.brand.logo ? (
              <img src={config.brand.logo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <Church size={20} className="text-white" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-2xl font-bold tracking-tight leading-none">{config.brand.nome}</span>
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-sacred-dark/50">{config.brand.subtitulo}</span>
          </div>
        </Link>
        
        {/* Menu de Navegação Centrado/Direita */}
        <nav className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] items-center">
          {menuItems.map((item) => (
            <a 
              key={item.label}
              href={item.href} 
              className="hover:text-sacred-gold transition-colors text-sacred-dark"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden text-sacred-dark p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-sacred-blue animate-fade-in p-6 shadow-2xl">
          <nav className="flex flex-col gap-6 text-xs font-bold uppercase tracking-widest text-center">
            {menuItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-sacred-gold transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
