import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import JobPosting from '@/models/JobPosting';
import Form, { DataProps } from '@/components/Form';
import Layout from '@/components/Layout';
import { __ } from '@/lib/helpers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ params }: { [key: string]: any }) => {
  const id = parseInt(params.id as string);
  const param = await prisma.jobPosting.findFirst({
    where: {
      id: id,
      closedAt: { gte: new Date() },
      deletedAt: null,
    },
  });

  const jobPosting = param ? JSON.parse(JSON.stringify(new JobPosting(param))) : null;

  return {
    props: { jobPosting },
  };
};

const Edit = ({ jobPosting }: { jobPosting?: JobPosting }) => {
  const router = useRouter();
  const id = parseInt(router.query.id as string);

  const handleSubmit = async (data: DataProps) => {
    const res = await fetch(`/api/jobs/${id}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push('/jobs');
    }
  };

  return (
    <Layout>{jobPosting ? <Form jobPosting={jobPosting} onSubmit={handleSubmit} /> : <p>job not found.</p>}</Layout>
  );
};

export default Edit;
