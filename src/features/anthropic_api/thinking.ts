import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const thinkingResponse = async (question: string) => {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 16000,
    thinking: {
      type: 'enabled',
      budget_tokens: 10000  // máximo de tokens para el razonamiento
    },
    messages: [
      { role: 'user', content: question }
    ]
  })

  for (const block of response.content) {
    if (block.type === 'thinking') {
      console.log('💭 Razonamiento interno:')
      console.log(block.thinking)
      console.log('\n---\n')
    }
    if (block.type === 'text') {
      console.log('✅ Respuesta final:')
      console.log(block.text)
    }
  }
}

thinkingResponse('¿Cuál es más eficiente para buscar en una lista de 1 millón de elementos: un array ordenado con binary search o un objeto con lookups O(1)?')