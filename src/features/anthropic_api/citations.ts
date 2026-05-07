import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()
const askWithCitations = async (question: string) => {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'document',
            source: {
              type: 'text',
              media_type: 'text/plain',
              data: `Política de devoluciones:
Los clientes pueden devolver productos dentro de los 30 días de la compra.
El producto debe estar en su estado original con el embalaje intacto.
Los reembolsos se procesan en 5-7 días hábiles.

Métodos de pago:
Aceptamos tarjetas Visa, Mastercard y American Express.
También aceptamos MercadoPago y transferencias bancarias.`
            },
            citations: { enabled: true }
          },
          {
            type: 'text',
            text: question
          }
        ]
      }
    ]
  })


// Usá el tipo que exporta el SDK directamente
for (const block of response.content) {
  if (block.type === 'text') {
    console.log('Respuesta:', block.text)
    
    if ('citations' in block && block.citations?.length) {
      console.log('\nFuentes citadas:')
      block.citations.forEach((citation) => {
        if (citation.type === 'char_location') {
          console.log(`→ "${citation.cited_text.trim()}"`)
          console.log(`  posición: ${citation.start_char_index} - ${citation.end_char_index}`)
        }
      })
    }
  }
}

  // Ver exactamente qué devuelve la API
  console.log(JSON.stringify(response.content, null, 2))
}

askWithCitations('¿Cuánto tiempo tengo para devolver un producto?')
