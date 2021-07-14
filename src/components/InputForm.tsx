import React from 'react';
import { Field } from '../models/iFormElement';
import { TextField, SelectField } from './FormElements';
import { getName } from './utils';

const InputForm = ({
    field,
    values,
    handleChange,
    updateDetails,
}: {
    field: Field;
    values?: Record<string, string>;
    handleChange?: (e: React.SyntheticEvent) => void;
    updateDetails?: (e: React.SyntheticEvent) => void;
}): JSX.Element => {
    const getFormElement = (
        name: string,
        el: Field,
        values: Record<string, string>,
        handleChange: (e: React.SyntheticEvent) => void,
    ) => {
        const data: Field = {
            name: name,
            label: el.label,
            type: el.type,
            options: el.options ? el.options : [],
            value: el.value ? el.value : '',
            disabled: el.disabled ? el.disabled : false,
        };
        if (el.type === 'text') {
            return <TextField data={data} values={values} handleChange={handleChange} updateDetails={updateDetails} />;
        }
        if (el.type === 'dropdown') {
            return (
                <SelectField data={data} values={values} handleChange={handleChange} updateDetails={updateDetails} />
            );
        }
    };

    return !field ? <></> : <>{getFormElement(getName(field.name), field, values, handleChange)}</>;
};

export default InputForm;
