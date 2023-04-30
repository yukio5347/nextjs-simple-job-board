import { createContext, useContext, useEffect, useState } from 'react';

type AlertType = 'success' | 'info' | 'warning' | 'error';

type AlertContextType = {
  type: AlertType;
  message: string;
  showAlert: (type: AlertType, message: string) => void;
};

export const AlertContext = createContext<AlertContextType>({
  type: 'info',
  message: '',
  showAlert: () => undefined,
});

export const useAlertContext = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<AlertType>('info');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (message && type !== 'warning' && type !== 'error') {
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const showAlert = (type: AlertType, message: string): void => {
    setType(type);
    setMessage(message);
  };

  return (
    <AlertContext.Provider value={{ type, message, showAlert }}>
      {message && (
        <div className={`alert-${type} fixed top-5 right-5 z-10 p-4 mb-5 w-80 rounded-r-lg border-l-4`} role='alert'>
          <p>{message}</p>
          <button onClick={() => setMessage('')} className='absolute top-0 bottom-0 right-0 p-4'>
            <svg className='fill-current h-6 w-6' role='button' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <title>Close</title>
              <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
            </svg>
          </button>
        </div>
      )}
      {children}
    </AlertContext.Provider>
  );
};
