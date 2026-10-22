import React, { useState, useEffect } from 'react';

interface JspAdmindashboardComponentData {
    name?: string;
    totalCustomer?: number;
    totalTransaction?: number;
    activeCustomer?: boolean;
    inactiveCustomer?: boolean;
    totalMessages?: number;
    pendingRequests?: string;
}

type JspAdmindashboardComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspAdmindashboardComponent: React.FC<JspAdmindashboardComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'id': '',
        'accountno': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { activeCustomer, frauds, inactiveCustomer, name, pendingRequests, showFraudAlert, totalCustomer, totalMessages, totalTransaction } = data;

    useEffect(() => {
        // Preserved from original inline <script>:
        try {
            let sidebar = document.querySelector(".sidebar");
                let sidebarBtn = document.querySelector(".sidebarBtn");
                sidebarBtn.onclick = function () {
                  sidebar.classList.toggle("active");
                  if (sidebar.classList.contains("active")) {
                    sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
                  } else
                    sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
                  }
            function toggleAnalytics() {
                let box = document.getElementById("analyticsBox") /* TODO: useRef */;
                box.style.display = (box.style.display === "none") ? "block" : "none";
            }
            function closeFraud() {
                document.getElementById("fraudPopup") /* TODO: useRef */.style.display = "none";
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
        setBackendActionNotice("This form originally submitted to '/allowTransaction' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '/allowTransaction' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
              <div className="hero-banner">
                <div className="hero-text">
                  <div className="mini-title">Admin Control Center</div>
                  <h1>Welcome back, {name}</h1>
                  <p>
                    Manage customer accounts, monitor user activity, review messages, and keep your digital banking platform running smoothly from one secure dashboard.
                  </p>
                </div>
                <div className="hero-badge">
                  Secure Admin Access
                </div>
              </div>
        
              <div className="overview-boxes">
                
                <div className="box">
                  <div className="stat-top">
                    <div>
                      <div className="box-topic">Total Customer</div>
                      <div className="number">{totalCustomer}</div>
                    </div>
                    <div className="stat-icon icon-blue">
                      <i className='bx bx-user'></i>
                    </div>
                  </div>
                  <div className="indicator up">
                    <i className='bx bx-group'></i>
                    <span className="text">Registered users</span>
                  </div>
                </div>
        
                <div className="box">
                  <div className="stat-top">
                    <div>
                      <div className="box-topic">Total Transaction</div>
                      <div className="number">{totalTransaction}</div>
                    </div>
                    <div className="stat-icon icon-green">
                      <i className='bx bx-transfer-alt'></i>
                    </div>
                  </div>
                  <div className="indicator up">
                    <i className='bx bx-line-chart'></i>
                    <span className="text">All bank transfers</span>
                  </div>
                </div>
        
                <div className="box">
                  <div className="stat-top">
                    <div>
                      <div className="box-topic">Active Customer</div>
                      <div className="number">{activeCustomer}</div>
                    </div>
                    <div className="stat-icon icon-purple">
                      <i className='bx bx-user-check'></i>
                    </div>
                  </div>
                  <div className="indicator up">
                    <i className='bx bx-check-circle'></i>
                    <span className="text">Approved users</span>
                  </div>
                </div>
        
                <div className="box">
                  <div className="stat-top">
                    <div>
                      <div className="box-topic">Inactive Customer</div>
                      <div className="number">{inactiveCustomer}</div>
                    </div>
                    <div className="stat-icon icon-red">
                      <i className='bx bx-user-x'></i>
                    </div>
                  </div>
                  <div className="indicator down-box">
                    <i className='bx bx-time'></i>
                    <span className="text">Pending / inactive</span>
                  </div>
                </div>
              </div>
        
              <div className="dashboard-grid">
                <div className="panel-card">
                  <div className="panel-header">
                    <h3>Quick Actions</h3>
                    <p>Jump directly to the most important admin sections and manage the system faster.</p>
                  </div>
        
                  <div className="quick-actions">
                    <a href="/customeraccounts" className="action-card">
                      <i className='bx bx-folder-open'></i>
                      <h4>Customer Accounts</h4>
                      <p>Review account opening requests and manage approval flow.</p>
                    </a>
        
                    <a href="/activeusers" className="action-card">
                      <i className='bx bx-pulse'></i>
                      <h4>Active Users</h4>
                      <p>Check which users are currently active and approved in the system.</p>
                    </a>
        
                    <a href="/customer" className="action-card">
                      <i className='bx bx-group'></i>
                      <h4>Customers</h4>
                      <p>Manage registered customers, update roles, and control status.</p>
                    </a>
        
                    <a href="/message" className="action-card">
                      <i className='bx bx-envelope'></i>
                      <h4>Messages</h4>
                      <p>Total messages: {totalMessages}</p>
                    </a>
        
                    <a href="/faq_admin" className="action-card">
                      <i className='bx bx-help-circle'></i>
                      <h4>FAQ Manager</h4>
                      <p>Add and manage frequently asked questions for a better user experience.</p>
                    </a>
        
                    <a href="/customeraccounts" className="action-card">
                      <i className='bx bx-task'></i>
                      <h4>Pending Requests</h4>
                      <p>Total pending account requests: {pendingRequests}</p>
                    </a>
                  </div>
                </div>
        
                <div className="panel-card">
                  <div className="panel-header">
                    <h3>Admin Overview</h3>
                    <p>System status and admin profile summary.</p>
                  </div>
        
                  <div className="admin-card-body">
                    <div className="admin-profile-box">
                      <div className="admin-avatar">
                        <i className='bx bxs-user'></i>
                      </div>
                      <h4>{name}</h4>
                      <p>
                        You are logged in as administrator. Use this panel to monitor account activity, review requests, and maintain banking operations securely.
                      </p>
                    </div>
        
                    <div className="status-list">
                      <div className="status-item">
                        <span>System Status</span>
                        <div className="status-pill pill-live">Live</div>
                      </div>
        
                      <div className="status-item">
                        <span>Total Messages</span>
                        <div className="status-pill pill-safe">{totalMessages}</div>
                      </div>
        
                      <div className="status-item">
                        <span>Pending Requests</span>
                        <div className="status-pill pill-fast">{pendingRequests}</div>
                      </div>
                    </div>
                  </div>
                </div>
        
                <div className="panel-card">
          <div className="panel-header">
            <h3>Fraud Alerts &#128680;</h3>
          </div>
        
          <div className="admin-card-body">
            {frauds && frauds?.map((f: any, index: number) => (<>
          <div className="status-item">
        
           <span>
          {f["accountno"]} - ₹{f["amount"]}
          <br />
         <small style={{ fontWeight: '600' }}>
          Status: 
          {
            (f['action'] == 'BLOCKED') ? (<>
              <span style={{ color: 'red' }}>BLOCKED</span>
            </>) :
            (f['action'] == 'ALLOWED') ? (<>
              <span style={{ color: 'green' }}>ALLOWED</span>
            </>) :
            (<>
              <span style={{ color: 'orange' }}>Pending</span>
            </>)
          }
        </small>
        </span>
        
            <div style={{ display: 'flex', gap: '10px' }}>
              
              
              <form onSubmit={handleSubmit} action="/allowTransaction" method="post">
                <input type="hidden" name="id" value={f['id']} />
                <button style={{ background: '#10b981', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px' }}>
                  Allow
                </button>
              </form>
        
              
              <form onSubmit={handleSubmit} action="/blockTransaction" method="post">
                <input type="hidden" name="id" value={f['id']} />
                <input type="hidden" name="accountno" value={f['accountno']} />
                <button style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px' }}>
                  Block
                </button>
              </form>
        
              
           <form onSubmit={handleSubmit} action="/deleteFraud" method="post">
            <input type="hidden" name="id" value={f['id']} />
            <button className="action-btn btn-delete" onclick="return confirm('Are you sure to delete this fraud alert?')">
              Delete
            </button>
          </form>
        
            </div>
        
          </div>
        </>))}
          </div>
        </div>
              </div>
        
            </div>
          </section>
        
          
        
          
        
        <div className="analytics-toggle" onclick="toggleAnalytics()">
          &#x1F4CA; Analytics
        </div>
        
        <div className="analytics-floating" id="analyticsBox" style={{ display: 'none' }}>
          <h4>Quick Insights</h4>
        
          <div className="analytics-item">
            <span>Customers</span>
            <strong className="analytics-badge">{totalCustomer}</strong>
          </div>
        
          <div className="analytics-item">
            <span>Transactions</span>
            <strong className="analytics-badge">{totalTransaction}</strong>
          </div>
        
          <div className="analytics-item">
            <span>Active</span>
            <strong className="analytics-badge">{activeCustomer}</strong>
          </div>
        
          <div className="analytics-item">
            <span>Pending</span>
            <strong className="analytics-badge">{pendingRequests}</strong>
          </div>
        
          <div className="analytics-item">
            <span>Messages</span>
            <strong className="analytics-badge">{totalMessages}</strong>
          </div>
        </div>
        
        
        
        {(showFraudAlert) && (<>
          <div id="fraudPopup" className="fraud-popup">
            <div className="fraud-box">
              <h2>&#128680; Fraud Alert Detected!</h2>
              <p>Suspicious transactions found in the system.</p>
              <button onclick="closeFraud()">OK</button>
            </div>
          </div>
        </>)}
        </>
    );
};

export default JspAdmindashboardComponent;
