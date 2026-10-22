import React, { useState, useEffect } from 'react';

interface JspFaqAdminComponentData {
    name?: string;
}

type JspFaqAdminComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspFaqAdminComponent: React.FC<JspFaqAdminComponentProps> = ({ data = {}, onSubmit }) => {
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
        setBackendActionNotice("This form originally submitted to 'addfaq' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to 'addfaq' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
                        <span className="dashboard">FAQ Management</span>
                    </div>
                </nav>
        
                <div className="home-content">
                    <div className="faq-hero">
                        <div className="faq-hero-text">
                            <h1>Manage Bank FAQs</h1>
                            <p>
                                Add, review, update, and organize frequently asked questions from one premium glossy admin panel.
                            </p>
                        </div>
                        <div className="faq-hero-badge">
                            FAQ Admin Center
                        </div>
                    </div>
        
                    <div className="faq-grid">
                        <div className="faq-card">
                            <div className="card-top">
                                <div className="card-subtitle">Knowledge Base</div>
                                <h2 className="card-title">Add New FAQ</h2>
                                <p className="card-desc">
                                    Create clear and helpful answers for customers with a clean and modern interface.
                                </p>
                            </div>
        
                            <form onSubmit={handleSubmit} action="addfaq" method="post" className="faq-form">
                                <div className="form-row">
                                    <div className="form-group full">
                                        <label className="form-label">Question</label>
                                        <div className="input-wrap">
                                            <i className='bx bx-help-circle'></i>
                                            <input onChange={handleInputChange} type="text" name="question" className="form-input" placeholder="Enter FAQ question" required />
                                        </div>
                                    </div>
        
                                    <div className="form-group full">
                                        <label className="form-label">Answer</label>
                                        <div className="input-wrap">
                                            <i className='bx bx-message-square-detail'></i>
                                            <textarea onChange={handleInputChange} name="answer" className="form-textarea" placeholder="Enter FAQ answer" required></textarea>
                                        </div>
                                    </div>
                                </div>
        
                                <input onChange={handleInputChange} type="submit" name="btn" value="Add FAQ" className="faq-btn" />
                            </form>
                        </div>
        
                        <div className="table-card">
                            <div className="card-top">
                                <div className="card-subtitle">FAQ Records</div>
                                <h2 className="card-title">All FAQs</h2>
                                <p className="card-desc">
                                    Manage all existing questions and answers with quick update and delete actions.
                                </p>
                            </div>
        
                            <div className="table-wrap">
                                <table className="faq-table">
                                    <thead>
                                        <tr>
                                            <th>Serial No.</th>
                                            <th>Question</th>
                                            <th>Answer</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usermaster && usermaster?.map((user: any, index: number) => (<>
                                            <tr>
                                                <td><span className="sl-badge">{user.slno}</span></td>
                                                <td><div className="question-box">{user.question}</div></td>
                                                <td><div className="answer-box">{user.answer}</div></td>
                                                <td>
                                                    <form onSubmit={handleSubmit} className="action-form" action="managefaq" method="post">
                                                        <input type="hidden" name="slno" value={user.slno} />
                                                        <input onChange={handleInputChange} type="submit" value="Delete" name="btn" className="btn-delete" />
                                                        <input onChange={handleInputChange} type="submit" value="Update" name="btn" className="btn-update" />
                                                    </form>
                                                </td>
                                            </tr>
                                        </>))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JspFaqAdminComponent;
