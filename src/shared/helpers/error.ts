export const defaultErrorMessage = 'Something went wrong. Please try again later.';

export const errorMessage: {
  [key: number]: {
    [key: number]: string;
  };
} = {
  500: {
    100: 'Authentication info is invalid'
  }
};

export const getErrorMessage = ({
  status,
  code
}: {
  status: number | undefined;
  code: number | undefined;
}) => {
  if (!status || !code) return defaultErrorMessage;

  const statusMessage = errorMessage[status];

  if (!statusMessage) return defaultErrorMessage;

  const message = statusMessage[code];

  if (message) {
    return message;
  }

  return defaultErrorMessage;
};
