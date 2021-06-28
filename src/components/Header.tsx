import React from 'react';

const Header: React.FunctionComponent = () => {
    return (
        <div className="h-20 m-6">
            <div className="header">
                <div className="text-teal-700 text-2xl inline-block pt-5">Income Tax Calculator</div>
                <div className="total">
                    <div>
                        <p>Total Taxable Income</p>
                        <p>5,50,000</p>
                    </div>
                    <div>
                        <p>Monthly Payable</p>
                        <p>2500</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
