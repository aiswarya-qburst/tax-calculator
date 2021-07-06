import React, { useContext, useEffect, useState } from 'react';
import { Form } from './FormElements';
import InputForm from './InputForm';
import useFetch from '../hooks/useFetch';
import { BasicContext } from '../App';
import { Field } from '../models/common.interface';

const Dedcution = () => {
    const [form, updateForm] = useState([] as Field[]);
    const { ay, regime } = useContext(BasicContext);
    const { result, loading } = useFetch('deduction');

    useEffect(() => {
        !loading && updateForm(result[ay].deduction);
    }, [result, loading]);

    return regime === 'new' ? (
        <></>
    ) : (
        <>
            {!loading && (
                <div>
                    <Form initialValues={{ form: form }}>
                        {form && form.map((el) => <InputForm key={el.label} field={el} />)}
                    </Form>
                </div>
            )}
        </>
    );
};

export default Dedcution;
