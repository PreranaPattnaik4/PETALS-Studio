
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { PosterCreator } from "@/components/Petals/PosterCreator";
import { FinalCTA } from "@/components/Petals/FinalCTA";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Wand2, 
  BookOpen, 
  Castle, 
  Crown, 
  Palette, 
  Stars, 
  Video, 
  Music, 
  Gift, 
  Heart, 
  Rocket, 
  Clock, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const aiSuiteTools = [
  {
    title: "Gemini Storyweaver",
    desc: "Generate personalized stories, magical adventures, character arcs, and storybook chapters.",
    icon: BookOpen,
  },
  {
    title: "Lore Weaver AI",
    desc: "Create fantasy kingdoms, magical worlds, creatures, cultures, and enchanted lore.",
    icon: Castle,
  },
  {
    title: "Character Creator AI",
    desc: "Design unique heroes, princesses, fairies, magical companions, and detailed backstories.",
    icon: Crown,
  },
  {
    title: "Imagen Art Studio",
    desc: "Generate beautiful storybook illustrations, fantasy artwork, posters, and visual scenes.",
    icon: Palette,
  },
  {
    title: "Nano Banana Creator",
    desc: "Transform imaginative ideas into playful visual experiences and creative storytelling content.",
    icon: Stars,
  },
  {
    title: "Flow Cinematic Studio",
    desc: "Convert stories into animated scenes, visual narratives, trailers, and cinematic adventures.",
    icon: Video,
  },
  {
    title: "Lyria Music Composer",
    desc: "Generate magical soundtracks, theme songs, lullabies, and fantasy-inspired music.",
    icon: Music,
  },
  {
    title: "Birthday Storybook Creator",
    desc: "Create personalized birthday storybooks featuring children as the heroes of their own adventures.",
    icon: Gift,
  },
  {
    title: "Parent Story Creator",
    desc: "Help parents create bedtime stories, family adventures, and personalized memory books.",
    icon: Heart,
  },
  {
    title: "Learning Adventure Builder",
    desc: "Generate educational stories that make learning fun through imagination and interactive adventures.",
    icon: Rocket,
  },
];

export default function CreatorPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <FloatingPetals />
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Future AI Creative Suite Section (HERO) */}
          <section className="mb-48">
            {/* Section Header */}
            <div className="text-center mb-24 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-[0.4em] border border-rose-pink/20 backdrop-blur-sm"
              >
                <Sparkles className="w-3.5 h-3.5" /> THE FUTURE OF CREATIVE STORYTELLING
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-headline text-5xl md:text-7xl text-foreground leading-tight"
              >
                Create With The Power of <br />
                <span className="italic text-rose-pink">Imagination & AI</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-muted-foreground font-headline italic max-w-4xl mx-auto leading-relaxed"
              >
                PETALS Studio is building a next-generation creative platform where children, parents, educators, and storytellers can transform their imagination into magical stories, characters, artwork, music, and cinematic adventures using Google&apos;s AI ecosystem.
              </motion.p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {aiSuiteTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-morphism rounded-[3rem] p-10 border border-rose-pink/10 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-start text-left relative overflow-hidden"
                >
                  {/* Coming Soon Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-widest border border-rose-pink/20 animate-pulse">
                      <Clock className="w-3 h-3" /> 🚧 Coming Soon
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-rose-pink/10 text-rose-pink flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <tool.icon className="w-8 h-8" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-headline text-3xl mb-6 text-foreground group-hover:text-rose-pink transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-muted-foreground text-base italic font-headline leading-relaxed">
                    {tool.desc}
                  </p>
                  
                  {/* Decorative Footer */}
                  <div className="mt-10 pt-8 border-t border-rose-pink/10 w-full flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-pink">AI Research Phase</span>
                    <Sparkles className="w-4 h-4 text-rose-pink" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Vision Block */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-40 p-16 md:p-24 rounded-[5rem] bg-rose-pink/5 border border-rose-pink/10 text-center space-y-12 relative overflow-hidden"
            >
              {/* Decorative Blurs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-rose-pink/20 blur-[120px] -translate-y-1/2 translate-x-1/2 rounded-full" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-fairy-gold/10 blur-[120px] translate-y-1/2 -translate-x-1/2 rounded-full" />
              
              <div className="space-y-8 relative z-10">
                <h3 className="font-headline text-5xl md:text-6xl text-foreground tracking-tight">Our Vision</h3>
                <div className="h-1.5 w-20 bg-rose-pink rounded-full mx-auto" />
              </div>
              
              <div className="max-w-5xl mx-auto space-y-10 relative z-10">
                <p className="text-3xl md:text-4xl font-headline italic text-foreground leading-snug">
                  Every child deserves the opportunity to become an author, creator, dreamer, and storyteller.
                </p>
                <div className="space-y-6 text-xl text-muted-foreground font-headline italic leading-relaxed opacity-90">
                  <p>
                    PETALS Studio combines imagination with AI to help families create magical worlds, meaningful stories, beautiful artwork, and unforgettable memories together.
                  </p>
                  <p className="text-base font-body not-italic opacity-70 max-w-3xl mx-auto">
                    As Google&apos;s AI ecosystem evolves, PETALS Studio will continue integrating powerful creative tools that empower users to bring their imagination to life.
                  </p>
                </div>
              </div>
              
              <div className="pt-12 relative z-10">
                <Button className="bg-rose-pink text-white hover:bg-rose-pink/90 rounded-full px-16 h-20 text-sm font-bold uppercase tracking-[0.4em] shadow-2xl shadow-rose-pink/30 transition-all hover:scale-105 active:scale-95 group">
                  Join the Creative Journey <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </section>

          {/* Original Creator Section */}
          <div className="pt-32 border-t border-rose-pink/10">
            {/* Header */}
            <div className="text-center mb-16 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-[0.4em] border border-rose-pink/20 backdrop-blur-sm"
              >
                <Wand2 className="w-3.5 h-3.5" /> Enchanted Studio
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-headline text-5xl md:text-7xl text-foreground"
              >
                Poster <span className="italic text-rose-pink">& Wall Art</span> Creator
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl text-muted-foreground font-headline italic max-w-2xl mx-auto"
              >
                Compose your own magical memories using characters and landscapes from the PETALS universe.
              </motion.p>
            </div>

            {/* The Creator Tool */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
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

        </div>
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
