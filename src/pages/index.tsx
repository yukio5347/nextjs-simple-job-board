import Link from 'next/link';
import { useState } from 'react';

import JobPostingItem from '@/components/JobPostingItem';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import { __ } from '@/lib/helpers';
import { useJobList } from '@/lib/swr';
import JobPosting from '@/models/JobPosting';

const Home = () => {
  const [currentJob, setCurrentJob] = useState<JobPosting>();
  const [isOpen, setIsOpen] = useState(false);
  const { jobPostings, error, isLoading } = useJobList();

  const openModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, jobPosting: JobPosting): void => {
    e.preventDefault();
    setCurrentJob(jobPosting);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Layout>
      {error ? (
        <>{error.message}</>
      ) : isLoading ? (
        <div className='flex items-center'>
          <svg
            className='animate-spin mr-2 h-5 w-5 text-gray-500'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          <span className='text-gray-500 text-sm'>Loading...</span>
        </div>
      ) : jobPostings ? (
        <>
          {console.log(jobPostings[0])}
          <div className='grid gap-5 md:grid-cols-2'>
            {jobPostings.map((jobPosting: JobPosting) => (
              <JobPostingItem key={jobPosting.id} jobPosting={jobPosting} openModal={openModal} />
            ))}
            <Modal jobPosting={currentJob} show={isOpen} onClose={closeModal} />
          </div>
          <div className='my-10 text-center'>
            <Link
              href='/jobs'
              className='py-4 px-6 rounded-md bg-sky-500 text-white text-lg font-semibold transition-colors hover:bg-sky-600'
            >
              {__('View All Jobs')}
            </Link>
          </div>
        </>
      ) : (
        <p>{__('Jobs not found.')}</p>
      )}
    </Layout>
  );
};

export default Home;
