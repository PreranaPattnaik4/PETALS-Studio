
"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

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
    img: "char-rosebella",
    longDesc: "Kind-hearted and gentle, RoseBella is adored by everyone in the Crystal Palace. She wields the ancient light of the blooming glass to ensure the safety of her kingdom, standing as a beacon of hope for all her subjects."
  },
  {
    name: "Nerina",
    role: "Guardian of Ocean Dreams",
    desc: "She weaves nightmares into sea pearls, ensuring every child sleeps peacefully beneath the waves.",
    img: "char-nerina",
    longDesc: "In the realm where dreams are woven from sea spray and starlight, Nerina keeps watch. She has the unique power to transform fear into beauty, turning restless nights into shimmering pearls of peaceful slumber."
  },
  {
    name: "Vespera",
    role: "The Midnight Weaver",
    desc: "Mistress of shadows and moonbeams, she protects the secrets hidden within the night's velvet embrace.",
    img: "char-vespera",
    longDesc: "Connected to the deeper, mysterious parts of the forest, Vespera understands the things others fear. She is a guardian of forgotten magic and ancient lore, weaving the very fabric of the night to protect the kingdom's deepest secrets."
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
            className="mb-32 glass-morphism rounded-[3rem] overflow-hidden shadow-2xl border-white/40"
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

        {/* Legendary Souls: Others Featured List */}
        <div className="space-y-24">
          <div className="text-center mb-12">
            <h3 className="font-headline text-3xl md:text-4xl text-foreground">Legendary Souls</h3>
            <div className="h-px w-24 bg-rose-pink/30 mx-auto mt-4" />
          </div>
          
          {others.map((char, index) => {
            const charImg = PlaceHolderImages.find(img => img.id === char.img);
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="glass-morphism rounded-[3rem] overflow-hidden shadow-2xl border-white/40"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[450px]">
                  {/* Image Container - Swaps Order based on index */}
                  <div className={cn(
                    "lg:col-span-6 relative h-[400px] lg:h-auto group",
                    !isEven ? "lg:order-2" : "lg:order-1"
                  )}>
                    <Image
                      src={charImg?.imageUrl || ""}
                      alt={char.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      data-ai-hint={charImg?.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
                    <div className="absolute top-6 left-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-pink/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
                        Legacy
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Container */}
                  <div className={cn(
                    "lg:col-span-6 p-8 md:p-12 lg:p-14 flex flex-col justify-center space-y-6 bg-white/40 backdrop-blur-xl",
                    !isEven ? "lg:order-1" : "lg:order-2"
                  )}>
                    <div className="space-y-2">
                      <h3 className="font-headline text-4xl md:text-5xl text-rose-pink">{char.name}</h3>
                      <p className="text-rose-gold text-lg md:text-xl font-headline italic">{char.role}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed italic border-l-4 border-rose-pink/20 pl-4">
                        {char.desc}
                      </p>
                      <p className="text-sm text-muted-foreground/80 leading-relaxed">
                        {char.longDesc}
                      </p>
                    </div>

                    <div className="pt-4">
                      <Button variant="outline" size="lg" className="border-rose-pink text-rose-pink hover:bg-rose-pink hover:text-white rounded-xl px-8 transition-all hover:shadow-lg">
                        Read Legend
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-32 text-center">
          <div className="inline-block h-px w-32 bg-rose-pink/20 mb-8" />
          <p className="font-headline text-2xl italic text-muted-foreground">More souls coming to the Crystal Rose universe soon...</p>
        </div>
      </div>
    </section>
  );
}
