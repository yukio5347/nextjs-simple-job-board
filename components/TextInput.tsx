import { forwardRef, useEffect, useRef } from "react";

const TextInput = (
  {
    type = "text",
    className = "",
    isFocused = false,
    ...props
  }: {
    type?: string;
    className?: string;
    isFocused?: boolean;
    [key: string]: any;
  },
  ref: {
    current: any;
  }
) => {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col items-start">
      <input
        {...props}
        type={type}
        className={`border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 ${className}`}
        ref={input}
      />
    </div>
  );
};

export default forwardRef(TextInput);
