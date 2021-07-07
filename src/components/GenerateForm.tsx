import React, { useContext, useEffect, useState } from 'react';
import { Form, SubmitButton } from './FormElements';
import InputForm from './InputForm';
import useFetch from '../hooks/useFetch';
import { BasicContext } from '../App';
import { Initial, Field } from '../models/common.interface';
import { getTotal } from './taxEngine/taxCalculator';
import { getName } from './utils';

const GenerateForm = ({
    formType,
    handleSectionTotalUpdate,
}: {
    formType: string;
    handleSectionTotalUpdate: (e: number) => void;
}): JSX.Element => {
    const [form, updateForm] = useState([] as Field[]);
    const [initial, setInitial] = useState({} as Initial);
    const { ay, empData } = useContext(BasicContext);
    const { result, loading } = useFetch(formType);

    const handleSubmit = (fieldData: Record<string, string>) => {
        const total: number = getTotal(Object.values(fieldData).map(Number));
        handleSectionTotalUpdate(total);
    };

    useEffect(() => {
        !loading && result && result[ay] && updateForm(result[ay][formType]);
    }, [result, loading]);

    useEffect(() => {
        let val = {};

        form &&
            form.map((f) => {
                val = { ...val, [getName(f.label)]: f.label === 'Salary' ? empData.salary : '' };
            });

        setInitial(val);
    }, [form]);

    return ay.length === 0 || empData.length === 0 ? (
        <p className="text-teal-700 mt-4 flex justify-center">Select a Regime and Assessment year</p>
    ) : (
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

export default GenerateForm;
