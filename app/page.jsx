import HeroSection from "@/components/HeroSection";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="grid-background">
        <HeroSection/>
      </div>
    </div>
  );
}
