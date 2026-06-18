
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { FinalCTA } from "@/components/Petals/FinalCTA";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { 
  ShoppingBag, 
  Users, 
  Star, 
  BookOpen, 
  FileText,
  ArrowRight,
  Waves,
  Moon,
  Flower,
  Sparkles,
  Gem
} from "lucide-react";

// Custom Butterfly SVG as Lucide doesn't have one
const ButterflyIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 12c-3-6-8-4-8 1s4 4 8-1zm0 0c3-6 8-4 8 1s-4 4-8-1z" />
    <path d="M12 12c-3 6-8 4-8-1s4-4 8 1zm0 0c3 6 8 4 8-1s-4-4-8 1z" />
    <path d="M12 8v8" />
  </svg>
);

const featureCards = [
  { icon: Waves, text: "Ocean Fantasy Adventure" },
  { icon: Moon, text: "Powerful Female Characters" },
  { icon: Flower, text: "Sisterhood & Family Bonds" },
  { icon: Sparkles, text: "Magic, Mystery & Destiny" },
  { icon: ButterflyIcon, text: "Beautiful Fantasy World" },
  { icon: Gem, text: "Themes of Healing & Forgiveness" },
];

const featuredTaleSisters = {
  id: "featured-sisters", 
  category: "Featured Tale", 
  url: PlaceHolderImages.find(img => img.id === 'gallery-sisters')?.imageUrl || "", 
  title: "The Bond of Two Hearts: RoseBella & Lunaria",
  description: `RoseBella and Lunaria were sisters who shared more than just blood; they shared a destiny that would change their kingdom forever. Together, they navigated a world that feared what it could not understand.`
};

const books = [
  { 
    id: "book-mermaids", 
    title: "Songs of the Shimmering Sea", 
    subtitle: "The Melodies of Alora", 
    genre: "Mythology", 
    rating: "4.8", 
    description: "Deep sea secrets revealed through the ancient songs of the mermaid guardians.", 
    amazonUrl: "#", 
    whatsappUrl: "#" 
  },
  { 
    id: "book-guardians", 
    title: "Guardians of Dream Petals", 
    subtitle: "Protectors of the Realm", 
    genre: "Epic Fantasy", 
    rating: "5.0", 
    description: "The spectral protectors who watch over the sleeping world, weaving petals of light.", 
    amazonUrl: "#", 
    whatsappUrl: "#" 
  },
  { 
    id: "book-starlight", 
    title: "The Starlight Lantern", 
    subtitle: "A Journey of Hope", 
    genre: "Adventure", 
    rating: "4.7", 
    description: "A young stargazer's journey to bring light back to the world using a magical lantern.", 
    amazonUrl: "#", 
    whatsappUrl: "#" 
  },
  { 
    id: "book-kids-collection", 
    title: "The Enchanted Storybook", 
    subtitle: "A PETALS Collection for Kids", 
    genre: "Children's Fantasy", 
    rating: "4.9", 
    description: "A specially curated collection of gentle fantasy tales designed for the youngest dreamers.", 
    amazonUrl: "#", 
    whatsappUrl: "#" 
  },
  { 
    id: "book-little-girl", 
    title: "Be a Little Girl", 
    subtitle: "Growing Up with Magic", 
    genre: "Inspirational", 
    rating: "4.8", 
    description: "A heartwarming story about the magic of childhood and the wonder of growing up.", 
    amazonUrl: "#", 
    whatsappUrl: "#" 
  },
  { 
    id: "book-wind", 
    title: "Chronicles of the Wind-Whisperer", 
    subtitle: "Secrets of the Sky", 
    genre: "Steampunk Fantasy", 
    rating: "4.6", 
    description: "Join the wind-whisperers on their journey through the floating isles of Aethelgard.", 
    amazonUrl: "#", 
    whatsappUrl: "#" 
  },
  {
    id: "book-tea",
    title: "The Midnight Tea Party",
    subtitle: "A Whimsical Gathering",
    genre: "Gentle Fantasy",
    rating: "4.9",
    description: "Join the forest friends for a magical tea party under the velvet sky of the PETALS realm.",
    amazonUrl: "#",
    whatsappUrl: "#"
  },
  {
    id: "book-map",
    title: "The Forgotten Map of Floria",
    subtitle: "A Journey of Discovery",
    genre: "Exploration",
    rating: "4.7",
    description: "Unlock the secrets of an ancient realm using a map that reacts to the heart's truest desires.",
    amazonUrl: "#",
    whatsappUrl: "#"
  }
];

export default function BooksPage() {
  const featuredBookCover = PlaceHolderImages.find(img => img.id === 'book-whispers');

  return (
    <div className="min-h-screen bg-pearl-white">
      <FloatingPetals />
      <Navbar />

      <main className="relative">
        {/* Cinematic Hero Section - FinalCTA serves as the hero here */}
        <div className="pt-20">
          <FinalCTA />
        </div>

        {/* Spotlight Showcase Section */}
        <section className="relative min-h-[65vh] flex items-center py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-pink/10 via-transparent to-pearl-white" />
          </div>

          <div className="container mx-auto px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <Star className="w-4 h-4 text-fairy-gold fill-fairy-gold" /> Featured Spotlight
                </div>
                <h2 className="font-headline text-4xl md:text-5xl text-foreground leading-tight italic">
                  The Crystal Rose: Beneath the Whispering Waves
                </h2>
              </div>

              <p className="text-xl font-headline italic text-muted-foreground border-l-4 border-rose-pink pl-6 max-w-2xl">
                A magical tale of sisterhood, destiny, forgiveness, and the power of the heart.
              </p>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                <p>
                  Long ago, beneath ancient oceans and silver moonlight, a powerful secret changed the fate of an entire kingdom. When forgotten memories, hidden magic, and an ancient curse begin to awaken, a young ocean-born girl named Alora must uncover the truth behind the legendary Crystal Rose before darkness consumes everything she loves.
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
            </motion.div>

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
                  <feature.icon className="w-10 h-10 text-rose-pink stroke-[1.5]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground leading-tight">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Big Featured Card: RoseBella & Lunaria */}
        <section className="py-24 relative overflow-hidden bg-white/30">
          <div className="container mx-auto px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-rose-pink/10 blur-[100px] rounded-full scale-110 opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative glass-morphism rounded-[4rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/40 shadow-2xl">
                <div className="lg:col-span-7 relative h-[400px] lg:h-[600px] overflow-hidden">
                  <Image
                    src={featuredTaleSisters.url}
                    alt={featuredTaleSisters.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="lg:col-span-5 p-8 md:p-16 flex flex-col justify-center space-y-8 bg-white/40 backdrop-blur-md">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-rose-pink font-bold uppercase tracking-[0.2em] text-xs">
                      <BookOpen className="w-4 h-4" /> Featured Tale
                    </div>
                    <h3 className="font-headline text-4xl md:text-5xl leading-tight text-foreground">
                      {featuredTaleSisters.title}
                    </h3>
                    <p className="text-xl text-muted-foreground italic font-headline leading-relaxed">
                      {featuredTaleSisters.description}
                    </p>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-fit bg-rose-pink text-white h-12 rounded-2xl px-8 font-bold uppercase tracking-widest text-xs shadow-lg shadow-rose-pink/20 group/btn">
                        Read Full Lore <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white/95 backdrop-blur-xl border-none shadow-2xl rounded-[3rem]">
                      <div className="p-12 md:p-16 overflow-y-auto max-h-[80vh] custom-scrollbar">
                        <h3 className="font-headline text-5xl mb-8 text-foreground">{featuredTaleSisters.title}</h3>
                        <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed italic font-headline text-xl">
                          {`🌹 RoseBella\nkind-hearted, gentle, loving, and deeply adored by everyone.\nBut RoseBella’s younger sister,\n🌙 Lunaria\nwas different.\nLunaria was curious, emotional, independent, and deeply connected to strange things others feared:\ndark forests\nwounded creatures\nforgotten magic\nlonely places\n\nAs a child, Lunaria rescued a tiny black kitten named:\n🖤 Nyx\nThough harmless and affectionate, villagers feared the kitten because of old superstitions.\nLunaria could never understand:\n“Why do people fear things that never hurt anyone?”\nThis slowly became the beginning of her loneliness.\n\nRoseBella always comforted and protected her younger sister.\nThe sisters loved each other deeply.\nThey played beneath silver trees with:\na small deer\ntwo little birds\nmoonflowers\nsongs\nmagical stories\n\nBut while RoseBella was naturally loved by everyone,\nLunaria slowly began feeling emotionally different and misunderstood.\n\nOne day Lunaria discovered an ancient magical book:\n📖 Moonlight Veils\nAt first, the book showed only gentle magic:\nhealing light\nmoonfire\nemotional magic\npeaceful spells\n\nLunaria secretly practiced harmless magic beneath moonlight while Nyx slept beside her.\nBut society feared magic.\nAfter a misunderstanding involving Lunaria healing a wounded deer with magic, villagers began whispering that she was dangerous.\nTheir fear slowly isolated her emotionally.`}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Collection Grid */}
        <section className="pb-32 pt-24">
          <div className="container mx-auto px-12">
            <div className="flex items-center justify-between mb-16">
              <div className="space-y-2">
                <h2 className="font-headline text-4xl text-foreground">More Magical Stories</h2>
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
                      <div className="flex items-center gap-10 justify-between text-[10px] font-bold uppercase tracking-widest text-rose-pink">
                        <span>{book.genre}</span>
                        <div className="flex items-center gap-1 text-fairy-gold">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-muted-foreground">{book.rating}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-headline text-xl leading-tight group-hover:text-rose-pink transition-colors text-foreground">
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
      </main>

      <Footer />
    </div>
  );
}
