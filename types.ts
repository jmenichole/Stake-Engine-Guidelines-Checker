
export type Page = 'checklist' | 'term-checker' | 'asset-previewer' | 'game-analyzer';

export interface ChecklistItem {
  id: string;
  text: string;
  details?: string;
}

export interface GuidelineSection {
  title: string;
  items: ChecklistItem[];
}
