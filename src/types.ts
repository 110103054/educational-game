export interface Option {
  id: string;
  text: string;
  color: string;
  meaning: string;
}

export interface Question {
  id: string;
  description: string;
  correctOptions: string[]; // 選項ID的陣列
}

export interface GameMode {
  type: 'matching' | 'placement';
  name: string;
  description: string;
}

export interface GameState {
  currentMode: GameMode;
  options: Option[];
  questions: Question[];
  currentQuestion: Question | null;
  selectedOptions: string[];
  matchedPairs: Array<{ optionId: string; meaning: string }>;
  score: number;
  isGameComplete: boolean;
} 