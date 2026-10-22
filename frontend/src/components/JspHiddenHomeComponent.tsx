import React from 'react';

interface JspHiddenHomeComponentData {
    main_balance?: string;
    hidden?: string;
}

type JspHiddenHomeComponentProps = {
    data?: Record<string, any>;
};

export const JspHiddenHomeComponent: React.FC<JspHiddenHomeComponentProps> = ({ data = {} }) => {
    const { hidden, main_balance } = data;

    return (
        <>
<div className="card">
        
            <h2>&#128374; Hidden Wallet</h2>
        
            
            <div className="balance-box">
        
                <div className="box">
                    <h4>Main Balance</h4>
                    <p>&#8377;{main_balance}</p>
                </div>
        
                <div className="box">
                    <h4>Hidden Balance</h4>
                    <p style={{ color: '#00ffcc' }}>&#8377;{hidden}</p>
                </div>
        
            </div>
        
            
            <button className="btn add" onclick=" location.href='/hidden_deposit'">
                &#128176; Add Money
            </button>
        
            <button className="btn withdraw" onclick=" location.href='/hidden_dashboard'">
                &#128184 Withdraw Money
            </button>
        
        </div>
        </>
    );
};

export default JspHiddenHomeComponent;
