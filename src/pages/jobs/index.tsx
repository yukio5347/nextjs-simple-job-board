import { useRouter } from 'next/router';
import { useState } from 'react';

import JobPostingItem from '@/components/JobPostingItem';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Modal from '@/components/Modal';
import Pagination from '@/components/Pagination';
import { __ } from '@/lib/helpers';
import { useJobList, usePageCount } from '@/lib/swr';
import { JobPosting } from '@/models/JobPosting';

const Index = () => {
  const [currentJob, setCurrentJob] = useState<JobPosting>();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;
  const { jobPostings, error, isLoading } = useJobList(currentPage);
  const { pageCount } = usePageCount();
  const title = (process.env.NEXT_PUBLIC_JOBS_INDEX_TITLE || '') + ' - ' + __('page :page', { page: currentPage });

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
      <h1 className='mb-3 font-semibold'>{title}</h1>
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
          </div>
          <Pagination currentPage={currentPage} pageCount={pageCount} />
          <Modal jobPosting={currentJob} show={isOpen} onClose={closeModal} />
        </>
      ) : (
        <p>{__('Jobs not found.')}</p>
      )}
    </Layout>
  );
};

export default Index;
