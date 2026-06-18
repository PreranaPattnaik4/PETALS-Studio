
"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Heart, Shield, Moon } from "lucide-react";

const mainCharacters = [
  {
    id: "char-alora",
    name: "Alora",
    role: "The Serene Mermaid",
    legacy: "Bridging the Two Worlds",
    desc: "Guardian of the shimmering shoals, bridging the world of the waves and the mysteries of the deep. Her melody is the heartbeat of the ocean.",
    accent: "from-blue-100 to-cyan-50",
    icon: Heart,
    buttonText: "Read Legend"
  },
  {
    id: "char-rosebella",
    name: "RoseBella",
    role: "Queen of the Crystal Rose",
    legacy: "The Sovereign Legacy",
    desc: "The sovereign of the blooming glass, wielding light to protect her fragile kingdom. She embodies the strength found in grace.",
    accent: "from-rose-100 to-pink-50",
    icon: Shield,
    buttonText: "Read Legend"
  },
  {
    id: "char-nerina",
    name: "Nerina",
    role: "Guardian of Ocean Dreams",
    legacy: "The Sleepweaver's Legacy",
    desc: "She weaves nightmares into sea pearls, ensuring every child sleeps peacefully beneath the waves. A silent protector of the night.",
    accent: "from-moonlight-blue/20 to-pearl-white",
    icon: Sparkles,
    buttonText: "Read Legend"
  },
  {
    id: "char-vespera",
    name: "Vespera",
    role: "The Midnight Weaver",
    legacy: "The Shadow Legacy",
    desc: "Mistress of shadows and moonbeams, she protects the secrets hidden within the night's velvet embrace. She finds beauty in the dark.",
    accent: "from-purple-100 to-soft-lavender/30",
    icon: Moon,
    buttonText: "Read Legend"
  }
];

interface CharacterShowcaseProps {
  excludeIds?: string[];
}

export function CharacterShowcase({ excludeIds = [] }: CharacterShowcaseProps) {
  const displayCharacters = mainCharacters.filter(char => !excludeIds.includes(char.id));

  return (
    <section className="py-32 overflow-hidden bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-pink/10 text-rose-pink text-xs font-bold uppercase tracking-widest border border-rose-pink/20"
          >
            <Sparkles className="w-4 h-4" /> Character Lexicon
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-headline text-5xl md:text-7xl"
          >
            The Enchanting <span className="italic text-rose-pink">Souls</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground italic font-headline max-w-2xl mx-auto"
          >
            Meet the guardians, dreamers, and weavers who inhabit the blooming universes of PETALS.
          </motion.p>
        </div>

        <div className="space-y-32">
          {displayCharacters.map((char, i) => {
            const img = PlaceHolderImages.find(p => p.id === char.id);
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Section - Reduced from col-span-6 to col-span-5 for a smaller profile */}
                <div className={`lg:col-span-5 relative aspect-[4/5] md:aspect-square group ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${char.accent} rounded-[4rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity`} />
                  <div className="relative h-full w-full rounded-[3.5rem] overflow-hidden border border-white/40 shadow-2xl">
                    <Image 
                      src={img?.imageUrl || ""}
                      alt={char.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      data-ai-hint="character portrait"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Content Section - Increased from col-span-6 to col-span-7 */}
                <div className={`lg:col-span-7 space-y-8 ${
                  isEven ? "lg:order-2 lg:pl-12" : "lg:order-1 lg:pr-12"
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-rose-pink">
                      <char.icon className="w-6 h-6" />
                      <span className="text-sm font-bold uppercase tracking-widest">{char.legacy}</span>
                    </div>
                    <h3 className="font-headline text-5xl md:text-6xl leading-tight">
                      {char.name}
                    </h3>
                    <p className="text-rose-pink text-xl font-headline italic">
                      {char.role}
                    </p>
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed font-headline italic border-l-4 border-rose-pink/20 pl-6">
                    {char.desc}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button size="lg" className="bg-rose-pink text-white hover:bg-rose-pink/90 rounded-2xl px-10 h-14 text-lg shadow-xl shadow-rose-pink/20 group">
                      <BookOpen className="mr-2 w-5 h-5 transition-transform group-hover:rotate-12" /> {char.buttonText}
                    </Button>
                    <Button variant="outline" size="lg" className="border-rose-pink text-rose-pink hover:bg-rose-pink/5 rounded-2xl px-10 h-14 text-lg">
                      View Gallery
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
