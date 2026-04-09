import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SiteConfigProvider } from './context/SiteConfigContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import Home from './pages/Home';
import Eventos from './pages/Eventos';
import Sobre from './pages/Sobre';
import Campanhas from './pages/Campanhas';
import CampanhaDetalhe from './pages/CampanhaDetalhe';
import Contato from './pages/Contato';
import Admin from './pages/Admin';
import Doacoes from './pages/Doacoes';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/campanhas" element={<Campanhas />} />
          <Route path="/campanha/:id" element={<CampanhaDetalhe />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/doacoes" element={<Doacoes />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFAB />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SiteConfigProvider>
        <AppContent />
      </SiteConfigProvider>
    </BrowserRouter>
  );
}

export default App;

