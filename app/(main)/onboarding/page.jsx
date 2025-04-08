import { industries } from '@/components/data/industries'
import React from 'react'
import OnboardingForm from './_components/onboarding-form'

const OnboardingPage = () => {
  // Check if user is already onboarded
  return (
    <main><OnboardingForm industries={industries}/></main>
  )
}

export default OnboardingPage