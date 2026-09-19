'use client';

import { Toast } from '@base-ui/react/toast';

export type ToastData = {
  className?: string;
  variant?: 'default' | 'destructive';
};

export const toastManager = Toast.createToastManager<ToastData>();
export const useToast = () => Toast.useToastManager<ToastData>();
