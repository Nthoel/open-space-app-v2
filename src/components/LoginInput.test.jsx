/**
 * test scenario for LoginInput component
 *
 * - LoginInput component
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should call onLogin function when login button is clicked
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<LoginInput onLogin={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Masukkan email');

    // Action
    await userEvent.type(emailInput, 'john@example.com');

    // Assert
    expect(emailInput.value).toBe('john@example.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<LoginInput onLogin={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Masukkan password');

    // Action
    await userEvent.type(passwordInput, 'password123');

    // Assert
    expect(passwordInput.value).toBe('password123');
  });

  it('should call onLogin function when login button is clicked', async () => {
    // Arrange
    const mockOnLogin = vi.fn();
    render(<LoginInput onLogin={mockOnLogin} />);

    const emailInput = screen.getByPlaceholderText('Masukkan email');
    const passwordInput = screen.getByPlaceholderText('Masukkan password');
    const loginButton = screen.getByRole('button', { name: /masuk/i });

    // Action
    await userEvent.type(emailInput, 'wowo@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    // Assert
    expect(mockOnLogin).toHaveBeenCalledWith({
      email: 'wowo@example.com',
      password: 'password123',
    });
  });
});
