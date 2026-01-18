/**
 * test scenario for CommentInput component
 *
 * - CommentInput component
 *  - should handle comment typing correctly
 *  - should call onAddComment function when submit button is clicked
 *  - should clear input after submit
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentInput from './CommentInput';

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle comment typing correctly', async () => {
    // Arrange
    render(<CommentInput onAddComment={() => {}} />);
    const commentInput = screen.getByPlaceholderText(/tulis komentar/i);

    // Action
    await userEvent.type(commentInput, 'Ini adalah komentar saya');

    // Assert
    expect(commentInput.value).toBe('Ini adalah komentar saya');
  });

  it('should call onAddComment function when submit button is clicked', async () => {
    // Arrange
    const mockOnAddComment = vi.fn();
    render(<CommentInput onAddComment={mockOnAddComment} />);

    const commentInput = screen.getByPlaceholderText(/tulis komentar/i);
    const submitButton = screen.getByRole('button', { name: /kirim/i });

    // Action
    await userEvent.type(commentInput, 'Ini adalah komentar saya');
    await userEvent.click(submitButton);

    // Assert
    expect(mockOnAddComment).toHaveBeenCalledWith('Ini adalah komentar saya');
  });

  it('should clear input after submit', async () => {
    // Arrange
    const mockOnAddComment = vi.fn();
    render(<CommentInput onAddComment={mockOnAddComment} />);

    const commentInput = screen.getByPlaceholderText(/tulis komentar/i);
    const submitButton = screen.getByRole('button', { name: /kirim/i });

    // Action
    await userEvent.type(commentInput, 'Ini adalah komentar saya');
    await userEvent.click(submitButton);

    // Assert
    expect(commentInput.value).toBe('');
  });
});
