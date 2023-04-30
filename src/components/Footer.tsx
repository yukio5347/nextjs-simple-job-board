import Link from 'next/link';

import { __ } from '@/lib/helpers';

const Footer = () => {
  return (
    <footer className='bg-slate-800'>
      <div className='grid grid-cols-2 gap-5 py-5 text-center md:grid-cols-4 md:container'>
        <div>
          <Link href='/' className='text-sm text-center text-white'>
            {__('Home')}
          </Link>
        </div>
        <div>
          <Link href='/jobs' className='text-sm text-center text-white'>
            {__('Find Jobs')}
          </Link>
        </div>
        <div>
          <Link href='/jobs/new' className='text-sm text-center text-white'>
            {__('Post a Job')}
          </Link>
        </div>
        <div>
          <Link href='/contact' className='text-sm text-center text-white'>
            {__('Contact Us')}
          </Link>
        </div>
      </div>
      <p className='py-3 text-xs text-white text-center border-t border-slate-500'>
        © {process.env.NEXT_PUBLIC_APP_NAME}
      </p>
    </footer>
  );
};

export default Footer;
