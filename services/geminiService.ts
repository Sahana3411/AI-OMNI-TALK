import { GoogleGenAI, Type } from "@google/genai";
import { RecognitionMode } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION_BASE = `
You are an expert AI accessibility assistant and translator.
Your goal is to facilitate communication for users with disabilities across ALL languages.

CORE PROTOCOLS:
1. GLOBAL LANGUAGE INPUT: The user may input text, speech, or gestures in ANY language.
2. AUTO-TRANSLATION: You MUST automatically detect the source language based on the user's input and their selected preference.
   - If the input is NOT English, translate it into clear, grammatical English first.
   - If the input IS English, keep it as is.
3. ASL CONVERSION: Convert the final English text into American Sign Language (ASL) Gloss.
   - Use uppercase for gloss (e.g., "HELLO FRIEND").
   - Remove articles (a, an, the) and "to be" verbs (is, are, am).
   - Use Subject-Object-Verb (SOV) or Topic-Comment structure.
   - For proper nouns, fingerprinting is implied, but output the word in gloss (e.g., "NAME-BOB").
`;

/**
 * Analyzes a video frame (image) for gesture recognition.
 */
export const analyzeGesture = async (
  base64Image: string, 
  mode: RecognitionMode,
  language: string = "Auto"
): Promise<string> => {
  try {
    const isWordMode = mode === RecognitionMode.WORD;
    
    // Robust prompt for handling stability and potential partial gestures
    const prompt = isWordMode 
      ? `
        Analyze this image for a hand sign or gesture.
        Context: The user has held this pose, intending to communicate a word.
        User's Language: "${language}".
        
        Instructions:
        1. Identify the specific hand sign (ASL, ISL, or general gesture).
        2. If it is a clear sign, translate it to a single English word.
        3. If the image is blurry, ambiguous, or just a person standing still without a clear sign, return "No gesture detected."
        4. Do not describe the person, only output the MEANING of the sign.
        `
      : `
        Analyze this image for body language or sign language sentences.
        Context: The user is performing a gesture sentence.
        User's Language: "${language}".
        
        Instructions:
        1. Translate the signs/gestures into a natural English sentence.
        2. If the user is just standing/sitting with no clear communicative gesture, return "No gesture detected."
        3. Be robust to lighting and background clutter. Focus on the hands and body pose.
        `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: prompt }
        ]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_BASE,
        maxOutputTokens: isWordMode ? 15 : 60,
        temperature: 0.2, // Lower temperature for more deterministic/stable classification
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for low latency and to support maxOutputTokens
      }
    });

    return response.text || "No gesture detected.";
  } catch (error) {
    console.error("Gesture analysis failed:", error);
    throw error;
  }
};

/**
 * Converts text or image text to ASL-friendly English (Gloss format estimation)
 */
export const processTextForAvatar = async (
  inputText: string, 
  base64Image: string | null,
  mode: RecognitionMode,
  language: string = "Auto"
): Promise<{ original: string, gloss: string }> => {
  try {
    let contents: any[] = [];
    
    if (base64Image) {
      contents.push({ inlineData: { mimeType: 'image/jpeg', data: base64Image } });
      contents.push({ text: `Extract text from this image. The expected language is "${language}" (or auto-detect if Auto). Translate it to English if needed, and then provide the ASL Gloss.` });
    } else {
      contents.push({ text: `Process this input text: "${inputText}". User specified language: "${language}".` });
    }

    contents.push({ 
      text: `
      Task:
      1. Detect the source language of the input text (hint: user selected ${language}).
      2. Translate the input into natural, clear English.
      3. Convert that English into ASL Gloss keywords for an avatar.
      
      Output JSON format: { "english": "Translated English Text", "gloss": "ASL GLOSS TEXT" }
      ` 
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: contents },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_BASE,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            english: { type: Type.STRING },
            gloss: { type: Type.STRING }
          }
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      original: result.english || "Processing error",
      gloss: result.gloss || ""
    };

  } catch (error) {
    console.error("Text processing failed:", error);
    throw error;
  }
};

/**
 * Processes audio input for speech recognition.
 */
export const processSpeech = async (
  audioBase64: string,
  mimeType: string,
  language: string = "Auto"
): Promise<{ text: string, gloss: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType: mimeType, data: audioBase64 } },
          { 
             text: `
             Task:
             1. Listen to the audio. The user specified language is "${language}" (if Auto, detect it).
             2. Transcribe and translate the speech into clear English text.
             3. Convert the English translation into ASL Gloss keywords.
             
             Output JSON format: { "transcription": "English Translation", "gloss": "ASL GLOSS" }
             `
          }
        ]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_BASE,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            transcription: { type: Type.STRING },
            gloss: { type: Type.STRING }
          }
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      text: result.transcription || "Could not hear audio clearly.",
      gloss: result.gloss || ""
    };
  } catch (error) {
    console.error("Speech processing failed:", error);
    throw error;
  }
};