'use client'
import { useEffect } from 'react'
import { createClient } from './lib/supabase'

export default function Home() {
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) window.location.href = '/dashboard'
    })
  }, [])

  return (
    <main style={{ backgroundColor: '#1a0f2e', minHeight: '100vh', fontFamily: 'inherit' }}>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 32px', backgroundColor: '#2d1b4e', borderBottom: '0.5px solid rgba(255,255,255,0.15)' }}>
        <span style={{ color: '#fff', fontSize: '22px', fontWeight: '800' }}>Revelio</span>
        <a href="/login" style={{ border: '0.5px solid rgba(255,255,255,0.3)', color: '#fff', background: 'transparent', padding: '8px 20px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', textDecoration: 'none' }}>
          Entrar
        </a>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: '64px 32px 48px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', fontSize: '12px', padding: '4px 14px', borderRadius: '20px', marginBottom: '28px' }}>
          Assistente financeiro com IA
        </div>
        <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: '800', lineHeight: '1.15', margin: '0 0 16px', letterSpacing: '-0.5px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
          Sua vida financeira, finalmente organizada
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.6', maxWidth: '360px', margin: '0 auto 32px' }}>
          Converse com o Lio, registre seus gastos e receba conselhos personalizados para o seu perfil.
        </p>
        <a href="/login" style={{ background: '#F5C842', color: '#1a0f2e', border: 'none', padding: '13px 32px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
          Começar grátis →
        </a>
      </section>

      {/* DIVIDER */}
      <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.08)', margin: '0 32px' }} />

      {/* LIO */}
      <section style={{ padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }}>
        <div>
          <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', margin: '0 0 8px' }}>Conheça o Lio</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: '1.6', margin: '0 0 16px' }}>
            Seu consultor financeiro pessoal. Ele aprende sobre sua vida e te ajuda do jeito certo — sem jargão, sem complicação.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {['Registra seus gastos', 'Dá conselhos personalizados', 'Fala sobre investimentos'].map(pill => (
              <span key={pill} style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.65)', fontSize: '12px', padding: '5px 12px', borderRadius: '20px' }}>
                {pill}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <img src="/lio.png" alt="Lio" className="lio-flutuando" style={{ width: '280px', height: 'auto' }} />
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '12px 12px 12px 2px', padding: '10px 14px', color: 'rgba(255,255,255,0.7)', fontSize: '12px', lineHeight: '1.5', maxWidth: '200px' }}>
            Olá! Vamos organizar suas finanças juntos?
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.08)', margin: '0 32px' }} />

      {/* COMO FUNCIONA */}
      <section style={{ padding: '48px 32px' }}>
        <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', margin: '0 0 28px', textAlign: 'center' }}>Como funciona</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { num: '01', title: 'Conte seus gastos', desc: 'Fale com o Lio como preferir — digitando ou conversando.' },
            { num: '02', title: 'Lio analisa tudo', desc: 'Ele organiza, categoriza e gera seu dashboard automaticamente.' },
            { num: '03', title: 'Você evolui', desc: 'Receba conselhos e dicas pensadas para o seu perfil de vida.' },
          ].map(step => (
            <div key={step.num} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px 16px' }}>
              <div style={{ color: '#F5C842', fontSize: '11px', fontWeight: '700', marginBottom: '10px' }}>{step.num}</div>
              <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: '700', margin: '0 0 6px' }}>{step.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', lineHeight: '1.5', margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.08)', margin: '0 32px' }} />

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '48px 32px 56px' }}>
        <a href="/login" style={{ background: '#F5C842', color: '#1a0f2e', border: 'none', padding: '13px 32px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
          Criar minha conta grátis →
        </a>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: '12px 0 0' }}>Sem cartão de crédito. Sem complicação.</p>
      </section>

    </main>
  )
}