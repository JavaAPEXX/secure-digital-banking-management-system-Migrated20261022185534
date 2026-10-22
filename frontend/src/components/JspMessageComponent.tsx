import React, { useState, useEffect } from 'react';

interface JspMessageComponentData {
    name?: string;
}

type JspMessageComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspMessageComponent: React.FC<JspMessageComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'id': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { messages, name } = data;

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
        setBackendActionNotice("This form originally submitted to 'deletemessage' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to 'deletemessage' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
        
            
        
              <div className="profile-details">
                <img src="" alt="" />
                <span className="admin_name">{name}</span>
              </div>
            </nav>
        
            <div className="home-content">
              
        
              <div className="page-header">
                <h2>MESSAGES</h2>
                <p>Read customer queries, suggestions, and support messages in one premium dashboard.</p>
              </div>
        
              <div className="table-card">
                <div className="table-top">
                  <h3>Inbox Overview</h3>
                  <div className="message-count">Customer Messages</div>
                </div>
        
                <div className="table-container">
                  <table className="table" width="100%">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                    </tr>
        
                    {messages && messages?.map((user: any, index: number) => (<>
                      <tr>
                        <td>
                          <span className="name-pill">
                            <i className='bx bx-user-circle'></i>
                            {user.name}
                          </span>
                        </td>
                        <td>
                          <a href="mailto:{user.email}" className="email-link">{user.email}</a>
                        </td>
                        <td>
                          <span className="subject-badge">{user.subject}</span>
                        </td>
                    <td>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
            
            <div className="message-box">{user.message}</div>
        
            <form onSubmit={handleSubmit} action="deletemessage" method="post">
              <input type="hidden" name="id" value={user.slno} />
              <input onChange={handleInputChange} type="submit" value="Delete" className="delete-btn" />
            </form>
        
          </div>
        </td>
                      </tr>
                    </>))}
                  </table>
                </div>
              </div>
            </div>
          </section>
        </>
    );
};

export default JspMessageComponent;
