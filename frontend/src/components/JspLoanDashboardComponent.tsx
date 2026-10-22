import React, { useState, useEffect } from 'react';

interface JspLoanDashboardComponentData {
    creditScore?: string;
    msg?: string;
    error?: string;
    totalLoan?: number;
    loanCount?: number;
}

type JspLoanDashboardComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspLoanDashboardComponent: React.FC<JspLoanDashboardComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'loanId': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { activeLoans, closedLoans, creditScore, error, loanCount, msg, totalLoan } = data;

    const progress = l.progress;
    const progress = l.progress;

    useEffect(() => {
        // Preserved from original inline <script>:
        try {
            var el = document.getElementById("bar-${l.loan_id}") /* TODO: useRef */;
                        if(el){
                            el.style.width = "${progress}%";
                        }
            document.getElementById("bar-${l.loan_id}") /* TODO: useRef */.style.width = "${progress}%";
            let score = parseInt("${creditScore}") || 300;
            
                let label = "Poor";
                let color = "#ef4444";
            
                if(score >= 800){
                    label = "Excellent";
                    color = "#16a34a";
                } else if(score >= 740){
                    label = "Very Good";
                    color = "#84cc16";
                } else if(score >= 670){
                    label = "Good";
                    color = "#facc15";
                } else if(score >= 580){
                    label = "Fair";
                    color = "#f97316";
                }
            
                document.getElementById("scoreLabel") /* TODO: useRef */.innerText = label;
                document.querySelector(".score").style.color = color;
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
        setBackendActionNotice("This form originally submitted to '/payEmi' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '/payEmi' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
        {backendActionNotice && (
            <div className="alert alert-warning" role="alert" data-apex-backend-action="unmigrated">
                {backendActionNotice}
            </div>
        )}
<div className="credit-card">
        
            <h3>💳 Credit Score</h3>
        
            <div className="score">{creditScore}</div>
        
            <div className="score-label" id="scoreLabel"></div>
        
        </div>
        
        <div className="container">
        
            
            <div className="header">
                <h2>💰 Loan Dashboard</h2>
                <p style={{ color: '#94a3b8' }}>Your EMI & Loan Details</p>
            </div>
        
            
            {(!!(msg)) && (<>
                <div className="msg success">{msg}</div>
            </>)}
        
            {(!!(error)) && (<>
                <div className="msg error">{error}</div>
            </>)}
        
            
            <div className="summary">
                <h3>Total Loan</h3>
                <h1>₹ {totalLoan}</h1>
                <p>Active Loans: {loanCount}</p>
            </div>
        
            
          {(!!(activeLoans)) && (<>
            <h3 style={{ color: 'white', marginTop: '20px' }}>Active Loans</h3>
        </>)}
        
        {(!activeLoans) && (<>
            <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '15px' }}>
            🎉 You have no active loans
        </p>
        </>)}
        
        {activeLoans && activeLoans?.map((l: any, index: number) => (<>
        
                <div className="loan-card">
                    
        
                    <div className="amount">₹ {l.amount}</div>
        
                    <div className="emi">EMI ₹ {l.emi}</div>
        
                  <div style={{ fontSize: '12px', color: '#facc15', marginTop: '5px' }}>
            ⏳ Next EMI: {l.next_due_date}
        </div>
        
                    <div className="status">
                        Status: {l.status}
                    </div>
        
                    {(l.penalty > 0) && (<>
            <div style={{ color: '#f87171', fontSize: '12px', marginTop: '5px' }}>
                ⚠️ Penalty: ₹ {l.penalty}
            </div>
        </>)}
        
                    
                    <div style={{ marginTop: '10px' }}>
                        EMI Paid: {l.safePaid} / {l.tenure}
        
                        <div className="progress-bg">
                            <div className="progress-bar" id="bar-{l.loan_id}"></div>
                        </div>
                    </div>
        
                    
                    {
        
                        (l.paid_emi >= l.tenure) ? (<>
                            <button className="pay-btn completed" disabled>
                                Loan Completed ✅
                            </button>
                        </>) :
        
                        (<>
                            <form onSubmit={handleSubmit} action="/payEmi" method="post">
                                <input type="hidden" name="loanId" value={l.loan_id} />
                                <button className="pay-btn">Pay EMI</button>
                            </form>
                        </>)
        
                    }
        
                </div>
        
                
                
        
            </>))}
        
            <hr style={{ border: '1px solid rgba(255,255,255,0.1)', margin: '20px 0' }} />
        
            {(!!(closedLoans)) && (<>
            <h3 style={{ color: 'white', marginTop: '25px' }}>Closed Loans</h3>
        </>)}
        
        {closedLoans && closedLoans?.map((l: any, index: number) => (<>
        
            <div className="loan-card">
        
                <div className="amount">₹ {l.amount}</div>
        
                <div className="emi">EMI ₹ {l.emi}</div>
        
                <div className="status">Status: Closed ✅</div>
        
                <div style={{ fontSize: '12px', color: '#22c55e', marginTop: '5px' }}>
            ✔ Fully Repaid
        </div>
        
                
                <div style={{ marginTop: '10px' }}>
                    EMI Paid: {l.paid_emi} / {l.tenure}
        
                    <div className="progress-bg">
                        <div className="progress-bar" id="bar-{l.loan_id}"></div>
        
        
                    </div>
                </div>
        
                
                <a href="/downloadCertificate?loanId={l.loan_id}">
                    <button className="pay-btn" style={{ background: '#2563eb' }}>
                        📄 Download Certificate
                    </button>
                </a>
        
            </div>
        
        </>))}
        
        </div>
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <a href="/customerdashboard">
                <button className="back-btn">← Back to Customer Dashboard</button>
            </a>
        </div>
        </>
    );
};

export default JspLoanDashboardComponent;
