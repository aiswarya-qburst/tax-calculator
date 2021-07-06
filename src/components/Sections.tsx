import React, { FC, useState } from 'react';
import TabContent from './TabContent';
import Tabs from './Tabs';

const tabs = ['tax-slab', 'income', 'deduction', 'total'];

const Sections: FC = () => {
    const [active, setActive] = useState('tax-slab');

    return (
        <div className="mt-8">
            <Tabs tabs={tabs} active={active} setActive={setActive} />
            <TabContent active={active} />
        </div>
    );
};

export default Sections;
