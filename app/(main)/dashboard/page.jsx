import { getIndustryInsights } from '@/actions/dashboard';
import { getUserOnBoardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

const IndustryInsightsPage =async () => {
  const {isOnboarded} = await getUserOnBoardingStatus();
  if(!isOnboarded) redirect('/onboarding')
    const insights=getIndustryInsights();
  return (
    <div className='container mx-auto'><DashboardView insights={insights}/></div>
  )
}

export default IndustryInsightsPage