import React, { useState, useEffect } from 'react';

interface JspCreateAccountComponentData {
    sms?: string;
    error?: string;
}

type JspCreateAccountComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspCreateAccountComponent: React.FC<JspCreateAccountComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'name': '',
        'email': '',
        'fathers_name': '',
        'mothers_name': '',
        'dob': '',
        'aadhar_no': '',
        'mobile_no': '',
        'pan_no': '',
        'address': '',
        'city': '',
        'pin': '',
        'photo': '',
        'account_type': '',
        'gender': '',
        'occupation': '',
        'marital_status': '',
        'nationality': '',
        'religion': '',
        'qualification': '',
        'category': '',
        'state': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { error, sms } = data;

    useEffect(() => {
        // Preserved from original inline <script>:
        try {
            const hamburgerMenu = document.getElementById("hamburger-menu") /* TODO: useRef */;
                const mobileMenu = document.getElementById("mobile-menu") /* TODO: useRef */;
                const hamburgerCross = document.getElementById("hamburger-cross") /* TODO: useRef */;
            
                hamburgerMenu.onclick = function () {
                  mobileMenu.classList.add("active");
                };
            
                hamburgerCross.onclick = function () {
                  mobileMenu.classList.remove("active");
                };
            
                function checkform() {
                  var name = document.getElementById("name") /* TODO: useRef */.value;
                  var account_type = document.getElementById("account_type") /* TODO: useRef */.value;
                  var email = document.getElementById("email") /* TODO: useRef */.value;
                  var dob = document.getElementById("dob") /* TODO: useRef */.value;
                  var gender = document.getElementById("gender") /* TODO: useRef */.value;
                  var occupation = document.getElementById("occupation") /* TODO: useRef */.value;
                  var aadhar_no = document.getElementById("aadhar_no") /* TODO: useRef */.value;
                  var mobile_no = document.getElementById("mobile_no") /* TODO: useRef */.value;
                  var marital_status = document.getElementById("marital_status") /* TODO: useRef */.value;
                  var pan_no = document.getElementById("pan_no") /* TODO: useRef */.value;
                  var religion = document.getElementById("religion") /* TODO: useRef */.value;
                  var qualification = document.getElementById("qualification") /* TODO: useRef */.value;
                  var category = document.getElementById("category") /* TODO: useRef */.value;
                  var address = document.getElementById("address") /* TODO: useRef */.value;
                  var city = document.getElementById("city") /* TODO: useRef */.value;
                  var state = document.getElementById("state") /* TODO: useRef */.value;
                  var pin = document.getElementById("pin") /* TODO: useRef */.value;
            
                  if (name == null || name == "") {
                    alert("Name can't be blank");
                    return false;
                  }
                  if (account_type == "--Choose--") {
                    alert("Choose Account Type");
                    return false;
                  }
                  if (email == null || email == "") {
                    alert("Email can't be blank");
                    return false;
                  }
                  if (dob == "") {
                    alert("DOB can't be blank");
                    return false;
                  }
                  if (gender == "--Choose--") {
                    alert("Choose Gender");
                    return false;
                  }
                  if (occupation == "--Choose--") {
                    alert("Choose Occupation");
                    return false;
                  }
                  if (aadhar_no == "" || aadhar_no.length != 12) {
                    alert("Aadhaar Number must be 12 digit");
                    return false;
                  }
                  if (mobile_no == "" || mobile_no.length != 10) {
                    alert("Mobile Number must be 10 digit");
                    return false;
                  }
                  if (marital_status == "--Choose--") {
                    alert("Choose Marital Status");
                    return false;
                  }
                  if (pan_no == "" || pan_no.length != 10) {
                    alert("PAN Number must be 10 digit");
                    return false;
                  }
                  if (religion == "--Choose--") {
                    alert("Choose Religion");
                    return false;
                  }
                  if (qualification == "--Choose--") {
                    alert("Choose Qualification");
                    return false;
                  }
                  if (category == "--Choose--") {
                    alert("Choose Category");
                    return false;
                  }
                  if (address == "") {
                    alert("Address can't be blank");
                    return false;
                  }
                  if (city == "") {
                    alert("City can't be blank");
                    return false;
                  }
                  if (state == "--Choose State--") {
              alert("Please select a State");
              return false;
            }
                  if (!/^\d{6}$/.test(pin)) {
              alert("PIN Code must be exactly 6 digits");
              return false;
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
        setBackendActionNotice("This form originally submitted to '/create_account' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '/create_account' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
        {backendActionNotice && (
            <div className="alert alert-warning" role="alert" data-apex-backend-action="unmigrated">
                {backendActionNotice}
            </div>
        )}
<div className="navbar">
            <div className="nav-logo">
              <a href="/">DIGITAL<span className="text-primary">BANK</span></a>
            </div>
        
            <div className="nav-items">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
              </ul>
            </div>
        
            <div id="hamburger-menu"><i className='bx bx-menu'></i></div>
          </div>
        
          <div id="mobile-menu">
            <div className="mobile-nav-items">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
              </ul>
            </div>
            <div id="hamburger-cross"><i className='bx bx-x'></i></div>
          </div>
        
          <div className="hero">
            <div className="top-badge">
              <i className='bx bxs-shield-plus'></i>
              Secure Digital Banking Registration
            </div>
            <h1>Open Your Account in Style</h1>
            <p>
              Join DIGITAL BANK with a modern, secure and smooth account opening experience.
              Fill in your details below and create your account with confidence.
            </p>
          </div>
        
          <div className="container_form">
            <div className="container">
              <form onSubmit={handleSubmit} action="/create_account" method="post" onsubmit="return checkform()" enctype="multipart/form-data">
                <h2>Open Account With DIGITAL BANK</h2>
        
                {(!!(sms)) && (<>
            <div className="msg">{sms}</div>
        </>)}
        
        {(!!(error)) && (<>
            <div className="error-msg">
            ⚠️ ERROR: {error}
        </div>
        </>)}
        
        
        
                <div className="section-title">Personal Information</div>
                <div className="row">
                  <div className="col-50">
                    <label htmlFor="name">Customer Name</label>
                    <input onChange={handleInputChange} type="text" id="name" name="name" placeholder="Enter customer name" />
                  </div>
                  <div className="col-50">
                    <label htmlFor="account_type">Account Type</label>
                    <select onChange={handleInputChange} id="account_type" name="account_type">
                      <option hidden="hidden">--Choose--</option>
                      <option value="saving">Saving</option>
                      <option value="current">Current</option>
                    </select>
                  </div>
        
                  <div className="col-50">
                    <label htmlFor="email">Email</label>
                    <input onChange={handleInputChange} type="email" id="email" name="email" placeholder="Enter email address" />
                  </div>
                  <div className="col-50">
                    <label htmlFor="fathers_name">Father's Name</label>
                    <input onChange={handleInputChange} type="text" id="fathers_name" name="fathers_name" placeholder="Enter father's name" />
                  </div>
                </div>
        
                <div className="row">
                  <div className="col-50">
                    <label htmlFor="mothers_name">Mother's Name</label>
                    <input onChange={handleInputChange} type="text" id="mothers_name" name="mothers_name" placeholder="Enter mother's name" />
                  </div>
                  <div className="col-50">
                    <label htmlFor="dob">Date Of Birth</label>
                    <input onChange={handleInputChange} type="date" id="dob" name="dob" />
                  </div>
                </div>
        
                <div className="row">
                  <div className="col-50">
                    <label htmlFor="gender">Gender</label>
                    <select onChange={handleInputChange} id="gender" name="gender">
                      <option hidden="hidden">--Choose--</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-50">
                    <label htmlFor="occupation">Occupation</label>
                    <select onChange={handleInputChange} id="occupation" name="occupation">
                      <option hidden="hidden">--Choose--</option>
                      <option value="mployed">Employed</option>
                      <option value="semployed">Self-employed</option>
                      <option value="student">Student</option>
                      <option value="business">Business</option>
                      <option value="homemaker">Home Maker</option>
                    </select>
                  </div>
                </div>
        
                <div className="section-title">Identity & Contact Details</div>
                <div className="row">
                  <div className="col-50">
                    <label htmlFor="aadhar_no">Aadhaar No</label>
                    <input onChange={handleInputChange} type="text" id="aadhar_no" name="aadhar_no" placeholder="Enter Aadhaar number" />
                  </div>
                  <div className="col-50">
                    <label htmlFor="mobile_no">Mobile No</label>
                    <input onChange={handleInputChange} type="text" id="mobile_no" name="mobile_no" placeholder="Enter mobile number" />
                  </div>
                </div>
        
                <div className="row">
                  <div className="col-50">
                    <label htmlFor="marital_status">Marital Status</label>
                    <select onChange={handleInputChange} id="marital_status" name="marital_status">
                      <option hidden="hidden">--Choose--</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                  <div className="col-50">
                    <label htmlFor="pan_no">Pan Card No</label>
                    <input onChange={handleInputChange} type="text" id="pan_no" name="pan_no" placeholder="Enter PAN number" oninput="this.value = this.value.toUpperCase()" />
                  </div>
                </div>
        
                <div className="section-title">Additional Details</div>
                <div className="row">
                  <div className="col-50">
                    <label htmlFor="nationality">Nationality</label>
                    <select onChange={handleInputChange} id="nationality" name="nationality">
                      <option hidden="hidden">--Choose--</option>
                      <option value="indian">Indian</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-50">
                    <label htmlFor="religion">Religion</label>
                    <select onChange={handleInputChange} id="religion" name="religion">
                      <option hidden="hidden">--Choose--</option>
                      <option value="hinduism">Hinduism</option>
                      <option value="muslim">Muslim</option>
                      <option value="buddhism">Buddhism</option>
                      <option value="christian">Christian</option>
                    </select>
                  </div>
                </div>
        
                <div className="row">
                  <div className="col-50">
                    <label htmlFor="qualification">Qualification</label>
                    <select onChange={handleInputChange} id="qualification" name="qualification">
                      <option hidden="hidden">--Choose--</option>
                      <option value="matric">Matriculation</option>
                      <option value="Graduate">Graduate</option>
                      <option value="Under-graduate">Under Graduate</option>
                      <option value="Post-graduate">Post Graduate</option>
                    </select>
                  </div>
                  <div className="col-50">
                    <label htmlFor="category">Category</label>
                    <select onChange={handleInputChange} id="category" name="category">
                      <option hidden="hidden">--Choose--</option>
                      <option value="general">General</option>
                      <option value="obc">OBC</option>
                      <option value="sc">SC</option>
                      <option value="st">ST</option>
                    </select>
                  </div>
                </div>
        
                <div className="section-title">Address & Upload</div>
                <div className="row">
                  <div className="col-50">
                    <label htmlFor="address">Address</label>
                    <input onChange={handleInputChange} type="text" id="address" name="address" placeholder="Enter address" />
                  </div>
                  <div className="col-50">
                    <label htmlFor="city">City</label>
                    <input onChange={handleInputChange} type="text" id="city" name="city" placeholder="Enter city" />
                  </div>
                  <div className="col-50">
                    <label htmlFor="state">State</label>
                   <select onChange={handleInputChange} id="state" name="state">
          <option hidden>--Choose State--</option>
          <option>Andhra Pradesh</option>
          <option>Arunachal Pradesh</option>
          <option>Assam</option>
          <option>Bihar</option>
          <option>Chhattisgarh</option>
          <option>Goa</option>
          <option>Gujarat</option>
          <option>Haryana</option>
          <option>Himachal Pradesh</option>
          <option>Jharkhand</option>
          <option>Karnataka</option>
          <option>Kerala</option>
          <option>Madhya Pradesh</option>
          <option>Maharashtra</option>
          <option>Manipur</option>
          <option>Meghalaya</option>
          <option>Mizoram</option>
          <option>Nagaland</option>
          <option>Odisha</option>
          <option>Punjab</option>
          <option>Rajasthan</option>
          <option>Sikkim</option>
          <option>Tamil Nadu</option>
          <option>Telangana</option>
          <option>Tripura</option>
          <option>Uttar Pradesh</option>
          <option>Uttarakhand</option>
          <option>West Bengal</option>
        </select>
                  </div>
                  <div className="col-50">
                    <label htmlFor="pin">Pincode</label>
                    <input onChange={handleInputChange} type="text" id="pin" name="pin" maxlength="6" pattern="\d{6}" placeholder="Enter pincode" />
                  </div>
                  <div className="col-50">
                    <label htmlFor="photo">Upload Photo</label>
                    <input onChange={handleInputChange} type="file" id="photo" name="photo" />
                  </div>
                </div>
        
                <input onChange={handleInputChange} type="submit" value="Create Account" className="btn" />
              </form>
            </div>
          </div>
        </>
    );
};

export default JspCreateAccountComponent;
