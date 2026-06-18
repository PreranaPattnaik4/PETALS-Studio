
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, Film, Clock, ChevronRight } from "lucide-react";
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
    <div className="min-h-screen bg-pearl-white selection:bg-rose-pink selection:text-white">
      <FloatingPetals />
      <Navbar />

      <main className="relative">
        {/* Breathtaking Cinematic Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden">
          {/* Dreamy Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-rose-pink/10 via-soft-lavender/5 to-pearl-white" />
            <div className="absolute top-1/4 -left-10 w-96 h-96 bg-rose-pink/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 -right-10 w-[500px] h-[500px] bg-moonlight-blue/20 blur-[150px] rounded-full" />
          </div>

          <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            {/* Cinematic Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/40 backdrop-blur-md text-rose-pink text-[10px] font-bold uppercase tracking-[0.4em] border border-rose-pink/20 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5" /> Cinematic Storytelling
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="font-headline text-5xl md:text-7xl lg:text-8xl text-foreground leading-[1.1] mb-8"
            >
              Enchanting Tales <br />
              <span className="italic text-rose-pink">Brought To Life</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground font-headline italic leading-relaxed max-w-3xl mb-16"
            >
              Discover magical worlds, beloved characters, and emotional adventures through cinematic storytelling, animated experiences, and visual journeys crafted to inspire wonder.
            </motion.p>

            {/* Featured Video Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative w-[90%] md:w-[85%] aspect-video group"
            >
              {/* Soft Glow Behind Container */}
              <div className="absolute inset-0 bg-rose-pink/30 blur-[60px] rounded-[4rem] opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
              
              <div className="relative h-full w-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden glass-morphism border-white/40 shadow-[0_50px_100px_-20px_rgba(247,183,195,0.3)] bg-black">
                <Image 
                  src={heroImage?.imageUrl || "https://picsum.photos/seed/vhero/1200/600"}
                  alt="Featured Cinematic Journey"
                  fill
                  className="object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
                  data-ai-hint="cinematic fantasy animation"
                  priority
                />
                
                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                {/* Play Button Overlay - Updated to White/Pink Theme */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white shadow-2xl group/btn cursor-pointer"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-lg transition-transform group-hover/btn:scale-105">
                      <Play className="w-8 h-8 md:w-10 md:h-10 fill-rose-pink text-rose-pink translate-x-1" />
                    </div>
                  </motion.div>
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div className="text-left space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-pink">Now Playing Teaser</p>
                    <h3 className="text-2xl md:text-3xl font-headline text-white italic">The Heart of the Crystal Rose</h3>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                    <Clock className="w-4 h-4" /> 2:45 Runtime
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero Actions */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-16">
              <Button size="lg" className="bg-rose-pink text-white hover:bg-rose-pink/90 rounded-full px-10 h-14 text-sm font-bold uppercase tracking-widest shadow-xl shadow-rose-pink/20 transition-all">
                <Play className="mr-3 w-5 h-5 fill-current" /> Watch Featured Trailer
              </Button>
              <Button variant="outline" size="lg" className="border-rose-pink text-rose-pink hover:bg-rose-pink/5 rounded-full px-10 h-14 text-sm font-bold uppercase tracking-widest transition-all">
                <Sparkles className="mr-3 w-5 h-5" /> Explore Video Collection
              </Button>
            </div>
          </div>
        </section>

        {/* New Section: Featured Short Highlight */}
        <section className="py-24 bg-white/50 backdrop-blur-sm relative overflow-hidden">
          <div className="container mx-auto px-6 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-[0.3em] border border-rose-pink/20">
                <Sparkles className="w-3.5 h-3.5" /> Latest Enchanted Short
              </div>
              <h2 className="font-headline text-4xl md:text-5xl text-foreground">A Glimpse of Magic</h2>
            </motion.div>

            {/* Vertical Video Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[400px] aspect-[9/16] group"
            >
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-rose-pink/20 blur-[60px] rounded-[3.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative h-full w-full rounded-[3.5rem] overflow-hidden glass-morphism border-[12px] border-white/40 shadow-[0_50px_100px_-20px_rgba(247,183,195,0.4)] bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/7U0izt4zZTo?autoplay=0&controls=1&rel=0"
                  title="PETALS Studio Featured Short"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Decorative Frame Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-fairy-gold/20 blur-2xl rounded-full" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-rose-pink/20 blur-2xl rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center max-w-lg"
            >
              <p className="text-xl text-muted-foreground italic font-headline leading-relaxed">
                "In every fleeting moment, a story begins to bloom. Witness the delicate dance of magic in our latest character short."
              </p>
              <div className="mt-8 flex justify-center gap-4">
                 <div className="h-1 w-12 bg-rose-pink/20 rounded-full" />
                 <div className="h-1 w-24 bg-rose-pink rounded-full" />
                 <div className="h-1 w-12 bg-rose-pink/20 rounded-full" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 bg-white/40 backdrop-blur-md border-y border-rose-pink/10 sticky top-[72px] z-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {categories.map((cat, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-10 h-12 text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                      ? "bg-rose-pink text-white shadow-lg shadow-rose-pink/20" 
                      : "text-muted-foreground hover:text-rose-pink hover:bg-rose-pink/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Video Grid Section */}
        <section className="py-24 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group space-y-6"
                >
                  <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-white/40 bg-white">
                    <Image 
                      src={video.image}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint="video thumbnail"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-105 transition-all duration-500 border border-white/40 shadow-xl">
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </div>
                    </div>
                    {/* Duration Badge */}
                    <div className="absolute bottom-6 right-6 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="space-y-4 px-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-pink">{video.category}</span>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5" /> {video.duration}
                      </div>
                    </div>
                    <h3 className="font-headline text-2xl group-hover:text-rose-pink transition-colors leading-tight">{video.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed italic font-headline line-clamp-2 border-l-2 border-rose-pink/20 pl-4">
                      {video.description}
                    </p>
                    <Button variant="link" className="p-0 h-auto text-rose-pink text-[10px] font-bold uppercase tracking-widest group/link">
                      Watch Video <ChevronRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cinematic Closing Banner */}
        <section className="py-32 bg-rose-pink/5 border-t border-rose-pink/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <Film className="w-[500px] h-[500px] absolute -bottom-20 -right-20 rotate-12" />
          </div>
          <div className="container mx-auto px-6 text-center space-y-8 relative z-10">
            <h2 className="font-headline text-4xl md:text-5xl">Ready For Adventure?</h2>
            <p className="text-xl text-muted-foreground italic font-headline max-w-2xl mx-auto">
              Join the PETALS Studio community to be the first to experience our upcoming cinematic shorts and series.
            </p>
            <Button size="lg" className="bg-white text-rose-pink hover:bg-rose-pink hover:text-white rounded-full px-12 h-14 text-sm font-bold uppercase tracking-widest shadow-xl border border-rose-pink/10">
              Join the Studio
            </Button>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
