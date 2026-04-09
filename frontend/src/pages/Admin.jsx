import { useState, useEffect } from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';
import {
  Church, Home, Calendar, Heart, MapPin, Info, Columns2, Settings,
  LogOut, Save, Check, AlertCircle, Plus, Trash2, Eye, MessageCircle,
  Lock, User, ChevronRight, Image, Type, FileText, DollarSign
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3001');

// ───── LOGIN SCREEN ─────
function LoginScreen({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
      });
      const data = await res.json();
      if (data.sucesso) {
        localStorage.setItem('admin_token', data.token);
        onLogin(data.token);
      } else {
        setErro(data.mensagem || 'Credenciais inválidas.');
      }
    } catch {
      setErro('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sacred-dark flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-sacred-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <Church size={28} className="text-white" />
          </div>
          <h1 className="font-headline text-3xl text-white mb-2">Área Administrativa</h1>
          <p className="text-white/40 text-sm">Acesse o painel para gerenciar o site</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">
              <User size={12} className="inline mr-1" /> Usuário
            </label>
            <input
              type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-sacred-gold transition-colors"
              placeholder="admin" required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">
              <Lock size={12} className="inline mr-1" /> Senha
            </label>
            <input
              type="password" value={senha} onChange={(e) => setSenha(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-sacred-gold transition-colors"
              placeholder="••••••••" required
            />
          </div>

          {erro && (
            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-lg">
              <AlertCircle size={14} /> {erro}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full py-4 bg-sacred-gold text-sacred-dark rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar no Painel'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ───── FIELD COMPONENTS ─────
function TextField({ label, value, onChange, placeholder, icon: Icon }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
        {Icon && <Icon size={12} />} {label}
      </label>
      <input
        type="text" value={value || ''} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-sacred-gold focus:ring-2 focus:ring-sacred-gold/10 transition-all"
        placeholder={placeholder}
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
        <FileText size={12} /> {label}
      </label>
      <textarea
        value={value || ''} onChange={(e) => onChange(e.target.value)} rows={rows}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-sacred-gold focus:ring-2 focus:ring-sacred-gold/10 transition-all resize-none"
        placeholder={placeholder}
      />
    </div>
  );
}

function ImageField({ label, value, onChange }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
        <Image size={12} /> {label}
      </label>
      <input
        type="text" value={value || ''} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-sacred-gold transition-all mb-2"
        placeholder="https://exemplo.com/imagem.jpg"
      />
      {value && (
        <div className="h-32 rounded-lg overflow-hidden border border-gray-200">
          <img src={value} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
        </div>
      )}
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <h3 className="font-bold text-sacred-dark text-sm uppercase tracking-wider">{title}</h3>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
}

// ───── SECTION EDITORS ─────
function IdentidadeEditor({ config, setConfig }) {
  const update = (path, value) => {
    const c = structuredClone(config);
    const keys = path.split('.');
    let obj = c;
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
    obj[keys[keys.length - 1]] = value;
    setConfig(c);
  };

  return (
    <div className="space-y-6">
      <SectionCard title="Marca / Logo">
        <TextField label="Nome da Igreja" value={config.brand.nome} onChange={(v) => update('brand.nome', v)} icon={Church} />
        <TextField label="Subtítulo" value={config.brand.subtitulo} onChange={(v) => update('brand.subtitulo', v)} icon={Type} />
        <ImageField label="Logo da Igreja (URL)" value={config.brand.logo} onChange={(v) => update('brand.logo', v)} />
      </SectionCard>
      <SectionCard title="WhatsApp">
        <TextField label="Número (com DDI)" value={config.whatsapp.numero} onChange={(v) => update('whatsapp.numero', v)} icon={MessageCircle} placeholder="5511999999999" />
      </SectionCard>
      <SectionCard title="Menu de Navegação">
        {config.header.menuItems.map((item, i) => (
          <div key={i} className="flex gap-3 items-end">
            <div className="flex-1">
              <TextField label={`Item ${i + 1} — Nome`} value={item.label} onChange={(v) => {
                const c = structuredClone(config); c.header.menuItems[i].label = v; setConfig(c);
              }} />
            </div>
            <div className="flex-1">
              <TextField label="Link" value={item.href} onChange={(v) => {
                const c = structuredClone(config); c.header.menuItems[i].href = v; setConfig(c);
              }} />
            </div>
            <button onClick={() => {
              const c = structuredClone(config); c.header.menuItems.splice(i, 1); setConfig(c);
            }} className="p-3 text-red-400 hover:bg-red-50 rounded-lg transition-colors mb-0.5"><Trash2 size={16} /></button>
          </div>
        ))}
        <button onClick={() => {
          const c = structuredClone(config); c.header.menuItems.push({ label: 'Novo', href: '/' }); setConfig(c);
        }} className="flex items-center gap-2 text-sacred-gold text-xs font-bold uppercase tracking-wider hover:text-sacred-dark transition-colors">
          <Plus size={14} /> Adicionar Item
        </button>
      </SectionCard>
    </div>
  );
}

function HomeHeroEditor({ config, setConfig }) {
  const hero = config.home.hero;
  const update = (key, value) => {
    const c = structuredClone(config); c.home.hero[key] = value; setConfig(c);
  };
  return (
    <div className="space-y-6">
      <SectionCard title="Hero — Tela Inicial">
        <TextField label="Título (use <span> para destaque)" value={hero.titulo} onChange={(v) => update('titulo', v)} icon={Type} />
        <TextArea label="Subtítulo" value={hero.subtitulo} onChange={(v) => update('subtitulo', v)} />
        <TextField label="Texto do Botão" value={hero.botaoTexto} onChange={(v) => update('botaoTexto', v)} />
        <TextField label="Link do Botão" value={hero.botaoLink} onChange={(v) => update('botaoLink', v)} />
        <ImageField label="Imagem de Fundo" value={hero.imagemFundo} onChange={(v) => update('imagemFundo', v)} />
      </SectionCard>

      <SectionCard title="Cards de Ação Rápida">
        {config.home.acoesRapidas.map((item, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50/50">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-sacred-gold uppercase tracking-wider">Card {i + 1}</span>
              <button onClick={() => { const c = structuredClone(config); c.home.acoesRapidas.splice(i, 1); setConfig(c); }}
                className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
            <TextField label="Categoria" value={item.categoria} onChange={(v) => { const c = structuredClone(config); c.home.acoesRapidas[i].categoria = v; setConfig(c); }} />
            <TextField label="Título" value={item.titulo} onChange={(v) => { const c = structuredClone(config); c.home.acoesRapidas[i].titulo = v; setConfig(c); }} />
            <TextField label="Link" value={item.link} onChange={(v) => { const c = structuredClone(config); c.home.acoesRapidas[i].link = v; setConfig(c); }} />
            <ImageField label="Imagem" value={item.imagem} onChange={(v) => { const c = structuredClone(config); c.home.acoesRapidas[i].imagem = v; setConfig(c); }} />
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Seção Sobre (Home)">
        <TextField label="Subtítulo" value={config.home.sobreSecao.subtitulo} onChange={(v) => { const c = structuredClone(config); c.home.sobreSecao.subtitulo = v; setConfig(c); }} />
        <TextField label="Título" value={config.home.sobreSecao.titulo} onChange={(v) => { const c = structuredClone(config); c.home.sobreSecao.titulo = v; setConfig(c); }} icon={Type} />
        <TextArea label="Parágrafo" value={config.home.sobreSecao.paragrafo} onChange={(v) => { const c = structuredClone(config); c.home.sobreSecao.paragrafo = v; setConfig(c); }} rows={4} />
        <TextField label="Anos de História" value={config.home.sobreSecao.anosHistoria} onChange={(v) => { const c = structuredClone(config); c.home.sobreSecao.anosHistoria = v; setConfig(c); }} />
        <ImageField label="Imagem" value={config.home.sobreSecao.imagem} onChange={(v) => { const c = structuredClone(config); c.home.sobreSecao.imagem = v; setConfig(c); }} />
      </SectionCard>

      <SectionCard title="Galeria de Fotos (Home)">
        {config.home.galeria.map((url, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="flex-1"><ImageField label={`Foto ${i + 1}`} value={url} onChange={(v) => { const c = structuredClone(config); c.home.galeria[i] = v; setConfig(c); }} /></div>
            <button onClick={() => { const c = structuredClone(config); c.home.galeria.splice(i, 1); setConfig(c); }}
              className="p-3 text-red-400 hover:bg-red-50 rounded-lg transition-colors mt-6"><Trash2 size={16} /></button>
          </div>
        ))}
        <button onClick={() => { const c = structuredClone(config); c.home.galeria.push(''); setConfig(c); }}
          className="flex items-center gap-2 text-sacred-gold text-xs font-bold uppercase tracking-wider hover:text-sacred-dark transition-colors">
          <Plus size={14} /> Adicionar Foto
        </button>
      </SectionCard>

      <SectionCard title="Seção Doações (CTA da Home)">
        <TextField label="Título" value={config.home.doacoesCTA.titulo} onChange={(v) => { const c = structuredClone(config); c.home.doacoesCTA.titulo = v; setConfig(c); }} icon={Type} />
        <TextArea label="Subtítulo" value={config.home.doacoesCTA.subtitulo} onChange={(v) => { const c = structuredClone(config); c.home.doacoesCTA.subtitulo = v; setConfig(c); }} />
        <TextField label="Texto do Botão" value={config.home.doacoesCTA.botaoTexto} onChange={(v) => { const c = structuredClone(config); c.home.doacoesCTA.botaoTexto = v; setConfig(c); }} />
        <ImageField label="Imagem de Fundo" value={config.home.doacoesCTA.imagemFundo} onChange={(v) => { const c = structuredClone(config); c.home.doacoesCTA.imagemFundo = v; setConfig(c); }} />
      </SectionCard>
    </div>
  );
}

function MissasEditor({ config, setConfig }) {
  const missas = config.home.missas;
  return (
    <div className="space-y-6">
      <SectionCard title="Missas de Domingo">
        {missas.domingo.map((m, i) => (
          <div key={i} className="flex gap-3 items-end">
            <div className="flex-1"><TextField label="Nome" value={m.nome} onChange={(v) => { const c = structuredClone(config); c.home.missas.domingo[i].nome = v; setConfig(c); }} /></div>
            <div className="w-32"><TextField label="Horário" value={m.horario} onChange={(v) => { const c = structuredClone(config); c.home.missas.domingo[i].horario = v; setConfig(c); }} /></div>
            <button onClick={() => { const c = structuredClone(config); c.home.missas.domingo.splice(i, 1); setConfig(c); }}
              className="p-3 text-red-400 hover:bg-red-50 rounded-lg transition-colors mb-0.5"><Trash2 size={16} /></button>
          </div>
        ))}
        <button onClick={() => { const c = structuredClone(config); c.home.missas.domingo.push({ nome: '', horario: '' }); setConfig(c); }}
          className="flex items-center gap-2 text-sacred-gold text-xs font-bold uppercase tracking-wider hover:text-sacred-dark transition-colors">
          <Plus size={14} /> Adicionar Missa
        </button>
      </SectionCard>

      <SectionCard title="Missas na Semana">
        {missas.semana.map((m, i) => (
          <div key={i} className="flex gap-3 items-end">
            <div className="flex-1"><TextField label="Nome" value={m.nome} onChange={(v) => { const c = structuredClone(config); c.home.missas.semana[i].nome = v; setConfig(c); }} /></div>
            <div className="w-32"><TextField label="Horário" value={m.horario} onChange={(v) => { const c = structuredClone(config); c.home.missas.semana[i].horario = v; setConfig(c); }} /></div>
            <button onClick={() => { const c = structuredClone(config); c.home.missas.semana.splice(i, 1); setConfig(c); }}
              className="p-3 text-red-400 hover:bg-red-50 rounded-lg transition-colors mb-0.5"><Trash2 size={16} /></button>
          </div>
        ))}
        <button onClick={() => { const c = structuredClone(config); c.home.missas.semana.push({ nome: '', horario: '' }); setConfig(c); }}
          className="flex items-center gap-2 text-sacred-gold text-xs font-bold uppercase tracking-wider hover:text-sacred-dark transition-colors">
          <Plus size={14} /> Adicionar Missa
        </button>
      </SectionCard>

      <SectionCard title="Sacramentos">
        {missas.sacramentos.map((s, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50/50">
            <TextField label="Nome" value={s.nome} onChange={(v) => { const c = structuredClone(config); c.home.missas.sacramentos[i].nome = v; setConfig(c); }} />
            {s.detalhes.map((d, j) => (
              <div key={j} className="flex gap-2 items-end">
                <div className="flex-1"><TextField label={`Detalhe ${j + 1}`} value={d} onChange={(v) => { const c = structuredClone(config); c.home.missas.sacramentos[i].detalhes[j] = v; setConfig(c); }} /></div>
                <button onClick={() => { const c = structuredClone(config); c.home.missas.sacramentos[i].detalhes.splice(j, 1); setConfig(c); }}
                  className="p-3 text-red-400 hover:bg-red-50 rounded-lg transition-colors mb-0.5"><Trash2 size={14} /></button>
              </div>
            ))}
            <button onClick={() => { const c = structuredClone(config); c.home.missas.sacramentos[i].detalhes.push(''); setConfig(c); }}
              className="flex items-center gap-2 text-sacred-gold text-[10px] font-bold uppercase tracking-wider"><Plus size={12} /> Adicionar Detalhe</button>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}

function EventosEditor({ config, setConfig }) {
  const eventos = config.home.eventos;
  return (
    <div className="space-y-6">
      <SectionCard title="Eventos">
        {eventos.map((ev, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50/50">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-sacred-gold uppercase tracking-wider">Evento {i + 1}</span>
              <button onClick={() => { const c = structuredClone(config); c.home.eventos.splice(i, 1); setConfig(c); }}
                className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <TextField label="Título" value={ev.titulo} onChange={(v) => { const c = structuredClone(config); c.home.eventos[i].titulo = v; setConfig(c); }} />
              <TextField label="Tipo" value={ev.tipo} onChange={(v) => { const c = structuredClone(config); c.home.eventos[i].tipo = v; setConfig(c); }} />
              <TextField label="Dia" value={ev.dia} onChange={(v) => { const c = structuredClone(config); c.home.eventos[i].dia = v; setConfig(c); }} />
              <TextField label="Horário" value={ev.horario} onChange={(v) => { const c = structuredClone(config); c.home.eventos[i].horario = v; setConfig(c); }} />
              <TextField label="Local" value={ev.local} onChange={(v) => { const c = structuredClone(config); c.home.eventos[i].local = v; setConfig(c); }} />
            </div>
            <ImageField label="Imagem" value={ev.imagem} onChange={(v) => { const c = structuredClone(config); c.home.eventos[i].imagem = v; setConfig(c); }} />
          </div>
        ))}
        <button onClick={() => {
          const c = structuredClone(config);
          c.home.eventos.push({ id: Date.now(), titulo: '', tipo: '', dia: '', horario: '', local: '', imagem: '' });
          setConfig(c);
        }} className="flex items-center gap-2 text-sacred-gold text-xs font-bold uppercase tracking-wider hover:text-sacred-dark transition-colors">
          <Plus size={14} /> Adicionar Evento
        </button>
      </SectionCard>
    </div>
  );
}

function CampanhasEditor({ config, setConfig }) {
  return (
    <div className="space-y-6">
      <SectionCard title="Campanhas de Doação">
        {config.campanhas.map((camp, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50/50">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-sacred-gold uppercase tracking-wider">{camp.titulo || `Campanha ${i + 1}`}</span>
              <button onClick={() => { const c = structuredClone(config); c.campanhas.splice(i, 1); setConfig(c); }}
                className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
            <TextField label="ID (slug)" value={camp.id} onChange={(v) => { const c = structuredClone(config); c.campanhas[i].id = v; setConfig(c); }} />
            <TextField label="Título" value={camp.titulo} onChange={(v) => { const c = structuredClone(config); c.campanhas[i].titulo = v; setConfig(c); }} />
            <TextArea label="Descrição Prévia" value={camp.previa} onChange={(v) => { const c = structuredClone(config); c.campanhas[i].previa = v; setConfig(c); }} rows={2} />
            <TextField label="Categoria" value={camp.categoria} onChange={(v) => { const c = structuredClone(config); c.campanhas[i].categoria = v; setConfig(c); }} />
            <ImageField label="Imagem" value={camp.imagem} onChange={(v) => { const c = structuredClone(config); c.campanhas[i].imagem = v; setConfig(c); }} />
          </div>
        ))}
        <button onClick={() => {
          const c = structuredClone(config);
          c.campanhas.push({ id: `campanha-${Date.now()}`, titulo: '', previa: '', imagem: '', categoria: '' });
          setConfig(c);
        }} className="flex items-center gap-2 text-sacred-gold text-xs font-bold uppercase tracking-wider hover:text-sacred-dark transition-colors">
          <Plus size={14} /> Adicionar Campanha
        </button>
      </SectionCard>
    </div>
  );
}

function DoacoesEditor({ config, setConfig }) {
  const d = config.doacoes;
  return (
    <div className="space-y-6">
      <SectionCard title="Página de Doações">
        <TextField label="Subtítulo do Hero" value={d.heroSubtitulo} onChange={(v) => { const c = structuredClone(config); c.doacoes.heroSubtitulo = v; setConfig(c); }} />
        <TextField label="Título do Hero" value={d.heroTitulo} onChange={(v) => { const c = structuredClone(config); c.doacoes.heroTitulo = v; setConfig(c); }} icon={Type} />
        <TextArea label="Descrição do Hero" value={d.heroDescricao} onChange={(v) => { const c = structuredClone(config); c.doacoes.heroDescricao = v; setConfig(c); }} />
        <ImageField label="Imagem de Fundo" value={d.heroImagem} onChange={(v) => { const c = structuredClone(config); c.doacoes.heroImagem = v; setConfig(c); }} />
      </SectionCard>
      <SectionCard title="Categorias de Doação">
        {d.categorias.map((cat, i) => (
          <div key={i} className="flex gap-3 items-end">
            <div className="flex-1"><TextField label={`Categoria ${i + 1}`} value={cat} onChange={(v) => { const c = structuredClone(config); c.doacoes.categorias[i] = v; setConfig(c); }} /></div>
            <button onClick={() => { const c = structuredClone(config); c.doacoes.categorias.splice(i, 1); setConfig(c); }}
              className="p-3 text-red-400 hover:bg-red-50 rounded-lg transition-colors mb-0.5"><Trash2 size={16} /></button>
          </div>
        ))}
        <button onClick={() => { const c = structuredClone(config); c.doacoes.categorias.push(''); setConfig(c); }}
          className="flex items-center gap-2 text-sacred-gold text-xs font-bold uppercase tracking-wider hover:text-sacred-dark transition-colors">
          <Plus size={14} /> Adicionar Categoria
        </button>
      </SectionCard>
    </div>
  );
}

function ContatoEditor({ config, setConfig }) {
  const ct = config.contato;
  return (
    <div className="space-y-6">
      <SectionCard title="Informações de Contato">
        <TextArea label="Endereço Completo" value={ct.endereco} onChange={(v) => { const c = structuredClone(config); c.contato.endereco = v; setConfig(c); }} rows={2} />
        <TextField label="Telefone" value={ct.telefone} onChange={(v) => { const c = structuredClone(config); c.contato.telefone = v; setConfig(c); }} />
        <TextField label="E-mail" value={ct.email} onChange={(v) => { const c = structuredClone(config); c.contato.email = v; setConfig(c); }} />
        <TextField label="Link Google Maps" value={ct.googleMapsUrl} onChange={(v) => { const c = structuredClone(config); c.contato.googleMapsUrl = v; setConfig(c); }} />
      </SectionCard>
      <SectionCard title="Horários de Funcionamento">
        {ct.horarios.map((h, i) => (
          <div key={i} className="flex gap-3 items-end">
            <div className="flex-1"><TextField label="Dia" value={h.dia} onChange={(v) => { const c = structuredClone(config); c.contato.horarios[i].dia = v; setConfig(c); }} /></div>
            <div className="flex-1"><TextField label="Capela" value={h.capela} onChange={(v) => { const c = structuredClone(config); c.contato.horarios[i].capela = v; setConfig(c); }} /></div>
            <div className="flex-1"><TextField label="Secretaria" value={h.secretaria} onChange={(v) => { const c = structuredClone(config); c.contato.horarios[i].secretaria = v; setConfig(c); }} /></div>
          </div>
        ))}
      </SectionCard>
      <SectionCard title="Missas e Celebrações (Página Contato)">
        {ct.missas.map((m, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50/50">
            <TextField label="Dia" value={m.dia} onChange={(v) => { const c = structuredClone(config); c.contato.missas[i].dia = v; setConfig(c); }} />
            <div className="flex gap-2 flex-wrap">
              {m.horarios.map((h, j) => (
                <div key={j} className="flex items-center gap-1">
                  <input type="text" value={h} onChange={(e) => { const c = structuredClone(config); c.contato.missas[i].horarios[j] = e.target.value; setConfig(c); }}
                    className="w-20 bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm text-center focus:outline-none focus:border-sacred-gold" />
                  <button onClick={() => { const c = structuredClone(config); c.contato.missas[i].horarios.splice(j, 1); setConfig(c); }}
                    className="text-red-400 hover:text-red-600"><Trash2 size={12} /></button>
                </div>
              ))}
              <button onClick={() => { const c = structuredClone(config); c.contato.missas[i].horarios.push(''); setConfig(c); }}
                className="w-20 border border-dashed border-sacred-gold/30 rounded-lg p-2 text-sacred-gold text-xs text-center hover:bg-sacred-gold/5"><Plus size={12} className="mx-auto" /></button>
            </div>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}

function SobreEditor({ config, setConfig }) {
  const sb = config.sobre;
  return (
    <div className="space-y-6">
      <SectionCard title="Hero da Página Sobre">
        <TextField label="Título" value={sb.heroTitulo} onChange={(v) => { const c = structuredClone(config); c.sobre.heroTitulo = v; setConfig(c); }} icon={Type} />
        <ImageField label="Imagem de Fundo" value={sb.heroImagem} onChange={(v) => { const c = structuredClone(config); c.sobre.heroImagem = v; setConfig(c); }} />
      </SectionCard>
      <SectionCard title="Seção Comunidade">
        <TextField label="Subtítulo" value={sb.comunidade.subtitulo} onChange={(v) => { const c = structuredClone(config); c.sobre.comunidade.subtitulo = v; setConfig(c); }} />
        <TextField label="Título" value={sb.comunidade.titulo} onChange={(v) => { const c = structuredClone(config); c.sobre.comunidade.titulo = v; setConfig(c); }} icon={Type} />
        {sb.comunidade.paragrafos.map((p, i) => (
          <TextArea key={i} label={`Parágrafo ${i + 1}`} value={p} onChange={(v) => { const c = structuredClone(config); c.sobre.comunidade.paragrafos[i] = v; setConfig(c); }} rows={3} />
        ))}
        <ImageField label="Imagem" value={sb.comunidade.imagem} onChange={(v) => { const c = structuredClone(config); c.sobre.comunidade.imagem = v; setConfig(c); }} />
      </SectionCard>
      <SectionCard title="Seção Nossa História">
        <TextField label="Subtítulo" value={sb.historia.subtitulo} onChange={(v) => { const c = structuredClone(config); c.sobre.historia.subtitulo = v; setConfig(c); }} />
        <TextField label="Título" value={sb.historia.titulo} onChange={(v) => { const c = structuredClone(config); c.sobre.historia.titulo = v; setConfig(c); }} icon={Type} />
        {sb.historia.paragrafos.map((p, i) => (
          <TextArea key={i} label={`Parágrafo ${i + 1}`} value={p} onChange={(v) => { const c = structuredClone(config); c.sobre.historia.paragrafos[i] = v; setConfig(c); }} rows={3} />
        ))}
        <ImageField label="Imagem" value={sb.historia.imagem} onChange={(v) => { const c = structuredClone(config); c.sobre.historia.imagem = v; setConfig(c); }} />
      </SectionCard>
    </div>
  );
}

function FooterEditor({ config, setConfig }) {
  const ft = config.footer;
  return (
    <div className="space-y-6">
      <SectionCard title="Rodapé — Geral">
        <TextArea label="Descrição" value={ft.descricao} onChange={(v) => { const c = structuredClone(config); c.footer.descricao = v; setConfig(c); }} rows={3} />
        <TextField label="Texto de Copyright" value={ft.copyright} onChange={(v) => { const c = structuredClone(config); c.footer.copyright = v; setConfig(c); }} />
        <TextField label="Crédito" value={ft.credito} onChange={(v) => { const c = structuredClone(config); c.footer.credito = v; setConfig(c); }} />
      </SectionCard>
      <SectionCard title="Redes Sociais (URLs)">
        <TextField label="Instagram" value={ft.redesSociais.instagram} onChange={(v) => { const c = structuredClone(config); c.footer.redesSociais.instagram = v; setConfig(c); }} />
        <TextField label="Telegram" value={ft.redesSociais.telegram} onChange={(v) => { const c = structuredClone(config); c.footer.redesSociais.telegram = v; setConfig(c); }} />
        <TextField label="YouTube" value={ft.redesSociais.youtube} onChange={(v) => { const c = structuredClone(config); c.footer.redesSociais.youtube = v; setConfig(c); }} />
      </SectionCard>
      <SectionCard title="Links Rápidos do Rodapé">
        {ft.linksRapidos.map((link, i) => (
          <div key={i} className="flex gap-3 items-end">
            <div className="flex-1"><TextField label="Nome" value={link.label} onChange={(v) => { const c = structuredClone(config); c.footer.linksRapidos[i].label = v; setConfig(c); }} /></div>
            <div className="flex-1"><TextField label="Link" value={link.href} onChange={(v) => { const c = structuredClone(config); c.footer.linksRapidos[i].href = v; setConfig(c); }} /></div>
            <button onClick={() => { const c = structuredClone(config); c.footer.linksRapidos.splice(i, 1); setConfig(c); }}
              className="p-3 text-red-400 hover:bg-red-50 rounded-lg transition-colors mb-0.5"><Trash2 size={16} /></button>
          </div>
        ))}
        <button onClick={() => { const c = structuredClone(config); c.footer.linksRapidos.push({ label: '', href: '/' }); setConfig(c); }}
          className="flex items-center gap-2 text-sacred-gold text-xs font-bold uppercase tracking-wider hover:text-sacred-dark transition-colors">
          <Plus size={14} /> Adicionar Link
        </button>
      </SectionCard>
      <SectionCard title="Horários no Rodapé">
        {ft.horarios.map((h, i) => (
          <div key={i} className="flex gap-3 items-end">
            <div className="flex-1"><TextField label="Dia" value={h.dia} onChange={(v) => { const c = structuredClone(config); c.footer.horarios[i].dia = v; setConfig(c); }} /></div>
            <div className="flex-1"><TextField label="Horário" value={h.horario} onChange={(v) => { const c = structuredClone(config); c.footer.horarios[i].horario = v; setConfig(c); }} /></div>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}

// ───── SIDEBAR NAV ─────
const SECTIONS = [
  { id: 'identidade', label: 'Identidade', icon: Church },
  { id: 'home', label: 'Página Inicial', icon: Home },
  { id: 'missas', label: 'Missas', icon: Calendar },
  { id: 'eventos', label: 'Eventos', icon: Calendar },
  { id: 'campanhas', label: 'Campanhas', icon: Heart },
  { id: 'doacoes', label: 'Doações', icon: DollarSign },
  { id: 'contato', label: 'Contato', icon: MapPin },
  { id: 'sobre', label: 'Sobre Nós', icon: Info },
  { id: 'footer', label: 'Rodapé', icon: Columns2 },
];

// ───── MAIN ADMIN PANEL ─────
export default function Admin() {
  const { config: originalConfig, updateConfig } = useSiteConfig();
  const storedToken = localStorage.getItem('admin_token') || '';
  const [token, setToken] = useState(storedToken);
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(!!storedToken);
  const [activeSection, setActiveSection] = useState('identidade');
  const [localConfig, setLocalConfig] = useState(() => originalConfig ? structuredClone(originalConfig) : null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Verify token on mount
  useEffect(() => {
    if (!storedToken) return;
    let cancelled = false;
    fetch(`${API_URL}/api/auth/verify`, { headers: { 'Authorization': `Bearer ${storedToken}` } })
      .then(res => res.json())
      .then(data => {
        if (cancelled) return;
        if (data.sucesso) { setAuthenticated(true); }
        else { localStorage.removeItem('admin_token'); setToken(''); }
      })
      .catch(() => { if (!cancelled) { localStorage.removeItem('admin_token'); setToken(''); } })
      .finally(() => { if (!cancelled) setChecking(false); });
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = (newToken) => { setToken(newToken); setAuthenticated(true); };

  const handleLogout = () => {
    fetch(`${API_URL}/api/auth/logout`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
    localStorage.removeItem('admin_token');
    setToken('');
    setAuthenticated(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await updateConfig(localConfig, token);
    setSaving(false);
    if (result.sucesso) {
      setToast({ type: 'success', message: 'Alterações salvas com sucesso!' });
    } else {
      setToast({ type: 'error', message: result.mensagem || 'Erro ao salvar.' });
    }
    setTimeout(() => setToast(null), 4000);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-sacred-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!authenticated) return <LoginScreen onLogin={handleLogin} />;
  if (!localConfig) return null;

  const renderSection = () => {
    switch (activeSection) {
      case 'identidade': return <IdentidadeEditor config={localConfig} setConfig={setLocalConfig} />;
      case 'home': return <HomeHeroEditor config={localConfig} setConfig={setLocalConfig} />;
      case 'missas': return <MissasEditor config={localConfig} setConfig={setLocalConfig} />;
      case 'eventos': return <EventosEditor config={localConfig} setConfig={setLocalConfig} />;
      case 'campanhas': return <CampanhasEditor config={localConfig} setConfig={setLocalConfig} />;
      case 'doacoes': return <DoacoesEditor config={localConfig} setConfig={setLocalConfig} />;
      case 'contato': return <ContatoEditor config={localConfig} setConfig={setLocalConfig} />;
      case 'sobre': return <SobreEditor config={localConfig} setConfig={setLocalConfig} />;
      case 'footer': return <FooterEditor config={localConfig} setConfig={setLocalConfig} />;
      default: return null;
    }
  };

  const currentSection = SECTIONS.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-sacred-beige flex">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-8 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl text-sm font-bold animate-slide-up ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          {toast.message}
        </div>
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-100 z-40 transition-transform duration-300 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sacred-gold rounded-2xl flex items-center justify-center shadow-lg shadow-sacred-gold/20">
              <Settings size={22} className="text-white" />
            </div>
            <div>
              <h2 className="font-headline text-lg text-sacred-dark leading-none mb-1">Painel Admin</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Gerenciador do Site</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => { setActiveSection(section.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                activeSection === section.id
                  ? 'bg-sacred-gold/10 text-sacred-gold'
                  : 'text-gray-400 hover:bg-gray-50 hover:text-sacred-dark'
              }`}
            >
              <section.icon size={18} />
              {section.label}
              {activeSection === section.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sacred-gold"></div>}
            </button>
          ))}
        </nav>

        <div className="p-6 space-y-3">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-50 hover:bg-sacred-dark hover:text-white transition-all">
            <Eye size={16} /> Ver Site
          </a>
          <button onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
            <LogOut size={16} /> Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen relative p-8 lg:p-16">
        {/* Mobile toggle */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-8 left-8 z-50 p-4 bg-sacred-gold text-white rounded-2xl shadow-2xl">
          <Settings size={24} />
        </button>

        {/* Global Save Button - Fixed at top right */}
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="fixed top-8 right-8 z-[60] flex items-center gap-3 px-8 py-4 bg-sacred-gold text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-sacred-dark transition-all disabled:opacity-50 shadow-2xl shadow-sacred-gold/30 ring-4 ring-white"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Save size={18} />
          )}
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="mb-12 flex items-center gap-4">
            <div className="p-3 bg-sacred-gold/10 rounded-xl text-sacred-gold">
               {currentSection && <currentSection.icon size={24} />}
            </div>
            <h1 className="font-headline text-4xl text-sacred-dark">{currentSection?.label}</h1>
          </div>
          
          {renderSection()}
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-sacred-dark/80 backdrop-blur-sm z-30" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
