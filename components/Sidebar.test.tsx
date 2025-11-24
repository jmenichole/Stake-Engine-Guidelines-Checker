/**
 * Copyright (c) 2025 jmenichole
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Page } from '../types';

const MockSidebar = ({ activePage }: { activePage: Page }) => (
  <BrowserRouter>
    <Sidebar activePage={activePage} setActivePage={() => {}} />
  </BrowserRouter>
);

describe('Sidebar Component', () => {
  it('renders Project Validator link', () => {
    render(<MockSidebar activePage="validator" />);
    expect(screen.getByText('Project Validator')).toBeInTheDocument();
  });

  it('renders Guideline Checklist link', () => {
    render(<MockSidebar activePage="checklist" />);
    expect(screen.getByText('Guideline Checklist')).toBeInTheDocument();
  });

  it('renders Prohibited Terms link', () => {
    render(<MockSidebar activePage="term-checker" />);
    expect(screen.getByText('Prohibited Terms')).toBeInTheDocument();
  });

  it('renders Asset Previewer link', () => {
    render(<MockSidebar activePage="asset-previewer" />);
    expect(screen.getByText('Asset Previewer')).toBeInTheDocument();
  });

  it('renders AI Game Analyzer link', () => {
    render(<MockSidebar activePage="game-analyzer" />);
    expect(screen.getByText('AI Game Analyzer')).toBeInTheDocument();
  });

  it('highlights active page', () => {
    render(<MockSidebar activePage="validator" />);
    const activeButton = screen.getByText('Project Validator').closest('button');
    expect(activeButton).toHaveClass('bg-cyan-500/10');
  });
});
