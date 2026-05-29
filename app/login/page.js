'use client'

import { useState } from 'react'
import { createClient } from '@/app/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [modo, setModo] = useState('entrar') // 'entrar' ou 'cadastrar'
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const supabase = createClient()

  async function handleSubmit() {
    setErro('')
    setCarregando(true)

    if (modo === 'cadastrar') {
      const { error } = await supabase.auth.signUp({ email, password: senha })
      if (error) setErro(error.message)
      else setErro('Verifique seu email para confirmar o cadastro!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
      if (error) setErro('Email ou senha incorretos.')
      else window.location.href = '/dashboard'
    }

    setCarregando(false)
  }

  return (
    <main style={{ backgroundColor: '#1a0f2e', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '400px' }}>
        
        <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', margin: '0 0 8px' }}>
          {modo === 'entrar' ? 'Bem-vinda de volta' : 'Criar conta'}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: '0 0 28px' }}>
          {modo === 'entrar' ? 'Entre na sua conta do Revelio' : 'Comece a organizar suas finanças'}
        </p>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
            style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            placeholder="••••••••"
            style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {erro && (
          <p style={{ color: erro.includes('Verifique') ? '#4ade80' : '#f87171', fontSize: '12px', margin: '0 0 16px' }}>{erro}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={carregando}
          style={{ width: '100%', background: '#F5C842', color: '#1a0f2e', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', marginBottom: '16px' }}
        >
          {carregando ? 'Aguarde...' : modo === 'entrar' ? 'Entrar' : 'Criar conta'}
        </button>

        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textAlign: 'center', margin: 0 }}>
          {modo === 'entrar' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <span
            onClick={() => setModo(modo === 'entrar' ? 'cadastrar' : 'entrar')}
            style={{ color: '#F5C842', cursor: 'pointer' }}
          >
            {modo === 'entrar' ? 'Cadastre-se' : 'Entrar'}
          </span>
        </p>

      </div>
    </main>
  )
}