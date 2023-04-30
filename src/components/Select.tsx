export default function Select({
  options,
  value,
  ...props
}: {
  options: Record<string, string | number>;
  value: string;
  [key: string]: unknown;
}) {
  return (
    <div className='flex flex-col items-start'>
      <select
        value={value}
        className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500'
        {...props}
      >
        {Object.keys(options).map((option: string, index: number) => (
          <option key={index} value={option}>
            {options[option]}
          </option>
        ))}
      </select>
    </div>
  );
}
