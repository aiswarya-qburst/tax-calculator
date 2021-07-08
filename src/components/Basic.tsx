import React, { useCallback } from 'react';
import { Form } from './FormElements';
import InputForm from './InputForm';
import { Field } from '../models/formelement.interface';
import { User } from '../models/user.interface';

const general: Field[] = [
    {
        type: 'text',
        label: 'Employee ID',
    },
    {
        type: 'dropdown',
        label: 'Regime',
        required: true,
        options: [
            {
                label: 'Old Regime',
                value: 'old',
            },
            {
                label: 'New Regime',
                value: 'new',
            },
        ],
    },
    {
        type: 'dropdown',
        label: 'Assessment year',
        required: true,
        options: [
            {
                label: '2020-21',
                value: '20-21',
            },
            {
                label: '2021-22',
                value: '21-22',
            },
        ],
    },
];

//: React.FunctionComponent
const Basic = ({
    updateRegime,
    updateEmpData,
    updateAY,
}: {
    updateRegime: (r: string) => void;
    updateEmpData: (e: User) => void;
    updateAY: (a: string) => void;
}): JSX.Element => {
    const setBasicDetails = useCallback((empid: number) => {
        fetch(`http://localhost:8000/users/${empid}`)
            .then((res) => res.json())
            .then((empData) => {
                //TODO: Should send whole empData?
                updateEmpData(empData);
            });
    }, []);

    const handleChange = (e) => {
        //TODO: Dont hardcode
        if (e.target.name === 'employee_id') {
            setBasicDetails(Number(e.target.value));
        }
        if (e.target.name === 'regime') {
            updateRegime(e.target.value);
        }
        if (e.target.name === 'assessment_year') {
            updateAY(e.target.value);
        }
    };

    return (
        <div className="basic-section">
            <Form initialValues={{ initial: general }}>
                {general.map((g) => (
                    <InputForm key={g.label} field={g} updateDetails={handleChange} />
                ))}
            </Form>
        </div>
    );
};

export default Basic;
