
export type Mode = 'survival' | 'creative';

export interface ActionStep {
  title: string;
  description: string;
  icon: string;
}

export interface MindsetResponse {
  survivalPath: ActionStep[];
  creativePath: ActionStep[];
  survivalMotto: string;
  creativeMotto: string;
  survivalFear: string;
  creativeVision: string;
}

export const SCENARIOS = [
  {
    id: 'career',
    label: '💼 職涯抉擇 (Career Move)',
    prompt: 'I want to quit my boring job and start something new.'
  },
  {
    id: 'health',
    label: '🏋️ 健康轉型 (Health Goal)',
    prompt: 'I want to lose 10kg and get fit but I am always tired.'
  },
  {
    id: 'conflict',
    label: '🤝 人際衝突 (Conflict)',
    prompt: 'I had a huge argument with my partner about money.'
  }
];
