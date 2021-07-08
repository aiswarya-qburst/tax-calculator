import { useEffect, useState } from 'react';

const useFetch = (param: string): { result: Array<any>; loading: boolean } => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8000/${param === 'income' || param === 'deduction' ? 'forms' : param}`)
            .then((res) => res.json())
            .then((result) => {
                setResult(result);
                setLoading(false);
            });
    }, [param]);

    return { result, loading };
};

export default useFetch;
