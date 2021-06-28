import React, { ReactNode } from 'react';
import { Formik, Form as FormikForm, Field as FormField, ErrorMessage, useFormikContext } from 'formik';
import { Field } from '../models/common.interface';

interface FormF {
    children: ReactNode;
    initialValues: Record<string, unknown>;
}

interface Button {
    title: string;
    handler?: (e: React.MouseEventHandler<React.SyntheticEvent>) => void;
}

export const Form: React.FunctionComponent<FormF> = (props: FormF) => {
    const onSubmit = (values, { setSubmitting }) => setSubmitting(false);

    return (
        <Formik {...props} onSubmit={onSubmit}>
            <FormikForm className="mx-8 p-8 space-y-3">{props.children}</FormikForm>
        </Formik>
    );
};

export const TextField: React.FunctionComponent<Field> = ({ name, label, ...rest }: Field) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {label && <label htmlFor={name}>{label}</label>}
            <FormField
                className="col-span-2 border border-gray-500 focus:border-blue-500 rounded pl-5 h-10"
                type="text"
                name={name}
                id={name}
                {...rest}
            />
            <ErrorMessage name={name} render={(msg) => <div style={{ color: 'red' }}>{msg}</div>} />
        </div>
    );
};

export const SelectField: React.FunctionComponent<Field> = ({ name, label, options }: Field) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {label && <label htmlFor={name}>{label}</label>}
            <FormField
                as="select"
                id={name}
                name={name}
                className="col-span-2 border border-gray-500 focus:border-blue-500 rounded pl-5 h-10"
            >
                <option value="">Choose...</option>
                {options.map((optn) => (
                    <option key={optn.value} value={optn.value} label={optn.label || optn.value} />
                ))}
            </FormField>
            <ErrorMessage name={name} render={(msg) => <div style={{ color: 'red' }}>{msg}</div>} />
        </div>
    );
};

export const SubmitButton: React.FunctionComponent<Button> = ({ title, ...rest }: Button) => {
    const { isSubmitting } = useFormikContext();

    return (
        <button type="submit" {...rest} disabled={isSubmitting}>
            {title}
        </button>
    );
};
