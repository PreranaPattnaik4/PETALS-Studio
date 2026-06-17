
"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import Link from 'next/link';

export function Hero() {
  const mainImg = PlaceHolderImages.find(img => img.id === 'hero-main');
  const castleImg = PlaceHolderImages.find(img => img.id === 'hero-castle');

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        
        {/* Left Column: Hero Main Illustration */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[400px] md:h-[600px] flex items-center justify-center"
        >
          <div className="relative w-full h-full watercolor-canvas overflow-hidden rounded-[2rem]">
            <Image 
              src={mainImg?.imageUrl || ""}
              alt={mainImg?.description || "Hero Illustration"}
              fill
              className="object-contain"
              data-ai-hint={mainImg?.imageHint}
              priority
            />
          </div>
          <div className="absolute -z-10 w-64 h-64 bg-rose-pink/20 rounded-full blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-soft-glow" />
        </motion.div>

        {/* Center Column: Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-8 z-10"
        >
          <div className="space-y-4">
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl leading-tight">
              Welcome to <span className="text-rose-pink">PETALS</span>
            </h1>
            <p className="font-headline text-xl md:text-2xl italic text-muted-foreground italic">
              Stories That Bloom With Emotion
            </p>
          </div>
          
          <p className="text-lg leading-relaxed text-muted-foreground max-w-md mx-auto">
            PETALS is a premium fantasy storytelling and illustration studio creating magical worlds, enchanting characters, cinematic artwork, and timeless emotional adventures.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-rose-pink text-white hover:bg-rose-pink/90 rounded-full px-8 h-12 shadow-lg shadow-rose-pink/20">
              <Link href="/books">Explore Our Worlds</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-rose-pink text-rose-pink hover:bg-rose-pink/10 rounded-full px-8 h-12">
              <Link href="/gallery">View Gallery</Link>
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Fantasy Castle */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hidden md:block relative h-[600px]"
        >
          <div className="absolute inset-0 watercolor-canvas opacity-80">
            <Image 
              src={castleImg?.imageUrl || ""}
              alt={castleImg?.description || ""}
              fill
              className="object-contain"
              data-ai-hint={castleImg?.imageHint}
            />
          </div>
          <div className="absolute -z-10 w-64 h-64 bg-soft-lavender/20 rounded-full blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-soft-glow" />
        </motion.div>

      </div>
      
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
