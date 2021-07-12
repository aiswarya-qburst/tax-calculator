import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { BasicContext } from '../App';
import { Slab } from '../models/iSlab';

const getContent = (slabs: Slab): string => {
    if (slabs.start === 0) return `Upto Rs ${slabs.end}`;
    else if (!slabs.end) return `> Rs ${slabs.start}`;
    else return `Rs ${slabs.start} To Rs ${slabs.end}`;
};

const Slabs: FC = (): ReactElement => {
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const { regime, updateSlab } = useContext(BasicContext);
    const { result } = useFetch('tax-slab');
    const slab = result[regime];

    useEffect(() => {
        updateSlab(slab);
    }, [regime, result]);

    return (
        <div className={`slab-section ${isExpanded ? 'expanded' : ''}`} onClick={() => setExpanded(!isExpanded)}>
            <p className="slab-header">
                {`Tax Slab`}
                <span className="slab-header-icon">{isExpanded ? '-' : '+'}</span>
            </p>
            <div className="flex justify-center">
                {!slab || slab.length === 0 ? (
                    <p className="text-teal-700 mt-4">Select a Regime</p>
                ) : (
                    <div className="table-wrapper my-4">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="w-1/2">Income Slab</th>
                                    <th className="w-1/2">Applicable Tax Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slab.map((s, i) => (
                                    //TODO: key value should not be i
                                    <tr key={i}>
                                        <td>{getContent(s)}</td>
                                        <td>{`${s.rate}%`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Slabs;
