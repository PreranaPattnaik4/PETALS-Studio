
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";

export function Hero() {
  const roseImg = PlaceHolderImages.find(img => img.id === 'hero-rose');
  const girlImg = PlaceHolderImages.find(img => img.id === 'hero-main');

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Rose Flower - Made larger by increasing col-span and height */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="lg:col-span-5 relative h-[500px] lg:h-[800px] flex items-center justify-center"
        >
          <div className="relative w-full h-full scale-110">
            <Image 
              src={roseImg?.imageUrl || ""}
              alt="Artistic Rose"
              fill
              className="object-contain"
              data-ai-hint="pink rose"
              priority
            />
          </div>
        </motion.div>

        {/* Center: Welcome Text - Slightly narrower to accommodate larger rose */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-3 text-center space-y-6"
        >
          <h2 className="font-headline text-5xl md:text-7xl italic text-foreground leading-none">
            Welcome
          </h2>
          <div className="h-px w-24 bg-rose-pink mx-auto opacity-30" />
          <div className="space-y-4">
            <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tight uppercase">
              Stories That Bloom With Emotion
            </h1>
            <div className="space-y-4 text-xs md:text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto uppercase tracking-wider font-medium">
              <p>
                Building The Future of Fantasy Storytelling
                We envision a future where storytelling becomes more
                immersive, emotional, cinematic, and artistically alive.
              </p>
              <p>
                By combining advanced creative technologies with handcrafted
                artistic direction, PETALS creates next-generation fantasy
                experiences designed to inspire wonder.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: Girl Reading Illustration */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="lg:col-span-4 relative h-[400px] lg:h-[600px] flex items-center justify-center"
        >
          <div className="relative w-full h-full">
            <Image 
              src={girlImg?.imageUrl || ""}
              alt="Girl reading storybook"
              fill
              className="object-contain"
              data-ai-hint="storybook girl"
            />
          </div>
        </motion.div>

      </div>
      
      {/* Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="text-[10px] uppercase tracking-[0.3em] font-headline">The petals flow to the next scene</div>
        <div className="w-px h-12 bg-rose-pink/30" />
      </motion.div>
    </section>
  );
}
