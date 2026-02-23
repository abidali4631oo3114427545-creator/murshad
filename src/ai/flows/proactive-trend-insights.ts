'use server';
/**
 * @fileOverview This file implements a Genkit flow to identify and summarize emerging trends
 * in user interactions and content performance data.
 *
 * - proactiveTrendInsights - A function that handles the trend identification process.
 * - ProactiveTrendInsightsInput - The input type for the proactiveTrendInsights function.
 * - ProactiveTrendInsightsOutput - The return type for the proactiveTrendInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProactiveTrendInsightsInputSchema = z.object({
  userInteractions: z
    .string()
    .describe(
      'A summary or raw data representing recent user interactions (e.g., clicks, sessions, active users over time).'
    ),
  contentPerformance: z
    .string()
    .describe(
      'A summary or raw data representing recent content performance (e.g., views, engagement rates, popular content).'
    ),
  timeframe: z
    .string()
    .describe('The time period for which trends should be identified (e.g., "last 24 hours", "past week").'),
});
export type ProactiveTrendInsightsInput = z.infer<
  typeof ProactiveTrendInsightsInputSchema
>;

const ProactiveTrendInsightsOutputSchema = z.object({
  trends: z
    .array(
      z.object({
        description: z
          .string()
          .describe('A clear description of the identified trend.'),
        impact: z
          .string()
          .describe(
            'The potential impact or significance of this trend (e.g., "Increased user engagement", "Declining interest in topic X").'
          ),
      })
    )
    .describe('A list of identified emerging trends.'),
});
export type ProactiveTrendInsightsOutput = z.infer<
  typeof ProactiveTrendInsightsOutputSchema
>;

export async function proactiveTrendInsights(
  input: ProactiveTrendInsightsInput
): Promise<ProactiveTrendInsightsOutput> {
  return proactiveTrendInsightsFlow(input);
}

const proactiveTrendInsightsPrompt = ai.definePrompt({
  name: 'proactiveTrendInsightsPrompt',
  input: {schema: ProactiveTrendInsightsInputSchema},
  output: {schema: ProactiveTrendInsightsOutputSchema},
  prompt: `You are an expert data analyst. Your task is to identify and summarize emerging trends from the provided user interaction and content performance data for the {{{timeframe}}}.

Analyze the data and highlight any significant shifts, patterns, or anomalies that indicate new trends. For each trend, provide a concise description and its potential impact.

User Interactions Data:
---
{{{userInteractions}}}
---

Content Performance Data:
---
{{{contentPerformance}}}
---

Identify at least 1-3 significant emerging trends. If no significant trends are detected, state that clearly.`,
});

const proactiveTrendInsightsFlow = ai.defineFlow(
  {
    name: 'proactiveTrendInsightsFlow',
    inputSchema: ProactiveTrendInsightsInputSchema,
    outputSchema: ProactiveTrendInsightsOutputSchema,
  },
  async (input) => {
    const {output} = await proactiveTrendInsightsPrompt(input);
    return output!;
  }
);
