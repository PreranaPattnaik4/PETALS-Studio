
"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";

const characters = [
  {
    name: "Alora",
    role: "The Serene Mermaid",
    desc: "Guardian of the shimmering shoals, her songs can calm even the fiercest ocean storms.",
    img: "char-alora"
  },
  {
    name: "RoseBella",
    role: "Queen of the Crystal Rose",
    desc: "The sovereign of the blooming glass, wielding light to protect her fragile kingdom.",
    img: "char-rosebella"
  },
  {
    name: "Nerina",
    role: "Guardian of Ocean Dreams",
    desc: "She weaves nightmares into sea pearls, ensuring every child sleeps peacefully beneath the waves.",
    img: "char-nerina"
  }
];

export function CharacterShowcase() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline text-4xl md:text-5xl">Character Showcase</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto italic font-headline text-lg">
            Meet the enchanting souls who inhabit the blooming universes of PETALS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {characters.map((char, index) => {
            const charImg = PlaceHolderImages.find(img => img.id === char.img);
            return (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group glass-morphism rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-6 shadow-md group-hover:shadow-rose-pink/20 group-hover:shadow-2xl transition-all duration-500">
                  <Image
                    src={charImg?.imageUrl || ""}
                    alt={char.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    data-ai-hint={charImg?.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline text-2xl">{char.name}</h3>
                    <span className="text-[10px] uppercase tracking-widest text-rose-pink font-bold">Protagonist</span>
                  </div>
                  <p className="text-rose-gold font-medium text-sm italic">{char.role}</p>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {char.desc}
                  </p>
                  <Button variant="link" className="text-rose-pink p-0 h-auto hover:translate-x-2 transition-transform">
                    Read Story →
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
