
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function SidebarNav() {
  const pathname = usePathname();
  const logoImg = PlaceHolderImages.find(img => img.id === 'petals-logo');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'Videos', href: '/videos' },
    { name: 'Creator Studio', href: '/creator' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-rose-pink/10 z-50 flex flex-col p-8 overflow-y-auto">
      <Link href="/" className="flex flex-col items-center gap-4 mb-16 group">
        <div className="relative w-16 h-16 overflow-hidden rounded-full border border-rose-pink/20 transition-transform duration-500 group-hover:scale-110 shadow-sm">
          <Image 
            src={logoImg?.imageUrl || ""} 
            alt="Petals Logo" 
            fill 
            className="object-cover"
            data-ai-hint="logo"
          />
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="font-headline text-2xl tracking-widest uppercase">Petals</span>
          <span className="text-[10px] uppercase tracking-tighter text-muted-foreground -mt-1">Studio</span>
        </div>
      </Link>

      <nav className="flex flex-col gap-6">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className={cn(
              "text-sm font-medium transition-colors tracking-wide hover:text-rose-pink",
              pathname === link.href ? "text-rose-pink font-bold" : "text-foreground/70"
            )}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground opacity-50 text-center">
          © {new Date().getFullYear()} Petals Studio
        </div>
      </div>
    </aside>
  );
}
