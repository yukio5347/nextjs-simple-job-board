const Select = ({
  options,
  value,
  className = '',
  ...props
}: {
  options: Record<string, string | number>;
  value: string;
  className: string;
  [key: string]: any;
}) => {
  return (
    <div className='flex flex-col items-start'>
      <select
        {...props}
        value={value}
        className={`border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 ${className}`}
      >
        {Object.keys(options).map((option: string, index: number) => (
          <option key={index} value={option}>
            {options[option]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
