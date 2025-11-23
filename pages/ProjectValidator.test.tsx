/**
 * Copyright (c) 2025 jmenichole
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectValidator from './ProjectValidator';

describe('ProjectValidator Component', () => {
  it('renders the title', () => {
    render(<ProjectValidator />);
    expect(screen.getByText('Stake Engine Project Validator')).toBeInTheDocument();
  });

  it('renders upload instructions', () => {
    render(<ProjectValidator />);
    expect(screen.getByText(/Upload your game project/i)).toBeInTheDocument();
  });

  it('shows file upload button', () => {
    render(<ProjectValidator />);
    expect(screen.getByText('Upload project ZIP')).toBeInTheDocument();
  });

  it('displays file size limit', () => {
    render(<ProjectValidator />);
    expect(screen.getByText(/ZIP files only, max 50MB/i)).toBeInTheDocument();
  });
});
