import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import Modal from '@/components/Modal';
import JobPosting from '@/models/JobPosting';
import { __ } from '@/lib/helpers';
import JobPostingItem from '@/components/JobPostingItem';

const Index = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentJob, setCurrentJob] = useState<JobPosting>();
  const [isOpen, setIsOpen] = useState(false);
  const perPage = 20;
  const title =
    (process.env.NEXT_PUBLIC_JOBS_INDEX_TITLE || '') +
    (currentPage > 1 ? ' - ' + __('page :page', { page: currentPage }) : '');

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get<JobPosting[]>(`/api/jobs?page=${currentPage}`, {
        headers: { Accept: 'application/json' },
      });
      setJobPostings(res.data);
      setPageCount(Math.ceil(parseInt(res.headers['x-total-count'], 10) / perPage));
    };

    fetchJobs();
  }, [currentPage]);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 0 });
  };

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
      <h1 className='mb-2 font-semibold'>{title}</h1>
      {jobPostings ? (
        <>
          <div className='grid gap-5 md:grid-cols-2'>
            {jobPostings.map((jobPosting: JobPosting) => (
              <JobPostingItem key={jobPosting.id} jobPosting={jobPosting} openModal={openModal} />
            ))}
          </div>
          <Pagination currentPage={currentPage} pageCount={pageCount} handlePageChange={handlePageChange} />
          <Modal jobPosting={currentJob} show={isOpen} onClose={closeModal} />
        </>
      ) : (
        <p>{__('Jobs not found.')}</p>
      )}
    </Layout>
  );
};

export default Index;
