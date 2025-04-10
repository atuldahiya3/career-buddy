import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const OnboardingForm = ({industries}) => {
  useForm({
    resolver: zodResolver
  })
  return (
    <div className='mt-24'>

    </div>
  )
}

export default OnboardingForm