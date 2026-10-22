import React, { useState, useEffect } from 'react';

type JspMinistatementComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspMinistatementComponent: React.FC<JspMinistatementComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'search': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { ministmt } = data;

    useEffect(() => {
        // Preserved from original inline <script>:
        try {
            // SEARCH
            document.getElementById("search") /* TODO: useRef */.addEventListener("keyup", function() {
                let val = this.value.toLowerCase();
                document.querySelectorAll(".txn-card").forEach(card => {
                    card.style.display = card.innerText.toLowerCase().includes(val) ? "" : "none";
                });
            });
            
            // FILTER
            function filterData(type, el) {
            
                document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
                el.classList.add("active");
            
                document.querySelectorAll(".txn-card").forEach(card => {
            
                    if(type === "all") {
                        card.style.display = "";
                    } else {
                        card.style.display = (card.getAttribute("data-type") === type) ? "" : "none";
                    }
            
                });
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
<div className="header">
        
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>&#128179; Transaction History</h1>
        
                <a href="/customerdashboard" className="back-btn">
                    &#11013; Dashboard
                </a>
            </div>
        
        </div>
        
        
        <div className="search-box">
            <input onChange={handleInputChange} type="text" id="search" placeholder="Search transactions" />
        </div>
        
        
        <div className="filters">
            <div className="filter-btn active" onclick="filterData('all', this)">All</div>
            <div className="filter-btn" onclick="filterData('credit', this)">Credit</div>
            <div className="filter-btn" onclick="filterData('debit', this)">Debit</div>
        </div>
        
        
        <div className="container">
        
        {
        
        (!!(ministmt)) ? (<>
        
        {ministmt && ministmt?.map((t: any, index: number) => (<>
        
        <div className="txn-card" data-type={(t.from_account == sessionScope.accountno.toString()) ? (<>debit</>) :(<>credit</>)}>
        
            
            <div className="txn-left">
        
                <div className="txn-icon">
                    {
                        (t.from_account == sessionScope.accountno.toString()) ? (<>
                            <i className='bx bx-up-arrow-alt'></i>
                        </>) :
                        (<>
                            <i className='bx bx-down-arrow-alt'></i>
                        </>)
                    }
                </div>
        
                <div>
                    <div className="txn-title">
                        {
                            (t.from_account == sessionScope.accountno.toString()) ? (<>
                                Paid to {t.to_account}
                            </>) :
                            (<>
                                Received from {t.from_account}
                            </>)
                        }
                    </div>
        
                    <div className="txn-date">{t.transfer_date}</div>
                </div>
        
            </div>
        
            
            <div className="txn-right">
        
                {
                    (t.from_account == sessionScope.accountno.toString()) ? (<>
                        <div className="amount debit">- &#8377;{t.amount}</div>
                        <div className="status">Debited</div>
                    </>) :
                    (<>
                        <div className="amount credit">+ &#8377;{t.amount}</div>
                        <div className="status">Credited</div>
                    </>)
                }
        
            </div>
        
        </div>
        
        </>))}
        
        </>) :
        
        (<>
        
        <div className="empty">
            <h3>No Transactions</h3>
        </div>
        
        </>)
        
        }
        
        </div>
        </>
    );
};

export default JspMinistatementComponent;
