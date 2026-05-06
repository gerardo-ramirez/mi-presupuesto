import Anthropic from '@anthropic-ai/sdk'
import MiniSearch from 'minisearch'

const client = new Anthropic()

// Tus documentos
const documents = [
  {
    id: '1',
    title: 'Política de devoluciones',
    content: 'Los clientes pueden devolver productos dentro de los 30 días de la compra. El producto debe estar en su estado original con el embalaje intacto. Los reembolsos se procesan en 5-7 días hábiles.'
  },
  {
    id: '2',
    title: 'Métodos de pago',
    content: 'Aceptamos tarjetas de crédito Visa, Mastercard y American Express. También aceptamos transferencias bancarias y MercadoPago. Los pagos se procesan de forma segura.'
  },
  {
    id: '3',
    title: 'Tiempos de envío',
    content: 'Los envíos dentro de Buenos Aires demoran 24-48 horas. Para el interior del país el plazo es de 3-5 días hábiles. Los envíos se realizan por Andreani o Correo Argentino.'
  }
]

// Indexar documentos
const buildIndex = () => {
  const index = new MiniSearch({
    fields: ['title', 'content'],
    storeFields: ['title', 'content']
  })
  index.addAll(documents)
  return index
}

// Buscar documentos relevantes
const search = (index: MiniSearch, query: string) => {
  const results = index.search(query, { limit: 2 })
  return results.map(r => `${r.title}:\n${r.content}`).join('\n\n')
}

// RAG completo
const ask = async (question: string) => {
  const index = buildIndex()
  const context = search(index, question)

  console.log('Contexto encontrado:')
  console.log(context)
  console.log('\n---\n')

  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: `Sos un asistente de atención al cliente. 
Respondé ÚNICAMENTE basándote en el siguiente contexto.
Si la respuesta no está en el contexto, decí que no tenés esa información.

CONTEXTO:
${context}`,
    messages: [
      { role: 'user', content: question }
    ]
  })

  console.log('Respuesta de Claude:')
  console.log(response.content[0].text)
}

//sk('¿Cuánto tarda un envío a Córdoba?')
ask('¿Tienen sucursales físicas?')