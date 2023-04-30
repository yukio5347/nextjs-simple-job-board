import Link from 'next/link';

import { Map, Money } from '@/components/Icons';
import { JobPosting } from '@/models/JobPosting';

export default function JobPostingItem({
  jobPosting,
  openModal,
}: {
  jobPosting: JobPosting;
  openModal?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, jobPosting: JobPosting) => void;
}) {
  return (
    <Link
      href={`/jobs/${jobPosting.id}`}
      onClick={openModal && ((e) => openModal(e, jobPosting))}
      className='flex flex-col justify-between p-4 border rounded-lg transition-colors lg:hover:border-sky-500'
    >
      <div className='flex-1'>
        <h3 className='font-semibold leading-tight mb-1'>{jobPosting.title}</h3>
        <p className='text-sm text-sky-500 font-semibold mb-2'>{jobPosting.companyName}</p>
        {jobPosting.shortWorkPlace && (
          <p className='flex items-center text-xs text-gray-500 mb-1 home:lg:text-sm'>
            <Map /> {jobPosting.shortWorkPlace}
          </p>
        )}
        {jobPosting.shortSalary && (
          <p className='flex items-center text-xs text-gray-500 mb-1'>
            <Money /> {jobPosting.shortSalary}
          </p>
        )}
      </div>
      <div className='mt-3 flex justify-between items-center text-xs'>
        <span className={`${jobPosting.employmentTypeColor} rounded font-medium py-1 px-2`}>
          {jobPosting.employmentTypeText}
        </span>
        <div>{jobPosting.createdAt}</div>
      </div>
    </Link>
  );
}
