import { useState } from 'react';
import Head from 'next/head';
import Checkbox from "@/components/Checkbox";
// import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import TextInput from "@/components/TextInput";
import { __, dateToString } from '@/lib/helpers';
import JobPosting from "@/models/JobPosting";

export interface DataProps {
  title: string,
  description: string,
  closedAt: string,
  employmentType: string,
  isRemote: boolean,
  address: string,
  locality: string,
  region: string,
  postalCode: string,
  salaryMin: string,
  salaryMax: string,
  salaryUnit: string,
  companyName: string,
  companyDescription: string,
  name: string,
  email: string,
  password: string,
};

interface Props {
  jobPosting: JobPosting;
  onSubmit: (data: DataProps) => void;
}

const Form = ({ jobPosting, onSubmit }: Props ) => {
  const [title, setTitle] = useState(jobPosting.title || '');
  const [description, setDescription] = useState(jobPosting.description || '');
  const [closedAt, setClosedAt] = useState(jobPosting.closedAt);
  const [employmentType, setEmploymentType] = useState(jobPosting.employmentType);
  const [isRemote, setIsRemote] = useState(jobPosting.isRemote);
  const [address, setAddress] = useState(jobPosting.address || '');
  const [locality, setLocality] = useState(jobPosting.locality || '');
  const [region, setRegion] = useState(jobPosting.region || '');
  const [postalCode, setPostalCode] = useState(jobPosting.postalCode || '');
  const [salaryMin, setSalaryMin] = useState(jobPosting.salaryMin);
  const [salaryMax, setSalaryMax] = useState(jobPosting.salaryMax || '');
  const [salaryUnit, setSalaryUnit] = useState(jobPosting.salaryUnit);
  const [companyName, setCompanyName] = useState(jobPosting.companyName || '');
  const [companyDescription, setCompanyDescription] = useState(jobPosting.companyDescription || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const today = new Date();

  const employmentTypes = {
    FULL_TIME: __('FULL_TIME'),
    PART_TIME: __('PART_TIME'),
    CONTRACTOR: __('CONTRACTOR'),
    TEMPORARY: __('TEMPORARY'),
    INTERN: __('INTERN'),
  }
  const salaryUnits = {
    HOUR: __('HOUR'),
    DAY: __('DAY'),
    WEEK: __('WEEK'),
    MONTH: __('MONTH'),
    YEAR: __('YEAR'),
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    onSubmit({
      title,
      description,
      closedAt,
      employmentType,
      isRemote,
      address,
      locality,
      region,
      postalCode,
      salaryMin,
      salaryMax,
      salaryUnit,
      companyName,
      companyDescription,
      name,
      email,
      password,
    });
  };

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
        {jobPosting.id && <meta name="robots" content="noindex, nofollow" />}
      </Head>
      <h1 className="mb-4 font-semibold"></h1>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel htmlFor="title" value={__('Job Title')} isRequired={true} />
          <TextInput
            id="title"
            name="title"
            value={title}
            className="mt-1 block w-full"
            isFocused={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            maxLength="40"
            required
          />
          {/* <InputError message={errors.title} className="mt-2" /> */}
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="description" value={__('Job Description')} isRequired={true} />
          <Textarea
            id="description"
            name="description"
            value={description}
            className="mt-1 block w-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            maxLength="20000"
            required
          />
          {/* <InputError message={errors.description} className="mt-2" /> */}
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="closedAt" value={__('Close Date')} isRequired={true} />
          <TextInput
            id="closedAt"
            name="closedAt"
            value={closedAt}
            className="mt-1 block w-full"
            type="date"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClosedAt(e.target.value)}
            min={dateToString(today)}
            max={dateToString(new Date(today.setDate(today.getDate() + 90)))}
            required
          />
          {/* <InputError message={errors.closedAt} className="mt-2" /> */}
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="employmentType" value={__('Employment Type')} isRequired={true} />
          <Select
            id="employmentType"
            name="employmentType"
            options={employmentTypes}
            value={employmentType}
            className="mt-1 block w-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmploymentType(e.target.value)}
            required
          />
          {/* <InputError message={errors.employmentType} className="mt-2" /> */}
        </div>

        <h3 className="mt-10 font-semibold">{__('Work Place')}</h3>
        <label className="mt-4 inline-flex items-center">
          <Checkbox name="isRemote" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsRemote(e.target.checked)} />
          <span className="ml-2 text-sm font-medium">{__('Remote')}</span>
        </label>

        <div className="mt-4">
          <InputLabel htmlFor="address" value={__('Address')} isRequired={!isRemote} />
          <TextInput
            id="address"
            name="address"
            value={address}
            className="mt-1 block w-full"
            autoComplete="street-address"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
            maxLength="255"
            required={!isRemote}
          />
          {/* <InputError message={errors.address} className="mt-2" /> */}
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="locality" value={__('City')} isRequired={!isRemote} />
          <TextInput
            id="locality"
            name="locality"
            value={locality}
            className="mt-1 block w-full"
            autoComplete="address-level2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocality(e.target.value)}
            maxLength="255"
            required={!isRemote}
          />
          {/* <InputError message={errors.locality} className="mt-2" /> */}
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="region" value={__('Region')} isRequired={!isRemote} />
          <TextInput
            id="region"
            name="region"
            value={region}
            className="mt-1 block w-full"
            autoComplete="address-level1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRegion(e.target.value)}
            maxLength="255"
            required={!isRemote}
          />
          {/* <InputError message={errors.region} className="mt-2" /> */}
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="postalCode" value={__('Postal Code')} isRequired={!isRemote} />
          <TextInput
            id="postalCode"
            name="postalCode"
            value={postalCode}
            className="mt-1 block w-full"
            autoComplete="postal-code"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostalCode(e.target.value)}
            maxLength="255"
            required={!isRemote}
          />
          {/* <InputError message={errors.postalCode} className="mt-2" /> */}
        </div>

        <h3 className="mt-10 font-semibold">{__('Salary')}</h3>
        <div className="mt-4">
          <InputLabel htmlFor="salaryMin" value={__('Min. Salary')} isRequired={true} />
          <TextInput
            id="salaryMin"
            name="salaryMin"
            value={salaryMin}
            type="number"
            className="mt-1 block w-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSalaryMin(e.target.value)}
            min="0"
            required
          />
          {/* <InputError message={errors.salaryMin} className="mt-2" /> */}
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="salaryMax" value={__('Max. Salary')} />
          <TextInput
            id="salaryMax"
            name="salaryMax"
            value={salaryMax}
            type="number"
            className="mt-1 block w-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSalaryMax(e.target.value)}
            min={salaryMin}
          />
          {/* <InputError message={errors.salaryMax} className="mt-2" /> */}
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="salaryUnit" value={__('Salary Unit')} isRequired={true} />
          <Select
            id="salaryUnit"
            name="salaryUnit"
            options={salaryUnits}
            value={salaryUnit}
            className="mt-1 block w-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSalaryUnit(e.target.value)}
            required
          />
          {/* <InputError message={errors.salaryUnit} className="mt-2" /> */}
        </div>

        <h3 className="mt-10 font-semibold">{__('Company Information')}</h3>
        <div className="mt-4">
          <InputLabel htmlFor="companyName" value={__('Company Name')} isRequired={true} />
          <TextInput
            id="companyName"
            name="companyName"
            value={companyName}
            className="mt-1 block w-full"
            autoComplete="organization"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
            maxLength="255"
            required
          />
          {/* <InputError message={errors.companyName} className="mt-2" /> */}
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="companyDescription" value={__('Company Description')} isRequired={true} />
          <Textarea
            id="companyDescription"
            name="companyDescription"
            value={companyDescription}
            className="mt-1 block w-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyDescription(e.target.value)}
            maxLength="20000"
            required
          />
          {/* <InputError message={errors.companyDescription} className="mt-2" /> */}
        </div>

        <h3 className="mt-10 font-semibold">{__('Authentication Information')}</h3>
        {!jobPosting.id && (
          <div className="mt-4">
            <InputLabel htmlFor="name" value={__('Your Name')} isRequired={true} />
            <TextInput
              id="name"
              name="name"
              value={name}
              className="mt-1 block w-full"
              autoComplete="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              maxLength="255"
              required
            />
            {/* <InputError message={errors.name} className="mt-2" /> */}
          </div>
        )}

        <div className="mt-4">
          <InputLabel htmlFor="email" value={__('Email Address')} isRequired={true} />
          <TextInput
            id="email"
            type="email"
            name="email"
            value={email}
            className="mt-1 block w-full"
            autoComplete="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            maxLength="255"
            required
          />
          {/* <InputError message={errors.email} className="mt-2" /> */}
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value={__('Password')} isRequired={true} />
          <TextInput
            id="password"
            type="password"
            name="password"
            value={password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            maxLength="255"
            required
          />
          {/* <InputError message={errors.password} className="mt-2" /> */}
        </div>

        <Button
          disabled={processing}
          className="mt-6"
        >
          {processing ? (
            <svg className="animate-spin h-5 w-5 m-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            jobPosting.id ? __('Save') : __('Post')
          )}
        </Button>
      </form>
    </>
  );
}

export default Form;