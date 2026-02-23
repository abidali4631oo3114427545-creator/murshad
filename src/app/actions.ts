'use server';

import { proactiveTrendInsights, ProactiveTrendInsightsInput } from '@/ai/flows/proactive-trend-insights';

export async function getAITrendInsights(input: ProactiveTrendInsightsInput) {
  try {
    const result = await proactiveTrendInsights(input);
    return result;
  } catch (error) {
    console.error('Failed to fetch AI insights:', error);
    return { trends: [] };
  }
}