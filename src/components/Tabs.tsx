import React, { useContext } from 'react';
import { BasicContext } from '../App';

const Tabs = ({
    tabs,
    active,
    setActive,
}: {
    tabs: string[];
    active: string;
    setActive: (tab: string) => void;
}): JSX.Element => {
    const { regime } = useContext(BasicContext);
    return (
        <ul className="list">
            {tabs.map((tab) => (
                <>
                    {regime === 'new' && tab === 'deduction' ? (
                        <></>
                    ) : (
                        <li
                            key={tab}
                            className={`tab ${active === tab ? 'active' : ''}`}
                            onClick={() => setActive(tab)}
                        >
                            {tab.toUpperCase()}
                        </li>
                    )}
                </>
            ))}
        </ul>
    );
};

export default Tabs;
