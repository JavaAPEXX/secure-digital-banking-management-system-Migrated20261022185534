import React, { useState } from 'react';

interface JspHiddenDashboardComponentData {
    main_balance?: string;
    hidden?: string;
    msg?: string;
}

type JspHiddenDashboardComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspHiddenDashboardComponent: React.FC<JspHiddenDashboardComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'amount': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { border, hidden, main_balance, msg } = data;

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
        setBackendActionNotice("This form originally submitted to '/unhide_money' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '/unhide_money' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
        
            <div className="title">&#128374; Hidden Balance</div>
        
            <div style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
        
            
            <div style={{ flex: '1', padding: '18px', borderRadius: '18px', background: 'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))', backdropFilter: 'blur(15px)', boxShadow: 'inset 0 0 10px rgba(255,255,255,0.2), 0 10px 25px rgba(0,0,0,0.4)', border: '1px solid rgba(0,255,255,0.2)', textAlign: 'center', transition: '0.3s' }} onmouseover=" this.style.transform='scale(1.05)'" onmouseout=" this.style.transform='scale(1)'">
        
                <div style={{ fontSize: '13px', color: '#bbb', marginBottom: '5px' }}>
                    Main Balance
                </div>
        
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00e5ff', textShadow: '0 0 10px rgba(0,229,255,0.8)' }}>
                    &#8377;{main_balance}
                </div>
        
            </div>
        
            
            <div style={{ flex: '1', padding: '18px', borderRadius: '18px', background: 'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))', backdropFilter: 'blur(15px)', boxShadow: 'inset 0 0 10px rgba(255,255,255,0.2), 0 10px 25px rgba(0,0,0,0.4)', border: '1px solid rgba(0,255,150,0.2)', textAlign: 'center', transition: '0.3s' }} onmouseover=" this.style.transform='scale(1.05)'" onmouseout=" this.style.transform='scale(1)'">
        
                <div style={{ fontSize: '13px', color: '#bbb', marginBottom: '5px' }}>
                    Hidden Balance
                </div>
        
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00ffcc', textShadow: '0 0 10px rgba(0,255,200,0.8)' }}>
                    &#8377;{hidden}
                </div>
        
            </div>
        
        </div>
        
           {(!!(msg)) && (<>
        
            {
        
                (status == 'error') ? (<>
                    <div className="msg" style={{ color: '#ff4d4d' }}>
                        {msg}
                    </div>
                </>) :
        
                (<>
                    <div className="msg" style={{ color: '#00ffcc' }}>
                        {msg}
                    </div>
                </>)
        
            }
        
        </>)}
        
        
        
            <form onSubmit={handleSubmit} action="/unhide_money" method="post">
                <input onChange={handleInputChange} type="number" name="amount" placeholder="Enter withdraw amount" required />
                <button>Withdraw Money</button>
            </form>
        
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        
            
            <a href="/hidden_deposit" style={{ flex: '1', padding: '12px', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', background: 'rgba(255,150,0,0.1)', border: '1px solid rgba(255,150,0,0.3)', color: '#ffcc80', transition: '0.3s' }}>
                &#128176; Add Money
            </a>
        
            
            <a href="/customerdashboard" style={{ flex: '1', padding: '12px', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#ccc', transition: '0.3s' }}>
                &#127968; Dashboard
            </a>
        
        </div>
        
        </div>
        </>
    );
};

export default JspHiddenDashboardComponent;
