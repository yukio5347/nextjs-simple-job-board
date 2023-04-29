import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useJobList = (page = 1) => {
  const { data, error, isLoading } = useSWR(`/api/jobs?page=${page}`, fetcher);

  return {
    jobPostings: data,
    error,
    isLoading,
  };
};

export const usePageCount = () => {
  const { data } = useSWR('/api/jobs/count', fetcher);
  const pageCount = Math.ceil(Number(data) / 20);

  return {
    pageCount,
  };
};

export const useJob = (id: number) => {
  const { data, error, isLoading } = useSWR(id ? `/api/jobs/${id}` : null, fetcher);

  return {
    jobPosting: data,
    error,
    isLoading,
  };
};
