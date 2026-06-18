
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { PosterCreator } from "@/components/Petals/PosterCreator";
import { motion } from "framer-motion";
import { Sparkles, Wand2 } from "lucide-react";

export default function CreatorPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <FloatingPetals />
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-[0.4em] border border-rose-pink/20 backdrop-blur-sm"
            >
              <Wand2 className="w-3.5 h-3.5" /> Enchanted Studio
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-headline text-5xl md:text-7xl text-foreground"
            >
              Poster <span className="italic text-rose-pink">& Wall Art</span> Creator
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground font-headline italic max-w-2xl mx-auto"
            >
              Compose your own magical memories using characters and landscapes from the PETALS universe.
            </motion.p>
          </div>

          {/* The Creator Tool */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <PosterCreator />
          </motion.div>

          {/* Inspiration Section */}
          <section className="mt-32 pt-24 border-t border-rose-pink/10 text-center">
            <h2 className="font-headline text-4xl mb-12">How to Use the Studio</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-pink/10 text-rose-pink flex items-center justify-center mx-auto text-xl font-bold">1</div>
                <h3 className="font-headline text-2xl">Pick Your Canvas</h3>
                <p className="text-muted-foreground italic font-headline">Choose a signature studio landscape or upload your own favorite photo.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-pink/10 text-rose-pink flex items-center justify-center mx-auto text-xl font-bold">2</div>
                <h3 className="font-headline text-2xl">Add Your Characters</h3>
                <p className="text-muted-foreground italic font-headline">Select characters like Alora or Nerina and position them within your world.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-pink/10 text-rose-pink flex items-center justify-center mx-auto text-xl font-bold">3</div>
                <h3 className="font-headline text-2xl">Weave Your Lore</h3>
                <p className="text-muted-foreground italic font-headline">Add a poetic title and description to finalize your unique piece of art.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
