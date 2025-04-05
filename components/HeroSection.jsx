"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
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
      }else{
        imageElem.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="w-full pt-36 flex justify-center items-center">
      <div className="text-center">
        <div className="p-20">
          <h1 className="text-7xl font-bold bg-gradient-to-b from-gray-500 to-gray-300 bg-clip-text text-transparent">
            Your AI Career Buddy
          </h1>
          <h1 className="text-5xl font-bold bg-gradient-to-b from-gray-500 to-gray-100 bg-clip-text text-transparent">
            for Professional Success
          </h1>
          <p className="text-xl bg-gradient-to-r from-gray-200 to-gray-50 bg-clip-text text-transparent mt-10">
            Get the best resources, tools and mentorship to advance your career
            with personalized AI-driven insights and resources.
          </p>
        </div>

        <div className="flex justify-center gap-8 px-20">
          <Link href="/dashboard">
            <Button className="size-lg font-bold text-xl px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/https://www.youtube.com/watch?v=O7tvHh3MPSs&list=RDO7tvHh3MPSs&start_radio=1">
            <Button
              className="size-lg font-bold text-xl px-8"
              variant="outline"
            >
              Watch Demo
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper py-20 px-8 w-full">
          <div ref={imageRef} className="hero-image">
            <Image
              src={"/hero.jpg"}
              height={540}
              width={960}
              alt="hero image"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
