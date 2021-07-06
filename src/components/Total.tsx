import React from 'react';
import { TotalTax } from '../models/common.interface';

const Total = ({ total }: { total: TotalTax }): JSX.Element => {
    return (
        <div className="m-14">
            <p className="m-5">{`Total Income: Rs ${total.totalIncome}`}</p>
            <p className="m-5">{`Total Deduction: Rs ${total.totalDeduction}`}</p>
            <p className="m-5">{`Total Income after all deductions: Rs ${total.netTaxIncome}`}</p>
            <p className="m-5">{`Annual Tax Amount: Rs ${total.annual}`}</p>
            <p className="m-5">{`Monthly Payable: Rs ${total.annual / 12}`}</p>
        </div>
    );
};

export default Total;
