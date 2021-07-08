import React from 'react';
import { Formik, Field as FormField, ErrorMessage, useFormikContext } from 'formik';
import { FForm } from '../models/form.interface';
import { Button, Field } from '../models/formelement.interface';

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
    updateDetails,
}: {
    data: Field;
    values?: Record<string, string>;
    handleChange?: (e: React.SyntheticEvent) => void;
    updateDetails?: (e: React.SyntheticEvent) => void;
}): JSX.Element => {
    const { name, label, disabled } = data;

    const onChangeHandler = (e) => {
        handleChange(e);
        updateDetails && updateDetails(e);
    };

    return (
        <div className="form-control-wrapper">
            {label && <label htmlFor={name}>{label}</label>}
            <FormField
                className={`form-control ${disabled ? 'cursor-not-allowed' : 'cursor-auto'}`}
                type="text"
                name={name}
                id={name}
                readOnly={disabled}
                onChange={onChangeHandler}
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
    updateDetails,
}: {
    data: Field;
    values?: Record<string, string>;
    handleChange?: (e: React.SyntheticEvent) => void;
    updateDetails?: (e: React.SyntheticEvent) => void;
}): JSX.Element => {
    const { name, label, options } = data;

    //TODO: copy pasted
    const onChangeHandler = (e) => {
        handleChange(e);
        updateDetails && updateDetails(e);
    };

    return (
        <div className="form-control-wrapper">
            {label && <label htmlFor={name}>{label}</label>}
            <FormField
                as="select"
                id={name}
                name={name}
                className="form-control"
                onChange={onChangeHandler}
                value={values[name]}
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

export const SubmitButton: React.FunctionComponent<Button> = ({ title }: Button) => {
    const { isSubmitting } = useFormikContext();

    return (
        <button type="submit" disabled={isSubmitting} className="submit-btn">
            {title}
        </button>
    );
};
