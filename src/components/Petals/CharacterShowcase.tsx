"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";

const characters = [
  {
    name: "Alora",
    role: "The Serene Mermaid",
    desc: "Guardian of the shimmering shoals, bridging the world of the waves and the mysteries of the deep.",
    img: "char-alora",
    accent: "border-blue-200"
  },
  {
    name: "RoseBella",
    role: "Queen of the Crystal Rose",
    desc: "The sovereign of the blooming glass, wielding light to protect her fragile kingdom.",
    img: "char-rosebella",
    accent: "border-rose-200"
  },
  {
    name: "Vespera",
    role: "The Midnight Weaver",
    desc: "Mistress of shadows and moonbeams, protecting secrets hidden within the night's velvet embrace.",
    img: "char-vespera",
    accent: "border-purple-200"
  }
];

export function CharacterShowcase() {
  return (
    <section className="py-32 overflow-hidden bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="space-y-4">
            <h2 className="font-headline text-5xl md:text-6xl">Character Lexicon</h2>
            <p className="text-xl text-muted-foreground italic font-headline max-w-xl">
              Meet the enchanting souls who inhabit the blooming universes of PETALS.
            </p>
          </div>
          <Button variant="outline" className="border-rose-pink text-rose-pink rounded-full px-8 h-12 uppercase tracking-widest text-xs font-bold">
            View All Characters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {characters.map((char, i) => {
            const img = PlaceHolderImages.find(p => p.id === char.img);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className={`relative aspect-[4/5] rounded-[3rem] overflow-hidden border-2 ${char.accent} shadow-xl group-hover:shadow-2xl transition-all duration-500`}>
                  <Image 
                    src={img?.imageUrl || ""}
                    alt={char.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint="character portrait"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-rose-pink text-xs font-bold uppercase tracking-widest mb-2">{char.role}</p>
                    <h3 className="text-white font-headline text-4xl mb-4">{char.name}</h3>
                    <p className="text-white/60 text-sm italic leading-relaxed mb-6">{char.desc}</p>
                    <Button className="w-full bg-white text-black rounded-full h-12 font-bold uppercase tracking-widest text-xs">
                      View Profile
                    </Button>
                  </div>
                </div>
                <div className="mt-8 text-center group-hover:translate-y-2 transition-transform">
                  <h3 className="font-headline text-3xl mb-1">{char.name}</h3>
                  <p className="text-rose-pink text-sm font-bold tracking-widest uppercase">{char.role}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
