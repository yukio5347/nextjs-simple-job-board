import { useRouter } from 'next/router';

import JobPostingForm from '@/components/JobPostingForm';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { __ } from '@/lib/helpers';
import { useJob } from '@/lib/swr';

export default function Edit() {
  const router = useRouter();
  const id = Number(router.query.id);
  const { jobPosting, error, isLoading } = useJob(id);

  return (
    <Layout>
      {error ? (
        <>{error.message}</>
      ) : isLoading ? (
        <Loading />
      ) : jobPosting ? (
        <JobPostingForm jobPosting={jobPosting} />
      ) : (
        <p>{__('Job not found.')}</p>
      )}
    </Layout>
  );
}
