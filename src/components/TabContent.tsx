import React, { useContext, useEffect, useState } from 'react';
import Deduction from './Deduction';
import Income from './Income';
import Slabs from './Slabs';
import Total from './Total';
import { getTotalTax, getTotalIncome } from './taxEngine/taxCalculator';
import { BasicContext } from '../App';
import { TotalTax } from '../models/common.interface';

const TabContent = ({ active }: { active: string }): JSX.Element => {
    const [income, updateIncome] = useState(0);
    const [deduction, updateDeduction] = useState(0);

    const { slab, total, updateTotal } = useContext(BasicContext);

    useEffect(() => {
        const total: TotalTax = {
            totalIncome: income,
            totalDeduction: deduction,
            netTaxIncome: getTotalIncome(income, deduction),
            annual: getTotalTax(getTotalIncome(income, deduction), slab),
        };

        updateTotal(total);
    }, [income, deduction]);

    return (
        <div>
            {active === 'tax-slab' && <Slabs />}
            {active === 'income' && <Income handleIncomeUpdate={updateIncome} />}
            {active === 'deduction' && <Deduction />}
            {active === 'total' && <Total total={total} />}
        </div>
    );
};

export default TabContent;
