import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const tools: Anthropic.Tool[] = [
  {
    name: 'get_weather',
    description: 'Obtiene el clima actual de una ciudad',
    input_schema: {
      type: 'object' as const,
      properties: {
        city: { type: 'string', description: 'Nombre de la ciudad' }
      },
      required: ['city']
    }
  },
  {
    name: 'calculate',
    description: 'Realiza operaciones matemáticas',
    input_schema: {
      type: 'object' as const,
      properties: {
        operation: { type: 'string', description: 'suma, resta, multiplicacion, division' },
        a: { type: 'number', description: 'Primer número' },
        b: { type: 'number', description: 'Segundo número' }
      },
      required: ['operation', 'a', 'b']
    }
  },
 {
  name: 'analyze_code',
  description: 'Analiza código y devuelve bugs, suggestions y score de calidad',
  input_schema: {
    type: 'object' as const,
    properties: {
      code: { type: 'string', description: 'El código a analizar' }
    },
    required: ['code']
  }
}
]
// Las funciones reales que ejecutan las tools
const executeTool = (name: string, input: Record<string, unknown>) => {
  if (name === 'get_weather') {
    // En producción llamarías una API real
    return { city: input.city, temperature: 22, condition: 'Soleado' }
  }
  
  if (name === 'calculate') {
    const { operation, a, b } = input as { operation: string, a: number, b: number }
    const results: Record<string, number> = {
      suma: a + b,
      resta: a - b,
      multiplicacion: a * b,
      division: a / b
    }
    return { result: results[operation] }
  }

  if (name === 'analyze_code') {
  const { code } = input as { code: string }
  return {
    bugs: ['línea 3: variable no utilizada', 'línea 7: posible null pointer'],
    suggestions: ['extraer lógica a función separada', 'agregar tipos TypeScript'],
    score: 6
  }
}
}

// El flujo completo
const chat = async (userMessage: string) => {
  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: userMessage }
  ]

  // Primera llamada — Claude decide qué tool usar
  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    tools,
    messages
  })

  console.log('Stop reason:', response.stop_reason)
  console.log('Content blocks:', response.content)

  // Si Claude quiere usar una tool
  if (response.stop_reason === 'tool_use') {
    const toolBlock = response.content.find(b => b.type === 'tool_use')
    
    if (!toolBlock || toolBlock.type !== 'tool_use') return

    console.log(`\nClaude quiere usar: ${toolBlock.name}`)
    console.log('Con parámetros:', toolBlock.input)

    // Vos ejecutás la tool
    const toolResult = executeTool(toolBlock.name, toolBlock.input as Record<string, unknown>)
    console.log('Resultado de la tool:', toolResult)

    // Mandás el resultado de vuelta a Claude
    const finalResponse = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      tools,
      messages: [
        ...messages,
        { role: 'assistant', content: response.content },
        {
          role: 'user',
          content: [{
            type: 'tool_result',
            tool_use_id: toolBlock.id,
            content: JSON.stringify(toolResult)
          }]
        }
      ]
    })

    console.log('\nRespuesta final:', finalResponse.content[0])
  }
}

//chat('¿Qué clima hace en Quilmes?')
//chat('cuánto es 15 multiplicado por 8?')
//chat('cómo estás?')
chat('analizá este código: const x = 1; function foo() { return null }')