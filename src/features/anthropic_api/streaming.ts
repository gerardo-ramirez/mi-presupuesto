import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const askWithStreaming = async (question: string) => {
  console.log('Claude: ')
  
  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    messages: [
      { role: 'user', content: question }
    ]
  })

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      process.stdout.write(chunk.delta.text)
    }
  }

  const final = await stream.finalMessage()
  console.log('\n\nTokens usados:', final.usage)
}

askWithStreaming('Explicame qué es la programación funcional en 3 oraciones')
