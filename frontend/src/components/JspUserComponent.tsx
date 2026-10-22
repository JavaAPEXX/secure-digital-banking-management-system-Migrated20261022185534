import React, { useState, useEffect } from 'react';

interface JspUserComponentData {
    name?: string;
}

type JspUserComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspUserComponent: React.FC<JspUserComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'email': '',
        'user_id': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { name, session, usermaster } = data;

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
        setBackendActionNotice("This form originally submitted to 'manageuser' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to 'manageuser' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
                        <span className="dashboard">Dashboard</span>
                    </div>
                </nav>
        
                <div className="home-content">
                    <div className="page-header">
                        <div className="page-header-content">
                            <h1>Users Management</h1>
                            <p>
                                View all registered users, monitor their roles and account status,
                                and manage them with a cleaner premium admin experience.
                            </p>
                            <div className="welcome-chip">
                                <i className='bx bxs-user-circle'></i>
                                Welcome {session?.getAttribute?.("name")}
                            </div>
                        </div>
                    </div>
        
                    <div className="table-wrap">
                        <div className="section-title">
                            <i className='bx bx-group'></i>
                            <span>Registered Users</span>
                        </div>
        
                        <table className="table">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
        
                            {usermaster && usermaster?.map((user: any, index: number) => (<>
                                <tr>
                                    <td>{user.name}</td>
        
                                    <td>
                                        {
                                            (!!(user.email)) ? (<>
                                                {user.email}
                                            </>) :
                                            (<>
                                                {user.user_id}
                                            </>)
                                        }
                                    </td>
        
                                    <td>
                                        <span className="role-badge">{user.role}</span>
                                    </td>
        
                                    <td>
                                        {
                                            (user.status == 1 || user.status == '1' || user.status == 'active' || user.status == 'Active') ? (<>
                                                <span className="status-active">Active</span>
                                            </>) :
                                            (<>
                                                <span className="status-inactive">Inactive</span>
                                            </>)
                                        }
                                    </td>
        
                                    <td>
                                        <form onSubmit={handleSubmit} action="manageuser" method="post" className="action-form">
                                            {
                                                (!!(user.email)) ? (<>
                                                    <input type="hidden" name="email" value={user.email} />
                                                </>) :
                                                (<>
                                                    <input type="hidden" name="user_id" value={user.user_id} />
                                                </>)
                                            }
        
                                            <input onChange={handleInputChange} type="submit" value="Delete" name="btn" className="btn-action btn-delete" />
                                            <input onChange={handleInputChange} type="submit" value="Update" name="btn" className="btn-action btn-update" />
                                        </form>
                                    </td>
                                </tr>
                            </>))}
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JspUserComponent;
