import { JobPosting as JobPostingType } from '@prisma/client';
import pick from 'lodash.pick';

import { __ } from '@/lib/helpers';

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
  const closedAt = jobPosting.closedAt.toISOString().replace(/T.*/, '');
  const createdAt = jobPosting.createdAt.toISOString().replace(/T.*/, '');
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
