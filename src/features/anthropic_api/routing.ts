import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()
let apisCall= 0; 

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


// Parallelization — evaluaciones simultáneas
const parallelEvaluation = async (cv: string) => {
  console.log('\n⚡ Evaluaciones en paralelo...\n')
  apisCall ++
  const cvData = await extractCVData(cv)
apisCall ++
  const [frontendEval, fullstackEval] = await Promise.all([
    evaluateCandidate(cvData, ['React', 'TypeScript', 'CSS']),
    evaluateCandidate(cvData, ['Node.js', 'TypeScript', 'PostgreSQL'])
  ])

  console.log('Frontend:', frontendEval)
  console.log('\nFullstack:', fullstackEval)
}

// Routing — Claude decide el camino
const routeQuery = async (query: string) => {
  console.log('\n🔀 Routing query...\n')

  // Paso 1 — Claude decide la ruta
  const routingResponse = await client.messages.create({
    model: 'claude-haiku-4-5',  // Haiku para routing — rápido y barato
    max_tokens: 100,
    system: `Clasificá la consulta en UNA de estas categorías:
TECHNICAL  → preguntas sobre código, bugs, arquitectura
HR         → preguntas sobre proceso de selección, salarios
GENERAL    → cualquier otra cosa
Respondé SOLO con la categoría, sin explicación.`,
    messages: [{ role: 'user', content: query }]
  })

  const route = routingResponse.content[0].text.trim()
  console.log('Ruta elegida:', route)

  // Paso 2 — ejecutar el agente correcto según la ruta
  if (route === 'TECHNICAL') {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: 'Sos un experto técnico senior. Respondés con precisión técnica.',
      messages: [{ role: 'user', content: query }]
    })
    console.log('Respuesta técnica:', response.content[0].text)
  }

  if (route === 'HR') {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: 'Sos un experto en RRHH. Respondés con empatía y profesionalismo.',
      messages: [{ role: 'user', content: query }]
    })
    console.log('Respuesta HR:', response.content[0].text)
  }

  if (route === 'GENERAL') {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5',  // query simple → modelo barato
      max_tokens: 512,
      messages: [{ role: 'user', content: query }]
    })
    console.log('Respuesta general:', response.content[0].text)
  }
}




// CV de prueba
const cvTest = `
Nombre: Gerardo Ramírez
Experiencia: 3 años de desarrollo frontend
Skills: React, TypeScript, JavaScript, CSS, Git
Proyectos: E-commerce con Next.js, Dashboard con React y TanStack Query
`
//parallelEvaluation(cvTest)
//processCVPipeline(cvTest)
//routeQuery('¿Cuándo me van a llamar para la entrevista?')
routeQuery('¿Cuál es la diferencia entre useMemo y useCallback en React?')