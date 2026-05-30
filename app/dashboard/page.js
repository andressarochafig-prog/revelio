'use client'
import { useState, useEffect } from 'react'
import { createClient } from '../lib/supabase'

function CategoriaAccordion({ categorias, gastos, totalGastos }) {
  const [aberta, setAberta] = useState(null)

  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
      <p style={{ color: '#fff', fontSize: '13px', fontWeight: '600', margin: '0 0 16px' }}>Gastos por categoria</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {Object.entries(categorias).sort((a, b) => b[1] - a[1]).map(([cat, val]) => {
          const itens = gastos.filter(g => g.categoria === cat)
          const estaAberta = aberta === cat
          return (
            <div key={cat} style={{ border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '8px', overflow: 'hidden' }}>
              <div
                onClick={() => setAberta(estaAberta ? null : cat)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', cursor: 'pointer', background: estaAberta ? 'rgba(255,255,255,0.06)' : 'transparent' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: estaAberta ? '#F5C842' : 'rgba(255,255,255,0.7)', fontSize: '13px', textTransform: 'capitalize', fontWeight: estaAberta ? '700' : '400' }}>{cat}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>R$ {val.toLocaleString('pt-BR')}</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{estaAberta ? '▲' : '▼'}</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', height: '3px' }}>
                <div style={{ background: '#F5C842', width: `${(val / totalGastos) * 100}%`, height: '100%' }} />
              </div>
              {estaAberta && (
                <div style={{ padding: '8px 14px 12px' }}>
                  {itens.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', textTransform: 'capitalize' }}>{item.descricao}</span>
                      <span style={{ color: '#ef4444', fontSize: '12px' }}>- R$ {item.valor.toLocaleString('pt-BR')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [perfil, setPerfil] = useState(null)
  const [gastos, setGastos] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregar() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }

      const agora = new Date()
      const [{ data: perfilData }, { data: gastosData }] = await Promise.all([
        supabase.from('perfis').select('*').eq('user_id', user.id).single(),
        supabase.from('gastos').select('*').eq('user_id', user.id).eq('mes', agora.getMonth() + 1).eq('ano', agora.getFullYear())
      ])

      setPerfil(perfilData)
      setGastos(gastosData || [])
      setCarregando(false)
    }
    carregar()
  }, [])

  if (carregando) return (
    <main style={{ backgroundColor: '#1a0f2e', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.5)' }}>Carregando...</p>
    </main>
  )

  const totalGastos = gastos.reduce((acc, g) => acc + g.valor, 0)
  const saldo = perfil ? perfil.renda - totalGastos : 0
  const percentualGasto = perfil ? (totalGastos / perfil.renda) * 100 : 0

  const status = percentualGasto > 90 ? 'vermelho' : percentualGasto > 70 ? 'laranja' : 'verde'
  const corStatus = status === 'vermelho' ? '#ef4444' : status === 'laranja' ? '#f97316' : '#22c55e'
  const mensagemStatus = status === 'vermelho' ? 'Atenção! Seus gastos estão muito altos' : status === 'laranja' ? 'Seus gastos estão na média' : 'Você está indo bem!'

  const categorias = gastos.reduce((acc, g) => {
    acc[g.categoria] = (acc[g.categoria] || 0) + g.valor
    return acc
  }, {})

  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  const mesAtual = meses[new Date().getMonth()]

  return (
    <main style={{ backgroundColor: '#1a0f2e', minHeight: '100vh', fontFamily: 'inherit' }}>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', backgroundColor: '#2d1b4e', borderBottom: '0.5px solid rgba(255,255,255,0.15)' }}>
        <span style={{ color: '#fff', fontSize: '18px', fontWeight: '800' }}>Revelio</span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a href="/onboarding" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textDecoration: 'none' }}>Chat com Lio</a>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>{perfil?.nome}</span>
        </div>
      </nav>

      <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* STATUS */}
        <div style={{ background: `rgba(${status === 'vermelho' ? '239,68,68' : status === 'laranja' ? '249,115,22' : '34,197,94'},0.1)`, border: `0.5px solid ${corStatus}`, borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: corStatus, flexShrink: 0 }} />
          <p style={{ color: '#fff', fontSize: '14px', margin: 0, fontWeight: '600' }}>{mensagemStatus}</p>
        </div>

        {/* CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Renda</p>
            <p style={{ color: '#fff', fontSize: '20px', fontWeight: '800', margin: 0 }}>R$ {perfil?.renda?.toLocaleString('pt-BR')}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Gastos em {mesAtual}</p>
            <p style={{ color: corStatus, fontSize: '20px', fontWeight: '800', margin: 0 }}>R$ {totalGastos.toLocaleString('pt-BR')}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Saldo</p>
            <p style={{ color: saldo >= 0 ? '#22c55e' : '#ef4444', fontSize: '20px', fontWeight: '800', margin: 0 }}>R$ {saldo.toLocaleString('pt-BR')}</p>
          </div>
        </div>

        {/* BARRA DE PROGRESSO */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <p style={{ color: '#fff', fontSize: '13px', fontWeight: '600', margin: 0 }}>Orçamento usado</p>
            <p style={{ color: corStatus, fontSize: '13px', fontWeight: '600', margin: 0 }}>{percentualGasto.toFixed(0)}%</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
            <div style={{ background: corStatus, width: `${Math.min(percentualGasto, 100)}%`, height: '100%', borderRadius: '4px', transition: 'width 0.5s ease' }} />
          </div>
        </div>

       {/* CATEGORIAS ACCORDION */}
{Object.keys(categorias).length > 0 && (
  <CategoriaAccordion categorias={categorias} gastos={gastos} totalGastos={totalGastos} />
)}
</div>
    </main>
  )
}