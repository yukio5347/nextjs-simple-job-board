import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import JobPosting from '@/models/JobPosting';
import Layout from '@/components/Layout';
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import Textarea from '@/components/Textarea';
import Select from '@/components/Select';
import Button from "@/components/Button";
import { __, dateToString } from '@/lib/helpers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ params }: { [id: string]: any; }) => {
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
    props: { id, jobPosting }
  };
}

const Delete = ({ id, jobPosting }: { id: number; jobPosting?: JobPosting }) => {
  const [name, setName] = useState('this is name');
  const [email, setEmail] = useState('hoge@hoge.hoge');
  const [telephone, setTelephone] = useState('this is telephone');
  const [address, setAddress] = useState('this is address');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('this is gender');
  const [summary, setSummary] = useState('this is summary');
  const [education, setEducation] = useState('this is education');
  const [workHistory, setWorkHistory] = useState('this is workHistory');
  const [certificates, setCertificates] = useState('this is certificates');
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const genders = {
    Male: __('Male'),
    Female: __('Female'),
    Others: __('Others'),
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    const data = {
      name,
      email,
      telephone,
      address,
      birthday,
      gender,
      summary,
      education,
      workHistory,
      certificates,
    }
    const res = await fetch(`/api/jobs/${id}/apply`, {
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
      {jobPosting ? (
        <>
          <h1 className="mb-4 font-semibold">You are applying to "{jobPosting.title}"</h1>
          <form onSubmit={handleSubmit}>
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
              <InputLabel htmlFor="telephone" value={__('Telephone')} />
              <TextInput
                id="telephone"
                name="telephone"
                value={telephone}
                className="mt-1 block w-full"
                autoComplete="telephone"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelephone(e.target.value)}
                maxLength="255"
              />
              {/* <InputError message={errors.telephone} className="mt-2" /> */}
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="address" value={__('Address')} />
              <TextInput
                id="address"
                name="address"
                value={address}
                className="mt-1 block w-full"
                autoComplete="address"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                maxLength="255"
              />
              {/* <InputError message={errors.address} className="mt-2" /> */}
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="birthday" value={__('Birthday')} />
              <TextInput
                id="birthday"
                name="birthday"
                value={birthday}
                className="mt-1 block w-full"
                type="date"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirthday(e.target.value)}
                max={dateToString(new Date())}
              />
              {/* <InputError message={errors.birthday} className="mt-2" /> */}
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="gender" value={__('Gender')} />
              <Select
                id="gender"
                name="gender"
                options={genders}
                value={gender}
                className="mt-1 block w-full"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
                maxLength="255"
              />
              {/* <InputError message={errors.gender} className="mt-2" /> */}
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="summary" value={__('Summary')} isRequired={true} />
              <Textarea
                id="summary"
                name="summary"
                value={summary}
                className="mt-1 block w-full"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSummary(e.target.value)}
                maxLength="20000"
                required
              />
              {/* <InputError message={errors.summary} className="mt-2" /> */}
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="education" value={__('Education')} />
              <Textarea
                id="education"
                name="education"
                value={education}
                className="mt-1 block w-full"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEducation(e.target.value)}
                maxLength="20000"
              />
              {/* <InputError message={errors.education} className="mt-2" /> */}
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="workHistory" value={__('Work History')} />
              <Textarea
                id="workHistory"
                name="workHistory"
                value={workHistory}
                className="mt-1 block w-full"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWorkHistory(e.target.value)}
                maxLength="20000"
              />
              {/* <InputError message={errors.workHistory} className="mt-2" /> */}
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="certificates" value={__('Skills and Certificates')} />
              <Textarea
                id="certificates"
                name="certificates"
                value={certificates}
                className="mt-1 block w-full"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCertificates(e.target.value)}
                maxLength="20000"
              />
              {/* <InputError message={errors.certificates} className="mt-2" /> */}
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
                __('Apply')
              )}
            </Button>
          </form>
        </>
      ) : (
        <p>job not found.</p>
      )}
    </Layout>
  );
}

export default Delete;
