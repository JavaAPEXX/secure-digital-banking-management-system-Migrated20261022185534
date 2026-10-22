import React, { useState, useEffect } from 'react';

interface JspLoanPageComponentData {
    error?: string;
    msg?: string;
}

type JspLoanPageComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspLoanPageComponent: React.FC<JspLoanPageComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'amount': '',
        'tenure': '',
        'agree': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { error, msg } = data;

    useEffect(() => {
        // Preserved from original inline <script>:
        try {
            let time = 3;
            
                let timer = setInterval(function() {
                    time--;
                    document.getElementById("count") /* TODO: useRef */.innerText = time;
            
                    if(time <= 0){
                        clearInterval(timer);
                        window.location.href = "/customerdashboard";
                    }
                }, 1000);
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
        setBackendActionNotice("This form originally submitted to '/applyLoan' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '/applyLoan' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
        {backendActionNotice && (
            <div className="alert alert-warning" role="alert" data-apex-backend-action="unmigrated">
                {backendActionNotice}
            </div>
        )}
<div className="wrapper">
        
        <form onSubmit={handleSubmit} action="/applyLoan" method="post" onsubmit="return validateLoan()">
        
        <input type="hidden" name="amount" id="hiddenAmount" />
        
        
        <div className="header">
            <h2>💰 Personal Loan</h2>
            <p>Instant • Smart • Paperless</p>
        </div>
        
        
        <div className="card">
            <div className="label">Loan Amount</div>
            <div className="amount" id="amountText"></div>
        
        <input onChange={handleInputChange} type="range" id="amount" min="1000" max="10000" value="1000" step="500" oninput="updateLoan()" />
        </div>
        
        
        <div className="card">
            <div className="label">Loan Tenure</div>
        
            <input onChange={handleInputChange} type="range" id="tenure" min="3" max="24" value="6" oninput="updateLoan()" />
        
            <div id="tenureText" style={{ color: '#a78bfa' }}></div>
        </div>
        
        <div className="card emi">
        
            <p className="emi-label">Monthly EMI</p>
            <h2 id="emi">₹ 0</h2>
        
            <div className="divider"></div>
        
            <div className="row">
                <span className="sub-label">Total Payable</span>
                <b id="total" className="total-value"></b>
            </div>
        
            <div className="row">
                <span className="sub-label">Interest Rate</span>
                <b className="interest-value">10% fixed</b>
            </div>
        
        </div>
        
        
        <div className="card">
            <b style={{ color: '#a78bfa' }}>Eligibility</b>
            <ul>
                <li>Account older than 3 months</li>
                <li>No active loans</li>
                <li>Balance below ₹100</li>
            </ul>
        </div>
        
        
        <div className="checkbox">
            <input onChange={handleInputChange} type="checkbox" id="agree" /> Accept Terms & Conditions
        </div>
        
        <p className="error">{error}</p>
        <p className="success">{msg}</p>
        {(!!(msg)) && (<>
          
          <p className="success">
            {msg} <br />
            ⏳ Redirecting to dashboard in <span id="count">5</span> seconds...
          </p>
        
          
        
        </>)}
        
        
        <button className="apply-btn">Apply Loan</button>
        
        </form>
        
        </div>
        </>
    );
};

export default JspLoanPageComponent;
