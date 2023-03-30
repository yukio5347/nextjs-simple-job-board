import { useState, useEffect } from "react";
import Link from 'next/link';
import axios from 'axios'
import Layout from '@/components/Layout';
import { Close, Map, Money } from '@/components/Icons';
import Pagination from '@/components/Pagination';
import Modal from "@/components/Modal";
import JobPosting from '@/models/JobPosting';
import { __, nl2br } from '@/lib/helpers';
import JobPostingItem from "@/components/JobPostingItem";

const Index = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentJob, setCurrentJob] = useState<JobPosting>();
  const [isOpen, setIsOpen] = useState(false);
  const perPage = 20;
  const title = (process.env.NEXT_PUBLIC_JOBS_INDEX_TITLE || '') + (currentPage > 1 ? ' - ' + __('page :page', { page: currentPage }) : '');

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get<JobPosting[]>(`/api/jobs?page=${currentPage}`, {
        headers: { Accept: 'application/json' },
      })
      setJobPostings(res.data)
      setPageCount(Math.ceil(parseInt(res.headers['x-total-count'], 10) / perPage))
    }

    fetchJobs()
  }, [currentPage])

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 0 });
  }

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
      <h1 className="mb-2 font-semibold">{title}</h1>
      {
        jobPostings ? (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              {jobPostings.map((jobPosting: JobPosting) => (
                <JobPostingItem key={jobPosting.id} jobPosting={jobPosting} openModal={openModal} />
              ))}
            </div>
            <Pagination currentPage={currentPage} pageCount={pageCount} handlePageChange={handlePageChange} />

            <Modal show={isOpen} onClose={closeModal}>
              <div className="relative bg-white p-5 md:p-0 md:rounded-lg">
                <button className="absolute top-1 right-1" onClick={closeModal}>
                  <Close />
                </button>
                <div className="flex justify-between pb-5 border-b md:p-7 xl:p-10">
                  <div className="flex-1">
                    <h1 className="text-lg font-semibold leading-tight mb-2">{currentJob?.title}</h1>
                    <p className="text-sky-500 font-semibold mb-3">{currentJob?.companyName}</p>
                    {currentJob?.shortWorkPlace && (
                      <p className="flex items-center text-sm text-gray-500 mb-1 home:lg:text-sm">
                        <Map /> {currentJob?.workPlace}
                      </p>
                    )}
                    {currentJob?.shortSalary && (
                      <p className="flex items-center text-sm text-gray-500 mb-1">
                        <Money /> {currentJob?.salary}
                      </p>
                    )}
                    <div className="mt-3 flex justify-between items-center text-xs">
                      <span className={currentJob?.employmentTypeColor + ' rounded font-medium py-1 px-2'}>
                        {currentJob?.employmentTypeText}
                      </span>
                      <div>{currentJob?.createdAt.replace(/T.*/, '')}</div>
                    </div>
                  </div>
                </div>
                <div className="py-5 border-b md:p-7 xl:p-10">
                  <h4 className="font-semibold mb-2 text-lg md:mb-4">{__('Job Description')}</h4>
                  <p>{currentJob && nl2br(currentJob.description)}</p>
                </div>
                <div className="py-5 border-b md:p-7 xl:p-10">
                  <h4 className="font-semibold mb-2 text-lg md:mb-4">{__('Company Description')}</h4>
                  <p>{currentJob && nl2br(currentJob.companyDescription)}</p>
                </div>
                <div className="pt-3 md:p-7 md:py-4 xl:p-10 text-right">
                  <Link href={`/jobs/${currentJob?.id}/edit`} className="mr-5 text-sm text-sky-600" rel="nofollow">
                    {__('Edit')}
                  </Link>
                  <Link href={`/jobs/${currentJob?.id}/delete`} className="text-sm text-sky-600" rel="nofollow">
                    {__('Delete')}
                  </Link>
                </div>
              </div>
              <div className="sticky bottom-0 py-3 text-center bg-white shadow-[0_-3px_5px_-1px_rgba(0,0,0,0.1)]">
                <Link
                  href={`/jobs/${currentJob?.id}/apply`}
                  className="p-2 w-60 inline-block rounded-md text-center font-semibold bg-orange-500 text-white transition-colors md:py-3 hover:bg-orange-600"
                  rel="nofollow"
                >
                  {__('Apply')}
                </Link>
              </div>
            </Modal>
          </>
        ) : (
          <p>{__('Jobs not found.')}</p>
        )
      }
    </Layout>
  );
}

export default Index;
