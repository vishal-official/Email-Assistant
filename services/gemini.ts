
import { GoogleGenAI, Type } from "@google/genai";
import { BriefingData, EmailMessage, CalendarEvent, UserPreferences, EmailDraft } from "../types";

// Initialize the Gemini AI client using the provided environment API key
// The key is provided via process.env.API_KEY automatically in this environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are an AI email assistant with access to the user's Gmail, Google Calendar, and Google Drive context.
Your primary role is to act as a proactive, autonomous orchestrator.

Core Behaviors:
1. PROACTIVE BRIEFING: Analyze emails and calendar to find hidden connections.
2. URGENCY DETECTION: Flag items as URGENT only if they have deadlines within 24-48 hours.
3. ACTION EXTRACTION: Identify clear 'Action Required' items.
4. COORDINATION: Detect meeting requests and suggest optimal slots.
5. TONE MATCHING: Mimic provided 'Writing Samples' exactly for greetings, sign-offs, and formality.
6. DESCRIPTION SUMMARIZATION: Extract and summarize meeting descriptions into 1-2 sentences.

Tone: Professional, executive, and proactive.
`;

/**
 * Generates a comprehensive daily briefing.
 * Uses gemini-3-pro-preview for complex reasoning tasks.
 */
export const generateDailyBriefing = async (
  emails: EmailMessage[],
  calendar: CalendarEvent[],
  preferences: UserPreferences
): Promise<BriefingData> => {
  const prompt = `
    Analyze the following raw data and generate a structured daily briefing.
    
    TODAY'S DATE: ${new Date().toLocaleDateString()}
    USER PREFERENCES: ${JSON.stringify(preferences)}
    EMAILS: ${JSON.stringify(emails)}
    CALENDAR: ${JSON.stringify(calendar)}
    
    Task:
    1. Provide a 'summary' of the day.
    2. Extract 'meetings' with 'descriptionSummary' (1-2 sentences).
    3. Identify 'urgentItems' and 'actionRequiredItems'.
    4. Suggest 'pendingCalls' slots.

    Return the result in strictly valid JSON matching the defined schema.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          meetings: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                time: { type: Type.STRING },
                context: { type: Type.STRING },
                agenda: { type: Type.ARRAY, items: { type: Type.STRING } },
                descriptionSummary: { type: Type.STRING },
                preparation: { type: Type.STRING }
              },
              required: ["title", "time", "context", "agenda", "descriptionSummary"]
            }
          },
          urgentItems: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                messageId: { type: Type.STRING },
                title: { type: Type.STRING },
                from: { type: Type.STRING },
                reason: { type: Type.STRING },
                deadline: { type: Type.STRING },
                action: { type: Type.STRING }
              },
              required: ["messageId", "title", "from", "reason", "action"]
            }
          },
          actionRequiredItems: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                messageId: { type: Type.STRING },
                title: { type: Type.STRING },
                from: { type: Type.STRING },
                description: { type: Type.STRING },
                deadline: { type: Type.STRING },
                category: { type: Type.STRING, enum: ['approval', 'question', 'review', 'confirmation', 'other'] }
              },
              required: ["messageId", "title", "from", "description", "category"]
            }
          },
          pendingCalls: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                person: { type: Type.STRING },
                topic: { type: Type.STRING },
                suggestedSlots: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["person", "topic", "suggestedSlots"]
            }
          }
        },
        required: ["summary", "meetings", "urgentItems", "actionRequiredItems", "pendingCalls"]
      }
    }
  });

  return JSON.parse(response.text || '{}') as BriefingData;
};

export const generateEmailDraft = async (
  personName: string,
  slot: string,
  topic: string,
  styleSamples: string[]
): Promise<EmailDraft> => {
  const prompt = `
    Draft a coordination email to ${personName} for "${topic}" at ${slot}.
    Mimic these samples: ${styleSamples.join(' | ')}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          to: { type: Type.STRING },
          subject: { type: Type.STRING },
          body: { type: Type.STRING }
        },
        required: ["to", "subject", "body"]
      }
    }
  });

  const parsed = JSON.parse(response.text || '{}');
  return { ...parsed, personName, slot };
};

export const chatWithAssistant = async (
  message: string,
  history: { role: 'user' | 'model', parts: { text: string }[] }[]
): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    }
  });

  return response.text || "Assistant unavailable.";
};
