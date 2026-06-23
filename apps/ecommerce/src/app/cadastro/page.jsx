"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    senha: '',
    confirmarSenha: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating API call for registration
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      // In a real app we would redirect or login automatically
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center bg-white p-8 rounded-xl shadow-sm border border-border">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand/10 mb-4">
            <svg className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Conta Criada com Sucesso!</h2>
          <p className="text-muted mb-6">Sua conta foi registrada e agora você faz parte da PORTALONE.</p>
          <Link href="/minha-conta" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-hover transition-colors">
            Fazer Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="flex justify-center mb-6 bg-black p-4 rounded-xl mx-auto w-fit">
          <Logo className="w-48 h-auto" />
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-foreground">
          Crie sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          Já tem uma conta?{' '}
          <Link href="/minha-conta" className="font-medium text-brand hover:text-brand-hover">
            Faça login aqui
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-border">
          <form className="space-y-5" onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label htmlFor="nome" className="block text-sm font-medium text-foreground">Nome Completo</label>
                <input
                  id="nome" name="nome" type="text" required
                  value={formData.nome} onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2.5 border border-border rounded-md shadow-sm placeholder-muted focus:outline-none focus:ring-brand focus:border-brand sm:text-sm bg-background text-foreground"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">E-mail</label>
                <input
                  id="email" name="email" type="email" required
                  value={formData.email} onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2.5 border border-border rounded-md shadow-sm placeholder-muted focus:outline-none focus:ring-brand focus:border-brand sm:text-sm bg-background text-foreground"
                />
              </div>

              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-foreground">CPF / CNPJ</label>
                <input
                  id="cpf" name="cpf" type="text" required
                  value={formData.cpf} onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2.5 border border-border rounded-md shadow-sm placeholder-muted focus:outline-none focus:ring-brand focus:border-brand sm:text-sm bg-background text-foreground"
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-foreground">Celular</label>
                <input
                  id="telefone" name="telefone" type="tel" required
                  value={formData.telefone} onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2.5 border border-border rounded-md shadow-sm placeholder-muted focus:outline-none focus:ring-brand focus:border-brand sm:text-sm bg-background text-foreground"
                />
              </div>

              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-foreground">Senha</label>
                <input
                  id="senha" name="senha" type="password" required
                  value={formData.senha} onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2.5 border border-border rounded-md shadow-sm placeholder-muted focus:outline-none focus:ring-brand focus:border-brand sm:text-sm bg-background text-foreground"
                />
              </div>

              <div>
                <label htmlFor="confirmarSenha" className="block text-sm font-medium text-foreground">Confirmar Senha</label>
                <input
                  id="confirmarSenha" name="confirmarSenha" type="password" required
                  value={formData.confirmarSenha} onChange={handleChange}
                  className="mt-1 appearance-none block w-full px-3 py-2.5 border border-border rounded-md shadow-sm placeholder-muted focus:outline-none focus:ring-brand focus:border-brand sm:text-sm bg-background text-foreground"
                />
              </div>
            </div>

            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input id="termos" name="termos" type="checkbox" required className="h-4 w-4 text-brand focus:ring-brand border-border rounded" />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="termos" className="text-muted">
                  Eu concordo com os <a href="#" className="text-brand hover:underline">Termos de Serviço</a> e <a href="#" className="text-brand hover:underline">Política de Privacidade</a>.
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-50"
              >
                {isLoading ? 'Criando conta...' : 'Cadastrar agora'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
