import React, { Suspense } from 'react'
import {BarLoader} from 'react-spinners'
const Layout = ({children}) => {
  return (
    <div className=' px-5'>
        <div className='flex items-center justify-center mb-5'>
            <h1 className='text-6xl font-bold gradient-title mt-10'>Industry Insights</h1>
        </div>
        <Suspense fallback={<BarLoader className="width-[100%] text-gray mt-4"/>}>
            {children}
        </Suspense>
    </div>
  )
}

export default Layout