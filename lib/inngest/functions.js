import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../prisma";
import { inngest } from "./client";

const genAI= new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model=genAI.getGenerativeModel({
  model:'gemini-1.5-flash'
})
export const generateIndustryInsights = inngest.createFunction(
  
  { name: "Generate Industry Insights", id: "generate-industry-insights" },
  { cron: "0 0 * * *" },
  async ({ step }) => {
    const industries = await step.run("Fetch Industries", async () => {
      return await db.IndustryInsights.findMany({
        select: { industry: true },
      });
    });
    for (const { industry } of industries) {
      const prompt = `
    Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
    {
      "salaryRanges": [
        { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
      ],
      "growthRate": number,
      "demandLevel": "HIGH" | "MEDIUM" | "LOW",
      "topSkills": ["skill1", "skill2"],
      "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
      "keyTrends": ["trend1", "trend2"],
      "recommendedSkills": ["skill1", "skill2"]
    }
    
    IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
    Include at least 5 common roles for salary ranges.
    Growth rate should be a percentage.
    Include at least 5 skills and trends.
    `;

      const res = await step.ai.wrap("gemini", async (p) => {
        return await model.generateContent(p);
      }, prompt);
      const text=res.response.candidates[0].content.parts[0].text || "";
      const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
      const insights= JSON.parse(cleanedText);

      await step.run(`Update Industry Insights for ${industry}`, async () => {
        return await db.IndustryInsights.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            NextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      });
    }
  }
);
