import { JobPosting as JobPostingType, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import pick from 'lodash.pick';
import { NextApiRequest } from 'next';
import requestIp from 'request-ip';

import { __, dateToString } from '@/lib/helpers';

const filter = [
  'id',
  'title',
  'description',
  'employmentType',
  'address',
  'locality',
  'region',
  'postalCode',
  'isRemote',
  'salaryMin',
  'salaryMax',
  'salaryUnit',
  'companyName',
  'companyDescription',
] as const;

export interface JobPosting extends Pick<JobPostingType, (typeof filter)[number]> {
  closedAt: string;
  createdAt: string;
  employmentTypeText: string;
  employmentTypeColor: string;
  salaryUnitText: string;
  shortWorkPlace: string;
  workPlace: string;
  shortSalary: string;
  salary: string;
}

export const formatJobPosting = (jobPosting: JobPostingType): JobPosting => {
  const numberFormatOption = {
    style: 'currency',
    currency: process.env.NEXT_PUBLIC_CURRENCY,
  };

  const getEmploymentTypeColor = (): string => {
    switch (jobPosting.employmentType) {
      case 'FULL_TIME':
        return 'text-sky-600 bg-sky-100';
      case 'PART_TIME':
        return 'text-orange-600 bg-orange-100';
      case 'CONTRACTOR':
        return 'text-violet-600 bg-violet-100';
      case 'TEMPORARY':
        return 'text-red-600 bg-red-100';
      case 'INTERN':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-700 bg-gray-200';
    }
  };

  const getShortWorkPlace = () => {
    const address = [];
    if (jobPosting.locality) {
      address.push(jobPosting.locality);
    }
    if (jobPosting.region && jobPosting.region !== jobPosting.locality) {
      address.push(jobPosting.region);
    }
    let workPlace = address.join(', ');
    if (jobPosting.isRemote) {
      workPlace = workPlace ? __('Remote') + ` / ${workPlace}` : __('Remote');
    }
    return workPlace;
  };

  const getWorkPlace = () => {
    const address = [];
    if (jobPosting.address) {
      address.push(jobPosting.address);
    }
    if (jobPosting.locality && jobPosting.locality !== jobPosting.address) {
      address.push(jobPosting.locality);
    }
    if (jobPosting.region && jobPosting.region !== jobPosting.locality) {
      address.push(jobPosting.region);
    }
    if (
      jobPosting.postalCode &&
      jobPosting.postalCode !== jobPosting.address &&
      jobPosting.postalCode !== jobPosting.locality
    ) {
      address.push(jobPosting.postalCode);
    }
    let workPlace = address.join(', ');
    if (jobPosting.isRemote) {
      workPlace = workPlace ? __('Remote') + ` / ${workPlace}` : __('Remote');
    }
    return workPlace;
  };

  const getShortSalary = () => {
    return new Intl.NumberFormat(process.env.NEXT_PUBLIC_LOCALE, numberFormatOption).format(
      Number(jobPosting.salaryMin),
    );
  };

  const getSalary = () => {
    let salary = new Intl.NumberFormat(process.env.NEXT_PUBLIC_LOCALE, numberFormatOption).format(
      Number(jobPosting.salaryMin),
    );
    if (jobPosting.salaryMax) {
      salary +=
        ' ~ ' +
        new Intl.NumberFormat(process.env.NEXT_PUBLIC_LOCALE, numberFormatOption).format(Number(jobPosting.salaryMax));
    }
    return salary;
  };

  const filtered = pick(jobPosting, filter);
  const closedAt = dateToString(jobPosting.closedAt);
  const createdAt = dateToString(jobPosting.createdAt);
  const employmentTypeText = __(jobPosting.employmentType);
  const employmentTypeColor = getEmploymentTypeColor();
  const salaryUnitText = __(jobPosting.salaryUnit);
  const shortWorkPlace = getShortWorkPlace();
  const workPlace = getWorkPlace();
  const shortSalary = getShortSalary();
  const salary = getSalary();

  return {
    ...filtered,
    closedAt,
    createdAt,
    employmentTypeText,
    employmentTypeColor,
    salaryUnitText,
    shortWorkPlace,
    workPlace,
    shortSalary,
    salary,
  };
};

export const getData = (req: NextApiRequest) => {
  return {
    title: req.body.title,
    description: req.body.description,
    employmentType: req.body.employmentType,
    salaryMin: req.body.salaryMin,
    salaryUnit: req.body.salaryUnit,
    companyName: req.body.companyName,
    companyDescription: req.body.companyDescription,
    closedAt: new Date(req.body.closedAt),
    isRemote: req.body.isRemote ? true : false,
    address: req.body.address || null,
    locality: req.body.locality || null,
    region: req.body.region || null,
    postalCode: req.body.postalCode || null,
    salaryMax: req.body.salaryMax || null,
  };
};

export const getStoreData = (req: NextApiRequest): Prisma.JobPostingCreateInput => {
  return {
    ...getData(req),
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    ipAddress: requestIp.getClientIp(req),
    userAgent: req.headers['user-agent'],
  };
};
