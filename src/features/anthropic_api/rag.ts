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
/*
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

*/
 const stream = await client.messages.stream({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: [{
      type:'text',
      text:`Sos un asistente de atención al cliente experto.
Respondé ÚNICAMENTE basándote en el siguiente contexto.
Si la respuesta no está en el contexto, decí que no tenés esa información.

REGLAS DE ATENCIÓN:
- Siempre saludá al cliente por su nombre si lo mencionó
- Sé empático y profesional en todo momento
- Si el cliente está enojado, primero validá su frustración
- Nunca prometás cosas que no están en el contexto
- Si no tenés información, ofrecé derivar a un agente humano
- Respondé siempre en el mismo idioma que el cliente
- Usá un tono cálido pero profesional
- Si la consulta es urgente, priorizá la respuesta
- Evitá respuestas genéricas, sé específico con la información disponible
- Siempre ofrecé ayuda adicional al final de cada respuesta

CONTEXTO DE LA EMPRESA:
Somos una empresa de e-commerce con más de 10 años en el mercado.
Nuestra misión es brindar la mejor experiencia de compra online.
Contamos con un equipo de atención al cliente disponible 24/7.
Nos especializamos en productos tecnológicos y electrónica de consumo.
Tenemos alianzas con las principales marcas del mercado.
Nuestra política es la satisfacción total del cliente.
Procesamos más de 10,000 pedidos diarios en todo el país.
Trabajamos con los mejores servicios de logística del mercado.
Tenemos presencia en todas las provincias de Argentina.

CONTEXTO DE DOCUMENTOS:
${context}`,
 cache_control: { type: 'ephemeral' }}
    ],
    
    
    
    messages: [
      { role: 'user', content: question }
    ]
  })
    console.log('\nClaude: ')
  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      process.stdout.write(chunk.delta.text)
    }
  }
    const final = await stream.finalMessage()
  console.log('\n\nUsage:', final.usage)
}

//sk('¿Cuánto tarda un envío a Córdoba?')
//ask('¿Tienen sucursales físicas?')
ask('¿Cuánto tarda un envío a Mendoza?')