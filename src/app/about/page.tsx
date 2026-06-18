
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
    <div className="min-h-screen bg-white">
      <FloatingPetals />
      <Navbar />

      <main>
        {/* Cinematic Curved Hero Section */}
        <section className="relative pt-48 pb-64 overflow-hidden bg-rose-pink">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <Image 
              src={heroImg?.imageUrl || ""}
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-[0.3em] border border-white/10 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5" /> Discover Our Heart
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-headline text-6xl md:text-9xl text-white mb-4 drop-shadow-xl"
            >
              About PETALS Studio
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/90 text-xl md:text-3xl font-headline italic max-w-4xl mx-auto leading-relaxed"
            >
              &quot;Crafting illustrated stories that unfold like petals, blooming layer by layer.&quot;
            </motion.p>
          </div>

          {/* Smooth Curve Bottom */}
          <div className="absolute bottom-0 left-0 w-full leading-[0] z-20">
            <svg 
              viewBox="0 0 1440 320" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <path 
                fill="#ffffff" 
                d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-6 max-w-4xl text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-headline text-5xl md:text-7xl text-foreground">Our Mission</h2>
              <div className="w-24 h-1 bg-rose-pink mx-auto rounded-full" />
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
              
              <div className="text-xl text-muted-foreground leading-relaxed space-y-6">
                <p>
                  PETALS Studio is a premium illustration-first fantasy media, art, and storytelling studio dedicated to creating enchanting worlds, memorable characters, and emotionally meaningful experiences through art and imagination.
                </p>
                <p>
                  Founded on the belief that stories have the power to inspire, comfort, and connect, PETALS brings together fantasy storytelling, illustration, publishing, animation, fine art, and AI-assisted creative production under one cohesive creative vision.
                </p>
                <p className="text-rose-pink font-bold text-2xl">
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
        <section className="py-32 bg-rose-pink/5">
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
                  className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-rose-pink/10"
                >
                  <div className="w-14 h-14 rounded-2xl bg-rose-pink/10 text-rose-pink flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-headline text-2xl mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm italic">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy & Vision */}
        <section className="py-48 relative overflow-hidden bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="font-headline text-5xl">Our Philosophy</h2>
                  <div className="h-1 w-12 bg-rose-pink rounded-full" />
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

              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-rose-pink/20 blur-[100px] rounded-full scale-125" />
                <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-rose-pink/20 p-8">
                  <Image 
                    src={studioLogo?.imageUrl || ""}
                    alt="Logo"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="mt-48 text-center space-y-12 bg-rose-pink/5 p-16 rounded-[4rem]">
              <div className="space-y-6">
                <h2 className="font-headline text-5xl">Our Vision</h2>
                <div className="h-1 w-12 bg-rose-pink mx-auto rounded-full" />
              </div>
              <p className="text-2xl md:text-3xl text-muted-foreground font-headline italic leading-relaxed max-w-3xl mx-auto">
                To build a timeless fantasy universe where storytelling, illustration, art, and imagination come together to inspire generations around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="py-32 text-center bg-rose-pink">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Quote className="w-16 h-16 text-white/20 mx-auto" />
              <h2 className="font-headline text-5xl md:text-7xl text-white">Welcome to PETALS</h2>
              <p className="text-2xl md:text-3xl text-white/90 font-headline italic max-w-2xl mx-auto leading-relaxed">
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
