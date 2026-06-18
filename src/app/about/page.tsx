
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { FinalCTA } from "@/components/Petals/FinalCTA";
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
  const logoImg = PlaceHolderImages.find(img => img.id === 'petals-logo');
  const heroRose = PlaceHolderImages.find(img => img.id === 'hero-rose');

  return (
    <div className="min-h-screen bg-pearl-white selection:bg-rose-pink selection:text-white">
      <FloatingPetals />
      <Navbar />

      <main>
        {/* Editorial Hero Section */}
        <section className="relative pt-64 pb-32 overflow-hidden flex flex-col items-center justify-center text-center">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              src={heroRose?.imageUrl || ""}
              alt="Rose"
              fill
              className="object-cover opacity-20"
              priority
              data-ai-hint="pink rose"
            />
          </div>
          
          <div className="container mx-auto px-6 relative z-10 space-y-12">
            {/* Discover Our Heart Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-[0.4em] border border-rose-pink/20 backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5" /> Discover Our Heart
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="font-headline text-5xl md:text-6xl lg:text-7xl text-foreground"
            >
              About <span className="italic text-rose-pink">PETALS Studio</span>
            </motion.h1>
            
            {/* Refined Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-xl md:text-2xl font-headline italic leading-relaxed max-w-2xl mx-auto"
            >
              &quot;Crafting illustrated stories that unfold like petals, blooming layer by layer.&quot;
            </motion.p>
          </div>
        </section>

        {/* Philosophy & Vision - Moved directly below Hero */}
        <section className="py-24 relative overflow-hidden bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12 text-center lg:text-left">
                <div className="space-y-6">
                  <h2 className="font-headline text-5xl">Our Philosophy</h2>
                  <div className="h-1 w-12 bg-rose-pink rounded-full mx-auto lg:mx-0" />
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

              <div className="relative aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-rose-pink/10 blur-[120px] rounded-full scale-125 animate-pulse" />
                <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden border border-rose-pink/20 p-4 bg-white/40 backdrop-blur-md shadow-2xl">
                  <Image 
                    src={logoImg?.imageUrl || ""}
                    alt="Logo"
                    fill
                    className="object-cover p-8"
                  />
                </div>
              </div>
            </div>

            <div className="mt-24 text-center space-y-12 bg-rose-pink/5 p-16 rounded-[4rem] border border-rose-pink/10">
              <div className="space-y-6">
                <h2 className="font-headline text-5xl">Our Vision</h2>
                <div className="h-1 w-12 bg-rose-pink mx-auto rounded-full opacity-30" />
              </div>
              <p className="text-2xl md:text-4xl text-foreground font-headline italic leading-relaxed max-w-3xl mx-auto">
                To build a <span className="text-rose-pink not-italic font-bold">timeless fantasy universe</span> where storytelling, illustration, art, and imagination come together to inspire generations around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-24 bg-rose-pink/5 relative">
          <div className="container mx-auto px-6 max-w-4xl text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-headline text-5xl md:text-6xl text-foreground">Our Mission</h2>
              <div className="w-24 h-1 bg-rose-pink mx-auto rounded-full opacity-30" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <p className="text-2xl md:text-3xl font-headline italic text-foreground leading-relaxed">
                &quot;At PETALS, we believe the best parts of childhood don&apos;t need reinventing—just reimagining.&quot;
              </p>
              
              <div className="text-xl text-muted-foreground leading-relaxed space-y-8 font-headline italic">
                <p>
                  PETALS Studio is a premium illustration-first fantasy media, art, and storytelling studio dedicated to creating enchanting worlds, memorable characters, and emotionally meaningful experiences through art and imagination.
                </p>
                <p>
                  Founded on the belief that stories have the power to inspire, comfort, and connect, PETALS brings together fantasy storytelling, illustration, publishing, animation, fine art, and AI-assisted creative production under one cohesive creative vision.
                </p>
                <p className="text-rose-pink font-bold text-3xl not-italic tracking-tight">
                  We create more than stories—we build worlds.
                </p>
                <p>
                  From beautifully illustrated storybooks and cinematic fantasy narratives to collectible artworks, character-driven universes, and immersive visual experiences, every creation is designed to spark wonder and leave a lasting emotional impression.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What We Create Grid */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
              <h2 className="font-headline text-5xl md:text-6xl">What We Create</h2>
              <p className="text-xl text-muted-foreground italic font-headline">Crafting wonders across every magical medium.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {creations.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-rose-pink/10 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-rose-pink/10 text-rose-pink flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-headline text-2xl mb-4 group-hover:text-rose-pink transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm italic">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
