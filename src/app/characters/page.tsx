
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CharactersPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new home for characters within the Gallery
    router.replace('/gallery');
  }, [router]);

  return (
    <div className="min-h-screen bg-pearl-white flex items-center justify-center">
      <p className="text-rose-pink font-headline italic">Moving to the Gallery...</p>
    </div>
  );
}
