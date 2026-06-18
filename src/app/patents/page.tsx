
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { motion } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";

export default function PatentsPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <FloatingPetals />
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-widest border border-rose-pink/20"
            >
              <Shield className="w-3.5 h-3.5" /> Protecting Magic
            </motion.div>
            <h1 className="font-headline text-5xl md:text-6xl">Intellectual Property & Patents</h1>
            <p className="text-muted-foreground italic font-headline text-lg">Guarding the creative foundations of the PETALS universe.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-morphism rounded-[3rem] p-8 md:p-16 space-y-12"
          >
            <div className="space-y-6 text-muted-foreground leading-relaxed italic font-headline text-lg">
              <p>
                PETALS Studio takes great pride in its original storytelling, character design, and innovative creative technologies. Our intellectual property portfolio includes registered trademarks, copyrights, and pending patents related to our unique worldbuilding processes and AI-assisted production methods.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="p-8 rounded-[2rem] bg-rose-pink/5 border border-rose-pink/10">
                  <h3 className="text-2xl font-headline text-foreground not-italic mb-4">Worldbuilding Systems</h3>
                  <p>Our proprietary methods for creating layered, emotionally resonant fantasy universes are protected by international copyright laws.</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-rose-pink/5 border border-rose-pink/10">
                  <h3 className="text-2xl font-headline text-foreground not-italic mb-4">Character IP</h3>
                  <p>All character designs, including Alora, RoseBella, Nerina, and Vespera, are legally protected creative properties.</p>
                </div>
              </div>

              <div className="pt-8 border-t border-rose-pink/10">
                <h3 className="text-2xl font-headline text-foreground not-italic mb-4">Notices</h3>
                <p>For licensing inquiries or information regarding our patent-pending technologies, please contact our legal department via the contact page.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
