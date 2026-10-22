import React, { useState, useEffect } from 'react';

type JspHiddenDepositComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspHiddenDepositComponent: React.FC<JspHiddenDepositComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'amount': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");

    useEffect(() => {
        // Preserved from original inline <script>:
        try {
            function setAmount(val){
                document.getElementById("amount") /* TODO: useRef */.value = val;
            }
        } catch(e) {}
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name) setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) {
            await onSubmit(formData);
            return;
        }
        setBackendActionNotice("This form originally submitted to '/hide_money' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
    };

    const handleBackendAction = async (
        e: React.MouseEvent<HTMLElement>,
        action: string = "",
    ) => {
        e.preventDefault();
        if (onSubmit) {
            await onSubmit(formData);
            return;
        }
        setBackendActionNotice(
            action
                ? `The original backend action '${action}' has not been migrated to an API endpoint, so the action was not sent.`
                : "This form originally submitted to '/hide_money' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
        {backendActionNotice && (
            <div className="alert alert-warning" role="alert" data-apex-backend-action="unmigrated">
                {backendActionNotice}
            </div>
        )}
<div className="card">
        
            <div className="title">&#128176; Add to Hidden Wallet</div>
            <div className="subtitle">Securely move money to your hidden balance</div>
        
            <form onSubmit={handleSubmit} action="/hide_money" method="post">
        
                <input onChange={handleInputChange} type="number" id="amount" name="amount" placeholder="Enter amount" required />
        
                <div className="quick">
                    <button type="button" onclick="setAmount(500)">+500</button>
                    <button type="button" onclick="setAmount(1000)">+1000</button>
                    <button type="button" onclick="setAmount(5000)">+5000</button>
                </div>
        
                <button className="main-btn">Add Money</button>
        
            </form>
        
            
            <div className="nav">
                <a href="/hidden_dashboard" className="withdraw">&#128184; Withdraw</a>
                <a href="/customerdashboard" className="dashboard">&#127968; Dashboard</a>
            </div>
        
        </div>
        </>
    );
};

export default JspHiddenDepositComponent;
