import React, { createContext, Suspense, useEffect, useState } from 'react';
import Basic from './components/Basic';
import Header from './components/Header';
import { getTotalTax, getTotalIncome, getWithCess } from './components/taxEngine/taxCalculator';
import { Slab } from './models/iSlab';
import { Amount, TotalTax } from './models/iTax';
import { User } from './models/iUser';
const Sections = React.lazy(() => import('./components/Sections'));

export const BasicContext = createContext(null);

const App: React.FunctionComponent = () => {
    const [regime, updateRegime] = useState('');
    const [slab, updateSlab] = useState([] as Array<Slab>);
    const [empData, updateEmpData] = useState({} as User);
    const [ay, updateAY] = useState('');
    const [total, updateTotal] = useState({} as Amount);
    const [totalTax, updateTotalTax] = useState({} as TotalTax);

    const contextValue = {
        slab,
        regime,
        empData,
        ay,
        totalTax,
        updateTotal,
        updateSlab,
    };

    useEffect(() => {
        const totalIncome = getTotalIncome(total.income, total.deduction);
        const totalTax = getTotalTax(totalIncome, slab);
        const totalTaxWithCess = getWithCess(totalTax.annual, 4);

        const totalTaxAmount: TotalTax = {
            totalIncome: total.income,
            totalDeduction: total.deduction,
            netTaxIncome: totalIncome,
            taxWithDescription: totalTax,
            cess: 4,
            withCess: totalTaxWithCess,
        };

        updateTotalTax(totalTaxAmount);
    }, [regime, slab, total]);

    useEffect(() => {
        window.onbeforeunload = () => {
            localStorage.clear();
        };
    });

    return (
        <div>
            <Header tax={Object.keys(totalTax).length ? totalTax.withCess : 0} />
            <Basic updateRegime={updateRegime} updateEmpData={updateEmpData} updateAY={updateAY} />
            <BasicContext.Provider value={contextValue}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Sections />
                </Suspense>
            </BasicContext.Provider>
        </div>
    );
};

export default App;
