export interface ExampleWord {
  id: string;
  text: string;
  kind: string;
  isPrimary: boolean;
  displayOrder: number;
  highlightStart: number;
  emoji: string | null;
  imagePath: string | null;
}

export interface Letter {
  id: string;
  upperCase: string;
  lowerCase: string;
  name: string;
  displayOrder: number;
  examples: ExampleWord[];
}
