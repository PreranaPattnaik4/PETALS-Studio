
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const categories = ["All", "Portraits", "Watercolor", "Landscapes", "Characters"];

const artworks = [
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
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "ghost"}
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? "bg-rose-pink hover:bg-rose-pink" : "hover:text-rose-pink"}
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
                    <div className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                      <Image
                        src={art.url}
                        alt={art.title}
                        width={600}
                        height={800}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-pink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <div className="text-white">
                          <p className="text-xs uppercase tracking-widest mb-1">{art.category}</p>
                          <h3 className="font-headline text-xl">{art.title}</h3>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
                    <div className="relative w-full aspect-auto min-h-[60vh]">
                      <Image 
                        src={art.url} 
                        alt={art.title} 
                        fill 
                        className="object-contain"
                      />
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
