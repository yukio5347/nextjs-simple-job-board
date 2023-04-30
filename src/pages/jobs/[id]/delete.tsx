import { useRouter } from 'next/router';
import { useState } from 'react';

import { useAlertContext } from '@/components/Alert';
import Button from '@/components/Button';
import { Spin } from '@/components/Icons';
import InputLabel from '@/components/InputLabel';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import TextInput from '@/components/TextInput';
import { __, getErrorMessage } from '@/lib/helpers';
import { useJob } from '@/lib/swr';

export default function Delete() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const id = Number(router.query.id);
  const { jobPosting, error, isLoading } = useJob(id);
  const { showAlert } = useAlertContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          router.push('/jobs');
        }
        return res.json();
      })
      .then((json) => showAlert(json.type, json.message))
      .catch((error) => {
        showAlert('error', getErrorMessage(error));
        console.error(error);
      })
      .finally(() => setProcessing(false));
  };

  return (
    <Layout>
      {error ? (
        <>{error.message}</>
      ) : isLoading ? (
        <Loading />
      ) : jobPosting ? (
        <>
          <h1 className='mb-4 font-semibold'>{__(`You are about to delete "${jobPosting.title}"`)}</h1>
          <form onSubmit={handleSubmit}>
            <div className='mt-4'>
              <InputLabel htmlFor='email' label={__('Email Address')} isRequired={true} />
              <TextInput
                id='email'
                type='email'
                name='email'
                value={formData.email}
                className='mt-1 block w-full'
                autoComplete='email'
                isFocused={true}
                onChange={handleChange}
                maxLength='255'
                required
              />
              {/* <InputError message={errors.email} className="mt-2" /> */}
            </div>

            <div className='mt-4'>
              <InputLabel htmlFor='password' label={__('Password')} isRequired={true} />
              <TextInput
                id='password'
                type='password'
                name='password'
                value={formData.password}
                className='mt-1 block w-full'
                autoComplete='current-password'
                onChange={handleChange}
                maxLength='255'
                required
              />
              {/* <InputError message={errors.password} className="mt-2" /> */}
            </div>

            <Button disabled={processing} className='mt-6'>
              {processing ? <Spin className='m-auto text-white' /> : __('Delete')}
            </Button>
          </form>
        </>
      ) : (
        <p>{__('Job not found.')}</p>
      )}
    </Layout>
  );
}
