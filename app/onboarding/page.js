'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '../lib/supabase'

export default function Onboarding() {
  const [mensagens, setMensagens] = useState([])
  const [input, setInput] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [perfil, setPerfil] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    async function carregarPerfil() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const { data } = await supabase.from('perfis').select('*').eq('user_id', user.id).single()
      setPerfil(data)

      if (data) {
        setMensagens([{
          role: 'assistant',
          content: `Olá, ${data.nome}! 😊 Que bom te ver por aqui! Sou o Lio, seu assistente financeiro pessoal.\n\nMe conta seus gastos do mês como preferir — pode escrever direto, tipo: mercado, uber, ifood e os valores.`
        }])
      }
    }
    carregarPerfil()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensagens])

  async function enviar() {
    if (!input.trim() || carregando) return

    const novasMensagens = [...mensagens, { role: 'user', content: input }]
    setMensagens(novasMensagens)
    setInput('')
    setCarregando(true)

    const res = await fetch('/api/lio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensagens: novasMensagens, perfil })
    })

    const { resposta } = await res.json()
    setMensagens(prev => [...prev, { role: 'assistant', content: resposta }])
    setCarregando(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      enviar()
    }
  }

  return (
    <main style={{ backgroundColor: '#1a0f2e', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'inherit' }}>

      {/* HEADER FIXO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '0.5px solid rgba(255,255,255,0.1)', backgroundColor: '#2d1b4e', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/lio.png" alt="Lio" className="lio-flutuando" style={{ width: '40px', height: 'auto' }} />
          <div>
            <p style={{ color: '#fff', fontSize: '15px', fontWeight: '800', margin: 0 }}>Lio</p>
            <p style={{ color: '#4ade80', fontSize: '11px', margin: 0 }}>● online</p>
          </div>
        </div>
        <a href="/dashboard" style={{ background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.15)', color: '#fff', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: '600' }}>
          Ver dashboard →
        </a>
      </div>

      {/* MENSAGENS */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {mensagens.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px', alignItems: 'flex-end' }}>
            {msg.role === 'assistant' && (
              <img src="/lio.png" alt="Lio" style={{ width: '32px', height: 'auto', flexShrink: 0 }} />
            )}
            <div style={{
              background: msg.role === 'user' ? '#F5C842' : 'rgba(255,255,255,0.08)',
              color: msg.role === 'user' ? '#1a0f2e' : '#fff',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              maxWidth: '75%',
              fontSize: '14px',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {carregando && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
            <img src="/lio.png" alt="Lio" style={{ width: '32px', height: 'auto' }} />
            <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px 16px', borderRadius: '16px 16px 16px 4px', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
              Lio está digitando...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div style={{ padding: '16px', borderTop: '0.5px solid rgba(255,255,255,0.1)', display: 'flex', gap: '8px', backgroundColor: '#1a0f2e' }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escreva seus gastos ou pergunte algo..."
          rows={1}
          style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px 16px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'none', fontFamily: 'inherit' }}
        />
        <button onClick={enviar} disabled={carregando || !input.trim()}
          style={{ background: '#F5C842', border: 'none', borderRadius: '12px', padding: '12px 20px', cursor: 'pointer', fontSize: '18px', opacity: carregando || !input.trim() ? 0.5 : 1 }}>
          →
        </button>
      </div>

    </main>
  )
}