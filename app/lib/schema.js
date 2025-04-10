const { z } = require("zod");

export const onboardingFormSchema=z.object({
    industry: z.string({
        required_error:'Please select an industry'
    }),
    subIndustry: z.string({
        required_error:'Please select a specialization'
    }),
    experience:z.string({
        required_error:'Please select your experience level'
    }).transform((val)=>parseInt(val))
    .pipe(
        z.number()
        .min(0, "Experience level must be at least 0")
        .max(50, "Experience level must be at most 50")
    ),
    skills: z.string().transform((val)=>{
        val?
         val.split(',').map((skill)=> skill.trim()).filter((skill)=> skill.length > 0)
         :undefined
    })
})