import React from 'react';

//: React.FunctionComponent<TotalTax>
const Header = ({ tax }: { tax: number }): JSX.Element => {
    return (
        <div className="h-20 m-6">
            <div className="header">
                <div className="text-teal-700 text-2xl inline-block pt-5">Income Tax Calculator</div>
                <div className="total">
                    <div>
                        <p>Annual Tax Amount</p>
                        <p>{tax || '-'}</p>
                    </div>
                    <div>
                        <p>Monthly Payable</p>
                        <p>{tax / 12 || '-'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
