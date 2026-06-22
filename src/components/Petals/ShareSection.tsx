
"use client";

import { motion } from "framer-motion";
import { 
  Link as LinkIcon, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Home,
  BookOpen,
  Users,
  Palette,
  Film,
  Wand2,
  Info,
  Mail,
  Sparkles,
  Check
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

// Social Share Icons (Custom SVGs for missing Lucide icons)
const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.396 2.966 7.396 6.929 0 4.135-2.607 7.462-6.225 7.462-1.214 0-2.354-.631-2.746-1.379l-.748 2.848c-.27 1.031-1.002 2.324-1.492 3.12 1.12.346 2.304.534 3.535.534 6.621 0 11.988-5.365 11.988-11.988C24.005 5.367 18.638 0 12.017 0z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M14.321 15.407c-.028-.005-.058-.009-.088-.013-1.07-.15-1.926-.64-2.545-1.457-.619.817-1.475 1.307-2.545 1.457-.03.004-.06.008-.088.013a5.85 5.85 0 0 1-5.181-4.144c-.015-.05-.03-.1-.043-.151a5.85 5.85 0 0 1-.036-.312V10.8a5.85 5.85 0 0 1 5.85-5.85c3.23 0 5.85 2.62 5.85 5.85v.001c0 .104-.012.206-.036.312-.013.051-.028.101-.043.151a5.85 5.85 0 0 1-5.181 4.144zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function ShareSection() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [siteUrl, setSiteUrl] = useState("https://petalsstudio.com");
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSiteUrl(window.location.origin);
    }
  }, []);

  const shareText = "Explore the whimsical world of PETALS Studio - where stories bloom like roses! 🌸";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "The magic is ready to be shared.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, color: "hover:bg-blue-600", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}` },
    { name: "Instagram", icon: Instagram, color: "hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-600", url: "https://instagram.com" },
    { name: "Pinterest", icon: PinterestIcon, color: "hover:bg-red-600", url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(siteUrl)}&description=${encodeURIComponent(shareText)}` },
    { name: "YouTube", icon: Youtube, color: "hover:bg-red-700", url: "https://youtube.com" },
    { name: "LinkedIn", icon: Linkedin, color: "hover:bg-blue-700", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}` },
    { name: "X (Twitter)", icon: XIcon, color: "hover:bg-black", url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}` },
    { name: "Threads", icon: ThreadsIcon, color: "hover:bg-black", url: "https://threads.net" },
    { name: "WhatsApp", icon: WhatsAppIcon, color: "hover:bg-green-500", url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + siteUrl)}` },
  ];

  const exploreLinks = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Books", icon: BookOpen, href: "/books" },
    { name: "Videos", icon: Film, href: "/videos" },
    { name: "Creator", icon: Wand2, href: "/creator" },
    { name: "Characters", icon: Users, href: "/characters" },
    { name: "Gallery", icon: Palette, href: "/gallery" },
    { name: "About Us", icon: Info, href: "/about" },
    { name: "Contact", icon: Mail, href: "/contact" },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-white/30">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-rose-pink/10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-fairy-gold/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-[0.4em] border border-rose-pink/20 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5" /> Spread the Wonder
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-headline text-5xl md:text-6xl text-foreground"
          >
            Share the Magic of <span className="italic text-rose-pink">PETALS Studio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground italic font-headline max-w-2xl mx-auto"
          >
            Discover enchanting storybooks, magical characters, fantasy artwork, and unforgettable adventures.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-morphism rounded-[3rem] overflow-hidden border border-white/40 shadow-2xl">
            {/* Main Card Header Image */}
            <div className="relative h-[300px] md:h-[450px] w-full group">
              <Image 
                src="https://www.dropbox.com/scl/fi/9fakorbmuh1bi4onk84a7/ChatGPT-Image-Jun-18-2026-07_29_29-PM.png?rlkey=qytc1rkbmoecgdidj8av8k6hx&st=bcsd1n4o&raw=1"
                alt="PETALS Studio Preview"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Card Content */}
            <div className="p-8 md:p-16 space-y-12 bg-white/40 backdrop-blur-xl">
              <div className="text-center space-y-6">
                <h3 className="font-headline text-3xl md:text-5xl text-foreground">
                  Whimsical World of Storybooks and Dreams
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground italic font-headline leading-relaxed max-w-3xl mx-auto">
                  Explore magical books, beloved characters, enchanting artwork, and fantasy adventures created by PETALS Studio.
                </p>
              </div>

              {/* Share Buttons */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 px-6 opacity-40">
                  <div className="h-px flex-1 bg-rose-pink" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-pink">Share the Link</span>
                  <div className="h-px flex-1 bg-rose-pink" />
                </div>

                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  {/* Copy Link Button */}
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className="w-14 h-14 rounded-full border-rose-pink/30 text-rose-pink hover:bg-rose-pink hover:text-white transition-all shadow-lg flex items-center justify-center p-0"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                  </Button>

                  {socialLinks.map((social) => (
                    <Button
                      key={social.name}
                      asChild
                      variant="outline"
                      className={`w-14 h-14 rounded-full border-white/50 bg-white/20 text-foreground transition-all duration-300 hover:text-white hover:border-transparent hover:shadow-xl ${social.color} flex items-center justify-center p-0`}
                    >
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <social.icon className="w-5 h-5" />
                        <span className="sr-only">{social.name}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Explore Buttons */}
              <div className="space-y-8 pt-8 border-t border-rose-pink/10">
                <div className="text-center space-y-2">
                  <h4 className="font-headline text-2xl text-rose-pink uppercase tracking-widest font-bold">📖 Explore PETALS</h4>
                  <p className="text-sm text-muted-foreground italic font-headline">Journey through our magical studio sections</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {exploreLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      className="group flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-rose-pink/5 border border-rose-pink/10 transition-all hover:bg-rose-pink hover:shadow-xl hover:-translate-y-1"
                    >
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-rose-pink shadow-sm transition-transform group-hover:scale-110">
                        <link.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-white transition-colors">
                        {link.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
