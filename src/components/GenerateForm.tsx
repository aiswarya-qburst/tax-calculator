import React, { useContext, useEffect, useState } from 'react';
import { Form, SubmitButton } from './FormElements';
import InputForm from './InputForm';
import useFetch from '../hooks/useFetch';
import { BasicContext } from '../App';
import { Initial } from '../models/form.interface';
import { Field } from '../models/formelement.interface';
import { getTotal } from './taxEngine/taxCalculator';
import { getName } from './utils';
import { useCallback } from 'react';

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
        localStorage.setItem(formType, JSON.stringify(fieldData));
        const total: number = getTotal(Object.values(fieldData).map(Number));
        handleSectionTotalUpdate(total);
    };

    const getSavedForm = useCallback(() => JSON.parse(localStorage.getItem(formType)), [formType]);

    useEffect(() => {
        !loading && result && result[ay] && updateForm(result[ay][formType]);
    }, [ay, result, loading]);

    useEffect(() => {
        const savedForm = getSavedForm();
        let val = {};

        form &&
            form.map((f) => {
                const name = getName(f.label);
                const fieldValue = !savedForm ? '' : savedForm[name];

                val = { ...val, [name]: f.label === 'Salary' ? empData.salary : fieldValue };
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
