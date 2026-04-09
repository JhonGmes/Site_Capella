require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Supabase Setup ---
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_KEY || 'placeholder'
);

// --- Security Middleware ---
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*'
}));
app.use(express.json({ limit: '5mb' }));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas
  message: { sucesso: false, mensagem: 'Muitas tentativas de login. Tente novamente em 15 minutos.' }
});

// --- Helpers ---
async function readConfig() {
  const { data, error } = await supabase
    .from('site_configs')
    .select('config')
    .single();
  
  if (error) {
    console.error('Erro Supabase (Read):', error);
    // Caso a tabela esteja vazia, retornar um erro ou fallback
    throw new Error('Não foi possível carregar as configurações do banco.');
  }
  return data.config;
}

async function writeConfig(config) {
  const { error } = await supabase
    .from('site_configs')
    .upsert({ id: 1, config, updated_at: new Date() });

  if (error) {
    console.error('Erro Supabase (Write):', error);
    throw new Error('Erro ao salvar no banco de dados.');
  }
}

// --- Auth Middleware ---
const JWT_SECRET = process.env.ADMIN_SECRET || 'capela-secret-2026';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ erro: 'Sessão expirada ou token inválido.' });
  }
}

// --- Auth Routes ---
app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const { usuario, senha } = req.body;
  const ADMIN_USER = process.env.ADMIN_USER || 'admin';
  const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH;

  // Verificação simples se o hash existe no .env
  if (!ADMIN_PASS_HASH) {
    return res.status(500).json({ sucesso: false, mensagem: 'Erro de configuração no servidor.' });
  }

  if (usuario === ADMIN_USER) {
    const validPass = await bcrypt.compare(senha, ADMIN_PASS_HASH);
    if (validPass) {
      const token = jwt.sign({ user: usuario }, JWT_SECRET, { expiresIn: '8h' });
      return res.json({ sucesso: true, token, mensagem: 'Bem-vindo ao Painel Admin!' });
    }
  }
  
  res.status(401).json({ sucesso: false, mensagem: 'Usuário ou senha incorretos.' });
});

app.get('/api/auth/verify', authMiddleware, (req, res) => {
  res.json({ sucesso: true, mensagem: 'Token válido.' });
});

// --- Config Routes ---
app.get('/api/config', async (req, res) => {
  try {
    const config = await readConfig();
    res.json(config);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.post('/api/config', authMiddleware, async (req, res) => {
  try {
    await writeConfig(req.body);
    res.json({ sucesso: true, mensagem: 'Configurações salvas no Supabase!' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// --- Utils (Gerar Hash Inicial) ---
app.get('/api/utils/hash-password', (req, res) => {
  const pass = req.query.pass;
  if (!pass) return res.send('Envie ?pass=suasenha para gerar o hash');
  bcrypt.hash(pass, 10, (err, hash) => {
    res.send(`Seu novo ADMIN_PASS_HASH: ${hash}`);
  });
});

app.get('/', (req, res) => {
  res.send('API do Hub Digital funcionando com Supabase!');
});

app.post('/api/doacao/pix', (req, res) => {
  const { valor, categoria } = req.body;
  res.json({
    sucesso: true,
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=CHAVE_PIX_EXEMPLO_${categoria}_${valor}`,
    chaveCopiaCola: `00020101021226580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865405${valor || '10.00'}5802BR5913Igreja Hub6008BRASILIA62070503***6304ED13`,
    mensagem: 'QR Code gerado com sucesso.'
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
  });
}

module.exports = app;
