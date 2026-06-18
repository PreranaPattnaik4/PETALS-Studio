
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is PETALS Studio?",
    answer: "PETALS is a premium illustration-first fantasy media studio. We create storybooks, characters, and animated adventures focused on emotional depth and gentle fantasy."
  },
  {
    question: "Where can I buy your books?",
    answer: "Our books are available on Amazon and through select retailers. You can find direct links on our Books page."
  },
  {
    question: "Do you offer commissions for custom art?",
    answer: "We occasionally open spots for custom character designs and fine art pieces. Please contact us via our Contact Us page for inquiries."
  },
  {
    question: "Are your stories suitable for children?",
    answer: "Yes, our content is designed to be family-friendly, focusing on themes like kindness, wonder, and emotional growth."
  },
  {
    question: "How do you use AI in your creative process?",
    answer: "We use AI as a tool for creative exploration and production assistance. Every piece is guided by original worldbuilding, character design, and strict creative oversight."
  }
];

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <FloatingPetals />
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-widest border border-rose-pink/20"
            >
              <Sparkles className="w-3.5 h-3.5" /> Seeking Answers
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-headline text-5xl md:text-6xl"
            >
              Frequently Asked Questions
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-morphism rounded-[2.5rem] p-8 md:p-12 shadow-xl"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-rose-pink/10">
                  <AccordionTrigger className="font-headline text-xl text-left hover:text-rose-pink transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground italic leading-relaxed text-lg">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
