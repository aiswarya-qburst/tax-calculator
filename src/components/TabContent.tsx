import React, { useContext, useEffect, useState } from 'react';
import GenerateForm from './GenerateForm';
// import Income from './Income';
import Slabs from './Slabs';
import Total from './Total';
import { BasicContext } from '../App';

const TabContent = ({ active }: { active: string }): JSX.Element => {
    const [income, updateIncome] = useState(0);
    const [deduction, updateDeduction] = useState(0);

    const { totalTax, updateTotal } = useContext(BasicContext);

    useEffect(() => {
        updateTotal({ income, deduction });
    }, [income, deduction]);

    return (
        <div>
            {active === 'tax-slab' && <Slabs />}
            {active === 'income' && <GenerateForm formType="income" handleSectionTotalUpdate={updateIncome} />}
            {active === 'deduction' && <GenerateForm formType="deduction" handleSectionTotalUpdate={updateDeduction} />}
            {active === 'total' && <Total total={totalTax} />}
        </div>
    );
};

export default TabContent;
