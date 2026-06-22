
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const AmazonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 13.5c1.5 1 4.5 2.5 9 2.5s7.5-1.5 9-2.5" />
    <path d="M17.5 13.5c1 0 3.5 0 3.5 0l0-3.5" />
  </svg>
);

export function Footer() {
  const logoImg = PlaceHolderImages.find(img => img.id === 'petals-logo');

  return (
    <footer className="bg-[#0a0a0a] pt-32 pb-16 text-white relative">
      <div className="container mx-auto px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
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
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Youtube, href: "#" },
                { Icon: AmazonIcon, href: "#" },
                { Icon: Linkedin, href: "#" }
              ].map((item, i) => (
                <Link key={i} href={item.href} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-rose-pink hover:text-white transition-all">
                  <item.Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-headline text-xl mb-10 text-rose-pink">Explore</h4>
            <ul className="space-y-6 text-xs font-bold uppercase tracking-widest text-white/60">
              <li><Link href="/books" className="hover:text-white transition-colors">Book Library</Link></li>
              <li><Link href="/videos" className="hover:text-white transition-colors">Animations</Link></li>
              <li><Link href="/creator" className="hover:text-white transition-colors">Creator Studio</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Art Gallery</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-headline text-xl mb-10 text-rose-pink">Studio</h4>
            <ul className="space-y-6 text-xs font-bold uppercase tracking-widest text-white/60">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/customer-survey" className="hover:text-white transition-colors">Customer Survey</Link></li>
              <li><Link href="/patents" className="hover:text-white transition-colors">Patents</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-headline text-xl mb-10 text-rose-pink">Support & Legal</h4>
            <ul className="space-y-6 text-xs font-bold uppercase tracking-widest text-white/60">
              <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
              <li><Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
          <p>© {new Date().getFullYear()} PETALS STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
