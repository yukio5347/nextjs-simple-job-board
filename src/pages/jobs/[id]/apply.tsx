import { useRouter } from 'next/router';
import { useState } from 'react';

import { useAlertContext } from '@/components/Alert';
import Button from '@/components/Button';
import { Spin } from '@/components/Icons';
import InputLabel from '@/components/InputLabel';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Select from '@/components/Select';
import Textarea from '@/components/Textarea';
import TextInput from '@/components/TextInput';
import { __, dateToString, getErrorMessage } from '@/lib/helpers';
import { useJob } from '@/lib/swr';

const defaultData = {
  name: '',
  email: '',
  telephone: '',
  address: '',
  birthday: '',
  gender: '',
  summary: '',
  education: '',
  workHistory: '',
  certificates: '',
};

export default function Apply() {
  const [formData, setFormData] = useState(defaultData);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const id = Number(router.query.id);
  const { jobPosting, error, isLoading } = useJob(id);
  const { showAlert } = useAlertContext();
  const genders = {
    '': '- ' + __('Select') + ' -',
    Male: __('Male'),
    Female: __('Female'),
    Others: __('Others'),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    fetch(`/api/jobs/${id}`, {
      method: 'POST',
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
          <h1 className='mb-4 font-semibold'>{`You are about to apply for "${jobPosting.title}"`}</h1>
          <form onSubmit={handleSubmit}>
            <div className='mt-4'>
              <InputLabel htmlFor='name' label={__('Your Name')} isRequired={true} />
              <TextInput
                id='name'
                name='name'
                value={formData.name}
                className='mt-1 block w-full'
                autoComplete='name'
                isFocused={true}
                onChange={handleChange}
                maxLength='255'
                required
              />
              {/* <InputError message={errors.name} className="mt-2" /> */}
            </div>

            <div className='mt-4'>
              <InputLabel htmlFor='email' label={__('Email Address')} isRequired={true} />
              <TextInput
                id='email'
                type='email'
                name='email'
                value={formData.email}
                className='mt-1 block w-full'
                autoComplete='email'
                onChange={handleChange}
                maxLength='255'
                required
              />
              {/* <InputError message={errors.email} className="mt-2" /> */}
            </div>

            <div className='mt-4'>
              <InputLabel htmlFor='telephone' label={__('Telephone')} />
              <TextInput
                id='telephone'
                name='telephone'
                value={formData.telephone}
                className='mt-1 block w-full'
                autoComplete='telephone'
                onChange={handleChange}
                maxLength='255'
              />
              {/* <InputError message={errors.telephone} className="mt-2" /> */}
            </div>

            <div className='mt-4'>
              <InputLabel htmlFor='address' label={__('Address')} />
              <TextInput
                id='address'
                name='address'
                value={formData.address}
                className='mt-1 block w-full'
                autoComplete='address'
                onChange={handleChange}
                maxLength='255'
              />
              {/* <InputError message={errors.address} className="mt-2" /> */}
            </div>

            <div className='mt-4'>
              <InputLabel htmlFor='birthday' label={__('Birthday')} />
              <TextInput
                id='birthday'
                name='birthday'
                value={formData.birthday}
                className='mt-1 block w-full'
                type='date'
                onChange={handleChange}
                max={dateToString(new Date())}
              />
              {/* <InputError message={errors.birthday} className="mt-2" /> */}
            </div>

            <div className='mt-4'>
              <InputLabel htmlFor='gender' label={__('Gender')} />
              <Select
                id='gender'
                name='gender'
                options={genders}
                value={formData.gender}
                className='mt-1 block w-full'
                onChange={handleChange}
                maxLength='255'
              />
              {/* <InputError message={errors.gender} className="mt-2" /> */}
            </div>

            <div className='mt-4'>
              <InputLabel htmlFor='summary' label={__('Summary')} isRequired={true} />
              <Textarea
                id='summary'
                name='summary'
                value={formData.summary}
                className='mt-1 block w-full'
                onChange={handleChange}
                maxLength='20000'
                required
              />
              {/* <InputError message={errors.summary} className="mt-2" /> */}
            </div>

            <div className='mt-4'>
              <InputLabel htmlFor='education' label={__('Education')} />
              <Textarea
                id='education'
                name='education'
                value={formData.education}
                className='mt-1 block w-full'
                onChange={handleChange}
                maxLength='20000'
              />
              {/* <InputError message={errors.education} className="mt-2" /> */}
            </div>

            <div className='mt-4'>
              <InputLabel htmlFor='workHistory' label={__('Work History')} />
              <Textarea
                id='workHistory'
                name='workHistory'
                value={formData.workHistory}
                className='mt-1 block w-full'
                onChange={handleChange}
                maxLength='20000'
              />
              {/* <InputError message={errors.workHistory} className="mt-2" /> */}
            </div>

            <div className='mt-4'>
              <InputLabel htmlFor='certificates' label={__('Skills and Certificates')} />
              <Textarea
                id='certificates'
                name='certificates'
                value={formData.certificates}
                className='mt-1 block w-full'
                onChange={handleChange}
                maxLength='20000'
              />
              {/* <InputError message={errors.certificates} className="mt-2" /> */}
            </div>
            <div className='mt-6 flex justify-between'>
              <Button disabled={processing}>{processing ? <Spin className='m-auto text-white' /> : __('Apply')}</Button>
              <button
                type='button'
                className='py-2 px-5 text-sm rounded-md bg-gray-200  transition-colors hover:bg-gray-300'
                onClick={() => router.back()}
              >
                {__('Cancel')}
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>{__('Job not found.')}</p>
      )}
    </Layout>
  );
}
