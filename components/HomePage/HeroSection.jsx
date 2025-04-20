"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const HeroSection = () => {
  const imageRef = useRef(null);
  
  useEffect(() => {
    const imageElem = imageRef.current;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      if (scrollPosition > scrollThreshold) {
        imageElem.classList.add("scrolled");
      } else {
        imageElem.classList.remove("scrolled");
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="w-full pt-20 sm:pt-24 md:pt-28 lg:pt-36 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <div className="p-4 sm:p-6 md:p-10 lg:p-16">
          <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-b from-gray-500 to-gray-300 bg-clip-text text-transparent leading-tight">
            Your AI Career Buddy
          </h1>
          <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-b from-gray-500 to-gray-100 bg-clip-text text-transparent mt-2 md:mt-4">
            for Professional Success
          </h2>
          <p className="text-base sm:text-lg md:text-xl bg-gradient-to-r from-gray-200 to-gray-50 bg-clip-text text-transparent mt-4 sm:mt-6 md:mt-10 max-w-3xl mx-auto">
            Get the best resources, tools and mentorship to advance your career
            with personalized AI-driven insights and resources.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-8 md:px-12 lg:px-20">
        <Link href="/dashboard">
        <button style={{ padding: "10px 20px", background: "#000", color: "#fff" }}>
          Get Started
        </button>
      </Link>
      <a
        href="https://www.youtube.com/watch?v=O7tvHh3MPSs&list=RDO7tvHh3MPSs&start_radio=1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button style={{ padding: "10px 20px", background: "#fff", border: "1px solid #000" }}>
          Watch Demo
        </button>
      </a>
        </div>
        
        <div className="hero-image-wrapper py-8 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-4 md:px-6 lg:px-8 w-full">
          <div ref={imageRef} className="hero-image transition-all duration-300 ease-in-out">
            <Image
              src="/hero2.png"
              height={540}
              width={960}
              alt="Hero image showing career advancement"
              className="rounded-lg shadow-2xl mx-auto w-full h-auto"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 960px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;