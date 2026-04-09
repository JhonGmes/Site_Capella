import { MessageCircle } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function WhatsAppFAB() {
  const { config } = useSiteConfig();
  
  return (
    <a 
      href={`https://wa.me/${config.whatsapp.numero}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform hover:shadow-[#25D366]/50 shadow-[#25D366]/30"
    >
      <MessageCircle size={28} />
    </a>
  );
}
