export enum AppMode {
  GESTURE = 'gesture',
  TEXT = 'text',
  SPEECH = 'speech',
  WELCOME = 'welcome',
  ABOUT = 'about',
  HELP = 'help',
  CONTACT = 'contact',
  TERMS = 'terms',
  PRIVACY = 'privacy'
}

export interface ProcessingState {
  isProcessing: boolean;
  result: string | null;
  error: string | null;
}

export enum RecognitionMode {
  WORD = 'Word',
  SENTENCE = 'Sentence'
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
}