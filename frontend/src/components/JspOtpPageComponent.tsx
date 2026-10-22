import React, { useState } from 'react';

interface JspOtpPageComponentData {
    msg?: string;
}

type JspOtpPageComponentProps = {
    data?: Record<string, any>;
    onSubmit?: (formData: Record<string, any>) => void | Promise<void>;
};

export const JspOtpPageComponent: React.FC<JspOtpPageComponentProps> = ({ data = {}, onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        'otp': '',
    });
    const [backendActionNotice, setBackendActionNotice] = useState("");
    const { actionUrl, msg } = data;

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
        setBackendActionNotice("This form originally submitted to '${actionUrl != null ? actionUrl :' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.");
    
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
                : "This form originally submitted to '${actionUrl != null ? actionUrl :' using POST. That backend action has not been migrated to an API endpoint, so the form was not submitted.",
        );
    };

    return (
        <>
        {backendActionNotice && (
            <div className="alert alert-warning" role="alert" data-apex-backend-action="unmigrated">
                {backendActionNotice}
            </div>
        )}
<div className="otp-card">
                <div className="otp-title">OTP Verification </div>
                <div className="otp-sub">Enter the OTP sent to your email</div>
        
               <form onSubmit={handleSubmit} action={actionUrl != null ? actionUrl : '/verify-profile-otp'} method="post">
            <input onChange={handleInputChange} type="text" name="otp" className="otp-input" maxlength="6" oninput=" this.value=this.value.replace(/[^0-9]/g,'')" placeholder="enter your otp here" required />
        
            <button type="submit" className="otp-btn">Verify OTP</button>
        </form>
        
                <div className="error">{msg}</div>
        
                <div className="resend">
            Didn't receive OTP? <a href="/resend-otp">Resend</a>
        </div>
            </div>
        </>
    );
};

export default JspOtpPageComponent;
