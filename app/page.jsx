import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="grid-background">
        <HeroSection/>
      </div>
      <section>
        <Features/>
      </section>
      <section>
        <Stats/>
      </section>
      <section>
        <HowItWorks/>
      </section>
      <section>
        <Testimonials/>
      </section>
    </div>
  );
}
