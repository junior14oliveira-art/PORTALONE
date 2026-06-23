/** @type {import('next').NextConfig} */
const nextConfig = {
  // Headers de segurança HTTP reforçados
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), payment=()',
          },
          // Proteção contra clickjacking e leaks de origem
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // unsafe-inline necessário para Tailwind CSS / Next.js inline styles
              // unsafe-eval REMOVIDO para bloquear XSS
              "script-src 'self' 'unsafe-inline' https://accounts.google.com https://apis.google.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://* http://*",
              // Conexões permitidas: Google OAuth, ViaCEP para frete, Supabase (futuro)
              "connect-src 'self' https://accounts.google.com https://oauth2.googleapis.com https://viacep.com.br https://*.supabase.co",
              "frame-src 'self' https://accounts.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://accounts.google.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  // Bloquear acesso direto a arquivos sensíveis
  async redirects() {
    return [
      {
        source: '/.env',
        destination: '/',
        permanent: true,
      },
      {
        source: '/.env.local',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
