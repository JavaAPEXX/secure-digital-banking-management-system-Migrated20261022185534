import React, { useState, useEffect } from 'react';

interface JspDepositComponentData {
    name?: string;
    accountno?: number;
    sms?: string;
}

type JspDepositComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspDepositComponent: React.FC<JspDepositComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'accountno': '',
        'dep_money': '',
        'payment_method': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { accountno, name, sms } = data;

    useEffect(() => {
        // Preserved from original inline <script>:
        try {
            let sidebar = document.querySelector(".sidebar");
                    let sidebarBtn = document.querySelector(".sidebarBtn");
                    sidebarBtn.onclick = function () {
                        sidebar.classList.toggle("active");
                        if (sidebar.classList.contains("active")) {
                            sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
                        } else {
                            sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
                        }
                    }
            
            
            
                    function selectMethod(method, el) {
                document.getElementById("paymentMethod") /* TODO: useRef */.value = method;
            
                document.querySelectorAll(".payment-card").forEach(card => {
                    card.classList.remove("active");
                });
            
                el.classList.add("active");
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
        setBackendActionNotice("This form originally submitted to '/deposit_money' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '/deposit_money' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
                        <span className="dashboard">Deposit Money</span>
                    </div>
                </nav>
        
                <div className="home-content">
                    <div className="deposit-hero">
                        <div className="deposit-hero-text">
                            <h1>Secure Deposit Portal</h1>
                            <p>
                                Add funds to your account quickly and safely with a premium banking experience.
                                Your money is processed securely and reflected in your account balance.
                            </p>
                        </div>
                        <div className="deposit-hero-badge">
                            Instant Deposit Access
                        </div>
                    </div>
        
                    <div className="deposit-wrapper">
                        <div className="deposit-card">
                            <div className="deposit-top">
                                <div className="deposit-icon">
                                    <i className='bx bx-wallet'></i>
                                </div>
                                <div className="deposit-subtitle">Digital Banking</div>
                                <h2 className="deposit-title">Deposit Money</h2>
                                <p className="deposit-desc">
                                    Enter your deposit details below and credit your account with a smooth and secure transaction.
                                </p>
                            </div>
        
                            <form onSubmit={handleSubmit} action="/deposit_money" method="post" className="deposit-form">
                                <div className="form-group">
                                    <label className="form-label">Account Number</label>
                                    <div className="input-wrap">
                                        <i className='bx bx-credit-card'></i>
                                        <input onChange={handleInputChange} type="text" name="accountno" value={accountno} className="form-input readonly-input" readonly />
                                    </div>
                                </div>
        
                                <div className="form-group">
                                    <label className="form-label">Deposit Amount</label>
                                    <div className="input-wrap">
                                        <i className='bx bx-rupee'></i>
                                        <input onChange={handleInputChange} type="number" name="dep_money" placeholder="Enter Deposit Amount" className="form-input" required />
                                    </div>
                                </div>
        
                              <div className="payment-options">
        
            <div className="payment-card" onclick="selectMethod('UPI', this)">
                &#128241; UPI
            </div>
        
            <div className="payment-card" onclick="selectMethod('CARD', this)">
                &#128179; Card
            </div>
        
            <div className="payment-card" onclick="selectMethod('NETBANKING', this)">
                &#127974; Net Banking
            </div>
        
        </div>
        
        <input type="hidden" name="payment_method" id="paymentMethod" />
        
                                <input onChange={handleInputChange} type="submit" value="Deposit Now" className="deposit-btn" />
        
                                <div className="sms-box">{sms}</div>
        
                                <div className="deposit-note">
                                    <p className="deposit-note-title">Secure Credit</p>
                                    <p className="deposit-note-text">Your deposit will be processed safely and added to your account balance.</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JspDepositComponent;
