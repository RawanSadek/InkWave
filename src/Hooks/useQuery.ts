import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const useQuery = <T>(callBackFn: () => Promise<{ data: T }>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError>();

    useEffect(() => {
        (async () => {
          setLoading(true);
          try {
            const response = await callBackFn();
            setData(response.data);
          } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            setError(error);
            toast.error(error.response?.data?.message || "Something went wrong");
          }
          setLoading(false);
        })();
    
      }, []);
  
    // return values so components can use them
    return { data, loading, error };
}

