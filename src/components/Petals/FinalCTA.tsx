
"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  BookOpen, 
  Users, 
  Palette, 
  Film, 
  Instagram, 
  Facebook, 
  Youtube, 
  Linkedin,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.396 2.966 7.396 6.929 0 4.135-2.607 7.462-6.225 7.462-1.214 0-2.354-.631-2.746-1.379l-.748 2.848c-.27 1.031-1.002 2.324-1.492 3.12 1.12.346 2.304.534 3.535.534 6.621 0 11.988-5.365 11.988-11.988C24.005 5.367 18.638 0 12.017 0z" />
  </svg>
);

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

export function FinalCTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="container mx-auto max-w-7xl relative"
      >
        <div className="relative min-h-[600px] md:min-h-[700px] rounded-[3rem] overflow-hidden shadow-2xl">
          <Image
            src="https://www.dropbox.com/scl/fi/9fakorbmuh1bi4onk84a7/ChatGPT-Image-Jun-18-2026-07_29_29-PM.png?rlkey=qytc1rkbmoecgdidj8av8k6hx&st=bcsd1n4o&raw=1"
            alt="PETALS Studio Fantasy World"
            fill
            className="object-cover transition-transform duration-[20s] hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8 md:p-16 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-rose-pink/20 text-rose-pink text-[10px] font-bold uppercase tracking-[0.4em] border border-white/20 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5" /> PETALS Studio
            </motion.div>

            <div className="space-y-6 max-w-4xl">
              <h2 className="font-headline text-5xl md:text-7xl text-white leading-tight">
                Enter a Whimsical World of <br />
                <span className="italic text-rose-pink">Storybooks and Dreams</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/80 font-headline italic leading-relaxed max-w-2xl mx-auto">
                Discover magical books, enchanting characters, breathtaking artwork, and unforgettable adventures created by PETALS Studio.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
              <Button asChild size="lg" className="w-full sm:w-auto bg-rose-pink text-white hover:bg-rose-pink/90 rounded-full px-12 h-14 text-sm font-bold uppercase tracking-widest shadow-xl shadow-rose-pink/30 group">
                <Link href="/books">
                  <BookOpen className="mr-3 w-5 h-5" /> Explore Books
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-white/40 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all rounded-full px-12 h-14 text-sm font-bold uppercase tracking-widest group">
                <Link href="/gallery">
                  <Sparkles className="mr-3 w-5 h-5" /> Meet the Characters
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full pt-8">
              {featureCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
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

            <div className="pt-8 space-y-6 w-full">
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
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-rose-pink hover:bg-white/10 hover:shadow-[0_0_20px_rgba(247,183,195,0.4)] transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
