import { industries } from '@/components/data/industries'
import React from 'react'
import OnboardingForm from './_components/onboarding-form'
import { getUserOnBoardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';

const OnboardingPage = async() => {
  // Check if user is already onboarded
  const {isOnboarded}= await getUserOnBoardingStatus();
  if(isOnboarded) redirect('/dashboard')
  return (
    <main><OnboardingForm industries={industries}/></main>
  )
}

export default OnboardingPage