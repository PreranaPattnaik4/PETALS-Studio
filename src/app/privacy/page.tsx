
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { motion } from "framer-motion";

export default function PrivacyPage() {
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
              <h1 className="font-headline text-5xl md:text-7xl">Privacy Policy</h1>
              <p className="text-muted-foreground italic font-headline text-lg">Your privacy is sacred to us.</p>
            </div>

            <div className="glass-morphism rounded-[3rem] p-8 md:p-16 space-y-8 text-muted-foreground leading-relaxed italic font-headline text-lg">
              <section className="space-y-4">
                <h2 className="text-3xl text-foreground not-italic font-headline">Information We Collect</h2>
                <p>We collect information you provide directly to us, such as when you sign up for our newsletter, complete a survey, or contact us. This may include your name and email address.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-3xl text-foreground not-italic font-headline">How We Use Your Information</h2>
                <p>We use your information to provide magical updates, improve our services, and respond to your inquiries. We never sell your data to third parties.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-3xl text-foreground not-italic font-headline">Data Security</h2>
                <p>We implement industry-standard security measures to protect your personal information from unauthorized access.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-3xl text-foreground not-italic font-headline">Your Choices</h2>
                <p>You can opt-out of our communications at any time by clicking the unsubscribe link in our emails or by contacting us directly.</p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
