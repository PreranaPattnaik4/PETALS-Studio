
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { CharacterShowcase } from "@/components/Petals/CharacterShowcase";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";

export default function CharactersPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <FloatingPetals />
      <Navbar />
      <main className="relative pt-24">
        <CharacterShowcase />
        <Footer />
      </main>
    </div>
  );
}
