
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Footer() {
  const logoImg = PlaceHolderImages.find(img => img.id === 'petals-logo');

  return (
    <footer className="bg-pearl-white pt-24 pb-12 border-t border-rose-pink/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-full border border-rose-pink/20 shadow-sm">
                <Image 
                  src={logoImg?.imageUrl || ""} 
                  alt="Petals Logo" 
                  fill 
                  className="object-cover"
                  data-ai-hint="logo"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-2xl tracking-widest uppercase">Petals</span>
                <span className="text-[10px] uppercase tracking-tighter text-muted-foreground -mt-1">Studio</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium illustration-first fantasy media studio dedicated to creating magical stories, enchanting illustrations, and cinematic universes.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:text-rose-pink"><Instagram /></Button>
              <Button variant="ghost" size="icon" className="hover:text-rose-pink"><Twitter /></Button>
              <Button variant="ghost" size="icon" className="hover:text-rose-pink"><Youtube /></Button>
            </div>
          </div>

          <div>
            <h4 className="font-headline text-xl mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/gallery" className="hover:text-rose-pink transition-colors">Art Gallery</Link></li>
              <li><Link href="/characters" className="hover:text-rose-pink transition-colors">Character Lexicon</Link></li>
              <li><Link href="/stories" className="hover:text-rose-pink transition-colors">Story Collections</Link></li>
              <li><Link href="/animations" className="hover:text-rose-pink transition-colors">Animations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-xl mb-6">Studio</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-rose-pink transition-colors">Our Philosophy</Link></li>
              <li><Link href="/blog" className="hover:text-rose-pink transition-colors">Creative Blog</Link></li>
              <li><Link href="/publishing" className="hover:text-rose-pink transition-colors">Publishing</Link></li>
              <li><Link href="/contact" className="hover:text-rose-pink transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-headline text-xl">Join the Universe</h4>
            <p className="text-sm text-muted-foreground">Subscribe for magical updates and new story releases.</p>
            <div className="flex gap-2">
              <Input placeholder="Your Email" className="bg-white/50 rounded-xl" />
              <Button className="bg-rose-pink text-white rounded-xl"><Mail className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-rose-pink/10 text-center">
          <p className="text-xs text-muted-foreground tracking-widest uppercase">
            © {new Date().getFullYear()} PETALS STUDIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
