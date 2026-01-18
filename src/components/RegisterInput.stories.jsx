import RegisterInput from './RegisterInput';

export default {
  title: 'Components/RegisterInput',
  component: RegisterInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onRegister: { action: 'register clicked' },
  },
};

export const Default = {
  args: {
    onRegister: () => {},
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

export const WithHeader = {
  args: {
    onRegister: () => {},
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
          🚀 Register
        </h2>
        <Story />
      </div>
    ),
  ],
};
