'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate story concepts
 * based on a character name, theme, and desired emotion, aligning with the
 * PETALS brand mission of emotional, gentle fantasy.
 *
 * - generateStoryConcepts - A function that handles the story concept generation process.
 * - GenerateStoryConceptsInput - The input type for the generateStoryConcepts function.
 * - GenerateStoryConceptsOutput - The return type for the generateStoryConcepts function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateStoryConceptsInputSchema = z.object({
  characterName: z.string().describe('The name of the main character for the story concept.'),
  theme: z.string().describe('The overarching theme of the story, e.g., "bravery in a magical forest."'),
  emotion: z.string().describe('The primary emotion the story should evoke, e.g., "comforting," "wonder," or "nostalgia."'),
});
export type GenerateStoryConceptsInput = z.infer<typeof GenerateStoryConceptsInputSchema>;

const StoryConceptSchema = z.object({
  title: z.string().describe('A captivating title for the story concept.'),
  plotOutline: z.string().describe('A brief, emotionally resonant plot outline for the story.'),
});

const GenerateStoryConceptsOutputSchema = z.object({
  storyConcepts: z.array(StoryConceptSchema)
    .min(1)
    .max(5)
    .describe('An array of unique story concepts, each with a title and a brief plot outline.'),
});
export type GenerateStoryConceptsOutput = z.infer<typeof GenerateStoryConceptsOutputSchema>;

export async function generateStoryConcepts(
  input: GenerateStoryConceptsInput
): Promise<GenerateStoryConceptsOutput> {
  return generateStoryConceptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStoryConceptsPrompt',
  input: { schema: GenerateStoryConceptsInputSchema },
  output: { schema: GenerateStoryConceptsOutputSchema },
  prompt: `You are a creative storyteller for PETALS, a premium fantasy media brand. Your mission is to craft emotionally comforting, gentle fantasy story concepts that inspire wonder, imagination, kindness, and emotional growth. The stories should feel calm, inspired, safe, magical, dreamy, and nostalgic, avoiding loud entertainment.

Generate 3 unique story concepts or brief plot outlines based on the following:

Character Name: {{{characterName}}}
Theme: {{{theme}}}
Desired Emotion: {{{emotion}}}

Ensure each concept aligns with PETALS' brand mission. Present your response as a JSON array of objects, where each object has a 'title' and a 'plotOutline'.`,
});

const generateStoryConceptsFlow = ai.defineFlow(
  {
    name: 'generateStoryConceptsFlow',
    inputSchema: GenerateStoryConceptsInputSchema,
    outputSchema: GenerateStoryConceptsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
