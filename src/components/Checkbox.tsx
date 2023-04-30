export default function Checkbox(props: { [key: string]: unknown }) {
  return (
    <input
      type='checkbox'
      className='border-gray-300 rounded shadow-sm focus:border-sky-500 focus:ring-sky-500'
      {...props}
    />
  );
}
