import { useEffect, useState } from 'react';
import { Field } from '../models/iFormElement';
import { Slab } from '../models/iSlab';
import { User } from '../models/iUser';

const useFetch = (
    param: string,
): { result: User[] | Record<string, Record<string, Field[]>> | Record<string, Slab[]>; loading: boolean } => {
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
