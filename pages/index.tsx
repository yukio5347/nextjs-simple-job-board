import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import Layout from '@/components/Layout';
import { Map, Money } from '@/components/Icons';
import JobPosting from '@/models/JobPosting';
import { __ } from '@/lib/helpers';

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();
  const params = await prisma.jobPosting.findMany({
    where: {
      closedAt: {
        gte: new Date(),
      },
    },
    orderBy: {
      id: 'desc',
    },
    take: 20,
  });
  const jobPostings = JSON.parse(JSON.stringify(params.map(param => new JobPosting(param))));

  return {
    props: { jobPostings },
  };
};

const Home = ({ jobPostings }: { jobPostings: JobPosting[] }) => {
  return (
    <Layout>
      {
        jobPostings ? (
          <>
            <div className="grid gap-5 md:grid-cols-2">
              {jobPostings.map((jobPosting: JobPosting) => (
                <Link key={jobPosting.id} href={`/jobs/${jobPosting.id}`} className="flex flex-col justify-between p-4 border rounded-lg transition-colors lg:hover:border-sky-500">
                  <div className="flex-1">
                    <h3 className="font-semibold leading-tight mb-1">{jobPosting.title}</h3>
                    <p className="text-sm text-sky-500 font-semibold mb-2">{jobPosting.companyName}</p>
                  {jobPosting.shortWorkPlace &&
                    <p className="flex items-center text-xs text-gray-500 mb-1 home:lg:text-sm">
                      <Map /> {jobPosting.shortWorkPlace}
                    </p>
                  }
                  {jobPosting.shortSalary &&
                    <p className="flex items-center text-xs text-gray-500 mb-1">
                      <Money /> {jobPosting.shortSalary}
                    </p>
                  }
                  </div>
                  <div className="mt-3 flex justify-between items-center text-xs">
                    <span className={`${jobPosting.employmentTypeColor} rounded font-medium py-1 px-2`}>
                      {jobPosting.employmentTypeText}
                    </span>
                    <div>
                      {jobPosting.createdAt.replace(/T.*/, '')}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="my-10 text-center">
              <Link href="/jobs" className="py-4 px-6 rounded-md bg-sky-500 text-white text-lg font-semibold transition-colors hover:bg-sky-600">{__('View All Jobs')}</Link>
            </div>
          </>
        ) : (
          <p>{__('Jobs not found.')}</p>
        )
      }
    </Layout>
  );
}

export default Home;
