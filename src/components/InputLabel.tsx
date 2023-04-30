export default function InputLabel({
  label = '',
  className = '',
  children,
  isRequired = false,
  ...props
}: {
  label?: string;
  className?: string;
  isRequired?: boolean;
  children?: React.ReactNode;
  [key: string]: unknown;
}) {
  className += isRequired ? ' after:content-["_*"] after:text-red-600' : '';
  return (
    <label {...props} className={`block text-sm font-medium ${className}`}>
      {label ? label : children}
    </label>
  );
}
