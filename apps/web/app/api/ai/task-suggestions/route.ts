import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { projectId, projectDescription } = await req.json();

    // 🔹 Call AI service
    const aiResponse = await axios.post("http://localhost:4001/ai/suggestions", {
      projectDescription,
    });

    const suggestions = aiResponse.data.suggestions;

    // 🔹 Store results in DB
    const saved = await prisma.aiSuggestion.create({
      data: {
        projectId,
        content: suggestions,
      },
    });

    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch suggestions" }, { status: 500 });
  }
}
