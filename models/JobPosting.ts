import { __ } from '@/lib/helpers';

class JobPosting {
  id: number;
  title: string;
  description: string;
  closedAt: string;
  employmentType: string; // 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'TEMPORARY' | 'INTERN';
  address: string | null;
  locality: string | null;
  region: string | null;
  postalCode: string | null;
  isRemote: Boolean;
  salaryMin: number;
  salaryMax: number | null;
  salaryUnit: string; //'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  companyName: string;
  companyDescription: string;
  createdAt: string;
  employmentTypeText: string;
  employmentTypeColor: string;
  salaryUnitText: string;
  shortWorkPlace: string;
  workPlace: string;
  shortSalary: string;
  salary: string;

  constructor(param: {
    id: number;
    title: string;
    description: string;
    closedAt: Date;
    employmentType: string; // 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'TEMPORARY' | 'INTERN';
    address: string | null;
    locality: string | null;
    region: string | null;
    postalCode: string | null;
    isRemote: Boolean;
    salaryMin: string;
    salaryMax?: string | null;
    salaryUnit: string; //'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
    companyName: string;
    companyDescription: string;
    createdAt: Date;
  }) {
    this.id = param.id;
    this.title = param.title;
    this.description = param.description;
    this.closedAt = param.closedAt.toISOString();
    this.employmentType = param.employmentType;
    this.address = param.address;
    this.locality = param.locality;
    this.region = param.region;
    this.postalCode = param.postalCode;
    this.isRemote = param.isRemote;
    this.salaryMin = Number(param.salaryMin);
    this.salaryMax = Number(param.salaryMax);
    this.salaryUnit = param.salaryUnit;
    this.companyName = param.companyName;
    this.companyDescription = param.companyDescription;
    this.createdAt = param.createdAt.toISOString();

    this.employmentTypeText = __(this.employmentType);
    this.employmentTypeColor = this.getEmploymentTypeColor();
    this.salaryUnitText = __(this.salaryUnit);
    this.shortWorkPlace = this.getShortWorkPlace();
    this.workPlace = this.getWorkPlace();
    this.shortSalary = this.getShortSalary();
    this.salary = this.getSalary();
  }

  private getEmploymentTypeColor(): string {
    switch (this.employmentType) {
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
  }

  private getShortWorkPlace(): string {
    let address = [];
    if (this.locality) {
      address.push(this.locality);
    }
    if (this.region && this.region !== this.locality) {
      address.push(this.region);
    }

    let workPlace = address.join(', ');
    if (this.isRemote) {
      workPlace = workPlace ? __('Remote') + ` / ${workPlace}` : __('Remote');
    }

    return workPlace;
  }

  private getWorkPlace(): string {
    let address = [];
    if (this.address) {
      address.push(this.address);
    }
    if (this.locality && this.locality !== this.address) {
      address.push(this.locality);
    }
    if (this.region && this.region !== this.locality) {
      address.push(this.region);
    }
    if (this.postalCode && this.postalCode !== this.address && this.postalCode !== this.locality) {
      address.push(this.postalCode);
    }

    let workPlace = address.join(', ');
    if (this.isRemote) {
      workPlace = workPlace ? __('Remote') + ` / ${workPlace}` : __('Remote');
    }

    return workPlace;
  }

  private getShortSalary(): string {
    return new Intl.NumberFormat(process.env.NEXT_PUBLIC_LOCALE, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(this.salaryMin);
  }

  private getSalary(): string {
    let salary = new Intl.NumberFormat(process.env.NEXT_PUBLIC_LOCALE, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(this.salaryMin);

    if (this.salaryMax) {
      salary += ' ~ ' + new Intl.NumberFormat(process.env.NEXT_PUBLIC_LOCALE, { style: 'currency', currency: process.env.NEXT_PUBLIC_CURRENCY }).format(this.salaryMax);
    }

    return salary;
  }
}

export default JobPosting;