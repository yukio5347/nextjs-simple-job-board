import useSWR from 'swr';

export const useJobList = (page = 1) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/jobs?page=${page}`, fetcher);

  return {
    jobPostings: data,
    isLoading,
    error,
  };
};
