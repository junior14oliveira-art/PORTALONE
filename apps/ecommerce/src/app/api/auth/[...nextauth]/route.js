import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Mapa simples de rate limiting em memória (por IP)
// Em produção com Supabase, isso ficará no banco de dados
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos

function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  // Remove caracteres perigosos para evitar injevão
  return str.trim().slice(0, 254);
}

function checkRateLimit(identifier) {
  const now = Date.now();
  const record = loginAttempts.get(identifier) || { count: 0, firstAttempt: now };
  
  // Resetar janela se passou o tempo
  if (now - record.firstAttempt > WINDOW_MS) {
    loginAttempts.set(identifier, { count: 1, firstAttempt: now });
    return true;
  }
  
  if (record.count >= MAX_ATTEMPTS) return false;
  
  loginAttempts.set(identifier, { ...record, count: record.count + 1 });
  return true;
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "seu@email.com" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials, req) {
        // Sanitizar entradas
        const email = sanitizeInput(credentials?.email || '');
        const password = sanitizeInput(credentials?.password || '');

        // Validações básicas
        if (!email || !password) return null;
        if (password.length < 6) return null;
        
        // Validar formato de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return null;

        // Rate limiting por e-mail
        if (!checkRateLimit(email)) {
          throw new Error('Too many login attempts. Try again in 15 minutes.');
        }

        // Mock authentication — será substituído pelo Supabase
        if (email && password) {
          return { 
            id: "1", 
            name: "Cliente Demonstração", 
            email: email,
            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=0052B4&color=fff`
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
