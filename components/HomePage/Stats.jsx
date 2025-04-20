"use client";
import React, { useEffect, useState, useRef } from 'react';

const Stats = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  
  const stats = [
    {
      value: "50+",
      label: "Industries Covered"
    },
    {
      value: "1000+",
      label: "Interview Questions"
    },
    {
      value: "95%",
      label: "Success Rate"
    },
    {
      value: "24/7",
      label: "AI Support"
    }
  ];

  // Check screen size
  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkSize();
    
    // Add resize listener
    window.addEventListener('resize', checkSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Auto carousel for mobile
  useEffect(() => {
    let interval;
    
    if (isMobile) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % stats.length);
      }, 3000);
    }
    
    return () => clearInterval(interval);
  }, [isMobile, stats.length]);

  // Manual navigation
  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="w-full h-auto bg-black py-10 px-4 sm:px-6 md:px-8 lg:px-10">
      {/* Desktop view - show all stats in a row */}
      <div className="hidden md:flex justify-center max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center px-4 py-6 bg-gray-900/50 rounded-lg hover:bg-gray-800/70 transition-colors">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-200 mb-2">
                {stat.value}
              </h2>
              <p className="text-lg lg:text-xl font-medium text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile view - carousel */}
      <div className="md:hidden">
        <div 
          ref={carouselRef}
          className="relative overflow-hidden"
        >
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="min-w-full flex justify-center"
              >
                <div className="text-center w-4/5 px-4 py-8 bg-gray-900/50 rounded-lg">
                  <h2 className="text-4xl font-bold text-gray-200 mb-3 animate-fadeIn">
                    {stat.value}
                  </h2>
                  <p className="text-xl font-bold text-gray-500 animate-fadeIn">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {stats.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-white" : "w-2 bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;