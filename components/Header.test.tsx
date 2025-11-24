/**
 * Copyright (c) 2025 jmenichole
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('renders the application title', () => {
    render(<Header />);
    expect(screen.getByText('Stake Engine Guideline Checker')).toBeInTheDocument();
  });

  it('renders the header element', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('displays the checkmark icon', () => {
    const { container } = render(<Header />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
