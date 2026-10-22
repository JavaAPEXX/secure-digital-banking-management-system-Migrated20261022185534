import React, { useState, useEffect } from 'react';

interface JspCustomerdashboardComponentData {
    name?: string;
}

type JspCustomerdashboardComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspCustomerdashboardComponent: React.FC<JspCustomerdashboardComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'globalSearch': '',
        'userInput': '',
    });
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
            function toggleChat() {
                let box = document.getElementById("chatbox") /* TODO: useRef */;
            
                if (box.style.display === "none" || box.style.display === "") {
                    box.style.display = "flex";   // 🔥 IMPORTANT
                } else {
                    box.style.display = "none";
                }
            }
            
            async function sendMessage() {
               let input = document.getElementById("userInput") /* TODO: useRef */;
            let msg = input.value.trim();
            if (msg === "") return;
            
            input.value = "";   // 🔥 clear instantly
            
                let chat = document.getElementById("chatContent") /* TODO: useRef */;
            // ✅ CREATE USER MESSAGE FIRST
            let userDiv = document.createElement("div");
            userDiv.style.textAlign = "right";
            userDiv.style.marginBottom = "8px";
            
            let userSpan = document.createElement("span");
            userSpan.className = "chat-bubble user-bubble";
            
            userSpan.innerText = msg;
            
            userDiv.appendChild(userSpan);
            chat.appendChild(userDiv);
            
            chat.scrollTop = chat.scrollHeight;
            
            
            
            
            // 🔥 ADD TYPING HERE
            let typingDiv = document.createElement("div");
            typingDiv.id = "typing";
            typingDiv.style.textAlign = "left";
            typingDiv.style.marginBottom = "8px";
            
            typingDiv.innerHTML = `
                <span className="typing">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </span>
            `;
            
            chat.appendChild(typingDiv);
            chat.scrollTop = chat.scrollHeight;
                try {
                    let res = await fetch("http://localhost:8082/chat", {
                        method: "POST",
                        headers: { "Content-Type": "text/plain" },
                        body: msg
                    });
            
                    let raw = await res.text();
                    let reply;
            
                    try {
                        let data = JSON.parse(raw);
                        reply = data.choices?.[0]?.message?.content || raw;
                    } catch {
                        reply = raw;
                    }
            
                    if (!reply || reply.trim() === "") {
                        reply = "🤖 No response received.";
                    }
            
                    document.getElementById("typing") /* TODO: useRef */?.remove();
            
                    // ✅ BOT MESSAGE
                    let botDiv = document.createElement("div");
                    botDiv.style.textAlign = "left";
                    botDiv.style.marginBottom = "8px";
            
                    let botSpan = document.createElement("span");
                    botSpan.className = "chat-bubble bot-bubble";
            
                    botSpan.innerText = reply;
            
                    botDiv.appendChild(botSpan);
                    chat.appendChild(botDiv);
            
                    chat.scrollTop = chat.scrollHeight;
            
                } catch (e) {
                    console.error(e);
            
                    let errDiv = document.createElement("div");
                    errDiv.style.color = "red";
                    errDiv.innerText = "⚠️ Server not responding";
            
                    chat.appendChild(errDiv);
                }
            
                input.value = "";
            }
            
            // 🔥 ENTER KEY SUPPORT
            document.addEventListener("keydown", function(e) {
                if (e.key === "Enter") {
                    sendMessage();
                }
            });
            const searchBox = document.getElementById("globalSearch") /* TODO: useRef */;
            
            if (searchBox) {
                searchBox.addEventListener("keydown", function(e) {
            
                    if (e.key === "Enter") {
            
                        let value = this.value.toLowerCase().trim();
            
                        if (value.includes("deposit")) {
                            window.location.href = "/deposit";
                        }
                        else if (value.includes("transfer") || value.includes("send")) {
                            window.location.href = "/withdraw";
                        }
                        else if (value.includes("statement")) {
                            window.location.href = "/ministatement";
                        }
                        else if (value.includes("profile")) {
                            window.location.href = "/profile";
                        }
                        else if (value.includes("beneficiary")) {
                            window.location.href = "/addbeneficiary";
                        }
                        else if (value.includes("history")) {
                            window.location.href = "/payment-history";
                        }
            
                         else if (value.includes("loan")) {
                            window.location.href = "/loan";
                        }
            
                         else if (value.includes("loan dashboard")) {
                            window.location.href = "/loanDashboard";
                        }
                        else {
                            alert("No result found");
                        }
            
                    }
            
                });
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
           <a href="/loan">
            <i className='bx bx-money'></i>
            <span className="links_name">Loan</span>
        </a>
        </li>
        
          <li>
            <a href="/loanDashboard">
            <i className='bx bx-bar-chart-alt-2'></i>
            <span className="links_name">Loan Dashboard</span>
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
                  <a href="/payment-history">Deposit History</a>
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
                <span className="dashboard">Dashboard</span>
              </div>
              <div className="search-box">
                <input onChange={handleInputChange} type="text" id="globalSearch" placeholder="Search..." />
                <i className='bx bx-search'></i>
              </div>
              <div className="profile-details">
                <img src="si.jpg" alt="" />
                <span className="admin_name">{name}</span>
              </div>
            </nav>
        
            <div className="home-content">
        
              <div className="welcome-banner">
                <div className="welcome-text">
                  <h1>Welcome back, {name}</h1>
                  <p>
                    Manage your account, deposit funds, transfer money, check your balance,
                    and view your mini statement from one secure place.
                  </p>
                </div>
                <div className="welcome-badge">
                  Secure Banking Portal
                </div>
              </div>
        
              <div className="dashboard-grid">
                <div className="stat-card">
                  <div className="stat-top">
                    <div>
                      <div className="stat-label">Profile</div>
                      <div className="stat-value">View</div>
                    </div>
                    <div className="stat-icon">
                      <i className='bx bx-user'></i>
                    </div>
                  </div>
                </div>
        
                <div className="stat-card">
                  <div className="stat-top">
                    <div>
                      <div className="stat-label">Account</div>
                      <div className="stat-value">Check</div>
                    </div>
                    <div className="stat-icon">
                      <i className='bx bx-wallet'></i>
                    </div>
                  </div>
                </div>
        
                <div className="stat-card">
                  <div className="stat-top">
                    <div>
                      <div className="stat-label">Transfer</div>
                      <div className="stat-value">Fast</div>
                    </div>
                    <div className="stat-icon">
                      <i className='bx bx-transfer'></i>
                    </div>
                  </div>
                </div>
        
                <div className="stat-card">
                  <div className="stat-top">
                    <div>
                      <div className="stat-label">Statement</div>
                      <div className="stat-value">Recent</div>
                    </div>
                    <div className="stat-icon">
                      <i className='bx bx-receipt'></i>
                    </div>
                  </div>
                </div>
              </div>
        
              <div className="action-section">
                <div className="quick-actions">
                  <div className="section-title">Quick Actions</div>
        
                  <div className="action-grid">
                    <a href="/profile" className="action-card">
                      <i className='bx bx-user-circle'></i>
                      <h3>My Profile</h3>
                      <p>View your full banking profile and personal account details.</p>
                    </a>
        
                    <a href="/check_account" className="action-card">
                      <i className='bx bx-credit-card-front'></i>
                      <h3>Check Balance</h3>
                      <p>See your available account balance quickly and securely.</p>
                    </a>
        
                    <a href="/deposit" className="action-card">
                      <i className='bx bx-plus-circle'></i>
                      <h3>Deposit Money</h3>
                      <p>Add money to your account with a clean and simple process.</p>
                    </a>
        
                    <a href="/withdraw" className="action-card">
                      <i className='bx bx-send'></i>
                      <h3>Fund Transfer</h3>
                      <p>Transfer funds to another account in just a few steps.</p>
                    </a>
        
                    <a href="/addbeneficiary" className="action-card">
                      <i className='bx bx-user-plus'></i>
                      <h3>Add Beneficiary</h3>
                      <p>Add trusted beneficiaries before making quick transfers.</p>
                    </a>
        
                    <a href="/ministatement" className="action-card">
                      <i className='bx bx-detail'></i>
                      <h3>Mini Statement</h3>
                      <p>Check your recent transactions and account activity.</p>
                    </a>
        
                    <a href="/hidden_wallet" className="action-card">
          <i className='bx bx-lock'></i>
          <h3>Emergency Balance</h3>
          <p>Access your hidden emergency funds & deposit securely.</p>
        </a>
                  </div>
        
                
                </div>
        
                <div className="security-card">
                  <div className="section-title">Security Center</div>
        
                  <div className="security-box">
                    <i className='bx bxs-shield-plus'></i>
                    <h3>Your account is protected</h3>
                    <p>
                      Banking actions are available from your secure customer panel.
                      Always verify account numbers before transferring money.
                    </p>
                  </div>
        
                  <div className="tips-list">
                    <div className="tip-item">
                      <i className='bx bx-check-circle'></i>
                      <span>Never share your password with anyone.</span>
                    </div>
                    <div className="tip-item">
                      <i className='bx bx-check-circle'></i>
                      <span>Verify beneficiary and account details before transfer.</span>
                    </div>
                    <div className="tip-item">
                      <i className='bx bx-check-circle'></i>
                      <span>Review your mini statement regularly.</span>
                    </div>
                  </div>
                </div>
              </div>
        
            </div>
          </section>
        
          
          
        <div id="chatbotBtn" onclick="toggleChat()" style={{ position: 'fixed', bottom: '20px', right: '20px', background: '#0A2558', color: 'white', padding: '15px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', zIndex: '9999' }}>
          &#128172;
        </div>
        
        
        <div id="chatbox" style={{ display: 'none', flexDirection: 'column', position: 'fixed', bottom: '80px', right: '20px', width: '320px', height: '420px', background: 'white', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', overflow: 'hidden', zIndex: '9999' }}>
        
          
          <div style={{ background: '#0A2558', color: 'white', padding: '12px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
            &#129302; Banking AI
            <span onclick="toggleChat()" style={{ cursor: 'pointer' }}>&#10006;</span>
          </div>
        
          
          <div id="chatContent" style={{ flex: '1', padding: '10px', overflowY: 'auto', fontSize: '14px', background: '#f9f9f9' }}>
          </div>
        
          
          <div style={{ display: 'flex', borderTop: '1px solid #ccc' }}>
              
            <input onChange={handleInputChange} id="userInput" placeholder="Type your message..." style={{ flex: '1', padding: '10px', border: 'none', outline: 'none', fontSize: '14px' }} />
        
            <button onclick="sendMessage()" style={{ background: '#0A2558', color: 'white', border: 'none', padding: '10px 15px', cursor: 'pointer' }}>
              Send
            </button>
          </div>
        
        </div>
        </>
    );
};

export default JspCustomerdashboardComponent;
