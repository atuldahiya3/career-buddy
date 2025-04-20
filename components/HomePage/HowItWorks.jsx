"use client";
import React, { useEffect, useRef } from 'react';
import { howItWorks } from '../data/howItWorks';

const HowItWorks = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    // Initialize the array of refs
    cardRefs.current = cardRefs.current.slice(0, howItWorks.length);

    // Set up IntersectionObserver for each card
    const observers = cardRefs.current.map((cardRef, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            cardRef.classList.add('active');
          } else {
            cardRef.classList.remove('active');
          }
        },
        { threshold: 0.6 } // Trigger when 60% of the card is visible
      );

      if (cardRef) {
        observer.observe(cardRef);
      }

      return observer;
    });

    // Cleanup observers on component unmount
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className=" p-10 lg:p-20">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-b from-gray-500 to-gray-300 bg-clip-text text-transparent">How It Works</h1>
        <p className="text-xl text-gray-400">
          Our platform uses advanced AI algorithms to provide personalized career guidance, interview preparation, and industry insights.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="relative mt-10">
          {/* Vertical connecting line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-400 h-full -z-10"></div>
          
          {/* Cards */}
          <div className="grid grid-cols-1 gap-24 w-full">
            {howItWorks.map((feature, index) => (
              <div 
                key={index} 
                ref={el => cardRefs.current[index] = el}
                className="bg-gradient-to-b from-gray-800 to-gray-700 shadow-lg rounded-lg p-6 flex flex-col items-center transition-all duration-500 opacity-70 scale-95 hover:scale-100 hover:opacity-100"
              >
                {/* Circle connector point */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-100 rounded-full -mt-10"></div>
                
                {feature.icon}
                <h2 className="text-gray-400 text-xl font-bold mt-4">{feature.title}</h2>
                <p className="text-gray-200 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS styles for active cards */}
      <style jsx>{`
        .active {
          opacity: 1;
          transform: scale(1.03);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          border: 4px solid #888;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;