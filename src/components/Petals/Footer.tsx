
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Youtube, Mail, ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Footer() {
  const logoImg = PlaceHolderImages.find(img => img.id === 'petals-logo');

  return (
    <footer className="bg-[#0a0a0a] pt-32 pb-16 text-white overflow-hidden relative">
      <div className="absolute bottom-0 right-0 p-24 opacity-[0.02] pointer-events-none">
        <Image 
          src={PlaceHolderImages.find(img => img.id === 'hero-rose')?.imageUrl || ""}
          alt="Rose"
          width={800}
          height={800}
          className="object-contain rotate-12"
        />
      </div>

      <div className="container mx-auto px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          <div className="lg:col-span-4 space-y-10">
            <Link href="/" className="flex items-center gap-4">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-white/20">
                <Image src={logoImg?.imageUrl || ""} alt="Logo" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-3xl tracking-widest uppercase font-bold">Petals</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 -mt-1 font-bold">Studio</span>
              </div>
            </Link>
            <p className="text-lg text-white/50 font-headline italic leading-relaxed">
              Premium illustration-first fantasy media studio. We create stories that bloom into unforgettable worlds.
            </p>
            <div className="flex gap-6">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <Link key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-headline text-xl mb-10 text-rose-pink">Explore</h4>
            <ul className="space-y-6 text-sm font-bold uppercase tracking-widest text-white/60">
              <li><Link href="/gallery" className="hover:text-white transition-colors">Art Gallery</Link></li>
              <li><Link href="/books" className="hover:text-white transition-colors">Book Library</Link></li>
              <li><Link href="/videos" className="hover:text-white transition-colors">Animations</Link></li>
              <li><Link href="/characters" className="hover:text-white transition-colors">Characters</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-headline text-xl mb-10 text-rose-pink">Studio</h4>
            <ul className="space-y-6 text-sm font-bold uppercase tracking-widest text-white/60">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/publishing" className="hover:text-white transition-colors">Publishing</Link></li>
              <li><Link href="/press" className="hover:text-white transition-colors">Press Kit</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <h4 className="font-headline text-xl text-rose-pink">Newsletter</h4>
            <p className="text-white/60 text-sm leading-relaxed">Join 50k+ dreamers who receive our monthly letters from the PETALS garden.</p>
            <div className="relative group">
              <input 
                placeholder="Email address"
                className="w-full h-14 bg-white/5 border border-white/10 rounded-full px-8 text-sm focus:outline-none focus:ring-1 focus:ring-rose-pink transition-all"
              />
              <button className="absolute right-2 top-2 w-10 h-10 bg-rose-pink rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
          <p>© {new Date().getFullYear()} PETALS STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
