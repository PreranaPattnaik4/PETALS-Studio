
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { ShoppingBag, Users, Star, BookOpen } from "lucide-react";

const books = [
  {
    id: "book-whispers",
    title: "Whispers of the Crystal Rose",
    subtitle: "A Journey Through the Glass Kingdom",
    description: "Discover the hidden origins of the Crystal Rose kingdom. Follow young RoseBella as she learns the ancient language of the blooming glass and faces the shadows threatening her world.",
    amazonUrl: "https://amazon.com",
    whatsappUrl: "https://whatsapp.com",
    rating: 4.9,
    pages: 320,
    genre: "Fantasy / Adventure"
  },
  {
    id: "book-mermaids",
    title: "Songs of the Shimmering Sea",
    subtitle: "The Chronicles of Alora",
    description: "Dive into an underwater odyssey where melodies hold the power to mend hearts. Alora, the Serene Mermaid, must find the lost Pearl of Silence to save her people from a forgotten curse.",
    amazonUrl: "https://amazon.com",
    whatsappUrl: "https://whatsapp.com",
    rating: 4.8,
    pages: 280,
    genre: "Fantasy / Mythology"
  },
  {
    id: "book-guardians",
    title: "Guardians of the Dream Petals",
    subtitle: "The Sleepweaver's Legacy",
    description: "In the realm where dreams are woven, Nerina protects the innocent from the encroaching Nightmares. A gentle, poetic exploration of courage, kindness, and the magic of a peaceful night's sleep.",
    amazonUrl: "https://amazon.com",
    whatsappUrl: "https://whatsapp.com",
    rating: 5.0,
    pages: 240,
    genre: "Gentle Fantasy"
  }
];

export default function BooksPage() {
  return (
    <main className="relative min-h-screen bg-pearl-white">
      <FloatingPetals />
      <Navbar />

      <section className="pt-40 pb-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-pink/10 text-rose-pink text-sm font-bold uppercase tracking-widest"
            >
              <BookOpen className="w-4 h-4" /> The PETALS Collection
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-headline text-5xl md:text-7xl"
            >
              Our Storybooks
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground italic font-headline"
            >
              Immerse yourself in worlds where every page blooms with wonder.
            </motion.p>
          </div>

          <div className="space-y-32">
            {books.map((book, index) => {
              const bookImg = PlaceHolderImages.find(img => img.id === book.id);
              return (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-24`}
                >
                  {/* Book Image */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative group perspective-1000">
                      <div className="relative w-64 h-96 md:w-80 md:h-[480px] rounded-r-lg overflow-hidden shadow-2xl transition-transform duration-500 group-hover:rotate-y-[-10deg] group-hover:scale-105">
                        <Image
                          src={bookImg?.imageUrl || ""}
                          alt={book.title}
                          fill
                          className="object-cover"
                          data-ai-hint={bookImg?.imageHint}
                        />
                        <div className="absolute inset-y-0 left-0 w-4 bg-black/20 backdrop-blur-sm" />
                      </div>
                      <div className="absolute -z-10 inset-0 bg-rose-pink/20 blur-3xl rounded-full translate-y-10 scale-90" />
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="w-full md:w-1/2 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-rose-gold">
                        <span>{book.genre}</span>
                        <span className="w-1 h-1 bg-rose-gold rounded-full" />
                        <span>{book.pages} Pages</span>
                      </div>
                      <h2 className="font-headline text-4xl md:text-5xl leading-tight">
                        {book.title}
                      </h2>
                      <p className="text-xl font-headline italic text-rose-pink">
                        {book.subtitle}
                      </p>
                      <div className="flex items-center gap-1 text-fairy-gold">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground font-medium">{book.rating} / 5.0</span>
                      </div>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {book.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                      <Button 
                        asChild
                        size="lg" 
                        className="w-full sm:w-auto bg-rose-pink text-white hover:bg-rose-pink/90 rounded-full px-10 h-14 text-lg shadow-lg shadow-rose-pink/20"
                      >
                        <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                          <ShoppingBag className="mr-2 w-5 h-5" /> Buy on Amazon
                        </a>
                      </Button>
                      <Button 
                        asChild
                        variant="outline" 
                        size="lg" 
                        className="w-full sm:w-auto border-fairy-gold text-fairy-gold hover:bg-fairy-gold/10 rounded-full px-10 h-14 text-lg"
                      >
                        <a href={book.whatsappUrl} target="_blank" rel="noopener noreferrer">
                          <Users className="mr-2 w-5 h-5" /> Join Community
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
