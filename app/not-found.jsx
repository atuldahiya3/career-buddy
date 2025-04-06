import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='mt-36'>
        <p className='text-center'>Wanna Eat Poop...?</p><br/>
        <div className='flex justify-center items-center'>
          <Link href="/onboarding">
            <Button variant='outline'>
                Lets Goooo.
            </Button>
          </Link><br/>

        </div>
        <p className='text-center'>If you think this is a mistake, please contact support.</p>
    </div>
  )
}

export default NotFound