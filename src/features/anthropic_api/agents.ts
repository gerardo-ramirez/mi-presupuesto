import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

// Paso 1 — Extraer datos del CV
const extractCVData = async (cv: string) => {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: 'Extraé los datos del CV. Respondé SOLO con JSON válido, sin texto adicional, sin backticks.',
    messages: [{ role: 'user', content: cv }],
    tools: [{
      name: 'extract_cv',
      description: 'Extrae datos estructurados de un CV',
      input_schema: {
        type: 'object' as const,
        properties: {
          name: { type: 'string' },
          skills: { type: 'array', items: { type: 'string' } },
          years_experience: { type: 'number' }
        },
        required: ['name', 'skills', 'years_experience']
      }
    }],
    tool_choice: { type: 'auto' }
  })

  const toolBlock = response.content.find(b => b.type === 'tool_use')
  return toolBlock?.type === 'tool_use' ? toolBlock.input : null
}

// Paso 2 — Evaluar candidato
const evaluateCandidate = async (cvData: unknown, requiredSkills: string[]) => {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: 'Sos un evaluador de candidatos técnicos. Sé objetivo y directo.',
    messages: [{
      role: 'user',
      content: `CV del candidato: ${JSON.stringify(cvData)}
Skills requeridas: ${requiredSkills.join(', ')}
¿El candidato califica? Respondé con APTO o NO APTO y una razón breve.`
    }]
  })
  return response.content[0].text
}

// Paso 3 — Generar email
const generateEmail = async (candidateName: string, evaluation: string) => {
  const isApto = evaluation.includes('APTO') && !evaluation.includes('NO APTO')
  
  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: 'Escribís emails de RRHH profesionales y empáticos.',
    messages: [{
      role: 'user',
      content: `Escribí un email para ${candidateName}. 
Evaluación: ${evaluation}
El candidato ${isApto ? 'pasó' : 'no pasó'} a la siguiente etapa.`
    }]
  })
  return response.content[0].text
}

// Pipeline completo — Chaining
const processCVPipeline = async (cv: string) => {
  console.log('🔄 Paso 1: Extrayendo datos del CV...')
  const cvData = await extractCVData(cv)
  console.log('CV Data:', cvData)

  console.log('\n🔄 Paso 2: Evaluando candidato...')
  const evaluation = await evaluateCandidate(cvData, ['React', 'TypeScript', 'Node.js'])
  console.log('Evaluación:', evaluation)

  console.log('\n🔄 Paso 3: Generando email...')
  const cvDataObj = cvData as { name: string }
  const email = await generateEmail(cvDataObj?.name ?? 'Candidato', evaluation)
  console.log('Email generado:\n', email)
}

// CV de prueba
const cvTest = `
Nombre: Gerardo Ramírez
Experiencia: 3 años de desarrollo frontend
Skills: React, TypeScript, JavaScript, CSS, Git
Proyectos: E-commerce con Next.js, Dashboard con React y TanStack Query
`

processCVPipeline(cvTest)