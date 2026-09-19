'use client';

import {
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast/toast';
import { toastManager, useToast } from '@/components/ui/toast/use-toast';

function ToastList() {
  const { toasts } = useToast();

  return (
    <ToastPortal>
      <ToastViewport>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            swipeDirection='right'
            className={toast.data?.className}
            variant={toast.data?.variant}
          >
            <ToastContent className='flex w-full items-center justify-between space-x-4'>
              <div className='grid gap-1'>
                {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
                {toast.description && (
                  <ToastDescription>{toast.description}</ToastDescription>
                )}
              </div>
              {toast.actionProps && <ToastAction {...toast.actionProps} />}
              <ToastClose />
            </ToastContent>
          </Toast>
        ))}
      </ToastViewport>
    </ToastPortal>
  );
}

export function Toaster() {
  return (
    <ToastProvider toastManager={toastManager} limit={1}>
      <ToastList />
    </ToastProvider>
  );
}
