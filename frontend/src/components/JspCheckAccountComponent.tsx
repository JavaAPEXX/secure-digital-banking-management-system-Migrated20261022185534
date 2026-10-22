import React, { useState, useEffect } from 'react';

interface JspCheckAccountComponentData {
    name?: string;
}

type JspCheckAccountComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspCheckAccountComponent: React.FC<JspCheckAccountComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'action': '',
        'accountno': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { blnc, name } = data;

    useEffect(() => {
        // Preserved from original inline <script>:
        try {
            let visible = false;
            
            document.addEventListener("DOMContentLoaded", function () {
            
                const balanceText = document.getElementById("balanceText") /* TODO: useRef */;
                const eye = document.getElementById("toggleEye") /* TODO: useRef */;
                const status = document.getElementById("balanceStatus") /* TODO: useRef */;
            
                if (!balanceText || !eye) return;
            
                const balance = balanceText.getAttribute("data-balance");
            
                // detect button click
                const urlParams = new URLSearchParams(window.location.search);
                const action = urlParams.get("action");
            
                if (action === "check" && balance) {
                    showBalance();
                } else {
                    hideBalance();
                }
            
                function showBalance() {
                    balanceText.innerText = "₹ " + balance;
                    balanceText.classList.remove("balance-hidden");
                    balanceText.classList.add("balance-visible");
            
                    eye.classList.replace("bx-show", "bx-hide");
            
                    status.innerText = "✅ Balance Visible";
                    visible = true;
            
                    // 🔥 AUTO HIDE AFTER 5 SECONDS
                    setTimeout(() => {
                        hideBalance();
                    }, 5000);
                }
            
                function hideBalance() {
                    balanceText.innerText = "******";
                    balanceText.classList.remove("balance-visible");
                    balanceText.classList.add("balance-hidden");
            
                    eye.classList.replace("bx-hide", "bx-show");
            
                    status.innerText = "🔒 Balance Hidden";
                    visible = false;
                }
            
                eye.onclick = function () {
                    if (visible) {
                        hideBalance();
                    } else {
                        showBalance();
                    }
                };
            
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
        setBackendActionNotice("This form originally submitted to '/check_account' using GET. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '/check_account' using GET. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
        {backendActionNotice && (
            <div className="alert alert-warning" role="alert" data-apex-backend-action="unmigrated">
                {backendActionNotice}
            </div>
        )}
<div className="sidebar">
                <div className="logo-details">
                    <i className='bx bxs-user'></i>
                    <span className="logo_name">{name}</span>
                </div>
                <ul className="nav-links">
                    <li>
                        <a href="/customerdashboard" className="active">
                            <i className='bx bx-grid-alt'></i>
                            <span className="links_name">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/profile">
                            <i className='bx bx-user'></i>
                            <span className="links_name">Profile</span>
                        </a>
                    </li>
                    <li>
                        <a href="/check_account">
                            <i className='bx bx-box'></i>
                            <span className="links_name">Check Account</span>
                        </a>
                    </li>
                    <li className="dropdown">
                        <a className="dropbtn">
                            <i className='bx bx-list-ul'></i>
                            <span className="links_name">Transations</span>
                            <i className='bx bxs-chevron-down'></i>
                        </a>
                        <div className="dropdown-content">
                            <a href="/deposit">Deposite Money</a>
                            <a href="/withdraw">Fund Transfer</a>
                            <a href="/addbeneficiary">Add Beneficiary</a>
                            <a href="/ministatement">Mini Statement</a>
                        </div>
                    </li>
        
                    <li className="log_out">
                        <a href="/">
                            <i className='bx bx-log-out'></i>
                            <span className="links_name">Log out</span>
                        </a>
                    </li>
                </ul>
            </div>
        
            <section className="home-section">
            <nav>
                <div className="sidebar-button">
                    <i className='bx bx-menu sidebarBtn'></i>
                    <span className="dashboard">Dashboard</span>
                </div>
            </nav>
        
            <div className="home-content">
                <div className="balance-wrapper">
                    <div className="balance-header">
                        <h2>Check Your Account Balance</h2>
                        <p>
                            View your available balance in a clean and secure banking dashboard.
                        </p>
                    </div>
        
                    <div className="balance-card">
        
                        <form onSubmit={handleSubmit} action="/check_account" method="get">
                            <input type="hidden" name="action" value="check" />
        
                            <div className="balance-form-grid">
        
                                
                                <div className="left-panel">
                                    <div className="section-title">Account Information</div>
        
                                    <div className="input-group">
                                        <label>Account Number</label>
                                        <div className="input-box">
                                            <i className='bx bx-credit-card'></i>
                                            <input onChange={handleInputChange} type="text" name="accountno" value={param.accountno != null ? param.accountno : sessionScope.accountno} readonly required />
                                        </div>
                                    </div>
        
                                    <button type="submit" className="check-btn">
                                        Check Balance
                                    </button>
                                </div>
        
                                
                                <div className="right-panel" style={{ padding: '0', background: 'none', border: 'none' }}>
        
                                    
                                    {(blnc != null && blnc?.size?.() > 0) && (<>
        
                                        {blnc && blnc?.map((user: any, index: number) => (<>
        
                                            <div className="balance-display">
        
            <div className="mini-text">Available Balance</div>
        
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', lineHeight: '1' }}>
        
                <div id="balanceText" className="amount balance-hidden" data-balance={user.balance}>
                    ****** 
                </div>
        
                <i className='bx bx-show' id="toggleEye" style={{ fontSize: '28px', cursor: 'pointer' }}></i>
            </div>
        
            
            <div id="balanceStatus" style={{ marginTop: '10px', fontSize: '13px', opacity: '0.8' }}>
                🔒 Balance Hidden
            </div>
        
        </div>
        
                                        </>))}
        
                                    </>)}
        
                                    
                                    {(blnc == null || blnc?.size?.() == 0) && (<>
                                        <div className="empty-balance">
                                            <i className='bx bx-wallet'></i>
                                            <h3>No balance information found</h3>
                                            <p>Please check your account details or contact support.</p>
                                        </div>
                                    </>)}
        
                                </div>
        
                            </div>
        
                        </form>
        
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default JspCheckAccountComponent;
