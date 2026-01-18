/**
 * test scenario for ThreadInput component
 *
 * - ThreadInput component
 *  - should handle title typing correctly
 *  - should handle category typing correctly
 *  - should handle body typing correctly
 *  - should call onAddThread function when submit button is clicked
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadInput from './ThreadInput';

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // Arrange
    render(<ThreadInput onAddThread={() => {}} />);
    const titleInput = screen.getByPlaceholderText(/tulis judul thread/i);

    // Action
    await userEvent.type(titleInput, 'Thread Baru');

    // Assert
    expect(titleInput.value).toBe('Thread Baru');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<ThreadInput onAddThread={() => {}} />);
    const categoryInput = screen.getByPlaceholderText(/contoh: react/i);

    // Action
    await userEvent.type(categoryInput, 'react');

    // Assert
    expect(categoryInput.value).toBe('react');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    render(<ThreadInput onAddThread={() => {}} />);
    const bodyInput = screen.getByPlaceholderText(/tulis isi diskusi/i);

    // Action
    await userEvent.type(bodyInput, 'Ini adalah isi thread');

    // Assert
    expect(bodyInput.value).toBe('Ini adalah isi thread');
  });

  it('should call onAddThread function when submit button is clicked', async () => {
    // Arrange
    const mockOnAddThread = vi.fn();
    render(<ThreadInput onAddThread={mockOnAddThread} />);

    const titleInput = screen.getByPlaceholderText(/tulis judul thread/i);
    const categoryInput = screen.getByPlaceholderText(/contoh: react/i);
    const bodyInput = screen.getByPlaceholderText(/tulis isi diskusi/i);
    const submitButton = screen.getByRole('button', { name: /publikasikan/i });

    // Action
    await userEvent.type(titleInput, 'Thread Baru');
    await userEvent.type(categoryInput, 'react');
    await userEvent.type(bodyInput, 'Ini adalah isi thread');
    await userEvent.click(submitButton);

    // Assert
    expect(mockOnAddThread).toHaveBeenCalledWith({
      title: 'Thread Baru',
      body: 'Ini adalah isi thread',
      category: 'react',
    });
  });
});
