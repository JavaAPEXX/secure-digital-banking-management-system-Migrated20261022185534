import React, { useState, useEffect } from 'react';

interface JspTransactionsComponentData {
    name?: string;
}

type JspTransactionsComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspTransactionsComponent: React.FC<JspTransactionsComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { name } = data;

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
                    <li>
                        <a href="/transactions">
                            <i className='bx bx-list-ul'></i>
                            <span className="links_name">Transactions</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bx-pie-chart-alt-2'></i>
                            <span className="links_name">Analytics</span>
                        </a>
                    </li>
                    <li>
                        <a href="/message">
                            <i className='bx bx-message'></i>
                            <span className="links_name">Messages</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bx-cog'></i>
                            <span className="links_name">Setting</span>
                        </a>
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
                    <div className="search-box">
                        <input onChange={handleInputChange} type="text" placeholder="Search..." />
                        <i className='bx bx-search'></i>
                    </div>
                    <div className="profile-details">
                        <img src="si.jpg" alt="" width="40" height="40" />
                        <span className="admin_name">{name}</span>
                    </div>
                </nav>
        
                <div className="home-content">
                    <div className="transactions-hero">
                        <div className="transactions-hero-content">
                            <h1>Transactions</h1>
                            <p>
                                Manage your money smoothly with secure banking actions.
                                Deposit funds, transfer money instantly, and track your recent transaction history
                                from one elegant dashboard.
                            </p>
                        </div>
                    </div>
        
                    <div className="buttons_transactions">
                        <div className="overview-boxes">
                            <button className="box">
                                <a href="/deposit">
                                    <div className="transaction-card">
                                        <div>
                                            <div className="transaction-icon deposit-icon">
                                                <i className='bx bx-wallet'></i>
                                            </div>
                                            <div className="box-topic">Deposit Money</div>
                                            <div className="transaction-text">
                                                Add funds securely to your account and keep your balance growing with ease.
                                            </div>
                                        </div>
                                        <span className="go-btn">
                                            Open Now <i className='bx bx-right-arrow-alt'></i>
                                        </span>
                                    </div>
                                </a>
                            </button>
        
                            <button className="box">
                                <a href="/withdraw">
                                    <div className="transaction-card">
                                        <div>
                                            <div className="transaction-icon transfer-icon">
                                                <i className='bx bx-transfer-alt'></i>
                                            </div>
                                            <div className="box-topic">Fund Transfer</div>
                                            <div className="transaction-text">
                                                Send money quickly and safely to another account with a clean transfer process.
                                            </div>
                                        </div>
                                        <span className="go-btn">
                                            Transfer Now <i className='bx bx-right-arrow-alt'></i>
                                        </span>
                                    </div>
                                </a>
                            </button>
        
                            <button className="box">
                                <a href="/ministatement">
                                    <div className="transaction-card">
                                        <div>
                                            <div className="transaction-icon statement-icon">
                                                <i className='bx bx-receipt'></i>
                                            </div>
                                            <div className="box-topic">Mini Statement</div>
                                            <div className="transaction-text">
                                                View your latest transaction records and keep track of your banking activity.
                                            </div>
                                        </div>
                                        <span className="go-btn">
                                            View Statement <i className='bx bx-right-arrow-alt'></i>
                                        </span>
                                    </div>
                                </a>
                            </button>
                        </div>
                    </div>
        
                    <div className="quick-stats">
                        <div className="stat-card">
                            <h3>Fast Banking</h3>
                            <p>Perform daily banking actions in a few clicks with a cleaner premium interface.</p>
                        </div>
                        <div className="stat-card">
                            <h3>Secure Transfers</h3>
                            <p>Move your funds confidently with clear transaction flow and better navigation.</p>
                        </div>
                        <div className="stat-card">
                            <h3>Easy Tracking</h3>
                            <p>Check your statement anytime and stay updated with your recent account activity.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JspTransactionsComponent;
