
export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  EXPERT_DIRECTORY = 'EXPERT_DIRECTORY',
  EXPERT_DETAIL = 'EXPERT_DETAIL',
  CALL_REQUEST = 'CALL_REQUEST',
  POINT_CENTER = 'POINT_CENTER',
  QA_CENTER = 'QA_CENTER',
  GROWTH_HUB = 'GROWTH_HUB',
  RESULT_LIBRARY = 'RESULT_LIBRARY'
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  field: string;
  avatar: string;
  score: number;
  rank: number;
  capabilities: { subject: string; value: number; fullMark: number }[];
  growthHistory: { year: string; event: string }[];
  organization: string;
}

export interface Question {
  id: string;
  title: string;
  author: string;
  date: string;
  replies: number;
  isHighQuality: boolean;
}
