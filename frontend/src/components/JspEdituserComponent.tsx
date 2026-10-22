import React, { useState, useEffect } from 'react';

interface JspEdituserComponentData {
    name?: string;
}

type JspEdituserComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspEdituserComponent: React.FC<JspEdituserComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'name': '',
        'email': '',
        'role': '',
        'status': '',
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
        setBackendActionNotice("This form originally submitted to '/updateuser' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '/updateuser' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
                        <span className="dashboard">Edit User</span>
                    </div>
                </nav>
        
                <div className="home-content">
                    <div className="user-hero">
                        <div className="user-hero-text">
                            <h1>Update User Details</h1>
                            <p>
                                Manage customer profile access, role, and account status from this premium admin control panel.
                            </p>
                        </div>
                        <div className="user-hero-badge">
                            Admin Control
                        </div>
                    </div>
        
                    <div className="user-wrapper">
                        <div className="user-card">
                            <div className="user-top">
                                <div className="user-icon">
                                    <i className='bx bx-user-pin'></i>
                                </div>
                                <div className="user-subtitle">Customer Management</div>
                                <h2 className="user-title">Edit User</h2>
                                <p className="user-desc">
                                    Update customer information cleanly and securely with a glossy modern admin interface.
                                </p>
                            </div>
        
                            <form onSubmit={handleSubmit} action="/updateuser" method="post" className="user-form">
                                <div className="form-group">
                                    <label className="form-label">Customer Name</label>
                                    <div className="input-wrap">
                                        <i className='bx bx-user'></i>
                                        <input onChange={handleInputChange} type="text" name="name" value={usermaster?.[0].name} className="form-input" placeholder="Enter customer name" required />
                                    </div>
                                </div>
        
                                <div className="form-group">
                                    <label className="form-label">Role</label>
                                    <div className="input-wrap">
                                        <i className='bx bx-shield-quarter'></i>
                                        <select onChange={handleInputChange} name="role" className="form-select" required>
                                            <option value="customer" selected={usermaster?.[0].role=='customer'}>Customer</option>
                                            <option value="admin" selected={usermaster?.[0].role=='admin'}>Admin</option>
                                        </select>
                                    </div>
                                </div>
        
                                <div className="form-group">
                                    <label className="form-label">Status</label>
                                    <div className="input-wrap">
                                        <i className='bx bx-check-shield'></i>
                                        <select onChange={handleInputChange} name="status" className="form-select" required>
                                            <option value="1" selected={usermaster?.[0].status==1}>Active</option>
                                            <option value="0" selected={usermaster?.[0].status==0}>Inactive</option>
                                        </select>
                                    </div>
                                </div>
        
                                <div className="form-group">
                                    <label className="form-label">Email ID</label>
                                    <div className="readonly-box">
                                        {usermaster?.[0].email}
                                    </div>
                                </div>
        
                                <input type="hidden" name="email" value={usermaster?.[0].email} />
                                <input onChange={handleInputChange} type="submit" name="btn" value="Update User" className="user-btn" />
        
                                <div className="user-note">
                                    <p className="user-note-title">Admin Note</p>
                                    <p className="user-note-text">Always review user role and status carefully before saving changes.</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JspEdituserComponent;
