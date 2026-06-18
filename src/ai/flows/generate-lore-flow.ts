'use server';
/**
 * @fileOverview A Genkit flow for generating poetic fantasy lore.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateLoreInputSchema = z.object({
  concept: z.string().describe('A brief idea, keywords, or concept for a fantasy story.'),
});
export type GenerateLoreInput = z.infer<typeof GenerateLoreInputSchema>;

const GenerateLoreOutputSchema = z.object({
  title: z.string().describe('A captivating, poetic title for the lore.'),
  content: z.string().describe('A beautifully written, emotionally resonant short story or lore snippet.'),
});
export type GenerateLoreOutput = z.infer<typeof GenerateLoreOutputSchema>;

export async function generateLore(input: GenerateLoreInput): Promise<GenerateLoreOutput> {
  return generateLoreFlow(input);
}

const lorePrompt = ai.definePrompt({
  name: 'lorePrompt',
  input: { schema: GenerateLoreInputSchema },
  output: { schema: GenerateLoreOutputSchema },
  prompt: `You are the master Lore-Weaver for PETALS, a premium fantasy media studio.
Your mission is to craft emotionally comforting, gentle fantasy stories that inspire wonder and magic.

Based on the following concept, weave a beautiful, short story and a matching title:
Concept: {{{concept}}}

The story should feel calm, magical, and nostalgic. Avoid dark themes or loud action. Focus on beauty, growth, and the quiet wonders of the PETALS universe.`,
});

const generateLoreFlow = ai.defineFlow(
  {
    name: 'generateLoreFlow',
    inputSchema: GenerateLoreInputSchema,
    outputSchema: GenerateLoreOutputSchema,
  },
  async (input) => {
    const { output } = await lorePrompt(input);
    return output!;
  }
);
