import { toast } from 'react-toastify';

const showSuccessToast = (message) => {
  toast.success(message, {
    icon: '🚀',
  });
};

const showErrorToast = (message) => {
  toast.error(message, {
    icon: '❌',
  });
};

const showInfoToast = (message) => {
  toast.info(message, {
    icon: '💡',
  });
};

const showWarningToast = (message) => {
  toast.warn(message, {
    icon: '⚠️',
  });
};

export { showSuccessToast, showErrorToast, showInfoToast, showWarningToast };
