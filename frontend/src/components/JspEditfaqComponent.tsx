import React, { useState, useEffect } from 'react';

interface JspEditfaqComponentData {
    name?: string;
}

type JspEditfaqComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspEditfaqComponent: React.FC<JspEditfaqComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'question': '',
        'slno': '',
        'answer': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { name, usermaster } = data;

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
        setBackendActionNotice("This form originally submitted to 'updatefaq' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to 'updatefaq' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
                        <a href="/admindashboard" className="active">
                            <i className='bx bx-grid-alt'></i>
                            <span className="links_name">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/customeraccounts">
                            <i className='bx bx-box'></i>
                            <span className="links_name">Customer Accounts</span>
                        </a>
                    </li>
                    <li>
                        <a href="/activeusers">
                            <i className='bx bx-list-ul'></i>
                            <span className="links_name">Active Users</span>
                        </a>
                    </li>
                    <li>
                        <a href="/customer">
                            <i className='bx bx-user'></i>
                            <span className="links_name">Customers</span>
                        </a>
                    </li>
                    <li>
                        <a href="/message">
                            <i className='bx bx-message'></i>
                            <span className="links_name">Messages</span>
                        </a>
                    </li>
                    <li>
                        <a href="/faq_admin">
                            <i className='bx bx-list-ul'></i>
                            <span className="links_name">FAQ</span>
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
                        <span className="dashboard">Edit FAQ</span>
                    </div>
                </nav>
        
                <div className="home-content">
                    <div className="faq-hero">
                        <div className="faq-hero-text">
                            <h1>Update FAQ Details</h1>
                            <p>
                                Edit the question and answer below to keep your bank help section clear,
                                polished, and useful for customers.
                            </p>
                        </div>
                        <div className="faq-hero-badge">
                            Admin FAQ Panel
                        </div>
                    </div>
        
                    <div className="faq-wrapper">
                        <div className="faq-card">
                            <div className="faq-top">
                                <div className="faq-icon">
                                    <i className='bx bx-edit-alt'></i>
                                </div>
                                <div className="faq-subtitle">Knowledge Center</div>
                                <h2 className="faq-title">Edit FAQ</h2>
                                <p className="faq-desc">
                                    Refine your FAQ content with a clean glossy editor and keep answers professional and easy to understand.
                                </p>
                            </div>
        
                            <form onSubmit={handleSubmit} action="updatefaq" method="post" className="faq-form">
                                <div className="form-group">
                                    <label className="form-label">Question</label>
                                    <div className="input-wrap">
                                        <i className='bx bx-help-circle'></i>
                                        <input onChange={handleInputChange} type="text" name="question" value={usermaster?.[0].question} className="form-input" placeholder="Enter FAQ question" required />
                                    </div>
                                </div>
        
                                <div className="form-group">
                                    <label className="form-label">Answer</label>
                                    <div className="input-wrap">
                                        <i className='bx bx-message-square-detail'></i>
                                        <textarea onChange={handleInputChange} name="answer" className="form-textarea" placeholder="Enter FAQ answer" required>{usermaster?.[0].answer}</textarea>
                                    </div>
                                </div>
        
                                <input type="hidden" name="slno" value={usermaster?.[0].slno} />
                                <input onChange={handleInputChange} type="submit" name="btn" value="Update FAQ" className="faq-btn" />
        
                                <div className="faq-note">
                                    <p className="faq-note-title">Admin Note</p>
                                    <p className="faq-note-text">Keep answers simple, accurate, and customer-friendly for the best experience.</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JspEditfaqComponent;
