
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Sparkles, ArrowRight, MapPin } from 'lucide-react';
import { CharacterShowcase } from './CharacterShowcase';

const categories = ["All", "Characters", "Portraits", "Watercolor", "Landscapes"];

const artworks = [
  {
    id: "moonlit-whispers",
    category: "Portraits",
    url: PlaceHolderImages.find(img => img.id === 'gallery-moonlit-whispers')?.imageUrl || "",
    title: "Whispers of the Moonlit Kingdom",
    description: "In the heart of the silent night, where the moonbeams weave patterns through the ancient trees, the Moonlit Guardian watches over the forgotten paths of the kingdom."
  },
  {
    id: "seraph-luna",
    category: "Portraits",
    url: PlaceHolderImages.find(img => img.id === 'gallery-seraph-luna')?.imageUrl || "",
    title: "The Ethereal Seraph of Luna",
    description: "A manifestation of pure lunar energy, the Seraph watches over the celestial tides that govern the emotions of the PETALS realm."
  },
  {
    id: "portrait-alora",
    category: "Portraits",
    url: PlaceHolderImages.find(img => img.id === 'char-alora')?.imageUrl || "",
    title: "Alora: The Serene Mermaid",
    description: "A portrait of Alora, the bridge between the waves and the deep."
  },
  {
    id: "portrait-rosebella",
    category: "Portraits",
    url: PlaceHolderImages.find(img => img.id === 'char-rosebella')?.imageUrl || "",
    title: "RoseBella: Queen of the Crystal Rose",
    description: "The sovereign of the blooming glass. This portrait captures RoseBella's grace and quiet strength."
  },
  {
    id: "portrait-nerina",
    category: "Portraits",
    url: PlaceHolderImages.find(img => img.id === 'char-nerina')?.imageUrl || "",
    title: "Nerina: Guardian of Ocean Dreams",
    description: "Nerina, who weaves the ocean's whispers into pearls of peace."
  },
  {
    id: "portrait-vespera",
    category: "Portraits",
    url: PlaceHolderImages.find(img => img.id === 'char-vespera')?.imageUrl || "",
    title: "Vespera: The Midnight Weaver",
    description: "Mistress of shadows and moonlight. Vespera finds the hidden beauty in the night."
  },
  {
    id: "songs-mermaids-featured",
    category: "Watercolor",
    url: PlaceHolderImages.find(img => img.id === 'gallery-mermaids')?.imageUrl || "",
    title: "Songs of the Shimmering Sea",
    description: "The ancient melodies of the ocean, captured in a single frame."
  },
  { 
    id: "enchanted-valley", 
    category: "Landscapes", 
    url: PlaceHolderImages.find(img => img.id === 'gallery-enchanted-valley')?.imageUrl || "", 
    title: "The Enchanted Valley",
    description: "A breathtaking view of the Enchanted Valley within the Crystal Rose kingdom."
  },
  {
    id: "whispering-library",
    category: "Landscapes",
    url: PlaceHolderImages.find(img => img.id === 'gallery-whispering-library')?.imageUrl || "",
    title: "The Whispering Library",
    description: "Deep within the heart of the Crystal Palace lies the Whispering Library."
  },
  {
    id: "crystal-echoes",
    category: "Landscapes",
    url: PlaceHolderImages.find(img => img.id === 'gallery-crystal-echoes')?.imageUrl || "",
    title: "Echoes of the Crystal Palace",
    description: "A mesmerizing view of the Crystal Palace gardens at twilight."
  },
  {
    id: "shimmering-grotto",
    category: "Watercolor",
    url: PlaceHolderImages.find(img => img.id === 'gallery-shimmering-grotto')?.imageUrl || "",
    title: "The Shimmering Grotto",
    description: "Deep beneath the crystal waves lies a grotto of infinite light."
  },
  {
    id: "forgotten-map",
    category: "Landscapes",
    url: PlaceHolderImages.find(img => img.id === 'gallery-map')?.imageUrl || "",
    title: "The Forgotten Map of Floria",
    description: "An ancient, hand-drawn map revealing the hidden paths and secret groves."
  },
  {
    id: "mystic-garden-featured",
    category: "Landscapes",
    url: PlaceHolderImages.find(img => img.id === 'gallery-mystic-garden')?.imageUrl || "",
    title: "The Secret Mystic Garden",
    description: "A hidden sanctuary where magic flows as freely as the waterfalls."
  },
  {
    id: "crystal-cascades",
    category: "Landscapes",
    url: PlaceHolderImages.find(img => img.id === 'gallery-crystal-cascades')?.imageUrl || "",
    title: "The Crystal Cascades",
    description: "A magical waterfall where the water flows like liquid starlight."
  },
  {
    id: "celestial-dreamscape",
    category: "Landscapes",
    url: PlaceHolderImages.find(img => img.id === 'gallery-celestial-dreamscape')?.imageUrl || "",
    title: "The Celestial Dreamscape",
    description: "A mystical journey across the starlit horizon of the PETALS universe."
  },
  {
    id: "moon-forest",
    category: "Landscapes",
    url: PlaceHolderImages.find(img => img.id === 'gallery-moon-forest')?.imageUrl || "",
    title: "The Silver Moon Forest",
    description: "Deep within the silver-lit woods, where the trees whisper in forgotten tongues."
  },
  {
    id: "floating-isles",
    category: "Landscapes",
    url: PlaceHolderImages.find(img => img.id === 'gallery-floating-isles')?.imageUrl || "",
    title: "The Floating Isles of Aethelgard",
    description: "Soaring above the clouds, the floating isles are home to the wind-whisperers."
  },
  {
    id: "ancient-bloom",
    category: "Watercolor",
    url: PlaceHolderImages.find(img => img.id === 'gallery-ancient-bloom')?.imageUrl || "",
    title: "The Ancient Bloom of the Deep",
    description: "A rare watercolor study of the Ancient Bloom."
  }
];

const featuredStoryTwo = {
  id: "mystic-shores-featured",
  category: "Featured Landscape",
  url: PlaceHolderImages.find(img => img.id === 'gallery-mystic-shores')?.imageUrl || "",
  title: "Mystic Shores of the Crystal Rose",
  description: "Where shimmering waves meet crystalline sands, the Mystic Shores are a gateway to the unknown depths."
};

export function ArtGallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArt = activeCategory === "All" 
    ? artworks 
    : artworks.filter(art => art.category === activeCategory);

  return (
    <section className="py-24 bg-white/30">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-[0.3em] border border-rose-pink/20"
          >
            <Sparkles className="w-3.5 h-3.5" /> Studio Portfolio
          </motion.div>
          <h2 className="font-headline text-5xl md:text-6xl text-foreground">Enchanted Illustrations</h2>
          <div className="space-y-2">
            <p className="text-muted-foreground italic font-headline text-2xl">
              Illustrations That Tell Their Own Stories
            </p>
          </div>
        </div>

        {/* Big Featured Card Two - Hero image remains large */}
        <AnimatePresence>
          {activeCategory === "All" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              className="mb-24 group relative"
            >
              <div className="absolute inset-0 bg-moonlight-blue/10 blur-[100px] rounded-full scale-110 opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative glass-morphism rounded-[4rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/40 shadow-2xl">
                <div className="lg:col-span-5 p-8 md:p-16 flex flex-col justify-center space-y-8 bg-white/40 backdrop-blur-md lg:order-1 order-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-rose-pink font-bold uppercase tracking-[0.2em] text-xs">
                      <MapPin className="w-4 h-4" /> Signature Landscape
                    </div>
                    <h3 className="font-headline text-4xl md:text-5xl leading-tight">
                      {featuredStoryTwo.title}
                    </h3>
                    <p className="text-xl text-muted-foreground italic font-headline leading-relaxed">
                      {featuredStoryTwo.description}
                    </p>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-fit border-rose-pink text-rose-pink hover:bg-rose-pink hover:text-white h-12 rounded-2xl px-8 font-bold uppercase tracking-widest text-xs transition-all shadow-md group/btn">
                        Explore Shores <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white/95 backdrop-blur-xl border-none shadow-2xl rounded-[3rem]">
                      <div className="p-12 md:p-16 overflow-y-auto max-h-[80vh] custom-scrollbar text-center">
                        <h3 className="font-headline text-5xl mb-8">{featuredStoryTwo.title}</h3>
                        <div className="relative aspect-video rounded-3xl overflow-hidden mb-10 shadow-xl border border-white/20">
                          <Image src={featuredStoryTwo.url} alt={featuredStoryTwo.title} fill className="object-cover" />
                        </div>
                        <div className="max-w-2xl mx-auto space-y-6 text-muted-foreground leading-relaxed italic font-headline text-xl">
                          <p>
                            The Mystic Shores are where the physical realm of the Crystal Rose ends and the infinite mysteries of the deep begin. It is said that at low tide, one can see the glowing remains of an ancient city, perfectly preserved beneath the glass-like water.
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="lg:col-span-7 relative h-[400px] lg:h-[600px] overflow-hidden lg:order-2 order-1">
                  <Image
                    src={featuredStoryTwo.url}
                    alt={featuredStoryTwo.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "ghost"}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-10 h-12 text-sm font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? "bg-rose-pink hover:bg-rose-pink text-white shadow-lg shadow-rose-pink/20" 
                  : "text-muted-foreground hover:text-rose-pink hover:bg-rose-pink/5"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeCategory === "Characters" ? (
            <motion.div
              key="character-showcase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <CharacterShowcase />
            </motion.div>
          ) : (
            <motion.div
              key="masonry-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
            >
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
                      <div className="group relative overflow-hidden rounded-[2rem] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/40 bg-white">
                        <Image
                          src={art.url}
                          alt={art.title}
                          width={400}
                          height={533}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                          <div className="text-white">
                            <p className="text-[10px] uppercase tracking-widest mb-1 font-bold text-rose-pink">{art.category}</p>
                            <h3 className="font-headline text-xl leading-tight">{art.title}</h3>
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
                            <div className="space-y-4">
                              <div className="h-px w-24 bg-rose-pink/30" />
                              <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed italic font-headline text-lg">
                                {art.description}
                              </div>
                            </div>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
