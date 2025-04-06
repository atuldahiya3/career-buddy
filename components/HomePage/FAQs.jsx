import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "../data/faqs";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const FAQs = () => {
  return (
    <div>
        <section className="w-full h-auto flex justify-center p-20 ">
        <div className="text-center max-w-3xl w-full">
            <h1 className="p-5 text-5xl font-bold bg-gradient-to-b from-gray-500 to-gray-300 bg-clip-text text-transparent">
            Frequently Asked Questions
            </h1>
            <div>
            <div>
                <p className="text-xl bg-gradient-to-r from-gray-200 to-gray-50 bg-clip-text text-transparent mt-10 mb-8">
                {/* Frequently Asked Questions */}
                </p>
            </div>
            </div>
            <div className="text-left">
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-gray-200 text-lg">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-300 text-md">
                    {faq.answer}
                    </AccordionContent>
                </AccordionItem>
                ))}
            </Accordion>
            </div>
        </div>
        </section>
        <section className="w-full h-auto flex justify-center p-20 bg-gradient-to-br from-gray-700 to-gray-300">
        <div className="text-center max-w-3xl w-full">
            <h1 className="p-5 text-5xl font-bold text-black bg-clip-text ">
            Ready to Accelerate Your Career?
            </h1>
            <div>
            <div className="flex items-center justify-center ">
                <Button className="flex items-center justify-center text-xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mt-10 mb-8 shadow-xl animate-bounce">
                Start Your Journey Now <ArrowRight className="text-black "/>
                </Button>
            </div>
            </div>
        </div>
        </section>
    </div>
  );
};

export default FAQs;