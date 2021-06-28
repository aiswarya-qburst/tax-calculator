import React, { useEffect, useState } from 'react';
import { Form } from './FormElements';
import InputForm from './InputForm';
import { Field } from '../models/common.interface';

interface Data {
    [key: string]: Array<Field>;
}

const general: Data = {
    basic: [
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
            type: 'text',
            label: 'Employee ID',
        },
    ],
};

const Sections: React.FunctionComponent = () => {
    const [active, setActive] = useState('basic');
    const [data, updateData] = useState(general);

    useEffect(() => {
        fetch('http://localhost:8000/forms')
            .then((res) => res.json())
            .then((forms) => updateData({ ...data, ...forms.current }));
    }, []);

    return (
        <div className="mt-8">
            <ul className="mx-8">
                {data &&
                    Object.keys(data).map((d) => (
                        <li
                            key={d}
                            className={`inline-block p-4 w-48 text-center text-teal-700 ${
                                d === active ? 'shadow-inner bg-teal-50' : ''
                            }`}
                            onClick={() => setActive(d)}
                        >
                            {d.toUpperCase()}
                        </li>
                    ))}
            </ul>
            <div>
                {data &&
                    Object.keys(data).map((d) => (
                        <div key={d} style={{ display: `${d === active ? 'block' : 'none'}` }}>
                            <Form initialValues={data}>
                                {Object.values(data[d]).map((el) => (
                                    <InputForm key={d} field={el} />
                                ))}
                            </Form>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Sections;
