import React from 'react';
import { TextField, SelectField } from './FormElements';
import { Field } from '../models/common.interface';

const InputForm = ({ field }: { field: Field }): JSX.Element => {
    const getFormElement = (name: string, el: Field) => {
        const props: Field = {
            name: name,
            label: el.label,
            type: el.type,
            options: el.options,
        };

        if (el.type === 'text' || el.type === 'email') {
            return <TextField {...props} />;
        }

        if (el.type === 'dropdown') {
            return <SelectField {...props} />;
        }
    };

    return !field ? <></> : <div className="divide-y-2 divide-teal-700">{getFormElement(field.label, field)}</div>;
};

export default InputForm;
