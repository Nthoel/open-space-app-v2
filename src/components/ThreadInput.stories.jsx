import ThreadInput from './ThreadInput';

export default {
  title: 'Components/ThreadInput',
  component: ThreadInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onAddThread: { action: 'thread submitted' },
  },
};

export const Default = {
  args: {
    onAddThread: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: '500px', 
        padding: '24px', 
        backgroundColor: '#1a1a2e', 
        borderRadius: '16px' 
      }}>
        <Story />
      </div>
    ),
  ],
};

export const WithTitle = {
  args: {
    onAddThread: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ 
        width: '500px', 
        padding: '32px', 
        backgroundColor: '#0f0f23', 
        borderRadius: '20px',
        border: '1px solid #333'
      }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>
          ✨ Buat Thread Baru
        </h2>
        <Story />
      </div>
    ),
  ],
};
