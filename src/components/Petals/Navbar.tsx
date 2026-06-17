
"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Flower2, Menu } from "lucide-react";
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Gallery', href: '/gallery' },
    { name: 'Characters', href: '/characters' },
    { name: 'Stories', href: '/stories' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b-0 h-20 flex items-center">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <Flower2 className="w-8 h-8 text-rose-pink group-hover:rotate-45 transition-transform duration-500" />
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
          <Button variant="outline" className="border-rose-pink text-rose-pink hover:bg-rose-pink hover:text-white rounded-full px-6">
            Enter Universe
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
                <Button className="bg-rose-pink text-white rounded-full mt-4">
                  Enter Universe
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
