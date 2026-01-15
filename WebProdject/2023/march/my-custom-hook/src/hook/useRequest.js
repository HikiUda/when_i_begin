import { useEffect, useState } from 'react';

export default function (request) {
   const [data, setData] = useState(null);
   const [isLoading, setLoading] = useState(false);
   const [error, setError] = useState('');

   useEffect(() => {
      setLoading(true);
      request()
         .then((res) => setData(res.data))
         .catch((error) => setError(error))
         .finally(() => setLoading(false));
   }, []);

   return [data, isLoading, error];
}
