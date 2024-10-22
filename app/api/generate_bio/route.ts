import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
    const ai = getRequestContext().env.AI
    const gateway_id = getRequestContext().env.CLOUDFLARE_GATEWAY_ID
    
    let { userInput, language, vibe } = await request.json() as { userInput: string, language: string, vibe: string }
  
    const systemPrompt = `You are an expert LinkedIn bio writer. Your task is to create professional, engaging, and tailored LinkedIn bios based on the information provided. Focus on highlighting key skills, experiences, and unique qualities. Keep the bio concise, impactful, and optimized for LinkedIn's platform.`

    const userPrompt = `Generate a ${vibe} LinkedIn bio in ${language} language. Make sure the generated biography is less than 300 characters, has short sentences that are found in LinkedIn about me sections, and use this information about the user as well: "${userInput}". Do not add any explanations or anything else, just one biography.`

    const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
    ]

    const response = await ai.run("@cf/meta/llama-3.1-70b-instruct",
        { 
            messages, 
            temperature: 1, 
            max_tokens: 512, 
        }, 
        {
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
