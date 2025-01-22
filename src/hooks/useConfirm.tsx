import { useState, useCallback } from 'react';

interface UseConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<UseConfirmOptions | null>(null);
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((options: UseConfirmOptions): Promise<boolean> => {
    setOptions(options);
    setIsOpen(true);
    return new Promise(resolve => {
      setResolve(() => resolve);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (resolve) {
      resolve(true);
      setIsOpen(false);
      setOptions(null);
      setResolve(null);
    }
  }, [resolve]);

  const handleCancel = useCallback(() => {
    if (resolve) {
      resolve(false);
      setIsOpen(false);
      setOptions(null);
      setResolve(null);
    }
  }, [resolve]);

  const ConfirmDialog = useCallback(() => {
    if (!isOpen || !options) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>
          <div className="inline-block transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                {options.title && (
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    {options.title}
                  </h3>
                )}
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {options.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleConfirm}
              >
                {options.confirmText || 'Confirm'}
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={handleCancel}
              >
                {options.cancelText || 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [isOpen, options, handleConfirm, handleCancel]);

  return {
    confirm,
    ConfirmDialog
  };
}