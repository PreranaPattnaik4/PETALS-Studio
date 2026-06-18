
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
      {/* Background with Magic Blur */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={roseImg?.imageUrl || ""}
          alt="Cinematic Background"
          fill
          className="object-cover opacity-40 scale-105"
          data-ai-hint="signature rose background"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-pearl-white to-transparent" />
      </div>

      <div className="container mx-auto px-12 relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-7 space-y-10"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-pink/20 text-rose-pink text-xs font-bold uppercase tracking-[0.3em] border border-white/10 backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4" /> The Next Generation of Fantasy
              </motion.div>
              
              <h1 className="font-headline text-7xl md:text-9xl text-white leading-[0.9] tracking-tight">
                Stories That <br />
                <span className="italic text-rose-pink">Bloom</span> Into Worlds
              </h1>
              
              <p className="max-w-2xl text-xl text-white/70 leading-relaxed font-headline italic">
                Creating magical storybooks, enchanting characters, and cinematic animated adventures that capture the heart of imagination.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6">
              <Button asChild size="lg" className="h-16 px-12 rounded-full bg-rose-pink text-white hover:bg-rose-pink/90 text-lg font-bold uppercase tracking-widest shadow-2xl shadow-rose-pink/30 group">
                <Link href="/books">
                  Explore Stories <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-12 rounded-full border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all text-lg font-bold uppercase tracking-widest group">
                <Play className="mr-3 w-5 h-5 fill-current" /> Watch Trailer
              </Button>
            </div>
          </motion.div>

          {/* Floating Element */}
          <div className="lg:col-span-5 relative h-[600px] hidden lg:flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="relative w-full h-full drop-shadow-[0_0_100px_rgba(247,183,195,0.4)]"
            >
              <Image 
                src={roseImg?.imageUrl || ""}
                alt="Petals Signature Rose"
                fill
                className="object-contain"
                data-ai-hint="pink rose flower"
              />
              
              {/* Floating Dust Particles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-fairy-gold rounded-full blur-[2px] animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full blur-[1px] animate-pulse delay-700" />
                <div className="absolute top-1/2 right-1/2 w-3 h-3 bg-rose-pink rounded-full blur-[4px] animate-pulse delay-1000" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
