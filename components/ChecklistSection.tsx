
import React, { useState, useCallback, useMemo } from 'react';
import { GuidelineSection } from '../types';
import ChecklistItemComponent from './ChecklistItem';
import { getGuidelineClarification } from '../services/geminiService';
import { Icon } from './Icon';

interface ChecklistSectionProps {
  section: GuidelineSection;
  checkedItems: Set<string>;
  onToggleItem: (id: string) => void;
}

const ChecklistSection: React.FC<ChecklistSectionProps> = ({ section, checkedItems, onToggleItem }) => {
  const [isClarifying, setIsClarifying] = useState(false);
  const [clarification, setClarification] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClarify = useCallback(async () => {
    setIsClarifying(true);
    setClarification(null);
    setError(null);
    try {
      const sectionText = `${section.title}\n\n${section.items.map(item => `- ${item.text}`).join('\n')}`;
      const result = await getGuidelineClarification(sectionText);
      setClarification(result);
    } catch (e) {
      setError('Failed to get clarification from AI. Please try again.');
      console.error(e);
    } finally {
      setIsClarifying(false);
    }
  }, [section]);

  const progress = useMemo(() => {
    const checkedInSection = section.items.filter(item => checkedItems.has(item.id)).length;
    return section.items.length > 0 ? (checkedInSection / section.items.length) * 100 : 0;
  }, [section.items, checkedItems]);

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
        <button
            onClick={handleClarify}
            disabled={isClarifying}
            className="flex items-center px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-500/10 rounded-md hover:bg-cyan-500/20 transition-colors disabled:opacity-50 disabled:cursor-wait"
        >
            <Icon name="sparkles" className="w-4 h-4 mr-2" />
            {isClarifying ? 'Thinking...' : 'Clarify with AI'}
        </button>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-1.5 mb-4">
        <div className="bg-cyan-400 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>

      {isClarifying && <div className="text-center text-gray-400 p-4">Getting clarification...</div>}
      {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-md mb-4">{error}</div>}
      {clarification && (
        <div className="bg-gray-700/50 p-4 rounded-md mb-4 prose prose-invert prose-sm max-w-none text-gray-300">
           <p dangerouslySetInnerHTML={{ __html: clarification.replace(/\n/g, '<br />') }} />
        </div>
      )}

      <div className="space-y-3">
        {section.items.map((item) => (
          <ChecklistItemComponent
            key={item.id}
            item={item}
            isChecked={checkedItems.has(item.id)}
            onToggle={() => onToggleItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChecklistSection;
