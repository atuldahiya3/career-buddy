"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";

const { db } = require("@/lib/prisma");
const { auth } = require("@clerk/nextjs/dist/types/server");

export const generateQuiz= async()=>{
    
    const genAI= new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model=genAI.getGenerativeModel({
        model:'gemini-1.5-flash'
    })
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });
    
    if (!user) throw new Error("User not found!");
    const prompt = `
    Generate 10 technical interview questions for a ${
      user.industry
    } professional${
    user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
  }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;
   const result=await model.generateContent(prompt);
   console.log("AI response",result);
   const response=result.response;
   const text=response.text()
   const quiz = text.replace(/```(?:json)?\n?/g, "").trim();
   return quiz.questions;
}
export const saveQuizResult =async(quizResult)=>{
    let improvementTip=null;
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });
    
    if (!user) throw new Error("User not found!");
    const questionResults=questions.map((q,index)=>({
        question:q.question,
        answer:q.correctAnswer,
        userAnswer:answers[index],
        isCorrect: q.correctAnswer===answers[index],
        explanation:q.explanation
    }))
    const wrongAnswer=questionResults.filter(q=>!q.isCorrect);
    if(wrongAnswer.length>0){
        const wrongQuestionsText = wrongAnswer
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;
    try {
        const tipResult = await model.generateContent(improvementPrompt);
  
        improvementTip = tipResult.response.text().trim();
        console.log(improvementTip);
      } catch (error) {
        console.error("Error generating improvement tip:", error);
        // Continue without improvement tip if generation fails
      }

    }
    try {
        const assessment = await db.assessment.create({
          data: {
            userId: user.id,
            quizScore: score,
            questions: questionResults,
            category: "Technical",
            improvementTip,
          },
        });
    
        return assessment;
      } catch (error) {
        console.error("Error saving quiz result:", error);
        throw new Error("Failed to save quiz result");
      }
     
}
