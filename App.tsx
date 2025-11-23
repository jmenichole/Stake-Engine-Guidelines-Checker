/**
 * Copyright (c) 2025 jmenichole
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useCallback } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GuidelineChecklist from './pages/GuidelineChecklist';
import TermChecker from './pages/TermChecker';
import AssetPreviewer from './pages/AssetPreviewer';
import GameAnalyzer from './pages/GameAnalyzer';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('checklist');

  const renderActivePage = useCallback(() => {
    switch (activePage) {
      case 'checklist':
        return <GuidelineChecklist />;
      case 'term-checker':
        return <TermChecker />;
      case 'asset-previewer':
        return <AssetPreviewer />;
      case 'game-analyzer':
        return <GameAnalyzer />;
      default:
        return <GuidelineChecklist />;
    }
  }, [activePage]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
          <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-gray-800/50 rounded-tl-xl">
            {renderActivePage()}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
