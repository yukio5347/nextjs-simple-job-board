import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import Layout from '@/components/Layout';
import JobPostingItem from '@/components/JobPostingItem';
import Modal from '@/components/Modal';
import JobPosting from '@/models/JobPosting';
import { where, orderBy } from '@/lib/queries';
import { __ } from '@/lib/helpers';

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();
  const params = await prisma.jobPosting.findMany({
    where,
    orderBy,
    take: 20,
  });
  const jobPostings = JSON.parse(JSON.stringify(params.map((param) => new JobPosting(param))));

  return {
    props: { jobPostings },
  };
};

const Home = ({ jobPostings }: { jobPostings: JobPosting[] }) => {
  const [currentJob, setCurrentJob] = useState<JobPosting>();
  const [isOpen, setIsOpen] = useState(false);

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
      {jobPostings ? (
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
};

export default Home;
