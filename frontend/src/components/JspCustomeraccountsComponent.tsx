import React, { useState, useEffect } from 'react';

interface JspCustomeraccountsComponentData {
    name?: string;
}

type JspCustomeraccountsComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspCustomeraccountsComponent: React.FC<JspCustomeraccountsComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'email': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { li, name } = data;

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
        setBackendActionNotice("This form originally submitted to '/manageuser' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '/manageuser' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
                <h2>Customer Accounts</h2>
                <p>
                  Review customer account requests, verify user details, and manage account actions from one premium dashboard.
                </p>
              </div>
        
              <div className="glass-card">
                <div className="card-top">
                  <h3>Account Request Management</h3>
                  <span className="badge">
                    <i className='bx bx-folder-open'></i> Total Records: {li?.size?.()}
                  </span>
                </div>
        
                {
                  (!!(li)) ? (<>
                    <div className="table-container">
                      <table className="table">
                        <tr>
                          <th>Account Number</th>
                          <th>Customer Name</th>
                          <th>Email</th>
                          <th>Date Of Birth</th>
                          <th>Gender</th>
                          <th>Aadhaar No</th>
                          <th>Mobile No</th>
                          <th>Photo</th>
                          <th>Action</th>
                        </tr>
        
                        {li && li?.map((user: any, index: number) => (<>
                          <tr>
                            <td>{user.accountno}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.dob}</td>
                            <td>{user.gender}</td>
                            <td>{user.aadhar_no}</td>
                            <td>{user.mobile_no}</td>
                            <td>
                              <img src="data:image/jpeg;base64,{user.photoBase64}" alt="User Photo" className="customer-photo" />
                            </td>
                            <td>
                              <form onSubmit={handleSubmit} action="/manageuser" method="post" className="action-form">
                                <input type="hidden" name="email" value={user.email} />
                                <input onChange={handleInputChange} type="submit" value="Delete" name="btn" onclick="return confirm('Are you sure you want to delete this account?')" />
                                <input onChange={handleInputChange} type="submit" value="Update" name="btn" />
                              </form>
                            </td>
                          </tr>
                        </>))}
                      </table>
                    </div>
                  </>) :
        
                  (<>
                    <div className="empty-state">
                      <i className='bx bx-folder-open'></i>
                      <h4>No customer accounts found</h4>
                      <p>There are no customer account requests available right now.</p>
                    </div>
                  </>)
                }
              </div>
            </div>
          </section>
        </>
    );
};

export default JspCustomeraccountsComponent;
