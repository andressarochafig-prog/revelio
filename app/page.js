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
    <main style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'inherit' }}>

      {/* NAV BRANCA */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 100, borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
        <span style={{ color: '#1a0f2e', fontSize: '22px', fontWeight: '800' }}>Revelio</span>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="/onboarding" style={{ color: '#1a0f2e', fontSize: '12px', fontWeight: '700', textDecoration: 'none', letterSpacing: '1px' }}>CHAT COM O LIO</a>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', cursor: 'pointer' }}>
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#1a0f2e' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#1a0f2e' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#1a0f2e' }} />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(180deg, #9000a6 0%, #1a0f2e 100%)', borderRadius: '24px', margin: '12px', padding: '48px 24px 0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ maxWidth: '100%' }}>
          <h1 style={{ color: '#fff', fontSize: 'clamp(32px, 7vw, 52px)', fontWeight: '800', lineHeight: '1.05', margin: '0 0 16px', letterSpacing: '-1px' }}>
            Lio - Seu assistente financeiro
          </h1>
          <h2 style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(16px, 4vw, 22px)', fontWeight: '400', margin: '0 0 10px', lineHeight: '1.3' }}>
            Você sabe para onde vai o seu dinheiro?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(13px, 3vw, 15px)', lineHeight: '1.6', margin: '0 0 28px', maxWidth: '480px' }}>
            O Revelio organiza suas finanças automaticamente. Converse com o Lio e tenha clareza total sobre seus gastos.
          </p>
          <a href="/login" style={{ color: '#fff', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textDecoration: 'none', borderBottom: '2px solid #F5C842', paddingBottom: '2px' }}>
            COMEÇAR AGORA
          </a>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <img src="/lio.png" alt="Lio" className="lio-flutuando" style={{ width: 'clamp(140px, 35vw, 220px)', height: 'auto' }} />
        </div>
      </section>

      {/* SEÇÃO PROBLEMA */}
      <section style={{ padding: '56px 24px', backgroundColor: '#f5f5f5' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(144,0,166,0.08)', border: '0.5px solid rgba(144,0,166,0.2)', color: '#9000a6', fontSize: '11px', padding: '4px 14px', borderRadius: '20px', marginBottom: '12px' }}>O problema</div>
          <h2 style={{ color: '#1a0f2e', fontSize: 'clamp(18px, 5vw, 26px)', fontWeight: '800', margin: '0 0 10px' }}>A maioria das pessoas não controla suas finanças</h2>
          <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '14px', maxWidth: '380px', margin: '0 auto' }}>Não por falta de vontade. Por falta de uma ferramenta que realmente funcione.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', maxWidth: '800px', margin: '0 auto' }}>
          {[
            { emoji: '😰', title: 'Planilhas complicadas', desc: 'Difíceis de manter, fáceis de abandonar' },
            { emoji: '📊', title: 'Apps que não entendem você', desc: 'Sem contexto de vida, sem personalização' },
            { emoji: '💸', title: 'Fim do mês no vermelho', desc: 'Sem saber onde o dinheiro foi parar' },
          ].map(item => (
            <div key={item.title} style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '12px', padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.emoji}</div>
              <p style={{ color: '#1a0f2e', fontSize: '13px', fontWeight: '600', margin: '0 0 6px' }}>{item.title}</p>
              <p style={{ color: 'rgba(0,0,0,0.45)', fontSize: '12px', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO LIO */}
      <section style={{ padding: '56px 24px', backgroundColor: '#fff', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div>
            <div style={{ display: 'inline-block', background: 'rgba(144,0,166,0.08)', border: '0.5px solid rgba(144,0,166,0.2)', color: '#9000a6', fontSize: '11px', padding: '4px 14px', borderRadius: '20px', marginBottom: '14px' }}>Conheça o Lio</div>
            <h2 style={{ color: '#1a0f2e', fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: '800', margin: '0 0 12px' }}>Seu consultor financeiro pessoal</h2>
            <p style={{ color: 'rgba(0,0,0,0.55)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px' }}>O Lio aprende sobre a sua vida e te ajuda do jeito certo. Sem jargão, sem complicação.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Registra seus gastos', 'Dá conselhos personalizados', 'Fala sobre investimentos', 'Alerta sobre gastos altos'].map(p => (
                <span key={p} style={{ background: 'rgba(144,0,166,0.08)', border: '0.5px solid rgba(144,0,166,0.2)', color: '#9000a6', fontSize: '11px', padding: '4px 12px', borderRadius: '20px' }}>{p}</span>
              ))}
            </div>
          </div>
          <div style={{ background: '#f5f5f5', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', paddingBottom: '12px', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
              <img src="/lio.png" alt="Lio" style={{ width: '28px', height: 'auto' }} />
              <span style={{ color: '#1a0f2e', fontSize: '13px', fontWeight: '600' }}>Lio</span>
              <span style={{ color: '#16a34a', fontSize: '10px' }}>● online</span>
            </div>
            <div style={{ background: '#fff', borderRadius: '12px 12px 12px 2px', padding: '10px 14px', fontSize: '13px', color: '#1a0f2e', marginBottom: '8px', border: '0.5px solid rgba(0,0,0,0.06)' }}>
              Olá! Me conta seus gastos do mês como preferir 😊
            </div>
            <div style={{ background: '#9000a6', borderRadius: '12px 12px 2px 12px', padding: '10px 14px', fontSize: '13px', color: '#fff', textAlign: 'right', marginBottom: '8px' }}>
              mercado 320, uber 45, ifood 35
            </div>
            <div style={{ background: '#fff', borderRadius: '12px 12px 12px 2px', padding: '10px 14px', fontSize: '13px', color: '#1a0f2e', border: '0.5px solid rgba(0,0,0,0.06)' }}>
              Entendi! Você gastou R$400. Quer dicas para economizar? 🎯
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ padding: '56px 24px', backgroundColor: '#f5f5f5', borderTop: '0.5px solid rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(144,0,166,0.08)', border: '0.5px solid rgba(144,0,166,0.2)', color: '#9000a6', fontSize: '11px', padding: '4px 14px', borderRadius: '20px', marginBottom: '12px' }}>Como funciona</div>
          <h2 style={{ color: '#1a0f2e', fontSize: 'clamp(18px, 5vw, 26px)', fontWeight: '800', margin: 0 }}>Simples assim</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', maxWidth: '800px', margin: '0 auto' }}>
          {[
            { num: '01', title: 'Crie sua conta', desc: 'Cadastro em menos de 1 minuto. Sem cartão de crédito.' },
            { num: '02', title: 'Conte seus gastos ao Lio', desc: 'Escreva como preferir. O Lio entende e organiza tudo.' },
            { num: '03', title: 'Evolua suas finanças', desc: 'Dashboard atualizado e conselhos personalizados.' },
          ].map(step => (
            <div key={step.num} style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: '12px', padding: '24px 20px' }}>
              <div style={{ color: '#9000a6', fontSize: '11px', fontWeight: '700', marginBottom: '10px' }}>{step.num}</div>
              <h3 style={{ color: '#1a0f2e', fontSize: '14px', fontWeight: '700', margin: '0 0 6px' }}>{step.title}</h3>
              <p style={{ color: 'rgba(0,0,0,0.45)', fontSize: '12px', margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '72px 24px', textAlign: 'center', background: 'linear-gradient(180deg, #9000a6 0%, #1a0f2e 100%)', borderRadius: '24px', margin: '0 12px 12px' }}>
        <h2 style={{ color: '#fff', fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: '800', margin: '0 0 12px' }}>Comece hoje, de graça</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', margin: '0 auto 32px', maxWidth: '360px' }}>Sua vida financeira organizada em menos de 5 minutos.</p>
        <a href="/login" style={{ display: 'inline-block', background: '#F5C842', color: '#1a0f2e', padding: '14px 36px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', textDecoration: 'none' }}>
          Criar minha conta grátis →
        </a>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '12px' }}>Sem cartão de crédito. Sem complicação.</p>
      </section>

    </main>
  )
}