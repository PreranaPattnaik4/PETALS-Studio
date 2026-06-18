
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sparkles, Heart } from "lucide-react";

export default function CustomerSurveyPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <FloatingPetals />
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16 space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-widest border border-rose-pink/20"
            >
              <Heart className="w-3.5 h-3.5" /> Your Voice Matters
            </motion.div>
            <h1 className="font-headline text-5xl md:text-6xl">Customer Survey</h1>
            <p className="text-muted-foreground italic font-headline text-lg">Help us shape the future of the PETALS universe.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-morphism rounded-[3rem] p-8 md:p-12 shadow-xl"
          >
            <form className="space-y-10">
              <div className="space-y-4">
                <Label className="text-lg font-headline">How did you first discover PETALS Studio?</Label>
                <RadioGroup defaultValue="social">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="social" id="social" />
                    <Label htmlFor="social">Social Media</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="friend" id="friend" />
                    <Label htmlFor="friend">A Friend or Family Member</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="amazon" id="amazon" />
                    <Label htmlFor="amazon">Amazon Marketplace</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-headline">What do you love most about our stories?</Label>
                <Textarea placeholder="Share your thoughts..." className="bg-white/50 min-h-[120px] rounded-2xl" />
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-headline">Who is your favorite character?</Label>
                <Input placeholder="Enter character name..." className="bg-white/50 h-12 rounded-xl" />
              </div>

              <Button className="w-full bg-rose-pink text-white h-14 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-rose-pink/20">
                Submit Feedback
              </Button>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
