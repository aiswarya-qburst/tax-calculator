import React, { FC, useContext, useEffect, useState } from 'react';
import TabContent from './TabContent';
import Tabs from './Tabs';
import { BasicContext } from '../App';

// TODO: should this be hardcoded?
const tabs = ['income', 'deduction', 'total'];

const Sections: FC = () => {
    const [active, setActive] = useState('income');
    const { regime } = useContext(BasicContext);

    useEffect(() => {
        regime === 'new' && active === 'deduction' && setActive('income');
    }, [regime]);

    return (
        <div className="mt-8">
            <Tabs tabs={tabs} active={active} setActive={setActive} />
            <TabContent active={active} />
        </div>
    );
};

export default Sections;
