import { useEffect, useRef } from 'react';

export default function Textarea({ isFocused = false, ...props }: { isFocused?: boolean; [key: string]: unknown }) {
  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isFocused) {
      textarea?.current?.focus();
    }
  }, [isFocused]);

  return (
    <div className='flex flex-col items-start'>
      <textarea
        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500'
        ref={textarea}
        {...props}
      />
    </div>
  );
}
