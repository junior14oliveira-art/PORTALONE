'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [user, setUser]   = useState('');
  const [pass, setPass]   = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 600)); // simula validação

    // Credenciais provisórias — substituir por autenticação real com banco de dados
    if (user === 'admin' && pass === 'admin123') {
      localStorage.setItem('role', 'admin');
      router.push('/admin');
    } else {
      setError('Usuário ou senha incorretos.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#0052B4] flex items-center justify-center font-black text-white text-xl mb-4 shadow-lg shadow-blue-900/40">
            P1
          </div>
          <h1 className="text-white font-black text-2xl">Portal One</h1>
          <p className="text-white/40 text-sm mt-1">Painel Administrativo</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-white font-bold text-lg mb-6">Entrar no Admin</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wide">Usuário</label>
              <input
                type="text"
                value={user}
                onChange={e => setUser(e.target.value)}
                placeholder="admin"
                required
                autoComplete="username"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#23A79D] focus:border-transparent transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wide">Senha</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#23A79D] focus:border-transparent transition-all"
                />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors text-sm">
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-[#0052B4] hover:bg-[#003F8A] text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/30 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Entrando...
                </>
              ) : 'Entrar →'}
            </button>
          </form>

          {/* Credencial provisória visível */}
          <div className="mt-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <p className="text-amber-400 text-xs font-bold mb-1">⚠️ Acesso Provisório</p>
            <p className="text-amber-300/70 text-xs">Usuário: <span className="font-mono font-bold text-amber-300">admin</span></p>
            <p className="text-amber-300/70 text-xs">Senha: <span className="font-mono font-bold text-amber-300">admin123</span></p>
            <p className="text-amber-300/50 text-[10px] mt-1">Troque após conectar banco de dados.</p>
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          <Link href="/" className="hover:text-white/60 transition-colors">← Voltar ao site</Link>
        </p>
      </div>
    </div>
  );
}
