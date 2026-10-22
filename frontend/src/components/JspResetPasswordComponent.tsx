import React, { useState } from 'react';

interface JspResetPasswordComponentData {
    msg?: string;
}

type JspResetPasswordComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspResetPasswordComponent: React.FC<JspResetPasswordComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'otp': '',
        'password': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { msg } = data;

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
        setBackendActionNotice("This form originally submitted to '/update-password' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '/update-password' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
        {backendActionNotice && (
            <div className="alert alert-warning" role="alert" data-apex-backend-action="unmigrated">
                {backendActionNotice}
            </div>
        )}
<div className="reset-card">
                <div className="title">Reset Password &#128272;</div>
                <div className="subtitle">Enter OTP and set a new password</div>
        
                <form onSubmit={handleSubmit} action="/update-password" method="post">
                    <input onChange={handleInputChange} type="text" name="otp" className="input-box" placeholder="Enter OTP" required />
                    <input onChange={handleInputChange} type="password" name="password" className="input-box" placeholder="New Password" required />
        
                    <button type="submit" className="btn">Update Password</button>
                </form>
        
                <div className="msg">{msg}</div>
        
                <a href="/login" className="back">&#8592; Back to Login</a>
            </div>
        </>
    );
};

export default JspResetPasswordComponent;
