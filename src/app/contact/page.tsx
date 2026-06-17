
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { SidebarNav } from "@/components/Petals/SidebarNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen bg-pearl-white">
      <SidebarNav />
      <main className="flex-1 ml-64 relative">
        <FloatingPetals />
        <Navbar />
        
        <section className="pt-40 pb-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16 space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-headline text-5xl md:text-6xl"
              >
                Contact Us
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-muted-foreground italic font-headline"
              >
                Reach out to bring magic into your world.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <div className="glass-morphism rounded-3xl p-8 space-y-6">
                  <h3 className="font-headline text-2xl">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="w-10 h-10 rounded-full bg-rose-pink/10 flex items-center justify-center text-rose-pink">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span>hello@petalsstudio.com</span>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="w-10 h-10 rounded-full bg-rose-pink/10 flex items-center justify-center text-rose-pink">
                        <Phone className="w-5 h-5" />
                      </div>
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="w-10 h-10 rounded-full bg-rose-pink/10 flex items-center justify-center text-rose-pink">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span>123 Magic Avenue, Storytown</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <form className="glass-morphism rounded-3xl p-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input placeholder="Your Name" className="bg-white/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="Your Email" className="bg-white/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input placeholder="How can we help?" className="bg-white/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea placeholder="Your magical message..." className="bg-white/50 min-h-[150px]" />
                  </div>
                  <Button className="w-full bg-rose-pink text-white rounded-xl h-12 shadow-lg hover:bg-rose-pink/90">
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
