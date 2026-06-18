
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, Film, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState } from 'react';

const categories = ["All", "Short Films", "Character Promos", "Story Teasers"];

const videos = [
  {
    id: 1,
    title: "The Awakening of Alora",
    category: "Short Films",
    duration: "4:20",
    image: "https://picsum.photos/seed/v1/800/450",
    description: "Witness the moment Alora discovers her hidden destiny beneath the waves."
  },
  {
    id: 2,
    title: "Crystal Rose Chronicles",
    category: "Story Teasers",
    duration: "1:45",
    image: "https://picsum.photos/seed/v2/800/450",
    description: "A glimpse into the shimmering world of the Glass Kingdom."
  },
  {
    id: 3,
    title: "Nerina's Lullaby",
    category: "Character Promos",
    duration: "2:10",
    image: "https://picsum.photos/seed/v3/800/450",
    description: "Experience the soothing melodies of the Ocean's Guardian."
  },
  {
    id: 4,
    title: "The Starlight Lantern",
    category: "Short Films",
    duration: "5:30",
    image: "https://picsum.photos/seed/v4/800/450",
    description: "A young stargazer's journey to bring light back to the world."
  },
  {
    id: 5,
    title: "Moonflower Dance",
    category: "Story Teasers",
    duration: "1:15",
    image: "https://picsum.photos/seed/v5/800/450",
    description: "The seasonal bloom of the sacred moonflowers in motion."
  },
  {
    id: 6,
    title: "Guardians of Dreams",
    category: "Character Promos",
    duration: "3:05",
    image: "https://picsum.photos/seed/v6/800/450",
    description: "Meet the protectors of the realm of sleep."
  }
];

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const heroImage = PlaceHolderImages.find(img => img.id === 'crystal-rose-universe');

  const filteredVideos = activeCategory === "All" 
    ? videos 
    : videos.filter(v => v.category === activeCategory);

  return (
    <div className="min-h-screen bg-pearl-white">
      <FloatingPetals />
      <Navbar />

      <main className="relative">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-[3rem] overflow-hidden group shadow-2xl h-[500px] flex items-center p-8 md:p-16"
          >
            <Image 
              src={heroImage?.imageUrl || "https://picsum.photos/seed/vhero/1200/600"}
              alt="Featured Animation"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              data-ai-hint="cinematic animation"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            
            <div className="relative z-10 max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-pink/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest border border-white/20">
                <Sparkles className="w-4 h-4" /> Featured Animation
              </div>
              <h1 className="font-headline text-5xl md:text-7xl text-white leading-tight">
                Stories That <span className="italic text-rose-pink">Move</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed font-headline italic">
                Experience the PETALS Universe through cinematic animations and storytelling in motion.
              </p>
              <Button size="lg" className="bg-rose-pink text-white hover:bg-rose-pink/90 rounded-full px-10 h-14 text-lg shadow-xl shadow-rose-pink/20">
                <Play className="mr-2 w-5 h-5 fill-current" /> Watch Featured Film
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Filter Section */}
        <section className="pb-12 px-12">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((cat, i) => (
              <Button 
                key={i}
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
        </section>

        {/* Video Grid */}
        <section className="pb-32 px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group space-y-4"
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <Image 
                    src={video.image}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint="video thumbnail"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-110 transition-transform duration-500 border border-white/40 shadow-xl">
                      <Play className="w-8 h-8 fill-current translate-x-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold">
                    {video.duration}
                  </div>
                </div>
                
                <div className="space-y-2 px-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-rose-pink">{video.category}</span>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" /> {video.duration}
                    </div>
                  </div>
                  <h3 className="font-headline text-2xl group-hover:text-rose-pink transition-colors">{video.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 italic">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
