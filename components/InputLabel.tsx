const InputLabel = ({
  value = '',
  className = '',
  children,
  isRequired = false,
  ...props
}: {
  value?: string;
  className?: string;
  isRequired?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  className += isRequired ? ' after:content-["_*"] after:text-red-600' : '';
  return (
    <label {...props} className={`block text-sm font-medium ${className}`}>
      {value ? value : children}
    </label>
  );
};

export default InputLabel;
