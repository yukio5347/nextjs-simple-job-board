import Link from 'next/link';
import { __ } from '@/lib/helpers';

const Pagination = ({ currentPage, pageCount, handlePageChange }: { currentPage: number; pageCount: number; handlePageChange: (selectedPage: number) => void }): JSX.Element => {
  const className = 'mr-2 mb-2 px-4 py-3 text-sm border rounded transition-colors hover:border-sky-500';
  let links = [];

  if (pageCount <= 1) {
    return <></>;
  } else if (pageCount <= 5) {
    for (let i = 1; i <= pageCount; i++) {
      if (i === currentPage) {
        links.push({
          page: i,
          active: true,
        });
      } else {
        links.push({
          page: i,
          url: `/jobs?page=${i}`,
        });
      }
    }
  }

  return (
    <div className="mb-4">
      <div className="flex flex-wrap mt-8">
        {currentPage > 1 && (
          <Link href={`/jobs?page=${currentPage - 1}`} className={className}>
            {__('« Previous')}
          </Link>
        )}
        {links.map((link, index: number) =>
          link.active ? (
            <span key={index} className={className + ' bg-sky-500 border-sky-500 text-white'}>
              {__(String(link.page))}
            </span>
          ) : (
            link.url && (
              <button key={index} onClick={() => handlePageChange(link.page)} className={className}>
                {__(String(link.page))}
              </button>
            )
          )
        )}
        {currentPage < pageCount && (
          <Link href={`/jobs?page=${currentPage + 1}`} className={className}>
            {__('Next »')}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
