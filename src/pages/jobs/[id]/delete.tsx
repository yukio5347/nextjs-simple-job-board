import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import JobPosting from '@/models/JobPosting';
import Layout from '@/components/Layout';
import InputLabel from '@/components/InputLabel';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import { __ } from '@/lib/helpers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ params }: { [id: string]: any }) => {
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
    props: { id, jobPosting },
  };
};

const Delete = ({ id, jobPosting }: { id: number; jobPosting?: JobPosting }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    const res = await fetch(`/api/jobs/${id}/destroy`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push('/jobs');
    }
  };

  return (
    <Layout>
      {jobPosting ? (
        <>
          <h1 className='mb-4 font-semibold'>Delete your job</h1>
          <form onSubmit={handleSubmit}>
            <div className='mt-4'>
              <InputLabel htmlFor='email' value={__('Email Address')} isRequired={true} />
              <TextInput
                id='email'
                type='email'
                name='email'
                value={email}
                className='mt-1 block w-full'
                autoComplete='email'
                isFocused={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                maxLength='255'
                required
              />
              {/* <InputError message={errors.email} className="mt-2" /> */}
            </div>

            <div className='mt-4'>
              <InputLabel htmlFor='password' value={__('Password')} isRequired={true} />
              <TextInput
                id='password'
                type='password'
                name='password'
                value={password}
                className='mt-1 block w-full'
                autoComplete='current-password'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                maxLength='255'
                required
              />
              {/* <InputError message={errors.password} className="mt-2" /> */}
            </div>

            <Button disabled={processing} className='mt-6'>
              {processing ? (
                <svg
                  className='animate-spin h-5 w-5 m-auto text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              ) : (
                __('Delete')
              )}
            </Button>
          </form>
        </>
      ) : (
        <p>job not found.</p>
      )}
    </Layout>
  );
};

export default Delete;
