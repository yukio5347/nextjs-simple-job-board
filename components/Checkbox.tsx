const Checkbox = ({ className = '', ...props }: { className?: string; [key: string]: any; }) => {
  return (
    <input
      {...props}
      type="checkbox"
      className={`border-gray-300 rounded shadow-sm focus:border-sky-500 focus:ring-sky-500 ${className}`}
    />
  );
};

export default Checkbox;
