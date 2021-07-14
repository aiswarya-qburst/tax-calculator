import React, { useContext, useEffect, useState } from 'react';
import { Form, FormSubmitButton, UtilityButton } from './FormElements';
import InputForm from './InputForm';
import useFetch from '../hooks/useFetch';
import { BasicContext } from '../App';
import { SerializedData } from '../models/iForm';
import { Field } from '../models/iFormElement';
import { getTotal } from './taxEngine/taxCalculator';
import { getName, getLocalStorage, setLocalStorage } from './utils';
import { useCallback } from 'react';
import Modal from './Modal';

const formatData = (data: Record<string, string>): Field[] => {
    return Object.entries(data).map(([key, value]) => {
        return { label: key, type: 'text', value: value, name: getName(key) };
    });
};

const GenerateForm = ({
    formType,
    handleSectionTotalUpdate,
}: {
    formType: string;
    handleSectionTotalUpdate: (e: number) => void;
}): JSX.Element => {
    const [form, updateForm] = useState([] as Field[]);
    const [formData, updateFormData] = useState({} as SerializedData);
    const [showAddNewFieldModal, setShowAddNewFieldModal] = useState(false);
    const [newField, setNewField] = useState({} as Record<string, string>);

    const { regime, empData } = useContext(BasicContext);

    const { result, loading } = useFetch(formType);

    const getSavedForm = useCallback(() => JSON.parse(getLocalStorage(formType)), [formType]);

    const handleSubmit = (serializedData: Record<string, string>) => {
        setLocalStorage(formType, serializedData);
        const total: number = getTotal(Object.values(serializedData).map(Number));
        handleSectionTotalUpdate(total);
    };

    const handleAddNewFieldClick = () => {
        setShowAddNewFieldModal(true);
    };

    useEffect(() => {
        const savedForm = getSavedForm();
        if (savedForm && Object.keys(savedForm).length > 0) {
            updateForm(formatData(savedForm));
        } else {
            !loading && result && updateForm(result[formType]);
        }
    }, [result, loading]);

    useEffect(() => {
        if (Object.keys(newField).length > 0) {
            const updatedFormData = { ...formData, ...newField };

            setLocalStorage(formType, updatedFormData);
            updateForm(formatData(updatedFormData));
        }
    }, [newField]);

    useEffect(() => {
        const savedForm = getSavedForm();
        let val = {};
        if (savedForm && Object.keys(savedForm).length > 0) {
            val = savedForm;
        } else {
            form &&
                form.map((f) => {
                    val = { ...val, [f.name]: f.name === 'salary' ? empData.salary : '' };
                });
        }
        updateFormData(val);
    }, [form]);

    return !regime || empData.length === 0 ? (
        <p className="text-teal-700 mt-4 flex justify-center">Select a Regime</p>
    ) : (
        <>
            {!loading && form && Object.keys(formData).length > 0 && (
                <div>
                    <Form initialValues={formData} handleSubmit={handleSubmit}>
                        {form && form.map((el) => <InputForm key={el.name} field={el} />)}
                        <FormSubmitButton title="Save & continue" />
                        <UtilityButton title="Add other income" handleClick={handleAddNewFieldClick} />
                    </Form>
                    <Modal show={showAddNewFieldModal} handleShow={setShowAddNewFieldModal} setNewField={setNewField} />
                </div>
            )}
        </>
    );
};

export default GenerateForm;
