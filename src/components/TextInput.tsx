import { useEffect, useRef } from "react";

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
  }
) => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused) {
      input?.current?.focus();
    }
  }, [isFocused]);

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

export default TextInput;
