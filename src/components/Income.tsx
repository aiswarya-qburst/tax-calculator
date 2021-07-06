import React, { useContext, useEffect, useState } from 'react';
import { Form, SubmitButton } from './FormElements';
import InputForm from './InputForm';
import useFetch from '../hooks/useFetch';
import { BasicContext } from '../App';
import { Field } from '../models/common.interface';
import { getName } from './utils';
import { getTotal } from './taxEngine/taxCalculator';
import { useCallback } from 'react';

interface Initial {
    [key: string]: string;
}

const Income = ({ handleIncomeUpdate }: { handleIncomeUpdate: (e: number) => void }): JSX.Element => {
    const [form, updateForm] = useState([] as Field[]);
    const [initial, setInitial] = useState({} as Initial);
    const { ay, empData } = useContext(BasicContext);
    const { result, loading } = useFetch('income');

    const handleSubmit = (fieldData: Record<string, string>) => {
        const totalIncome: number = getTotal(Object.values(fieldData).map(Number));
        handleIncomeUpdate(totalIncome);
    };

    useEffect(() => {
        !loading && updateForm(result[ay].income);
    }, [result, loading]);

    useEffect(() => {
        let val = {};

        form &&
            form.map((f) => {
                val = { ...val, [getName(f.label)]: f.label === 'Salary' ? empData.salary : '' };
            });

        setInitial(val);
    }, [form]);

    return (
        <>
            {!loading && form && Object.keys(initial).length > 0 && (
                <div>
                    <Form initialValues={initial} handleSubmit={handleSubmit}>
                        {form && form.map((el) => <InputForm key={el.label} field={el} />)}
                        <SubmitButton title="Save & continue" />
                    </Form>
                </div>
            )}
        </>
    );
};

export default Income;
