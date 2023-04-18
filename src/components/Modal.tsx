import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Close, Map, Money } from '@/components/Icons';
import JobPosting from '@/models/JobPosting';
import { __, nl2br } from '@/lib/helpers';

export default function Modal({
  jobPosting,
  show = false,
  maxWidth = '2xl',
  closeable = true,
  onClose,
}: {
  jobPosting: JobPosting | undefined;
  show?: boolean;
  maxWidth?: string;
  closeable?: boolean;
  onClose: () => void;
}) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };

  const maxWidthClass = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
  }[maxWidth];

  return (
    <Transition show={show} as={Fragment} leave="duration-200">
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 flex overflow-hidden px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
        onClose={close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-slate-800/80" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Dialog.Panel
            className={`fixed top-8 left-0 right-0 max-h-[calc(100vh-4rem)] bg-white rounded-lg overflow-x-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}`}
          >
            <div className="relative bg-white p-5 md:p-0 md:rounded-lg">
              <button className="absolute top-1 right-1" onClick={onClose}>
                <Close />
              </button>
              <div className="flex justify-between pb-5 border-b md:p-7 xl:p-10">
                <div className="flex-1">
                  <h1 className="text-lg font-semibold leading-tight mb-2">{jobPosting?.title}</h1>
                  <p className="text-sky-500 font-semibold mb-3">{jobPosting?.companyName}</p>
                  {jobPosting?.shortWorkPlace && (
                    <p className="flex items-center text-sm text-gray-500 mb-1 home:lg:text-sm">
                      <Map /> {jobPosting?.workPlace}
                    </p>
                  )}
                  {jobPosting?.shortSalary && (
                    <p className="flex items-center text-sm text-gray-500 mb-1">
                      <Money /> {jobPosting?.salary}
                    </p>
                  )}
                  <div className="mt-3 flex justify-between items-center text-xs">
                    <span className={jobPosting?.employmentTypeColor + ' rounded font-medium py-1 px-2'}>
                      {jobPosting?.employmentTypeText}
                    </span>
                    <div>{jobPosting?.createdAt}</div>
                  </div>
                </div>
              </div>
              <div className="py-5 border-b md:p-7 xl:p-10">
                <h4 className="font-semibold mb-2 text-lg md:mb-4">{__('Job Description')}</h4>
                <p>{jobPosting?.description && nl2br(jobPosting.description)}</p>
              </div>
              <div className="py-5 border-b md:p-7 xl:p-10">
                <h4 className="font-semibold mb-2 text-lg md:mb-4">{__('Company Description')}</h4>
                <p>{jobPosting?.companyDescription && nl2br(jobPosting.companyDescription)}</p>
              </div>
              <div className="pt-3 md:p-7 md:py-4 xl:p-10 text-right">
                <Link href={`/jobs/${jobPosting?.id}/edit`} className="mr-5 text-sm text-sky-600" rel="nofollow">
                  {__('Edit')}
                </Link>
                <Link href={`/jobs/${jobPosting?.id}/delete`} className="text-sm text-sky-600" rel="nofollow">
                  {__('Delete')}
                </Link>
              </div>
            </div>
            <div className="sticky bottom-0 py-3 text-center bg-white shadow-[0_-3px_5px_-1px_rgba(0,0,0,0.1)]">
              <Link
                href={`/jobs/${jobPosting?.id}/apply`}
                className="p-2 w-60 inline-block rounded-md text-center font-semibold bg-orange-500 text-white transition-colors md:py-3 hover:bg-orange-600"
                rel="nofollow"
              >
                {__('Apply')}
              </Link>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
