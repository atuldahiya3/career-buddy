import React from 'react'
import { testimonial } from './data/testimonial'

const Testimonials = () => {
  return (
    <div>
        <section className="w-full h-auto flex justify-center p-20 bg-black">
            <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-b from-gray-500 to-gray-300 bg-clip-text text-transparent">
                Testimonials
            </h1>
            <div>
                <div>
                <p className="text-xl bg-gradient-to-r from-gray-200 to-gray-50 bg-clip-text text-transparent mt-10">
                    What our users say about us
                </p>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 ">
                    {testimonial.map((data, index) => (
                        <div key={index} className="bg-gradient-to-b from-gray-800 to-gray-700 shadow-lg rounded-lg p-6 flex flex-col items-center">
                            <img src={data.image} alt="image" className="w-20 h-20 rounded-full"/>
                            <h2 className="text-gray-400 text-xl font-bold mt-4">{data.author}</h2>
                            {/* <h2 className="text-gray-400 text-sm font-bold ">{data.role}</h2>
                            <h2 className="text-gray-400 text-sm font-bold">{data.company}</h2> */}
                            <p className="text-gray-200 mt-2">{data.quote}</p>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </section>
    </div>
  )
}

export default Testimonials