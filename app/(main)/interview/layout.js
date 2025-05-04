import React, { Suspense } from 'react'
import {BarLoader} from 'react-spinners'
const Layout = ({children}) => {
  return (
    <div className=''>
        <div className='flex items-center justify-center mb-5'>
        </div>
        <Suspense fallback={<BarLoader className="width-[100%] text-gray mt-4"/>}>
            {children}
        </Suspense>
    </div>
  )
}

export default Layout