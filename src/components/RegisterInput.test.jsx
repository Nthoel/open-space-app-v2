/**
 * test scenario for RegisterInput component
 *
 * - RegisterInput component
 *  - should handle name typing correctly
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should call onRegister function when register button is clicked
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} />);
    const nameInput = screen.getByPlaceholderText('Masukkan nama');

    // Action
    await userEvent.type(nameInput, 'John Doe');

    // Assert
    expect(nameInput.value).toBe('John Doe');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Masukkan email');

    // Action
    await userEvent.type(emailInput, 'john@example.com');

    // Assert
    expect(emailInput.value).toBe('john@example.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput onRegister={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Minimal 6 karakter');

    // Action
    await userEvent.type(passwordInput, 'password123');

    // Assert
    expect(passwordInput.value).toBe('password123');
  });

  it('should call onRegister function when register button is clicked', async () => {
    // Arrange
    const mockOnRegister = vi.fn();
    render(<RegisterInput onRegister={mockOnRegister} />);

    const nameInput = screen.getByPlaceholderText('Masukkan nama');
    const emailInput = screen.getByPlaceholderText('Masukkan email');
    const passwordInput = screen.getByPlaceholderText('Minimal 6 karakter');
    const registerButton = screen.getByRole('button', { name: /daftar/i });

    // Action
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(registerButton);

    // Assert
    expect(mockOnRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
  });
});
