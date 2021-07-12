import React from 'react';
import { TotalTax } from '../models/iTax';

/**
 * Separate out camel case text. eg: camelCase -> Camel Case
 * @param text text to format
 * @returns formatted text
 */
const formatText = (text: string): string => {
    const result = text.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
};

const Total = ({ total }: { total: TotalTax }): JSX.Element => {
    return (
        <div className="table-wrapper mt-10">
            <table className="table">
                <tbody>
                    {Object.entries(total).map(([key, value]) => (
                        <tr key={key}>
                            <td>{formatText(key)}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Total;
