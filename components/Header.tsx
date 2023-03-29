import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-sky-500 py-5">
      <div className="flex flex-col md:container md:flex-row md:justify-between">
        <Link
          href="/"
          className="flex-none text-lg text-center inline-block text-white font-semibold md:text-left"
        >
          Simple Job Board
        </Link>
        <div className="flex-1 mt-4 flex justify-between md:items-end md:justify-end md:m-0">
          <Link
          href="/"
          className="hidden font-medium text-white md:flex items-center justify-center">
            Home
          </Link>
          <Link
            href="/jobs"
            className="w-1/2 flex items-center justify-center font-medium text-white md:w-auto md:ml-8 lg:ml-12"
          >
            Find Jobs
          </Link>
          <Link
            href="/jobs/new"
            className="w-1/2 flex items-center justify-center font-medium text-white md:w-auto md:ml-8 lg:ml-12"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header;
