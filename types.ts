/**
 * Copyright (c) 2025 jmenichole
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
