
"use client";

import { Navbar } from "@/components/Petals/Navbar";
import { Footer } from "@/components/Petals/Footer";
import { ArtGallery } from "@/components/Petals/ArtGallery";
import { FloatingPetals } from "@/components/Petals/FloatingPetals";
import { SidebarNav } from "@/components/Petals/SidebarNav";

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen bg-pearl-white">
      <SidebarNav />
      <main className="flex-1 ml-64 relative">
        <FloatingPetals />
        <Navbar />
        <div className="pt-24">
          <ArtGallery />
        </div>
        <Footer />
      </main>
    </div>
  );
}
