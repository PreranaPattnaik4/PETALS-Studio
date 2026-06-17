
"use client";

import { SidebarNav } from "@/components/Petals/SidebarNav";
import { Hero } from "@/components/Petals/Hero";
import { ArtGallery } from "@/components/Petals/ArtGallery";
import { CharacterShowcase } from "@/components/Petals/CharacterShowcase";
import { DreamweaverPortal } from "@/components/Petals/DreamweaverPortal";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Heart, Sparkles, BookOpen, PenTool, Video } from "lucide-react";

export default function Home() {
  const crystalRoseImg = PlaceHolderImages.find(img => img.id === 'crystal-rose-universe');

  return (
    <div className="flex min-h-screen bg-white">
      <SidebarNav />
      <main className="flex-1 ml-64 relative">
        <FloatingPetals />
        
        <Hero />

        {/* About Section */}
        <section id="about" className="py-24 relative overflow-hidden bg-white">
          <div className="container mx-auto px-6 flex flex-col items-center text-center space-y-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-pink/10 text-rose-pink text-sm font-bold uppercase tracking-widest">
              <Heart className="w-4 h-4" /> Our Mission
            </div>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-tight">
              Where Stories Bloom Into Worlds
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              <p>
                PETALS is a premium illustration-first fantasy media studio dedicated to creating magical stories, enchanting illustrations, cinematic animations, and emotionally comforting fantasy universes.
              </p>
              <p className="italic font-headline">
                &quot;Our stories celebrate kindness, imagination, wonder, courage, and emotional growth.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Featured Universe: The Crystal Rose */}
        <section className="py-24 relative bg-white">
          <div className="container mx-auto px-6">
            <div className="relative rounded-[3rem] overflow-hidden group shadow-2xl h-[600px] flex items-center p-8 md:p-16">
              <Image 
                src={crystalRoseImg?.imageUrl || ""}
                alt="The Crystal Rose Universe"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                data-ai-hint={crystalRoseImg?.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />
              
              <div className="relative z-10 max-w-xl space-y-8">
                <div className="inline-block bg-fairy-gold/20 backdrop-blur-md px-4 py-1 rounded-full text-fairy-gold text-xs font-bold uppercase tracking-widest">
                  Featured World
                </div>
                <h2 className="font-headline text-5xl md:text-7xl">The Crystal Rose</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  A breathtaking fantasy universe filled with crystal kingdoms, mermaids, magical roses, hidden destinies, and unforgettable adventures.
                </p>
                <Button size="lg" className="bg-rose-pink text-white hover:bg-rose-pink/90 rounded-full px-10 h-14 text-lg">
                  Enter The Crystal Rose
                </Button>
              </div>
            </div>
          </div>
        </section>

        <CharacterShowcase />

        {/* Services Section */}
        <section className="py-24 bg-white/40">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-headline text-4xl md:text-5xl">Studio Expertise</h2>
              <p className="text-muted-foreground max-w-xl mx-auto italic font-headline text-lg">
                Crafting magic across every medium.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: BookOpen, title: "Fantasy Storytelling", desc: "Original narratives that comfort and inspire." },
                { icon: PenTool, title: "Illustration", desc: "Premium watercolor-style digital & traditional art." },
                { icon: Video, title: "Animation", desc: "Cinematic shorts and character-driven reels." },
                { icon: Sparkles, title: "Wall Art", desc: "Collectible nursery and bedroom decor." },
              ].map((service, i) => (
                <div key={i} className="glass-morphism rounded-3xl p-8 space-y-4 hover:shadow-2xl transition-all duration-500">
                  <div className="w-12 h-12 bg-rose-pink/10 rounded-2xl flex items-center justify-center text-rose-pink">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-headline text-xl">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                  <Button variant="link" className="text-rose-pink p-0">Learn More</Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ArtGallery />

        <DreamweaverPortal />

        {/* Philosophy Section */}
        <section className="py-32 relative text-center bg-white">
          <div className="container mx-auto px-6 max-w-3xl space-y-8">
            <h2 className="font-headline text-4xl md:text-5xl">A Sanctuary of Gentle Fantasy</h2>
            <p className="text-xl text-muted-foreground leading-loose italic">
              PETALS believes stories should comfort, inspire, and create emotional connections. Every illustration, character, and fantasy world is crafted to feel magical, beautiful, emotionally safe, and timeless.
            </p>
            <div className="flex justify-center">
              <div className="w-24 h-px bg-rose-pink/30" />
            </div>
            <p className="font-headline text-2xl text-rose-pink">Emotion In Every Petal</p>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
