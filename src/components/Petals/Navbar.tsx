
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Menu, X, Wand2 } from "lucide-react";
import { useState, useEffect } from 'react';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const logoImg = PlaceHolderImages.find(img => img.id === 'petals-logo');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'Videos', href: '/videos' },
    { name: 'Characters', href: '/characters' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Creator', href: '/creator', icon: Wand2 },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 glass-morphism mx-6 mt-4 rounded-full' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-8 flex justify-between items-center">
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
            <span className="font-headline text-2xl tracking-widest uppercase font-bold">Petals</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground -mt-1 font-bold">Studio</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`text-xs font-bold uppercase tracking-widest hover:text-rose-pink transition-colors flex items-center gap-2 ${link.name === 'Creator' ? 'text-rose-pink' : ''}`}
            >
              {link.icon && <link.icon className="w-3.5 h-3.5" />}
              {link.name}
            </Link>
          ))}
          <Button asChild size="sm" className="bg-rose-pink text-white hover:bg-rose-pink/90 rounded-full px-8 h-10 text-xs font-bold uppercase tracking-widest shadow-lg shadow-rose-pink/20">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-6 right-6 mt-4 glass-morphism rounded-[2rem] p-8 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-headline font-bold hover:text-rose-pink flex items-center justify-center gap-2"
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  {link.name}
                </Link>
              ))}
              <Button asChild size="sm" className="bg-rose-pink text-white rounded-full">
                <Link href="/contact" onClick={() => setIsOpen(false)}>Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
