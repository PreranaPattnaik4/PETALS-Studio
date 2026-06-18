'use server';
/**
 * @fileOverview Genkit flows for generating specialized PETALS Studio artwork.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// --- Wall Art Flow ---
export async function generateWallArt(): Promise<string> {
  const { media } = await ai.generate({
    model: 'googleai/imagen-4.0-fast-generate-001',
    prompt: `Create a premium fantasy wall art design inspired by PETALS Studio. The artwork should feature a magnificent crystal pink rose glowing with magical light, surrounded by floating crystal petals, sparkles, soft bokeh, and dreamy pastel backgrounds. Use elegant luxury typography with poetic storytelling aesthetics.
    
    Title: "Where Stories Bloom Like Roses"
    Subtitle: "Every petal carries a dream. Every story holds a little magic."
    
    Add subtle decorative floral ornaments, enchanted particles, and a premium gallery-quality composition suitable for framing and printing. Maintain PETALS Studio's signature blush pink, rose gold, ivory, and soft lavender palette.
    
    Style: Luxury fantasy • Storybook elegance • Enchanted kingdom • Fairy-tale inspired • Pinterest-worthy wall decor • Premium art print.`,
  });

  if (!media?.url) throw new Error('Failed to generate wall art image.');
  return media.url;
}

// --- Birthday Card Flow (Fixed Design) ---
export async function generateBirthdayCard(): Promise<string> {
  const { media } = await ai.generate({
    model: 'googleai/imagen-4.0-fast-generate-001',
    prompt: `Create an enchanting fantasy birthday card for PETALS Studio.
    
    Theme: Crystal rose, magical sparkles, glowing petals, fairy-tale atmosphere, elegant pastel pink palette.
    
    Front Text: "Happy Birthday. May your dreams bloom like enchanted roses and your heart be filled with wonder, magic, and joy."
    
    Footer: "PETALS Studio"
    
    Design should feel luxurious, magical, heartwarming, and suitable for children, teens, and adults.
    
    Style: Elegant fantasy illustration • Premium greeting card • Soft blush pink and rose gold accents • Storybook magic.`,
  });

  if (!media?.url) throw new Error('Failed to generate birthday card image.');
  return media.url;
}

// --- Personalized Birthday Card Flow (Image-to-Image) ---
const GeneratePersonalizedCardInputSchema = z.object({
  photoDataUri: z.string().describe("Base64 data URI of the user's photo."),
  name: z.string().describe("The name of the birthday person."),
});
export type GeneratePersonalizedCardInput = z.infer<typeof GeneratePersonalizedCardInputSchema>;

export async function generatePersonalizedBirthdayCard(input: GeneratePersonalizedBirthdayCardInput): Promise<string> {
  const { media } = await ai.generate({
    model: 'googleai/gemini-2.5-flash-image',
    prompt: [
      { media: { url: input.photoDataUri } },
      { text: `Create a personalized fantasy birthday card using the provided photo of the birthday person.
      
      Requirements:
      1. Display the person from the photo inside an elegant magical frame.
      2. Surround the portrait with crystal roses, floating petals, sparkles, stars, butterflies, and dreamy fantasy elements.
      3. Maintain PETALS Studio's signature pastel pink aesthetic.
      4. Keep the photo/person as the main focus.
      
      Front Text: "Happy Birthday, ${input.name}. May your story shine brighter than the stars and bloom more beautifully than the Crystal Rose."
      
      Footer: "Created with Love by PETALS Studio"
      
      Style: Premium personalized greeting card • Fairy-tale elegance • Magical portrait keepsake • Luxury fantasy artwork.` }
    ],
    config: {
      responseModalities: ['TEXT', 'IMAGE'],
    },
  });

  if (!media?.url) throw new Error('Failed to generate personalized birthday card.');
  return media.url;
}
