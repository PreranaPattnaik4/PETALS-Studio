
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateStoryConcepts, type GenerateStoryConceptsOutput } from "@/ai/flows/generate-story-concepts-flow";
import { Sparkles, Loader2, Wand2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DreamweaverPortal() {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [concepts, setConcepts] = useState<GenerateStoryConceptsOutput | null>(null);

  const handleGenerate = async () => {
    // Feature is currently disabled as part of "Coming Soon" rollout
    return;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-transparent to-soft-lavender/10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="glass-morphism rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
            <Wand2 className="w-32 h-32" />
          </div>
          
          <div className="relative z-10 space-y-8 text-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-pink/10 text-rose-pink text-[10px] font-bold uppercase tracking-widest border border-rose-pink/20 mb-4">
                <Clock className="w-3.5 h-3.5" /> Coming Soon
              </div>
              <h2 className="font-headline text-4xl flex items-center justify-center gap-3">
                <Sparkles className="text-fairy-gold" /> Dreamweaver Portal
              </h2>
              <p className="text-muted-foreground italic">
                Our weavers are currently crafting the AI models for the story generator. This portal will be blooming soon.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-50 pointer-events-none">
              <Input 
                placeholder="Main Character's Name" 
                disabled
                className="bg-white/50 border-rose-pink/20 h-12 rounded-xl"
              />
              <Input 
                placeholder="Core Theme (e.g. Bravery, Magic)" 
                disabled
                className="bg-white/50 border-rose-pink/20 h-12 rounded-xl"
              />
            </div>

            <Button 
              size="lg" 
              disabled
              className="w-full bg-rose-pink/20 text-muted-foreground h-12 rounded-xl text-lg cursor-not-allowed"
            >
              <Sparkles className="mr-2 w-5 h-5" /> Weave Story Concept (Soon)
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
