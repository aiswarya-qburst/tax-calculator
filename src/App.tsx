import React, { createContext, useEffect, useState } from 'react';
import Basic from './components/Basic';
import Header from './components/Header';
import Sections from './components/Sections';
import { Slab, TotalTax, User } from './models/common.interface';

export const BasicContext = createContext(null);

const App: React.FunctionComponent = () => {
    const [regime, updateRegime] = useState('');
    const [slab, updateSlab] = useState([] as Array<Slab>);
    const [empData, updateEmpData] = useState({} as User);
    const [ay, updateAY] = useState('');
    const [total, updateTotal] = useState({} as TotalTax);

    const contextValue = {
        slab,
        regime,
        empData,
        ay,
        total,
        updateTotal,
        updateSlab,
    };

    return (
        <div>
            <Header tax={total} />
            <Basic updateRegime={updateRegime} updateEmpData={updateEmpData} updateAY={updateAY} />
            {Object.keys(empData).length > 0 && ay.length > 0 && regime.length > 0 && (
                <BasicContext.Provider value={contextValue}>
                    <Sections />
                </BasicContext.Provider>
            )}
        </div>
    );
};

export default App;
