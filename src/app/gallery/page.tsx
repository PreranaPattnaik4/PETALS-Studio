
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { ArtGallery } from "@/components/Petals/ArtGallery";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { FinalCTA } from "@/components/Petals/FinalCTA";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-pearl-white">
      <FloatingPetals />
      <Navbar />
      <main className="relative pt-24">
        <ArtGallery />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
