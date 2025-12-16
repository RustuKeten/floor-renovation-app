import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { image, material } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Use GPT-4 Vision to analyze the room
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `You are a professional flooring expert analyzing a room photo. Please analyze this image and provide:

1. Room Type: What type of room is this? (Living Room, Bedroom, Kitchen, Bathroom, Dining Room, Office, Hallway, etc.)
2. Estimated Dimensions: Based on standard furniture sizes and room proportions, estimate the room's length and width in feet.
3. Current Floor Type: What type of flooring is currently installed? (Hardwood, Carpet, Tile, Laminate, Concrete, etc.)
4. Floor Condition: Rate the current floor condition as "good", "fair", or "poor"
5. Notes: Any relevant observations about the room that might affect flooring installation.

${material ? `The customer is considering installing ${material} flooring.` : ''}

Respond in JSON format:
{
  "roomType": "string",
  "estimatedLength": number,
  "estimatedWidth": number,
  "currentFloorType": "string",
  "condition": "good" | "fair" | "poor",
  "notes": "string"
}`,
            },
            {
              type: 'image_url',
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from AI')
    }

    // Parse the JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Could not parse AI response')
    }

    const analysis = JSON.parse(jsonMatch[0])
    
    return NextResponse.json({
      success: true,
      analysis: {
        roomType: analysis.roomType || 'Room',
        estimatedLength: analysis.estimatedLength || 15,
        estimatedWidth: analysis.estimatedWidth || 12,
        estimatedSqFt: (analysis.estimatedLength || 15) * (analysis.estimatedWidth || 12),
        currentFloorType: analysis.currentFloorType || 'Unknown',
        condition: analysis.condition || 'fair',
        notes: analysis.notes || 'AI analysis complete.',
      },
    })
  } catch (error) {
    console.error('AI Analysis Error:', error)
    
    // Fallback to mock data if AI fails
    return NextResponse.json({
      success: true,
      analysis: {
        roomType: 'Living Room',
        estimatedLength: 18,
        estimatedWidth: 14,
        estimatedSqFt: 252,
        currentFloorType: 'Carpet',
        condition: 'fair',
        notes: 'AI analysis unavailable. Using estimated values. For accurate measurements, please schedule an in-person consultation.',
      },
      fallback: true,
    })
  }
}

