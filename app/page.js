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
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 32px', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <span style={{ color: '#1a0f2e', fontSize: '22px', fontWeight: '800', fontStyle: 'italic' }}>Revelio</span>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="/onboarding" style={{ color: '#1a0f2e', fontSize: '13px', fontWeight: '600', textDecoration: 'none', letterSpacing: '0.5px' }}>CHAT COM O LIO</a>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer' }}>
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#1a0f2e', borderRadius: '2px' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#1a0f2e', borderRadius: '2px' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#1a0f2e', borderRadius: '2px' }} />
          </div>
        </div>
      </nav>

      {/* HERO COM GRADIENTE */}
      <section style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 40%, #1a0f2e 100%)', padding: '80px 32px', borderRadius: '0 0 32px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', minHeight: '480px' }}>
        <div style={{ maxWidth: '520px' }}>
          <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: '800', lineHeight: '1.1', margin: '0 0 16px', letterSpacing: '-1px' }}>
            Lio — Seu assistente financeiro
          </h1>
          <h2 style={{ color: 'rgba(255,255,255,0.85)', fontSize: '22px', fontWeight: '400', margin: '0 0 12px' }}>
            Você sabe para onde vai o seu dinheiro?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: '1.6', margin: '0 0 32px' }}>
            O Revelio organiza suas finanças automaticamente. Converse com o Lio e tenha clareza total sobre seus gastos.
          </p>
          <a href="/login" style={{ display: 'inline-block', color: '#fff', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textDecoration: 'none', borderBottom: '2px solid #F5C842', paddingBottom: '2px' }}>
            COMEÇAR AGORA
          </a>
        </div>
        <img src="/lio.png" alt="Lio" className="lio-flutuando" style={{ width: '280px', height: 'auto', flexShrink: 0 }} />
      </section>

      {/* SEÇÃO PROBLEMA */}
      <section style={{ padding: '72px 32px', backgroundColor: '#1a0f2e' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: '11px', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>O problema</div>
          <h2 style={{ color: '#fff', fontSize: '26px', fontWeight: '800', margin: '0 0 12px' }}>A maioria das pessoas não controla suas finanças</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>Não por falta de vontade. Por falta de uma ferramenta que realmente funcione.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', maxWidth: '800px', margin: '0 auto' }}>
          {[
            { emoji: '😰', title: 'Planilhas complicadas', desc: 'Difíceis de manter, fáceis de abandonar' },
            { emoji: '📊', title: 'Apps que não entendem você', desc: 'Sem contexto de vida, sem personalização' },
            { emoji: '💸', title: 'Fim do mês no vermelho', desc: 'Sem saber onde o dinheiro foi parar' },
          ].map(item => (
            <div key={item.title} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{item.emoji}</div>
              <p style={{ color: '#fff', fontSize: '13px', fontWeight: '600', margin: '0 0 6px' }}>{item.title}</p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO LIO */}
      <section style={{ padding: '72px 32px', backgroundColor: 'rgba(255,255,255,0.02)', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: '11px', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>Conheça o Lio</div>
            <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '800', margin: '0 0 12px' }}>Seu consultor financeiro pessoal</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px' }}>O Lio aprende sobre a sua vida e te ajuda do jeito certo. Sem jargão, sem complicação.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Registra seus gastos', 'Dá conselhos personalizados', 'Fala sobre investimentos', 'Alerta sobre gastos altos'].map(p => (
                <span key={p} style={{ background: 'rgba(245,200,66,0.12)', border: '0.5px solid rgba(245,200,66,0.3)', color: '#F5C842', fontSize: '11px', padding: '4px 12px', borderRadius: '20px' }}>{p}</span>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
              <img src="/lio.png" alt="Lio" style={{ width: '28px', height: 'auto' }} />
              <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>Lio</span>
              <span style={{ color: '#4ade80', fontSize: '10px' }}>● online</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px 12px 12px 2px', padding: '10px 14px', fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
              Olá! Me conta seus gastos do mês como preferir 😊
            </div>
            <div style={{ background: '#F5C842', borderRadius: '12px 12px 2px 12px', padding: '10px 14px', fontSize: '13px', color: '#1a0f2e', textAlign: 'right', marginBottom: '8px' }}>
              mercado 320, uber 45, ifood 35
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '12px 12px 12px 2px', padding: '10px 14px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
              Entendi! Você gastou R$400. Com sua renda, ainda tem bastante disponível. Quer dicas para economizar? 🎯
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ padding: '72px 32px', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: '11px', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>Como funciona</div>
          <h2 style={{ color: '#fff', fontSize: '26px', fontWeight: '800', margin: 0 }}>Simples assim</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', maxWidth: '800px', margin: '0 auto' }}>
          {[
            { num: '01', title: 'Crie sua conta', desc: 'Cadastro em menos de 1 minuto. Sem cartão de crédito.' },
            { num: '02', title: 'Conte seus gastos ao Lio', desc: 'Escreva como preferir. O Lio entende e organiza tudo.' },
            { num: '03', title: 'Evolua suas finanças', desc: 'Dashboard atualizado e conselhos personalizados.' },
          ].map(step => (
            <div key={step.num} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '24px 20px' }}>
              <div style={{ color: '#F5C842', fontSize: '11px', fontWeight: '700', marginBottom: '10px' }}>{step.num}</div>
              <h3 style={{ color: '#fff', fontSize: '14px', fontWeight: '700', margin: '0 0 6px' }}>{step.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POR QUE O REVELIO */}
      <section style={{ padding: '72px 32px', backgroundColor: 'rgba(255,255,255,0.02)', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontSize: '11px', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>Por que o Revelio?</div>
            <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '800', margin: '0 0 20px' }}>Feito para quem nunca controlou finanças</h2>
            <div style={{ borderLeft: '2px solid #F5C842', paddingLeft: '16px', marginBottom: '16px' }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: 0 }}>Sem jargão financeiro. Sem planilha. Só uma conversa com o Lio.</p>
            </div>
            <div style={{ borderLeft: '2px solid #F5C842', paddingLeft: '16px' }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', margin: 0 }}>Personalizado pra sua realidade — seja você solteiro, casado ou sustentando uma família.</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { num: '100%', label: 'gratuito pra começar' },
              { num: 'IA', label: 'personalizada pra você' },
              { num: '🔒', label: 'dados seguros' },
              { num: '24/7', label: 'Lio sempre disponível' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#F5C842', marginBottom: '4px' }}>{s.num}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '80px 32px', textAlign: 'center', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
        <h2 style={{ color: '#fff', fontSize: '28px', fontWeight: '800', margin: '0 0 12px' }}>Comece hoje, de graça</h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: '0 auto 32px', maxWidth: '360px' }}>Sua vida financeira organizada em menos de 5 minutos.</p>
        <a href="/login" style={{ display: 'inline-block', background: '#F5C842', color: '#1a0f2e', border: 'none', padding: '14px 36px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', textDecoration: 'none' }}>
          Criar minha conta grátis →
        </a>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginTop: '12px' }}>Sem cartão de crédito. Sem complicação.</p>
      </section>

    </main>
  )
}