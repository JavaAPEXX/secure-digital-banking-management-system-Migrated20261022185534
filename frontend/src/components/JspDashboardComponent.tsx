import React, { useState, useEffect } from 'react';

interface JspDashboardComponentData {
    name?: string;
}

type JspDashboardComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspDashboardComponent: React.FC<JspDashboardComponentProps> = ({ data = {}, onSubmit }) => {
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
                <a href="#" className="active">
                  <i className='bx bx-grid-alt'></i>
                  <span className="links_name">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className='bx bx-box'></i>
                  <span className="links_name">Accounts</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className='bx bx-list-ul'></i>
                  <span className="links_name">Active Users</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className='bx bx-pie-chart-alt-2'></i>
                  <span className="links_name">Analytics</span>
                </a>
              </li>
              <li>
                <a href="/user">
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
                <img src="si.jpg" alt="" />
                <span className="admin_name">{name}</span>
                <i className='bx bx-chevron-down'></i>
              </div>
            </nav>
        
            <div className="home-content">
              <div className="hero-banner">
                <div className="hero-text">
                  <h1>Welcome back, {name}</h1>
                  <p>
                    Monitor customers, review activity, manage accounts, and keep your digital banking
                    platform running smoothly from one premium admin panel.
                  </p>
                </div>
                <div className="hero-badge">
                  Admin Control Center
                </div>
              </div>
        
              <div className="overview-boxes">
                <div className="box">
                  <div className="right-side">
                    <div className="box-topic">Total Customer</div>
                    <div className="number">40</div>
                    <div className="indicator">
                      <i className='bx bx-up-arrow-alt'></i>
                      <span className="text">Up from yesterday</span>
                    </div>
                  </div>
                </div>
        
                <div className="box">
                  <div className="right-side">
                    <div className="box-topic">Total Transaction</div>
                    <div className="number">38,876</div>
                    <div className="indicator">
                      <i className='bx bx-up-arrow-alt'></i>
                      <span className="text">Up from yesterday</span>
                    </div>
                  </div>
                </div>
        
                <div className="box">
                  <div className="right-side">
                    <div className="box-topic">Active Customer</div>
                    <div className="number">23</div>
                    <div className="indicator">
                      <i className='bx bx-up-arrow-alt'></i>
                      <span className="text">Up from yesterday</span>
                    </div>
                  </div>
                </div>
        
                <div className="box">
                  <div className="right-side">
                    <div className="box-topic">Inactive Customer</div>
                    <div className="number">11</div>
                    <div className="indicator">
                      <i className='bx bx-down-arrow-alt down'></i>
                      <span className="text">Down from today</span>
                    </div>
                  </div>
                </div>
              </div>
        
              <div className="dashboard-panels">
                <div className="panel">
                  <div className="panel-title">Recent Banking Activity</div>
        
                  <table className="activity-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Activity</th>
                        <th>Status</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>23 Mar 2026</td>
                        <td>Debashis Behera</td>
                        <td>Account Approval</td>
                        <td><span className="status success">Completed</span></td>
                        <td>₹0</td>
                      </tr>
                      <tr>
                        <td>23 Mar 2026</td>
                        <td>Rohan Kumar</td>
                        <td>Fund Transfer</td>
                        <td><span className="status pending">Pending</span></td>
                        <td>₹5,000</td>
                      </tr>
                      <tr>
                        <td>22 Mar 2026</td>
                        <td>Ananya Das</td>
                        <td>Deposit Request</td>
                        <td><span className="status success">Completed</span></td>
                        <td>₹12,000</td>
                      </tr>
                      <tr>
                        <td>22 Mar 2026</td>
                        <td>Rahul Sahu</td>
                        <td>KYC Review</td>
                        <td><span className="status review">In Review</span></td>
                        <td>₹0</td>
                      </tr>
                      <tr>
                        <td>21 Mar 2026</td>
                        <td>Priya Sharma</td>
                        <td>Beneficiary Added</td>
                        <td><span className="status success">Completed</span></td>
                        <td>₹0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
        
                <div className="quick-panel">
                  <div className="panel-title">Quick Access</div>
        
                  <div className="quick-links">
                    <a href="/user" className="quick-link">
                      <i className='bx bx-user'></i>
                      <div className="text">
                        <h4>Customers</h4>
                        <p>Manage registered customers and account details.</p>
                      </div>
                    </a>
        
                    <a href="/message" className="quick-link">
                      <i className='bx bx-message-rounded-detail'></i>
                      <div className="text">
                        <h4>Messages</h4>
                        <p>View contact requests and customer messages.</p>
                      </div>
                    </a>
        
                    <a href="#" className="quick-link">
                      <i className='bx bx-list-check'></i>
                      <div className="text">
                        <h4>Active Users</h4>
                        <p>Track customers currently approved and active.</p>
                      </div>
                    </a>
        
                    <a href="#" className="quick-link">
                      <i className='bx bx-line-chart'></i>
                      <div className="text">
                        <h4>Analytics</h4>
                        <p>Review growth, transactions, and platform performance.</p>
                      </div>
                    </a>
                  </div>
        
                  <div className="security-card">
                    <h3>System Status: Secure</h3>
                    <p>
                      Admin monitoring is active. Keep reviewing approvals, transactions,
                      and support messages regularly for smooth banking operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
    );
};

export default JspDashboardComponent;
