/**
 * Copyright (c) 2025 jmenichole
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GoogleGenAI } from '@google/genai';
import { GUIDELINE_SECTIONS } from '../constants/guidelines';

// SECURITY WARNING: API key is currently exposed in client-side code
// TODO: Move this to a backend API proxy to protect the API key
// See .env.example for recommended implementation approach
const API_KEY = process.env['API_KEY'];

if (!API_KEY) {
  console.warn('API_KEY environment variable not set. AI features will be disabled.');
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getGuidelineClarification = async (guidelineText: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve(
      'AI features are disabled. Please set the API_KEY environment variable.'
    );
  }

  const prompt = `
    As an expert on game submission guidelines, explain the following rule section to a game developer in simple, actionable terms.
    Focus on what the developer needs to DO to comply. Use bullet points or a short paragraph for clarity.

    Guideline Section:
    ---
    ${guidelineText}
    ---

    Simplified Explanation:
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || '';
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to fetch clarification from Gemini API.');
  }
};

export const analyzeGameFile = async (htmlContent: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve(
      'AI features are disabled. Please set the API_KEY environment variable.'
    );
  }
  const allGuidelines = GUIDELINE_SECTIONS.map(
    (section) =>
      `### ${section.title}\n${section.items.map((item) => `- ${item.text} ${item.details ? `(${item.details})` : ''}`).join('\n')}`
  ).join('\n\n');

  const prompt = `
        You are an expert at reviewing web games for compliance with platform guidelines.
        Analyze the following HTML game file against the Stake Engine submission guidelines provided below.
        
        Your analysis should be thorough. Check for the following:
        1.  **Prohibited Terms**: Scan all user-visible text for prohibited terms and suggest alternatives.
        2.  **External Resources**: Identify any loading of external resources (CSS, fonts, scripts, images, audio from other domains). This is strictly prohibited.
        3.  **Statelessness**: Based on the code, determine if the game appears to be stateless (each round is independent).
        4.  **Branding**: Check for any mention of "Stake" branding.
        5.  **Rules & Info**: Verify if game rules, RTP, and max win are communicated to the player.

        Provide your response as a single block of well-formatted HTML. Do not include <html> or <body> tags. Use the following structure and classes for styling:
        - Use '<h3>' with class 'text-xl font-semibold text-cyan-400 mb-3' for section titles.
        - Use '<p>' for paragraphs.
        - Use '<ul>' with class 'list-disc list-inside space-y-2 mb-4' for lists of issues.
        - For code snippets or terms, use '<code>' with class 'bg-gray-700 text-yellow-300 px-1.5 py-0.5 rounded text-sm font-mono'.

        **Submission Guidelines:**
        ---
        ${allGuidelines}
        ---

        **HTML Game File Content:**
        ---
        ${htmlContent}
        ---

        **Compliance Analysis Report (HTML):**
    `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || '';
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to fetch game analysis from Gemini API.');
  }
};
