import Anthropic from '@anthropic-ai/sdk'
import * as readline from 'readline'

const client = new Anthropic()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const messages: { role: 'user' | 'assistant', content: string }[] = []

const chat = async (userInput: string) => {
  messages.push({ role: 'user', content: userInput })

  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    system: 'Sos un mentor senior de programación. Respondés siempre en español, sos directo y no das respuestas largas con listas innecesarias.',
    max_tokens: 1024,
    messages
  })

  const assistantMessage = response.content[0].text
  messages.push({ role: 'assistant', content: assistantMessage })
console.log(response.usage)
  return assistantMessage
}

const askQuestion = () => {
  rl.question('Vos: ', async (input) => {
    if (input === 'exit') return rl.close()

    const response = await chat(input)
    console.log(`Claude: ${response}\n`)
    askQuestion()
  })
}

console.log('Chat iniciado. Escribí "exit" para salir.\n')
askQuestion()