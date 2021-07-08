import React, { FC, useContext, useState } from 'react';
import TabContent from './TabContent';
import Tabs from './Tabs';
import { BasicContext } from '../App';
import { useEffect } from 'react';

const tabs = ['tax-slab', 'income', 'deduction', 'total'];

const Sections: FC = () => {
    const [active, setActive] = useState('tax-slab');
    const { regime } = useContext(BasicContext);

    useEffect(() => {
        setActive('tax-slab');
    }, [regime]);

    return (
        <div className="mt-8">
            <Tabs tabs={tabs} active={active} setActive={setActive} />
            <TabContent active={active} />
        </div>
    );
};

export default Sections;
