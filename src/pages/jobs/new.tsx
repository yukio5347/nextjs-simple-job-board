import { useRouter } from 'next/router';
import JobPosting from '@/models/JobPosting';
import Form, { DataProps } from '@/components/Form';
import Layout from '@/components/Layout';
import { __ } from '@/lib/helpers';

const New = () => {
  const router = useRouter();
  const today = new Date();
  const jobPosting = new JobPosting({
    closedAt: new Date(today.setDate(today.getDate() + 30)),
    employmentType: 'FULL_TIME',
    isRemote: false,
    salaryMin: '0',
    salaryUnit: 'MONTH',
  });

  const handleSubmit = async (data: DataProps) => {
    const res = await fetch(`/api/jobs/store`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push('/jobs');
    }
  }

  return (
    <Layout>
      <Form jobPosting={jobPosting} onSubmit={handleSubmit} />
    </Layout>
  );
}

export default New;
