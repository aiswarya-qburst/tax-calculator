import React, { useContext, FC, ReactElement } from 'react';
import useFetch from '../hooks/useFetch';
import { BasicContext } from '../App';
import { Slab } from '../models/common.interface';
import { useEffect } from 'react';

const getContent = (slabs: Slab): string => {
    if (slabs.start === 0) return `Upto Rs ${slabs.end}`;
    else if (!slabs.end) return `> Rs ${slabs.start}`;
    else return `Rs ${slabs.start} To Rs ${slabs.end}`;
};

const Slabs: FC = (): ReactElement => {
    const { regime, updateSlab } = useContext(BasicContext);
    const { result } = useFetch('tax-slab');
    const slab = result[regime];

    useEffect(() => {
        updateSlab(slab);
    }, [regime, result]);

    return (
        <div className="flex justify-center">
            {!slab || slab.length === 0 ? (
                <p className="text-teal-700 mt-4">Select a Regime and Assessment year</p>
            ) : (
                <div>
                    <table className="table-fixed w-full">
                        <thead>
                            <tr>
                                <th className="w-1/2">Income Slab</th>
                                <th className="w-1/2">Applicable Tax Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slab.map((s, i) => (
                                //TODO: key value should not be i
                                <tr key={i} className="bg-teal-50 text-center">
                                    <td>{getContent(s)}</td>
                                    <td>{`${s.rate}%`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Slabs;
