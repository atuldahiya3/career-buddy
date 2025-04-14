"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingFormSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
    setValue,
    watch,
    reset,
    trigger,
  } = useForm({
    resolver: zodResolver(onboardingFormSchema),
  });
  const onSubmit = async (data) => {
    console.log("submitting form",data);
  }
  return (
    <div className="mt-36 flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2" >
              <Label htmlFor="industry" className=' text-lg ' >
                Industry
              </Label>
              <Select onValueChange={(value)=>{
                setValue('industry',value),
                setSelectedIndustry(industries.find((ind)=>ind.id===value)),
                setValue('subIndustry','')
              }}>
                <SelectTrigger id='industry'>
                  <SelectValue placeholder="select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind)=>{
                    return <SelectItem value={ind.id} key={ind.id}>{ind.name}</SelectItem>
                  })}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-red-500 text-sm">
                  {errors.industry.message}
                </p>
              )}
            </div>
            {selectedIndustry&&<div className="space-y-2" >
              <Label htmlFor="subIndustry" className=' text-lg ' >
                Specialization
              </Label>
              <Select onValueChange={(value)=>{
                setValue('subIndustry',value)
              }}>
                <SelectTrigger id='subIndustry'>
                  <SelectValue placeholder="select specialization" />
                </SelectTrigger>
                <SelectContent>
                  {selectedIndustry?.subIndustries.map((ind)=>{
                    return <SelectItem value={ind} key={ind}>{ind}</SelectItem>
                  })}
                </SelectContent>
              </Select>
              {errors.subIndustry && (
                <p className="text-red-500 text-sm">
                  {errors.subIndustry.message}
                </p>
              )}
            </div>}
            <div className="space-y-2" >
              <Label htmlFor="experience" className=' text-lg ' >
                Years of Experience
              </Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-red-500 text-sm">
                  {errors.experience.message}
                </p>
              )}
            </div>
            <div className="space-y-2" >
              <Label htmlFor="skills" className=' text-lg ' >
                Skills
              </Label>
              <Input
                id='skills'
                placeholder='e.g. Java, Python, React'
                {...register("skills")}
              />
              <p className="text-sm text-muted-foreground">separate multiple skills with commas</p>
              {errors.skills && (
                <p className="text-red-500 text-sm">
                  {errors.skills.message}
                </p>
              )}
            </div>
            <div className="space-y-2" >
              <Label htmlFor="bio" className=' text-lg ' >
                Professional Bio
              </Label>
              <Textarea
                id='bio'
                placeholder='Tell us about your professional background'
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm">
                  {errors.bio.message}
                </p>
              )}
            </div>
            <div className="flex justify-center w-full mt-4">
              <button
                type="submit"
                className= "text-black bg-white px-4 py-2 rounded "
                disabled={isSubmitting || isValidating}
              >
                {isSubmitting || isValidating ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingForm;
