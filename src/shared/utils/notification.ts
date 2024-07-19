import { notifications } from '@mantine/notifications';

const NOTIFICATION_COLOR = {
  success: 'green',
  error: 'red',
  info: 'blue',
  warning: 'yellow'
};

export const notify = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning' = 'success'
) => {
  const color = NOTIFICATION_COLOR[type];

  notifications.show({
    message,
    color,
    autoClose: 3000,
    icon: false
  });
};
