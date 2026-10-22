import React, { useState, useEffect } from 'react';

interface JspWithdrawComponentData {
    name?: string;
    accountno?: number;
    sms?: string;
    error?: string;
}

type JspWithdrawComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspWithdrawComponent: React.FC<JspWithdrawComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'fromAccount': '',
        'toAccount': '',
        'ahname': '',
        'ctoAccount': '',
        'amount': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { accountno, error, name, sms } = data;

    useEffect(() => {
        // Preserved from original inline <script>:
        try {
            let seconds = 0;
            
                let interval = setInterval(function() {
            
                  seconds++;
                  document.getElementById("timer") /* TODO: useRef */.innerText = 
                    "Waiting " + seconds + "s... Checking approval...";
            
                  fetch("/checkApproval?from=${fromAccount}&to=${toAccount}&amount=${amount}")
                    .then(res => res.text())
                    .then(data => {
            
                      if (data === "APPROVED") {
                        clearInterval(interval);
            
                        document.getElementById("timer") /* TODO: useRef */.innerText = "✅ Approved! Redirecting...";
            
                        setTimeout(() => {
                          window.location.href =
                            "/autoTransfer?from=${fromAccount}&to=${toAccount}&amount=${amount}";
                        }, 1500);
                      }
            
                    });
            
                }, 3000);
            $('#toAccount').blur(function () {
                            $.ajax({
                                url: "/getaccountholdername",
                                method: "GET",
                                dataType: "JSON",
                                data: { baccount: $(this).val() },
                                success: function (res) {
                                    console.log(res);
                                    if (res.length > 0) {
                                        $("#ahname").val(res[0].ahname);
                                    } else {
                                        $("#ahname").val("");
                                    }
                                },
                                error: function () {
                                    $("#ahname").val("");
                                }
                            
                        });
                    });
            
                    function validateForm() {
                        let toAccount = document.forms["Form"]["toAccount"].value;
                        let ctoAccount = document.forms["Form"]["ctoAccount"].value;
                        let amount = document.forms["Form"]["amount"].value;
            
                        if (toAccount == "") {
                            alert("Account No. must be filled out");
                            return false;
                        }
                        if (ctoAccount == "") {
                            alert("Confirm Account No. must be filled out");
                            return false;
                        }
                        if (amount == "") {
                            alert("Enter minimum Rs: 1.00");
                            return false;
                        }
                        if (toAccount !== ctoAccount) {
                            alert("Account Number and Confirm Account Number do not match");
                            return false;
                        }
                        return true;
                    }
            
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
        setBackendActionNotice("This form originally submitted to '/transferMoney' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '/transferMoney' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
                </nav>
        
                <div className="home-content">
                    <div className="transfer-wrapper">
                        <form onSubmit={handleSubmit} action="/transferMoney" method="post" name="Form" onsubmit="return validateForm()" className="transfer-card">
        
                            <div className="transfer-title">TRANSFER MONEY</div>
        
                            <label htmlFor="fromAccount" className="input-label">From Account Number</label>
                            <input onChange={handleInputChange} type="number" name="fromAccount" id="fromAccount" value={accountno} readonly className="transfer-input readonly-input" />
        
                            <label htmlFor="toAccount" className="input-label">To Account Number</label>
                            <input onChange={handleInputChange} type="number" id="toAccount" name="toAccount" placeholder="Enter Account Number" className="transfer-input" />
        
                            <label htmlFor="ahname" className="input-label">Account Holder Name</label>
                            <input onChange={handleInputChange} type="text" id="ahname" name="ahname" readonly placeholder="Account holder name will appear here" className="transfer-input readonly-input" />
        
                            <label htmlFor="ctoAccount" className="input-label">Confirm Account Number</label>
                            <input onChange={handleInputChange} type="number" id="ctoAccount" name="ctoAccount" placeholder="Confirm Account Number" className="transfer-input" />
        
                            <label htmlFor="amount" className="input-label">Amount</label>
                            <input onChange={handleInputChange} type="number" id="amount" name="amount" step="0.01" placeholder="0.00" className="transfer-input" />
        
                            <input onChange={handleInputChange} type="submit" value="Transfer Money" className="transfer-btn" />
                            {(waitApproval) && (<>
          <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '12px', textAlign: 'center' }}>
        
            ⏳ Waiting for admin approval...
        
            <div id="timer" style={{ fontSize: '18px', marginTop: '10px' }}>
              Checking approval...
            </div>
        
          </div>
        
          
        </>)}
        
          
        
                            {(!!(sms)) && (<>
                                <div className="message-text">{sms}</div>
                            </>)}
        
                            {(!!(error)) && (<>
                                <div className="error-text">{error}</div>
                            </>)}
        
                            <div className="premium-info-box">
                                <p className="premium-info-title">Secure Transfer</p>
                                <p className="premium-info-text">Fast, secure and verified bank transfer</p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JspWithdrawComponent;
