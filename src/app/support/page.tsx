
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, HelpCircle, FileText, Phone } from "lucide-react";
import Link from "next/link";

const supportOptions = [
  {
    icon: HelpCircle,
    title: "FAQs",
    desc: "Find quick answers to common questions about our stories and services.",
    link: "/faqs"
  },
  {
    icon: Mail,
    title: "Contact Us",
    desc: "Send us a message and our team will get back to you within 24-48 hours.",
    link: "/contact"
  },
  {
    icon: FileText,
    title: "Terms & Policies",
    desc: "Review our legal documents, including Terms of Service and Privacy Policy.",
    link: "/terms"
  },
  {
    icon: Phone,
    title: "Direct Support",
    desc: "Available for premium partners and collectors. Please refer to your welcome pack.",
    link: "/contact"
  }
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <FloatingPetals />
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16 space-y-4">
            <h1 className="font-headline text-5xl md:text-7xl">Help & Support</h1>
            <p className="text-muted-foreground italic font-headline text-lg">We're here to guide you through the garden.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportOptions.map((opt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-morphism rounded-[2.5rem] p-10 hover:shadow-2xl transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-rose-pink/10 text-rose-pink flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <opt.icon className="w-7 h-7" />
                </div>
                <h3 className="font-headline text-2xl mb-4">{opt.title}</h3>
                <p className="text-muted-foreground italic font-headline mb-8">{opt.desc}</p>
                <Button asChild variant="outline" className="rounded-full border-rose-pink text-rose-pink hover:bg-rose-pink hover:text-white">
                  <Link href={opt.link}>Learn More</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
