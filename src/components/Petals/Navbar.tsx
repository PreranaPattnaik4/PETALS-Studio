
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const logoImg = PlaceHolderImages.find(img => img.id === 'petals-logo');

  const navLinks = [
    { name: 'Gallery', href: '/gallery' },
    { name: 'Books', href: '/books' },
    { name: 'Videos', href: '/videos' },
    { name: 'Characters', href: '/characters' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b-0 h-20 flex items-center">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border border-rose-pink/20 transition-transform duration-500 group-hover:scale-110 shadow-sm">
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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium hover:text-rose-pink transition-colors tracking-wide"
            >
              {link.name}
            </Link>
          ))}
          <Button asChild variant="outline" className="border-rose-pink text-rose-pink hover:bg-rose-pink hover:text-white rounded-full px-6">
            <Link href="/books">Enter Universe</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-pearl-white border-l-rose-pink/20">
              <div className="flex flex-col gap-6 mt-12">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-headline hover:text-rose-pink transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Button asChild className="bg-rose-pink text-white rounded-full mt-4">
                  <Link href="/books" onClick={() => setIsOpen(false)}>Enter Universe</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
