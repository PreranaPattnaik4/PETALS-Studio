
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from 'next/link';

export function Hero() {
  const roseImg = PlaceHolderImages.find(img => img.id === 'hero-rose');
  const girlImg = PlaceHolderImages.find(img => img.id === 'hero-main');
  const castleImg = PlaceHolderImages.find(img => img.id === 'hero-castle');

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-white">
      {/* Magical Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-pink/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-soft-lavender/20 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] opacity-20 pointer-events-none" />
      </div>

      <div className="container mx-auto px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Content Branding */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-pink/10 text-rose-pink text-sm font-bold uppercase tracking-widest border border-rose-pink/20"
              >
                <Sparkles className="w-4 h-4" /> Stories That Bloom
              </motion.div>
              
              <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl text-foreground leading-[0.9] drop-shadow-sm">
                Petals <br />
                <span className="italic text-rose-pink">Universe</span>
              </h1>
              
              <p className="max-w-md text-lg text-muted-foreground leading-relaxed font-headline italic">
                Step into a sanctuary where imagination meets emotion. Handcrafted fantasy worlds designed to inspire wonder and courage in every heart.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Button asChild size="lg" className="h-16 px-10 rounded-full bg-rose-pink text-white hover:bg-rose-pink/90 text-xl font-headline shadow-xl shadow-rose-pink/30 group">
                <Link href="/books">
                  Explore Now <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-rose-gold border-b-2 border-rose-gold/20 pb-1 cursor-pointer hover:text-rose-pink transition-colors">
                Watch The Magic
              </div>
            </div>
          </motion.div>

          {/* Right Side: Floating Magical Composition */}
          <div className="lg:col-span-6 relative h-[600px] lg:h-[800px]">
            
            {/* Background Rose (Large & Soft) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
              animate={{ opacity: 1, scale: 1.2, rotate: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute top-10 right-0 w-full h-full -z-10"
            >
              <Image 
                src={roseImg?.imageUrl || ""}
                alt="Rose Background"
                fill
                className="object-contain"
                data-ai-hint="pink rose"
              />
            </motion.div>

            {/* Foreground: Girl Reading (The Main Hero) */}
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="relative z-20 w-full h-full drop-shadow-2xl"
            >
              <Image 
                src={girlImg?.imageUrl || ""}
                alt="Main Hero Girl"
                fill
                className="object-contain"
                data-ai-hint="storybook girl"
              />
              
              {/* Magical Sparkle Trail (Decorative SVGs) */}
              <div className="absolute top-1/4 right-1/4 w-full h-full pointer-events-none opacity-60">
                <svg className="w-full h-full animate-soft-glow" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="2" fill="#F5D76E" />
                  <circle cx="150" cy="80" r="3" fill="#F7B7C3" />
                  <circle cx="100" cy="150" r="2" fill="#DCCFFF" />
                  <path d="M20 180 Q100 100 180 20" stroke="url(#gradient)" strokeWidth="1" strokeDasharray="5 5" />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F7B7C3" />
                      <stop offset="100%" stopColor="#F5D76E" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            {/* Floating World Card (The Ship/Castle equivalent) */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="absolute top-20 right-0 w-48 h-64 bg-white/40 backdrop-blur-xl p-2 rounded-3xl border border-white/40 shadow-2xl rotate-12 z-10 hidden lg:block"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image 
                  src={castleImg?.imageUrl || "https://picsum.photos/seed/magic-castle/400/600"}
                  alt="Floating World"
                  fill
                  className="object-cover"
                  data-ai-hint="magic castle"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 text-white">
                  <p className="text-[10px] uppercase font-bold tracking-tighter">Explore The Kingdom</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-30" />
    </section>
  );
}
