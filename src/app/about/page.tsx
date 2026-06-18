
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { motion } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { 
  Sparkles, 
  BookOpen, 
  PenTool, 
  Video, 
  Palette, 
  Cpu, 
  Home, 
  Heart,
  Quote
} from "lucide-react";

const creations = [
  {
    icon: BookOpen,
    title: "Original Fantasy Storytelling",
    desc: "We develop creator-owned fantasy worlds filled with unforgettable characters, magical adventures, emotional journeys, and timeless themes of hope, courage, friendship, and transformation."
  },
  {
    icon: PenTool,
    title: "Fantasy Illustration & Art",
    desc: "Our illustrations celebrate beauty, imagination, and storytelling through enchanting characters, whimsical landscapes, floral fantasy aesthetics, and emotionally expressive artwork."
  },
  {
    icon: Video,
    title: "Animation & Cinematic Experiences",
    desc: "We bring stories to life through animated shorts, visual storytelling, cinematic sequences, narrated fantasy experiences, and atmospheric creative productions."
  },
  {
    icon: Palette,
    title: "Fine Art, Paintings & Sketches",
    desc: "PETALS embraces the artistic process through fantasy-inspired paintings, concept art, sketch collections, watercolor illustrations, and curated artbook experiences."
  },
  {
    icon: Cpu,
    title: "AI-Assisted Creative Production",
    desc: "We thoughtfully combine artistic vision with modern creative technology. Every AI-assisted artwork is guided by original storytelling, worldbuilding, and emotional direction."
  },
  {
    icon: Home,
    title: "Fantasy Décor & Collectible Art",
    desc: "Our creations extend beyond stories into beautiful decorative art, collectible illustrations, children's room décor, and wall prints designed to bring wonder into everyday spaces."
  },
  {
    icon: Heart,
    title: "Publishing & Storybooks",
    desc: "We create illustrated books, fantasy collections, lore guides, bedtime stories, and immersive reading experiences for dreamers of all ages."
  }
];

export default function AboutPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'crystal-rose-universe');
  const studioLogo = PlaceHolderImages.find(img => img.id === 'petals-logo');

  return (
    <div className="min-h-screen bg-pearl-white">
      <FloatingPetals />
      <Navbar />

      <main className="relative pt-24">
        {/* Page Hero */}
        <section className="relative py-32 overflow-hidden">
          <div className="container mx-auto px-12 relative z-10 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-[0.3em] border border-rose-pink/20"
            >
              <Sparkles className="w-4 h-4" /> Discover Our Heart
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-headline text-6xl md:text-8xl leading-tight"
            >
              About <span className="italic text-rose-pink">PETALS Studio</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto text-2xl text-muted-foreground font-headline italic border-y border-rose-pink/10 py-8"
            >
              "Crafting illustrated stories that unfold like petals, blooming layer by layer."
            </motion.p>
          </div>
        </section>

        {/* Studio Intro */}
        <section className="py-24">
          <div className="container mx-auto px-12 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6 text-xl text-muted-foreground font-headline italic leading-relaxed">
                <p>
                  PETALS Studio is a premium illustration-first fantasy media, art, and storytelling studio dedicated to creating enchanting worlds, memorable characters, and emotionally meaningful experiences through art and imagination.
                </p>
                <p>
                  Founded on the belief that stories have the power to inspire, comfort, and connect, PETALS brings together fantasy storytelling, illustration, publishing, animation, fine art, and AI-assisted creative production under one cohesive creative vision.
                </p>
                <p className="text-rose-pink font-bold text-2xl not-italic">
                  We create more than stories—we build worlds.
                </p>
                <p>
                  From beautifully illustrated storybooks and cinematic fantasy narratives to collectible artworks, character-driven universes, and immersive visual experiences, every creation is designed to spark wonder and leave a lasting emotional impression.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-rose-pink/20 blur-[100px] rounded-full scale-125" />
              <div className="relative aspect-square glass-morphism rounded-[3rem] p-12 flex items-center justify-center">
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/40 shadow-2xl">
                  <Image 
                    src={studioLogo?.imageUrl || ""}
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Create Grid */}
        <section className="py-32 bg-white/50 backdrop-blur-sm border-y border-rose-pink/10">
          <div className="container mx-auto px-12">
            <div className="text-center mb-24 space-y-4">
              <h2 className="font-headline text-5xl md:text-6xl">What We Create</h2>
              <div className="w-24 h-px bg-rose-pink mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {creations.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-morphism p-10 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-rose-pink/10 text-rose-pink flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-headline text-2xl mb-4 leading-tight">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed italic text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy & Vision */}
        <section className="py-48 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <Image 
              src={heroImg?.imageUrl || ""}
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="container mx-auto px-12 max-w-5xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="font-headline text-5xl">Our Philosophy</h2>
                  <div className="h-px w-12 bg-rose-pink" />
                </div>
                <div className="space-y-6 text-xl text-muted-foreground font-headline italic leading-relaxed">
                  <p>
                    At PETALS, every story, illustration, character, and world is connected by a shared emotional language.
                  </p>
                  <p>
                    We believe the most meaningful stories are not simply told—they are experienced.
                  </p>
                  <p>
                    Like petals blooming one layer at a time, our stories reveal beauty, wonder, emotion, and imagination through every page, every artwork, and every adventure.
                  </p>
                </div>
              </div>

              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="font-headline text-5xl">Our Vision</h2>
                  <div className="h-px w-12 bg-rose-pink" />
                </div>
                <div className="text-xl text-muted-foreground font-headline italic leading-relaxed">
                  <p>
                    To build a timeless fantasy universe where storytelling, illustration, art, and imagination come together to inspire generations of readers, dreamers, artists, and families around the world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="py-32 text-center bg-rose-pink/5">
          <div className="container mx-auto px-12 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Quote className="w-12 h-12 text-rose-pink mx-auto opacity-20" />
              <h2 className="font-headline text-5xl md:text-7xl">Welcome to PETALS</h2>
              <p className="text-2xl text-muted-foreground font-headline italic max-w-2xl mx-auto">
                A place where imagination blossoms, stories come alive, and every creation begins with a single petal of inspiration.
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
