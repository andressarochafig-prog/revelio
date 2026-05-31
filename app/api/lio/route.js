import Groq from 'groq-sdk'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const maxDuration = 30

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(request) {
  const { mensagens, perfil } = await request.json()

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (c) => c.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
  const { data: { user } } = await supabase.auth.getUser()

  const systemPrompt = `Você é o Lio, um assistente financeiro pessoal acolhedor, inteligente e empático do app Revelio.

Informações do usuário:
- Nome: ${perfil.nome}
- Renda mensal: R$ ${perfil.renda}
- Estado civil: ${perfil.estado_civil}
- Filhos: ${perfil.filhos}
- Outros dependentes: ${perfil.dependentes}

Suas responsabilidades:
1. Receber gastos em texto livre e confirmar que entendeu naturalmente, sem mencionar listas ou dados técnicos
2. Dar conselhos financeiros personalizados baseados no perfil
3. Sugerir investimentos simples quando fizer sentido
4. Sempre considerar o contexto de vida da pessoa

Quando o usuário mencionar gastos, extraia os dados silenciosamente e inclua no FINAL da sua resposta o seguinte bloco. NUNCA mencione este bloco ao usuário, nunca diga JSON, lista, dados ou qualquer referência técnica:
<gastos>
[{"descricao": "mercado", "valor": 320, "categoria": "alimentação"}]
</gastos>

Categorias possíveis: alimentação, transporte, saúde, educação, lazer, vestuário, moradia, outros

Regras OBRIGATÓRIAS:
- NUNCA mencione JSON, lista de dados, código ou qualquer termo técnico
- NUNCA escreva código ou blocos de código na resposta
- Responda em NO MÁXIMO 1 parágrafo. 2 parágrafos apenas se absolutamente necessário
- Seja direto e acolhedor
- Use linguagem simples
- Sempre em português brasileiro`

  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      ...mensagens
    ],
    model: 'llama-3.1-8b-instant',
    max_tokens: 500,
  })

  const respostaCompleta = completion.choices[0].message.content

  const match = respostaCompleta.match(/<gastos>([\s\S]*?)<\/gastos>/)
  if (match && user) {
    try {
      const gastosData = JSON.parse(match[1])
      const agora = new Date()
      const gastosParaSalvar = gastosData.map(g => ({
        user_id: user.id,
        descricao: g.descricao,
        valor: g.valor,
        categoria: g.categoria,
        mes: agora.getMonth() + 1,
        ano: agora.getFullYear(),
      }))
      await supabase.from('gastos').insert(gastosParaSalvar)
    } catch (e) {
      console.error('Erro ao salvar gastos:', e)
    }
  }

  const respostaLimpa = respostaCompleta.replace(/<gastos>[\s\S]*?<\/gastos>/g, '').trim()

  return Response.json({ resposta: respostaLimpa })
}