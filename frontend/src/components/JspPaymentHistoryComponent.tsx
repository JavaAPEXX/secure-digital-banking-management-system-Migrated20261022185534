import React, { useState, useEffect } from 'react';

type JspPaymentHistoryComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspPaymentHistoryComponent: React.FC<JspPaymentHistoryComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'search': '',
        'filter': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { list } = data;

    useEffect(() => {
        // Preserved from original inline <script>:
        try {
            document.getElementById("search") /* TODO: useRef */.addEventListener("keyup", function() {
                let value = this.value.toLowerCase();
                let rows = document.querySelectorAll("#table tr");
            
                rows.forEach((row, index) => {
                    if (index === 0) return;
            
                    let text = row.innerText.toLowerCase();
                    row.style.display = text.includes(value) ? "" : "none";
                });
            });
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
        setBackendActionNotice("This form's original backend action has not been connected to a migrated API endpoint, so the form was not submitted.");
    
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
                : "This form's original backend action has not been connected to a migrated API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
<div className="container">
        
            <div className="title">&#128179; Transaction History</div>
        
            <div className="card">
        
                
                <div className="top-bar">
                    <input onChange={handleInputChange} type="text" id="search" placeholder="&#128269; Search Payment ID..." />
        
                    <select onChange={handleInputChange} id="filter">
                        <option value="all">All</option>
                        <option value="today">Today</option>
                        <option value="7days">Last 7 Days</option>
                    </select>
                </div>
        
                
                <table id="table">
                    <tr>
                        <th>ID</th>
                        <th>Payment ID</th>
                        <th>Order ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
        
                    {list && list?.map((t: any, index: number) => (<>
                        <tr>
                            <td>{t.id}</td>
                            <td>{t.payment_id}</td>
                            <td>{t.order_id}</td>
                            <td>&#8377;{t.amount}</td>
        
                            <td>
                                <span className={t.status == 'SUCCESS' ? 'success' : 'failed'}>
                                    {t.status}
                                </span>
                            </td>
        
                            <td>{t.created_at}</td>
                        </tr>
                    </>))}
                </table>
        
                
                <a href="/customerdashboard" className="btn">&#11013; Back to Dashboard</a>
        
            </div>
        
        </div>
        </>
    );
};

export default JspPaymentHistoryComponent;
