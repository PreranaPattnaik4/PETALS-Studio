
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, ArrowRight } from "lucide-react";
import Link from 'next/link';

export function Hero() {
  const roseImg = PlaceHolderImages.find(img => img.id === 'hero-rose');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Background with Cinematic Overlays */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={roseImg?.imageUrl || ""}
          alt="Cinematic Background"
          fill
          className="object-cover opacity-90 brightness-110 transition-opacity duration-1000"
          style={{ objectPosition: '50% 40%' }}
          data-ai-hint="signature rose background"
          priority
        />
        
        {/* Specific Lighter Gradient Overlay as requested */}
        <div 
          className="absolute inset-0 z-10" 
          style={{ 
            background: 'linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.05) 100%)' 
          }} 
        />
        
        {/* Subtle Bottom Transition Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent z-20" />
      </div>

      <div className="container mx-auto px-12 relative z-30 pt-20">
        <div className="max-w-full lg:max-w-[50%]">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-pink/20 text-rose-pink text-xs font-bold uppercase tracking-[0.3em] border border-white/10 backdrop-blur-md"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> The Next Generation of Fantasy
                </span>
              </motion.div>
              
              <h1 className="font-headline text-6xl md:text-8xl text-white leading-[0.9] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Stories That <br />
                <span className="italic text-rose-pink">Bloom</span> Into Worlds
              </h1>
              
              <p className="max-w-xl text-xl text-white leading-relaxed font-headline italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Creating magical storybooks, enchanting characters, and cinematic animated adventures that capture the heart of imagination.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6">
              <Button asChild size="lg" className="h-16 px-12 rounded-full bg-rose-pink text-white hover:bg-rose-pink/90 text-lg font-bold uppercase tracking-widest shadow-2xl shadow-rose-pink/30 group">
                <Link href="/books">
                  Explore Stories <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-12 rounded-full border-white/40 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all text-lg font-bold uppercase tracking-widest group">
                <Play className="mr-3 w-5 h-5 fill-current" /> Watch Trailer
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Floating Dust Particles */}
      <div className="absolute inset-0 pointer-events-none z-40">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-fairy-gold rounded-full blur-[2px] animate-pulse opacity-40" />
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full blur-[1px] animate-pulse delay-700 opacity-30" />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-rose-pink rounded-full blur-[4px] animate-pulse delay-1000 opacity-20" />
      </div>
    </section>
  );
}
