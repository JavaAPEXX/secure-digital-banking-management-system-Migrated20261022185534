import React, { useState, useEffect } from 'react';

interface JspLoginComponentData {
    sms?: string;
}

type JspLoginComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspLoginComponent: React.FC<JspLoginComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'email': '',
        'password': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { sms } = data;

    useEffect(() => {
        // Preserved from original inline <script>:
        try {
            function chk() {
                let email = document.forms["login"]["email"].value;
                if (email == "") {
                  alert("Email must be filled out");
                  return false;
                }
            
                let password = document.forms["login"]["password"].value;
                if (password == "") {
                  alert("Please enter your password");
                  return false;
                }
            
                return true;
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
        setBackendActionNotice("This form originally submitted to '/login' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '/login' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
        {backendActionNotice && (
            <div className="alert alert-warning" role="alert" data-apex-backend-action="unmigrated">
                {backendActionNotice}
            </div>
        )}
<div className="top-home">
            <a href="/"> Back to Home</a>
          </div>
        
          <div className="center">
            <div className="brand">DIGITALBANK</div>
            <h1>Welcome Back</h1>
        
            <form onSubmit={handleSubmit} action="/login" method="post" name="login" onsubmit="return chk()">
              <div className="txt_field">
                <input onChange={handleInputChange} type="email" name="email" id="email" required />
                <span></span>
                <label>User Id</label>
              </div>
        
              <div className="txt_field">
                <input onChange={handleInputChange} type="password" name="password" id="password" required />
                <span></span>
                <label>Password</label>
              </div>
        
              <input onChange={handleInputChange} type="submit" value="Login" />
        
              <div className="extra-links">
                <div className="signup_link">
                  Don't have an account? <a href="/register">Signup</a>
                </div>
        
                <div className="signup_link">
                  <a href="/forgot" style={{ color: '#1d4fa8' }}>Forgot Password?</a>
                </div>
              </div>
        
             
        {(!!(sms)) && (<>
          <div className="msg">{sms}</div>
        </>)}
            </form>
          </div>
        </>
    );
};

export default JspLoginComponent;
