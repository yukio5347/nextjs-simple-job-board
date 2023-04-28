import Link from 'next/link';

import { __ } from '@/lib/helpers';

const Pagination = ({ currentPage, pageCount }: { currentPage: number; pageCount: number }): JSX.Element => {
  const className = 'mr-2 mb-2 px-4 py-3 text-sm border rounded transition-colors hover:border-sky-500';
  const links = [];

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
        });
      }
    }
  } else {
    if (currentPage > 1) {
      links.push({
        page: 1,
      });
    }
    if (currentPage > 3) {
      links.push({
        key: 'dot1',
        dot: true,
      });
    }
    if (currentPage > 2) {
      links.push({
        page: currentPage - 1,
      });
    }
    links.push({
      page: currentPage,
      active: true,
    });
    if (currentPage < pageCount - 1) {
      links.push({
        page: currentPage + 1,
      });
    }
    if (currentPage < pageCount - 2) {
      links.push({
        key: 'dot2',
        dot: true,
      });
    }
    if (currentPage < pageCount) {
      links.push({
        page: pageCount,
      });
    }
  }

  return (
    <div className='mb-4'>
      <div className='flex flex-wrap mt-8'>
        {currentPage > 1 && (
          <Link key='Previous' href={`/jobs?page=${currentPage - 1}`} className={className}>
            {__('« Previous')}
          </Link>
        )}
        {links.map((link) =>
          link.active ? (
            <span key={link.page} className={className + ' bg-sky-500 border-sky-500 text-white'}>
              {__(String(link.page))}
            </span>
          ) : link.dot ? (
            <span key={link.key} className='mr-2 mb-2 px-1 py-3'>
              ...
            </span>
          ) : (
            link.page && (
              <Link key={link.page} href={`/jobs?page=${link.page}`} className={className}>
                {__(String(link.page))}
              </Link>
            )
          ),
        )}
        {currentPage < pageCount && (
          <Link key='Next' href={`/jobs?page=${currentPage + 1}`} className={className}>
            {__('Next »')}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
