
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  Users, 
  Star, 
  BookOpen, 
  Sparkles, 
  Heart, 
  Play, 
  FileText,
  Wind
} from "lucide-react";

const books = [
  {
    id: "book-little-girl",
    title: "Be a Little Girl",
    subtitle: "A Journey of Self-Discovery",
    description: "An emotionally resonant story about finding one's place in a magical world while staying true to the heart's smallest whispers.",
    amazonUrl: "https://amazon.com",
    whatsappUrl: "https://whatsapp.com",
    rating: 5.0,
    pages: 160,
    genre: "Inspirational Fantasy"
  },
  {
    id: "book-kids-collection",
    title: "The Enchanted Storybook",
    subtitle: "A PETALS Collection for Kids",
    description: "A treasure trove of gentle fantasy stories designed to inspire kindness, wonder, and imagination in young readers.",
    amazonUrl: "https://amazon.com",
    whatsappUrl: "https://whatsapp.com",
    rating: 5.0,
    pages: 180,
    genre: "Kids Fantasy"
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

const featureCards = [
  { icon: "🧜‍♀️", text: "Ocean Fantasy Adventure" },
  { icon: "🌙", text: "Powerful Female Characters" },
  { icon: "🌹", text: "Sisterhood & Family Bonds" },
  { icon: "✨", text: "Magic, Mystery & Destiny" },
  { icon: "🦋", text: "Beautiful Fantasy World" },
  { icon: "💎", text: "Themes of Healing & Forgiveness" },
];

export default function BooksPage() {
  const crystalRoseBg = PlaceHolderImages.find(img => img.id === 'crystal-rose-universe');
  const featuredBookCover = PlaceHolderImages.find(img => img.id === 'book-whispers');
  const communityBg = PlaceHolderImages.find(img => img.id === 'book-community-bg');

  return (
    <div className="min-h-screen bg-pearl-white">
      <FloatingPetals />
      <Navbar />

      <main className="relative">
        {/* Featured Hero Section */}
        <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <Image 
              src={crystalRoseBg?.imageUrl || ""}
              alt="Moonlit Ocean"
              fill
              className="object-cover opacity-30 scale-110 blur-sm"
              data-ai-hint="moonlit ocean"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-pearl-white/80 via-transparent to-pearl-white" />
          </div>

          <div className="container mx-auto px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fairy-gold/10 text-fairy-gold text-sm font-bold uppercase tracking-widest border border-fairy-gold/20">
                <Star className="w-4 h-4 fill-current" /> Premium Fantasy Adventure
              </div>

              <div className="space-y-2">
                <h1 className="font-headline text-5xl md:text-7xl leading-tight">
                  THE CRYSTAL ROSE:
                </h1>
                <h2 className="font-headline text-4xl md:text-5xl text-rose-pink italic">
                  BENEATH THE WHISPERING WAVES
                </h2>
              </div>

              <p className="text-xl font-headline italic text-muted-foreground border-l-4 border-rose-pink pl-6">
                A magical tale of sisterhood, destiny, forgiveness, and the power of the heart.
              </p>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                <p>
                  Long ago, beneath ancient oceans and silver moonlight, a powerful secret changed the fate of an entire kingdom. When forgotten memories, hidden magic, and an ancient curse begin to awaken, a young ocean-born girl named Alora must uncover the truth behind the legendary Crystal Rose before darkness consumes everything she loves.
                </p>
                <p>
                  Filled with enchanted forests, magical creatures, moonlit mysteries, and unforgettable characters, this heartwarming fantasy adventure reminds readers that true magic comes not from power—but from the choices we make.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="sm" className="bg-rose-pink text-white hover:bg-rose-pink/90 rounded-2xl px-8 h-10 text-xs font-bold uppercase tracking-widest shadow-xl shadow-rose-pink/20">
                  <ShoppingBag className="mr-2 w-5 h-5" /> Buy Now
                </Button>
                <Button variant="outline" size="sm" className="border-rose-pink text-rose-pink hover:bg-rose-pink/5 rounded-2xl px-8 h-10 text-xs font-bold uppercase tracking-widest">
                  <FileText className="mr-2 w-5 h-5" /> Read Sample
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 pt-6 border-t border-rose-pink/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-muted-foreground">
                  <Users className="w-4 h-4 text-rose-pink" /> Ages 8+
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-muted-foreground">
                  <Heart className="w-4 h-4 text-rose-pink" /> Family-Friendly
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-rose-pink" /> Illustrated
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-rose-pink" /> Digital & Print
                </div>
              </div>
            </motion.div>

            {/* Right Side Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="lg:col-span-5 relative aspect-[3/4] group"
            >
              <div className="absolute inset-0 bg-rose-pink/20 rounded-[3rem] blur-3xl group-hover:bg-rose-pink/30 transition-colors" />
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(247,183,195,0.4)] border border-white/40 bg-white/40 backdrop-blur-md p-4">
                <div className="relative h-full w-full rounded-2xl overflow-hidden">
                  <Image 
                    src={featuredBookCover?.imageUrl || ""}
                    alt="The Crystal Rose: Beneath the Whispering Waves"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint="fantasy book cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-24 bg-white/50 backdrop-blur-sm border-y border-rose-pink/10">
          <div className="container mx-auto px-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {featureCards.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center space-y-4 p-6 rounded-3xl bg-white/40 border border-white/20 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-4xl">{feature.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground leading-tight">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Call to Action (Inspired by Vooks) */}
        <section className="relative py-48 md:py-64 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src={communityBg?.imageUrl || ""}
              alt="Community Background"
              fill
              className="object-cover brightness-[0.6]"
              data-ai-hint="magical grotto"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-pearl-white via-transparent to-pearl-white" />
          </div>

          <div className="container mx-auto px-12 relative z-10 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <h2 className="font-headline text-5xl md:text-7xl text-white drop-shadow-lg">
                Unfold Their <span className="italic text-rose-pink">Imagination</span>
              </h2>
              <p className="text-xl text-white font-headline italic leading-relaxed drop-shadow-md">
                Join our community of dreamers to access exclusive lore, interactive activities, and the full collection of PETALS storybooks.
              </p>
              <div className="pt-4">
                <Button size="sm" className="bg-rose-pink text-white hover:bg-rose-pink/90 rounded-full px-10 h-10 font-bold uppercase tracking-widest shadow-xl shadow-rose-pink/20">
                  Start Your Magical Journey
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-32 relative text-center">
          <div className="container mx-auto px-12 max-w-4xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Sparkles className="w-12 h-12 text-fairy-gold mx-auto opacity-50" />
              <blockquote className="font-headline text-3xl md:text-5xl leading-tight text-foreground/80 italic">
                &quot;Emotions are powerful... but the choices we make while feeling them shape our destiny.&quot;
              </blockquote>
              <div className="flex justify-center">
                <div className="w-24 h-px bg-rose-pink/30" />
              </div>
              <p className="font-headline text-2xl text-rose-pink uppercase tracking-widest">A Petals Original Tale</p>
            </motion.div>
          </div>
        </section>

        {/* More Stories Grid */}
        <section className="pb-32">
          <div className="container mx-auto px-12">
            <div className="flex items-center justify-between mb-16">
              <div className="space-y-2">
                <h2 className="font-headline text-4xl">More Magical Stories</h2>
                <p className="text-muted-foreground italic font-headline text-lg">
                  Explore other realms from the PETALS collection.
                </p>
              </div>
              <div className="h-px flex-1 bg-rose-pink/10 mx-12 hidden md:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {books.map((book, index) => {
                const bookImg = PlaceHolderImages.find(img => img.id === book.id);
                return (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                    className="group bg-white/40 backdrop-blur-sm rounded-[2rem] p-5 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
                  >
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md mb-6 group-hover:scale-[1.02] transition-transform duration-500">
                      <Image
                        src={bookImg?.imageUrl || ""}
                        alt={book.title}
                        fill
                        className="object-cover"
                        data-ai-hint={bookImg?.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="space-y-4 flex-1 flex flex-col">
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

                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                        {book.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 pt-4">
                        <Button 
                          asChild
                          variant="default"
                          size="sm"
                          className="bg-rose-pink text-white hover:bg-rose-pink/90 rounded-xl shadow-md h-10 text-xs font-bold uppercase tracking-widest"
                        >
                          <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                            <ShoppingBag className="mr-2 w-3.5 h-3.5" /> Buy
                          </a>
                        </Button>
                        <Button 
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-fairy-gold/50 text-fairy-gold hover:bg-fairy-gold/5 rounded-xl h-10 text-xs font-bold uppercase tracking-widest"
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
