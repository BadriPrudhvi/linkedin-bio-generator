import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
    const ai = getRequestContext().env.AI
    const gateway_id = getRequestContext().env.CLOUDFLARE_GATEWAY_ID
    
    let { userInput, language, vibe } = await request.json() as { userInput: string, language: string, vibe: string }
  
    const systemPrompt = `You are an expert LinkedIn bio writer. Your task is to create professional, engaging, and tailored LinkedIn bios based on the information provided. Always maintain a ${vibe} tone and write in ${language}. Focus on highlighting key skills, experiences, and unique qualities. Keep the bio concise, impactful, and optimized for LinkedIn's platform.`

    const userPrompt = `Create a 50 words LinkedIn bio based on the following information: "${userInput}". The bio should be in ${language} and have a ${vibe} tone.`

    const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
    ]

    const response = await ai.run("@cf/meta/llama-3.1-70b-instruct", { messages, temperature: 1 }, {
        gateway: {
          id: gateway_id,
          skipCache: false,
          cacheTtl: 3600000,
        },
      },
    )

    return new Response(JSON.stringify({ bio: response.response }), {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
