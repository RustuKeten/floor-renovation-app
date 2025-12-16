import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { image, material } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY not configured");
      throw new Error("API key not configured");
    }

    // Use GPT-4 Vision to analyze the room
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are a professional flooring expert analyzing a room photo. Analyze this image and respond with ONLY a JSON object (no markdown, no code blocks, just the raw JSON).

Provide:
- roomType: What type of room is this? (Living Room, Bedroom, Kitchen, Bathroom, Dining Room, Office, Hallway, etc.)
- estimatedLength: Estimated room length in feet (number only)
- estimatedWidth: Estimated room width in feet (number only)
- currentFloorType: Current flooring type (Hardwood, Carpet, Tile, Laminate, Concrete, Vinyl, etc.)
- condition: Floor condition as "good", "fair", or "poor"
- notes: Brief observations about the room${material ? ` relevant to installing ${material} flooring` : ""}

Response format (JSON only, no other text):
{"roomType":"string","estimatedLength":number,"estimatedWidth":number,"currentFloorType":"string","condition":"good"|"fair"|"poor","notes":"string"}`,
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    console.log("AI Response:", content);

    // Parse the JSON response - handle various formats
    let jsonStr = content;

    // Remove markdown code blocks if present
    if (jsonStr.includes("```")) {
      const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (codeBlockMatch) {
        jsonStr = codeBlockMatch[1].trim();
      }
    }

    // Find JSON object in the response
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Could not find JSON in response:", content);
      throw new Error("Could not parse AI response");
    }

    const analysis = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      success: true,
      analysis: {
        roomType: analysis.roomType || "Room",
        estimatedLength: Number(analysis.estimatedLength) || 15,
        estimatedWidth: Number(analysis.estimatedWidth) || 12,
        estimatedSqFt:
          (Number(analysis.estimatedLength) || 15) *
          (Number(analysis.estimatedWidth) || 12),
        currentFloorType: analysis.currentFloorType || "Unknown",
        condition: analysis.condition || "fair",
        notes: analysis.notes || "AI analysis complete.",
      },
    });
  } catch (error) {
    console.error("AI Analysis Error:", error);

    // Fallback to mock data if AI fails
    return NextResponse.json({
      success: true,
      analysis: {
        roomType: "Living Room",
        estimatedLength: 18,
        estimatedWidth: 14,
        estimatedSqFt: 252,
        currentFloorType: "Carpet",
        condition: "fair",
        notes:
          "AI analysis unavailable. Using estimated values. For accurate measurements, please schedule an in-person consultation.",
      },
      fallback: true,
    });
  }
}
