/**
 * Copyright (c) 2025 jmenichole
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../types';
import { Icon } from './Icon';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const navigate = useNavigate();

  const navItems: { id: Page; name: string; icon: React.ReactNode; path: string }[] = [
    {
      id: 'validator',
      name: 'Project Validator',
      icon: <Icon name="document-search" />,
      path: '/validator',
    },
    {
      id: 'checklist',
      name: 'Guideline Checklist',
      icon: <Icon name="checklist" />,
      path: '/checklist',
    },
    {
      id: 'term-checker',
      name: 'Prohibited Terms',
      icon: <Icon name="search" />,
      path: '/term-checker',
    },
    {
      id: 'asset-previewer',
      name: 'Asset Previewer',
      icon: <Icon name="image" />,
      path: '/asset-previewer',
    },
    {
      id: 'game-analyzer',
      name: 'AI Game Analyzer',
      icon: <Icon name="sparkles" />,
      path: '/game-analyzer',
    },
  ];

  const handleNavigation = (item: (typeof navItems)[0]) => {
    setActivePage(item.id);
    navigate(item.path);
  };

  return (
    <nav className="w-64 p-4 bg-gray-900 border-r border-gray-700/50">
      <div className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
              activePage === item.id
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
            }`}
            aria-label={`Navigate to ${item.name}`}
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
