import { Spin } from '@/components/Icons';

export default function Loading() {
  return (
    <div className='flex items-center text-gray-500'>
      <Spin className='mr-2' />
      <span className='text-sm'>Loading...</span>
    </div>
  );
}
