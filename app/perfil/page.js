'use client'
import { useState } from 'react'
import { createClient } from '../lib/supabase'

export default function Perfil() {
  const [passo, setPasso] = useState(1)
  const [dados, setDados] = useState({
    nome: '',
    renda: '',
    estado_civil: '',
    filhos: '',
    dependentes: '',
  })
  const [carregando, setCarregando] = useState(false)

  function atualizar(campo, valor) {
    setDados(prev => ({ ...prev, [campo]: valor }))
  }

  async function salvar() {
    setCarregando(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    await supabase.from('perfis').upsert({
      user_id: user.id,
      nome: dados.nome,
      renda: parseFloat(dados.renda),
      estado_civil: dados.estado_civil,
      filhos: parseInt(dados.filhos) || 0,
      dependentes: parseInt(dados.dependentes) || 0,
    })

    window.location.href = '/onboarding'
    setCarregando(false)
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.15)',
    borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box'
  }

  const selectStyle = { ...inputStyle, cursor: 'pointer', backgroundColor: '#1a0f2e', color: '#fff' }

  return (
    <main style={{ backgroundColor: '#1a0f2e', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '440px' }}>

        {/* HEADER */}
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px', gap: '16px' }}>
  <img src="/lio.png" alt="Lio" className="lio-flutuando" style={{ width: '80px', height: 'auto' }} />
  <div style={{ textAlign: 'center' }}>
    <h1 style={{ color: '#fff', fontSize: '18px', fontWeight: '800', margin: '0 0 4px' }}>Vamos nos conhecer!</h1>
    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: 0 }}>Isso me ajuda a te dar conselhos melhores</p>
  </div>
</div>

        {/* PROGRESSO */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '28px' }}>
          {[1,2,3].map(n => (
            <div key={n} style={{ flex: 1, height: '3px', borderRadius: '2px', background: passo >= n ? '#F5C842' : 'rgba(255,255,255,0.1)' }} />
          ))}
        </div>

        {/* PASSO 1 */}
        {passo === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Como posso te chamar?</label>
              <input type="text" placeholder="Seu nome" value={dados.nome} onChange={e => atualizar('nome', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Qual sua renda mensal total? (R$)</label>
              <input type="number" placeholder="Ex: 2500" value={dados.renda} onChange={e => atualizar('renda', e.target.value)} style={inputStyle} />
            </div>
            <button onClick={() => setPasso(2)} disabled={!dados.nome || !dados.renda}
              style={{ background: '#F5C842', color: '#1a0f2e', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', marginTop: '8px' }}>
              Continuar →
            </button>
          </div>
        )}

        {/* PASSO 2 */}
        {passo === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Estado civil</label>
              <select value={dados.estado_civil} onChange={e => atualizar('estado_civil', e.target.value)} style={selectStyle}>
                <option value="">Selecione...</option>
                <option value="solteiro">Solteiro(a)</option>
                <option value="casado">Casado(a) / União estável</option>
                <option value="divorciado">Divorciado(a)</option>
                <option value="viuvo">Viúvo(a)</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Filhos</label>
                <input type="number" placeholder="0" min="0" value={dados.filhos} onChange={e => atualizar('filhos', e.target.value)} style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', display: 'block', marginBottom: '6px' }}>Outros dependentes</label>
                <input type="number" placeholder="0" min="0" value={dados.dependentes} onChange={e => atualizar('dependentes', e.target.value)} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button onClick={() => setPasso(1)} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', color: '#fff', border: '0.5px solid rgba(255,255,255,0.15)', padding: '12px', borderRadius: '10px', fontSize: '14px', cursor: 'pointer' }}>
                ← Voltar
              </button>
              <button onClick={() => setPasso(3)} disabled={!dados.estado_civil}
                style={{ flex: 2, background: '#F5C842', color: '#1a0f2e', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* PASSO 3 */}
        {passo === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '0 0 12px' }}>Resumo do seu perfil</p>
              <p style={{ color: '#fff', fontSize: '14px', margin: '0 0 6px' }}>👤 {dados.nome}</p>
              <p style={{ color: '#fff', fontSize: '14px', margin: '0 0 6px' }}>💰 R$ {parseFloat(dados.renda).toLocaleString('pt-BR')} / mês</p>
              <p style={{ color: '#fff', fontSize: '14px', margin: '0 0 6px' }}>💍 {dados.estado_civil}</p>
              <p style={{ color: '#fff', fontSize: '14px', margin: 0 }}>👨‍👩‍👧 {parseInt(dados.filhos) || 0} filhos · {parseInt(dados.dependentes) || 0} dependentes</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setPasso(2)} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', color: '#fff', border: '0.5px solid rgba(255,255,255,0.15)', padding: '12px', borderRadius: '10px', fontSize: '14px', cursor: 'pointer' }}>
                ← Voltar
              </button>
              <button onClick={salvar} disabled={carregando}
                style={{ flex: 2, background: '#F5C842', color: '#1a0f2e', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                {carregando ? 'Salvando...' : 'Tudo certo! →'}
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}