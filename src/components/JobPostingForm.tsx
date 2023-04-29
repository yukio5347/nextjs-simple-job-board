import Head from 'next/head';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import { Spin } from '@/components/Icons';
// import InputError from "@/components/InputError";
import InputLabel from '@/components/InputLabel';
import Select from '@/components/Select';
import Textarea from '@/components/Textarea';
import TextInput from '@/components/TextInput';
import { __, addDays, dateToString } from '@/lib/helpers';

const initialData = {
  title: '',
  description: '',
  closedAt: '',
  employmentType: '',
  isRemote: false,
  address: '',
  locality: '',
  region: '',
  postalCode: '',
  salaryMin: '',
  salaryMax: '',
  salaryUnit: '',
  companyName: '',
  companyDescription: '',
  name: '',
  email: '',
  password: '',
};

type DataType = typeof initialData & {
  id?: number;
};

export default function Form({ jobPosting = initialData }: { jobPosting?: DataType }) {
  const [formData, setFormData] = useState<DataType>(jobPosting);
  const [processing, setProcessing] = useState(false);
  const today = new Date();
  const employmentTypes = {
    FULL_TIME: __('FULL_TIME'),
    PART_TIME: __('PART_TIME'),
    CONTRACTOR: __('CONTRACTOR'),
    TEMPORARY: __('TEMPORARY'),
    INTERN: __('INTERN'),
  };
  const salaryUnits = {
    HOUR: __('HOUR'),
    DAY: __('DAY'),
    WEEK: __('WEEK'),
    MONTH: __('MONTH'),
    YEAR: __('YEAR'),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    // onSubmit({ });
  };

  useEffect(() => {
    if (!formData.closedAt) {
      setFormData({ ...formData, ['closedAt']: dateToString(addDays(today, 30)) });
    }
  }, []);

  return (
    <>
      <Head>
        <title></title>
        <meta name='description' content='' />
        {jobPosting.id && <meta name='robots' content='noindex, nofollow' />}
      </Head>
      <h1 className='mb-4 font-semibold'></h1>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel htmlFor='title' label={__('Job Title')} isRequired={true} />
          <TextInput
            id='title'
            name='title'
            value={formData.title}
            className='mt-1 block w-full'
            isFocused={true}
            onChange={handleChange}
            maxLength='40'
            required
          />
          {/* <InputError message={errors.title} className="mt-2" /> */}
        </div>

        <div className='mt-4'>
          <InputLabel htmlFor='description' label={__('Job Description')} isRequired={true} />
          <Textarea
            id='description'
            name='description'
            value={formData.description}
            className='mt-1 block w-full'
            onChange={handleChange}
            maxLength='20000'
            required
          />
          {/* <InputError message={errors.description} className="mt-2" /> */}
        </div>

        <div className='mt-4'>
          <InputLabel htmlFor='closedAt' label={__('Close Date')} isRequired={true} />
          <TextInput
            id='closedAt'
            name='closedAt'
            value={formData.closedAt}
            className='mt-1 block w-full'
            type='date'
            onChange={handleChange}
            min={dateToString(today)}
            max={dateToString(addDays(today, 90))}
            required
          />
          {/* <InputError message={errors.closedAt} className="mt-2" /> */}
        </div>

        <div className='mt-4'>
          <InputLabel htmlFor='employmentType' label={__('Employment Type')} isRequired={true} />
          <Select
            id='employmentType'
            name='employmentType'
            options={employmentTypes}
            value={formData.employmentType}
            className='mt-1 block w-full'
            onChange={handleChange}
            required
          />
          {/* <InputError message={errors.employmentType} className="mt-2" /> */}
        </div>

        <h3 className='mt-10 font-semibold'>{__('Work Place')}</h3>
        <label className='mt-4 inline-flex items-center'>
          <Checkbox name='isRemote' onChange={handleChange} />
          <span className='ml-2 text-sm font-medium'>{__('Remote')}</span>
        </label>

        <div className='mt-4'>
          <InputLabel htmlFor='address' label={__('Address')} isRequired={!formData.isRemote} />
          <TextInput
            id='address'
            name='address'
            value={formData.address}
            className='mt-1 block w-full'
            autoComplete='street-address'
            onChange={handleChange}
            maxLength='255'
            required={!formData.isRemote}
          />
          {/* <InputError message={errors.address} className="mt-2" /> */}
        </div>

        <div className='mt-4'>
          <InputLabel htmlFor='locality' label={__('City')} isRequired={!formData.isRemote} />
          <TextInput
            id='locality'
            name='locality'
            value={formData.locality}
            className='mt-1 block w-full'
            autoComplete='address-level2'
            onChange={handleChange}
            maxLength='255'
            required={!formData.isRemote}
          />
          {/* <InputError message={errors.locality} className="mt-2" /> */}
        </div>

        <div className='mt-4'>
          <InputLabel htmlFor='region' label={__('Region')} isRequired={!formData.isRemote} />
          <TextInput
            id='region'
            name='region'
            value={formData.region}
            className='mt-1 block w-full'
            autoComplete='address-level1'
            onChange={handleChange}
            maxLength='255'
            required={!formData.isRemote}
          />
          {/* <InputError message={errors.region} className="mt-2" /> */}
        </div>

        <div className='mt-4'>
          <InputLabel htmlFor='postalCode' label={__('Postal Code')} isRequired={!formData.isRemote} />
          <TextInput
            id='postalCode'
            name='postalCode'
            value={formData.postalCode}
            className='mt-1 block w-full'
            autoComplete='postal-code'
            onChange={handleChange}
            maxLength='255'
            required={!formData.isRemote}
          />
          {/* <InputError message={errors.postalCode} className="mt-2" /> */}
        </div>

        <h3 className='mt-10 font-semibold'>{__('Salary')}</h3>
        <div className='mt-4'>
          <InputLabel htmlFor='salaryMin' label={__('Min. Salary')} isRequired={true} />
          <TextInput
            id='salaryMin'
            name='salaryMin'
            value={formData.salaryMin}
            type='number'
            className='mt-1 block w-full'
            onChange={handleChange}
            min='0'
            required
          />
          {/* <InputError message={errors.salaryMin} className="mt-2" /> */}
        </div>

        <div className='mt-4'>
          <InputLabel htmlFor='salaryMax' label={__('Max. Salary')} />
          <TextInput
            id='salaryMax'
            name='salaryMax'
            value={formData.salaryMax}
            type='number'
            className='mt-1 block w-full'
            onChange={handleChange}
            min={formData.salaryMin}
          />
          {/* <InputError message={errors.salaryMax} className="mt-2" /> */}
        </div>

        <div className='mt-4'>
          <InputLabel htmlFor='salaryUnit' label={__('Salary Unit')} isRequired={true} />
          <Select
            id='salaryUnit'
            name='salaryUnit'
            options={salaryUnits}
            value={formData.salaryUnit}
            className='mt-1 block w-full'
            onChange={handleChange}
            required
          />
          {/* <InputError message={errors.salaryUnit} className="mt-2" /> */}
        </div>

        <h3 className='mt-10 font-semibold'>{__('Company Information')}</h3>
        <div className='mt-4'>
          <InputLabel htmlFor='companyName' label={__('Company Name')} isRequired={true} />
          <TextInput
            id='companyName'
            name='companyName'
            value={formData.companyName}
            className='mt-1 block w-full'
            autoComplete='organization'
            onChange={handleChange}
            maxLength='255'
            required
          />
          {/* <InputError message={errors.companyName} className="mt-2" /> */}
        </div>

        <div className='mt-4'>
          <InputLabel htmlFor='companyDescription' label={__('Company Description')} isRequired={true} />
          <Textarea
            id='companyDescription'
            name='companyDescription'
            value={formData.companyDescription}
            className='mt-1 block w-full'
            onChange={handleChange}
            maxLength='20000'
            required
          />
          {/* <InputError message={errors.companyDescription} className="mt-2" /> */}
        </div>

        <h3 className='mt-10 font-semibold'>{__('Authentication Information')}</h3>
        {!jobPosting.id && (
          <div className='mt-4'>
            <InputLabel htmlFor='name' label={__('Your Name')} isRequired={true} />
            <TextInput
              id='name'
              name='name'
              value={formData.name}
              className='mt-1 block w-full'
              autoComplete='name'
              onChange={handleChange}
              maxLength='255'
              required
            />
            {/* <InputError message={errors.name} className="mt-2" /> */}
          </div>
        )}

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
          {processing ? <Spin className='m-auto text-white' /> : jobPosting.id ? __('Save') : __('Post')}
        </Button>
      </form>
    </>
  );
}
