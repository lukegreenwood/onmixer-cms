'use client';

import { Alert, AlertProps } from '@soundwaves/components';
import { ExternalToast, toast as sonnerToast } from 'sonner';

export const toast = (
  message: React.ReactNode,
  color: AlertProps['color'] = 'gray',
  data?: ExternalToast,
) => {
  return sonnerToast.custom(
    () => (
      <Alert variant="expanded" color={color}>
        {message}
      </Alert>
    ),
    data,
  );
};
