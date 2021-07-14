import React from 'react';
import { Field } from '../models/iFormElement';
import { Form, FormSubmitButton, UtilityButton } from './FormElements';
import InputForm from './InputForm';

const formData: Field[] = [
    {
        label: 'Type of income',
        type: 'text',
        name: 'income_type',
    },
];

const Modal = ({
    show,
    handleShow,
    setNewField,
}: {
    show: boolean;
    handleShow: (b: boolean) => void;
    setNewField: (f: Record<string, string>) => void;
}): JSX.Element => {
    const handleSubmit = (data: Record<string, string>) => {
        const newField = { [data.income_type]: '' };
        setNewField(newField);
        handleShow(false);
    };

    return (
        show && (
            <div className="modal">
                <Form initialValues={{ initial: formData }} handleSubmit={handleSubmit}>
                    {formData.map((f) => (
                        <InputForm key={f.name} field={f} />
                    ))}
                    <FormSubmitButton title="Add" />
                    <UtilityButton title="Close" handleClick={() => handleShow(false)} />
                </Form>
            </div>
        )
    );
};

export default Modal;
