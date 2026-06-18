
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <FloatingPetals />
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <h1 className="font-headline text-5xl md:text-7xl">Terms of Service</h1>
              <p className="text-muted-foreground italic font-headline text-lg">Last updated: May 20, 2024</p>
            </div>

            <div className="glass-morphism rounded-[3rem] p-8 md:p-16 space-y-8 text-muted-foreground leading-relaxed italic font-headline text-lg">
              <section className="space-y-4">
                <h2 className="text-3xl text-foreground not-italic font-headline">1. Acceptance of Terms</h2>
                <p>By accessing and using PETALS Studio's website and services, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-3xl text-foreground not-italic font-headline">2. Intellectual Property</h2>
                <p>All content, including artwork, stories, character designs, and animations, are the exclusive property of PETALS Studio. Unauthorized reproduction or distribution is strictly prohibited.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-3xl text-foreground not-italic font-headline">3. Use of AI Tools</h2>
                <p>Our website may feature interactive AI tools (like the Dreamweaver Portal). Users are encouraged to use these tools for personal inspiration. Commercial use of AI-generated concepts remains subject to PETALS Studio's licensing policies.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-3xl text-foreground not-italic font-headline">4. User Conduct</h2>
                <p>Users must not engage in any activity that disrupts the website's functionality or violates the rights of others.</p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
