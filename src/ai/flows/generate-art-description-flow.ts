'use server';
/**
 * @fileOverview A Genkit flow for generating poetic and emotionally resonant art descriptions.
 *
 * - generateArtDescription - A function that generates a description or lore snippet for an art piece.
 * - GenerateArtDescriptionInput - The input type for the generateArtDescription function.
 * - GenerateArtDescriptionOutput - The return type for the generateArtDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArtDescriptionInputSchema = z.object({
  keywordsOrConcept: z
    .string()
    .describe(
      'Keywords or a brief concept for an art piece (e.g., "crystal castle", "serene mermaid", "moonlit garden").'
    ),
});
export type GenerateArtDescriptionInput = z.infer<
  typeof GenerateArtDescriptionInputSchema
>;

const GenerateArtDescriptionOutputSchema = z
  .string()
  .describe('A unique, poetic, and emotionally resonant description or short lore snippet for the art piece.');
export type GenerateArtDescriptionOutput = z.infer<
  typeof GenerateArtDescriptionOutputSchema
>;

export async function generateArtDescription(
  input: GenerateArtDescriptionInput
): Promise<GenerateArtDescriptionOutput> {
  return generateArtDescriptionFlow(input);
}

const generateArtDescriptionPrompt = ai.definePrompt({
  name: 'generateArtDescriptionPrompt',
  input: {schema: GenerateArtDescriptionInputSchema},
  output: {schema: GenerateArtDescriptionOutputSchema},
  prompt: `You are a master storyteller and poet for PETALS, a premium fantasy media studio.
Your task is to craft unique, poetic, and emotionally resonant descriptions or short lore snippets for art pieces.
These descriptions should evoke feelings of calm, wonder, magic, and nostalgia, aligning with PETALS' brand of 'Stories That Bloom With Emotion'.
Use rich, imaginative language, drawing inspiration from Studio Ghibli, Pixar, Disney storybooks, and luxury art galleries.
The output should be a single, beautiful paragraph, rich in imagery and emotion.

Here are the keywords or concept for the art piece: {{{keywordsOrConcept}}}`,
});

const generateArtDescriptionFlow = ai.defineFlow(
  {
    name: 'generateArtDescriptionFlow',
    inputSchema: GenerateArtDescriptionInputSchema,
    outputSchema: GenerateArtDescriptionOutputSchema,
  },
  async (input) => {
    const {output} = await generateArtDescriptionPrompt(input);
    return output!;
  }
);
