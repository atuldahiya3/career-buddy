import React from "react";
import { features } from "./data/features";

const Features = () => {
  return (
    <section className="w-full h-auto flex justify-center p-20">
      <div className="text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-b from-gray-500 to-gray-300 bg-clip-text text-transparent">
          Features
        </h1>
        <div>
            <div>
                <p className="text-xl bg-gradient-to-r from-gray-200 to-gray-50 bg-clip-text text-transparent mt-10">
                Get the best resources, tools and mentorship to advance your career
                with personalized AI-driven insights and resources.
                </p>
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 ">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-gradient-to-b from-gray-800 to-gray-700 shadow-lg rounded-lg p-6 flex flex-col items-center">
                            {feature.icon}
                            <h2 className="text-gray-400 text-xl font-bold mt-4">{feature.title}</h2>
                            <p className="text-gray-200 mt-2">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
