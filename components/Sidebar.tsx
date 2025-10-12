/**
 * Copyright (c) 2025 jmenichole
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Page } from '../types';
import { Icon } from './Icon';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const navItems: { id: Page; name: string; icon: React.ReactNode }[] = [
    { id: 'checklist', name: 'Guideline Checklist', icon: <Icon name="checklist" /> },
    { id: 'term-checker', name: 'Prohibited Terms', icon: <Icon name="search" /> },
    { id: 'asset-previewer', name: 'Asset Previewer', icon: <Icon name="image" /> },
    { id: 'game-analyzer', name: 'AI Game Analyzer', icon: <Icon name="document-search" /> },
  ];

  return (
    <nav className="w-64 p-4 bg-gray-900 border-r border-gray-700/50">
      <div className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
              activePage === item.id
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
            }`}
          >
            <div className="w-5 h-5 mr-3">{item.icon}</div>
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
