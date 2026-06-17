
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { CharacterShowcase } from "@/components/Petals/CharacterShowcase";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { SidebarNav } from "@/components/Petals/SidebarNav";

export default function CharactersPage() {
  return (
    <div className="flex min-h-screen bg-pearl-white">
      <SidebarNav />
      <main className="flex-1 ml-64 relative">
        <FloatingPetals />
        <Navbar />
        <div className="pt-24">
          <CharacterShowcase />
        </div>
        <Footer />
      </main>
    </div>
  );
}
