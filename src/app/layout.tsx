
import type {Metadata} from 'next';
import './globals.css';
import { ScrollToTop } from '@/components/Petals/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'PETALS | Premium Fantasy Storytelling, Illustration & Animation Studio',
  description: 'PETALS creates magical stories, fantasy illustrations, animations, children\'s storybooks, collectible artwork, and immersive fantasy universes where imagination blooms into wonder.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased overflow-x-hidden">
        {children}
        <ScrollToTop />
        <Toaster />
      </body>
    </html>
  );
}
