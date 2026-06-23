# 🚀 PORTALONE — Guia de Deploy Completo

## Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                   PORTALONE                         │
│                                                     │
│  ┌─────────────────┐    ┌─────────────────┐         │
│  │   ECOMMERCE     │    │     ADMIN       │         │
│  │  (Netlify)      │    │   (Netlify)     │         │
│  │  Next.js 15     │    │   Next.js 15    │         │
│  │  portalone.app  │    │ admin.portal... │         │
│  └────────┬────────┘    └────────┬────────┘         │
│           │                     │                   │
│           └──────────┬──────────┘                   │
│                      ▼                              │
│           ┌─────────────────────┐                   │
│           │     BACKEND         │                   │
│           │  (Railway/Render)   │                   │
│           │  NestJS + Prisma    │                   │
│           │  SQLite → Postgres  │                   │
│           └─────────────────────┘                   │
└─────────────────────────────────────────────────────┘
```

---

## 1. Deploy do Backend (NestJS)

> ⚠️ O Netlify **NÃO** suporta Node.js persistente. Use Railway, Render ou Fly.io.

### Opção A: Railway (Recomendado — gratuito para começar)

1. Acesse [railway.app](https://railway.app) e crie uma conta
2. Clique em **New Project → Deploy from GitHub repo**
3. Selecione o repositório `PORTALONE`
4. Configure:
   - **Root Directory**: `apps/backend`
   - **Build Command**: `npm run build`
   - **Start Command**: `node dist/main`
5. Adicione um **PostgreSQL** plugin no Railway (gratuito)
6. Configure as variáveis de ambiente (copie de `apps/backend/.env.example`)
7. Railway gera a URL automaticamente: `https://portalone-backend.up.railway.app`

### Opção B: Render (Alternativa gratuita)

1. Acesse [render.com](https://render.com)
2. New → Web Service → Connect GitHub
3. Root Directory: `apps/backend`
4. Build: `npm install && npm run build`
5. Start: `node dist/main`
6. Adicione PostgreSQL via Render Database

### Variáveis de Ambiente Obrigatórias (Backend)

```env
DATABASE_URL=postgresql://user:pass@host:5432/portalone
NODE_ENV=production
PORT=3001
ECOMMERCE_URL=https://seusite.netlify.app
ADMIN_URL=https://admin-seusite.netlify.app
JWT_SECRET=<chave-aleatoria-minimo-32-chars>
```

### Migrar banco para produção

Após o primeiro deploy, execute no terminal do Railway/Render:
```bash
npx prisma migrate deploy
```

---

## 2. Deploy do Ecommerce (Netlify)

### Via Interface Web

1. Acesse [app.netlify.com](https://app.netlify.com)
2. **Add new site → Import an existing project**
3. Conecte o GitHub e selecione o repositório `PORTALONE`
4. Configure:
   - **Base directory**: `apps/ecommerce`
   - **Build command**: `npm run build`
   - **Publish directory**: `apps/ecommerce/.next`
5. Instale o plugin Next.js: **Site settings → Plugins → Add plugin → @netlify/plugin-nextjs**

### Variáveis de Ambiente (Netlify → Site configuration → Environment variables)

```env
NEXT_PUBLIC_API_URL=https://portalone-backend.up.railway.app
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://seusite.netlify.app
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

---

## 3. Deploy do Admin (Netlify — Site Separado)

### Via Interface Web

1. No Netlify: **Add new site → Import an existing project** (mesmo repo)
2. Configure:
   - **Base directory**: `apps/admin`
   - **Build command**: `npm run build`
   - **Publish directory**: `apps/admin/.next`

### 🔒 Proteger o Admin com senha (IMPORTANTE!)

1. Vá em **Site configuration → Visitors access → Password protection**
2. Ative e defina uma senha forte
3. Isso bloqueia qualquer acesso ao admin sem senha — camada extra de segurança

### Variáveis de Ambiente (Admin)

```env
NEXT_PUBLIC_API_URL=https://portalone-backend.up.railway.app
NEXT_PUBLIC_ECOMMERCE_URL=https://seusite.netlify.app
```

---

## 4. Via CLI (Alternativa rápida)

```bash
# Instalar CLI do Netlify
npm install -g netlify-cli

# Login
netlify login

# Deploy do Ecommerce
cd apps/ecommerce
netlify init
netlify deploy --prod

# Deploy do Admin (segundo site)
cd ../admin
netlify init
netlify deploy --prod
```

---

## 5. Configurar Domínio Personalizado

1. No painel do site no Netlify: **Domain management → Add domain**
2. Adicione seu domínio: ex. `portalone.com.br`
3. Aponte o DNS para os nameservers do Netlify
4. Netlify ativa HTTPS automaticamente via Let's Encrypt ✅

Sugestão de subdomínios:
- `portalone.com.br` → Ecommerce
- `admin.portalone.com.br` → Admin
- `api.portalone.com.br` → Backend (configure no Railway)

---

## 6. Checklist de Produção

- [ ] Backend deployado e URL anotada
- [ ] Banco de dados migrado (`prisma migrate deploy`)
- [ ] Variáveis de ambiente configuradas em todos os sites
- [ ] Domínio personalizado configurado
- [ ] HTTPS ativo (automático no Netlify)
- [ ] Admin protegido com senha (Netlify Password Protection)
- [ ] Chaves do Mercado Pago de **produção** inseridas (não sandbox)
- [ ] Webhook do Mercado Pago configurado: `https://api.seudominio.com.br/api/payments/mp/webhook`
- [ ] CORS do backend apontando para os domínios corretos
- [ ] Testar fluxo completo: Produto → Carrinho → Checkout → Pagamento PIX/Cartão

---

## 7. Monitoring e Logs

- **Netlify**: Logs disponíveis em **Site → Deploys → Functions**
- **Railway**: Logs em tempo real no dashboard
- **Erros**: Configure Sentry (gratuito) para monitorar erros em produção

---

## Resumo de Custos Estimados (plano gratuito)

| Serviço | Plano | Custo |
|---------|-------|-------|
| Netlify (Ecommerce) | Starter | Gratuito |
| Netlify (Admin) | Starter | Gratuito |
| Railway (Backend) | Trial/Hobby | ~$5/mês |
| Domínio .com.br | RegistroBR | ~R$40/ano |
| **Total** | | **~R$25-50/mês** |
