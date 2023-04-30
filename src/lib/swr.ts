import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();

  if (!res.ok) {
    const error = new Error();
    error.message = json.message;
    throw error;
  }

  return json;
};

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
  const { data, error, isLoading } = useSWR(id ? `/api/jobs/${id}` : null, fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error) return;
      if (retryCount >= 10) return;
    },
  });

  return {
    jobPosting: data,
    error,
    isLoading,
  };
};
