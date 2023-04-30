import { useEffect, useRef } from 'react';

export default function TextInput({
  type = 'text',
  isFocused = false,
  ...props
}: {
  type?: string;
  isFocused?: boolean;
  [key: string]: unknown;
}) {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused) {
      input?.current?.focus();
    }
  }, [isFocused]);

  return (
    <div className='flex flex-col items-start'>
      <input
        type={type}
        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500'
        ref={input}
        {...props}
      />
    </div>
  );
}
