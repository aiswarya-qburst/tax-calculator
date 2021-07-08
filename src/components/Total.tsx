import React from 'react';
import { TotalTax } from '../models/common.interface';

const Total = ({ total }: { total: TotalTax }): JSX.Element => {
    return (
        <div className="m-14">
            <div className="total-section">
                <p className="m-5">{`Total Income: Rs ${total.totalIncome}`}</p>
                <p className="m-5">{`Total Deduction: Rs ${total.totalDeduction}`}</p>
                <p className="m-5 font-bold">{`Net taxable income after all deductions: Rs ${total.netTaxIncome}`}</p>
            </div>
            <div className="mt-10">
                <table className="total-table">
                    <thead>
                        <tr>
                            <th className="w-1/3">Tax Slab</th>
                            <th className="w-1/3">Tax Rate</th>
                            <th className="w-1/3">Tax</th>
                        </tr>
                    </thead>
                    <tbody>
                        {total.taxWithDescription.resultOfEachStage.map((r, i) => (
                            //TODO: key value should not be i
                            <tr key={i} className="bg-teal-50 text-center">
                                <td>{r.range}</td>
                                <td>{r.rate}</td>
                                <td>{r.totalOfStage}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="total-section mt-10">
                <p className="m-5">{`Annual Tax Amount: Rs ${total.taxWithDescription.annual}`}</p>
                <p className="m-5 font-bold">{`Annual Tax Amount with ${total.cess}% cess: Rs ${total.withCess}`}</p>
                <p className="m-5">{`Monthly Payable: Rs ${total.withCess / 12}`}</p>
            </div>
        </div>
    );
};

export default Total;
