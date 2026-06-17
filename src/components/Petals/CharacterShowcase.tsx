
"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const characters = [
  {
    name: "Alora",
    role: "The Serene Mermaid",
    desc: "Guardian of the shimmering shoals, her songs can calm even the fiercest ocean storms. As the heart of the undersea kingdom, she bridges the world of the waves and the mysteries of the deep.",
    img: "char-alora",
    longDesc: "Long ago, beneath ancient oceans and silver moonlight, Alora was born with a voice that echoed the ocean's heartbeat. She protects the hidden pathways of the Crystal Rose, using her celestial melodies to mend wounded hearts and guide lost souls back to the light."
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
  },
  {
    name: "Vespera",
    role: "The Midnight Weaver",
    desc: "Mistress of shadows and moonbeams, she protects the secrets hidden within the night's velvet embrace.",
    img: "char-vespera"
  }
];

export function CharacterShowcase() {
  const alora = characters.find(c => c.name === "Alora");
  const others = characters.filter(c => c.name !== "Alora");
  const aloraImg = PlaceHolderImages.find(img => img.id === alora?.img);

  return (
    <section className="py-24 overflow-hidden bg-white/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl">Character Showcase</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto italic font-headline text-lg md:text-xl">
            Meet the enchanting souls who inhabit the blooming universes of PETALS.
          </p>
        </div>

        {/* Featured: Alora */}
        {alora && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 glass-morphism rounded-[3rem] overflow-hidden shadow-2xl border-white/40"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[500px]">
              <div className="lg:col-span-7 relative h-[400px] lg:h-auto group">
                <Image
                  src={aloraImg?.imageUrl || ""}
                  alt={alora.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  data-ai-hint={aloraImg?.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-transparent" />
                <div className="absolute top-8 left-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest border border-white/20">
                    <Sparkles className="w-3.5 h-3.5" /> Featured Protagonist
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-8 bg-white/40 backdrop-blur-xl">
                <div className="space-y-4">
                  <h3 className="font-headline text-5xl md:text-6xl text-rose-pink">{alora.name}</h3>
                  <p className="text-rose-gold text-xl md:text-2xl font-headline italic">{alora.role}</p>
                </div>
                
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed italic border-l-4 border-rose-pink/30 pl-6">
                    {alora.desc}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {alora.longDesc}
                  </p>
                </div>

                <div className="pt-4">
                  <Button size="lg" className="bg-rose-pink text-white hover:bg-rose-pink/90 rounded-2xl px-10 h-14 text-lg shadow-xl shadow-rose-pink/20 transition-all hover:-translate-y-1">
                    Discover Alora's Journey
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Others Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {others.map((char, index) => {
            const charImg = PlaceHolderImages.find(img => img.id === char.img);
            return (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group glass-morphism rounded-[2.5rem] p-6 transition-all duration-500 hover:-translate-y-3"
              >
                <div className="relative h-96 w-full rounded-[2rem] overflow-hidden mb-6 shadow-md group-hover:shadow-rose-pink/30 group-hover:shadow-2xl transition-all duration-500">
                  <Image
                    src={charImg?.imageUrl || ""}
                    alt={char.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    data-ai-hint={charImg?.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <Button variant="outline" className="w-full bg-white/20 backdrop-blur-md border-white/40 text-white rounded-xl hover:bg-white hover:text-rose-pink">
                      Read Legend
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3 px-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline text-3xl group-hover:text-rose-pink transition-colors">{char.name}</h3>
                    <span className="text-[10px] uppercase tracking-widest text-rose-pink font-bold px-2 py-0.5 rounded-full bg-rose-pink/10">Legacy</span>
                  </div>
                  <p className="text-rose-gold font-medium text-sm italic">{char.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {char.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block h-px w-24 bg-rose-pink/20 mb-8" />
          <p className="font-headline text-2xl italic text-muted-foreground">More souls coming to the Crystal Rose universe soon...</p>
        </div>
      </div>
    </section>
  );
}

