import { useEffect, useState } from 'react';
// import { Data, User } from '../models/common.interface';

// const getUpdatedData = (forms: Data, empData: User, regime: string): Data => {
//     const updatedIncome = forms.income.map((inc) => {
//         //TODO: cannot hardcode 'Salary'
//         return inc.label === 'Salary' ? { ...inc, value: String(empData.salary) } : inc;
//     });

//     return regime === 'old' ? { ...forms, income: updatedIncome } : { income: updatedIncome };
// };

const useFetch = (param: string) => {
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
