import Anthropic from '@anthropic-ai/sdk'
import * as fs from 'fs'

const client = new Anthropic()

const analyzePDF = async (pdfPath: string, question: string) => {
  const pdfData = fs.readFileSync(pdfPath)
  const base64PDF = pdfData.toString('base64')

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
              type: 'base64',
              media_type: 'application/pdf',
              data: base64PDF
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

analyzePDF('./documento.pdf', '¿De qué trata este documento?')