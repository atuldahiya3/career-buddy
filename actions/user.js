"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function updateUser(data){
    const {userId}=await auth();
    if(!userId) throw new Error("Unauthorized");

    const user= db.user.findUnique({
        where:{
            clerkId:userId,
        }
    })
    if(!user) throw new Error('user not found!');
    try {
        // transaction ensures that all the api calls are completed and if any of them fails it will throw an error
        const result=db.$transaction(async(tx)=>{
             //find if industry exits
            let industryInsights= await tx.industryInsight.findUnique({
                where:{
                    industry:data.industry
                }
            })
            if (!industryInsights) {
                industryInsights = await tx.industryInsight.create({
                  data: {
                    industry: data.industry, // Required and @unique
                    description: "Industry details not yet available",
                    salaryRanges: [], // Empty JSON array
                    growthRate: 0.0,
                    demandLevel: "LOW", // Assuming DemandLevel is an enum with LOW as a value
                    topSkills: [],
                    marketOutlook: "NEUTRAL", // Assuming MarketOutlook is an enum with NEUTRAL as a value
                    keyTrends: [],
                    recommendedSkills: [],
                    nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                  }
                });
              }
            // if not exist, create default industry and later will generate with ai
            
            //update user
            const updatedUser= await tx.user.update({
                where:{
                    id:user.id,
                },
                data:{
                    industry:data.industry,
                    experience:data.experience,
                    bio:data.bio,
                    skills:data.skills
                }
            });
            return {updatedUser,industryInsights}
        }, {
            timeout:1000
        })
        return result.user;

    } catch (error) {
        console.log(" Error updating user:", error);
        throw new Error('Error updating user');
        
    }
}
export async function getUserOnBoardingStatus(){
    const {userId}=await auth();
    if(!userId) throw new Error("Unauthorized");
    const user= await db.user.findUnique({
        where:{
            clerkId:userId,
        }
    })
    if(!user) throw new Error('user not found!');
    try {
        const user= await db.user.findUnique({
            where:{
                clerkId:userId,
            },
            select:{
                industry:true,
            }
        })
        return {
            isOnboarded: !!user?.industry
        }
    } catch (error) {
        console.log(" Error checking onboarding status:", error);
        throw new Error('Error checking onboarding status');
        
    }
    
}
