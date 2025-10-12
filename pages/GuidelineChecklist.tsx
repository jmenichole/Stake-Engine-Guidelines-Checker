/**
 * Copyright (c) 2025 jmenichole
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useCallback, useMemo } from 'react';
import ChecklistSection from '../components/ChecklistSection';
import { GUIDELINE_SECTIONS } from '../constants/guidelines';

const GuidelineChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => new Set());

  const handleToggleItem = useCallback((id: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const totalItems = useMemo(() => GUIDELINE_SECTIONS.reduce((acc, section) => acc + section.items.length, 0), []);
  const overallProgress = totalItems > 0 ? (checkedItems.size / totalItems) * 100 : 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
          Submission Guideline Checklist
        </h1>
        <p className="text-lg text-gray-400">
          Track your progress to ensure your game meets all of Stake Engine's submission requirements.
        </p>

        <div className="mt-6">
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-cyan-400">Overall Progress</span>
                <span className="text-sm font-medium text-cyan-400">{Math.round(overallProgress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${overallProgress}%` }}></div>
            </div>
        </div>
      </div>

      {GUIDELINE_SECTIONS.map((section) => (
        <ChecklistSection
          key={section.title}
          section={section}
          checkedItems={checkedItems}
          onToggleItem={handleToggleItem}
        />
      ))}
    </div>
  );
};

export default GuidelineChecklist;
