/**
 * Copyright (c) 2025 jmenichole
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ChecklistItemComponent from './ChecklistItem';

describe('ChecklistItem Component', () => {
  const mockItem = {
    id: 'test-1',
    text: 'Test checklist item',
    details: 'Test details',
  };

  it('renders item text', () => {
    render(<ChecklistItemComponent item={mockItem} isChecked={false} onToggle={() => {}} />);
    expect(screen.getByText('Test checklist item')).toBeInTheDocument();
  });

  it('renders item details when provided', () => {
    render(<ChecklistItemComponent item={mockItem} isChecked={false} onToggle={() => {}} />);
    expect(screen.getByText('Test details')).toBeInTheDocument();
  });

  it('calls onToggle when clicked', () => {
    const onToggle = vi.fn();
    render(<ChecklistItemComponent item={mockItem} isChecked={false} onToggle={onToggle} />);

    const label = screen.getByText('Test checklist item').closest('label');
    if (label) fireEvent.click(label);

    expect(onToggle).toHaveBeenCalled();
  });

  it('shows checked state', () => {
    const { container } = render(
      <ChecklistItemComponent item={mockItem} isChecked={true} onToggle={() => {}} />
    );
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeChecked();
  });

  it('shows unchecked state', () => {
    const { container } = render(
      <ChecklistItemComponent item={mockItem} isChecked={false} onToggle={() => {}} />
    );
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).not.toBeChecked();
  });
});
