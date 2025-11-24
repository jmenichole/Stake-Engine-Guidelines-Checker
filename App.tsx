/**
 * Copyright (c) 2025 jmenichole
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import GuidelineChecklist from './pages/GuidelineChecklist';
import TermChecker from './pages/TermChecker';
import AssetPreviewer from './pages/AssetPreviewer';
import GameAnalyzer from './pages/GameAnalyzer';
import ProjectValidator from './pages/ProjectValidator';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = React.useState<Page>('home');

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-gray-800/50 rounded-tl-xl">
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route
                  path="/home"
                  element={
                    <div onClick={() => setActivePage('home')}>
                      <Home />
                    </div>
                  }
                />
                <Route
                  path="/validator"
                  element={
                    <div onClick={() => setActivePage('validator')}>
                      <ProjectValidator />
                    </div>
                  }
                />
                <Route
                  path="/checklist"
                  element={
                    <div onClick={() => setActivePage('checklist')}>
                      <GuidelineChecklist />
                    </div>
                  }
                />
                <Route
                  path="/term-checker"
                  element={
                    <div onClick={() => setActivePage('term-checker')}>
                      <TermChecker />
                    </div>
                  }
                />
                <Route
                  path="/asset-previewer"
                  element={
                    <div onClick={() => setActivePage('asset-previewer')}>
                      <AssetPreviewer />
                    </div>
                  }
                />
                <Route
                  path="/game-analyzer"
                  element={
                    <div onClick={() => setActivePage('game-analyzer')}>
                      <GameAnalyzer />
                    </div>
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
