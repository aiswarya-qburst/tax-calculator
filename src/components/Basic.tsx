import React from 'react';
import { Form } from './FormElements';
import InputForm from './InputForm';
import { Field } from '../models/iFormElement';

const regime: Field = {
    type: 'dropdown',
    label: 'Regime',
    name: 'regime',
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
};

//: React.FunctionComponent
const Basic = ({ updateRegime }: { updateRegime: (r: string) => void }): JSX.Element => {
    // const setBasicDetails = useCallback((empid: number) => {
    //     fetch(`http://localhost:8000/users/${empid}`)
    //         .then((res) => res.json())
    //         .then((empData) => {
    //             //TODO: Should send whole empData?
    //             updateEmpData(empData);
    //         });
    // }, []);

    const handleChange = (e) => {
        //TODO: Dont hardcode
        if (e.target.name === 'regime') {
            updateRegime(e.target.value);
        }
        // if (e.target.name === 'assessment_year') {
        //     updateAY(e.target.value);
        // }
    };

    return (
        <div className="basic-section">
            <Form initialValues={{ regime }}>
                <InputForm field={regime} updateDetails={handleChange} />
            </Form>
        </div>
    );
};

export default Basic;
