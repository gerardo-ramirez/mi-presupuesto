import Anthropic from '@anthropic-ai/sdk'
import * as fs from 'fs'
import * as path from 'path'

const client = new Anthropic()

const analyzeImage = async (imagePath: string, question: string) => {
  const imageData = fs.readFileSync(imagePath)
  const base64Image = imageData.toString('base64')
  const mimeType = 'image/png'

  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mimeType,
              data: base64Image
            }
          },
          {
            type: 'text',
            text: question
          }
        ]
      }
    ]
  })

  console.log(response.content[0].text)
}

// Usá cualquier imagen PNG que tengas en tu proyecto
analyzeImage('./screenshot.png', '¿Qué ves en esta imagen?')