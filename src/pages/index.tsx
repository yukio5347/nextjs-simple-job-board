import Link from 'next/link';
import { useState } from 'react';

import JobPostingItem from '@/components/JobPostingItem';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Modal from '@/components/Modal';
import { __ } from '@/lib/helpers';
import { useJobList } from '@/lib/swr';
import { JobPosting } from '@/models/JobPosting';

export default function Home() {
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
        <Loading />
      ) : jobPostings ? (
        <>
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
}
