
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { Hero } from "@/components/Petals/Hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  BookOpen, 
  Video, 
  PenTool, 
  Heart, 
  Play, 
  ChevronRight,
  Mail
} from "lucide-react";
import { CharacterShowcase } from "@/components/Petals/CharacterShowcase";
import { DreamweaverPortal } from "@/components/Petals/DreamweaverPortal";

const services = [
  {
    icon: BookOpen,
    title: "Storybooks",
    desc: "Premium hardbound and digital adventures that inspire young hearts and nurture wonder.",
    color: "bg-rose-pink/10",
    textColor: "text-rose-pink"
  },
  {
    icon: Video,
    title: "Animation",
    desc: "Cinematic quality shorts and character-driven reels that bring our blooming worlds to life.",
    color: "bg-accent/10",
    textColor: "text-accent-foreground"
  },
  {
    icon: PenTool,
    title: "Character Design",
    desc: "Emotionally resonant characters crafted with unique visual identities and deep backstories.",
    color: "bg-fairy-gold/10",
    textColor: "text-fairy-gold"
  },
  {
    icon: Heart,
    title: "Kids Entertainment",
    desc: "Safe, magical, and educational content designed specifically for the next generation of dreamers.",
    color: "bg-soft-lavender/10",
    textColor: "text-rose-pink"
  }
];

const collectionBooks = [
  { id: "book-whispers", title: "Beneath the Whispering Waves" },
  { id: "book-mermaids", title: "Songs of the Shimmering Sea" },
  { id: "book-guardians", title: "Guardians of Dream Petals" },
  { id: "book-starlight", title: "The Starlight Lantern" },
];

export default function Home() {
  const crystalRoseBg = PlaceHolderImages.find(img => img.id === 'crystal-rose-universe');
  const featuredBookCover = PlaceHolderImages.find(img => img.id === 'book-whispers');

  return (
    <div className="min-h-screen bg-pearl-white">
      <FloatingPetals />
      <Navbar />
      
      <main>
        <Hero />

        {/* About Section - Moved Above Spotlight */}
        <section id="about" className="py-32 bg-rose-pink/5">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <h2 className="font-headline text-5xl md:text-6xl leading-tight">
                Our Mission: <br />
                <span className="italic text-rose-pink">Emotion In Every Petal</span>
              </h2>
              <div className="space-y-6 text-xl text-muted-foreground font-headline italic leading-relaxed">
                <p>
                  PETALS is a premium illustration-first fantasy media studio dedicated to creating magical stories, enchanting illustrations, cinematic animations, and emotionally comforting universes.
                </p>
                <p>
                  Our stories celebrate kindness, imagination, wonder, courage, and emotional growth. We believe fantasy should feel like a sanctuary.
                </p>
              </div>
              <Button size="lg" className="bg-rose-pink text-white rounded-full px-10 h-12 uppercase tracking-widest text-xs font-bold">
                Learn Our Story
              </Button>
            </div>
            <div className="relative aspect-square">
              <Image 
                src={PlaceHolderImages.find(img => img.id === 'hero-main')?.imageUrl || ""}
                alt="Studio Mission"
                fill
                className="object-contain"
                data-ai-hint="storybook illustration"
              />
            </div>
          </div>
        </section>

        {/* Featured Book Spotlight */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-morphism rounded-[4rem] p-12 md:p-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
            >
              <div className="lg:col-span-5 relative aspect-[3/4] group">
                <div className="absolute inset-0 bg-rose-pink/20 rounded-[3rem] blur-3xl group-hover:bg-rose-pink/30 transition-colors" />
                <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/40">
                  <Image 
                    src={featuredBookCover?.imageUrl || ""}
                    alt="Featured Book"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint="fantasy book cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-pink/10 text-rose-pink text-xs font-bold uppercase tracking-widest border border-rose-pink/20">
                  <Sparkles className="w-4 h-4" /> Featured Spotlight
                </div>
                <h2 className="font-headline text-5xl md:text-7xl leading-tight">
                  The Crystal Rose: <span className="italic text-rose-pink">Beneath the Whispering Waves</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed font-headline italic">
                  A young ocean-born girl named Alora must uncover the truth behind the legendary Crystal Rose before darkness consumes everything she loves.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className="bg-rose-pink text-white hover:bg-rose-pink/90 rounded-full px-10 h-12 text-lg shadow-xl shadow-rose-pink/20">
                    Read Book
                  </Button>
                  <Button variant="outline" size="lg" className="border-rose-pink text-rose-pink hover:bg-rose-pink/5 rounded-full px-10 h-12 text-lg">
                    Watch Trailer
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services / Expertise */}
        <section className="py-32 bg-white/50 backdrop-blur-sm border-y border-rose-pink/10">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24 space-y-6">
              <h2 className="font-headline text-5xl md:text-6xl">Studio Expertise</h2>
              <p className="text-xl text-muted-foreground italic font-headline max-w-2xl mx-auto">
                Crafting digital and physical wonders across every magical medium.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-morphism p-10 rounded-[2.5rem] group hover:shadow-2xl transition-all duration-500"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${service.color} ${service.textColor} mb-8 transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-headline text-2xl mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-6">{service.desc}</p>
                  <Button variant="link" className="p-0 text-rose-pink hover:no-underline flex items-center gap-2 group/btn">
                    Learn More <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Story weaver Portal */}
        <DreamweaverPortal />

        <CharacterShowcase />

        {/* Trailer / Cinematic Countdown */}
        <section className="py-32 bg-[#050505] relative overflow-hidden text-white">
          <div className="absolute inset-0 opacity-20">
            <Image 
              src={crystalRoseBg?.imageUrl || ""}
              alt="Kingdom"
              fill
              className="object-cover blur-sm scale-110"
              data-ai-hint="dark fantasy kingdom"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
          
          <div className="container mx-auto px-6 relative z-10 text-center space-y-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-headline text-5xl md:text-7xl">Something Magical Is Coming...</h2>
              <p className="text-xl text-white/60 italic font-headline max-w-2xl mx-auto">
                Prepare for a cinematic journey into the heart of the Crystal Rose.
              </p>
            </motion.div>

            <div className="flex justify-center gap-8 md:gap-16">
              {[
                { label: "Days", val: "14" },
                { label: "Hours", val: "22" },
                { label: "Mins", val: "38" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-5xl md:text-7xl font-headline text-rose-pink">{item.val}</div>
                  <div className="text-xs uppercase tracking-[0.3em] text-white/40 font-bold">{item.label}</div>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-12 h-16 text-xl font-headline group">
              <Play className="mr-3 w-6 h-6 fill-current" /> Watch Trailer
            </Button>
          </div>
        </section>

        {/* Collection Grid */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="space-y-4">
                <h2 className="font-headline text-5xl md:text-6xl">Blooming Collection</h2>
                <p className="text-xl text-muted-foreground italic font-headline">Explore our world of gentle fantasy.</p>
              </div>
              <Button variant="outline" className="border-rose-pink text-rose-pink rounded-full px-8 h-12 uppercase tracking-widest text-xs font-bold">
                View All Books
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {collectionBooks.map((book, i) => {
                const img = PlaceHolderImages.find(p => p.id === book.id);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl mb-6 group-hover:shadow-2xl transition-all duration-500">
                      <Image 
                        src={img?.imageUrl || ""}
                        alt={book.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        data-ai-hint="book cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                        <Button className="w-full bg-white text-black rounded-full h-12 font-bold uppercase tracking-widest text-xs">
                          Read Story
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-headline text-2xl group-hover:text-rose-pink transition-colors">{book.title}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-rose-pink/60 mt-2">PETALS Original</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="glass-morphism rounded-[4rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Mail className="w-64 h-64" />
              </div>
              
              <div className="space-y-6 relative z-10">
                <h2 className="font-headline text-5xl md:text-7xl">Join the PETALS Garden</h2>
                <p className="text-xl text-muted-foreground font-headline italic">Subscribe for magical updates, new story releases, and behind-the-scenes magic.</p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto relative z-10">
                <input 
                  type="email" 
                  placeholder="Enter your magical email..."
                  className="flex-1 h-16 rounded-full bg-white/50 border-rose-pink/20 px-8 text-lg focus:outline-none focus:ring-2 focus:ring-rose-pink/50 transition-all"
                />
                <Button size="lg" className="bg-rose-pink text-white rounded-full px-12 h-16 text-lg shadow-xl shadow-rose-pink/20">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
