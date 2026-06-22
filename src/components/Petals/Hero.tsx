
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, ArrowRight } from "lucide-react";
import Link from 'next/link';

export function Hero() {
  const roseImg = PlaceHolderImages.find(img => img.id === 'hero-rose');

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 z-0">
        <Image 
          src={roseImg?.imageUrl || ""}
          alt="Cinematic Background"
          fill
          className="object-cover opacity-90 brightness-110"
          style={{ objectPosition: '30% 40%' }}
          data-ai-hint="signature rose background"
          priority
        />
        <div 
          className="absolute inset-0 z-10" 
          style={{ 
            background: 'linear-gradient(to left, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 100%)' 
          }} 
        />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent z-20" />
      </div>

      <div className="container mx-auto px-12 lg:pr-32 relative z-30 pt-20 flex justify-end">
        <div className="max-w-full lg:max-w-[45%]">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-10 text-left"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-pink/20 text-rose-pink text-[10px] font-bold uppercase tracking-[0.3em] border border-white/10 backdrop-blur-md"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" /> THE NEXT GENERATION OF FANTASY
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
              <Button asChild className="h-10 px-6 rounded-full bg-rose-pink text-white hover:bg-rose-pink/90 text-[10px] font-bold uppercase tracking-widest shadow-2xl shadow-rose-pink/30 group">
                <Link href="/books">
                  Explore Stories <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-10 px-6 rounded-full border-white/40 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest group">
                <Link href="/gallery">
                  <Sparkles className="mr-3 w-4 h-4" /> Meet the Characters
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
      >
        <button 
          onClick={scrollToContent}
          className="flex flex-col items-center gap-3 group text-white/40 hover:text-white transition-colors"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Scroll Down</span>
          <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center p-1.5">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-1 bg-rose-pink rounded-full"
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
}
