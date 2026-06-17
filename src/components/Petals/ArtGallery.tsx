
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const categories = ["All", "Characters", "Portraits", "Watercolor", "Landscapes"];

const artworks = [
  { 
    id: "featured-sisters", 
    category: "Characters", 
    url: PlaceHolderImages.find(img => img.id === 'gallery-sisters')?.imageUrl || "", 
    title: "The Bond of Two Hearts: RoseBella & Lunaria",
    description: `🌹 RoseBella
kind-hearted, gentle, loving, and deeply adored by everyone.
But RoseBella’s younger sister,
🌙 Lunaria
was different.
Lunaria was curious, emotional, independent, and deeply connected to strange things others feared:
dark forests
wounded creatures
forgotten magic
lonely places

As a child, Lunaria rescued a tiny black kitten named:
🖤 Nyx
Though harmless and affectionate, villagers feared the kitten because of old superstitions.
Lunaria could never understand:
“Why do people fear things that never hurt anyone?”
This slowly became the beginning of her loneliness.

RoseBella always comforted and protected her younger sister.
The sisters loved each other deeply.
They played beneath silver trees with:
a small deer
two little birds
moonflowers
songs
magical stories

But while RoseBella was naturally loved by everyone,
Lunaria slowly began feeling emotionally different and misunderstood.

One day Lunaria discovered an ancient magical book:
📖 Moonlight Veils
At first, the book showed only gentle magic:
healing light
moonfire
emotional magic
peaceful spells

Lunaria secretly practiced harmless magic beneath moonlight while Nyx slept beside her.
But society feared magic.
After a misunderstanding involving Lunaria healing a wounded deer with magic, villagers began whispering that she was dangerous.
Their fear slowly isolated her emotionally.`
  },
  { 
    id: "enchanted-valley", 
    category: "Landscapes", 
    url: PlaceHolderImages.find(img => img.id === 'gallery-enchanted-valley')?.imageUrl || "", 
    title: "The Enchanted Valley",
    description: "A breathtaking view of the Enchanted Valley within the Crystal Rose kingdom, where the light of the ancient sun illuminates the path to forgotten wonders."
  },
  {
    id: "dream-guardians",
    category: "Characters",
    url: PlaceHolderImages.find(img => img.id === 'gallery-guardians')?.imageUrl || "",
    title: "Guardians of the Dream Petals",
    description: "The spectral protectors who watch over the sleeping world, weaving petals of light to ward off the encroaching shadows of night."
  },
  {
    id: "songs-mermaids",
    category: "Watercolor",
    url: PlaceHolderImages.find(img => img.id === 'gallery-mermaids')?.imageUrl || "",
    title: "Songs of the Shimmering Sea",
    description: "The ancient melodies of the ocean, captured in a single frame. This watercolor-style illustration depicts the serene power of Alora as she communicates with the deep sea creatures beneath the moonlit waves."
  },
  { id: 1, category: "Portraits", url: "https://picsum.photos/seed/p1/600/800", title: "The Weaver" },
  { id: 2, category: "Landscapes", url: "https://picsum.photos/seed/l1/800/600", title: "Crystal Valley" },
  { id: 3, category: "Watercolor", url: "https://picsum.photos/seed/w1/600/600", title: "Morning Mist" },
  { id: 4, category: "Characters", url: "https://picsum.photos/seed/c1/600/900", title: "Alora Sketch" },
  { id: 5, category: "Watercolor", url: "https://picsum.photos/seed/w2/800/1000", title: "Petal Dance" },
  { id: 6, category: "Landscapes", url: "https://picsum.photos/seed/l2/900/600", title: "Secret Falls" },
];

export function ArtGallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArt = activeCategory === "All" 
    ? artworks 
    : artworks.filter(art => art.category === activeCategory);

  return (
    <section className="py-24 bg-white/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline text-4xl md:text-5xl">Art Gallery</h2>
          <p className="text-muted-foreground italic font-headline text-lg mb-8">
            Explore the visual lore of our blooming universes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "ghost"}
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? "bg-rose-pink hover:bg-rose-pink text-white" : "hover:text-rose-pink hover:bg-rose-pink/5"}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredArt.map((art) => (
              <motion.div
                layout
                key={art.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="break-inside-avoid"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="group relative overflow-hidden rounded-[2rem] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/40">
                      <Image
                        src={art.url}
                        alt={art.title}
                        width={600}
                        height={800}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                        <div className="text-white">
                          <p className="text-[10px] uppercase tracking-widest mb-2 font-bold text-rose-pink">{art.category}</p>
                          <h3 className="font-headline text-2xl leading-tight">{art.title}</h3>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl p-0 overflow-hidden bg-white/95 backdrop-blur-xl border-none shadow-2xl rounded-[2.5rem]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]">
                      <div className="lg:col-span-6 relative aspect-square lg:aspect-auto">
                        <Image 
                          src={art.url} 
                          alt={art.title} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="lg:col-span-6 p-8 lg:p-12 overflow-y-auto custom-scrollbar flex flex-col">
                        <div className="space-y-6 flex-1">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-rose-pink mb-3">{art.category}</p>
                            <h3 className="font-headline text-4xl text-foreground leading-tight">{art.title}</h3>
                          </div>
                          
                          {art.description ? (
                            <div className="space-y-4">
                              <div className="h-px w-24 bg-rose-pink/30" />
                              <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed italic font-headline text-lg">
                                {art.description}
                              </div>
                            </div>
                          ) : (
                            <p className="text-muted-foreground leading-relaxed italic">
                              A beautiful illustration from the PETALS collection, capturing a moment of wonder and magic.
                            </p>
                          )}
                        </div>
                        
                        <div className="mt-12 flex justify-end">
                          <DialogClose asChild>
                            <Button variant="outline" className="rounded-full border-rose-pink text-rose-pink hover:bg-rose-pink hover:text-white">
                              Close Lore
                            </Button>
                          </DialogClose>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
