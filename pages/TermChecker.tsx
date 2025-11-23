/**
 * Copyright (c) 2025 jmenichole
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useMemo } from 'react';
import DOMPurify from 'dompurify';
import { PROHIBITED_TERMS } from '../constants/prohibitedTerms';

const TermChecker: React.FC = () => {
  const [text, setText] = useState('');

  const analysis = useMemo(() => {
    if (!text) {
      return { highlightedText: '', foundTerms: [] };
    }

    const foundTerms: { term: string; replacement: string }[] = [];
    const termsRegex = new RegExp(`\\b(${Object.keys(PROHIBITED_TERMS).join('|')})\\b`, 'gi');

    const highlightedText = text.replace(termsRegex, (match) => {
      const lowerMatch = match.toLowerCase();
      if (PROHIBITED_TERMS[lowerMatch]) {
        if (!foundTerms.some((t) => t.term.toLowerCase() === lowerMatch)) {
          foundTerms.push({ term: match, replacement: PROHIBITED_TERMS[lowerMatch] });
        }
        return `<mark class="bg-yellow-400/30 text-yellow-200 px-1 rounded">${match}</mark>`;
      }
      return match;
    });

    return { highlightedText, foundTerms: foundTerms.sort((a, b) => a.term.localeCompare(b.term)) };
  }, [text]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
          Prohibited Term Checker
        </h1>
        <p className="text-lg text-gray-400">
          Paste your game's text to check for terms restricted under Jurisdiction Requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your game rules, UI text, or descriptions here..."
            className="w-full h-96 p-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-gray-200 resize-none"
          />
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Analysis Results</h3>
          {analysis.foundTerms.length > 0 ? (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {analysis.foundTerms.map(({ term, replacement }, index) => (
                <div key={index} className="p-3 bg-gray-700/50 rounded-md">
                  <p className="font-semibold text-yellow-300">
                    Found:{' '}
                    <span className="font-mono bg-gray-900 px-1.5 py-0.5 rounded text-sm">
                      {term}
                    </span>
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    Suggestion: <span className="font-semibold text-green-400">{replacement}</span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">No prohibited terms found.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Live Preview</h3>
        <div
          className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              analysis.highlightedText ||
                '<p class="text-gray-500">Your text with highlighted terms will appear here...</p>'
            ),
          }}
        />
      </div>
    </div>
  );
};

export default TermChecker;
