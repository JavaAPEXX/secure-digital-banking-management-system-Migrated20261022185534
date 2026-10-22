import React, { useState, useEffect } from 'react';

interface JspAddbeneficiaryComponentData {
    name?: string;
    sms?: string;
}

type JspAddbeneficiaryComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspAddbeneficiaryComponent: React.FC<JspAddbeneficiaryComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'baccount': '',
        'ahname': '',
        'cnfacno': '',
        'branch': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { name, sms, usermaster } = data;

    useEffect(() => {
        // Preserved from original inline <script>:
        try {
            $('#baccount').blur(function () {
                            $.ajax({
                                url: "/getAccountHolderName",
                                method: "GET",
                                dataType: "JSON",
                                data: { baccount: $(this).val() },
                                success: function (res) {
                                    if (res.length > 0) {
                                        $("#ahname").val(res[0].name);
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
                        let baccount = document.forms["Form"]["baccount"].value;
                        let cnfacno = document.forms["Form"]["cnfacno"].value;
                        let branch = document.forms["Form"]["branch"].value;
            
                        if (baccount == "") {
                            alert("Account No. must be filled out");
                            return false;
                        }
                        if (cnfacno == "") {
                            alert("Confirm Account No. must be filled out");
                            return false;
                        }
                        if (branch == "") {
                            alert("Branch must be filled out");
                            return false;
                        }
                        if (baccount !== cnfacno) {
                            alert("Account Number and Confirm Account Number Does Not Match");
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
        setBackendActionNotice("This form originally submitted to '/addbeneficiary' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '/addbeneficiary' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
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
                    
                    <div className="profile-details">
                        <img src="si.jpg" alt="" />
                        <span className="admin_name">{name}</span>
                    </div>
                </nav>
        
                <div className="home-content">
                    <div className="top-banner">
                        <div className="banner-text">
                            <h2>Add Beneficiary</h2>
                            <p>
                                Save trusted beneficiary accounts for faster, smoother and more secure fund transfers.
                            </p>
                        </div>
                        <div className="banner-badge">
                            Secure Transfer Setup
                        </div>
                    </div>
        
                    <div className="beneficiary-wrapper">
                        <div className="beneficiary-card">
                            <div className="card-header">
                                <div className="card-subtitle">Trusted Banking</div>
                                <h2 className="card-heading">Beneficiary Registration</h2>
                            </div>
        
                            <form onSubmit={handleSubmit} name="Form" action="/addbeneficiary" method="post" onsubmit="return validateForm()" className="beneficiary-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="baccount">Beneficiary Account Number</label>
                                        <div className="input-wrap">
                                            <i className='bx bx-credit-card'></i>
                                            <input onChange={handleInputChange} type="text" id="baccount" name="baccount" placeholder="Enter account number" />
                                        </div>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="ahname">Account Holder Name</label>
                                        <div className="input-wrap">
                                            <i className='bx bx-user'></i>
                                            <input onChange={handleInputChange} type="text" id="ahname" name="ahname" readonly placeholder="Auto fetched name" />
                                        </div>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="cnfacno">Confirm Account Number</label>
                                        <div className="input-wrap">
                                            <i className='bx bx-check-shield'></i>
                                            <input onChange={handleInputChange} type="text" id="cnfacno" name="cnfacno" placeholder="Re-enter account number" />
                                        </div>
                                    </div>
        
                                    <div className="form-group">
                                        <label htmlFor="branch">Beneficiary Branch</label>
                                        <div className="input-wrap">
                                            <i className='bx bx-buildings'></i>
                                            <input onChange={handleInputChange} type="text" id="branch" name="branch" placeholder="Enter branch name" />
                                        </div>
                                    </div>
                                </div>
        
                                <input onChange={handleInputChange} type="submit" value="Add Beneficiary" className="submit-btn" />
        
                                <div className="message-box">{sms}</div>
        
                                <div className="premium-note">
                                    <p className="premium-note-title">Banking Tip</p>
                                    <p className="premium-note-text">
                                        Always verify the beneficiary account number carefully before saving.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
        
                    <div className="list-card">
                        <div className="list-head">
                            <div>
                                <h3>Saved Beneficiaries</h3>
                                <p>Your added beneficiaries are listed below.</p>
                            </div>
                            <div className="safe-pill">
                                <i className='bx bx-shield-quarter'></i>
                                Verified List
                            </div>
                        </div>
        
                        <div className="table-scroll">
                            {
                                (!!(usermaster)) ? (<>
                                    <table className="table">
                                        <tr>
                                            <th>Beneficiary Account Number</th>
                                            <th>Account Holder Name</th>
                                            <th>Branch</th>
                                            <th>Action</th>
                                        </tr>
                                        {usermaster && usermaster?.map((user: any, index: number) => (<>
                                            <tr>
                                                <td>
                                                    <span className="account-pill">{user.baccount}</span>
                                                </td>
                                                <td>{user.ahname}</td>
                                                <td>{user.branch}</td>
                                                <td>
                                                    <form onSubmit={handleSubmit} action="/dltbeneficiary" method="post">
                                                        <input type="hidden" name="baccount" value={user.baccount} />
                                                        <input onChange={handleInputChange} type="submit" value="Delete" className="delete-btn" name="btn" />
                                                    </form>
                                                </td>
                                            </tr>
                                        </>))}
                                    </table>
                                </>) :
        
                                (<>
                                    <div className="empty-box">
                                        <i className='bx bx-user-plus'></i>
                                        <h4>No Beneficiaries Added Yet</h4>
                                        <p>Add a beneficiary above to make future fund transfers faster.</p>
                                    </div>
                                </>)
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JspAddbeneficiaryComponent;
