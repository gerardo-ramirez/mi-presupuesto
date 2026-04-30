import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const extractUserData = async (text: string) => {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: 'Extraé los datos del usuario del texto.',
    messages: [{ role: 'user', content: text }],
    tools: [{
      name: 'extract_data',
      description: 'Extrae datos estructurados del texto',
      input_schema: {
        type: 'object' as const,
        properties: {
          name: { type: 'string', description: 'Nombre completo' },
          age: { type: 'number', description: 'Edad en años' },
          city: { type: 'string', description: 'Ciudad de residencia' }
        },
        required: ['name', 'age', 'city']
      }
    }],
    tool_choice: { type: 'auto' }
  })

  // La respuesta viene en un bloque tool_use, no text
  const toolBlock = response.content.find(b => b.type === 'tool_use')
  return toolBlock?.input
}

const result = await extractUserData(
  'Me llamo Gerardo, tengo 28 años y vivo en Quilmes'
)

console.log(result)