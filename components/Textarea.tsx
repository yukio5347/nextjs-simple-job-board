import { forwardRef, useEffect, useRef } from "react";

const Textarea = (
  {
    className = "",
    isFocused = false,
    ...props
  }: { className?: string; isFocused?: boolean; [key: string]: any; },
  ref: {
    current: any;
  }
) => {
  const textarea = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      textarea.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-start">
      <textarea
        {...props}
        className={`border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 ${className}`}
        ref={textarea}
      />
    </div>
  );
};

export default forwardRef(Textarea);
