import LoginInput from './LoginInput';

export default {
  title: 'Components/LoginInput',
  component: LoginInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onLogin: { action: 'login clicked' },
  },
};

export const Default = {
  args: {
    onLogin: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: '400px', 
        padding: '24px', 
        backgroundColor: '#1a1a2e', 
        borderRadius: '16px' 
      }}>
        <Story />
      </div>
    ),
  ],
};

export const WithDarkBackground = {
  args: {
    onLogin: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: '400px', 
        padding: '32px', 
        backgroundColor: '#0f0f23', 
        borderRadius: '20px',
        border: '1px solid #333'
      }}>
        <h2 style={{ color: '#fff', marginBottom: '20px', textAlign: 'center' }}>
          🚀 Login
        </h2>
        <Story />
      </div>
    ),
  ],
};
