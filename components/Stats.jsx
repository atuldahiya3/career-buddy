import React from 'react'

const Stats = () => {
  return (
    
        <section className="w-full h-auto flex justify-center p-10 bg-black">
            <div className="text-center">
            <div className="flex justify-between gap-30 p-10">
                <div>
                    <h1 className='text-4xl font-bold text-gray-200'>
                        50+<br/>
                    </h1>
                    <p className='text-xl font-bold text-gray-500'> 
                        Industries Covered
                    </p> 
                </div>
                <div>
                    <h1 className='text-4xl font-bold text-gray-200'>
                        1000+<br/>
                    </h1>
                    <p className='text-xl font-bold text-gray-500'> 
                    Interview Questions
                    </p> 
                </div>
                <div>
                    <h1 className='text-4xl font-bold text-gray-200'>
                        95%<br/>
                    </h1>
                    <p className='text-xl font-bold text-gray-500'> 
                    Success rate
                    </p> 
                </div>
                <div>
                    <h1 className='text-4xl font-bold text-gray-200'>
                        24/7<br/>
                    </h1>
                    <p className='text-xl font-bold text-gray-500'> 
                        AI Support
                    </p> 
                </div>
            </div>
            </div>
        </section>
  )
}

export default Stats