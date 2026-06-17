
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateStoryConcepts, type GenerateStoryConceptsOutput } from "@/ai/flows/generate-story-concepts-flow";
import { Sparkles, Loader2, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DreamweaverPortal() {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [concepts, setConcepts] = useState<GenerateStoryConceptsOutput | null>(null);

  const handleGenerate = async () => {
    if (!name || !theme) return;
    setLoading(true);
    try {
      const result = await generateStoryConcepts({
        characterName: name,
        theme: theme,
        emotion: "wonder and nostalgia"
      });
      setConcepts(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
              <h2 className="font-headline text-4xl flex items-center justify-center gap-3">
                <Sparkles className="text-fairy-gold" /> Dreamweaver Portal
              </h2>
              <p className="text-muted-foreground italic">
                Let magic weave a story concept for your imagination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                placeholder="Main Character's Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/50 border-rose-pink/20 h-12 rounded-xl focus:ring-rose-pink"
              />
              <Input 
                placeholder="Core Theme (e.g. Bravery, Magic)" 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-white/50 border-rose-pink/20 h-12 rounded-xl focus:ring-rose-pink"
              />
            </div>

            <Button 
              size="lg" 
              onClick={handleGenerate}
              disabled={loading || !name || !theme}
              className="w-full bg-rose-pink text-white h-12 rounded-xl text-lg shadow-lg hover:bg-rose-pink/90 transition-all active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 w-5 h-5" />}
              {loading ? "Woven Destiny..." : "Weave Story Concept"}
            </Button>

            <AnimatePresence>
              {concepts && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 gap-6 text-left mt-8"
                >
                  {concepts.storyConcepts.map((concept, idx) => (
                    <Card key={idx} className="bg-white/60 border-none shadow-md hover:shadow-xl transition-shadow rounded-2xl overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="font-headline text-xl text-rose-pink">{concept.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed italic">&quot;{concept.plotOutline}&quot;</p>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
