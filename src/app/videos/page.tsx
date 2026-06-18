
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { FinalCTA } from "@/components/Petals/FinalCTA";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Sparkles, 
  Film, 
  Clock, 
  ChevronRight, 
  X, 
  Youtube, 
  ShoppingBag, 
  Instagram,
  Facebook,
  Linkedin,
  BookOpen,
  Users,
  Palette,
  Wand2
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.396 2.966 7.396 6.929 0 4.135-2.607 7.462-6.225 7.462-1.214 0-2.354-.631-2.746-1.379l-.748 2.848c-.27 1.031-1.002 2.324-1.492 3.12 1.12.346 2.304.534 3.535.534 6.621 0 11.988-5.365 11.988-11.988C24.005 5.367 18.638 0 12.017 0z" />
  </svg>
);

const categories = ["All", "Short Films", "Character Promos", "Story Teasers"];

const featureCards = [
  {
    icon: BookOpen,
    title: "Original Stories",
    desc: "Beautiful fantasy adventures crafted for dreamers."
  },
  {
    icon: Users,
    title: "Beloved Characters",
    desc: "Meet unforgettable heroes, queens, fairies, and magical creatures."
  },
  {
    icon: Palette,
    title: "Magical Artwork",
    desc: "Explore stunning illustrations inspired by fairy tales and fantasy worlds."
  },
  {
    icon: Film,
    title: "Storytelling Experiences",
    desc: "Discover books, galleries, videos, and creative tools."
  }
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Pinterest", icon: PinterestIcon, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" }
];

const videos = [
  {
    id: 1,
    title: "The Awakening of Alora",
    category: "Short Films",
    duration: "4:20",
    image: "https://picsum.photos/seed/v1/800/450",
    description: "Witness the moment Alora discovers her hidden destiny beneath the waves.",
    videoUrl: null
  },
  {
    id: 2,
    title: "Crystal Rose Chronicles",
    category: "Story Teasers",
    duration: "1:45",
    image: "https://picsum.photos/seed/v2/800/450",
    description: "A glimpse into the shimmering world of the Glass Kingdom.",
    videoUrl: null
  },
  {
    id: 3,
    title: "Nerina's Lullaby",
    category: "Character Promos",
    duration: "2:10",
    image: "https://picsum.photos/seed/v3/800/450",
    description: "Experience the soothing melodies of the Ocean's Guardian.",
    videoUrl: null
  },
  {
    id: 4,
    title: "The Starlight Lantern",
    category: "Short Films",
    duration: "5:30",
    image: "https://picsum.photos/seed/v4/800/450",
    description: "A young stargazer's journey to bring light back to the world.",
    videoUrl: null
  },
  {
    id: 5,
    title: "Moonflower Dance",
    category: "Story Teasers",
    duration: "1:15",
    image: "https://picsum.photos/seed/v5/800/450",
    description: "The seasonal bloom of the sacred moonflowers in motion.",
    videoUrl: null
  },
  {
    id: 6,
    title: "Guardians of Dreams",
    category: "Character Promos",
    duration: "0:08",
    image: "https://www.dropbox.com/scl/fi/5t6g0rkict2zjzs3e07vc/e9cc5c48-23a7-4fb8-9740-5597038da592.jpg?rlkey=qtx1hllj83bfc82a3sa40er57&raw=1",
    description: "Meet the protectors of the realm of sleep.",
    videoUrl: "https://dl.dropboxusercontent.com/scl/fi/e5q2ljsvktv7ezdwu4x6g/_scene_2_816_sec__starlet_appears_visual_starlet_f_fc0bf0b59e.mp4?rlkey=d4af1u96ftmum7xl6sdqc0510&raw=1"
  }
];

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredVideos = activeCategory === "All" 
    ? videos 
    : videos.filter(v => v.category === activeCategory);

  return (
    <div className="min-h-screen bg-pearl-white selection:bg-rose-pink selection:text-white">
      <FloatingPetals />
      <Navbar />

      <main className="relative">
        {/* Cinematic Background Hero Section - Full Cover Loop Video */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
              src="https://dl.dropboxusercontent.com/scl/fi/e5q2ljsvktv7ezdwu4x6g/_scene_2_816_sec__starlet_appears_visual_starlet_f_fc0bf0b59e.mp4?rlkey=d4af1u96ftmum7xl6sdqc0510&raw=1"
            />
            {/* Very minimal overlay for legibility without masking the video */}
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-rose-pink/20 text-rose-pink text-[10px] font-bold uppercase tracking-[0.4em] border border-white/20 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5" /> PETALS Studio
            </motion.div>

            <div className="space-y-6 max-w-4xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-headline text-5xl md:text-7xl lg:text-8xl text-white leading-tight drop-shadow-2xl"
              >
                Enter a Whimsical World of <br />
                <span className="italic text-rose-pink">Storybooks and Dreams</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-white/90 font-headline italic leading-relaxed max-w-2xl mx-auto drop-shadow-lg"
              >
                Discover magical books, enchanting characters, breathtaking artwork, and unforgettable adventures created by PETALS Studio.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
            >
              <Button asChild size="lg" className="w-full sm:w-auto bg-rose-pink text-white hover:bg-rose-pink/90 rounded-full px-12 h-14 text-sm font-bold uppercase tracking-widest shadow-xl shadow-rose-pink/30 group">
                <Link href="/books">
                  <BookOpen className="mr-3 w-5 h-5" /> Explore Books
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-white/40 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all rounded-full px-12 h-14 text-sm font-bold uppercase tracking-widest group">
                <Link href="/characters">
                  <Sparkles className="mr-3 w-5 h-5" /> Meet the Characters
                </Link>
              </Button>
            </motion.div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full pt-8">
              {featureCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] text-left group hover:bg-white/15 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-pink/20 text-rose-pink flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <card.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-headline text-xl text-white mb-2">{card.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed font-headline italic">{card.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Social Icons Row */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="pt-8 space-y-6 w-full"
            >
              <div className="flex items-center gap-4 opacity-30">
                <div className="h-px flex-1 bg-white" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Join the Studio Community</span>
                <div className="h-px flex-1 bg-white" />
              </div>
              <div className="flex justify-center gap-6">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-rose-pink hover:bg-white/10 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dual Card Section: Featured Short Teaser & Lore Details */}
        <section className="py-24 bg-white/50 backdrop-blur-sm relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-[0.3em] border border-rose-pink/20">
                <Sparkles className="w-3.5 h-3.5" /> Latest Enchanted Short
              </div>
              <h2 className="font-headline text-4xl md:text-5xl text-foreground text-center">Moments in Motion</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-7 relative aspect-video group"
              >
                <div className="absolute inset-0 bg-rose-pink/20 blur-[40px] rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden glass-morphism border-[8px] border-white/60 shadow-2xl bg-black">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover opacity-90"
                    src="https://dl.dropboxusercontent.com/scl/fi/e5q2ljsvktv7ezdwu4x6g/_scene_2_816_sec__starlet_appears_visual_starlet_f_fc0bf0b59e.mp4?rlkey=d4af1u96ftmum7xl6sdqc0510&raw=1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                    <div className="text-white space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-rose-pink">Character Short</p>
                      <p className="font-headline italic text-lg">Starlet's Midnight Bloom</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-5 space-y-10"
              >
                <div className="glass-morphism rounded-[3rem] p-10 md:p-12 space-y-8 border-rose-pink/10 shadow-xl">
                  <div className="space-y-4">
                    <h3 className="font-headline text-3xl md:text-4xl text-foreground">Starlet's Midnight Bloom</h3>
                    <p className="text-lg text-muted-foreground italic font-headline leading-relaxed">
                      "In every fleeting moment, a story begins to bloom. Witness the delicate dance of magic in our latest character short, exploring the boundaries of starlight and shadow."
                    </p>
                  </div>

                  <div className="space-y-4 pt-4">
                    <Button asChild className="w-full bg-rose-pink text-white h-14 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-rose-pink/20 group">
                      <a href="https://www.youtube.com/shorts/7U0izt4zZTo" target="_blank" rel="noopener noreferrer">
                        <Youtube className="mr-3 w-5 h-5" /> Watch Full Short
                      </a>
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                      <Button asChild variant="outline" className="h-14 rounded-2xl border-rose-pink text-rose-pink hover:bg-rose-pink/5 font-bold uppercase tracking-widest text-[10px]">
                        <a href="/books">
                          <ShoppingBag className="mr-2 w-4 h-4" /> Shop Collection
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="h-14 rounded-2xl border-rose-pink text-rose-pink hover:bg-rose-pink/5 font-bold uppercase tracking-widest text-[10px]">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                          <Instagram className="mr-2 w-4 h-4" /> See Posts
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 px-6 opacity-60">
                  <div className="h-px flex-1 bg-rose-pink/30" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-pink">Petals Originals</span>
                  <div className="h-px flex-1 bg-rose-pink/30" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Brand Tagline Section */}
        <section className="pt-32 pb-12">
          <div className="container mx-auto px-6 text-center space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-headline text-4xl md:text-5xl text-foreground"
            >
              Illustrations That Tell Their Own Stories
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-muted-foreground italic font-headline max-w-3xl mx-auto"
            >
              Where every brushstroke holds a world waiting to bloom.
            </motion.p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 bg-white/40 backdrop-blur-md border-y border-rose-pink/10 sticky top-[72px] z-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {categories.map((cat, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-10 h-12 text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                      ? "bg-rose-pink text-white shadow-lg shadow-rose-pink/20" 
                      : "text-muted-foreground hover:text-rose-pink hover:bg-rose-pink/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Video Grid Section */}
        <section className="py-24 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredVideos.map((video, index) => (
                <Dialog key={video.id}>
                  <DialogTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group space-y-6 cursor-pointer"
                    >
                      <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-white/40 bg-white">
                        <Image 
                          src={video.image}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          data-ai-hint="video thumbnail"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-105 transition-all duration-500 border border-white/40 shadow-xl">
                            <Play className="w-6 h-6 fill-current translate-x-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-6 right-6 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">
                          {video.duration}
                        </div>
                      </div>
                      
                      <div className="space-y-4 px-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-pink">{video.category}</span>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            <Clock className="w-3.5 h-3.5" /> {video.duration}
                          </div>
                        </div>
                        <h3 className="font-headline text-2xl group-hover:text-rose-pink transition-colors leading-tight">{video.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed italic font-headline line-clamp-2 border-l-2 border-rose-pink/20 pl-4">
                          {video.description}
                        </p>
                        <Button variant="link" className="p-0 h-auto text-rose-pink text-[10px] font-bold uppercase tracking-widest group/link">
                          Watch Video <ChevronRight className="ml-1 w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                        </Button>
                      </div>
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black border-none rounded-[3rem] shadow-2xl">
                    <DialogTitle className="sr-only">{video.title}</DialogTitle>
                    {video.videoUrl ? (
                      <div className="aspect-video w-full bg-black">
                        <video 
                          controls 
                          autoPlay 
                          className="w-full h-full"
                          src={video.videoUrl}
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full bg-neutral-900 flex items-center justify-center text-center p-12">
                        <div className="space-y-6">
                          <div className="w-20 h-20 rounded-full bg-rose-pink/10 flex items-center justify-center mx-auto">
                            <Clock className="w-10 h-10 text-rose-pink" />
                          </div>
                          <h3 className="text-3xl font-headline text-white italic">Coming Soon to the Studio</h3>
                          <p className="text-white/40 max-w-sm mx-auto italic font-headline">
                            This cinematic journey is currently being woven in our production greenhouse. Check back soon for the premiere.
                          </p>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </section>

        {/* Cinematic Closing Banner */}
        <section className="py-32 bg-rose-pink/5 border-t border-rose-pink/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <Film className="w-[500px] h-[500px] absolute -bottom-20 -right-20 rotate-12" />
          </div>
          <div className="container mx-auto px-6 text-center space-y-8 relative z-10">
            <h2 className="font-headline text-4xl md:text-5xl">Ready For Adventure?</h2>
            <p className="text-xl text-muted-foreground italic font-headline max-w-2xl mx-auto">
              Join the PETALS Studio community to be the first to experience our upcoming cinematic shorts and series.
            </p>
            <Button size="lg" className="bg-white text-rose-pink hover:bg-rose-pink hover:text-white rounded-full px-12 h-14 text-sm font-bold uppercase tracking-widest shadow-xl border border-rose-pink/10">
              Join the Studio
            </Button>
          </div>
        </section>

        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
