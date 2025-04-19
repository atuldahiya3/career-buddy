"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAiInsights } from "./dashboard";



export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  
  const user = await db.user.findUnique({
    where: { clerkId: userId },
  });
  
  if (!user) throw new Error("User not found!");
  
  try {
    const result = await db.$transaction(async (tx) => {
      let industryInsights = await tx.industryInsights.findUnique({
        where: {
          industry: data.industry,
        },
        // Select only the fields you need
        select: {
          id: true,
          industry: true,
          description: true,
          salaryRanges: true,
          growthRate: true,
          demandLevel: true,
          topSkills: true,
          marketOutlook: true,
          keyTrends: true,
          recommendedSkills: true,
          NextUpdate: true,
        }
      });
      
      if (!industryInsights) {
        const insights = await generateAiInsights(data.industry);
        console.log("AI Insights",insights);
        industryInsights = await db.industryInsights.create({
          data: {
            industry: data.industry,
            ...insights,
            NextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            description: "Industry insights for " + data.industry
          },
        });
      }
      
      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          industry: data.industry,
          experience: data.experience,
          bio: data.bio,
          skills: data.skills,
        },
        // Select only the fields you need
        select: {
          id: true,
          clerkId: true,
          industry: true,
          experience: true,
          bio: true,
          skills: true,
        }
      });
      
      // Return plain objects
      return { 
        updatedUser,
        industryInsights
      };
    }, { timeout: 2000 });
    
    // Return a plain serializable object
    return { 
      success: true,
      updatedUser: result.updatedUser,
      industryInsights: result.industryInsights
    };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(`Error updating user: ${error.message}`);
  }
}

export async function getUserOnBoardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  
  try {
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        industry: true,
      },
    });
    
    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error(`Error checking onboarding status: ${error.message}`);
  }
}