
"use client";

import { SidebarNav } from "@/components/Petals/SidebarNav";
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
    description: "Discover the hidden origins of the Crystal Rose kingdom. Follow young RoseBella as she learns the ancient language.",
    amazonUrl: "https://amazon.com",
    whatsappUrl: "https://whatsapp.com",
    rating: 4.9,
    pages: 320,
    genre: "Fantasy"
  },
  {
    id: "book-mermaids",
    title: "Songs of the Shimmering Sea",
    subtitle: "The Chronicles of Alora",
    description: "Dive into an underwater odyssey where melodies hold the power to mend hearts and save a forgotten civilization.",
    amazonUrl: "https://amazon.com",
    whatsappUrl: "https://whatsapp.com",
    rating: 4.8,
    pages: 280,
    genre: "Mythology"
  },
  {
    id: "book-guardians",
    title: "Guardians of the Dream Petals",
    subtitle: "The Sleepweaver's Legacy",
    description: "In the realm where dreams are woven, Nerina protects the innocent from encroaching shadows of the night.",
    amazonUrl: "https://amazon.com",
    whatsappUrl: "https://whatsapp.com",
    rating: 5.0,
    pages: 240,
    genre: "Gentle Fantasy"
  },
  {
    id: "book-starlight",
    title: "The Starlight Lantern",
    subtitle: "Quest for the Eternal Flame",
    description: "A young stargazer must find the lost lantern of the stars to bring light back to a world in permanent twilight.",
    amazonUrl: "https://amazon.com",
    whatsappUrl: "https://whatsapp.com",
    rating: 4.7,
    pages: 310,
    genre: "Adventure"
  },
  {
    id: "book-wind",
    title: "Chronicles of the Wind-Whisperer",
    subtitle: "The Skies of Aethelgard",
    description: "Fly among floating islands where the wind carries secrets of a long-lost empire waiting to be rediscovered.",
    amazonUrl: "https://amazon.com",
    whatsappUrl: "https://whatsapp.com",
    rating: 4.9,
    pages: 340,
    genre: "High Fantasy"
  },
  {
    id: "book-map",
    title: "The Forgotten Map of Floria",
    subtitle: "Secrets of the Bloom",
    description: "Follow the petals to find the heart of the forest. An interactive story about nature, growth, and ancient maps.",
    amazonUrl: "https://amazon.com",
    whatsappUrl: "https://whatsapp.com",
    rating: 4.8,
    pages: 290,
    genre: "Nature Fantasy"
  },
  {
    id: "book-amber",
    title: "Tales from the Amber Woods",
    subtitle: "The Golden Guardians",
    description: "The woods are alive with amber light. Discover the creatures that guard the forest's most precious treasures.",
    amazonUrl: "https://amazon.com",
    whatsappUrl: "https://whatsapp.com",
    rating: 4.9,
    pages: 275,
    genre: "Fable"
  },
  {
    id: "book-tea",
    title: "The Midnight Tea Party",
    subtitle: "Magic in the Moonlight",
    description: "A whimsical tale of a tea party held in the moonlit garden, where animals talk and teapots sing.",
    amazonUrl: "https://amazon.com",
    whatsappUrl: "https://whatsapp.com",
    rating: 5.0,
    pages: 220,
    genre: "Children's Fantasy"
  },
  {
    id: "book-echoes",
    title: "Echoes of the Silver Valley",
    subtitle: "Song of the Mountain King",
    description: "The echoes of the silver mountains hold the key to a peace that has been lost for generations.",
    amazonUrl: "https://amazon.com",
    whatsappUrl: "https://whatsapp.com",
    rating: 4.8,
    pages: 350,
    genre: "Epic Fantasy"
  }
];

export default function BooksPage() {
  return (
    <div className="flex min-h-screen bg-pearl-white">
      <SidebarNav />
      <main className="flex-1 ml-64 relative">
        <FloatingPetals />
        <Navbar />

        <section className="pt-32 pb-24">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
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
                className="font-headline text-5xl md:text-6xl"
              >
                Our Storybooks
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground italic font-headline"
              >
                Immerse yourself in worlds where every page blooms with wonder.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
              {books.map((book, index) => {
                const bookImg = PlaceHolderImages.find(img => img.id === book.id);
                return (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                    className="group bg-white/40 backdrop-blur-sm rounded-[2.5rem] p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Book Cover */}
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg mb-6 group-hover:scale-[1.02] transition-transform duration-500">
                      <Image
                        src={bookImg?.imageUrl || ""}
                        alt={book.title}
                        fill
                        className="object-cover"
                        data-ai-hint={bookImg?.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Book Info */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-rose-gold">
                        <span>{book.genre}</span>
                        <div className="flex items-center gap-1 text-fairy-gold">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-muted-foreground">{book.rating}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-headline text-xl leading-tight group-hover:text-rose-pink transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-xs font-headline italic text-rose-pink/80">
                          {book.subtitle}
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {book.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button 
                          asChild
                          variant="default"
                          size="sm"
                          className="bg-rose-pink text-white hover:bg-rose-pink/90 rounded-xl shadow-md h-10 text-xs"
                        >
                          <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                            <ShoppingBag className="mr-2 w-3.5 h-3.5" /> Amazon
                          </a>
                        </Button>
                        <Button 
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-fairy-gold/50 text-fairy-gold hover:bg-fairy-gold/5 rounded-xl h-10 text-xs"
                        >
                          <a href={book.whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <Users className="mr-2 w-3.5 h-3.5" /> Community
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
    </div>
  );
}
