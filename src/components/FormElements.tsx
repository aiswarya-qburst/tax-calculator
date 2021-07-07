import React from 'react';
import { Formik, Field as FormField, ErrorMessage, useFormikContext } from 'formik';
import { Field } from '../models/common.interface';

interface FForm {
    children: any;
    initialValues: Record<string, unknown>;
    handleSubmit?: (values: Record<string, unknown>) => void;
}

interface Button {
    title: string;
    handleSubmit?: (e: React.MouseEventHandler<React.SyntheticEvent>) => void;
}

export const Form = (props: FForm): JSX.Element => {
    const onSubmit = (values, { setSubmitting }) => {
        props.handleSubmit(values);
        setSubmitting(false);
    };

    return (
        <Formik initialValues={props.initialValues} onSubmit={onSubmit}>
            {(formProps) => (
                <form className="mx-8 p-8 space-y-3" onSubmit={formProps.handleSubmit}>
                    {React.Children.map(props.children, (child) =>
                        React.cloneElement(child, { values: formProps.values, handleChange: formProps.handleChange }),
                    )}
                </form>
            )}
        </Formik>
    );
};

//: React.FunctionComponent<Field>
export const TextField = ({
    data,
    values,
    handleChange,
}: {
    data: Field;
    values?: Record<string, string>;
    handleChange?: (e: React.SyntheticEvent) => void;
}): JSX.Element => {
    const { name, label, disabled } = data;

    return (
        <div className="form-control-wrapper">
            {label && <label htmlFor={name}>{label}</label>}
            <FormField
                className={`form-control ${disabled ? 'cursor-not-allowed' : 'cursor-auto'}`}
                type="text"
                name={name}
                id={name}
                readOnly={disabled}
                onChange={handleChange}
                value={values[name]}
            />
            <ErrorMessage name={name} render={(msg) => <div style={{ color: 'red' }}>{msg}</div>} />
        </div>
    );
};

export const SelectField = ({
    data,
    values,
    handleChange,
}: {
    data: Field;
    values?: Record<string, string>;
    handleChange?: (e: React.SyntheticEvent) => void;
}): JSX.Element => {
    const { name, label, options } = data;

    return (
        <div className="form-control-wrapper">
            {label && <label htmlFor={name}>{label}</label>}
            <FormField as="select" id={name} name={name} className="form-control" onChange={handleChange}>
                <option value="">Choose...</option>
                {options.map((optn) => (
                    <option key={optn.value} value={optn.value} label={optn.label || optn.value} />
                ))}
            </FormField>
            <ErrorMessage name={name} render={(msg) => <div style={{ color: 'red' }}>{msg}</div>} />
        </div>
    );
};

export const SubmitButton: React.FunctionComponent<Button> = ({ title }: Button) => {
    const { isSubmitting } = useFormikContext();

    return (
        <button type="submit" disabled={isSubmitting} className="submit-btn">
            {title}
        </button>
    );
};
