import FAQs from "@/components/HomePage/FAQs";
import Features from "@/components/HomePage/Features";
import HeroSection from "@/components/HomePage/HeroSection";
import HowItWorks from "@/components/HomePage/HowItWorks";
import Stats from "@/components/HomePage/Stats";
import Testimonials from "@/components/HomePage/Testimonials";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="grid-background">
        <HeroSection />
      </div>
      <Features />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <FAQs />
    </div>
  );
}
