/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const SiteConfigContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3001');

export function SiteConfigProvider({ children }) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/config`)
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar config:', err);
        setError('Não foi possível carregar as configurações do site.');
        setLoading(false);
      });
  }, []);

  const updateConfig = async (newConfig, token) => {
    try {
      const response = await fetch(`${API_URL}/api/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newConfig)
      });
      const result = await response.json();
      if (result.sucesso) {
        setConfig(newConfig);
        return { sucesso: true };
      }
      return { sucesso: false, mensagem: result.erro || 'Erro desconhecido.' };
    } catch {
      return { sucesso: false, mensagem: 'Erro de conexão com o servidor.' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sacred-beige">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-sacred-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sacred-gray text-sm uppercase tracking-widest font-bold">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sacred-beige">
        <div className="text-center space-y-4 max-w-md px-6">
          <p className="text-red-500 font-bold">{error}</p>
          <button onClick={() => window.location.reload()} className="button-primary text-xs">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, API_URL }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig deve ser usado dentro de um SiteConfigProvider');
  }
  return context;
}
